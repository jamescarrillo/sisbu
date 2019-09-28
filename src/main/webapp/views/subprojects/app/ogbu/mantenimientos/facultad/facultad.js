var beanPaginationFacultad;
var facultadSelected, IdFacultad = 0;
var beanRequestFacultad = new BeanRequest();
var beanPaginationEscuela;
var escuelaSelected;
var beanRequestEscuela = new BeanRequest();
document.addEventListener("DOMContentLoaded", function () {

    //INICIALIZANDO VARIABLES DE SOLICITUD
    beanRequestFacultad.entity_api = "api/facultades";
    beanRequestFacultad.operation = "paginate";
    beanRequestFacultad.type_request = "GET";

    $('#FrmFacultad').submit(function (event) {
        beanRequestFacultad.operation = "paginate";
        beanRequestFacultad.type_request = "GET";
        $('#modalCargandoFacultad').modal('show');
        event.preventDefault();
        event.stopPropagation();
    });

    $('#FrmFacultadModal').submit(function (event) {
        if (validateFormFacultad()) {
            $('#modalCargandoFacultad').modal('show');
        }
        event.preventDefault();
        event.stopPropagation();
    });

    document.querySelector("#btnOpenNewFacultad").onclick = function () {
        //CONFIGURAMOS LA SOLICITUD
        beanRequestFacultad.operation = "add";
        beanRequestFacultad.type_request = "POST";
        //LIMPIAR LOS CAMPOS
        document.querySelector("#txtNombreFacultad").value = "";
        document.querySelector("#txtAbreviadoFacultad").value = "";
        //SET TITLE MODAL
        document.querySelector("#txtTituloModalMan").innerHTML = "REGISTRAR FACULTAD";
        //OPEN MODEL
        $('#ventanaModalFacultad').modal('show');
    };

    $("#modalCargandoFacultad").on('shown.bs.modal', function () {
        processAjaxFacultad();
    });

    $("#modalCargandoFacultad").on('hide.bs.modal', function () {
        beanRequestFacultad.operation = "paginate";
        beanRequestFacultad.type_request = "GET";
    });

    $('#modalCargandoFacultad').modal('show');

    $("#sizePageFacultad").change(function () {
        $('#modalCargandoFacultad').modal('show');
    });


    //ESCUELA

    //INICIALIZANDO VARIABLES DE SOLICITUD
    beanRequestEscuela.entity_api = "api/escuelas";
    beanRequestEscuela.operation = "paginate";
    beanRequestEscuela.type_request = "GET";

    $('#FrmEscuela').submit(function (event) {
        beanRequestEscuela.operation = "paginate";
        beanRequestEscuela.type_request = "GET";
        $('#modalCargandoEscuela').modal('show');
        event.preventDefault();
        event.stopPropagation();
    });

    $('#FrmEscuelaModal').submit(function (event) {
        if (validateFormEscuela()) {
            $('#modalCargandoEscuela').modal('show');
        }
        event.preventDefault();
        event.stopPropagation();
    });

    document.querySelector("#btnOpenNewEscuela").onclick = function () {
        //CONFIGURAMOS LA SOLICITUD
        beanRequestEscuela.operation = "add";
        beanRequestEscuela.type_request = "POST";
        //LIMPIAR LOS CAMPOS
        document.querySelector("#txtNombreEscuela").value = "";
        document.querySelector("#txtAbreviadoEscuela").value = "";
        //SET TITLE MODAL
        document.querySelector("#txtTituloModalEscuelaCRUD").innerHTML = "REGISTRAR ESCUELA";
        //OPEN MODEL
        $('#ventanaModalEscuelaCRUD').modal('show');
    };

    $("#modalCargandoEscuela").on('shown.bs.modal', function () {
        processAjaxEscuela();
    });

    $("#modalCargandoEscuela").on('hide.bs.modal', function () {

        beanRequestEscuela.operation = "paginate";
        beanRequestEscuela.type_request = "GET";

    });

    // 

    $("#sizePageEscuela").change(function () {
        $('#modalCargandoEscuela').modal('show');
    });




});

function processAjaxFacultad() {
    let parameters_pagination = "";
    let json = "";
    if (beanRequestFacultad.operation == "paginate") {
        parameters_pagination = "?nombre=" + document.querySelector("#txtFilterNombreFacultad").value;
        parameters_pagination += "&page=" + document.querySelector("#pageFacultad").value;
        parameters_pagination += "&size=" + document.querySelector("#sizePageFacultad").value;

    } else {

        parameters_pagination = "";
        if (beanRequestFacultad.operation == "delete") {
            parameters_pagination = "/" + facultadSelected.idfacultad;
            json = {};
        } else {
            json = {
                "nombre": document.querySelector("#txtNombreFacultad").value,
                "abreviado": document.querySelector("#txtAbreviadoFacultad").value
            };
            if (beanRequestFacultad.operation == "update") {
                json.idfacultad = facultadSelected.idfacultad;
            }
        }


    }
    $.ajax({
        url: getHostAPI() + beanRequestFacultad.entity_api + "/" + beanRequestFacultad.operation + parameters_pagination,
        type: beanRequestFacultad.type_request,
        headers: {
            //'Authorization': 'Bearer ' + Cookies.get("sisbu_token")
        },
        data: JSON.stringify(json),
        contentType: 'application/json; charset=utf-8',
        dataType: 'json'
    }).done(function (beanCrudResponse) {
        console.log(beanCrudResponse);
        $('#modalCargandoFacultad').modal("hide");
        if (beanCrudResponse.messageServer !== undefined) {
            if (beanCrudResponse.messageServer.toLowerCase() == "ok") {
                showAlertTopEnd('success', 'Acción realizada exitosamente');
                $('#ventanaModalFacultad').modal('hide');
            } else {
                showAlertTopEnd('warning', beanCrudResponse.messageServer);
            }
        }
        if (beanCrudResponse.beanPagination !== undefined) {
            beanPaginationFacultad = beanCrudResponse.beanPagination;
            toListFacultad(beanPaginationFacultad);
        }
    }).fail(function (jqXHR, textStatus, errorThrown) {
        $('#modalCargandoFacultad').modal("hide");
        showAlertErrorRequest();

    });
}

function toListFacultad(beanPagination) {
    document.querySelector("#tbodyFacultad").innerHTML = "";
    document.querySelector("#titleManagerFacultad").innerHTML = "[ " + beanPagination.count_filter + " ] FACULTADES";
    if (beanPagination.count_filter > 0) {
        let row;
        beanPagination.list.forEach(facultad => {
            row = "<tr ";
            row += "idfacultad='" + facultad.idfacultad + "' ";
            row += ">";
            row += "<td><ul class='dt-list dt-list-cm-0'>";
            row += "<li class='dt-list__item editar-facultad' data-toggle='tooltip' title='Editar'><a class='text-light-gray' href='javascript:void(0)'>";
            row += "<i class='icon icon-editors'></i></a></li>";
            row += "<li class='dt-list__item eliminar-facultad' data-toggle='tooltip' title='Eliminar'><a class='text-light-gray' href='javascript:void(0)'>";
            row += "<i class='icon icon-trash-filled'></i></a></li>";
            row += "</ul></td>";
            row += "<td class='align-middle'>" + facultad.nombre + "</td>";
            row += "<td class='align-middle'>" + facultad.abreviado + "</td>";
            row += "<td class='text-center align-middle'><button class='btn btn-outline-primary btn-xs ver-escuela' data-toggle='tooltip' title='Editar Escuela'><i class='icon icon-list icon-fw'></i></button></td>";
            row += "</tr>";
            document.querySelector("#tbodyFacultad").innerHTML += row;
        });
        buildPagination(
                beanPagination.count_filter,
                parseInt(document.querySelector("#sizePageFacultad").value),
                document.querySelector("#pageFacultad"),
                $('#modalCargandoFacultad'),
                $('#paginationFacultad'));
        addEventsFacultades();
        if (beanRequestFacultad.operation == "paginate") {
            document.querySelector("#txtFilterNombreFacultad").focus();
        }
        $('[data-toggle="tooltip"]').tooltip();
    } else {
        destroyPagination($('#paginationFacultad'));
        showAlertTopEnd('warning', 'No se encontraron resultados');
        document.querySelector("#txtFilterNombreFacultad").focus();
    }
}

function addEventsFacultades() {
    document.querySelectorAll('.ver-escuela').forEach(btn => {
        //AGREGANDO EVENTO CLICK
        btn.onclick = function () {
            facultadSelected = findByFacultad(btn.parentElement.parentElement.getAttribute('idfacultad'));
            if (facultadSelected != undefined) {
                //SET VALUES MODAL
                console.log(facultadSelected);
                $('#modalCargandoEscuela').modal('show');
                IdFacultad = facultadSelected.idfacultad;
                document.querySelector("#tablaEscuela-height").style.height = "0px";
                processAjaxEscuela();
                document.querySelector("#txtTituloModalEscuela").innerHTML = facultadSelected.nombre;
                $('#ventanaModalEscuela').modal("show");
            } else {
                showAlertTopEnd('warning', 'No se encontró escuela para poder editar');
            }
        };
    });
    document.querySelectorAll('.editar-facultad').forEach(btn => {
        //AGREGANDO EVENTO CLICK
        btn.onclick = function () {
            facultadSelected = findByFacultad(btn.parentElement.parentElement.parentElement.getAttribute('idfacultad'));
            if (facultadSelected != undefined) {
                beanRequestFacultad.operation = "update";
                beanRequestFacultad.type_request = "PUT";
                //SET VALUES MODAL
                document.querySelector("#txtNombreFacultad").value = facultadSelected.nombre;
                document.querySelector("#txtAbreviadoFacultad").value = facultadSelected.abreviado;
                document.querySelector("#txtTituloModalMan").innerHTML = "EDITAR FACULTAD";
                $('#ventanaModalFacultad').modal("show");
                document.querySelector("#txtNombreFacultad").focus();
            } else {
                showAlertTopEnd('warning', 'No se encontró la Facultad para poder editar');
            }
        };
    });
    document.querySelectorAll('.eliminar-facultad').forEach(btn => {
        //AGREGANDO EVENTO CLICK
        btn.onclick = function () {
            facultadSelected = findByFacultad(btn.parentElement.parentElement.parentElement.getAttribute('idfacultad'));
            beanRequestFacultad.operation = "delete";
            beanRequestFacultad.type_request = "DELETE";
            processAjaxFacultad();
        };
    });
}

function findByFacultad(idfacultad) {
    let facultad_;
    beanPaginationFacultad.list.forEach(facultad => {
        if (idfacultad == facultad.idfacultad) {
            facultad_ = facultad;
            return;
        }
    });
    return facultad_;
}

function validateFormFacultad() {
    if (document.querySelector("#txtNombreFacultad").value == "") {
        showAlertTopEnd('warning', 'Por favor ingrese nombre');
        document.querySelector("#txtNombreFacultad").focus();
        return false;
    } else if (document.querySelector("#txtAbreviadoFacultad").value == 0) {
        showAlertTopEnd('warning', 'Por favor ingrese abreviatura ');
        document.querySelector("#txtAbreviadoFacultad").focus();
        return false;
    }
    return true;
}

//ESCUELA
function processAjaxEscuela() {
    let parameters_pagination = "";
    let json = "";
    if (beanRequestEscuela.operation == "paginate") {
        parameters_pagination = "?nombre=" + document.querySelector("#txtFilterNombreEscuela").value;
        parameters_pagination += "&page=1";
        parameters_pagination += "&size=50";

    } else {

        parameters_pagination = "";
        if (beanRequestEscuela.operation == "delete") {
            parameters_pagination = "/" + escuelaSelected.idescuela;
            json = {};
        } else {
            json = {
                "nombre": document.querySelector("#txtNombreEscuela").value,
                "abreviado": document.querySelector("#txtAbreviadoEscuela").value,
                "idfacultad": {"idfacultad": IdFacultad}
            };
            if (beanRequestEscuela.operation == "update") {
                json.idescuela = escuelaSelected.idescuela;
            }
        }
    }
    $.ajax({
        url: getHostAPI() + beanRequestEscuela.entity_api + "/" + beanRequestEscuela.operation + parameters_pagination,
        type: beanRequestEscuela.type_request,
        headers: {
            //'Authorization': 'Bearer ' + Cookies.get("sisbu_token")
        },
        data: JSON.stringify(json),
        contentType: 'application/json; charset=utf-8',
        dataType: 'json'
    }).done(function (beanCrudResponse) {
        $('#modalCargandoEscuela').modal("hide");
        if (beanCrudResponse.messageServer !== undefined) {
            if (beanCrudResponse.messageServer.toLowerCase() == "ok") {
                showAlertTopEnd('success', 'Acción realizada exitosamente');
                $('#ventanaModalEscuelaCRUD').modal('hide');
            } else {
                showAlertTopEnd('warning', beanCrudResponse.messageServer);
            }
        }
        if (beanCrudResponse.beanPagination !== undefined) {
            beanPaginationEscuela = beanCrudResponse.beanPagination;
            console.log("escuela");
            console.log(beanPaginationEscuela);
            escuelaSelected = findByEscuelaIDFacu(IdFacultad);
            toListEscuela(escuelaSelected);
        }
    }).fail(function (jqXHR, textStatus, errorThrown) {
        $('#modalCargandoEscuela').modal("hide");
        showAlertErrorRequest();

    });
}

function toListEscuela(beanPagination) {
    document.querySelector("#tablaEscuela-height").style.height = "185px";
    document.querySelector("#tbodyEscuela").innerHTML = "";
    document.querySelector("#titleManagerEscuela").innerHTML = "[ " + beanPagination.length + " ] Escuelas";
    if (beanPagination.length > 0) {
        let row;
        beanPagination.forEach(escuela => {
            row = "<tr ";
            row += "idescuela='" + escuela.idescuela + "' ";
            row += ">";
            row += "<td><ul class='dt-list dt-list-cm-0'>";
            row += "<li class='dt-list__item editar-escuela' data-toggle='tooltip' title='Editar'><a class='text-light-gray' href='javascript:void(0)'>";
            row += "<i class='icon icon-editors'></i></a></li>";
            row += "<li class='dt-list__item eliminar-escuela' data-toggle='tooltip' title='Eliminar'><a class='text-light-gray' href='javascript:void(0)'>";
            row += "<i class='icon icon-trash-filled'></i></a></li>";
            row += "</ul></td>";
            row += "<td class='align-middle'>" + escuela.nombre + "</td>";
            row += "<td class='align-middle'>" + escuela.abreviado + "</td>";
            row += "</tr>";
            document.querySelector("#tbodyEscuela").innerHTML += row;
        });
        addEventsEscuela();
        if (beanRequestEscuela.operation == "paginate") {
            document.querySelector("#txtFilterNombreEscuela").focus();
        }
        $('[data-toggle="tooltip"]').tooltip();
    } else {
        destroyPagination($('#paginationEscuela'));
        showAlertTopEnd('warning', 'No se encontraron resultados');
        document.querySelector("#txtFilterNombreEscuela").focus();
    }
}

function addEventsEscuela() {
    document.querySelectorAll('.editar-escuela').forEach(btn => {
        //AGREGANDO EVENTO CLICK
        btn.onclick = function () {
            escuelaSelected = findByEscuela(btn.parentElement.parentElement.parentElement.getAttribute('idescuela'));
            if (escuelaSelected != undefined) {
                beanRequestEscuela.operation = "update";
                beanRequestEscuela.type_request = "PUT";
                //SET VALUES MODAL
                document.querySelector("#txtNombreEscuela").value = escuelaSelected.nombre;
                document.querySelector("#txtAbreviadoEscuela").value = escuelaSelected.abreviado;
                document.querySelector("#txtTituloModalEscuelaCRUD").innerHTML = "EDITAR ESCUELA";
                $('#ventanaModalEscuelaCRUD').modal("show");
                document.querySelector("#txtNombreEscuela").focus();
            } else {
                showAlertTopEnd('warning', 'No se encontró la Escuela para poder editar');
            }
        };
    });
    document.querySelectorAll('.eliminar-escuela').forEach(btn => {
        //AGREGANDO EVENTO CLICK
        btn.onclick = function () {
            escuelaSelected = findByEscuela(btn.parentElement.parentElement.parentElement.getAttribute('idescuela'));
            beanRequestEscuela.operation = "delete";
            beanRequestEscuela.type_request = "DELETE";
            processAjaxEscuela();
        };
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

function findByEscuelaIDFacu(idfacultad) {
    let escuela_ = [];
    beanPaginationEscuela.list.forEach(escuela => {
        if (idfacultad === escuela.idfacultad.idfacultad) {
            escuela_.push({idescuela: escuela.idescuela,
                nombre: escuela.nombre,
                abreviado: escuela.abreviado});
        }
    });
    console.log(escuela_);
    return escuela_;
}

function validateFormEscuela() {
    if (document.querySelector("#txtNombreEscuela").value == "") {
        showAlertTopEnd('warning', 'Por favor ingrese nombre');
        document.querySelector("#txtNombreEscuela").focus();
        return false;
    } else if (document.querySelector("#txtAbreviadoEscuela").value == 0) {
        showAlertTopEnd('warning', 'Por favor ingrese abreviatura ');
        document.querySelector("#txtAbreviadoEscuela").focus();
        return false;
    }
    return true;
}