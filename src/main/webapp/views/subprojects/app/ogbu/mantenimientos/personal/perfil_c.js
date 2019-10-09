/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
var beanPaginationPerfilC;
var perfilCSelected;

var beanRequestPerfilC = new BeanRequest();

document.addEventListener("DOMContentLoaded", function () {

    //INICIALIZANDO VARIABLES DE SOLICITUD
    beanRequestPerfilC.entity_api = "api/perfiles";
    beanRequestPerfilC.operation = "paginate";
    beanRequestPerfilC.type_request = "GET";

    $('#FrmPerfilC').submit(function (event) {
        beanRequestPerfilC.operation = "paginate";
        beanRequestPerfilC.type_request = "GET";
        $('#modalCargandoSelectedPerfilC').modal('show');
        event.preventDefault();
        event.stopPropagation();
    });

    $("#modalCargandoSelectedPerfilC").on('shown.bs.modal', function () {
        processAjaxPerfilC();
    });

    $("#ventanaModalSelectedPerfilC").on('shown.bs.modal', function () {
        $("#modalCargandoSelectedPerfilC").modal('show');
    });

    $("#ventanaModalSelectedPerfilC").on('hidden.bs.modal', function () {
        beanRequestPerfilC.operation = "paginate";
        beanRequestPerfilC.type_request = "GET";
    });

    document.querySelector("#btnSeleccionarPerfil").onclick = function () {
        $('#ventanaModalSelectedPerfilC').modal('show');
    };

    document.querySelector("#btn-selecionar-perfilc").onclick = function () {
        if (perfilCSelected == undefined) {
            showAlertTopEnd('warning', 'Por favor seleccione un perfil');
            return;
        }
        perfilSelected = perfilCSelected;
        document.querySelector("#txtPerfilUsuario").value = perfilCSelected.nombre.toUpperCase();
        $('#ventanaModalSelectedPerfilC').modal('hide');
    };

    document.querySelector("#btnCancelSelectionPerfilC").onclick = function () {
        perfilCSelected = undefined;
        perfilSelected = perfilCSelected;
        document.querySelector("#txtPerfilUsuario").value = "";
    };

    $("#sizePagePerfilC").change(function () {
        $('#modalCargandoSelectedPerfilC').modal('show');
    });

});

function processAjaxPerfilC() {
    let parameters_pagination = "";
    let json = "";
    let url_request = getHostAPI() + beanRequestPerfilC.entity_api + "/" + beanRequestPerfilC.operation;
    switch (beanRequestPerfilC.operation) {
        default:
            parameters_pagination += "?nombre=" + document.querySelector("#txtFilterPerfilC").value.toUpperCase();
            parameters_pagination += "&page=" + document.querySelector("#pagePerfilC").value;
            parameters_pagination += "&size=" + document.querySelector("#sizePagePerfilC").value;
            url_request += parameters_pagination;
            break;
    }
    $.ajax({
        url: url_request,
        type: beanRequestPerfilC.type_request,
        headers: {
            'Authorization': 'Bearer ' + Cookies.get("sisbu_token")
        },
        data: JSON.stringify(json),
        contentType: 'application/json; charset=utf-8',
        dataType: 'json'
    }).done(function (beanCrudResponse) {
        $('#modalCargandoSelectedPerfilC').modal("hide");
        if (beanCrudResponse.beanPagination !== undefined) {
            beanPaginationPerfilC = beanCrudResponse.beanPagination;
            toListPerfilC(beanPaginationPerfilC);
        }
    }).fail(function (jqXHR, textStatus, errorThrown) {
        $('#modalCargandoSelectedPerfilC').modal("hide");
        showAlertErrorRequest();
    });
}

function toListPerfilC(beanPagination) {
    document.querySelector("#tbodyPerfilC").innerHTML = "";
    document.querySelector("#titleManagerPerfilC").innerHTML = "[ " + beanPagination.count_filter + " ] PERFILES";
    if (beanPagination.count_filter > 0) {
        let row;
        beanPagination.list.forEach(perfil => {
            row = "<tr class='click-selection-perfil sisbu-cursor-mano' idperfil='" + perfil.idperfil + "'>";
            row += "<td class='align-middle text-left'>" + perfil.nombre.toUpperCase() + "</td>";
            row += "</tr>";
            document.querySelector("#tbodyPerfilC").innerHTML += row;
        });
        buildPagination(
                beanPagination.count_filter,
                parseInt(document.querySelector("#sizePagePerfilC").value),
                document.querySelector("#pagePerfilC"),
                $('#modalCargandoSelectedPerfilC'),
                $('#paginationPerfilC'));
        addEventsPerfilCes();
        if (beanRequestPerfilC.operation == "paginate") {
            document.querySelector("#txtFilterPerfilC").focus();
        }
        $('[data-toggle="tooltip"]').tooltip();
    } else {
        destroyPagination($('#paginationPerfilC'));
        showAlertTopEnd('warning', 'No se encontraron resultados');
        document.querySelector("#txtFilterPerfilC").focus();
    }
}

function addEventsPerfilCes() {
    document.querySelectorAll('.click-selection-perfil').forEach(function (element) {
        element.onclick = function () {
            if (this.classList.contains('row-selected-celeste-claro')) {
                this.classList.remove('row-selected-celeste-claro');
                perfilCSelected = undefined;
            } else {
                perfilCSelected = findByPerfilC(this.getAttribute('idperfil'));
                this.parentElement.childNodes.forEach(function (element) {
                    element.classList.remove('row-selected-celeste-claro');
                });
                this.classList.add('row-selected-celeste-claro');
            }
        };
    });

}

function findByPerfilC(idperfil) {
    let perfil_;
    beanPaginationPerfilC.list.forEach(perfil => {
        if (parseInt(idperfil) == parseInt(perfil.idperfil)) {
            perfil_ = perfil;
            return;
        }
    });
    return perfil_;
}
