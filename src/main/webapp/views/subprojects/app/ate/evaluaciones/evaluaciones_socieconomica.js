/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

var beanProcedimientoCicloSocie;
var procedimientoCicloSocieSelected;
var beanRequestProcedimientoCicloSocie = new BeanRequest();

document.addEventListener("DOMContentLoaded", function () {

    //INICIALIZANDO VARIABLES DE SOLICITUD
    beanRequestProcedimientoCicloSocie.entity_api = "api/detalle-procedimiento-ciclo";
    beanRequestProcedimientoCicloSocie.operation = "paginate-evaluaciones-ciclo";
    beanRequestProcedimientoCicloSocie.type_request = "GET";

    $("#modalCargandoProcedimientoCicloSocie").on('shown.bs.modal', function () {
        processAjaxProcedimientoCicloSocie();
    });

});

function processAjaxProcedimientoCicloSocie() {
    let parameters_pagination = "";
    let url_request = getHostAPI() + beanRequestProcedimientoCicloSocie.entity_api + "/" + beanRequestProcedimientoCicloSocie.operation;
    switch (beanRequestProcedimientoCicloSocie.operation) {
        default:
            parameters_pagination += "?idarea=6";
            url_request += parameters_pagination;
            break;
    }
    $.ajax({
        url: url_request,
        type: beanRequestProcedimientoCicloSocie.type_request,
        headers: {
            'Authorization': 'Bearer ' + Cookies.get("sisbu_token")
        },
        contentType: 'application/json; charset=utf-8',
        dataType: 'json'
    }).done(function (beanProcedimientoCiclo) {
        console.log(beanProcedimientoCiclo);
        $('#modalCargandoProcedimientoCicloSocie').modal("hide");
        beanProcedimientoCicloSocie = beanProcedimientoCiclo;
        toListProcedimientoCicloSocie();
    }).fail(function (jqXHR, textStatus, errorThrown) {
        $('#modalCargandoProcedimientoCicloSocie').modal("hide");
        showAlertErrorRequest();
    });
}

function toListProcedimientoCicloSocie() {
    document.querySelector("#div-content-evaluacion-socioeconomica").innerHTML = "";
    if (beanProcedimientoCicloSocie.procedimientos.length > 0) {
        let card;
        beanProcedimientoCicloSocie.procedimientos.forEach(procedimiento => {
            card =
                    `
                <div class="dt-widget__item border-success sisbu-cursor-mano">
                    <div class="dt-widget__info text-truncate">
                        <div class="dt-widget__title f-16 font-weight-500 text-truncate">
                            ${procedimiento.descripcion}
                        </div>
                        <p class="mb-0 text-truncate text-light-gray">
                            ${procedimiento.num_preguntas} Preguntas
                        </p>
                    </div>
                    <div class="dt-widget__extra text-right">
                        <div class="show-content mt-2">
                            <span class="d-block"><span class='text-success'>Por realizar</span></span>
                        </div>
                        <div class="hide-content">
                            <div class="action-btn-group">
                                <button class="btn btn-default text-primary dt-fab-btn btn btn-realizar-procedimiento" idprocedimiento="${procedimiento.idprocedimiento}"
                                    title="Click para realizar" data-toggle="tooltip">
                                    <i class="icon icon-assignment icon-xl"></i> <i class="icon icon-double-arrow-right"></i>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            `;
            document.querySelector("#div-content-evaluacion-socioeconomica").innerHTML += card;
        });
        addEventsProcedimientoCicloSocie();
        $('[data-toggle="tooltip"]').tooltip();
    } else {
        showAlertTopEnd('warning', 'Lo sentimos no hay ninguna evaluación configurada para este ciclo');
    }
}
function addEventsProcedimientoCicloSocie() {
    document.querySelectorAll(".btn-realizar-procedimiento").forEach(btn => {
        btn.onclick = function () {
            procedimientoCicloSocieSelected = findProcedimientoCicloSocieForId(this.getAttribute('idprocedimiento'));
            if (procedimientoCicloSocieSelected != undefined) {
                openPreguntas();
            } else {
                showAlertTopEnd('warning', 'No se encontró la evaluación para poder realizarlo. Vuelva a iniciar sesión');
            }
        };
    });
}

function findProcedimientoCicloSocieForId(idprocedimiento) {
    let procedimiento_;
    beanProcedimientoCicloSocie.procedimientos.forEach(procedimiento => {
        if (parseInt(idprocedimiento) == parseInt(procedimiento.idprocedimiento)) {
            procedimiento_ = procedimiento;
            return;
        }
    });
    return procedimiento_;
}

function openPreguntas() {
    document.querySelector("#div-evaluaciones-socieconomica").style.display = "none";
    document.querySelector("#div-preguntas-evaluacion-socieconomica").style.display = "flex";
}

function navigateProcedimientoCicloSocie() {

}
