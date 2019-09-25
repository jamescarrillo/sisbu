/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

var beanPaginationProcedimientoCicloSocie;
var area_psiSelected;
var beanRequestProcedimientoCicloSocie = new BeanRequest();

document.addEventListener("DOMContentLoaded", function () {

    //INICIALIZANDO VARIABLES DE SOLICITUD
    beanRequestProcedimientoCicloSocie.entity_api = "api/detalle-procedimiento-ciclo";
    beanRequestProcedimientoCicloSocie.operation = "paginate-evaluaciones-ciclo";
    beanRequestProcedimientoCicloSocie.type_request = "GET";

    document.querySelector("#").onclick = function () {
        
    };

    $("#modalCargandoProcedimientoCicloSocie").on('shown.bs.modal', function () {
        processAjaxProcedimientoCicloSocie();
    });

});

function processAjaxLoadEvaluacionCiclo() {
    let parameters_pagination = "";
    let url_request = getHostAPI() + beanRequestProcedimientoCicloSocie.entity_api + "/" + beanRequestProcedimientoCicloSocie.operation;
    switch (beanRequestProcedimientoCicloSocie.operation) {
        default:
            parameters_pagination += "?idarea=7";
            url_request += parameters_pagination;
            break;
    }
    $.ajax({
        url: url_request,
        type: beanRequestProcedimientoCicloSocie.type_request,
        headers: {
            'Authorization': 'Bearer ' + Cookies.get("sisbu_token")
        },
        //data: JSON.stringify(json),
        contentType: 'application/json; charset=utf-8',
        dataType: 'json'
    }).done(function (beanCrudResponse) {
        $('#modalCargandoProcedimientoCicloSocie').modal("hide");
        if (beanCrudResponse.beanPagination !== undefined) {
            beanPaginationProcedimientoCicloSocie = beanCrudResponse.beanPagination;
            toListProcedimientoCicloSocie(beanPaginationProcedimientoCicloSocie);
        }
    }).fail(function (jqXHR, textStatus, errorThrown) {
        $('#modalCargandoProcedimientoCicloSocie').modal("hide");
        showAlertErrorRequest();
    });
}

function toListProcedimientoCicloSocie() {
    console.log(beanPaginationProcedimientoCicloSocie);
}
