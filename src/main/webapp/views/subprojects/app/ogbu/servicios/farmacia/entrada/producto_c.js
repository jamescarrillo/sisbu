/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
var beanPaginationProductoC;
var ProductoCSelected;
var beanRequestProductoC = new BeanRequest();

document.addEventListener("DOMContentLoaded", function () {

    //INICIALIZANDO VARIABLES DE SOLICITUD
    beanRequestProductoC.entity_api = "api/productos";
    beanRequestProductoC.operation = "paginate";
    beanRequestProductoC.type_request = "GET";

    $('#FrmProductoC').submit(function (event) {
        beanRequestProductoC.operation = "paginate";
        beanRequestProductoC.type_request = "GET";
        $('#modalCargandoSelectedProductoC').modal('show');
        event.preventDefault();
        event.stopPropagation();
    });

    $("#modalCargandoSelectedProductoC").on('shown.bs.modal', function () {
        processAjaxProductoC();
    });

    $("#ventanaModalSelectedProductoC").on('shown.bs.modal', function () {
        $("#modalCargandoSelectedProductoC").modal('show');
    });

    $("#ventanaModalSelectedProductoC").on('hidden.bs.modal', function () {
        beanRequestProductoC.operation = "paginate";
        beanRequestProductoC.type_request = "GET";
    });

    document.querySelector("#btnSeleccionarProducto").onclick = function () {
        $('#ventanaModalSelectedProductoC').modal('show');
    };

    document.querySelector("#btn-selecionar-Productoc").onclick = function () {
        if (ProductoCSelected == undefined) {
            showAlertTopEnd('warning', 'Por favor seleccione un Producto');
            return;
        }
        ProductoSelected = ProductoCSelected;
        document.querySelector("#txtProductoEntrada").value = ProductoCSelected.nombre.toUpperCase();
        $('#ventanaModalSelectedProductoC').modal('hide');
    };

    document.querySelector("#btnCancelSelectionProductoC").onclick = function () {
        ProductoCSelected = undefined;
        ProductoSelected = ProductoCSelected;
        document.querySelector("#txtProductoEntrada").value = "";
    };

    $("#sizePageProductoC").change(function () {
        $('#modalCargandoSelectedProductoC').modal('show');
    });

});

function processAjaxProductoC() {
    let parameters_pagination = "";
    let json = "";
    let url_request = getHostAPI() + beanRequestProductoC.entity_api + "/" + beanRequestProductoC.operation;
    switch (beanRequestProductoC.operation) {
        default:
            parameters_pagination += "?nombre=" + document.querySelector("#txtFilterProductoC").value.toUpperCase();
            parameters_pagination += "&page=" + document.querySelector("#pageProductoC").value;
            parameters_pagination += "&size=" + document.querySelector("#sizePageProductoC").value;
            url_request += parameters_pagination;
            break;
    }
    $.ajax({
        url: url_request,
        type: beanRequestProductoC.type_request,
        headers: {
            'Authorization': 'Bearer ' + Cookies.get("sisbu_token")
        },
        data: JSON.stringify(json),
        contentType: 'application/json; charset=utf-8',
        dataType: 'json'
    }).done(function (beanCrudResponse) {
        $('#modalCargandoSelectedProductoC').modal("hide");
        if (beanCrudResponse.beanPagination !== undefined) {
            beanPaginationProductoC = beanCrudResponse.beanPagination;
            toListProductoC(beanPaginationProductoC);
        }
    }).fail(function (jqXHR, textStatus, errorThrown) {
        $('#modalCargandoSelectedProductoC').modal("hide");
        showAlertErrorRequest();
    });
}

function toListProductoC(beanPagination) {
    document.querySelector("#tbodyProductoC").innerHTML = "";
    document.querySelector("#titleManagerProductoC").innerHTML = "[ " + beanPagination.count_filter + " ] Producto";
    if (beanPagination.count_filter > 0) {
        let row;
        beanPagination.list.forEach(Producto => {
            row = "<tr class='click-selection-Producto sisbu-cursor-mano' idproducto='" + Producto.idproducto + "'>";
            row += "<td class='align-middle text-left'>" + Producto.nombre.toUpperCase() + "</td>";
            row += "</tr>";
            document.querySelector("#tbodyProductoC").innerHTML += row;
        });
        buildPagination(
                beanPagination.count_filter,
                parseInt(document.querySelector("#sizePageProductoC").value),
                document.querySelector("#pageProductoC"),
                $('#modalCargandoSelectedProductoC'),
                $('#paginationProductoC'));
        addEventsProductoCes();
        if (beanRequestProductoC.operation == "paginate") {
            document.querySelector("#txtFilterProductoC").focus();
        }
        $('[data-toggle="tooltip"]').tooltip();
    } else {
        destroyPagination($('#paginationProductoC'));
        showAlertTopEnd('warning', 'No se encontraron resultados');
        document.querySelector("#txtFilterProductoC").focus();
    }
}

function addEventsProductoCes() {
    document.querySelectorAll('.click-selection-Producto').forEach(function (element) {
        element.onclick = function () {
            if (this.classList.contains('row-selected-celeste-claro')) {
                this.classList.remove('row-selected-celeste-claro');
                ProductoCSelected = undefined;
            } else {
                ProductoCSelected = findByProductoC(this.getAttribute('idproducto'));
                this.parentElement.childNodes.forEach(function (element) {
                    element.classList.remove('row-selected-celeste-claro');
                });
                this.classList.add('row-selected-celeste-claro');
            }
        };
    });

}

function findByProductoC(idproducto) {
    let Producto_;
    beanPaginationProductoC.list.forEach(Producto => {
        if (parseInt(idproducto) == parseInt(Producto.idproducto)) {
            Producto_ = Producto;
            return;
        }
    });
    return Producto_;
}
