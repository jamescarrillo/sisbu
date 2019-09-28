var beanPaginationCicloAcademico;
var cicloAcademicoSelected;
var beanRequestCicloAcademico = new BeanRequest();
document.addEventListener("DOMContentLoaded", function () {

    //INICIALIZANDO VARIABLES DE SOLICITUD
    beanRequestCicloAcademico.entity_api = "api/ciclosacademicos";
    beanRequestCicloAcademico.operation = "paginate";
    beanRequestCicloAcademico.type_request = "GET";

    $('#FrmCicloAcademico').submit(function (event) {
        beanRequestCicloAcademico.operation = "paginate";
        beanRequestCicloAcademico.type_request = "GET";
        $('#modalCargandoCicloAcademico').modal('show');
        event.preventDefault();
        event.stopPropagation();
    });

    $('#FrmCicloAcademicoModal').submit(function (event) {
        if (validateFormCicloAcademico()) {
            $('#modalCargandoCicloAcademico').modal('show');
        }
        event.preventDefault();
        event.stopPropagation();
    });

    document.querySelector("#btnOpenNewCicloAcademico").onclick = function () {
        //CONFIGURAMOS LA SOLICITUD
        beanRequestCicloAcademico.operation = "add";
        beanRequestCicloAcademico.type_request = "POST";
        //LIMPIAR LOS CAMPOS
        document.querySelector("#txtNombreCicloAcademico").value = "";
        //SET TITLE MODAL
        document.querySelector("#txtTituloModalMan").innerHTML = "REGISTRAR CICLO ACADÉMICO";
        //OPEN MODEL
        $('#ventanaModalCicloAcademico').modal('show');
    };

    $("#modalCargandoCicloAcademico").on('shown.bs.modal', function () {
        processAjaxCicloAcademico();
    });

    $("#ventanaModalCicloAcademico").on('hidden.bs.modal', function () {
        beanRequestCicloAcademico.operation = "paginate";
        beanRequestCicloAcademico.type_request = "GET";
    });

    $("#modalCargandoCicloAcademico").on('hide.bs.modal', function () {
        beanRequestCicloAcademico.operation = "paginate";
        beanRequestCicloAcademico.type_request = "GET";
    });


    $('#modalCargandoCicloAcademico').modal('show');

    $("#sizePageCicloAcademico").change(function () {
        $('#modalCargandoCicloAcademico').modal('show');
    });

});

function processAjaxCicloAcademico() {
    let parameters_pagination = "";
    let json = "";
    if (beanRequestCicloAcademico.operation == "paginate") {
        parameters_pagination += "?nombre=" + document.querySelector("#txtFilterCicloAcademico").value.toUpperCase();
        parameters_pagination += "&page=" + document.querySelector("#pageCicloAcademico").value;
        parameters_pagination += "&size=" + document.querySelector("#sizePageCicloAcademico").value;

    } else {
        parameters_pagination = "";
        if (beanRequestCicloAcademico.operation == "delete") {
            parameters_pagination = "/" + cicloAcademicoSelected.idcicloAcademico;
            json = {};
        } else {
            json = {
                "nombre": document.querySelector("#txtNombreCicloAcademico").value,
            };
            if (beanRequestCicloAcademico.operation == "update") {
                json.idcicloAcademico = cicloAcademicoSelected.idcicloAcademico;
            }
        }
    }
    $.ajax({
        url: getHostAPI() + beanRequestCicloAcademico.entity_api + "/" + beanRequestCicloAcademico.operation + parameters_pagination,
        type: beanRequestCicloAcademico.type_request,
        headers: {
            'Authorization': 'Bearer ' + Cookies.get("sisbu_token")
        },
        data: JSON.stringify(json),
        contentType: 'application/json; charset=utf-8',
        dataType: 'json'
    }).done(function (beanCrudResponse) {
        $('#modalCargandoCicloAcademico').modal("hide");
        if (beanCrudResponse.messageServer !== undefined) {
            if (beanCrudResponse.messageServer.toLowerCase() == "ok") {
                showAlertTopEnd('success', 'Acción realizada exitosamente');
                $('#ventanaModalCicloAcademico').modal('hide');
            } else {
                showAlertTopEnd('warning', beanCrudResponse.messageServer);
            }
        }
        if (beanCrudResponse.beanPagination !== undefined) {
            beanPaginationCicloAcademico = beanCrudResponse.beanPagination;
            toListCicloAcademico(beanPaginationCicloAcademico);
        }
    }).fail(function (jqXHR, textStatus, errorThrown) {
        $('#modalCargandoCicloAcademico').modal("hide");
        showAlertErrorRequest();

    });
}

function toListCicloAcademico(beanPagination) {
    document.querySelector("#tbodyCicloAcademico").innerHTML = "";
    document.querySelector("#titleManagerCicloAcademico").innerHTML = "[ " + beanPagination.count_filter + " ] CICLO ACADEMICO";
    if (beanPagination.count_filter > 0) {
        let row;
        beanPagination.list.forEach(cicloAcademico => {
            var fechai = (cicloAcademico.fechai == null) ? "" : cicloAcademico.fechai;
            var fechaf = (cicloAcademico.fechaf == null) ? "" : cicloAcademico.fechaf;
            row = "<tr ";
            row += "idcicloAcademico='" + cicloAcademico.idciclo_academico + "' ";
            row += ">";
            row += "<td><ul class='dt-list dt-list-cm-0'>";
            row += "<li class='dt-list__item editar-cicloAcademico' data-toggle='tooltip' title='Editar'><a class='text-light-gray' href='javascript:void(0)'>";
            row += "<i class='icon icon-editors'></i></a></li>";
            row += "<li class='dt-list__item eliminar-cicloAcademico' data-toggle='tooltip' title='Eliminar'><a class='text-light-gray' href='javascript:void(0)'>";
            row += "<i class='icon icon-trash-filled'></i></a></li>";
            row += "</ul></td>";
            row += "<td class='align-middle'>" + cicloAcademico.nombre + "</td>";
            row += "<td class='align-middle'>" + fechai + "</td>";
            row += "<td class='align-middle'>" + fechaf + "</td>";
            row += "</tr>";
            document.querySelector("#tbodyCicloAcademico").innerHTML += row;
        });
        buildPagination(
                beanPagination.count_filter,
                parseInt(document.querySelector("#sizePageCicloAcademico").value),
                document.querySelector("#pageCicloAcademico"),
                $('#modalCargandoCicloAcademico'),
                $('#paginationCicloAcademico'));
        addEventsCicloAcademicoes();
        if (beanRequestCicloAcademico.operation == "paginate") {
            document.querySelector("#txtFilterCicloAcademico").focus();
        }
        $('[data-toggle="tooltip"]').tooltip();
    } else {
        destroyPagination($('#paginationCicloAcademico'));
        showAlertTopEnd('warning', 'No se encontraron resultados');
        document.querySelector("#txtFilterCicloAcademico").focus();
    }
}

function addEventsCicloAcademicoes() {
    document.querySelectorAll('.editar-cicloAcademico').forEach(btn => {
        //AGREGANDO EVENTO CLICK
        btn.onclick = function () {
            cicloAcademicoSelected = findByCicloAcademico(btn.parentElement.parentElement.parentElement.getAttribute('idcicloAcademico'));
            if (cicloAcademicoSelected != undefined) {
                beanRequestCicloAcademico.operation = "update";
                beanRequestCicloAcademico.type_request = "PUT";
                //SET VALUES MODAL
                document.querySelector("#txtNombreCicloAcademico").value = cicloAcademicoSelected.nombre;
                document.querySelector("#txtFechaInicioCicloAcademico").value = cicloAcademicoSelected.fechai;
                document.querySelector("#txtFechaFinCicloAcademico").value = cicloAcademicoSelected.fechaf;
                document.querySelector("#txtTituloModalMan").innerHTML = "EDITAR CICLO ACADÉMICO";
                $('#ventanaModalCicloAcademico').modal("show");
                document.querySelector("#txtNombreCicloAcademico").focus();
            } else {
                showAlertTopEnd('warning', 'No se encontró el CicloAcademico para poder editar');
            }
        };
    });
    document.querySelectorAll('.eliminar-cicloAcademico').forEach(btn => {
        //AGREGANDO EVENTO CLICK
        btn.onclick = function () {
            cicloAcademicoSelected = findByCicloAcademico(btn.parentElement.parentElement.parentElement.getAttribute('idcicloAcademico'));
            beanRequestCicloAcademico.operation = "delete";
            beanRequestCicloAcademico.type_request = "DELETE";
            processAjaxCicloAcademico();
        };
    });
}

function findByCicloAcademico(idcicloAcademico) {
    let cicloAcademico_;
    beanPaginationCicloAcademico.list.forEach(cicloAcademico => {
        if (idcicloAcademico == cicloAcademico.idciclo_academico) {
            cicloAcademico_ = cicloAcademico;
            return;
        }
    });
    return cicloAcademico_;
}

function validateFormCicloAcademico() {
    if (document.querySelector("#txtNombreCicloAcademico").value == "") {
        showAlertTopEnd('warning', 'Por favor ingrese nombre');
        document.querySelector("#txtNombrenCicloAcademico").focus();
        return false;
    } else if (document.querySelector("#txtFechaInicioCicloAcademico").value == "") {
        showAlertTopEnd('warning', 'Por favor ingrese Fecha Inicial');
        document.querySelector("#txtFechaInicioCicloAcademico").focus();
        return false;
    } else if (document.querySelector("#txtFechaFinCicloAcademico").value == "") {
        showAlertTopEnd('warning', 'Por favor ingrese Fecha Final');
        document.querySelector("#txtFechaFinCicloAcademico").focus();
        return false;
    }
    return true;
}

