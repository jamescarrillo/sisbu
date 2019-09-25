var beanPaginationPaciente;
var beanPaginationDoctor;
var pacienteSelected;
var beanRequestPaciente = new BeanRequest();
document.addEventListener("DOMContentLoaded", function () {

    //INICIALIZANDO VARIABLES DE SOLICITUD
    beanRequestPaciente.entity_api = "api/pacientes";
    beanRequestPaciente.operation = "paginate";
    beanRequestPaciente.type_request = "GET";
    document.querySelector("#openPaciente").style.display = "none";

    $('#FrmPaciente').submit(function (event) {
        beanRequestPaciente.operation = "paginate";
        beanRequestPaciente.type_request = "GET";
        $('#modalCargandoPaciente').modal('show');
        event.preventDefault();
        event.stopPropagation();
    });

    listFilter("#txtFilterMedico");

    $('#FrmPacienteModal').submit(function (event) {
        if (validateFormPaciente()) {
            $('#modalCargandoPaciente').modal('show');
        }
        event.preventDefault();
        event.stopPropagation();
    });

    document.querySelector("#btnOpenNewPaciente").onclick = function () {
        //CONFIGURAMOS LA SOLICITUD
        beanRequestPaciente.operation = "add";
        beanRequestPaciente.type_request = "POST";
        //LIMPIAR LOS CAMPOS
        //document.querySelector("#txtNombrePaciente").value = "";
        //SET TITLE MODAL
        document.querySelector("#txtTituloPaciente").innerHTML = "REGISTRAR PACIENTE";
        //OPEN MODEL
        document.querySelector("#ListaPaciente").style.display = "none";
        document.querySelector("#openPaciente").style.display = "block";

    };

    document.querySelector("#btnOpenNewDiagnosticoPaciente").onclick = function () {
        //CONFIGURAMOS LA SOLICITUD
        beanRequestPaciente.operation = "add";
        beanRequestPaciente.type_request = "POST";
        //LIMPIAR LOS CAMPOS
        //document.querySelector("#txtNombrePaciente").value = "";
        //SET TITLE MODAL
        document.querySelector("#txtTituloModalDiagnostico").innerHTML = "REGISTRAR DIAGNOSTICO";
        //OPEN MODEL
        $('#ventanaModalPaciente').modal('show');

    };

    document.querySelector("#btnCerrar").onclick = function () {
        document.querySelector("#openPaciente").style.display = "none";
        document.querySelector("#ListaPaciente").style.display = "block";
    };

    $("#modalCargandoPaciente").on('shown.bs.modal', function () {
        processAjaxPaciente();
    });

    $("#modalCargandoPaciente").on('hidden.bs.modal', function () {
        beanRequestPaciente.operation = "paginate";
        beanRequestPaciente.type_request = "GET";
    });



    $('#modalCargandoPaciente').modal('show');

    $("#sizePagePaciente").change(function () {
        $('#modalCargandoPaciente').modal('show');
    });

});

function listFilter(filterdni) {
    $(filterdni).change(function () {
        var filter = $(this).val();
        console.log(filter);
        processAjaxDoctor(filter);
    }).keyup(function (e) {
        var txt = String.fromCharCode(e.which);
        if (txt.match(/[A-Za-z0-9]/))
        {
            $(this).change();
        }

    });

}

function processAjaxPaciente() {
    let parameters_pagination = "";
    let json = "";
    if (beanRequestPaciente.operation == "paginate") {
        parameters_pagination += "?nombre=" + document.querySelector("#txtFilterPaciente").value.toUpperCase();
        parameters_pagination += "&page=" + document.querySelector("#pagePaciente").value;
        parameters_pagination += "&size=" + document.querySelector("#sizePagePaciente").value;

    } else {
        parameters_pagination = "";
        if (beanRequestPaciente.operation == "delete") {
            parameters_pagination = "/" + pacienteSelected.idpaciente;
            json = {};
        } else {
            json = {
                "nombre": document.querySelector("#txtNombrePaciente").value,
            };
            if (beanRequestPaciente.operation == "update") {
                json.idpaciente = pacienteSelected.idpaciente;
            }
        }
    }
    $.ajax({
        url: getHostAPI() + beanRequestPaciente.entity_api + "/" + beanRequestPaciente.operation + parameters_pagination,
        type: beanRequestPaciente.type_request,
        headers: {
            //'Authorization': 'Bearer ' + Cookies.get("sisbu_token")
        },
        data: JSON.stringify(json),
        contentType: 'application/json; charset=utf-8',
        dataType: 'json'
    }).done(function (beanCrudResponse) {
        $('#modalCargandoPaciente').modal("hide");
        if (beanCrudResponse.messageServer !== undefined) {
            if (beanCrudResponse.messageServer.toLowerCase() == "ok") {
                showAlertTopEnd('success', 'Acción realizada exitosamente');
            } else {
                showAlertTopEnd('warning', beanCrudResponse.messageServer);
            }
        }
        if (beanCrudResponse.beanPagination !== undefined) {
            beanPaginationPaciente = beanCrudResponse.beanPagination;
            toListPaciente(beanPaginationPaciente);
        }
    }).fail(function (jqXHR, textStatus, errorThrown) {
        $('#modalCargandoPaciente').modal("hide");
        showAlertErrorRequest();

    });
}

function toListPaciente(beanPagination) {
    document.querySelector("#tbodyPaciente").innerHTML = "";
    document.querySelector("#titleManagerPaciente").innerHTML = "[ " + beanPagination.count_filter + " ] PACIENTES";
    if (beanPagination.count_filter > 0) {
        let row;
        beanPagination.list.forEach(paciente => {
            row = "<tr ";
            row += "idpaciente='" + paciente.idpaciente + "' ";
            row += ">";
            row += "<td><ul class='dt-list dt-list-cm-0'>";
            row += "<li class='dt-list__item editar-paciente' data-toggle='tooltip' title='Editar'><a class='text-light-gray' href='javascript:void(0)'>";
            row += "<i class='icon icon-editors'></i></a></li>";
            row += "<li class='dt-list__item eliminar-paciente' data-toggle='tooltip' title='Eliminar'><a class='text-light-gray' href='javascript:void(0)'>";
            row += "<i class='icon icon-trash-filled'></i></a></li>";
            row += "</ul></td>";
            row += "<td class='align-middle'>" + paciente.nombre + "</td>";
            row += "</tr>";
            document.querySelector("#tbodyPaciente").innerHTML += row;
        });
        buildPagination(
                beanPagination.count_filter,
                parseInt(document.querySelector("#sizePagePaciente").value),
                document.querySelector("#pagePaciente"),
                $('#modalCargandoPaciente'),
                $('#paginationPaciente'));
        addEventsPacientees();
        if (beanRequestPaciente.operation == "paginate") {
            document.querySelector("#txtFilterPaciente").focus();
        }
        $('[data-toggle="tooltip"]').tooltip();
    } else {
        destroyPagination($('#paginationPaciente'));
        showAlertTopEnd('warning', 'No se encontraron resultados');
        document.querySelector("#txtFilterPaciente").focus();
    }
}

function addEventsPacientees() {
    document.querySelectorAll('.editar-paciente').forEach(btn => {
        //AGREGANDO EVENTO CLICK
        btn.onclick = function () {
            pacienteSelected = findByPaciente(btn.parentElement.parentElement.parentElement.getAttribute('idpaciente'));
            if (pacienteSelected != undefined) {
                beanRequestPaciente.operation = "update";
                beanRequestPaciente.type_request = "PUT";
                //SET VALUES MODAL
                document.querySelector("#txtNombrePaciente").value = pacienteSelected.nombre;
                document.querySelector("#txtTituloModalMan").innerHTML = "EDITAR PACIENTE";
                $('#ventanaModalPaciente').modal("show");
                document.querySelector("#txtNombrePaciente").focus();
            } else {
                showAlertTopEnd('warning', 'No se encontró el Paciente para poder editar');
            }
        };
    });
    document.querySelectorAll('.eliminar-paciente').forEach(btn => {
        //AGREGANDO EVENTO CLICK
        btn.onclick = function () {
            pacienteSelected = findByPaciente(btn.parentElement.parentElement.parentElement.getAttribute('idpaciente'));
            beanRequestPaciente.operation = "delete";
            beanRequestPaciente.type_request = "DELETE";
            processAjaxPaciente();
        };
    });
}

function findByPaciente(idpaciente) {
    let paciente_;
    beanPaginationPaciente.list.forEach(paciente => {
        if (idpaciente == paciente.idpaciente) {
            paciente_ = paciente;
            return;
        }
    });
    return paciente_;
}

function validateFormPaciente() {
    if (document.querySelector("#txtNombrePaciente").value == "") {
        showAlertTopEnd('warning', 'Por favor ingrese nombre');
        document.querySelector("#txtNombrenPaciente").focus();
        return false;
    }
    return true;
}

//DOCTOR

function toListDoctor(beanPagination) {
    document.querySelector("#resultadoMedico").innerHTML = "";
    if (beanPagination.count_filter > 0) {
        let row;
        beanPagination.list.forEach(personal => {
            row = "<a idpersonal='" + personal.idpersonal + "' href='javascript:void(0)' ";
            row += "class='list-group-item list-group-item-action pt-1 pb-1 agregar-personal'>"+ personal.apellido_pat.toUpperCase()+" "+ personal.apellido_mat.toUpperCase()+" " + personal.nombre.toUpperCase();
            row += "</a>";
            document.querySelector("#resultadoMedico").innerHTML += row;
        });
        addEventsMenuSemanales();
    } else {
        //destroyPagination($('#paginationComida'));
        showAlertTopEnd('warning', 'No se encontraron resultados');

    }
}

function processAjaxDoctor(filter) {
    $.ajax({
        url: getHostAPI() + "api/personal/paginate?filter=" + filter + "&estado=1&page=1&size=20",
        type: "GET",
        headers: {
            //'Authorization': 'Bearer ' + Cookies.get("sisbu_token")
        },
        contentType: 'application/json; charset=utf-8',
        dataType: 'json'
    }).done(function (beanCrudResponse) {
        console.log(beanCrudResponse);
        $('#modalCargandoPaciente').modal("hide");
        if (beanCrudResponse.messageServer !== undefined) {
            if (beanCrudResponse.messageServer.toLowerCase() == "ok") {
                showAlertTopEnd('success', 'Acción realizada exitosamente');
            } else {
                showAlertTopEnd('warning', beanCrudResponse.messageServer);
            }
        }
        if (beanCrudResponse.beanPagination !== undefined) {
            beanPaginationDoctor = beanCrudResponse.beanPagination;
            toListDoctor(beanPaginationDoctor);
        }
    }).fail(function (jqXHR, textStatus, errorThrown) {
        $('#modalCargandoPaciente').modal("hide");
        showAlertErrorRequest();

    });
}