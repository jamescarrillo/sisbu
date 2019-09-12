var beanPaginationOficina;
var oficinaSelected, IdOficina = 0;
var beanRequestOficina = new BeanRequest();
var beanPaginationArea;
var areaSelected;
var beanRequestArea = new BeanRequest();
document.addEventListener("DOMContentLoaded", function () {

    //INICIALIZANDO VARIABLES DE SOLICITUD
    beanRequestOficina.entity_api = "api/oficinas";
    beanRequestOficina.operation = "paginate";
    beanRequestOficina.type_request = "GET";

    $('#FrmOficina').submit(function (event) {
        beanRequestOficina.operation = "paginate";
        beanRequestOficina.type_request = "GET";
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
        document.querySelector("#txtNombreOficina").value = "";
        //SET TITLE MODAL
        document.querySelector("#txtTituloModalMan").innerHTML = "REGISTRAR OFICINA";
        //OPEN MODEL
        $('#ventanaModalOficina').modal('show');
    };

    $("#modalCargandoOficina").on('shown.bs.modal', function () {
        processAjaxOficina();
    });

    $('#modalCargandoOficina').modal('show');

    $("#sizePageOficina").change(function () {
        $('#modalCargandoOficina').modal('show');
    });

    //AREA

    //INICIALIZANDO VARIABLES DE SOLICITUD
    beanRequestArea.entity_api = "api/areas";
    beanRequestArea.operation = "paginate";
    beanRequestArea.type_request = "GET";

    $('#FrmArea').submit(function (event) {
        beanRequestArea.operation = "paginate";
        beanRequestArea.type_request = "GET";
        $('#modalCargandoArea').modal('show');
        event.preventDefault();
        event.stopPropagation();
    });

    $('#FrmAreaModal').submit(function (event) {
        if (validateFormArea()) {
            $('#modalCargandoArea').modal('show');
        }
        event.preventDefault();
        event.stopPropagation();
    });

    document.querySelector("#btnOpenNewArea").onclick = function () {
        //CONFIGURAMOS LA SOLICITUD
        beanRequestArea.operation = "add";
        beanRequestArea.type_request = "POST";
        //LIMPIAR LOS CAMPOS
        document.querySelector("#txtNombreArea").value = "";
        //SET TITLE MODAL
        document.querySelector("#txtTituloModalAreaCRUD").innerHTML = "REGISTRAR AREA";
        //OPEN MODEL
        $('#ventanaModalAreaCRUD').modal('show');
    };

    $("#modalCargandoArea").on('shown.bs.modal', function () {
        processAjaxArea();
    });

    $("#sizePageArea").change(function () {
        $('#modalCargandoArea').modal('show');
    });

});

function processAjaxOficina() {
    let parameters_pagination = "";
    let json = "";
    if (beanRequestOficina.operation == "paginate") {
        parameters_pagination = "?nombre=" + document.querySelector("#txtFilterNombreOficina").value;
        parameters_pagination += "&page=" + document.querySelector("#pageOficina").value;
        parameters_pagination += "&size=" + document.querySelector("#sizePageOficina").value;

    } else {
        parameters_pagination = "";
        if (beanRequestOficina.operation == "delete") {
            parameters_pagination = "/" + oficinaSelected.idoficina;
            json = {};
        } else {
            json = {
                "nombre": document.querySelector("#txtNombreOficina").value
            };
            if (beanRequestOficina.operation == "update") {
                json.idoficina = oficinaSelected.idoficina;
            }
        }
    }
    $.ajax({
        url: getHostAPI() + beanRequestOficina.entity_api + "/" + beanRequestOficina.operation + parameters_pagination,
        type: beanRequestOficina.type_request,
        headers: {
            //'Authorization': 'Bearer ' + Cookies.get("sisbu_token")
        },
        data: JSON.stringify(json),
        contentType: 'application/json; charset=utf-8',
        dataType: 'json'
    }).done(function (beanCrudResponse) {
        console.log(beanCrudResponse);
        $('#modalCargandoOficina').modal("hide");
        if (beanCrudResponse.messageServer !== undefined) {
            if (beanCrudResponse.messageServer.toLowerCase() == "ok") {
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

    });
}

function toListOficina(beanPagination) {
    document.querySelector("#tbodyOficina").innerHTML = "";
    document.querySelector("#titleManagerOficina").innerHTML = "[ " + beanPagination.count_filter + " ] OFICINAS";
    if (beanPagination.count_filter > 0) {
        let row;
        beanPagination.list.forEach(oficina => {
            row = "<tr ";
            row += "idoficina='" + oficina.idoficina + "' ";
            row += ">";
            row += "<td class='text-center align-middle'><button class='btn btn-outline-secondary btn-xs editar-oficina' data-toggle='tooltip' title='Editar'><i class='icon icon-editors icon-fw'></i></button></td>";
            row += "<td class='text-center align-middle'><button class='btn btn-outline-secondary btn-xs eliminar-oficina' data-toggle='tooltip' title='Eliminar'><i class='icon icon-trash icon-fw'></i></button></td>";
            row += "<td class='align-middle'>" + oficina.nombre + "</td>";
            row += "<td class='text-center align-middle'><button class='btn btn-outline-secondary btn-xs ver-area' data-toggle='tooltip' title='Editar Area'><i class='icon icon-editors icon-fw'></i></button></td>";
            row += "</tr>";
            document.querySelector("#tbodyOficina").innerHTML += row;
        });
        buildPagination(
                beanPagination.count_filter,
                parseInt(document.querySelector("#sizePageOficina").value),
                document.querySelector("#pageOficina"),
                $('#modalCargandoOficina'),
                $('#paginationOficina'));
        addEventsOficinaes();
        if (beanRequestOficina.operation == "paginate") {
            document.querySelector("#txtFilterNombreOficina").focus();
        }
        $('[data-toggle="tooltip"]').tooltip();
    } else {
        destroyPagination($('#paginationOficina'));
        showAlertTopEnd('warning', 'No se encontraron resultados');
        document.querySelector("#txtFilterNombreOficina").focus();
    }
}

function addEventsOficinaes() {
    document.querySelectorAll('.ver-area').forEach(btn => {
        //AGREGANDO EVENTO CLICK
        btn.onclick = function () {
            oficinaSelected = findByOficina(btn.parentElement.parentElement.getAttribute('idoficina'));
            if (oficinaSelected != undefined) {
                //SET VALUES MODAL
                console.log(oficinaSelected);
                $('#modalCargandoArea').modal('show');
                IdOficina = oficinaSelected.idoficina;
                processAjaxArea();
                document.querySelector("#txtTituloModalArea").innerHTML = oficinaSelected.nombre;
                $('#ventanaModalArea').modal("show");
            } else {
                showAlertTopEnd('warning', 'No se encontró area para poder editar');
            }
        };
    });
    document.querySelectorAll('.editar-oficina').forEach(btn => {
        //AGREGANDO EVENTO CLICK
        btn.onclick = function () {
            oficinaSelected = findByOficina(btn.parentElement.parentElement.getAttribute('idoficina'));
            if (oficinaSelected != undefined) {
                beanRequestOficina.operation = "update";
                beanRequestOficina.type_request = "PUT";
                //SET VALUES MODAL
                document.querySelector("#txtNombreOficina").value = oficinaSelected.nombre;
                document.querySelector("#txtTituloModalMan").innerHTML = "EDITAR OFICINA";
                $('#ventanaModalOficina').modal("show");
                document.querySelector("#txtNombreOficina").focus();
            } else {
                showAlertTopEnd('warning', 'No se encontró la Oficina para poder editar');
            }
        };
    });
    document.querySelectorAll('.eliminar-oficina').forEach(btn => {
        //AGREGANDO EVENTO CLICK
        btn.onclick = function () {
            oficinaSelected = findByOficina(btn.parentElement.parentElement.getAttribute('idoficina'));
            beanRequestOficina.operation = "delete";
            beanRequestOficina.type_request = "DELETE";
            processAjaxOficina();
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
    if (document.querySelector("#txtNombreOficina").value == "") {
        showAlertTopEnd('warning', 'Por favor ingrese nombre');
        document.querySelector("#txtNombreOficina").focus();
        return false;
    }
    return true;
}

//AREA
function processAjaxArea() {
    let parameters_pagination = "";
    let json = "";
    if (beanRequestArea.operation == "paginate") {
        parameters_pagination = "?nombre=" + document.querySelector("#txtFilterNombreArea").value;
        parameters_pagination += "&page=1";
        parameters_pagination += "&size=50";

    } else {
        parameters_pagination = "";
        if (beanRequestArea.operation == "delete") {
            parameters_pagination = "/" + areaSelected.idarea;
            json = {};
        } else {
            json = {
                "nombre": document.querySelector("#txtNombreArea").value,
                "nom_abreviado": document.querySelector("#txtAbreviadoArea").value,
                "oficina": {"idoficina": IdOficina}
            };
            if (beanRequestArea.operation == "update") {
                json.idarea = areaSelected.idarea;
            }
        }
    }
    $.ajax({
        url: getHostAPI() + beanRequestArea.entity_api + "/" + beanRequestArea.operation + parameters_pagination,
        type: beanRequestArea.type_request,
        headers: {
            //'Authorization': 'Bearer ' + Cookies.get("sisbu_token")
        },
        data: JSON.stringify(json),
        contentType: 'application/json; charset=utf-8',
        dataType: 'json'
    }).done(function (beanCrudResponse) {
        $('#modalCargandoArea').modal("hide");
        if (beanCrudResponse.messageServer !== undefined) {
            if (beanCrudResponse.messageServer.toLowerCase() == "ok") {
                showAlertTopEnd('success', 'Acción realizada exitosamente');
                $('#ventanaModalAreaCRUD').modal('hide');
            } else {
                showAlertTopEnd('warning', beanCrudResponse.messageServer);
            }
        }
        if (beanCrudResponse.beanPagination !== undefined) {
            beanPaginationArea = beanCrudResponse.beanPagination;
            areaSelected = findByAreaIDOfic(IdOficina);
            toListArea(areaSelected);
        }
    }).fail(function (jqXHR, textStatus, errorThrown) {
        $('#modalCargandoArea').modal("hide");
        showAlertErrorRequest();

    });
}

function toListArea(beanPagination) {
    document.querySelector("#tbodyArea").innerHTML = "";
    document.querySelector("#titleManagerArea").innerHTML = "[ " + beanPagination.length + " ] Areas";
    if (beanPagination.length > 0) {
        let row;
        beanPagination.forEach(area => {
            row = "<tr ";
            row += "idarea='" + area.idarea + "' ";
            row += ">";
            row += "<td class='text-center align-middle'><button class='btn btn-outline-secondary btn-xs editar-area' data-toggle='tooltip' title='Editar'><i class='icon icon-editors icon-fw'></i></button></td>";
            row += "<td class='text-center align-middle'><button class='btn btn-outline-secondary btn-xs eliminar-area' data-toggle='tooltip' title='Eliminar'><i class='icon icon-trash icon-fw'></i></button></td>";
            row += "<td class='align-middle'>" + area.nombre + "</td>";
            row += "</tr>";
            document.querySelector("#tbodyArea").innerHTML += row;
        });
        addEventsArea();
        if (beanRequestArea.operation == "paginate") {
            document.querySelector("#txtFilterNombreArea").focus();
        }
        $('[data-toggle="tooltip"]').tooltip();
    } else {
        destroyPagination($('#paginationArea'));
        showAlertTopEnd('warning', 'No se encontraron resultados');
        document.querySelector("#txtFilterNombreArea").focus();
    }
}

function addEventsArea() {

    document.querySelectorAll('.editar-area').forEach(btn => {
        //AGREGANDO EVENTO CLICK
        btn.onclick = function () {
            areaSelected = findByArea(btn.parentElement.parentElement.getAttribute('idarea'));
            if (areaSelected != undefined) {
                beanRequestArea.operation = "update";
                beanRequestArea.type_request = "PUT";
                //SET VALUES MODAL
                document.querySelector("#txtNombreArea").value = areaSelected.nombre;
                document.querySelector("#txtTituloModalAreaCRUD").innerHTML = "EDITAR AREA";
                $('#ventanaModalAreaCRUD').modal("show");
                document.querySelector("#txtNombreArea").focus();
            } else {
                showAlertTopEnd('warning', 'No se encontró la Area para poder editar');
            }
        };
    });
    document.querySelectorAll('.eliminar-area').forEach(btn => {
        //AGREGANDO EVENTO CLICK
        btn.onclick = function () {
            areaSelected = findByArea(btn.parentElement.parentElement.getAttribute('idarea'));
            beanRequestArea.operation = "delete";
            beanRequestArea.type_request = "DELETE";
            processAjaxArea();
        };
    });
}

function findByArea(idarea) {
    let area_;
    beanPaginationArea.list.forEach(area => {
        if (idarea == area.idarea) {
            area_ = area;
            return;
        }
    });
    return area_;
}

function findByAreaIDOfic(idoficina) {
    let area_ = [];
    beanPaginationArea.list.forEach(area => {
        if (idoficina === area.oficina.idoficina) {
            area_.push({idarea: area.idarea,
                nombre: area.nombre});
        }
    });
    console.log(area_);
    return area_;
}

function validateFormArea() {
    if (document.querySelector("#txtNombreArea").value == "") {
        showAlertTopEnd('warning', 'Por favor ingrese nombre');
        document.querySelector("#txtNombreArea").focus();
        return false;
    }
    return true;
}