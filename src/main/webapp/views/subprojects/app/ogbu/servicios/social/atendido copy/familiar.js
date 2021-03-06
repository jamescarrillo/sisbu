var beanPaginationFamiliar;
var beanPaginationOcupacion;
var beanPaginationDistrito;
var familiarSelected;
var ocupacionSelected;
var beanRequestFamiliar = new BeanRequest();
document.addEventListener("DOMContentLoaded", function () {

    //INICIALIZANDO VARIABLES DE SOLICITUD
    beanRequestFamiliar.entity_api = "api/familiares";
    beanRequestFamiliar.operation = "paginate";
    beanRequestFamiliar.type_request = "GET";

    $('#txtFechaNaciFamiliar').bootstrapMaterialDatePicker({
        weekStart: 0,
        time: false,
        format: 'DD/MM/YYYY',
        lang: 'es'
    }).on('change', function (e, date) {
    });

    document.querySelector('#btnEliminarFechaNacFamiliar').onclick = function () {
        document.querySelector('#txtFechaNaciFamiliar').value = '';
    };

    $('#FrmFamiliar').submit(function (event) {
        beanRequestFamiliar.operation = "paginate";
        beanRequestFamiliar.type_request = "GET";
        $('#modalCargandoFamiliar').modal('show');
        event.preventDefault();
        event.stopPropagation();
    });

    $('#FrmFamiliarAtendido').submit(function (event) {
        try {
            if (validateFormFamiliar()) {
                $('#modalCargandoFamiliar').modal('show');
            }
        } catch (e) {
            console.log(e);
        }

        event.preventDefault();
        event.stopPropagation();
    });

    $("#modalCargandoFamiliar").on('shown.bs.modal', function () {
        processAjaxFamiliar();
    });

    document.querySelector("#btnOpenNewFamiliar").onclick = function () {
        //CONFIGURAMOS LA SOLICITUD
        beanRequestFamiliar.operation = "add";
        beanRequestFamiliar.type_request = "POST";
        //LIMPIAR LOS CAMPOS
        limpiarInputFamiliar();
        //SET TITLE MODAL
        document.querySelector("#txtTituloModalFamiliar").innerHTML = "REGISTRAR FAMILIAR";
        //OPEN MODEL
        $('#ventanaModalFamiliar').modal('show');
        setTimeout(() => {
            document.querySelector("#txtNombreFamiliar").focus();
        }, 500);
    };

    $("#ventanaModalFamiliar").on('hidden.bs.modal', function () {
        beanRequestFamiliar.operation = "paginate";
        beanRequestFamiliar.type_request = "GET";
    });

    $("#modalCargandoFamiliar").on('hide.bs.modal', function () {
        beanRequestFamiliar.operation = "paginate";
        beanRequestFamiliar.type_request = "GET";
    });

    document.querySelector("#btnRegresarFamiliar").onclick = function () {
        beanRequestAtendido.operation = "paginate";
        beanRequestAtendido.type_request = "GET";
        $('#modalCargandoAtendido').modal('show');
        document.querySelector("#btnOpenFamiliar").style.display = 'none';
        document.querySelector("#btnListaAtendido").style.display = 'block';
    };

    document.querySelector("#slctSufreAlgunaEnfermedad").onchange = function () {
        showCloseElementsEnfermedad(this.value)
    }
    function showCloseElementsEnfermedad(value) {
        document.querySelectorAll(".col-enfermedad").forEach(function (element) {
            if (value == "-1" || value == "N") {
                element.style.display = "none";
                document.querySelector("#txtEnfermedadFamiliar").value = "";
                document.querySelector("#txtLugarTratamientoFamiliar").value = "";
            } else {
                element.style.display = "block";
                document.querySelector("#txtEnfermedadFamiliar").focus();
            }
        });
    }
});

function processAjaxFamiliar() {
    let parameters_pagination = "";
    let json = "";
    if (beanRequestFamiliar.operation == "paginate") {
        parameters_pagination += "?idatendido=" + atendidoSelected.idatendido;
        parameters_pagination += "&page=1&size=50";

    } else {
        parameters_pagination = "";
        if (beanRequestFamiliar.operation == "delete") {
            parameters_pagination = "/" + familiarSelected.idfamiliar;
        } else {
            json = {
                "estado_civil": document.querySelector("#txtEstadoFamiliar").value,
                "fecha_nacimiento": document.querySelector("#txtFechaNaciFamiliar").value,
                "ingresos": document.querySelector("#txtIngresosFamiliar").value,
                "nivel_instruccion": document.querySelector("#txtNivelInstFamiliar").value,
                "nombre_completo": document.querySelector("#txtNombreFamiliar").value,
                "parentesco": document.querySelector("#txtParentescoFamiliar").value,
                "atendido": { "idatendido": atendidoSelected.idatendido },
                "ocupacion": { "idocupacion": ocupacionSelected.idocupacion },
                "lugar_tratamiento": document.querySelector("#txtLugarTratamientoFamiliar").value,
                "enfermedad": document.querySelector("#txtEnfermedadFamiliar").value
            };
            if (beanRequestFamiliar.operation == "update") {
                json.idfamiliar = familiarSelected.idfamiliar;
            }
        }
    }
    $.ajax({
        url: getHostAPI() + beanRequestFamiliar.entity_api + "/" + beanRequestFamiliar.operation + parameters_pagination,
        type: beanRequestFamiliar.type_request,
        headers: {
            'Authorization': 'Bearer ' + Cookies.get("sisbu_token")
        },
        data: JSON.stringify(json),
        contentType: 'application/json; charset=utf-8',
        dataType: 'json'
    }).done(function (beanCrudResponse) {
        console.log(beanCrudResponse);
        $('#modalCargandoFamiliar').modal("hide");
        if (beanCrudResponse.messageServer !== undefined) {
            if (beanCrudResponse.messageServer.toLowerCase() == "ok") {
                showAlertTopEnd('success', 'Acción realizada exitosamente');
                $('#ventanaModalFamiliar').modal('hide');
            } else {
                showAlertTopEnd('warning', beanCrudResponse.messageServer);
            }
        }
        if (beanCrudResponse.beanPagination !== undefined) {
            beanPaginationFamiliar = beanCrudResponse.beanPagination;
            toListFamiliar(beanPaginationFamiliar);
        }
    }).fail(function (jqXHR, textStatus, errorThrown) {
        $('#modalCargandoFamiliar').modal("hide");
        showAlertErrorRequest();

    });
}

function toListFamiliar(beanPagination) {
    document.querySelector("#tbodyDatosFamiliares").innerHTML = "";
    document.querySelector("#titleManagerFamiliar").innerHTML = "LISTA DE FAMILIARES";
    let row;
    row =
        `
            <div class="dt-widget__item border-success bg-primary text-white mb-0 pb-2 pl-4">
                <!-- Widget Info -->
                <div class="dt-widget__info text-truncate" >
                    <p class="mb-0 text-truncate ">
                       NOMBRE COMPLETO
                    </p>
                </div>
                <!-- /widget info -->
                <!-- Widget Info -->
                <div class="dt-widget__info text-truncate text-center">
                    <p class="mb-0 text-truncate ">
                       FECHA DE NACIMIENTO
                    </p>
                </div>
                <!-- /widget info -->
                <!-- Widget Info -->
                <div class="dt-widget__info text-truncate text-center">
                    <p class="mb-0 text-truncate ">
                       ESTADO CIVIL /
                    </p>
                    <p class="mb-0 text-truncate ">
                       NIVEL DE INSTRUCCIÓN
                    </p>
                </div>
                <!-- /widget info -->
                <!-- Widget Info -->
                <div class="dt-widget__info text-truncate text-center">
                    <p class="mb-0 text-truncate ">
                       INGRESOS
                    </p>
                </div>
                <!-- /widget info -->
                <!-- Widget Extra -->
                    <div class="dt-widget__extra">
                        <div class="dt-task">
                            <div class="dt-task__redirect">
                            </div>
                        </div>
                        <!-- /hide content -->
                    </div>
                    <!-- /widget extra -->
            </div>
        `;
    if (beanPagination.count_filter == 0) {
        showAlertTopEnd('warning', 'No se encontraron familiares');
        row +=
            `
                <div class="dt-widget__item border-success m-0 pt-2 pb-2 pl-4">
                <!-- Widget Info -->
                <div class="dt-widget__info text-center " >
                    <p class="mb-0 text-truncate ">
                     No hay Familiares
                    </p>
                   
                </div>
                <!-- /widget info -->
                </div>
           
        `;
        document.querySelector("#tbodyDatosFamiliares").innerHTML += row;
        return;
    }

    document.querySelector("#tbodyDatosFamiliares").innerHTML += row;
    beanPagination.list.forEach(familiar => {
        row =
            `
                <div class="dt-widget__item border-success m-0 pt-2 pb-2 pl-4">
                   
                    <!-- Widget Info -->
                    <div class="dt-widget__info text-truncate " >
                        <p class="mb-0 text-truncate ">
                           ${parentesco(familiar.parentesco)}
                        </p>
                        <p class="mb-0 text-truncate ">
                           ${familiar.nombre_completo}
                        </p>
                    </div>
                    <!-- /widget info -->
                    <!-- Widget Info -->
                    <div class="dt-widget__info text-truncate text-center">
                        <p class="mb-0 text-truncate ">
                           ${familiar.fecha_nacimiento == null ? "" : familiar.fecha_nacimiento}
                        </p>
                      
                    </div>
                    <!-- /widget info -->
                    <!-- Widget Info -->
                    <div class="dt-widget__info text-truncate text-center">
                        <p class="mb-0 text-truncate ">
                           ${estadoCivil(familiar.estado_civil)}
                        </p>
                        <p class="mb-0 text-truncate ">
                           ${nivelInstruccion(familiar.nivel_instruccion)}
                        </p>
            
                    </div>
                    <!-- /widget info -->
                    <!-- Widget Info -->
                    <div class="dt-widget__info text-truncate text-center">
                        <p class="mb-0 text-truncate ">
                           ${familiar.ingresos.toFixed(2)}
                        </p>
                    </div>
                    <!-- /widget info -->
                    <!-- Widget Extra -->
                    <div class="dt-widget__extra">
                    <div class="dt-task">
                    <div class="dt-task__redirect">
                            <!-- Action Button Group -->
                            <div class="action-btn-group">
                                <button class="btn btn-default text-primary dt-fab-btn editar-familiar" idfamiliar='${familiar.idfamiliar}' title="Editar Familiar" data-toggle="tooltip">
                                    <i class="icon icon-editors icon-1x"></i>
                                </button>
                                <button class="btn btn-default text-danger dt-fab-btn eliminar-familiar" idfamiliar='${familiar.idfamiliar}' title="Eliminar Familiar" data-toggle="tooltip">
                                    <i class="icon icon-trash-filled"></i>
                                </button>
                            </div>
                            </div>
                            <!-- /action button group -->
                        </div>
                        <!-- /hide content -->
                    </div>
                    <!-- /widget extra -->
                </div>
            `;
        document.querySelector("#tbodyDatosFamiliares").innerHTML += row;
        $('[data-toggle="tooltip"]').tooltip();
    });

    addEventsFamiliares();

}

function addEventsFamiliares() {
    document.querySelectorAll('.editar-familiar').forEach(btn => {
        //AGREGANDO EVENTO CLICK
        btn.onclick = function () {
            familiarSelected = findByFamiliar(btn.getAttribute('idfamiliar'));
            if (familiarSelected != undefined) {
                beanRequestFamiliar.operation = "update";
                beanRequestFamiliar.type_request = "PUT";
                addInputFamiliar(familiarSelected);
                document.querySelector("#txtTituloModalFamiliar").innerHTML = "EDITAR FAMILIAR";
                $('#ventanaModalFamiliar').modal("show");
                document.querySelector("#txtNombreFamiliar").focus();
            } else {
                showAlertTopEnd('warning', 'No se encontró el familiar para poder editar');
            }
        };
    });
    document.querySelectorAll('.eliminar-familiar').forEach(btn => {
        //AGREGANDO EVENTO CLICK
        btn.onclick = function () {
            familiarSelected = findByFamiliar(btn.getAttribute('idfamiliar'));
            beanRequestFamiliar.operation = "delete";
            beanRequestFamiliar.type_request = "DELETE";
            if (familiarSelected != undefined) {
                showAlertDelete('modalCargandoFamiliar');
            }
        };
    });
}

function findByFamiliar(idfamiliar) {
    let familiar_;
    beanPaginationFamiliar.list.forEach(familiar => {
        if (idfamiliar == familiar.idfamiliar) {
            familiar_ = familiar;
            return;
        }
    });
    return familiar_;
}

function validateFormFamiliar() {
    if (document.querySelector("#txtNombreFamiliar").value == "") {
        showAlertTopEnd('warning', 'Por favor ingrese nombre completo de su familiar');
        document.querySelector("#txtNombreFamiliar").focus();
        return false;
    } else if (document.querySelector("#txtParentescoFamiliar").value == "-1") {
        showAlertTopEnd('warning', 'Por favor seleccione parentesco');
        document.querySelector("#txtParentescoFamiliar").focus();
        return false;
    } else if (document.querySelector("#txtEstadoFamiliar").value == "-1") {
        showAlertTopEnd('warning', 'Por favor seleccione estado civil');
        document.querySelector("#txtEstadoFamiliar").focus();
        return false;
    } else if (document.querySelector("#txtNivelInstFamiliar").value == "-1") {
        showAlertTopEnd('warning', 'Por favor seleccione nivel de instrucción');
        document.querySelector("#txtNivelInstFamiliar").focus();
        return false;
    } else if (document.querySelector("#txtIngresosFamiliar").value == "") {
        showAlertTopEnd('warning', 'Por favor ingrese un monto de dinero en la caja ingreso');
        document.querySelector("#txtIngresosFamiliar").focus();
        return false;
    } else if (ocupacionSelected == undefined) {
        showAlertTopEnd('warning', 'Por favor seleccione la ocupacion de su familiar');
        return false;
    }
    //VALIDAMOS SI EL INGRESO ES VALIDO
    try {
        parseFloat(document.querySelector("#txtIngresosFamiliar").value);
    } catch (e) {
        console.log("Error al convertir numero")
    }
    return true;
}

function addInputFamiliar(familiar) {
    document.querySelector("#txtNombreFamiliar").value = familiar.nombre_completo;
    document.querySelector("#txtParentescoFamiliar").value = familiar.parentesco;
    document.querySelector("#txtFechaNaciFamiliar").value = familiar.fecha_nacimiento;
    document.querySelector("#txtEstadoFamiliar").value = familiar.estado_civil;
    document.querySelector("#txtNivelInstFamiliar").value = familiar.nivel_instruccion;
    document.querySelector("#txtIngresosFamiliar").value = familiar.ingresos;

    document.querySelector("#txtOcupacionFamiliarPaciente").value = familiar.ocupacion.nombre;

    if (familiar.enfermedad == undefined) {
        document.querySelector("#slctSufreAlgunaEnfermedad").value = "-1";
    } else {
        if (familiar.enfermedad == "") {
            document.querySelector("#slctSufreAlgunaEnfermedad").value = "N";
        } else {
            document.querySelector("#slctSufreAlgunaEnfermedad").value = "S";
        }
    }
    document.querySelector("#slctSufreAlgunaEnfermedad").dispatchEvent(new Event('change'));
    document.querySelector("#txtEnfermedadFamiliar").value = familiar.enfermedad;
    document.querySelector("#txtLugarTratamientoFamiliar").value = familiar.lugar_tratamiento;
    ocupacionSelected = familiar.ocupacion;
    $('[data-toggle="popover"]').popover();
}

function limpiarInputFamiliar() {
    document.querySelector("#txtNombreFamiliar").value = "";
    document.querySelector("#txtParentescoFamiliar").value = "-1";
    document.querySelector("#txtFechaNaciFamiliar").value = "";
    document.querySelector("#txtEstadoFamiliar").value = "-1";
    document.querySelector("#txtNivelInstFamiliar").value = "-1";
    document.querySelector("#txtIngresosFamiliar").value = "";

    document.querySelector("#txtOcupacionFamiliarPaciente").value = "";
    document.querySelector("#slctSufreAlgunaEnfermedad").value = "-1";
    document.querySelector("#slctSufreAlgunaEnfermedad").dispatchEvent(new Event('change'));
    document.querySelector("#txtEnfermedadFamiliar").value = "";
    document.querySelector("#txtLugarTratamientoFamiliar").value = "";

}

function estadoCivil(estadocivil) {
    switch (estadocivil) {
        case 1:
            return "SOLTERO(A)";
            break;
        case 2:
            return "CASADO(A)";
            break;
        case 3:
            return "DIVORSIADO(A)";
            break;
        case 4:
            return "VIUDO(A)";
            break;

        default:
            return "";
            break;
    }
}

function nivelInstruccion(nivel) {
    switch (nivel) {
        case 1:
            return "SIN ESTUDIOOS";
            break;
        case 2:
            return "PRIMARIA";
            break;
        case 3:
            return "SECUNDARIA";
            break;
        case 4:
            return "TÉCNICO";
            break;
        case 4:
            return "UNIVERSIDAD";
            break;

        default:
            return "";
            break;
    }
}

function parentesco(nivel) {
    switch (nivel) {
        case 1:
            return "PAPÁ";
            break;
        case 2:
            return "MAMÁ";
            break;
        case 3:
            return "HERMANO(A)";
            break;
        case 4:
            return "TÍO(A)";
            break;
        case 5:
            return "OTRO";
            break;
        default:
            return "";
            break;
    }
}