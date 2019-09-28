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

    $('#FrmFamiliar').submit(function (event) {
        beanRequestFamiliar.operation = "paginate";
        beanRequestFamiliar.type_request = "GET";
        $('#modalCargandoFamiliar').modal('show');
        event.preventDefault();
        event.stopPropagation();
    });


    $('#FrmFamiliarPaciente').submit(function (event) {
        if (validateFormFamiliar()) {
        $('#modalCargandoFamiliar').modal('show');
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
        //  document.querySelector("#txtNombreFamiliar").value = "";
        //SET TITLE MODAL
        document.querySelector("#txtTituloModalFamiliar").innerHTML = "REGISTRAR FAMILIAR";
        //OPEN MODEL
        $('#ventanaModalFamiliar').modal('show');
    };

    $("#modalCargandoFamiliar").on('shown.bs.modal', function () {
        processAjaxFamiliar();
    });

    $("#ventanaModalFamiliar").on('hidden.bs.modal', function () {
        beanRequestFamiliar.operation = "paginate";
        beanRequestFamiliar.type_request = "GET";
    });

    $("#modalCargandoFamiliar").on('hide.bs.modal', function () {
        beanRequestFamiliar.operation = "paginate";
        beanRequestFamiliar.type_request = "GET";
    });

    document.querySelector("#buttonDatosFamiliares").onclick = function () {
        beanRequestFamiliar.operation = "paginate";
        beanRequestFamiliar.type_request = "GET";
        $('#modalCargandoFamiliar').modal('show');
    };

    document.querySelector("#txtFilterOcupacion").onclick = function () {
        processAjaxOcupacion("");
        listFilterOcupacion("#txtFilterOcupacion");
    };

    document.querySelector("#txtFilterDistrito").onclick = function () {
        processAjaxDistrito("", 1);
        listFilterDistrito("#txtFilterDistrito", 1);
    };

});

function listFilterOcupacion(filterdni) {
    $(filterdni).change(function () {
    }).keyup(function (e) {
        var txt = String.fromCharCode(e.which);
        if (txt.match(/[A-Za-z0-9]/))
        {
            var filter = $(this).val();
            processAjaxOcupacion(filter);
        }

    });

}

function listFilterDistrito(filterdni, ubica) {
    $(filterdni).change(function () {
    }).keyup(function (e) {
        var txt = String.fromCharCode(e.which);
        if (txt.match(/[A-Za-z0-9]/))
        {
            var filter = $(this).val();
            processAjaxDistrito(filter, ubica);
        }

    });

}

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
                "fecha_nacimiento": document.querySelector("#txtFechaNaciFamiliar").value.split("-")[2] + "/" +
                        document.querySelector("#txtFechaNaciFamiliar").value.split("-")[1] + "/" +
                        document.querySelector("#txtFechaNaciFamiliar").value.split("-")[0],
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
    document.querySelector("#titleManagerFamiliar").innerHTML = "  FAMILIARES";
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
            row += "<td class='align-middle'>" + familiar.fecha_nacimiento + "</td>";
            row += "<td class='align-middle'>" + estadoCivil(familiar.estado_civil) + "<br>" + nivelInstruccion(familiar.nivel_instruccion) + "</td>";
            row += "<td class='align-middle'>" + familiar.ingresos + "</td>";
            row += "</tr>";
            document.querySelector("#tbodyDatosFamiliares").innerHTML += row;
        });

        addEventsFamiliares();
        if (beanRequestFamiliar.operation == "paginate") {
            //document.querySelector("#txtFilterFamiliar").focus();
        }
        $('[data-toggle="tooltip"]').tooltip();
    } else {

        showAlertTopEnd('warning', 'No se encontraron resultados');
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
                //SET VALUES MODAL
                listFilterDistrito("#txtFilterDistrito", 1);
                addInputFamiliar(familiarSelected);
                document.querySelector("#txtTituloModalFamiliar").innerHTML = "EDITAR FAMILIAR";
                $('#ventanaModalFamiliar').modal("show");
                document.querySelector("#txtNombreFamiliar").focus();
            } else {
                showAlertTopEnd('warning', 'No se encontró el Familiar para poder editar');
            }
        };
    });
    document.querySelectorAll('.eliminar-familiar').forEach(btn => {
        //AGREGANDO EVENTO CLICK
        btn.onclick = function () {
            familiarSelected = findByFamiliar(btn.parentElement.parentElement.parentElement.getAttribute('idfamiliar'));
            beanRequestFamiliar.operation = "delete";
            beanRequestFamiliar.type_request = "DELETE";
            processAjaxFamiliar();
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
        showAlertTopEnd('warning', 'Por favor ingrese nombre');
        document.querySelector("#txtNombreFamiliar").focus();
        return false;
    }
    else if (document.querySelector("#txtParentescoFamiliar").value == "-1") {
        showAlertTopEnd('warning', 'Por favor ingrese parentesco');
        document.querySelector("#txtParentescoFamiliar").focus();
        return false;
    }
    else if (document.querySelector("#txtFechaNaciFamiliar").value == "") {
        showAlertTopEnd('warning', 'Por favor ingrese fecha de nacimiento');
        document.querySelector("#txtFechaNaciFamiliar").focus();
        return false;
    }
    else if (document.querySelector("#txtEstadoFamiliar").value == "-1") {
        showAlertTopEnd('warning', 'Por favor ingrese Estado civil');
        document.querySelector("#txtEstadoFamiliar").focus();
        return false;
    }
    else if (document.querySelector("#txtNivelInstFamiliar").value == "-1") {
        showAlertTopEnd('warning', 'Por favor ingrese Nivel de instrucción');
        document.querySelector("#txtNivelInstFamiliar").focus();
        return false;
    }
    else if (document.querySelector("#txtIngresosFamiliar").value == "") {
        showAlertTopEnd('warning', 'Por favor ingrese Ingreso');
        document.querySelector("#txtIngresosFamiliar").focus();
        return false;
    }
    else if (ocupacionSelected.length==0 ) {
        showAlertTopEnd('warning', 'Por favor ingrese ocupacion');
        document.querySelector("#txtFilterOcupacion").focus();
        return false;
    }
    else if (distritoSelected.length==0 ) {
        showAlertTopEnd('warning', 'Por favor ingrese distrito');
        document.querySelector("#txtFilterDistrito").focus();
        return false;
    }
    return true;
}

function addInputFamiliar(atendidoSelected) {
    document.querySelector("#txtNombreFamiliar").value = atendidoSelected.nombre_completo;
    document.querySelector("#txtParentescoFamiliar").value = atendidoSelected.parentesco;
    document.querySelector("#txtFechaNaciFamiliar").value = atendidoSelected.fecha_nacimiento.split("/")[2] + "-" +
            atendidoSelected.fecha_nacimiento.split("/")[1] + "-" + atendidoSelected.fecha_nacimiento.split("/")[0];
    document.querySelector("#txtEstadoFamiliar").value = atendidoSelected.estado_civil;
    document.querySelector("#txtNivelInstFamiliar").value = atendidoSelected.nivel_instruccion;
    document.querySelector("#txtIngresosFamiliar").value = atendidoSelected.ingresos;

    document.querySelector("#txtFilterOcupacion").value = atendidoSelected.ocupacion.nombre;
    document.querySelector("#txtFilterDistrito").value = atendidoSelected.distrito.nombre;
    ocupacionSelected = atendidoSelected.ocupacion;
    distritoSelected = atendidoSelected.distrito;
}

function limpiarInputFamiliar() {
    document.querySelector("#txtNombreFamiliar").value = "";
    document.querySelector("#txtParentescoFamiliar").value = "-1";
    document.querySelector("#txtFechaNaciFamiliar").value = "";
    document.querySelector("#txtEstadoFamiliar").value = "-1";
    document.querySelector("#txtNivelInstFamiliar").value = "-1";
    document.querySelector("#txtIngresosFamiliar").value = "";

    document.querySelector("#txtFilterOcupacion").value = "";
    document.querySelector("#txtFilterDistrito").value = "";
  
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

//DISTRITO

function toListDistrito(beanPagination, tabla) {
    var even;
    switch (tabla) {
        case '#resultadoDistrito':
            even = "distrito";
            break;
        case '#resultadoDistritoActual':
            even = "distritoActual";
            break;
        case '#resultadoDistritoProcedencia':
            even = "distritoProcedencia";
            break;

        default:

            break;
    }
    document.querySelector(tabla).innerHTML = "";
    if (beanPagination.count_filter > 0) {
        let row;
        beanPagination.list.forEach(distrito => {
            row = "<a iddistrito='" + distrito.iddistrito + "' href='javascript:void(0)' ";
            row += "class='list-group-item list-group-item-action pt-1 pb-1 agregar-" + even + "'>" + distrito.nombre.toUpperCase();
            row += "</a>";
            document.querySelector(tabla).innerHTML += row;
        });
        addEvents();
    } else {
        //destroyPagination($('#paginationComida'));
        showAlertTopEnd('warning', 'No se encontraron resultados');

    }
}

function processAjaxDistrito(nombredistrito, ubica) {
    $.ajax({
        url: getHostAPI() + "api/distritos/paginate?nombre=" + nombredistrito + "&page=1&size=100",
        type: "GET",
        headers: {
            'Authorization': 'Bearer ' + Cookies.get("sisbu_token")
        },
        contentType: 'application/json; charset=utf-8',
        dataType: 'json'
    }).done(function (beanCrudResponse) {
        console.log(beanCrudResponse);
        $('#modalCargandoFamiliar').modal("hide");
        if (beanCrudResponse.messageServer !== undefined) {
            if (beanCrudResponse.messageServer.toLowerCase() == "ok") {
                showAlertTopEnd('success', 'Acción realizada exitosamente');
                //$('#ventanaModalFamiliar').modal('hide');
            } else {
                showAlertTopEnd('warning', beanCrudResponse.messageServer);
            }
        }
        if (beanCrudResponse.beanPagination !== undefined) {
            beanPaginationDistrito = beanCrudResponse.beanPagination;
            switch (ubica) {
                case 1:
                    toListDistrito(beanPaginationDistrito, "#resultadoDistrito");
                    break;
                case 2:
                    toListDistrito(beanPaginationDistrito, "#resultadoDistritoActual");
                    break;
                case 3:
                    toListDistrito(beanPaginationDistrito, "#resultadoDistritoProcedencia");
                    break;

                default:

                    break;
            }

        }
    }).fail(function (jqXHR, textStatus, errorThrown) {
        $('#modalCargandoFamiliar').modal("hide");
        showAlertErrorRequest();

    });
}

function findByDistrito(iddistrito) {
    let distrito_;
    beanPaginationDistrito.list.forEach(distrito => {
        if (iddistrito == distrito.iddistrito) {
            distrito_ = distrito;
            return;
        }
    });
    return distrito_;
}

//OCUPACION

function toListOcupacion(beanPagination) {
    document.querySelector("#resultadoOcupacion").innerHTML = "";
    if (beanPagination.count_filter > 0) {
        let row;
        beanPagination.list.forEach(Ocupacion => {
            row = "<a idocupacion='" + Ocupacion.idocupacion + "' href='javascript:void(0)' ";
            row += "class='list-group-item list-group-item-action pt-1 pb-1 agregar-ocupacion'>" + Ocupacion.nombre.toUpperCase();
            row += "</a>";
            document.querySelector("#resultadoOcupacion").innerHTML += row;
        });
        addEvents();
    } else {
        //destroyPagination($('#paginationComida'));
        showAlertTopEnd('warning', 'No se encontraron resultados');

    }
}

function processAjaxOcupacion(nombreOcupacion) {
    $.ajax({
        url: getHostAPI() + "api/ocupaciones/paginate?nombre=" + nombreOcupacion + "&page=1&size=100",
        type: "GET",
        headers: {
            'Authorization': 'Bearer ' + Cookies.get("sisbu_token")
        },
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
            beanPaginationOcupacion = beanCrudResponse.beanPagination;
            toListOcupacion(beanPaginationOcupacion);
        }
    }).fail(function (jqXHR, textStatus, errorThrown) {
        $('#modalCargandoFamiliar').modal("hide");
        showAlertErrorRequest();

    });
}


function addEvents() {
    document.querySelectorAll('.agregar-escuela').forEach(btn => {
        //AGREGANDO EVENTO CLICK
        btn.onclick = function () {
            escuelaSelected = findByEscuela(btn.getAttribute('idescuela'));
            if (escuelaSelected != undefined) {
                document.querySelector("#resultadoEscuela").style.height = 0;
                document.querySelector("#txtFilterEscuela").value = escuelaSelected.nombre;

            } else {
                showAlertTopEnd('warning', 'No se encontró el Familiar para poder editar');
            }
        };
    });
    document.querySelectorAll('.agregar-distrito').forEach(btn => {
        //AGREGANDO EVENTO CLICK
        btn.onclick = function () {
            distritoSelected = findByDistrito(btn.getAttribute('iddistrito'));
            if (distritoSelected != undefined) {
                document.querySelector("#resultadoDistrito").style.height = 0;
                document.querySelector("#txtFilterDistrito").value = distritoSelected.nombre;

            } else {
                showAlertTopEnd('warning', 'No se encontró el Familiar para poder editar');
            }
        };
    });
    document.querySelectorAll('.agregar-distritoActual').forEach(btn => {
        //AGREGANDO EVENTO CLICK
        btn.onclick = function () {
            distritoActualSelected = findByDistrito(btn.getAttribute('iddistrito'));
            if (distritoActualSelected != undefined) {
                document.querySelector("#resultadoDistritoActual").style.height = 0;
                document.querySelector("#txtFilterDistritoActual").value = distritoActualSelected.nombre;

            } else {
                showAlertTopEnd('warning', 'No se encontró el Familiar para poder editar');
            }
        };
    });
    document.querySelectorAll('.agregar-distritoProcedencia').forEach(btn => {
        //AGREGANDO EVENTO CLICK
        btn.onclick = function () {
            distritoProcedenciaSelected = findByDistrito(btn.getAttribute('iddistrito'));
            if (distritoProcedenciaSelected != undefined) {
                document.querySelector("#resultadoDistritoProcedencia").style.height = 0;
                document.querySelector("#txtFilterDistritoProcedencia").value = distritoProcedenciaSelected.nombre;

            } else {
                showAlertTopEnd('warning', 'No se encontró el Familiar para poder editar');
            }
        };
    });
    document.querySelectorAll('.agregar-ocupacion').forEach(btn => {
        //AGREGANDO EVENTO CLICK
        btn.onclick = function () {
            ocupacionSelected = findByOcupacion(btn.getAttribute('idocupacion'));
            if (ocupacionSelected != undefined) {
                document.querySelector("#resultadoOcupacion").style.height = 0;
                document.querySelector("#txtFilterOcupacion").value = ocupacionSelected.nombre;
            } else {
                showAlertTopEnd('warning', 'No se encontró el Familiar para poder editar');
            }
        };
    });
}

function findByOcupacion(idocupacion) {
    let ocupacion_;
    beanPaginationOcupacion.list.forEach(ocupacion => {
        if (idocupacion == ocupacion.idocupacion) {
            ocupacion_ = ocupacion;
            return;
        }
    });
    return ocupacion_;
}
