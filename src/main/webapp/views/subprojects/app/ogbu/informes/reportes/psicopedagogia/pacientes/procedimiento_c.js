/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
var beanPaginationProcedimientoC;
var beanRequestProcedimientoC = new BeanRequest();
document.addEventListener("DOMContentLoaded", function () {

    //INICIALIZANDO VARIABLES DE SOLICITUD
    beanRequestProcedimientoC.entity_api = "api/procedimientos";
    beanRequestProcedimientoC.operation = "paginate";
    beanRequestProcedimientoC.type_request = "GET";

});

function processAjaxProcedimientoC() {
    let parameters_pagination = "";
    let json = "";
    let url_request = getHostAPI() + beanRequestProcedimientoC.entity_api + "/" + beanRequestProcedimientoC.operation;
    switch (beanRequestProcedimientoC.operation) {
        default:
            parameters_pagination += "?filter=&idarea=6";
            parameters_pagination += "&page=1&size=200";
            url_request += parameters_pagination;
            break;
    }
    $.ajax({
        url: url_request,
        type: beanRequestProcedimientoC.type_request,
        headers: {
            'Authorization': 'Bearer ' + Cookies.get("sisbu_token")
        },
        data: JSON.stringify(json),
        contentType: 'application/json; charset=utf-8',
        dataType: 'json'
    }).done(function (beanCrudResponse) {

        if (beanCrudResponse.beanPagination !== undefined) {
            beanPaginationProcedimientoC = beanCrudResponse.beanPagination;
            tolistProcedimientoC(beanPaginationProcedimientoC);
        }
    }).fail(function (jqXHR, textStatus, errorThrown) {

        showAlertErrorRequest();
    });
}
function tolistProcedimientoC(beanPagination) {
    let row;
    row = ` <option value="-1">SIN EVALUACIONES</option>
            <!--option selected value="0">TODAS LAS EVALUACIONES</option-->
            `;
    beanPagination.list.forEach(pro => {
        row += ` <option value="${pro.idprocedimiento}">${pro.descripcion}</option>
                
                `;
    });

    document.querySelector("#txtFilterEstadoPaciente").innerHTML = row;
}

function findByProcedimientoC(idciclo_academico) {
    let ciclo_academico_;
    beanPaginationProcedimientoC.list.forEach(ciclo_academico => {
        if (parseInt(idciclo_academico) == parseInt(ciclo_academico.idciclo_academico)) {
            ciclo_academico_ = ciclo_academico;
            return;
        }
    });
    return ciclo_academico_;
}
