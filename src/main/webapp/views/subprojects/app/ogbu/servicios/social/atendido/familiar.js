var beanPaginationFamiliar;
var beanPaginationOcupacion;
var beanPaginationDistrito;
var familiarSelected;
var ocupacionSelected;
var distritoSelected;
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

    //document.querySelector('#btnEliminarFechaNacFamiliar').onclick = function () {
    //   document.querySelector('#txtFechaNaciFamiliar').value = '';
    //};

    $('#FrmFamiliar').submit(function (event) {
        beanRequestFamiliar.operation = "paginate";
        beanRequestFamiliar.type_request = "GET";
        $('#modalCargandoFamiliar').modal('show');
        event.preventDefault();
        event.stopPropagation();
    });

    $('#FrmFamiliarPaciente').submit(function (event) {
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
            json = {};
        } else {
            json = {
                "estado_civil": document.querySelector("#txtEstadoFamiliar").value,
                "fecha_nacimiento": document.querySelector("#txtFechaNaciFamiliar").value,
                "ingresos": document.querySelector("#txtIngresosFamiliar").value,
                "nivel_instruccion": document.querySelector("#txtNivelInstFamiliar").value,
                "nombre_completo": document.querySelector("#txtNombreFamiliar").value,
                "parentesco": document.querySelector("#txtParentescoFamiliar").value,
                "atendido": {"idatendido": atendidoSelected.idatendido},
                "ocupacion": {"idocupacion": ocupacionSelected.idocupacion},
                "distrito": {"iddistrito": distritoSelected.iddistrito}
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
    if (beanPagination.count_filter > 0) {
        let row;
        beanPagination.list.forEach(familiar => {
            row = "<tr ";
            row += "idfamiliar='" + familiar.idfamiliar + "' ";
            row += ">";
            row += "<td><ul class='dt-list dt-list-cm-0'>";
            row += "<li class='dt-list__item editar-familiar' data-toggle='tooltip' title='Editar'><a class='text-light-gray' href='javascript:void(0)'>";
            row += "<i class='text-primary icon icon-editors'></i></a></li>";
            row += "<li class='dt-list__item eliminar-familiar' data-toggle='tooltip' title='Eliminar'><a class='text-light-gray' href='javascript:void(0)'>";
            row += "<i class='text-danger icon icon-trash-filled'></i></a></li>";
            row += "</ul></td>";
            row += "<td class='align-middle'>" + parentesco(familiar.parentesco) + "<br>" + familiar.nombre_completo + "</td>";
            row += "<td class='align-middle'>" + (familiar.fecha_nacimiento == null ? "" : familiar.fecha_nacimiento) + "</td>";
            row += "<td class='align-middle'>" + estadoCivil(familiar.estado_civil) + "<br>" + nivelInstruccion(familiar.nivel_instruccion) + "</td>";
            row += "<td class='align-middle'>" + familiar.ingresos.toFixed(2) + "</td>";
            row += "</tr>";
            document.querySelector("#tbodyDatosFamiliares").innerHTML += row;
        });

        addEventsFamiliares();
        if (beanRequestFamiliar.operation == "paginate") {
            //document.querySelector("#txtFilterFamiliar").focus();
        }
        $('[data-toggle="tooltip"]').tooltip();
    } else {

        showAlertTopEnd('warning', 'No se encontraron familiares');
        // document.querySelector("#txtFilterFamiliar").focus();
    }
}

function addEventsFamiliares() {
    document.querySelectorAll('.editar-familiar').forEach(btn => {
        //AGREGANDO EVENTO CLICK
        btn.onclick = function () {
            familiarSelected = findByFamiliar(btn.parentElement.parentElement.parentElement.getAttribute('idfamiliar'));
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
            familiarSelected = findByFamiliar(btn.parentElement.parentElement.parentElement.getAttribute('idfamiliar'));
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
    } else if (distritoSelected == undefined) {
        showAlertTopEnd('warning', 'Por favor seleccione distrito de donde procede de su familiar');
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

    document.querySelector("#txtOcupacionPaciente").value = familiar.ocupacion.nombre;
    document.querySelector("#txtDistritoPaciente").value = familiar.distrito.nombre;
    ocupacionSelected = familiar.ocupacion;
    distritoSelected = familiar.distrito;
    $('[data-toggle="popover"]').popover();
}

function limpiarInputFamiliar() {
    document.querySelector("#txtNombreFamiliar").value = "";
    document.querySelector("#txtParentescoFamiliar").value = "-1";
    document.querySelector("#txtFechaNaciFamiliar").value = "";
    document.querySelector("#txtEstadoFamiliar").value = "-1";
    document.querySelector("#txtNivelInstFamiliar").value = "-1";
    document.querySelector("#txtIngresosFamiliar").value = "";

    document.querySelector("#txtOcupacionPaciente").value = "";
    document.querySelector("#txtDistritoPaciente").value = "";

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