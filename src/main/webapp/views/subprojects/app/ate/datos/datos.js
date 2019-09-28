var beanPaginationAtendido;
var beanPaginationEscuela;
var atendidoSelected;
var escuelaSelected;
var distritoActualSelected;
var distritoProcedenciaSelected;
var beanRequestAtendido = new BeanRequest();

document.addEventListener("DOMContentLoaded", function () {

    //INICIALIZANDO VARIABLES DE SOLICITUD
    beanRequestAtendido.entity_api = "api/atendido";
    beanRequestAtendido.operation = "usuario";
    beanRequestAtendido.type_request = "GET";

    $('#FrmAtendido').submit(function (event) {
        beanRequestAtendido.operation = "usuario";
        beanRequestAtendido.type_request = "GET";
        $('#modalCargandoAtendido').modal('show');
        event.preventDefault();
        event.stopPropagation();
    });

    $('#FrmPersonalPaciente').submit(function (event) {
        beanRequestAtendido.operation = "update";
        beanRequestAtendido.type_request = "PUT";
        // if (validateFormAtendido()) {
        $('#modalCargandoDatos').modal('show');
        //}
        event.preventDefault();
        event.stopPropagation();
    });



    $("#modalCargandoDatos").on('shown.bs.modal', function () {
        processAjaxAtendido();
    });

    $("#ventanaModalAtendido").on('hidden.bs.modal', function () {
        beanRequestAtendido.operation = "paginate";
        beanRequestAtendido.type_request = "GET";
    });

    $("#modalCargandoDatos").on('hide.bs.modal', function () {
        beanRequestAtendido.operation = "update";
        beanRequestAtendido.type_request = "PUT";
    });
    listFilterEscuela("#txtFilterEscuela");
    $("#sizePageAtendido").change(function () {
        $('#modalCargandoAtendido').modal('show');
    });

    $('#modalCargandoDatos').modal('show');
    document.querySelector("#txtFilterEscuela").onclick = function () {
        processAjaxEscuela("");
    };
    document.querySelector("#txtFilterDistritoActual").onclick = function () {
        processAjaxDistrito("", 2);
 listFilterDistrito("#txtFilterDistritoActual", 2);
    };
   
    document.querySelector("#txtFilterDistritoProcedencia").onclick = function () {
        processAjaxDistrito("", 3);
 listFilterDistrito("#txtFilterDistritoProcedencia", 3);
    };
   

});

function listFilterEscuela(filterdni) {
    $(filterdni).change(function () {
    }).keyup(function (e) {
        var txt = String.fromCharCode(e.which);
        if (txt.match(/[A-Za-z0-9]/))
        {
            var filter = $(this).val();
            processAjaxEscuela(filter);
        }

    });

}

function processAjaxAtendido() {
    let parameters_pagination = "";
    let json = "";
    if (beanRequestAtendido.operation == "usuario") {
        parameters_pagination = "/" + user_session.idusuario;

    } else {
        parameters_pagination = "";
        if (beanRequestAtendido.operation == "delete") {
            parameters_pagination = "/" + atendidoSelected.idatendido;
            json = {};
        } else {
            json = {
                "nombre": document.querySelector("#txtNombrePaciente").value,
                "apellido_mat": document.querySelector("#txtApMaternoPaciente").value,
                "apellido_pat": document.querySelector("#txtApPaternoPaciente").value,
                "celular": document.querySelector("#txtCelularPaciente").value,
                "direccion_actual": document.querySelector("#txtDireccionActualPaciente").value,
                "direccion_procedencia": document.querySelector("#txtDireccionProcePaciente").value,
                "fecha_nacimiento": document.querySelector("#txtFechaNacPaciente").value.split("-")[2] + "/" +
                        document.querySelector("#txtFechaNacPaciente").value.split("-")[1] +
                        "/" + document.querySelector("#txtFechaNacPaciente").value.split("-")[0],
                "estado_civil": document.querySelector("#txtEstadoPaciente").value,
                "codigo": document.querySelector("#txtCodigoPaciente").value,
                "dni": document.querySelector("#txtNumeroDocumentoPaciente").value,
                "email": document.querySelector("#txtEmailPaciente").value,
                "sexo": document.querySelector("#txtSexoPaciente").value,
                "tipo_colegio": document.querySelector("#txtTipoColegioPaciente").value,
                "tipo_documento": document.querySelector("#txtTipoDocumentoPaciente").value,
                "escuela": {"idescuela": escuelaSelected.idescuela},
                "distrito_actual": {"iddistrito": distritoActualSelected.iddistrito},
                "distrito_procedencia": {"iddistrito": distritoProcedenciaSelected.iddistrito},
            };
            if (beanRequestAtendido.operation == "update") {
                json.idatendido = atendidoSelected.idatendido;
            }
        }
    }
    $.ajax({
        url: getHostAPI() + beanRequestAtendido.entity_api + "/" + beanRequestAtendido.operation + parameters_pagination,
        type: beanRequestAtendido.type_request,
        headers: {
            'Authorization': 'Bearer ' + Cookies.get("sisbu_token")
        },
        data: JSON.stringify(json),
        contentType: 'application/json; charset=utf-8',
        dataType: 'json'
    }).done(function (beanCrudResponse) {
        console.log(beanCrudResponse);
        if (beanCrudResponse.messageServer == "ok") {
            showAlertTopEnd('success', 'Acción realizada exitosamente');
            $('#modalCargandoDatos').modal('hide');
        } else {
            if (beanCrudResponse.idatendido !== null) {
                showAlertTopEnd('success', 'Acción realizada exitosamente');
                $('#modalCargandoDatos').modal('hide');
                atendidoSelected = beanCrudResponse;
                addInputDatos(atendidoSelected);
            }
        }
    }).fail(function (jqXHR, textStatus, errorThrown) {
        $('#modalCargandoAtendido').modal("hide");
        showAlertErrorRequest();

    });
}

function toListAtendido(beanPagination) {
    document.querySelector("#tbodyAtendido").innerHTML = "";
    document.querySelector("#titleManagerAtendido").innerHTML = "[ " + beanPagination.count_filter + " ] CARGOS";
    if (beanPagination.count_filter > 0) {
        let row;
        beanPagination.list.forEach(atendido => {
            row = "<tr ";
            row += "idatendido='" + atendido.idatendido + "' ";
            row += ">";
            row += "<td><ul class='dt-list dt-list-cm-0'>";
            row += "<li class='dt-list__item editar-atendido' data-toggle='tooltip' title='Editar'><a class='text-light-gray' href='javascript:void(0)'>";
            row += "<i class='icon icon-editors'></i></a></li>";
            row += "<li class='dt-list__item eliminar-atendido' data-toggle='tooltip' title='Eliminar'><a class='text-light-gray' href='javascript:void(0)'>";
            row += "<i class='icon icon-trash-filled'></i></a></li>";
            row += "</ul></td>";
            row += "<td class='align-middle'>" + atendido.nombre + "</td>";
            row += "</tr>";
            document.querySelector("#tbodyAtendido").innerHTML += row;
        });
        buildPagination(
                beanPagination.count_filter,
                parseInt(document.querySelector("#sizePageAtendido").value),
                document.querySelector("#pageAtendido"),
                $('#modalCargandoAtendido'),
                $('#paginationAtendido'));
        addEventsAtendidoes();
        if (beanRequestAtendido.operation == "paginate") {
            document.querySelector("#txtFilterAtendido").focus();
        }
        $('[data-toggle="tooltip"]').tooltip();
    } else {
        destroyPagination($('#paginationAtendido'));
        showAlertTopEnd('warning', 'No se encontraron resultados');
        document.querySelector("#txtFilterAtendido").focus();
    }
}

function addEventsAtendidoes() {
    document.querySelectorAll('.editar-atendido').forEach(btn => {
        //AGREGANDO EVENTO CLICK
        btn.onclick = function () {
            atendidoSelected = findByAtendido(btn.parentElement.parentElement.parentElement.getAttribute('idatendido'));
            if (atendidoSelected != undefined) {
                beanRequestAtendido.operation = "update";
                beanRequestAtendido.type_request = "PUT";
                //SET VALUES MODAL
                document.querySelector("#txtNombreAtendido").value = atendidoSelected.nombre;
                document.querySelector("#txtTituloModalMan").innerHTML = "EDITAR CARGO";
                $('#ventanaModalAtendido').modal("show");
                document.querySelector("#txtNombreAtendido").focus();
            } else {
                showAlertTopEnd('warning', 'No se encontró el Atendido para poder editar');
            }
        };
    });
    document.querySelectorAll('.eliminar-atendido').forEach(btn => {
        //AGREGANDO EVENTO CLICK
        btn.onclick = function () {
            atendidoSelected = findByAtendido(btn.parentElement.parentElement.parentElement.getAttribute('idatendido'));
            beanRequestAtendido.operation = "delete";
            beanRequestAtendido.type_request = "DELETE";
            processAjaxAtendido();
        };
    });
}

function findByAtendido(idatendido) {
    let atendido_;
    beanPaginationAtendido.list.forEach(atendido => {
        if (idatendido == atendido.idatendido) {
            atendido_ = atendido;
            return;
        }
    });
    return atendido_;
}

function validateFormAtendido() {
    if (document.querySelector("#txtTipoDocumentoPaciente").value == "") {
        showAlertTopEnd('warning', 'Por favor ingrese tipo de documento');
        document.querySelector("#txtTipoDocumentoPaciente").focus();
        return false;
    }
    else if (document.querySelector("#txtEstadoPaciente").value == "") {
        showAlertTopEnd('warning', 'Por favor ingrese estado');
        document.querySelector("#txtEstadoPaciente").focus();
        return false;
    }
  
    else if (document.querySelector("#txtNumeroDocumentoPaciente").value == "") {
        showAlertTopEnd('warning', 'Por favor ingrese dni');
        document.querySelector("#txtNumeroDocumentoPaciente").focus();
        return false;
    }
    else if (document.querySelector("#txtApPaternoPaciente").value == "") {
        showAlertTopEnd('warning', 'Por favor ingrese apellido paterno');
        document.querySelector("#txtApPaternoPaciente").focus();
        return false;
    }
    else if (document.querySelector("#txtApMaternoPaciente").value == "") {
        showAlertTopEnd('warning', 'Por favor ingrese apellido materno');
        document.querySelector("#txtApMaternoPaciente").focus();
        return false;
    }
    else if (document.querySelector("#txtNombrePaciente").value == "") {
        showAlertTopEnd('warning', 'Por favor ingrese nombre');
        document.querySelector("#txtNombrePaciente").focus();
        return false;
    }
    else if (document.querySelector("#txtSexoPaciente").value == "") {
        showAlertTopEnd('warning', 'Por favor ingrese sexo');
        document.querySelector("#txtSexoPaciente").focus();
        return false;
    }
    else if (document.querySelector("#txtFechaNacPaciente").value == "") {
        showAlertTopEnd('warning', 'Por favor ingrese fecha de nacimiento');
        document.querySelector("#txtFechaNacPaciente").focus();
        return false;
    }
    else if (document.querySelector("#txtCelularPaciente").value == "") {
        showAlertTopEnd('warning', 'Por favor ingrese celular');
        document.querySelector("#txtCelularPaciente").focus();
        return false;
    }
    else if (document.querySelector("#txtEmailPaciente").value == "") {
        showAlertTopEnd('warning', 'Por favor ingrese email');
        document.querySelector("#txtEmailPaciente").focus();
        return false;
    }
    else if (document.querySelector("#txtModalidadPaciente").value == "") {
        showAlertTopEnd('warning', 'Por favor ingrese modalidad de ingreso');
        document.querySelector("#txtModalidadPaciente").focus();
        return false;
    }
    else if (document.querySelector("#txtTipoColegioPaciente").value == "") {
        showAlertTopEnd('warning', 'Por favor ingrese Tipo de colegio');
        document.querySelector("#txtTipoColegioPaciente").focus();
        return false;
    }
    else if (document.querySelector("#txtDireccionActualPaciente").value == "") {
        showAlertTopEnd('warning', 'Por favor ingrese Direccion actual');
        document.querySelector("#txtDireccionActualPaciente").focus();
        return false;
    }
    else if (document.querySelector("#txtDireccionProcePaciente").value == "") {
        showAlertTopEnd('warning', 'Por favor ingrese Direccion de Procedencia');
        document.querySelector("#txtDireccionProcePaciente").focus();
        return false;
    }
    else if (escuelaSelected.length == 0) {
        showAlertTopEnd('warning', 'Por favor ingrese Escuela');
        document.querySelector("#txtFilterEscuela").focus();
        return false;
    }
    else if (distritoActualSelected.length == 0) {
        showAlertTopEnd('warning', 'Por favor ingrese Distrito Actual');
        document.querySelector("#txtFilterDistritoActual").focus();
        return false;
    }
    else if (distritoProcedenciaSelected.length == 0) {
        showAlertTopEnd('warning', 'Por favor ingrese Distrito de procedencia');
        document.querySelector("#txtFilterDistritoProcedencia").focus();
        return false;
    }
    return true;
}

function addInputDatos(atendidoSelected) {
    document.querySelector("#txtTipoDocumentoPaciente").value = atendidoSelected.tipo_documento;
    document.querySelector("#txtEstadoPaciente").value = atendidoSelected.estado_civil;
    document.querySelector("#txtCodigoPaciente").value = atendidoSelected.codigo;
    document.querySelector("#txtNumeroDocumentoPaciente").value = atendidoSelected.dni;
    document.querySelector("#txtApPaternoPaciente").value = atendidoSelected.apellido_pat;
    document.querySelector("#txtApMaternoPaciente").value = atendidoSelected.apellido_mat;
    document.querySelector("#txtNombrePaciente").value = atendidoSelected.nombre;
    document.querySelector("#txtSexoPaciente").value = atendidoSelected.sexo;
    document.querySelector("#txtFechaNacPaciente").value = atendidoSelected.fecha_nacimiento.split("/")[2] + "-" +
            atendidoSelected.fecha_nacimiento.split("/")[1] + "-" + atendidoSelected.fecha_nacimiento.split("/")[0];
    document.querySelector("#txtCelularPaciente").value = atendidoSelected.celular;
    document.querySelector("#txtEmailPaciente").value = atendidoSelected.email;
    document.querySelector("#txtModalidadPaciente").value = atendidoSelected.modalidad_ingreso;
    document.querySelector("#txtTipoColegioPaciente").value = atendidoSelected.tipo_colegio;
    document.querySelector("#txtDireccionActualPaciente").value = atendidoSelected.direccion_actual;
    document.querySelector("#txtDireccionProcePaciente").value = atendidoSelected.direccion_procedencia;
    document.querySelector("#txtFilterEscuela").value = atendidoSelected.escuela.nombre;
    document.querySelector("#txtFilterDistritoActual").value = atendidoSelected.distrito_actual.nombre;
    document.querySelector("#txtFilterDistritoProcedencia").value = atendidoSelected.distrito_procedencia.nombre;
    escuelaSelected = atendidoSelected.escuela;
    distritoActualSelected = atendidoSelected.distrito_actual;
    distritoProcedenciaSelected = atendidoSelected.distrito_procedencia;
}


//ESCUELA

function toListEscuela(beanPagination) {
    document.querySelector("#resultadoEscuela").innerHTML = "";
    if (beanPagination.count_filter > 0) {
        let row;
        beanPagination.list.forEach(escuela => {
            row = "<a idescuela='" + escuela.idescuela + "' href='javascript:void(0)' ";
            row += "class='list-group-item list-group-item-action pt-1 pb-1 agregar-escuela'>" + escuela.nombre.toUpperCase();
            row += "</a>";
            document.querySelector("#resultadoEscuela").innerHTML += row;
        });
        addEvents();
    } else {
        //destroyPagination($('#paginationComida'));
        showAlertTopEnd('warning', 'No se encontraron resultados');

    }
}

function processAjaxEscuela(nombreOcupacion) {
    $.ajax({
        url: getHostAPI() + "api/escuelas/paginate?nombre=" + nombreOcupacion + "&page=1&size=100",
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
            beanPaginationEscuela = beanCrudResponse.beanPagination;
            toListEscuela(beanPaginationEscuela);
        }
    }).fail(function (jqXHR, textStatus, errorThrown) {
        $('#modalCargandoFamiliar').modal("hide");
        showAlertErrorRequest();

    });
}

function findByEscuela(idescuela) {
    let escuela_;
    beanPaginationEscuela.list.forEach(escuela => {
        if (idescuela == escuela.idescuela) {
            escuela_ = escuela;
            return;
        }
    });
    return escuela_;
}
 