var beanPaginationCategoria;
var categoriaSelected;
var beanRequestCategoria = new BeanRequest();
document.addEventListener("DOMContentLoaded", function () {
    //INICIALIZANDO VARIABLES DE SOLICITUD
    beanRequestCategoria.entity_api = "api/categorias";
    beanRequestCategoria.operation = "paginate";
    beanRequestCategoria.type_request = "GET";

    $('#FrmCategoria').submit(function (event) {
        beanRequestCategoria.operation = "paginate";
        beanRequestCategoria.type_request = "GET";
        $('#modalCargandoCategoria').modal('show');
        event.preventDefault();
        event.stopPropagation();
    });

    $('#FrmCategoriaModal').submit(function (event) {
        if (validateFormCategoria()) {
            $('#modalCargandoCategoria').modal('show');
        }
        event.preventDefault();
        event.stopPropagation();
    });

    document.querySelector("#btnOpenNewCategoria").onclick = function () {
        //CONFIGURAMOS LA SOLICITUD
        beanRequestCategoria.operation = "add";
        beanRequestCategoria.type_request = "POST";
        //LIMPIAR LOS CAMPOS
        limpiarInput();
        //SET TITLE MODAL
        document.querySelector("#txtTituloModalMan").innerHTML = "REGISTRAR CATEGORÍA";
        //OPEN MODEL
        document.querySelector("#btnListaCategoria").style.display = 'none';
        document.querySelector("#btnOpenCategoria").style.display = 'block';
    };

    document.querySelector("#btnRegresar").onclick = function () {
        beanRequestCategoria.operation = "paginate";
        beanRequestCategoria.type_request = "GET";
        $('#modalCargandoCategoria').modal('show');
        document.querySelector("#btnOpenCategoria").style.display = 'none';
        document.querySelector("#btnListaCategoria").style.display = 'block';
    };

    $("#modalCargandoCategoria").on('shown.bs.modal', function () {
        processAjaxCategoria();
    });
    $('#modalCargandoCategoria').modal('show');

    $("#sizePageCategoria").change(function () {
        $('#modalCargandoCategoria').modal('show');
    });

});

function processAjaxCategoria() {
    let parameters_pagination = "";
    let json = "";
    if (beanRequestCategoria.operation == "paginate") {
        if (document.querySelector("#txtFilterCategoria").value != "") {
            document.querySelector("#pageCategoria").value = 1;
        }
        parameters_pagination += "?nombre=" + document.querySelector("#txtFilterCategoria").value;
        parameters_pagination += "&page=" + document.querySelector("#pageCategoria").value;
        parameters_pagination += "&size=" + document.querySelector("#sizePageCategoria").value;

    } else {
        parameters_pagination = "";
        if (beanRequestCategoria.operation == "delete") {
            parameters_pagination = "/" + categoriaSelected.idcategoria;
        } else {
            json = {
                "nombre": document.querySelector("#txtNombreCategoria").value
            };
            if (beanRequestCategoria.operation == "update") {
                json.idcategoria = categoriaSelected.idcategoria;
            }
        }
    }
    $.ajax({
        url: getHostAPI() + beanRequestCategoria.entity_api + "/" + beanRequestCategoria.operation + parameters_pagination,
        type: beanRequestCategoria.type_request,
        headers: {
            'Authorization': 'Bearer ' + Cookies.get("sisbu_token")
        },
        data: JSON.stringify(json),
        contentType: 'application/json; charset=utf-8',
        dataType: 'json'
    }).done(function (beanCrudResponse) {
        console.log(beanCrudResponse);
        $('#modalCargandoCategoria').modal("hide");
        if (beanCrudResponse.messageServer !== undefined) {
            if (beanCrudResponse.messageServer.toLowerCase() == "ok") {
                if (beanRequestCategoria.operation == "add") {
                    limpiarInput();
                }

                showAlertTopEnd('success', 'Acción realizada exitosamente');

            } else {
                showAlertTopEnd('warning', beanCrudResponse.messageServer);
            }
        }
        if (beanCrudResponse.beanPagination !== undefined) {
            beanPaginationCategoria = beanCrudResponse.beanPagination;
            toListCategoria(beanPaginationCategoria);
        }
    }).fail(function (jqXHR, textStatus, errorThrown) {
        $('#modalCargandoCategoria').modal("hide");
        showAlertErrorRequest();

    });
}

function toListCategoria(beanPagination) {
    document.querySelector("#tbodyCategoria").innerHTML = "";
    document.querySelector("#titleManagerCategoria").innerHTML = "[ " + beanPagination.count_filter + " ] CATEGORÍAS";
    if (beanPagination.count_filter > 0) {
        let row;
        row =
            `
               <div class="dt-widget__item border-success bg-primary text-white mb-0">
                    <!-- Widget Info -->
                    <div class="dt-widget__info text-truncate " >
                        <p class="mb-0 text-truncate ">
                           NOMBRE
                        </p>
                    </div>
                    <!-- /widget info -->
                </div>
            `;
        document.querySelector("#tbodyCategoria").innerHTML += row;
        beanPagination.list.forEach(categoria => {
            row =
                `
                 <div class="dt-widget__item m-0 pt-1 pb-1">
                   
                    <!-- Widget Info -->
                    <div class="dt-widget__info text-truncate " >
                        <p class="mb-0 text-truncate ">
                           ${categoria.nombre}
                        </p>
                    </div>
                    <!-- /widget info -->
                    <!-- Widget Extra -->
                    <div class="dt-widget__extra">
                        <div class="dt-task">
                        <div class="dt-task__redirect">
                            <!-- Action Button Group -->
                            <div class="action-btn-group">
                                <button class="btn btn-default text-primary dt-fab-btn editar-categoria" idcategoria='${categoria.idcategoria}' title="Editar" data-toggle="tooltip">
                                    <i class="icon icon-editors"></i>
                                </button>
                                <button class="btn btn-default text-danger dt-fab-btn eliminar-categoria" idcategoria='${categoria.idcategoria}' title="Eliminar" data-toggle="tooltip">
                                    <i class="icon icon-trash-filled"></i>
                                </button>
                                </div>
                            </div>
                            <!-- /action button group -->
                        </div>
                        <!-- /hide content -->
                    </div>
                    <!-- /widget extra -->
                </div>
            `;
            document.querySelector("#tbodyCategoria").innerHTML += row;
            $('[data-toggle="tooltip"]').tooltip();
        });
        buildPagination(
            beanPagination.count_filter,
            parseInt(document.querySelector("#sizePageCategoria").value),
            document.querySelector("#pageCategoria"),
            $('#modalCargandoCategoria'),
            $('#paginationCategoria'));
        addEventsCategoriaes();


    } else {
        destroyPagination($('#paginationCategoria'));
        showAlertTopEnd('warning', 'No se encontraron resultados');
    }
}

function addEventsCategoriaes() {
    document.querySelectorAll('.editar-categoria').forEach(btn => {
        //AGREGANDO EVENTO CLICK
        btn.onclick = function () {
            categoriaSelected = findByCategoria(btn.getAttribute('idcategoria'));
            if (categoriaSelected != undefined) {
                beanRequestCategoria.operation = "update";
                beanRequestCategoria.type_request = "PUT";
                //SET VALUES MODAL
                document.querySelector("#txtNombreCategoria").value = categoriaSelected.nombre;
                document.querySelector("#txtTituloModalMan").innerHTML = "EDITAR CATEGORÍA";
                //OPEN MODEL
                document.querySelector("#btnListaCategoria").style.display = 'none';
                document.querySelector("#btnOpenCategoria").style.display = 'block';
                document.querySelector("#txtNombreCategoria").focus();
            } else {
                showAlertTopEnd('warning', 'No se encontró el Categoria para poder editar');
            }
        };
    });
    document.querySelectorAll('.eliminar-categoria').forEach(btn => {
        //AGREGANDO EVENTO CLICK
        btn.onclick = function () {
            categoriaSelected = findByCategoria(btn.getAttribute('idcategoria'));
            beanRequestCategoria.operation = "delete";
            beanRequestCategoria.type_request = "DELETE";
            processAjaxCategoria();
        };
    });
}

function findByCategoria(idcategoria) {
    let categoria_;
    beanPaginationCategoria.list.forEach(categoria => {
        if (idcategoria == categoria.idcategoria) {
            categoria_ = categoria;
            return;
        }
    });
    return categoria_;
}

function validateFormCategoria() {
    if (document.querySelector("#txtNombreCategoria").value == "") {
        showAlertTopEnd('warning', 'Por favor ingrese Nombre');
        document.querySelector("#txtNombreCategoria").focus();
        return false;
    }

    return true;
}

function limpiarInput() {
    document.querySelector("#txtNombreCategoria").value = "";
}

