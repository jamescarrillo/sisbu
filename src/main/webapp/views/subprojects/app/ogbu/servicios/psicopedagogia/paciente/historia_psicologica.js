var beanPaginationHistoriaPsicologica;
var historiaPsicologicaSelected;
var beanRequestHistoriaPsicologica = new BeanRequest();

document.addEventListener("DOMContentLoaded", function () {

    $("#modalCargandoHistoriaPsicologica").on('shown.bs.modal', function () {
        processAjaxHistoriaPsicologica();
    });

    document.querySelector("#btn-save-historia-psicologica").onclick = function () {
        if (personalSelected == undefined) {
            showAlertTopEnd('warning', 'Por favor seleccione correctamente psicologo(a)');
            return;
        }
        setValuesHistoriaPsicologica();
    }

});

function processAjaxHistoriaPsicologica() {
    let parameters_pagination = "";
    let json = "";
    if (beanRequestHistoriaPsicologica.operation == "get") {
        parameters_pagination += "/" + atendidoSelected.idatendido;
    } else {
        parameters_pagination = "";
        if (beanRequestHistoriaPsicologica.operation == "add") {
            historiaPsicologicaSelected.fecha_apertura = getTimesTampJavaScriptCurrent();
            historiaPsicologicaSelected.total_sesiones = 0;
            historiaPsicologicaSelected.sesion_actual = 0;
        } else {

        }
        json = historiaPsicologicaSelected;
    }
    $.ajax({
        url: getHostAPI() + beanRequestHistoriaPsicologica.entity_api + "/" + beanRequestHistoriaPsicologica.operation + parameters_pagination,
        type: beanRequestHistoriaPsicologica.type_request,
        data: JSON.stringify(json),
        headers: {
            'Authorization': 'Bearer ' + Cookies.get("sisbu_token")
        },
        contentType: 'application/json; charset=utf-8',
        dataType: 'json'
    }).done(function (beanCrudResponse) {
        //console.log(beanCrudResponse)
        $('#modalCargandoHistoriaPsicologica').modal("hide");
        if (beanCrudResponse.messageServer !== undefined) {
            if (beanCrudResponse.messageServer.toLowerCase() == "ok") {
                showAlertTopEnd('success', "Accion realizada exitosamente");
                if (beanRequestHistoriaPsicologica.operation == "add") {
                    navigateHome('home');
                }
            } else {
                showAlertTopEnd('warning', beanCrudResponse.messageServer);
            }
        }
        if (beanCrudResponse.t != undefined) {
            if (beanCrudResponse.t.idhistoria_psicologica > 0) {
                beanRequestHistoriaPsicologica.entity_api = "api/historia/psicologica";
                beanRequestHistoriaPsicologica.operation = "update";
                beanRequestHistoriaPsicologica.type_request = "PUT";
                historiaPsicologicaSelected = beanCrudResponse.t;
                openHistoriaPsicologica();
                document.querySelector("#row-plan-intervencion").style.display = "flex";
            } else {
                beanRequestHistoriaPsicologica.entity_api = "api/historia/psicologica";
                beanRequestHistoriaPsicologica.operation = "add";
                beanRequestHistoriaPsicologica.type_request = "POST";
                historiaPsicologicaSelected = {
                    "atendido": {
                        "idatendido": atendidoSelected.idatendido
                    }
                }
                personalSelected = undefined;
                clearHistoriaPsicologica();
                document.querySelector("#row-plan-intervencion").style.display = "none";
            }
        }
    }).fail(function (jqXHR, textStatus, errorThrown) {
        $('#modalCargandoHistoriaPsicologica').modal("hide");
        showAlertErrorRequest();

    });
}

function openHistoriaPsicologica() {
    setDataAtendidoHistoriaPsicologica();
    document.querySelector("#txtMotivoDeConsulta").value = historiaPsicologicaSelected.motivo_consulta;
    document.querySelector("#txtObservacionesGeneralesFisicas").value = historiaPsicologicaSelected.observaciones_generales_fisicas;
    document.querySelector("#txtObservacionesGeneralesConductuales").value = historiaPsicologicaSelected.observaciones_generales_conductuales;
    document.querySelector("#txtProblemaActual").value = historiaPsicologicaSelected.problema_actual;
    document.querySelector("#txtTecnicasYPruebasAplicadas").value = historiaPsicologicaSelected.tecnicas_y_pruebas_aplicadas;
    document.querySelector("#txtApreciacionDiagnostica").value = historiaPsicologicaSelected.apreciacion_diagnostica;
    document.querySelector("#txtRecomendaciones").value = historiaPsicologicaSelected.recomendaciones;
    personalSelected = historiaPsicologicaSelected.personal;
    document.querySelector("#btn-selecionar-personal").dispatchEvent(new Event('click'));
}

function setDataAtendidoHistoriaPsicologica() {
    document.querySelector("#txtTipoDocumentoPacienteHistoriaPsicologica").value = atendidoSelected.tipo_documento;
    document.querySelector("#txtModalidadPacienteHistoriaPsicologica").value = atendidoSelected.modalidad_ingreso;
    document.querySelector("#txtTipoColegioPacienteHistoriaPsicologica").value = atendidoSelected.tipo_colegio;
    document.querySelector("#txtEstadoCivilPacienteHistoriaPsicologica").value = atendidoSelected.estado_civil;
    document.querySelector("#txtCodigoPacienteHistoriaPsicologica").value = atendidoSelected.codigo;
    document.querySelector("#txtNumeroDocumentoPacienteHistoriaPsicologica").value = atendidoSelected.dni;
    document.querySelector("#txtApPaternoPacienteHistoriaPsicologica").value = atendidoSelected.apellido_pat;
    document.querySelector("#txtApMaternoPacienteHistoriaPsicologica").value = atendidoSelected.apellido_mat;
    document.querySelector("#txtNombrePacienteHistoriaPsicologica").value = atendidoSelected.nombre;
    document.querySelector("#txtSexoPacienteHistoriaPsicologica").value = atendidoSelected.sexo;
    document.querySelector("#txtFechaNacPacienteHistoriaPsicologica").value = atendidoSelected.fecha_nacimiento;
    document.querySelector("#txtCelularPacienteHistoriaPsicologica").value = atendidoSelected.celular;
    document.querySelector("#txtEmailPacienteHistoriaPsicologica").value = atendidoSelected.email;
    document.querySelector("#txtEscuelaPacienteHistoriaPsicologica").value = atendidoSelected.escuela.nombre;
    document.querySelector("#txtDistritoActualPacienteHistoriaPsicologica").value = atendidoSelected.distrito_actual.nombre;
    document.querySelector("#txtDireccionActualPacienteHistoriaPsicologica").value = atendidoSelected.direccion_actual;
    document.querySelector("#txtDistritoProcedenciaPacienteHistoriaPsicologica").value = atendidoSelected.distrito_procedencia.nombre;
    document.querySelector("#txtDireccionProcePacienteHistoriaPsicologica").value = atendidoSelected.direccion_procedencia;
    document.querySelector("#txtCicloAcademicoPacienteHistoriaPsicologica").value = atendidoSelected.ciclo_academico_ingreso.nombre;
}

function clearHistoriaPsicologica() {
    setDataAtendidoHistoriaPsicologica();
    document.querySelector("#txtMotivoDeConsulta").value = "";
    document.querySelector("#txtObservacionesGeneralesFisicas").value = "";
    document.querySelector("#txtObservacionesGeneralesConductuales").value = "";
    document.querySelector("#txtProblemaActual").value = "";
    document.querySelector("#txtTecnicasYPruebasAplicadas").value = "";
    document.querySelector("#txtApreciacionDiagnostica").value = "";
    document.querySelector("#txtRecomendaciones").value = "";
}

function setValuesHistoriaPsicologica() {
    historiaPsicologicaSelected.motivo_consulta = document.querySelector("#txtMotivoDeConsulta").value;
    historiaPsicologicaSelected.observaciones_generales_fisicas = document.querySelector("#txtObservacionesGeneralesFisicas").value;
    historiaPsicologicaSelected.observaciones_generales_conductuales = document.querySelector("#txtObservacionesGeneralesConductuales").value;
    historiaPsicologicaSelected.problema_actual = document.querySelector("#txtProblemaActual").value;
    historiaPsicologicaSelected.tecnicas_y_pruebas_aplicadas = document.querySelector("#txtTecnicasYPruebasAplicadas").value;
    historiaPsicologicaSelected.apreciacion_diagnostica = document.querySelector("#txtApreciacionDiagnostica").value;
    historiaPsicologicaSelected.recomendaciones = document.querySelector("#txtRecomendaciones").value;
    historiaPsicologicaSelected.personal = {
        "idpersonal": personalSelected.idpersonal
    };
    $("#modalCargandoHistoriaPsicologica").modal('show');
}