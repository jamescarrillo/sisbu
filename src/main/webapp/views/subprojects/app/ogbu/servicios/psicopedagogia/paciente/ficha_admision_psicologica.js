var beanPaginationFichaAdmisionPsicologica;
var fichaAdmisionPsicologicaSelected;
var beanRequestFichaAdmisionPsicologica = new BeanRequest();

document.addEventListener("DOMContentLoaded", function () {

    $("#modalCargandoFichaAdmisionPsicologica").on('shown.bs.modal', function () {
        processAjaxFichaAdmisionPsicologica();
    });


});

function processAjaxFichaAdmisionPsicologica() {
    let parameters_pagination = "";
    let json = "";
    if (beanRequestFichaAdmisionPsicologica.operation == "get") {
        parameters_pagination += "/" + atendidoSelected.idatendido;
    } else {
        parameters_pagination = "";
        json = fichaAdmisionPsicologicaSelected;
    }
    $.ajax({
        url: getHostAPI() + beanRequestFichaAdmisionPsicologica.entity_api + "/" + beanRequestFichaAdmisionPsicologica.operation + parameters_pagination,
        type: beanRequestFichaAdmisionPsicologica.type_request,
        data: JSON.stringify(json),
        headers: {
            'Authorization': 'Bearer ' + Cookies.get("sisbu_token")
        },
        contentType: 'application/json; charset=utf-8',
        dataType: 'json'
    }).done(function (beanCrudResponse) {
        console.log(beanCrudResponse)
        $('#modalCargandoFichaAdmisionPsicologica').modal("hide");
        if (beanCrudResponse.messageServer !== undefined) {
            if (beanCrudResponse.messageServer.toLowerCase() == "ok") {
                showAlertTopEnd('warning', "Accion realizada exitosamente");
            } else {
                showAlertTopEnd('warning', beanCrudResponse.messageServer);
            }

        }
        if (beanCrudResponse.t != undefined) {
            if (beanCrudResponse.t.idficha_admision_psicologica > 0) {
                beanRequestFichaAdmisionPsicologica.entity_api = "api/ficha/admision/psicologica";
                beanRequestFichaAdmisionPsicologica.operation = "update";
                beanRequestFichaAdmisionPsicologica.type_request = "PUT";
                fichaAdmisionPsicologicaSelected = beanCrudResponse.t;
                openFichaAdmisionPsicologica();
            } else {
                beanRequestFichaAdmisionPsicologica.entity_api = "api/ficha/admision/psicologica";
                beanRequestFichaAdmisionPsicologica.operation = "add";
                beanRequestFichaAdmisionPsicologica.type_request = "POST";
                fichaAdmisionPsicologicaSelected = {
                    "atendido": atendidoSelected
                }
            }
        }
    }).fail(function (jqXHR, textStatus, errorThrown) {
        $('#modalCargandoFichaAdmisionPsicologica').modal("hide");
        showAlertErrorRequest();

    });
}

function openFichaAdmisionPsicologica() {
    console.log(fichaAdmisionPsicologicaSelected)
}

function setValuesFichaAdmisionPsicologica() {
    fichaAdmisionPsicologicaSelected.buscaste_informacion_acerca_tu_carrera = document.querySelector("#txtBuscasteInformacionAcercaTuCarrera").value;
    fichaAdmisionPsicologicaSelected.elegiste_tu_carrera_iniciativa_propia = document.querySelector("#txtElegisteTuCarreraIniciativaPropia").value;
    fichaAdmisionPsicologicaSelected.alguna_vez_pensaste_cambiarte_carrera = document.querySelector("#txtAlgunaVezPensasteCambiarteCarrera").value;
    fichaAdmisionPsicologicaSelected.como_es_tu_actitud_hacia_el_estudio = document.querySelector("#txtComoEsTuActitudHaciaElEstudio").value;
    fichaAdmisionPsicologicaSelected.cuales_son_tus_habitos_de_estudio = document.querySelector("#txtCualesSonTusHabitosDeEstudio").value;
    fichaAdmisionPsicologicaSelected.como_organizas_tu_tiempo = document.querySelector("#txtComoOrganizasTuTiempo").value;
    fichaAdmisionPsicologicaSelected.crees_que_te_has_adaptado_adecuadamente_al_ambito_academico = document.querySelector("#txtCreasQueTeHasAdaptadoAlAmbitoAcademico").value;
    fichaAdmisionPsicologicaSelected.describe_las_relaciones_de_amistad_dentro_de_la_universidad = document.querySelector("#txtDescribeLasRelacionesDeAmistadDentroDeLaUniversidad").value;
    fichaAdmisionPsicologicaSelected.desarrollas_nuevos_aspectos_personales_por_medio_ = document.querySelector("#txtNuevosAspectosPersonalesPorMedioDeLaCarreraQueElegiste").value;
    fichaAdmisionPsicologicaSelected.describete_como_estudiante = document.querySelector("#txtDescribeteComoEstudiante").value;
    fichaAdmisionPsicologicaSelected.como_es_tu_rendimiento_academico = document.querySelector("#txtComoEsTuRendimientoAcademico").value;
    fichaAdmisionPsicologicaSelected.ademas_de_los_conocimientos_de_la_unprg_investigas = document.querySelector("#txtAdemasDeLosConocimientosDeLaUNPRGInvestigas").value;
    fichaAdmisionPsicologicaSelected.que_esperas_conseguir_de_tu_carrera = document.querySelector("#txtQueEsperasCoseguirDeTuCarrera").value;
    fichaAdmisionPsicologicaSelected.como_describirias_a_tu_familia = document.querySelector("#txtComoDescribiriasATuFamilia").value;
    fichaAdmisionPsicologicaSelected.como_describirias_la_relacion_con_tu_padre = document.querySelector("#txtComoDiscribirisaLaRelacionConTuPadre").value;
    fichaAdmisionPsicologicaSelected.como_describirias_la_relacion_con_tu_madre = document.querySelector("#txtComoDiscribirisaLaRelacionConTuMadre").value;
    fichaAdmisionPsicologicaSelected.como_describirias_la_relacion_con_tus_hermanos = document.querySelector("#txtComoDiscribirisaLaRelacionConTusHermanos").value;
    fichaAdmisionPsicologicaSelected.como_te_describes = document.querySelector("#txtComoTeDescribes").value;
    fichaAdmisionPsicologicaSelected.tienes_metas_cuales_son_a_mediano_y_largo_plazo = document.querySelector("#txtTiensMetasCualesSonAMedianoYLargoPlazo").value;
    fichaAdmisionPsicologicaSelected.si_pudieras_cambiar_algo_de_tu_personalidad_que_seria = document.querySelector("#txtSiPuedierasCambiarAlgoDeTuPersonalidadQueSeria").value;
    fichaAdmisionPsicologicaSelected.has_recibido_terapia_psicopedagogica_u_orientacion_ = document.querySelector("#txtHasRecibidoTerapiaPsicologicaUOrientacionPsicopedagogicaAnteriormente").value;
    fichaAdmisionPsicologicaSelected.cuando_comenzaste_a_sentirte_asi_describete_con_tus_ = document.querySelector("#txtCuandoComensasteASentirteAsiDescribeteConTusPropiasPalabras").value;
    fichaAdmisionPsicologicaSelected.anteriormente_habias_tenido_ese_problema_que_hiciste_ = document.querySelector("#txtAnteriormenteHabiasTenidoEseProblemaQueHicisteParaSuperarLaSituacion").value;
    fichaAdmisionPsicologicaSelected.que_obstaculiza_para_que_tu_problema_sea_resuelto_como_ = document.querySelector("#txtQueObstaculizaParaQueTuProblemaSeaResueltoComoInterfiereEnTuVidaYTusEstudios").value;
    fichaAdmisionPsicologicaSelected.como_consideras_que_seria_tu_vida_si_no_existiera_este_problema = document.querySelector("#txtComoConsiderasQueSeriaTuVidaSiNoExistieraEsteProblema").value;
    fichaAdmisionPsicologicaSelected.que_estas_haciendo_o_estas_dispuesto_hacer_para_dar_ = document.querySelector("#txtQueEstasHaciendoOEstasDispuestoHacerParaDarSolucionATuSItuacion").value;
    fichaAdmisionPsicologicaSelected.area_trabajar_conmigo_mismo = document.querySelector("#txtAreaTrabajarConmigoMismo").value;
    fichaAdmisionPsicologicaSelected.area_trabajar_familia = document.querySelector("#txtAreaTrabajarFamilia").value;
    fichaAdmisionPsicologicaSelected.area_trabajar_pareja_y_amigos = document.querySelector("#txtAreaTrabajarParejaYAmigos").value;
    fichaAdmisionPsicologicaSelected.area_trabajar_academicos_y_trabajo = document.querySelector("#txtAreaTrabajarAcademicosYTrabajo").value;
    fichaAdmisionPsicologicaSelected.area_trabajar_otros = document.querySelector("#txtAreaTrabajarOtros").value;
    fichaAdmisionPsicologicaSelected.si_apoyo_psicologico_tuviera_exito_que_cambios_ = document.querySelector("#txtSiElApoyoPsicologicoTuvieraExitoQueCambiosObservariasEnTuConducta").value;
}