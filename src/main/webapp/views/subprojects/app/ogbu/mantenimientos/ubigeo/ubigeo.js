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

    document.querySelector("#titleManagerDistrito").onclick = function () {
        beanRequestDistrito.operation = "paginate";
        beanRequestDistrito.type_request = "GET";

        document.querySelector("#OpenProvinciaDetalle").style.display = "none";
        document.querySelector("#OpenDistritoDetalle").style.display = "none";
        document.querySelector("#OpenDepartamentoDetalle").style.display = "none";

        document.querySelector("#titleManagerProvincia").classList.remove("active");
        document.querySelector("#titleManagerDepartamento").classList.remove("active");
        document.querySelector("#titleManagerDistrito").classList.add("active");

        document.querySelector("#tab-provincias").style.display = "none";
        document.querySelector("#tab-departamentos").style.display = "none";
        document.querySelector("#tab-distritos").style.display = "block";

        $('#modalCargandoDistrito').modal('show');
    };
    document.querySelector("#titleManagerProvincia").onclick = function () {
        beanRequestProvincia.operation = "paginate";
        beanRequestProvincia.type_request = "GET";

        document.querySelector("#OpenProvinciaDetalle").style.display = "none";
        document.querySelector("#OpenDistritoDetalle").style.display = "none";
        document.querySelector("#OpenDepartamentoDetalle").style.display = "none";

        document.querySelector("#titleManagerDistrito").classList.remove("active");
        document.querySelector("#titleManagerDepartamento").classList.remove("active");
        document.querySelector("#titleManagerProvincia").classList.add("active");

        document.querySelector("#tab-distritos").style.display = "none";
        document.querySelector("#tab-departamentos").style.display = "none";
        document.querySelector("#tab-provincias").style.display = "block";

        $('#modalCargandoProvincia').modal('show');
    };
    document.querySelector("#titleManagerDepartamento").onclick = function () {

        beanRequestDepartamento.operation = "paginate";
        beanRequestDepartamento.type_request = "GET";

        document.querySelector("#OpenProvinciaDetalle").style.display = "none";
        document.querySelector("#OpenDistritoDetalle").style.display = "none";
        document.querySelector("#OpenDepartamentoDetalle").style.display = "none";

        document.querySelector("#titleManagerDistrito").classList.remove("active");
        document.querySelector("#titleManagerProvincia").classList.remove("active");
        document.querySelector("#titleManagerDepartamento").classList.add("active");

        document.querySelector("#tab-provincias").style.display = "none";
        document.querySelector("#tab-distritos").style.display = "none";
        document.querySelector("#tab-departamentos").style.display = "block";


        $('#modalCargandoDepartamento').modal('show');
    };

    document.querySelector("#btnCancelarDistrito").onclick = function () {
        beanRequestDistrito.operation = "paginate";
        beanRequestDistrito.type_request = "GET";

        document.querySelector("#OpenDistritoDetalle").style.display = "none";
        document.querySelector("#tab-distritos").style.display = "block";
        $('#modalCargandoDepartamento').modal('show');
    };
    document.querySelector("#btnCancelarProvincia").onclick = function () {
        beanRequestProvincia.operation = "paginate";
        beanRequestProvincia.type_request = "GET";

        document.querySelector("#OpenProvinciaDetalle").style.display = "none";
        document.querySelector("#tab-provincias").style.display = "block";
        $('#modalCargandoProvincia').modal('show');
    };
    document.querySelector("#btnCancelarDepartamento").onclick = function () {
        beanRequestDepartamento.operation = "paginate";
        beanRequestDepartamento.type_request = "GET";

        document.querySelector("#OpenDepartamentoDetalle").style.display = "none";
        document.querySelector("#tab-departamentos").style.display = "block";
        $('#modalCargandoDepartamento').modal('show');
    };


    //INICIALIZANDO VARIABLES DE SOLICITUD
    beanRequestDistrito.entity_api = "api/distritos";
    beanRequestDistrito.operation = "paginate";
    beanRequestDistrito.type_request = "GET";


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
        //CONFIGURAMOS LA SOLICITUD
        beanRequestDistrito.operation = "add";
        beanRequestDistrito.type_request = "POST";
        //LIMPIAR LOS CAMPOS
        document.querySelector("#txtNombreDistrito").value = "";
        document.querySelector("#txtProvinciaDistrito").value = "";
        provinciaSelected = null;

        //SET TITLE MODAL
        document.querySelector("#txtTituloModalDistrito").innerHTML = "REGISTRAR DISTRITO";
        //OPEN MODEL
        document.querySelector("#tab-distritos").style.display = "none";
        document.querySelector("#OpenDistritoDetalle").style.display = "block";
    };

    $("#modalCargandoDistrito").on('shown.bs.modal', function () {
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
        event.preventDefault();
        event.stopPropagation();
    });

    document.querySelector("#btnOpenNewProvincia").onclick = function () {
        $('#modalCargandoDepartamento').modal('show');
        //CONFIGURAMOS LA SOLICITUD
        beanRequestProvincia.operation = "add";
        beanRequestProvincia.type_request = "POST";
        //LIMPIAR LOS CAMPOS
        document.querySelector("#txtNombreProvincia").value = "";
        document.querySelector("#txtDepartamentoProvincia").value = "";
        departamentoSelected = null;
        //SET TITLE MODAL
        document.querySelector("#txtTituloModalProvincia").innerHTML = "REGISTRAR PROVINCIA";
        //OPEN MODEL

        document.querySelector("#tab-provincias").style.display = "none";
        document.querySelector("#OpenProvinciaDetalle").style.display = "block";
    };

    $("#modalCargandoProvincia").on('shown.bs.modal', function () {
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
        document.querySelector("#tab-departamentos").style.display = "none";
        document.querySelector("#OpenDepartamentoDetalle").style.display = "block";
    };

    $("#modalCargandoDepartamento").on('shown.bs.modal', function () {
        processAjaxDepartamento();
    });

    $("#sizePageDepartamento").change(function () {
        $('#modalCargandoDepartamento').modal('show');
    });

});


function processAjaxDistrito() {
    let parameters_pagination = "";
    let json = "";
    if (beanRequestDistrito.operation == "paginate") {
        if (document.querySelector("#txtFilterNombreDistrito").value != "") {
            document.querySelector("#pageDistrito").value = 1;
        }
        parameters_pagination = "?nombre=" + document.querySelector("#txtFilterNombreDistrito").value;
        parameters_pagination += "&page=" + document.querySelector("#pageDistrito").value;
        parameters_pagination += "&size=" + document.querySelector("#sizePageDistrito").value;

    } else {

        parameters_pagination = "";
        if (beanRequestDistrito.operation == "delete") {
            parameters_pagination = "/" + distritoSelected.iddistrito;
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
        row =
                `
               <div class="dt-widget__item border-success bg-primary text-white mb-0 pb-2"">
                    <!-- Widget Info -->
                    <div class="dt-widget__info text-truncate " >
                        <p class="mb-0 text-truncate ">
                           DISTRITO
                        </p>
                    </div>
                    <!-- /widget info -->
                    <!-- Widget Info -->
                    <div class="dt-widget__info text-truncate " >
                        <p class="mb-0 text-truncate ">
                           PROVINCIA
                        </p>
                    </div>
                    <!-- /widget info -->
                    
                </div>
            `;
        document.querySelector("#tbodyDistrito").innerHTML += row;
        beanPagination.list.forEach(distrito => {
            row =
                    `
                 <div class="dt-widget__item border-success  ">
                    <!-- Widget Extra -->
                    <div class="dt-widget__extra text-right">
                      
                        <!-- Hide Content -->
                        <div class="hide-content pr-2"">
                            <!-- Action Button Group -->
                            <div class="action-btn-group">
                                <button class="btn btn-default text-primary dt-fab-btn editar-distrito" iddistrito='${distrito.iddistrito}' title="Editar" data-toggle="tooltip">
                                    <i class="icon icon-editors"></i>
                                </button>
                                <button class="btn btn-default text-danger dt-fab-btn eliminar-distrito" iddistrito='${distrito.iddistrito}' title="Eliminar" data-toggle="tooltip">
                                    <i class="icon icon-trash-filled"></i>
                                </button>
                              
                            </div>
                            <!-- /action button group -->
                        </div>
                        <!-- /hide content -->
                    </div>
                    <!-- /widget extra -->
                    <!-- Widget Info -->
                    <div class="dt-widget__info text-truncate " >
                        <p class="mb-0 text-truncate ">
                           ${distrito.nombre}
                        </p>
                    </div>
                    <!-- /widget info -->
                    <!-- Widget Info -->
                    <div class="dt-widget__info text-truncate " >
                        <p class="mb-0 text-truncate ">
                           ${distrito.idprovincia.nombre}
                        </p>
                    </div>
                    <!-- /widget info -->
                 
                    
                </div>
            `;
            document.querySelector("#tbodyDistrito").innerHTML += row;
            $('[data-toggle="tooltip"]').tooltip();
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

    } else {
        destroyPagination($('#paginationDistrito'));
        showAlertTopEnd('warning', 'No se encontraron resultados');
        document.querySelector("#txtFilterNombreDistrito").focus();
    }
}

function addEventsDistritoes() {

    document.querySelectorAll('.editar-distrito').forEach(btn => {
        //AGREGANDO EVENTO CLICK
        btn.onclick = function () {
            distritoSelected = findByDistrito(btn.getAttribute('iddistrito'));
            if (distritoSelected != undefined) {
                beanRequestDistrito.operation = "update";
                beanRequestDistrito.type_request = "PUT";
                //SET VALUES MODAL
                document.querySelector("#txtNombreDistrito").value = distritoSelected.nombre;
                document.querySelector("#txtProvinciaDistrito").value = distritoSelected.idprovincia.nombre;
                provinciaSelected = distritoSelected.idprovincia;
                document.querySelector("#txtTituloModalDistrito").innerHTML = "EDITAR DISTRITO";
                document.querySelector("#tab-distritos").style.display = "none";
                document.querySelector("#OpenDistritoDetalle").style.display = "block";
                document.querySelector("#txtNombreDistrito").focus();
            } else {
                showAlertTopEnd('warning', 'No se encontró la Distrito para poder editar');
            }

        };
    });
    document.querySelectorAll('.eliminar-distrito').forEach(btn => {
        //AGREGANDO EVENTO CLICK
        btn.onclick = function () {
            distritoSelected = findByDistrito(btn.getAttribute('iddistrito'));
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
    } else if (document.querySelector("#txtProvinciaDistrito").value == "") {
        showAlertTopEnd('warning', 'Por favor ingrese abreviatura ');
        document.querySelector("#txtProvinciaDistrito").focus();
        return false;
    }
    return true;
}

//PROVINCIA
function processAjaxProvincia() {
    let parameters_pagination = "";
    let json = "";
    if (beanRequestProvincia.operation == "paginate") {
        if (document.querySelector("#txtFilterNombreProvincia").value != "") {
            document.querySelector("#pageProvincia").value = 1;
        }
        parameters_pagination = "?nombre=" + document.querySelector("#txtFilterNombreProvincia").value;
        parameters_pagination += "&page=" + document.querySelector("#pageProvincia").value;
        parameters_pagination += "&size=" + document.querySelector("#sizePageProvincia").value;

    } else {

        parameters_pagination = "";
        if (beanRequestProvincia.operation == "delete") {
            parameters_pagination = "/" + provinciaSelected.idprovincia;
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
            'Authorization': 'Bearer ' + Cookies.get("sisbu_token")
        },
        data: JSON.stringify(json),
        contentType: 'application/json; charset=utf-8',
        dataType: 'json'
    }).done(function (beanCrudResponse) {
        $('#modalCargandoProvincia').modal("hide");
        if (beanCrudResponse.messageServer !== undefined) {
            if (beanCrudResponse.messageServer.toLowerCase() == "ok") {
                showAlertTopEnd('success', 'Acción realizada exitosamente');
            } else {
                showAlertTopEnd('warning', beanCrudResponse.messageServer);
            }
        }
        if (beanCrudResponse.beanPagination !== undefined) {
            beanPaginationProvincia = beanCrudResponse.beanPagination;
            toListProvincia(beanPaginationProvincia);
            toListProvincia(beanPaginationProvincia);
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
        row =
                `
               <div class="dt-widget__item border-success bg-primary text-white mb-0 pb-2"">
                    <!-- Widget Info -->
                    <div class="dt-widget__info text-truncate " >
                        <p class="mb-0 text-truncate ">
                           PROVINCIA
                        </p>
                    </div>
                    <!-- /widget info -->
                    <!-- Widget Info -->
                    <div class="dt-widget__info text-truncate " >
                        <p class="mb-0 text-truncate ">
                           DEPARTAMENTO
                        </p>
                    </div>
                    <!-- /widget info -->
                    
                </div>
            `;
        document.querySelector("#tbodyProvincia").innerHTML += row;
        beanPagination.list.forEach(provincia => {
            row =
                    `
                 <div class="dt-widget__item border-success  ">
                    <!-- Widget Extra -->
                    <div class="dt-widget__extra text-right">
                      
                        <!-- Hide Content -->
                        <div class="hide-content pr-2"">
                            <!-- Action Button Group -->
                            <div class="action-btn-group">
                                <button class="btn btn-default text-primary dt-fab-btn editar-provincia" idprovincia='${provincia.idprovincia}' title="Editar" data-toggle="tooltip">
                                    <i class="icon icon-editors"></i>
                                </button>
                                <button class="btn btn-default text-danger dt-fab-btn eliminar-provincia" idprovincia='${provincia.idprovincia}' title="Eliminar" data-toggle="tooltip">
                                    <i class="icon icon-trash-filled"></i>
                                </button>
                              
                            </div>
                            <!-- /action button group -->
                        </div>
                        <!-- /hide content -->
                    </div>
                    <!-- /widget extra -->
                    <!-- Widget Info -->
                    <div class="dt-widget__info text-truncate " >
                        <p class="mb-0 text-truncate ">
                           ${provincia.nombre}
                        </p>
                    </div>
                    <!-- /widget info -->
                    <!-- Widget Info -->
                    <div class="dt-widget__info text-truncate " >
                        <p class="mb-0 text-truncate ">
                           ${provincia.iddepartamento.nombre}
                        </p>
                    </div>
                    <!-- /widget info -->
                 
                    
                </div>
            `;
            document.querySelector("#tbodyProvincia").innerHTML += row;
            $('[data-toggle="tooltip"]').tooltip();
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
            provinciaSelected = findByProvincia(btn.getAttribute('idprovincia'));
            console.log(provinciaSelected);
            if (provinciaSelected != undefined) {
                beanRequestProvincia.operation = "update";
                beanRequestProvincia.type_request = "PUT";
                //SET VALUES MODAL
                document.querySelector("#txtNombreProvincia").value = provinciaSelected.nombre;
                document.querySelector("#txtDepartamentoProvincia").value = provinciaSelected.iddepartamento.nombre;
                departamentoSelected = provinciaSelected.iddepartamento;
                document.querySelector("#txtTituloModalProvincia").innerHTML = "EDITAR PROVINCIA";
                document.querySelector("#tab-provincias").style.display = "none";
                document.querySelector("#OpenProvinciaDetalle").style.display = "block";
                document.querySelector("#txtNombreProvincia").focus();
            } else {
                showAlertTopEnd('warning', 'No se encontró la Provincia para poder editar');
            }

        };
    });
    document.querySelectorAll('.eliminar-provincia').forEach(btn => {
        //AGREGANDO EVENTO CLICK
        btn.onclick = function () {
            provinciaSelected = findByProvincia(btn.getAttribute('idprovincia'));
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
    } else if (document.querySelector("#txtDepartamentoProvincia").value == "") {
        showAlertTopEnd('warning', 'Por favor ingrese Departamento');
        document.querySelector("#txtDepartamentoProvincia").focus();
        return false;
    }
    return true;
}


//DEPARTAMENTO
function processAjaxDepartamento() {

    let parameters_pagination = "";
    let json = "";
    if (beanRequestDepartamento.operation == "paginate") {
        if (document.querySelector("#txtFilterNombreDepartamento").value != "") {
            document.querySelector("#pageDepartamento").value = 1;
        }
        parameters_pagination = "?nombre=" + document.querySelector("#txtFilterNombreDepartamento").value;
        parameters_pagination += "&page=" + document.querySelector("#pageDepartamento").value;
        parameters_pagination += "&size=" + document.querySelector("#sizePageDepartamento").value;

    } else {

        parameters_pagination = "";
        if (beanRequestDepartamento.operation == "delete") {
            parameters_pagination = "/" + departamentoSelected.iddepartamento;
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
            'Authorization': 'Bearer ' + Cookies.get("sisbu_token")
        },
        data: JSON.stringify(json),
        contentType: 'application/json; charset=utf-8',
        dataType: 'json'
    }).done(function (beanCrudResponse) {
        $('#modalCargandoDepartamento').modal("hide");
        if (beanCrudResponse.messageServer !== undefined) {
            if (beanCrudResponse.messageServer.toLowerCase() == "ok") {
                showAlertTopEnd('success', 'Acción realizada exitosamente');
            } else {
                showAlertTopEnd('warning', beanCrudResponse.messageServer);
            }
        }
        if (beanCrudResponse.beanPagination !== undefined) {
            beanPaginationDepartamento = beanCrudResponse.beanPagination;
            toListDepartamento(beanPaginationDepartamento);

        }
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
        rowd =
                `
               <div class="dt-widget__item border-success bg-primary text-white mb-0 pb-2"">
                    <!-- Widget Info -->
                    <div class="dt-widget__info text-truncate " >
                        <p class="mb-0 text-truncate ">
                           DEPARTAMENTO
                        </p>
                    </div>
                    <!-- /widget info -->
                    
                </div>
            `;
        document.querySelector("#tbodyDepartamento").innerHTML += rowd;
        beanPagination.list.forEach(departamento => {
            rowd =
                    `
                 <div class="dt-widget__item border-success  ">
                    <!-- Widget Extra -->
                    <div class="dt-widget__extra text-right">
                      
                        <!-- Hide Content -->
                        <div class="hide-content pr-2"">
                            <!-- Action Button Group -->
                            <div class="action-btn-group">
                                <button class="btn btn-default text-primary dt-fab-btn editar-departamento" iddepartamento='${departamento.iddepartamento}' title="Editar" data-toggle="tooltip">
                                    <i class="icon icon-editors"></i>
                                </button>
                                <button class="btn btn-default text-danger dt-fab-btn eliminar-departamento" iddepartamento='${departamento.iddepartamento}' title="Eliminar" data-toggle="tooltip">
                                    <i class="icon icon-trash-filled"></i>
                                </button>
                              
                            </div>
                            <!-- /action button group -->
                        </div>
                        <!-- /hide content -->
                    </div>
                    <!-- /widget extra -->
                    <!-- Widget Info -->
                    <div class="dt-widget__info text-truncate " >
                        <p class="mb-0 text-truncate ">
                           ${departamento.nombre}
                        </p>
                    </div>
                    <!-- /widget info -->
                 
                    
                </div>
            `;
            document.querySelector("#tbodyDepartamento").innerHTML += rowd;
            $('[data-toggle="tooltip"]').tooltip();
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

    } else {
        destroyPagination($('#paginationDepartamento'));
        showAlertTopEnd('warning', 'No se encontraron resultados');
        document.querySelector("#txtFilterNombreDepartamento").focus();
    }
}

function addEventsDepartamento() {

    document.querySelectorAll('.editar-departamento').forEach(btn => {
        //AGREGANDO EVENTO CLICK
        btn.onclick = function () {
            departamentoSelected = findByDepartamento(btn.getAttribute('iddepartamento'));
            if (departamentoSelected != undefined) {
                beanRequestDepartamento.operation = "update";
                beanRequestDepartamento.type_request = "PUT";
                //SET VALUES MODAL
                document.querySelector("#txtNombreDepartamento").value = departamentoSelected.nombre;
                document.querySelector("#txtTituloModalDepartamento").innerHTML = "EDITAR DEPARTAMENTO";
                document.querySelector("#tab-departamentos").style.display = "none";
                document.querySelector("#OpenDepartamentoDetalle").style.display = "block";
                document.querySelector("#txtNombreDepartamento").focus();
            } else {
                showAlertTopEnd('warning', 'No se encontró la Departamento para poder editar');
            }
        };
    });
    document.querySelectorAll('.eliminar-departamento').forEach(btn => {
        //AGREGANDO EVENTO CLICK
        btn.onclick = function () {
            departamentoSelected = findByDepartamento(btn.getAttribute('iddepartamento'));
            beanRequestDepartamento.operation = "delete";
            beanRequestDepartamento.type_request = "DELETE";
            processAjaxDepartamento();
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

