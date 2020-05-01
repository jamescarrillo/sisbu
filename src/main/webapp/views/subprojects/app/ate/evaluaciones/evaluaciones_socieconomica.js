/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
var beanPaginationFichaSocieconomica;
var ficha_socieconomicaSelected;

var beanRequestFichaSocieconomica = new BeanRequest();

document.addEventListener("DOMContentLoaded", function () {

    //INICIALIZANDO VARIABLES DE SOLICITUD
    beanRequestFichaSocieconomica.entity_api = "api/deportes";
    beanRequestFichaSocieconomica.operation = "paginate";
    beanRequestFichaSocieconomica.type_request = "GET";

    $('#FrmFichaSocieconomica').submit(function (event) {
        beanRequestFichaSocieconomica.operation = "paginate";
        beanRequestFichaSocieconomica.type_request = "GET";
        $('#modalCargandoSelectedFichaSocieconomica').modal('show');
        event.preventDefault();
        event.stopPropagation();
    });

    $("#modalCargandoSelectedFichaSocieconomica").on('shown.bs.modal', function () {
        processAjaxFichaSocieconomica();
    });

    $("#ventanaModalSelectedFichaSocieconomica").on('shown.bs.modal', function () {
        $("#modalCargandoSelectedFichaSocieconomica").modal('show');
    });

    $("#ventanaModalSelectedFichaSocieconomica").on('hidden.bs.modal', function () {
        beanRequestFichaSocieconomica.operation = "paginate";
        beanRequestFichaSocieconomica.type_request = "GET";
    });

    document.querySelector("#slctTienesHijos").onchange = function () {
        if (this.value == "S") {
            document.querySelector("#txtCantHijosFichaSocioeconomica").removeAttribute("disabled")
            document.querySelector("#txtCantHijosFichaSocioeconomica").focus();
        } else {
            document.querySelector("#txtCantHijosFichaSocioeconomica").setAttribute("disabled", "disabled")
        }
    };

    document.querySelector("#slctConQuienViveFichaSocieconomica").onchange = function () {
        if (this.value == "OTRO") {
            document.querySelector("#txtConQuienViveFichaSocieconomica").style.display = "block";
            document.querySelector("#txtConQuienViveFichaSocieconomica").focus();
        } else {
            document.querySelector("#txtConQuienViveFichaSocieconomica").style.display = "none";
        }
    }

    document.querySelector("#slctTrabajas").onchange = function () {
        if (this.value == "SI") {
            document.querySelector("#txtActividadEconomicaDesempeniaFichaSocioeconomica").style.display = "block";
            document.querySelector("#txtActividadEconomicaDesempeniaFichaSocioeconomica").focus();
        } else {
            document.querySelector("#txtActividadEconomicaDesempeniaFichaSocioeconomica").style.display = "none";
        }
    }

    document.querySelector("#slctTenenciaVivienda").onchange = function () {
        if (this.value == "OTRO") {
            document.querySelector("#txtTenenciaViviendaFichaSocieconomica").style.display = "block";
            document.querySelector("#txtTenenciaViviendaFichaSocieconomica").focus();
        } else {
            document.querySelector("#txtTenenciaViviendaFichaSocieconomica").style.display = "none";
        }
    }

    document.querySelector("#slctMaterialVivienda").onchange = function () {
        if (this.value == "OTRO") {
            document.querySelector("#txtMaterialViviendaFichaSocioeconomica").style.display = "block";
            document.querySelector("#txtMaterialViviendaFichaSocioeconomica").focus();
        } else {
            document.querySelector("#txtMaterialViviendaFichaSocioeconomica").style.display = "none";
        }
    }

    document.querySelector("#slctPresentaDiscapacidad").onchange = function () {
        if (this.value == "SI") {
            document.querySelector("#txtDiscapacidadFichaSocioeconomica").style.display = "block";
            document.querySelector("#txtDiscapacidadFichaSocioeconomica").focus();
        } else {
            document.querySelector("#txtDiscapacidadFichaSocioeconomica").style.display = "none";
        }
    }

    loaderAniosIngreso();

});

function processAjaxFichaSocieconomica() {
    let parameters_pagination = "";
    let json = "";
    let url_request = getHostAPI() + beanRequestFichaSocieconomica.entity_api + "/" + beanRequestFichaSocieconomica.operation;
    switch (beanRequestFichaSocieconomica.operation) {
        default:
            parameters_pagination += "?nombre=" + document.querySelector("#txtFilterFichaSocieconomica").value.toUpperCase();
            parameters_pagination += "&page=" + document.querySelector("#pageFichaSocieconomica").value;
            parameters_pagination += "&size=" + document.querySelector("#sizePageFichaSocieconomica").value;
            url_request += parameters_pagination;
            break;
    }
    $.ajax({
        url: url_request,
        type: beanRequestFichaSocieconomica.type_request,
        headers: {
            'Authorization': 'Bearer ' + Cookies.get("sisbu_token")
        },
        data: JSON.stringify(json),
        contentType: 'application/json; charset=utf-8',
        dataType: 'json'
    }).done(function (beanCrudResponse) {
        console.log(beanCrudResponse);
        $('#modalCargandoSelectedFichaSocieconomica').modal("hide");
        if (beanCrudResponse.beanPagination !== undefined) {
            beanPaginationFichaSocieconomica = beanCrudResponse.beanPagination;
            toListFichaSocieconomica(beanPaginationFichaSocieconomica);
        }
    }).fail(function (jqXHR, textStatus, errorThrown) {
        $('#modalCargandoSelectedFichaSocieconomica').modal("hide");
        showAlertErrorRequest();
    });
}

function toListFichaSocieconomica(beanPagination) {
    document.querySelector("#tbodyFichaSocieconomica").innerHTML = "";
    document.querySelector("#titleManagerFichaSocieconomica").innerHTML = "[ " + beanPagination.count_filter + " ] DEPORTES";
    if (beanPagination.count_filter > 0) {
        let row;
        beanPagination.list.forEach(deporte => {
            row = "<tr class='click-selection-deporte sisbu-cursor-mano' iddeporte='" + deporte.iddeporte + "'>";
            row += "<td class='align-middle text-left'>" + deporte.nombre.toUpperCase() + "</td>";
            row += "</tr>";
            document.querySelector("#tbodyFichaSocieconomica").innerHTML += row;
        });
        buildPagination(
                beanPagination.count_filter,
                parseInt(document.querySelector("#sizePageFichaSocieconomica").value),
                document.querySelector("#pageFichaSocieconomica"),
                $('#modalCargandoSelectedFichaSocieconomica'),
                $('#paginationFichaSocieconomica'));
        addEventsFichaSocieconomicaes();
        if (beanRequestFichaSocieconomica.operation == "paginate") {
            document.querySelector("#txtFilterFichaSocieconomica").focus();
        }
        $('[data-toggle="tooltip"]').tooltip();
    } else {
        destroyPagination($('#paginationFichaSocieconomica'));
        showAlertTopEnd('warning', 'No se encontraron resultados');
        document.querySelector("#txtFilterFichaSocieconomica").focus();
    }
}

function addEventsFichaSocieconomicaes() {
    document.querySelectorAll('.click-selection-deporte').forEach(function (element) {
        element.onclick = function () {
            if (this.classList.contains('row-selected-celeste-claro')) {
                this.classList.remove('row-selected-celeste-claro');
                ficha_socieconomicaSelected = undefined;
            } else {
                ficha_socieconomicaSelected = findByFichaSocieconomica(this.getAttribute('iddeporte'));
                this.parentElement.childNodes.forEach(function (element) {
                    element.classList.remove('row-selected-celeste-claro');
                });
                this.classList.add('row-selected-celeste-claro');
            }
        };
    });

}

function findByFichaSocieconomica(iddeporte) {
    let deporte_;
    beanPaginationFichaSocieconomica.list.forEach(deporte => {
        if (parseInt(iddeporte) == parseInt(deporte.iddeporte)) {
            deporte_ = deporte;
            return;
        }
    });
    return deporte_;
}

function clearFichaSocioeconomica() {
    document.querySelector("#slctTienesHijos").value = "-1";
    document.querySelector("#slctTienesHijos").dispatchEvent(new Event('change'));
}

function loaderAniosIngreso() {
    document.querySelector("#slctAnioIngresoFichaSocioeconomica").innerHTML = "";
    let date = new Date();
    let anio_actual = date.getFullYear();
    let anio_last = anio_actual - 20;
    for (var i = date.getFullYear(); i > anio_last; i--) {
        document.querySelector("#slctAnioIngresoFichaSocioeconomica").innerHTML += "<option value='" + anio_actual + "'>" + anio_actual + "</option>";
        anio_actual--;
    }
}