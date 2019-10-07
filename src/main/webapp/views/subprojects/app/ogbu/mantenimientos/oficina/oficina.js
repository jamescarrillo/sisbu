var beanPaginationOficina;
var oficinaSelected;

var beanRequestOficina = new BeanRequest();


document.addEventListener("DOMContentLoaded", function () {

    //INICIALIZANDO VARIABLES DE SOLICITUD
    beanRequestOficina.entity_api = "oficinas";
    beanRequestOficina.operation = "paginate";
    beanRequestOficina.type_request = "GET";

    $('#FrmOficina').submit(function (event) {
        $('#modalCargandoOficina').modal('show');
        event.preventDefault();
        event.stopPropagation();
    });

    $('#FrmOficinaModal').submit(function (event) {
        if (validateFormOficina()) {
            $('#modalCargandoOficina').modal('show');
        }
        event.preventDefault();
        event.stopPropagation();
    });

    document.querySelector("#btnOpenNewOficina").onclick = function () {
        //CONFIGURAMOS LA SOLICITUD
        beanRequestOficina.operation = "add";
        beanRequestOficina.type_request = "POST";
        //LIMPIAR LOS CAMPOS
        document.querySelector("#txtNombreOficinaER").value = "";
        //SET TITLE MODAL
        document.querySelector("#txtTituloModalMan").innerHTML = "REGISTRAR OFICINA";
        //OPEN MODEL
        $('#ventanaModalOficina').modal('show');
    };

    $("#modalCargandoOficina").on('shown.bs.modal', function () {
        processAjaxOficina();
    });
    $("#ventanaModalOficina").on('hidden.bs.modal', function () {
        beanRequestOficina.operation = "paginate";
        beanRequestOficina.type_request = "GET";
    });
    $("#sizePageOficina").change(function () {
        $('#modalCargandoOficina').modal('show');
    });
    $('#modalCargandoOficina').modal('show');

});

function processAjaxOficina() {
    let parameters_pagination = "";
    let json = "";
    if (beanRequestOficina.operation === "paginate") {
        parameters_pagination = "?nombre=" + document.querySelector("#txtFilterOficina").value.toUpperCase();
        parameters_pagination += "&page=" + document.querySelector("#pageOficina").value;
        parameters_pagination += "&size=" + document.querySelector("#sizePageOficina").value;
    } else {
        parameters_pagination = "";
        if (beanRequestOficina.operation == "delete") {
            parameters_pagination = "/" + oficinaSelected.idoficina;
            json = {};
        } else {
            json = {
                "nombre": document.querySelector("#txtNombreOficinaER").value
            };
            if (beanRequestOficina.operation === "update") {
                json.idoficina = oficinaSelected.idoficina;
            }
        }
    }
    $.ajax({
        url: getHostAndContextAPI() + beanRequestOficina.entity_api + "/" + beanRequestOficina.operation + parameters_pagination,
        type: beanRequestOficina.type_request,
        headers: {
            'Authorization': 'Bearer ' + Cookies.get("sisbu_token")
        },
        data: JSON.stringify(json),
        contentType: 'application/json; charset=utf-8',
        dataType: 'json'
    }).done(function (beanCrudResponse) {
        console.log(beanCrudResponse);
        $('#modalCargandoOficina').modal("hide");
        if (beanCrudResponse.messageServer !== undefined) {
            if (beanCrudResponse.messageServer.toLowerCase() === "ok") {
                showAlertTopEnd('success', 'Acción realizada exitosamente');
                $('#ventanaModalOficina').modal('hide');
            } else {
                showAlertTopEnd('warning', beanCrudResponse.messageServer);
            }
        }
        if (beanCrudResponse.beanPagination !== undefined) {
            beanPaginationOficina = beanCrudResponse.beanPagination;
            toListOficina(beanPaginationOficina);
        }
    }).fail(function (jqXHR, textStatus, errorThrown) {
        $('#modalCargandoOficina').modal("hide");
        showAlertErrorRequest();
        console.log(errorThrown);
    });
}

function toListOficina(beanPagination) {
    document.querySelector("#tbodyOficina").innerHTML = "";
    document.querySelector("#titleManagerOficina").innerHTML = "[ " + beanPagination.count_filter + " ] OFICINAS";
    if (beanPagination.count_filter > 0) {
        let row;
        beanPagination.list.forEach(oficina => {
            row = "<div class='dt-widget__item border-bottom'>";
            row += "<div class='dt-extra animate-slide align-self-center mr-5' idoficina='" + oficina.idoficina + "'>";
            row += "<span class='badge badge-info badge-circle-animate badge-pill badge-sm align-text-top mr-2'>"
            row += "<a class='text-light-gray editar-oficina' data-toggle='tooltip' title='Editar' href='javascript:void(0)'>";
            row += "<i class='text-white icon icon-editors'></i></a>";
            row += "</span>";
            row += "<span class='badge badge-danger badge-circle-animate badge-pill badge-sm align-text-top'>";
            row += "<a class='text-light-gray eliminar-oficina' data-toggle='tooltip' title='ELiminar' href='javascript:void(0)'>";
            row += "<i class='text-white icon icon-trash-filled'></i></a>";
            row += "</span>";
            row += "</div>";

            row += "<div class=' text-truncate '  style='min-width:230px; max-width:50%;'>";
            row += "<p class='dt-widget__subtitle text-truncate text-dark'>";
            row += oficina.nombre + "</p></div>";

            row += "</div>";
            document.querySelector("#tbodyOficina").innerHTML += row;
        });
        buildPagination(
                beanPagination.count_filter,
                parseInt(document.querySelector("#sizePageOficina").value),
                document.querySelector("#pageOficina"),
                $('#modalCargandoOficina'),
                $('#paginationOficina'));
        addEventsOficinaes();
        if (beanRequestOficina.operation === "paginate") {
            document.querySelector("#txtFilterOficina").focus();
        }
        $('[data-toggle="tooltip"]').tooltip();
    } else {
        destroyPagination($('#paginationOficina'));
        showAlertTopEnd('warning', 'No se encontraron resultados');
        document.querySelector("#txtFilterOficina").focus();
    }
}

function addEventsOficinaes() {
    document.querySelectorAll('.editar-oficina').forEach(btn => {
        //AGREGANDO EVENTO CLICK
        btn.onclick = function () {
            oficinaSelected = findByOficina(btn.parentElement.parentElement.getAttribute('idoficina'));
            if (oficinaSelected != undefined) {
                beanRequestOficina.operation = "update";
                beanRequestOficina.type_request = "PUT";
                //SET VALUES MODAL
                document.querySelector("#txtNombreOficinaER").value = oficinaSelected.nombre;
                document.querySelector("#txtTituloModalMan").innerHTML = "EDITAR ÁREA DE ATENCIÓN";
                $('#ventanaModalOficina').modal("show");
                document.querySelector("#txtNombreOficinaER").focus();
            } else {
                showAlertTopEnd('warning', 'No se encontró el Oficina para poder editar');
            }
        };
    });
    document.querySelectorAll('.eliminar-oficina').forEach(btn => {
        //AGREGANDO EVENTO CLICK
        btn.onclick = function () {
            oficinaSelected = findByOficina(btn.parentElement.parentElement.getAttribute('idoficina'));
            if (oficinaSelected != undefined) {
                beanRequestOficina.operation = "delete";
                beanRequestOficina.type_request = "DELETE";
                //SET VALUES MODAL

                $('#modalCargandoOficina').modal("show");
            } else {
                showAlertTopEnd('warning', 'No se encontró el Oficina para poder editar');
            }
        };
    });

}

function findByOficina(idoficina) {
    let oficina_;
    beanPaginationOficina.list.forEach(oficina => {
        if (idoficina == oficina.idoficina) {
            oficina_ = oficina;
            return;
        }
    });
    return oficina_;
}

function validateFormOficina() {
    if (document.querySelector("#txtNombreOficinaER").value == "") {
        showAlertTopEnd('warning', 'Por favor ingrese nombre');
        document.querySelector("#txtNombreOficinaER").focus();
        return false;
    }
    return true;
}