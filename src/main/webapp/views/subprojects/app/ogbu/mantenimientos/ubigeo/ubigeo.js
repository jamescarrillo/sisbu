var beanPaginationDistrito;
var distritoSelected, IdDistrito = 0;
var beanRequestDistrito = new BeanRequest();

var beanPaginationProvincia;
var provinciaSelected;
var beanRequestProvincia = new BeanRequest();

var beanPaginationDepartamento;
var departamentoSelected;
var beanRequestDepartamento = new BeanRequest();

document.addEventListener("DOMContentLoaded", function () {

    //INICIALIZANDO VARIABLES DE SOLICITUD
    beanRequestDistrito.entity_api = "api/distritos";
    beanRequestDistrito.operation = "paginate";
    beanRequestDistrito.type_request = "GET";

    document.querySelector("#titleManagerProvincia").onclick = function () {
        //$('#modalCargandoDistrito').modal('show');
    };

    $('#modalCargandoDistrito').modal('show');

    $('#FrmDistrito').submit(function (event) {
        beanRequestDistrito.operation = "paginate";
        beanRequestDistrito.type_request = "GET";
        $('#modalCargandoDistrito').modal('show');
        event.preventDefault();
        event.stopPropagation();
    });

    $('#FrmDistritoModal').submit(function (event) {
        if (validateFormDistrito()) {
            $('#modalCargandoDistrito').modal('show');
        }
        event.preventDefault();
        event.stopPropagation();
    });

    document.querySelector("#btnOpenNewDistrito").onclick = function () {
        $('#modalCargandoProvincia').modal('show');
        //CONFIGURAMOS LA SOLICITUD
        beanRequestDistrito.operation = "add";
        beanRequestDistrito.type_request = "POST";
        //LIMPIAR LOS CAMPOS
        document.querySelector("#ResultadoTablaProvincia").style.height = "139px";
        beanRequestProvincia.operation = "paginate";
        beanRequestProvincia.type_request = "GET";
        processAjaxProvincia(0);
        listFilterProvincia();
        document.querySelector("#txtNombreDistrito").value = "";
        document.querySelector("#txtFilterProvinciaER").value = "";
        //SET TITLE MODAL
        document.querySelector("#txtTituloModalDistrito").innerHTML = "REGISTRAR DISTRITO";
        //OPEN MODEL
        $('#ventanaModalDistrito').modal('show');
    };

    $("#modalCargandoDistrito").on('shown.bs.modal', function () {
        if (!$('#ventanaModalDistrito').hasClass("show")) {
            beanRequestDistrito.operation = "paginate";
            beanRequestDistrito.type_request = "GET";
            console.log("cerrado");
        }
        processAjaxDistrito();
    });

    $("#sizePageDistrito").change(function () {
        $('#modalCargandoDistrito').modal('show');
    });

    //PROVINCIA
    //INICIALIZANDO VARIABLES DE SOLICITUD
    beanRequestProvincia.entity_api = "api/provincias";
    beanRequestProvincia.operation = "paginate";
    beanRequestProvincia.type_request = "GET";

    $('#modalCargandoProvincia').modal('show');

    $('#FrmProvincia').submit(function (event) {
        beanRequestProvincia.operation = "paginate";
        beanRequestProvincia.type_request = "GET";
        $('#modalCargandoProvincia').modal('show');
        event.preventDefault();
        event.stopPropagation();
    });

    $('#FrmProvinciaModal').submit(function (event) {
        if (validateFormProvincia()) {
            $('#modalCargandoProvincia').modal('show');
        }
        console.log("accion");
        event.preventDefault();
        event.stopPropagation();
    });

    document.querySelector("#btnOpenNewProvincia").onclick = function () {
        $('#modalCargandoDepartamento').modal('show');
        //CONFIGURAMOS LA SOLICITUD
        beanRequestProvincia.operation = "add";
        beanRequestProvincia.type_request = "POST";
        //LIMPIAR LOS CAMPOS
        document.querySelector("#ResultadoTablaDepartamento").style.height = "139px";
        processAjaxDepartamento(0);
        listFilterDepartamento();
        document.querySelector("#txtNombreProvincia").value = "";
        document.querySelector("#txtFilterDepartamentoER").value = "";
        //SET TITLE MODAL
        document.querySelector("#txtTituloModalProvincia").innerHTML = "REGISTRAR PROVINCIA";
        //OPEN MODEL
        $('#ventanaModalProvincia').modal('show');
    };

    $("#modalCargandoProvincia").on('shown.bs.modal', function () {
        if (!$('#ventanaModalProvincia').hasClass("show")) {
            beanRequestProvincia.operation = "paginate";
            beanRequestProvincia.type_request = "GET";
            console.log("cerrado");
        }
        processAjaxProvincia();
    });

    $("#sizePageProvincia").change(function () {
        $('#modalCargandoProvincia').modal('show');
    });

    //DEPARTAMENTOS

    //INICIALIZANDO VARIABLES DE SOLICITUD
    beanRequestDepartamento.entity_api = "api/departamentos";
    beanRequestDepartamento.operation = "paginate";
    beanRequestDepartamento.type_request = "GET";

    $('#modalCargandoDepartamento').modal('show');

    $('#FrmDepartamento').submit(function (event) {
        beanRequestDepartamento.operation = "paginate";
        beanRequestDepartamento.type_request = "GET";
        $('#modalCargandoDepartamento').modal('show');
        event.preventDefault();
        event.stopPropagation();
    });

    $('#FrmDepartamentoModal').submit(function (event) {
        if (validateFormDepartamento()) {
            $('#modalCargandoDepartamento').modal('show');
        }
        event.preventDefault();
        event.stopPropagation();
    });

    document.querySelector("#btnOpenNewDepartamento").onclick = function () {
        //CONFIGURAMOS LA SOLICITUD
        beanRequestDepartamento.operation = "add";
        beanRequestDepartamento.type_request = "POST";
        //LIMPIAR LOS CAMPOS
        document.querySelector("#txtNombreDepartamento").value = "";
        //SET TITLE MODAL
        document.querySelector("#txtTituloModalDepartamento").innerHTML = "REGISTRAR DEPARTAMENTO";
        //OPEN MODEL
        $('#ventanaModalDepartamento').modal('show');
    };

    $("#modalCargandoDepartamento").on('shown.bs.modal', function () {
        if (!$('#ventanaModalDepartamento').hasClass("show")) {
            beanRequestDepartamento.operation = "paginate";
            beanRequestDepartamento.type_request = "GET";
            console.log("cerrado");
        }
        processAjaxDepartamento(1);
    });

    $("#sizePageDepartamento").change(function () {
        $('#modalCargandoDepartamento').modal('show');
    });

});


function processAjaxDistrito() {
    let parameters_pagination = "";
    let json = "";
    if (beanRequestDistrito.operation == "paginate") {
        parameters_pagination = "?nombre=" + document.querySelector("#txtFilterNombreDistrito").value;
        parameters_pagination += "&page=" + document.querySelector("#pageDistrito").value;
        parameters_pagination += "&size=" + document.querySelector("#sizePageDistrito").value;

    } else {

        parameters_pagination = "";
        if (beanRequestDistrito.operation == "delete") {
            parameters_pagination = "/" + distritoSelected.iddistrito;
            json = {};
        } else {
            json = {
                "nombre": document.querySelector("#txtNombreDistrito").value,
                "idprovincia": {
                    "idprovincia": provinciaSelected.idprovincia}
            };
            if (beanRequestDistrito.operation == "update") {
                json.iddistrito = distritoSelected.iddistrito;
            }
        }


    }
    $.ajax({
        url: getHostAPI() + beanRequestDistrito.entity_api + "/" + beanRequestDistrito.operation + parameters_pagination,
        type: beanRequestDistrito.type_request,
        headers: {
            'Authorization': 'Bearer ' + Cookies.get("sisbu_token")
        },
        data: JSON.stringify(json),
        contentType: 'application/json; charset=utf-8',
        dataType: 'json'
    }).done(function (beanCrudResponse) {
        $('#modalCargandoDistrito').modal("hide");
        if (beanCrudResponse.messageServer !== undefined) {
            if (beanCrudResponse.messageServer.toLowerCase() == "ok") {
                showAlertTopEnd('success', 'Acción realizada exitosamente');
                beanRequestDistrito.operation = "paginate";
                beanRequestDistrito.type_request = "GET";
                $('#ventanaModalDistrito').modal('hide');
            } else {
                showAlertTopEnd('warning', beanCrudResponse.messageServer);
            }
        }
        if (beanCrudResponse.beanPagination !== undefined) {
            beanPaginationDistrito = beanCrudResponse.beanPagination;
            toListDistrito(beanPaginationDistrito);
        }
    }).fail(function (jqXHR, textStatus, errorThrown) {
        $('#modalCargandoDistrito').modal("hide");
        showAlertErrorRequest();

    });
}

function toListDistrito(beanPagination) {
    document.querySelector("#tbodyDistrito").innerHTML = "";
    document.querySelector("#titleManagerDistrito").innerHTML = "[ " + beanPagination.count_filter + " ] DISTRITOS";
    if (beanPagination.count_filter > 0) {
        let row;
        beanPagination.list.forEach(distrito => {
            row = "<tr ";
            row += "iddistrito='" + distrito.iddistrito + "' ";
            row += ">";
            row += "<td><ul class='dt-list dt-list-cm-0'>";
            row += "<li class='dt-list__item editar-distrito'data-toggle='tooltip' title='Editar'><a class='text-light-gray' href='javascript:void(0)'>";
            row += "<i class='text-primary icon icon-editors'></i></a></li>";
            row += "<li class='dt-list__item eliminar-distrito'data-toggle='tooltip' title='Eliminar'><a class='text-light-gray' href='javascript:void(0)'>";
            row += "<i class='text-danger icon icon-trash-filled'></i></a></li>";
            row += "</ul></td>";
            row += "<td class='align-middle'>" + distrito.nombre + "</td>";
            row += "</tr>";
            document.querySelector("#tbodyDistrito").innerHTML += row;
        });
        buildPagination(
                beanPagination.count_filter,
                parseInt(document.querySelector("#sizePageDistrito").value),
                document.querySelector("#pageDistrito"),
                $('#modalCargandoDistrito'),
                $('#paginationDistrito'));
        addEventsDistritoes();
        if (beanRequestDistrito.operation == "paginate") {
            document.querySelector("#txtFilterNombreDistrito").focus();
        }
        $('[data-toggle="tooltip"]').tooltip();
    } else {
        destroyPagination($('#paginationDistrito'));
        showAlertTopEnd('warning', 'No se encontraron resultados');
        document.querySelector("#txtFilterNombreDistrito").focus();
    }
}

function addEventsDistritoes() {
    document.querySelectorAll('.agregar-provincia').forEach(btn => {
        //AGREGANDO EVENTO CLICK
        btn.onclick = function () {
            console.log(btn.parentElement.getAttribute('idprovincia'));
            provinciaSelected = findByProvincia(btn.parentElement.getAttribute('idprovincia'));
            console.log(provinciaSelected);
            if (provinciaSelected != undefined) {
                //SET VALUES MODAL
                document.querySelector("#txtFilterProvinciaER").value = provinciaSelected.nombre;
                document.querySelector("#ResultadoTablaProvincia").style.height = "0px";
                document.querySelector("#ResultadoTablaProvincia").innerHTML = "";

            } else {
                showAlertTopEnd('warning', 'No se encontró el Provincia para poder editar');
            }
        };
    });
    document.querySelectorAll('.editar-distrito').forEach(btn => {
        //AGREGANDO EVENTO CLICK
        btn.onclick = function () {
            $('#modalCargandoProvincia').modal('show');
            document.querySelector("#ResultadoTablaProvincia").style.height = "139px";
            processAjaxProvincia(0);
            listFilterProvincia();
            distritoSelected = findByDistrito(btn.parentElement.parentElement.parentElement.getAttribute('iddistrito'));
            console.log(distritoSelected);
            if (distritoSelected != undefined) {
                beanRequestDistrito.operation = "update";
                beanRequestDistrito.type_request = "PUT";
                //SET VALUES MODAL
                document.querySelector("#txtNombreDistrito").value = distritoSelected.nombre;
                document.querySelector("#txtFilterProvinciaER").value = distritoSelected.idprovincia.nombre;
                document.querySelector("#txtTituloModalDistrito").innerHTML = "EDITAR DISTRITO";
                $('#ventanaModalDistrito').modal("show");
                document.querySelector("#txtNombreDistrito").focus();
            } else {
                showAlertTopEnd('warning', 'No se encontró la Distrito para poder editar');
            }
            $('#modalCargandoProvincia').modal('show');
        };
    });
    document.querySelectorAll('.eliminar-distrito').forEach(btn => {
        //AGREGANDO EVENTO CLICK
        btn.onclick = function () {
            distritoSelected = findByDistrito(btn.parentElement.parentElement.parentElement.getAttribute('iddistrito'));
            beanRequestDistrito.operation = "delete";
            beanRequestDistrito.type_request = "DELETE";
            processAjaxDistrito();
        };
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

function validateFormDistrito() {
    if (document.querySelector("#txtNombreDistrito").value == "") {
        showAlertTopEnd('warning', 'Por favor ingrese nombre');
        document.querySelector("#txtNombreDistrito").focus();
        return false;
    } else if (document.querySelector("#txtAbreviadoDistrito").value == 0) {
        showAlertTopEnd('warning', 'Por favor ingrese abreviatura ');
        document.querySelector("#txtAbreviadoDistrito").focus();
        return false;
    }
    return true;
}

//PROVINCIA
function processAjaxProvincia(ubicacion) {
    let parameters_pagination = "";
    let json = "";
    console.log("depa id");
    console.log(departamentoSelected);
    if (beanRequestProvincia.operation == "paginate") {
        parameters_pagination = "?nombre=" + document.querySelector("#txtFilterNombreProvincia").value;
        parameters_pagination += "&page=" + document.querySelector("#pageProvincia").value;
        parameters_pagination += "&size=" + document.querySelector("#sizePageProvincia").value;

    } else {

        parameters_pagination = "";
        if (beanRequestProvincia.operation == "delete") {
            parameters_pagination = "/" + provinciaSelected.idprovincia;
            json = {};
        } else {
            json = {
                "nombre": document.querySelector("#txtNombreProvincia").value,
                "iddepartamento": {
                    "iddepartamento": departamentoSelected.iddepartamento
                }

            };
            if (beanRequestProvincia.operation == "update") {
                json.idprovincia = provinciaSelected.idprovincia;
            }
        }
    }
    $.ajax({
        url: getHostAPI() + beanRequestProvincia.entity_api + "/" + beanRequestProvincia.operation + parameters_pagination,
        type: beanRequestProvincia.type_request,
        headers: {
            //'Authorization': 'Bearer ' + Cookies.get("sisbu_token")
        },
        data: JSON.stringify(json),
        contentType: 'application/json; charset=utf-8',
        dataType: 'json'
    }).done(function (beanCrudResponse) {
        $('#modalCargandoProvincia').modal("hide");
        if (beanCrudResponse.messageServer !== undefined) {
            if (beanCrudResponse.messageServer.toLowerCase() == "ok") {
                showAlertTopEnd('success', 'Acción realizada exitosamente');
                $('#ventanaModalProvincia').modal('hide');
            } else {
                showAlertTopEnd('warning', beanCrudResponse.messageServer);
            }
        }
        if (beanCrudResponse.beanPagination !== undefined) {
            beanPaginationProvincia = beanCrudResponse.beanPagination;
            toListProvincia(beanPaginationProvincia);
            if (ubicacion == 0) {
                toListTablaProvincia(beanPaginationProvincia);
            } else {
                toListProvincia(beanPaginationProvincia);
            }
        }
    }).fail(function (jqXHR, textStatus, errorThrown) {
        $('#modalCargandoProvincia').modal("hide");
        showAlertErrorRequest();

    });
}

function toListProvincia(beanPagination) {

    document.querySelector("#tbodyProvincia").innerHTML = "";
    document.querySelector("#titleManagerProvincia").innerHTML = "[ " + beanPagination.count_filter + " ] Provincias";
    if (beanPagination.count_filter > 0) {
        let row;
        beanPagination.list.forEach(provincia => {
            row = "<tr ";
            row += "idprovincia='" + provincia.idprovincia + "' ";
            row += ">";
            row += "<td><ul class='dt-list dt-list-cm-0'>";
            row += "<li class='dt-list__item editar-provincia'data-toggle='tooltip' title='Editar'><a class='text-light-gray' href='javascript:void(0)'>";
            row += "<i class='text-primary icon icon-editors'></i></a></li>";
            row += "<li class='dt-list__item eliminar-provincia'data-toggle='tooltip' title='Eliminar'><a class='text-light-gray' href='javascript:void(0)'>";
            row += "<i class='text-danger icon icon-trash-filled'></i></a></li>";
            row += "</ul></td>";
            row += "<td class='align-middle'>" + provincia.nombre + "</td>";
            row += "</tr>";
            document.querySelector("#tbodyProvincia").innerHTML += row;
        });
        buildPagination(
                beanPagination.count_filter,
                parseInt(document.querySelector("#sizePageProvincia").value),
                document.querySelector("#pageProvincia"),
                $('#modalCargandoProvincia'),
                $('#paginationProvincia'));
        addEventsProvincia();
        if (beanRequestProvincia.operation == "paginate") {
            document.querySelector("#txtFilterNombreProvincia").focus();
        }
        $('[data-toggle="tooltip"]').tooltip();
    } else {
        destroyPagination($('#paginationProvincia'));
        showAlertTopEnd('warning', 'No se encontraron resultados');
        document.querySelector("#txtFilterNombreProvincia").focus();
    }
}

function addEventsProvincia() {

    document.querySelectorAll('.editar-provincia').forEach(btn => {
        //AGREGANDO EVENTO CLICK
        btn.onclick = function () {
            $('#modalCargandoDepartamento').modal('show');
            document.querySelector("#ResultadoTablaDepartamento").style.height = "139px";
            processAjaxDepartamento(0);
            listFilterDepartamento();
            provinciaSelected = findByProvincia(btn.parentElement.parentElement.parentElement.getAttribute('idprovincia'));
            console.log(provinciaSelected);
            if (provinciaSelected != undefined) {
                beanRequestProvincia.operation = "update";
                beanRequestProvincia.type_request = "PUT";
                //SET VALUES MODAL
                document.querySelector("#txtNombreProvincia").value = provinciaSelected.nombre;
                document.querySelector("#txtFilterDepartamentoER").value = provinciaSelected.iddepartamento.nombre;
                document.querySelector("#txtTituloModalProvincia").innerHTML = "EDITAR PROVINCIA";
                $('#ventanaModalProvincia').modal("show");
                document.querySelector("#txtNombreProvincia").focus();
            } else {
                showAlertTopEnd('warning', 'No se encontró la Provincia para poder editar');
            }
            $('#modalCargandoDepartamento').modal('hide');
        };
    });
    document.querySelectorAll('.eliminar-provincia').forEach(btn => {
        //AGREGANDO EVENTO CLICK
        btn.onclick = function () {
            provinciaSelected = findByProvincia(btn.parentElement.parentElement.parentElement.getAttribute('idprovincia'));
            beanRequestProvincia.operation = "delete";
            beanRequestProvincia.type_request = "DELETE";
            processAjaxProvincia();
        };
    });
}

function findByProvincia(idprovincia) {
    console.log(beanPaginationProvincia);
    let provincia_;
    beanPaginationProvincia.list.forEach(provincia => {
        if (idprovincia == provincia.idprovincia) {
            provincia_ = provincia;
            return;
        }
    });
    return provincia_;
}

function validateFormProvincia() {
    if (document.querySelector("#txtNombreProvincia").value == "") {
        showAlertTopEnd('warning', 'Por favor ingrese nombre');
        document.querySelector("#txtNombreProvincia").focus();
        return false;
    } else if (document.querySelector("#txtFilterDepartamentoER").value == "") {
        showAlertTopEnd('warning', 'Por favor ingrese Departamento');
        document.querySelector("#txtFilterDepartamentoER").focus();
        return false;
    }
    return true;
}

function listFilterProvincia() {

    $("#txtFilterProvinciaER").change(function () {
        document.querySelector("#ResultadoTablaProvincia").style.height = "139px";
        var filter = $(this).val();
        console.log(filter);
        document.querySelector("#txtFilterNombreProvincia").value = filter;
        $('#modalCargandoProvincia').modal('show');
        processAjaxProvincia(0);
    }).keyup(function (e) {
        var txt = String.fromCharCode(e.which);
        if (txt.match(/[A-Za-z]/))
        {
            $(this).change();
        }

    });

}

function toListTablaProvincia(beanPagination) {
    document.querySelector("#ResultadoTablaProvincia").innerHTML = "";
    if (beanPagination.count_filter > 0) {
        let row;
        beanPagination.list.forEach(provincia => {
            row = "<li class='p-1' idprovincia='" + provincia.idprovincia + "'>" + provincia.nombre.toUpperCase() + "&NonBreakingSpace;&NonBreakingSpace; ";
            row += "<small class='btn btn-primary btn-sm pt-1 pb-1 float-right agregar-provincia'>Agregar a la Lista</small>";
            row += "</li>";
            document.querySelector("#ResultadoTablaProvincia").innerHTML += row;
        });
        addEventsDistritoes();
        if (beanRequestProvincia.operation == "paginate") {
            document.querySelector("#txtFilterProvinciaER").focus();
        }
        $('[data-toggle="tooltip"]').tooltip();
    } else {
        destroyPagination($('#paginationProvincia'));
        showAlertTopEnd('warning', 'No se encontraron resultados');
        document.querySelector("#txtFilterNombreProvincia").focus();
    }
}

//DEPARTAMENTO
function processAjaxDepartamento(ubicacion) {

    let parameters_pagination = "";
    let json = "";
    if (beanRequestDepartamento.operation == "paginate") {
        parameters_pagination = "?nombre=" + document.querySelector("#txtFilterNombreDepartamento").value;
        parameters_pagination += "&page=" + document.querySelector("#pageDepartamento").value;
        parameters_pagination += "&size=" + document.querySelector("#sizePageDepartamento").value;

    } else {

        parameters_pagination = "";
        if (beanRequestDepartamento.operation == "delete") {
            parameters_pagination = "/" + departamentoSelected.iddepartamento;
            json = {};
        } else {
            json = {
                "nombre": document.querySelector("#txtNombreDepartamento").value
            };
            if (beanRequestDepartamento.operation == "update") {
                json.iddepartamento = departamentoSelected.iddepartamento;
            }
        }
    }
    $.ajax({
        url: getHostAPI() + beanRequestDepartamento.entity_api + "/" + beanRequestDepartamento.operation + parameters_pagination,
        type: beanRequestDepartamento.type_request,
        headers: {
            //'Authorization': 'Bearer ' + Cookies.get("sisbu_token")
        },
        data: JSON.stringify(json),
        contentType: 'application/json; charset=utf-8',
        dataType: 'json'
    }).done(function (beanCrudResponse) {

        $('#modalCargandoDepartamento').modal("hide");
        if (beanCrudResponse.messageServer !== undefined) {
            if (beanCrudResponse.messageServer.toLowerCase() == "ok") {
                showAlertTopEnd('success', 'Acción realizada exitosamente');
                $('#ventanaModalDepartamento').modal('hide');
            } else {
                showAlertTopEnd('warning', beanCrudResponse.messageServer);
            }
        }
        if (beanCrudResponse.beanPagination !== undefined) {
            beanPaginationDepartamento = beanCrudResponse.beanPagination;
            if (ubicacion == 0) {
                toListTablaDepartamento(beanPaginationDepartamento);
            } else {
                toListDepartamento(beanPaginationDepartamento);
            }

        }

        console.log(beanRequestDepartamento.operation);
    }).fail(function (jqXHR, textStatus, errorThrown) {
        $('#modalCargandoDepartamento').modal("hide");
        showAlertErrorRequest();

    });
}

function toListDepartamento(beanPagination) {
    document.querySelector("#tbodyDepartamento").innerHTML = "";
    document.querySelector("#titleManagerDepartamento").innerHTML = "[ " + beanPagination.count_filter + " ] Departamento";
    if (beanPagination.count_filter > 0) {
        let rowd;
        beanPagination.list.forEach(departamento => {
            rowd = "<tr ";
            rowd += "iddepartamento='" + departamento.iddepartamento + "' ";
            rowd += ">";
            rowd += "<td><ul class='dt-list dt-list-cm-0'>";
            rowd += "<li class='dt-list__item editar-departamento' data-toggle='tooltip' title='Editar'><a class='text-light-gray' href='javascript:void(0)'>";
            rowd += "<i class='text-primary icon icon-editors'></i></a></li>";
            rowd += "<li class='dt-list__item eliminar-departamento' data-toggle='tooltip' title='Eliminar'><a class='text-light-gray' href='javascript:void(0)'>";
            rowd += "<i class='text-danger icon icon-trash-filled'></i></a></li>";
            rowd += "</ul></td>";
            rowd += "<td class='align-middle'>" + departamento.nombre + "</td>";
            rowd += "</tr>";
            document.querySelector("#tbodyDepartamento").innerHTML += rowd;
        });
        buildPagination(
                beanPagination.count_filter,
                parseInt(document.querySelector("#sizePageDepartamento").value),
                document.querySelector("#pageDepartamento"),
                $('#modalCargandoDepartamento'),
                $('#paginationDepartamento'));
        addEventsDepartamento();
        if (beanRequestDepartamento.operation == "paginate") {
            document.querySelector("#txtFilterNombreDepartamento").focus();
        }
        $('[data-toggle="tooltip"]').tooltip();
    } else {
        destroyPagination($('#paginationDepartamento'));
        showAlertTopEnd('warning', 'No se encontraron resultados');
        document.querySelector("#txtFilterNombreDepartamento").focus();
    }
}

function toListTablaDepartamento(beanPagination) {
    document.querySelector("#ResultadoTablaDepartamento").innerHTML = "";
    if (beanPagination.count_filter > 0) {
        let row;
        beanPagination.list.forEach(departamento => {
            row = "<li class='p-1' iddepartamento='" + departamento.iddepartamento + "'>" + departamento.nombre.toUpperCase() + "&NonBreakingSpace;&NonBreakingSpace; ";
            row += "<small class='btn btn-primary btn-sm pt-1 pb-1 float-right agregar-departamento'>Agregar a la Lista</small>";
            row += "</li>";
            document.querySelector("#ResultadoTablaDepartamento").innerHTML += row;
        });
        addEventsDepartamento();
        if (beanRequestDepartamento.operation == "paginate") {
            document.querySelector("#txtFilterDepartamentoER").focus();
        }
        $('[data-toggle="tooltip"]').tooltip();
    } else {
        destroyPagination($('#paginationDepartamento'));
        showAlertTopEnd('warning', 'No se encontraron resultados');
        document.querySelector("#txtFilterNombreDepartamento").focus();
    }
}

function addEventsDepartamento() {
    document.querySelectorAll('.agregar-departamento').forEach(btn => {
        //AGREGANDO EVENTO CLICK
        btn.onclick = function () {
            console.log(btn.parentElement.getAttribute('iddepartamento'));
            departamentoSelected = findByDepartamento(btn.parentElement.getAttribute('iddepartamento'));
            if (departamentoSelected != undefined) {
                //SET VALUES MODAL
                document.querySelector("#txtFilterDepartamentoER").value = departamentoSelected.nombre;
                document.querySelector("#ResultadoTablaDepartamento").style.height = "0px";
                document.querySelector("#ResultadoTablaDepartamento").innerHTML = "";

            } else {
                showAlertTopEnd('warning', 'No se encontró el Departamento para poder editar');
            }
        };
    });
    document.querySelectorAll('.editar-departamento').forEach(btn => {
        //AGREGANDO EVENTO CLICK
        btn.onclick = function () {
            departamentoSelected = findByDepartamento(btn.parentElement.parentElement.parentElement.getAttribute('iddepartamento'));
            if (departamentoSelected != undefined) {
                beanRequestDepartamento.operation = "update";
                beanRequestDepartamento.type_request = "PUT";
                //SET VALUES MODAL
                document.querySelector("#txtNombreDepartamento").value = departamentoSelected.nombre;
                document.querySelector("#txtTituloModalDepartamento").innerHTML = "EDITAR DEPARTAMENTO";
                $('#ventanaModalDepartamento').modal("show");
                document.querySelector("#txtNombreDepartamento").focus();
            } else {
                showAlertTopEnd('warning', 'No se encontró la Departamento para poder editar');
            }
        };
    });
    document.querySelectorAll('.eliminar-departamento').forEach(btn => {
        //AGREGANDO EVENTO CLICK
        btn.onclick = function () {
            departamentoSelected = findByDepartamento(btn.parentElement.parentElement.parentElement.getAttribute('iddepartamento'));
            beanRequestDepartamento.operation = "delete";
            beanRequestDepartamento.type_request = "DELETE";
            processAjaxDepartamento(1);
        };
    });
}

function findByDepartamento(iddepartamento) {
    let departamento_;
    beanPaginationDepartamento.list.forEach(departamento => {
        if (iddepartamento == departamento.iddepartamento) {
            departamento_ = departamento;
            return;
        }
    });
    return departamento_;
}

function validateFormDepartamento() {
    if (document.querySelector("#txtNombreDepartamento").value == "") {
        showAlertTopEnd('warning', 'Por favor ingrese nombre');
        document.querySelector("#txtNombreDepartamento").focus();
        return false;
    }
    return true;
}

function listFilterDepartamento() {

    $("#txtFilterDepartamentoER").change(function () {
        document.querySelector("#ResultadoTablaDepartamento").style.height = "139px";
        var filter = $(this).val();
        console.log(filter);
        document.querySelector("#txtFilterNombreDepartamento").value = filter;
        processAjaxDepartamento(0);
    }).keyup(function (e) {
        var txt = String.fromCharCode(e.which);
        if (txt.match(/[A-Za-z]/))
        {
            $(this).change();
        }

    });

}