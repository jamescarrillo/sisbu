/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


var beanPaginationMenuSemanal;
document.addEventListener("DOMContentLoaded", function () {
    $('#txtMenuSemanalFechaI').bootstrapMaterialDatePicker({
        weekStart: 0,
        time: false,
        format: 'DD/MM/YYYY',
        lang: 'es'
    }).on('change', function (e, date) {
    });
    $('#txtMenuSemanalFechaF').bootstrapMaterialDatePicker({
        weekStart: 0,
        time: false,
        format: 'DD/MM/YYYY',
        lang: 'es'
    }).on('change', function (e, date) {
    });

    document.querySelector("#btnEliminarMenuSemanalFechaI").onclick = function () {
        document.getElementById("txtMenuSemanalFechaI").value = "";
    };
    document.querySelector("#btnEliminarMenuSemanalFechaF").onclick = function () {
        document.getElementById("txtMenuSemanalFechaF").value = "";
    };
    $('#FrmMenuSemanal').submit(function (event) {

        $('#modalCargandoMenuSemanal').modal('show');
        event.preventDefault();
        event.stopPropagation();

    });

    $("#modalCargandoMenuSemanal").on('shown.bs.modal', function () {
        processAjaxMenuSemanal();
    });
});


function processAjaxMenuSemanal() {
    $.ajax({
        url: getHostAPI() + "api/menusemanal/paginate?fechai=" + document.querySelector("#txtMenuSemanalFechaI").value +
            "&fechaf=" + document.querySelector("#txtMenuSemanalFechaF").value +
            "&page=1&size=7",
        type: "GET",
        headers: {
            'Authorization': 'Bearer ' + Cookies.get("sisbu_token")
        },
        contentType: 'application/json; charset=utf-8',
        dataType: 'json'
    }).done(function (beanCrudResponse) {
        console.log(beanCrudResponse);
        $('#modalCargandoMenuSemanal').modal("hide");

        if (beanCrudResponse.beanPagination !== undefined) {
            beanPaginationMenuSemanal = beanCrudResponse.beanPagination;
            if (beanPaginationMenuSemanal.list.length == 0) {
                showAlertTopEnd('warning', 'No se Encontraron Resultados');

            }
            toListSemanal(beanPaginationMenuSemanal.list);
        }
    }).fail(function (jqXHR, textStatus, errorThrown) {
        $('#modalCargandoMenuSemanal').modal("hide");
        showAlertErrorRequest();

    });
}

function toListSemanal(beanPagination) {
    addClass(document.querySelector("#theadMenuSemanal").parentElement.parentElement, "dt-widget dt-card dt-social-card border border-w-2 border-light-teal text-light-gray m-0");

    document.querySelector("#theadMenuSemanal").classList.remove("bg-primary");
    document.querySelector("#tbodyCronograma").innerHTML = "";
    document.querySelector("#theadMenuSemanal").innerHTML = "";
    let row;
    if (beanPagination.length > 0) {
        document.querySelector("#theadMenuSemanal").classList.add("bg-primary");
        let head;
        head = ' <tr>';
        head += ' <th class="text-uppercase text-white" scope="col" style="font-weight: 500;">FECHA</th>';
        head += '<th class="text-uppercase text-white text-center" scope="col" style="font-weight: 500;">DESAYUNO</th>';
        head += '<th class="text-uppercase text-white text-center" scope="col" style="font-weight: 500;">ALMUERZO</th>';
        head += '<th class="text-uppercase text-white text-center" scope="col" style="font-weight: 500;">CENA</th>';
        head += '</tr>';
        document.querySelector("#theadMenuSemanal").innerHTML = head;
        beanPagination.forEach(detallecronogramacu => {
            diasemana = new Date(detallecronogramacu.fecha.split('/')[1] + ' ' +
                detallecronogramacu.fecha.split('/')[0] + ', ' + detallecronogramacu.fecha.split('/')[2]);

            row = `
                             <tr>
                                <td class='align-middle  text-truncate text-dark'>${ diaSemana(diasemana.getUTCDay())}<br>
                                <span class="badge badge-sm badge-pill badge-primary  d-sm-inline-block">${detallecronogramacu.fecha}</span>
                                </td>
                                <td class='align-middle  text-truncate'>
                                  <ul style="list-style:none;" class="text-center">
                                                            <li><span class="badge badge-sm badge-pill badge-success  d-sm-inline-block">${ detallecronogramacu.comida_dsegundo.descripcion == undefined ? "" : detallecronogramacu.comida_dsegundo.descripcion}</span></li>
                                                            <li><span class="badge badge-sm badge-pill badge-secondary  d-sm-inline-block">${detallecronogramacu.comida_dpostre.descripcion == undefined ? "" : detallecronogramacu.comida_dpostre.descripcion}</span></li>
                                                            <li><span class="badge badge-sm badge-pill badge-info  d-sm-inline-block">${detallecronogramacu.comida_dbebida.descripcion == undefined ? "" : detallecronogramacu.comida_dbebida.descripcion}</span></li>
                                   </ul>
                                </td>
                                <td class='align-middle  text-truncate'>
            <ul style="list-style:none;" class="text-center">
                                                                <li><span class="badge badge-sm badge-pill badge-success  d-sm-inline-block">${detallecronogramacu.comida_asegundo.descripcion == undefined ? "" : detallecronogramacu.comida_asegundo.descripcion}</span></li>
                                                                <li><span class="badge badge-sm badge-pill badge-secondary  d-sm-inline-block">${detallecronogramacu.comida_asopa.descripcion == undefined ? "" : detallecronogramacu.comida_asopa.descripcion}</span></li>
                                                                <li><span class="badge badge-sm badge-pill badge-info  d-sm-inline-block">${detallecronogramacu.comida_apostre.descripcion == undefined ? "" : detallecronogramacu.comida_apostre.descripcion}</span></li>
                                                                <li><span class="badge badge-sm badge-pill badge-warning  d-sm-inline-block">${detallecronogramacu.comida_abebida.descripcion == undefined ? "" : detallecronogramacu.comida_abebida.descripcion}</span></li>
                                                            </ul>
                                </td>
                                <td class='align-middle  text-truncate'>
            <ul style="list-style:none;" class="text-center">
                                                                <li><span class="badge badge-sm badge-pill badge-success  d-sm-inline-block">${detallecronogramacu.comida_csegundo.descripcion == undefined ? "" : detallecronogramacu.comida_csegundo.descripcion}</span></li>
                                                                <li><span class="badge badge-sm badge-pill badge-secondary  d-sm-inline-block">${detallecronogramacu.comida_csopa.descripcion == undefined ? "" : detallecronogramacu.comida_csopa.descripcion}</span></li>
                                                                <li><span class="badge badge-sm badge-pill badge-info  d-sm-inline-block">${detallecronogramacu.comida_cpostre.descripcion == undefined ? "" : detallecronogramacu.comida_cpostre.descripcion}</span></li>
                                                                <li><span class="badge badge-sm badge-pill badge-warning  d-sm-inline-block">${detallecronogramacu.comida_cbebida.descripcion == undefined ? "" : detallecronogramacu.comida_cbebida.descripcion}</span></li>
                                                            </ul>
                                </td>
                            </tr>
                                            
                `;
            document.querySelector("#tbodyCronograma").innerHTML += row;

        });
    } else {
        removeClass(document.querySelector("#theadMenuSemanal").parentElement.parentElement, "dt-widget dt-card dt-social-card border border-w-2 border-light-teal text-light-gray m-0");
    }
}

function diaSemana(diacomida) {
    switch (diacomida) {
        case 1:
            return "LUNES";
            break;
        case 2:
            return "MARTES";
            break;
        case 3:
            return "MIÉRCOLES";
            break;
        case 4:
            return "JUEVES";
            break;
        case 5:
            return "VIERNES";
            break;
        case 6:
            return "SÁBADO";
            break;
        case 7:
            return "DOMINGO";
            break;
        default:
            return "NINGUNO";
            break;

    }
}

