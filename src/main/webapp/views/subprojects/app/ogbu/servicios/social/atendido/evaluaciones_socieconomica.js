var beanPaginationFichaSocieconomica;
var ficha_socieconomicaSelected;
var beanRequestFichaSocieconomica = new BeanRequest();
var options_con_quien_vive = ["-1", "AMBOS PADRES", "PADRE", "MADRE", "HERMANOS", "CONYUQUE", "SOLO(A)"];
var options_tenencia_vivienda = ["-1", "PROPIA", "ALQUILADA", "ALQUILER VENTA", "ANTICRECES", "GUARDERIA"]
var options_material_vivienda = ["-1", "NOBLE", "SILLAR", "BLOQUETAS"]
var options_tipos_seguro = ["-1", "ESSALUD", "SIS", "SEGURO VOLUNTARIO UNIVERSITARIO", "NO TENGO SEGURO"]

document.addEventListener("DOMContentLoaded", function () {

    //INICIALIZANDO VARIABLES DE SOLICITUD
    beanRequestFichaSocieconomica.entity_api = "api/ficha/socioeconomica";

    $('#FrmFichaSocieconomica').submit(function (event) {
        beanRequestFichaSocieconomica.operation = "get/by/idatendido";
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
        beanRequestFichaSocieconomica.operation = "get/by/idatendido";
        beanRequestFichaSocieconomica.type_request = "GET";
    });

    document.querySelector("#slctTienesHijos").onchange = function () {
        if (this.value == "SI") {
            document.querySelector("#txtCantHijosFichaSocioeconomica").style.display = "block";
            document.querySelector("#txtCantHijosFichaSocioeconomica").value = "";
            document.querySelector("#txtCantHijosFichaSocioeconomica").focus();
        } else {
            document.querySelector("#txtCantHijosFichaSocioeconomica").style.display = "none";
        }
    };

    document.querySelector("#slctConQuienViveFichaSocieconomica").onchange = function () {
        if (this.value == "OTRO") {
            document.querySelector("#txtConQuienViveFichaSocieconomica").style.display = "block";
            document.querySelector("#txtConQuienViveFichaSocieconomica").value = "";
            document.querySelector("#txtConQuienViveFichaSocieconomica").focus();
        } else {
            document.querySelector("#txtConQuienViveFichaSocieconomica").style.display = "none";
        }
    }

    document.querySelector("#slctTrabajas").onchange = function () {
        if (this.value == "SI") {
            document.querySelector("#txtActividadEconomicaDesempeniaFichaSocioeconomica").style.display = "block";
            document.querySelector("#txtActividadEconomicaDesempeniaFichaSocioeconomica").value = "";
            document.querySelector("#txtActividadEconomicaDesempeniaFichaSocioeconomica").focus();
        } else {
            document.querySelector("#txtActividadEconomicaDesempeniaFichaSocioeconomica").style.display = "none";
        }
    }

    document.querySelector("#slctTenenciaVivienda").onchange = function () {
        if (this.value == "OTRO") {
            document.querySelector("#txtTenenciaViviendaFichaSocieconomica").style.display = "block";
            document.querySelector("#txtTenenciaViviendaFichaSocieconomica").value = "";
            document.querySelector("#txtTenenciaViviendaFichaSocieconomica").focus();
        } else {
            document.querySelector("#txtTenenciaViviendaFichaSocieconomica").style.display = "none";
        }
    }

    document.querySelector("#slctMaterialVivienda").onchange = function () {
        if (this.value == "OTRO") {
            document.querySelector("#txtMaterialViviendaFichaSocioeconomica").style.display = "block";
            document.querySelector("#txtMaterialViviendaFichaSocioeconomica").value = "";
            document.querySelector("#txtMaterialViviendaFichaSocioeconomica").focus();
        } else {
            document.querySelector("#txtMaterialViviendaFichaSocioeconomica").style.display = "none";
        }
    }

    document.querySelector("#slctPresentaDiscapacidad").onchange = function () {
        if (this.value == "SI") {
            document.querySelector("#txtDiscapacidadFichaSocioeconomica").style.display = "block";
            document.querySelector("#txtDiscapacidadFichaSocioeconomica").value = "";
            document.querySelector("#txtDiscapacidadFichaSocioeconomica").focus();
        } else {
            document.querySelector("#txtDiscapacidadFichaSocioeconomica").style.display = "none";
        }
    }

    document.querySelector("#slctTipoSeguroFichaSocioeconomica").onchange = function () {
        if (this.value == "OTRO") {
            document.querySelector("#txtTipoSeguroFichaSocioeconomica").style.display = "block";
            document.querySelector("#txtTipoSeguroFichaSocioeconomica").value = "";
            document.querySelector("#txtTipoSeguroFichaSocioeconomica").focus();
        } else {
            document.querySelector("#txtTipoSeguroFichaSocioeconomica").style.display = "none";
        }
    }

    document.querySelector("#btn-finalize-evuacion-socioeconomica").onclick = function () {
        if (validateFichaSocioeconomica()) {
            if (document.querySelector("#slctTienesHijos").value == "SI") {
                ficha_socieconomicaSelected.cant_hijos = document.querySelector("#txtCantHijosFichaSocioeconomica").value;
            } else {
                ficha_socieconomicaSelected.cant_hijos = "0";
            }
            ficha_socieconomicaSelected.nombre_colegio = document.querySelector("#txtNombreColegioFichaSocioeconomica").value.toUpperCase();
            ficha_socieconomicaSelected.anio_ingreso = document.querySelector("#slctAnioIngresoFichaSocioeconomica").value;
            ficha_socieconomicaSelected.ciclo_estudios = document.querySelector("#slctCicloEstudioFichaSocioeconomica").value;
            if (document.querySelector("#slctTipoCreditos").value == "S") {
                ficha_socieconomicaSelected.num_creditos_matriculados_semestrales = parseInt(document.querySelector("#txtCanCreditosMatriculados").value);
                ficha_socieconomicaSelected.num_creditos_matriculados_anuales = 0;
            } else {
                ficha_socieconomicaSelected.num_creditos_matriculados_semestrales = 0;
                ficha_socieconomicaSelected.num_creditos_matriculados_anuales = parseInt(document.querySelector("#txtCanCreditosMatriculados").value);
            }
            ficha_socieconomicaSelected.num_creditos_matriculados = ficha_socieconomicaSelected.num_creditos_matriculados_semestrales + ficha_socieconomicaSelected.num_creditos_matriculados_anuales;
            ficha_socieconomicaSelected.num_cursos_desaprobados = document.querySelector("#txtNumCursosDesaprobadosFichaSocieconomica").value;
            ficha_socieconomicaSelected.num_cursos_abandonados = document.querySelector("#txtNumCursosAbandonadosFichaSocieconomica").value;
            ficha_socieconomicaSelected.domicilio_padre = document.querySelector("#txtDomicilioPadreFichaSocieconomica").value.toUpperCase();
            ficha_socieconomicaSelected.domicilio_madre = document.querySelector("#txtDomicilioMadreFichaSocieconomica").value.toUpperCase();
            ficha_socieconomicaSelected.relacion_padres = document.querySelector("#txtRelacionPadresFichaSocieconomica").value;
            if (document.querySelector("#slctConQuienViveFichaSocieconomica").value == "OTRO") {
                ficha_socieconomicaSelected.con_quien_vive = document.querySelector("#txtRelacionPadresFichaSocieconomica").value.toUpperCase();
            } else {
                ficha_socieconomicaSelected.con_quien_vive = document.querySelector("#slctConQuienViveFichaSocieconomica").value;
            }
            ficha_socieconomicaSelected.relacion_familiares = document.querySelector("#slctRelacionFamiliaresFichaSocieconomica").value;
            ficha_socieconomicaSelected.dependencia_economica = document.querySelector("#slctDependenciaEconomicaFichaSocioeconomica").value;
            ficha_socieconomicaSelected.apoyo_recibe = document.querySelector("#slctApoyoRecibeFichaSocioeconomica").value;
            if (document.querySelector("#slctTrabajas").value == "SI") {
                ficha_socieconomicaSelected.actividad_economica_desempenia = document.querySelector("#txtActividadEconomicaDesempeniaFichaSocioeconomica").value.toUpperCase();
            } else {
                ficha_socieconomicaSelected.actividad_economica_desempenia = "";
            }
            if (document.querySelector("#slctTenenciaVivienda").value == "OTRO") {
                ficha_socieconomicaSelected.tenencia_vivienda = document.querySelector("#txtTenenciaViviendaFichaSocieconomica").value.toUpperCase();
            } else {
                ficha_socieconomicaSelected.tenencia_vivienda = document.querySelector("#slctTenenciaVivienda").value;
            }
            ficha_socieconomicaSelected.tipo_vivienda = document.querySelector("#slctTipoViviendaFichaSocioeconomica").value;
            if (document.querySelector("#slctMaterialVivienda").value == "OTRO") {
                ficha_socieconomicaSelected.material_construccion = document.querySelector("#txtMaterialViviendaFichaSocioeconomica").value.toUpperCase();
            } else {
                ficha_socieconomicaSelected.material_construccion = document.querySelector("#slctMaterialVivienda").value;
            }
            ficha_socieconomicaSelected.estado_construccion = document.querySelector("#slctEstadoConstruccionFichaSocioeconomica").value;
            let services_v = "";
            let services_array = [];
            document.querySelectorAll(".check-servicio-fs").forEach((check) => {
                if (check.checked) {
                    services_array.push(check);
                }
            });
            for (var i = 0; i < services_array.length; i++) {
                const check = services_array[i];
                if (i == services_array.length - 1) {
                    services_v += check.getAttribute('service');
                } else {
                    services_v += check.getAttribute('service') + ",";
                }
            }
            ficha_socieconomicaSelected.servicios_vivienda = services_v.toUpperCase();
            ficha_socieconomicaSelected.tiene_internet = document.querySelector("#slctServicioInternetFichaSocioeconomica").value;
            ficha_socieconomicaSelected.tiene_laptop = document.querySelector("#slctTieneLaptopFichaSocioeconomica").value;
            ficha_socieconomicaSelected.cel_plan_datos = document.querySelector("#slctCelPlanDatosFichaSocioeconomica").value;
            if (document.querySelector("#slctTipoSeguroFichaSocioeconomica").value == "OTRO") {
                ficha_socieconomicaSelected.tipo_seguro = document.querySelector("#txtTipoSeguroFichaSocioeconomica").value.toUpperCase();
            } else {
                ficha_socieconomicaSelected.tipo_seguro = document.querySelector("#slctTipoSeguroFichaSocioeconomica").value;
            }
            if (document.querySelector("#slctPresentaDiscapacidad").value == "SI") {
                ficha_socieconomicaSelected.discapacidad = document.querySelector("#txtDiscapacidadFichaSocioeconomica").value.toUpperCase();
            } else {
                ficha_socieconomicaSelected.discapacidad = "";
            }
            ficha_socieconomicaSelected.distrito_padre = distritoPadreSelected == undefined ? null : distritoPadreSelected;
            ficha_socieconomicaSelected.distrito_madre = distritoMadreSelected == undefined ? null : distritoMadreSelected;
            ficha_socieconomicaSelected.atendido = atendidoSelected;
            //console.log(ficha_socieconomicaSelected);
            $("#modalCargandoSelectedFichaSocieconomica").modal('show');
        }
    }
    document.querySelector("#div-regresar-selected-evaluation-socioeconomico").onclick = function () {
        beanRequestAtendido.operation = "paginate";
        beanRequestAtendido.type_request = "GET";
        $('#modalCargandoAtendido').modal('show');
        removeClass(document.querySelector("#row-option-socioeconomico"), "d-block");
        removeClass(document.querySelector("#btnListaAtendido"), "d-none");
        addClass(document.querySelector("#row-option-socioeconomico"), "d-none");
        addClass(document.querySelector("#btnListaAtendido"), "d-block");

    };
    loaderAniosIngreso();

});

function processAjaxFichaSocieconomica() {
    let json = "";
    let url_request = getHostAPI() + beanRequestFichaSocieconomica.entity_api + "/" + beanRequestFichaSocieconomica.operation;
    switch (beanRequestFichaSocieconomica.operation) {
        case "add":
        case "update":
            json = ficha_socieconomicaSelected;
            break;
        default:
            url_request += "/" + atendidoSelected.idatendido;
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
        //console.log(beanCrudResponse);
        $('#modalCargandoSelectedFichaSocieconomica').modal("hide");
        if (beanCrudResponse.messageServer !== undefined) {
            if (beanCrudResponse.messageServer == "ok") {
                showAlertTopEnd('success', 'Acción realizada exitosamente');
                navigateOptionEvaluation('home');
            } else {
                showAlertTopEnd('warning', 'Ha ocurrido un error al intentar guardar tu información');
            }
        }
        if (beanCrudResponse.FichaSocioeconomica !== undefined) {
            ficha_socieconomicaSelected = beanCrudResponse.FichaSocioeconomica;
            if (beanCrudResponse.FichaSocioeconomica.idficha_socioeconomica > 0) {
                beanRequestFichaSocieconomica.operation = "update";
                beanRequestFichaSocieconomica.type_request = "PUT";
                loaderFichaSocioeconomica();
            } else {
                beanRequestFichaSocieconomica.operation = "add";
                beanRequestFichaSocieconomica.type_request = "POST";
                clearFichaSocioeconomica();
            }
        }
        $('[data-toggle="tooltip"]').tooltip();
        $('[data-toggle="popover"]').popover();
    }).fail(function (jqXHR, textStatus, errorThrown) {
        $('#modalCargandoSelectedFichaSocieconomica').modal("hide");
        showAlertErrorRequest();
    });
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
    document.querySelector("#txtNombreColegioFichaSocioeconomica").value = "";
    document.querySelector("#slctAnioIngresoFichaSocioeconomica").value = "-1";
    document.querySelector("#slctCicloEstudioFichaSocioeconomica").value = "-1";
    document.querySelector("#slctTipoCreditos").value = "-1";
    document.querySelector("#txtCanCreditosMatriculados").value = "";
    document.querySelector("#txtNumCursosDesaprobadosFichaSocieconomica").value = "";
    document.querySelector("#txtNumCursosAbandonadosFichaSocieconomica").value = "";
    document.querySelector("#txtDomicilioPadreFichaSocieconomica").value = "";
    document.querySelector("#txtDomicilioMadreFichaSocieconomica").value = "";
    document.querySelector("#txtDistritoPadre").value = "";
    distritoPadreSelected = undefined;
    document.querySelector("#txtDistritoMadre").value = "";
    distritoMadreSelected = undefined;
    document.querySelector("#txtRelacionPadresFichaSocieconomica").value = "-1";
    document.querySelector("#slctConQuienViveFichaSocieconomica").value = "-1";
    document.querySelector("#slctConQuienViveFichaSocieconomica").dispatchEvent(new Event('change'));
    document.querySelector("#slctRelacionFamiliaresFichaSocieconomica").value = "-1";
    document.querySelector("#slctDependenciaEconomicaFichaSocioeconomica").value = "-1";
    document.querySelector("#slctApoyoRecibeFichaSocioeconomica").value = "-1";
    document.querySelector("#slctTrabajas").value = "-1";
    document.querySelector("#slctTrabajas").dispatchEvent(new Event('change'));
    document.querySelector("#slctTenenciaVivienda").value = "-1";
    document.querySelector("#slctTenenciaVivienda").dispatchEvent(new Event('change'));
    document.querySelector("#slctTipoViviendaFichaSocioeconomica").value = "-1";
    document.querySelector("#slctMaterialVivienda").value = "-1";
    document.querySelector("#slctMaterialVivienda").dispatchEvent(new Event('change'));
    document.querySelector("#slctEstadoConstruccionFichaSocioeconomica").value = "-1";
    document.querySelectorAll(".check-servicio-fs").forEach(function (check) {
        check.checked = false;
    });
    document.querySelector("#slctServicioInternetFichaSocioeconomica").value = "-1";
    document.querySelector("#slctTieneLaptopFichaSocioeconomica").value = "-1";
    document.querySelector("#slctCelPlanDatosFichaSocioeconomica").value = "-1";
    document.querySelector("#slctTipoSeguroFichaSocioeconomica").value = "-1";
    document.querySelector("#slctPresentaDiscapacidad").value = "-1";
    document.querySelector("#slctPresentaDiscapacidad").dispatchEvent(new Event('change'));
}

function loaderFichaSocioeconomica() {
    if (ficha_socieconomicaSelected.cant_hijos == 0) {
        document.querySelector("#slctTienesHijos").value = "NO";
        document.querySelector("#txtCantHijosFichaSocioeconomica").style.display = "none";
    } else {
        document.querySelector("#slctTienesHijos").value = "SI";
        document.querySelector("#txtCantHijosFichaSocioeconomica").style.display = "block";
        document.querySelector("#txtCantHijosFichaSocioeconomica").value = ficha_socieconomicaSelected.cant_hijos;
    }
    document.querySelector("#txtNombreColegioFichaSocioeconomica").value = ficha_socieconomicaSelected.nombre_colegio;
    document.querySelector("#slctAnioIngresoFichaSocioeconomica").value = ficha_socieconomicaSelected.anio_ingreso;
    document.querySelector("#slctCicloEstudioFichaSocioeconomica").value = ficha_socieconomicaSelected.ciclo_estudios;
    if (ficha_socieconomicaSelected.num_creditos_matriculados_semestrales > 0) {
        document.querySelector("#slctTipoCreditos").value = "S";
    } else {
        document.querySelector("#slctTipoCreditos").value = "A";
    }
    document.querySelector("#txtCanCreditosMatriculados").value = ficha_socieconomicaSelected.num_creditos_matriculados;
    document.querySelector("#txtNumCursosDesaprobadosFichaSocieconomica").value = ficha_socieconomicaSelected.num_cursos_desaprobados;
    document.querySelector("#txtNumCursosAbandonadosFichaSocieconomica").value = ficha_socieconomicaSelected.num_cursos_abandonados;
    document.querySelector("#txtDomicilioPadreFichaSocieconomica").value = ficha_socieconomicaSelected.domicilio_padre;
    document.querySelector("#txtDomicilioMadreFichaSocieconomica").value = ficha_socieconomicaSelected.domicilio_madre;
    document.querySelector("#txtDistritoPadre").value = ficha_socieconomicaSelected.distrito_padre.iddistrito == 0 ? "" : ficha_socieconomicaSelected.distrito_padre.nombre;
    distritoPadreSelected = ficha_socieconomicaSelected.distrito_padre.iddistrito == 0 ? undefined : ficha_socieconomicaSelected.distrito_padre;
    document.querySelector("#txtDistritoMadre").value = ficha_socieconomicaSelected.distrito_madre.iddistrito == 0 ? "" : ficha_socieconomicaSelected.distrito_madre.nombre;
    distritoMadreSelected = ficha_socieconomicaSelected.distrito_madre.iddistrito == 0 ? undefined : ficha_socieconomicaSelected.distrito_madre;
    document.querySelector("#txtRelacionPadresFichaSocieconomica").value = ficha_socieconomicaSelected.relacion_padres;
    if (options_con_quien_vive.indexOf(ficha_socieconomicaSelected.con_quien_vive) == -1) {
        document.querySelector("#slctConQuienViveFichaSocieconomica").value = "OTRO";
        document.querySelector("#txtConQuienViveFichaSocieconomica").style.display = "block";
        document.querySelector("#txtConQuienViveFichaSocieconomica").value = ficha_socieconomicaSelected.con_quien_vive;
    } else {
        document.querySelector("#slctConQuienViveFichaSocieconomica").value = ficha_socieconomicaSelected.con_quien_vive;
        document.querySelector("#txtConQuienViveFichaSocieconomica").style.display = "none";
    }
    document.querySelector("#slctRelacionFamiliaresFichaSocieconomica").value = ficha_socieconomicaSelected.relacion_familiares;
    document.querySelector("#slctDependenciaEconomicaFichaSocioeconomica").value = ficha_socieconomicaSelected.dependencia_economica;
    document.querySelector("#slctApoyoRecibeFichaSocioeconomica").value = ficha_socieconomicaSelected.apoyo_recibe;
    if (ficha_socieconomicaSelected.actividad_economica_desempenia == "") {
        document.querySelector("#slctTrabajas").value = "NO";
        document.querySelector("#txtActividadEconomicaDesempeniaFichaSocioeconomica").style.display = "none";
    } else {
        document.querySelector("#slctTrabajas").value = "SI";
        document.querySelector("#txtActividadEconomicaDesempeniaFichaSocioeconomica").value = ficha_socieconomicaSelected.actividad_economica_desempenia;
        document.querySelector("#txtActividadEconomicaDesempeniaFichaSocioeconomica").style.display = "block";
    }
    if (options_tenencia_vivienda.indexOf(ficha_socieconomicaSelected.tenencia_vivienda) == -1) {
        document.querySelector("#slctTenenciaVivienda").value = "OTRO";
        document.querySelector("#txtTenenciaViviendaFichaSocieconomica").style.display = "block";
        document.querySelector("#txtTenenciaViviendaFichaSocieconomica").value = ficha_socieconomicaSelected.tenencia_vivienda;
    } else {
        document.querySelector("#slctTenenciaVivienda").value = ficha_socieconomicaSelected.tenencia_vivienda;
        document.querySelector("#txtTenenciaViviendaFichaSocieconomica").style.display = "none";
    }
    document.querySelector("#slctTipoViviendaFichaSocioeconomica").value = ficha_socieconomicaSelected.tipo_vivienda;
    if (options_material_vivienda.indexOf(ficha_socieconomicaSelected.material_construccion) == -1) {
        document.querySelector("#slctMaterialVivienda").value = "OTRO";
        document.querySelector("#txtMaterialViviendaFichaSocioeconomica").style.display = "block";
        document.querySelector("#txtMaterialViviendaFichaSocioeconomica").value = ficha_socieconomicaSelected.material_construccion;
    } else {
        document.querySelector("#slctMaterialVivienda").value = ficha_socieconomicaSelected.material_construccion;
        document.querySelector("#txtMaterialViviendaFichaSocioeconomica").style.display = "none";
    }
    document.querySelector("#slctEstadoConstruccionFichaSocioeconomica").value = ficha_socieconomicaSelected.estado_construccion;
    let checks_all = document.querySelectorAll(".check-servicio-fs");
    checks_all.forEach(function (check) {
        check.checked = false;
    });
    let checks = ficha_socieconomicaSelected.servicios_vivienda.split(",");
    for (var i = 0; i < checks.length; i++) {
        for (var j = 0; j < checks_all.length; j++) {
            const check = checks_all[j];
            //console.log("Comparando", " ", check.getAttribute('service'), " con ", checks[i])
            if (check.getAttribute('service') == checks[i]) {
                check.checked = true;
                break;
            }
        }
    }
    document.querySelector("#slctServicioInternetFichaSocioeconomica").value = ficha_socieconomicaSelected.tiene_internet;
    document.querySelector("#slctTieneLaptopFichaSocioeconomica").value = ficha_socieconomicaSelected.tiene_laptop;
    document.querySelector("#slctCelPlanDatosFichaSocioeconomica").value = ficha_socieconomicaSelected.cel_plan_datos;
    if (options_tipos_seguro.indexOf(ficha_socieconomicaSelected.tipo_seguro) == -1) {
        document.querySelector("#slctTipoSeguroFichaSocioeconomica").value = "OTRO";
        document.querySelector("#txtTipoSeguroFichaSocioeconomica").style.display = "block";
        document.querySelector("#txtTipoSeguroFichaSocioeconomica").value = ficha_socieconomicaSelected.tipo_seguro;
    } else {
        document.querySelector("#slctTipoSeguroFichaSocioeconomica").value = ficha_socieconomicaSelected.tipo_seguro;
        document.querySelector("#txtTipoSeguroFichaSocioeconomica").style.display = "none";
    }
    if (ficha_socieconomicaSelected.discapacidad == "") {
        document.querySelector("#slctPresentaDiscapacidad").value = "NO";
        document.querySelector("#txtDiscapacidadFichaSocioeconomica").style.display = "none";
    } else {
        document.querySelector("#slctPresentaDiscapacidad").value = "SI";
        document.querySelector("#txtDiscapacidadFichaSocioeconomica").style.display = "block";
        document.querySelector("#txtDiscapacidadFichaSocioeconomica").value = ficha_socieconomicaSelected.discapacidad;
    }
}

function loaderAniosIngreso() {
    document.querySelector("#slctAnioIngresoFichaSocioeconomica").innerHTML = "<option value='-1'>Seleccionar. . .</option>";
    let date = new Date();
    let anio_actual = date.getFullYear();
    let anio_last = anio_actual - 15;
    for (var i = date.getFullYear(); i > anio_last; i--) {
        document.querySelector("#slctAnioIngresoFichaSocioeconomica").innerHTML += "<option value='" + anio_actual + "'>" + anio_actual + "</option>";
        anio_actual--;
    }
}

function validateFichaSocioeconomica() {
    if (document.querySelector("#slctTienesHijos").value == "-1") {
        showAlertTopEnd("warning", 'Por favor seleccione si tiene hijos o no');
        return false;
    }
    if (document.querySelector("#slctTienesHijos").value == "SI") {
        if (document.querySelector("#txtCantHijosFichaSocioeconomica").value == "") {
            showAlertTopEnd("warning", 'Por favor ingresa la cantidad de hijos que tienes');
            document.querySelector("#txtCantHijosFichaSocioeconomica").focus();
            return false;
        }
    }
    if (document.querySelector("#txtNombreColegioFichaSocioeconomica").value == "") {
        showAlertTopEnd("warning", 'Por favor ingrese el nombre de su colegio');
        document.querySelector("#txtNombreColegioFichaSocioeconomica").focus();
        return false;
    }
    if (document.querySelector("#slctAnioIngresoFichaSocioeconomica").value == "-1") {
        showAlertTopEnd("warning", 'Por favor seleccione su año de ingreso al a universidad');
        return false;
    }
    if (document.querySelector("#slctCicloEstudioFichaSocioeconomica").value == "-1") {
        showAlertTopEnd("warning", 'Por favor seleccione ciclo de estudios. Indique el ciclo del curoso de menor nivel');
        return false;
    }
    if (document.querySelector("#slctTipoCreditos").value == "-1") {
        showAlertTopEnd("warning", 'Por favor seleccione tipo de créditos');
        return false;
    }
    if (document.querySelector("#txtCanCreditosMatriculados").value == "") {
        showAlertTopEnd("warning", 'Por favor ingrese la cantidad de créditos matriculados');
        document.querySelector("#txtCanCreditosMatriculados").focus();
        return false;
    }
    if (parseInt(document.querySelector("#txtCanCreditosMatriculados").value) < 0) {
        showAlertTopEnd("warning", 'La cantidad de créditos matriculados debe ser mayor o igual a 0');
        document.querySelector("#txtCanCreditosMatriculados").focus();
        return false;
    }
    if (document.querySelector("#txtNumCursosDesaprobadosFichaSocieconomica").value == "") {
        showAlertTopEnd("warning", 'Por favor ingrese el número de cursos desaprobados. Considerar todo tu historial académico');
        document.querySelector("#txtNumCursosDesaprobadosFichaSocieconomica").focus();
        return false;
    }
    if (parseInt(document.querySelector("#txtNumCursosDesaprobadosFichaSocieconomica").value) < 0) {
        showAlertTopEnd("warning", 'La cantidad de cursos desaprobados debe ser mayor o igual a 0');
        document.querySelector("#txtNumCursosDesaprobadosFichaSocieconomica").focus();
        return false;
    }
    if (document.querySelector("#txtNumCursosAbandonadosFichaSocieconomica").value == "") {
        showAlertTopEnd("warning", 'Por favor ingrese el número de cursos abandonados. Considerar todo tu historial académico');
        document.querySelector("#txtNumCursosAbandonadosFichaSocieconomica").focus();
        return false;
    }
    if (parseInt(document.querySelector("#txtNumCursosAbandonadosFichaSocieconomica").value) < 0) {
        showAlertTopEnd("warning", 'La cantidad de cursos abandonados debe ser mayor o igual a 0');
        document.querySelector("#txtNumCursosAbandonadosFichaSocieconomica").focus();
        return false;
    }
    /*
     if (document.querySelector("#txtDomicilioPadreFichaSocieconomica").value == "") {
     showAlertTopEnd("warning", 'Por favor ingresa el domicilio de tu padre');
     document.querySelector("#txtDomicilioPadreFichaSocieconomica").focus();
     return false;
     }
     if (document.querySelector("#txtDomicilioMadreFichaSocieconomica").value == "") {
     showAlertTopEnd("warning", 'Por favor ingresa el domicilio de tu madre');
     document.querySelector("#txtDomicilioMadreFichaSocieconomica").focus();
     return false;
     }
     if (distritoPadreSelected == undefined) {
     showAlertTopEnd("warning", 'Por favor seleccione el distrito donde vive su padre');
     return false;
     }
     if (distritoMadreSelected == undefined) {
     showAlertTopEnd("warning", 'Por favor seleccione el distrito donde vive su madre');
     return false;
     }
     */
    if (document.querySelector("#txtRelacionPadresFichaSocieconomica").value == "-1") {
        showAlertTopEnd("warning", 'Por favor selecciona la relación de sus padres');
        return false;
    }
    if (document.querySelector("#slctConQuienViveFichaSocieconomica").value == "-1") {
        showAlertTopEnd("warning", 'Por favor selecciona con quién vive');
        return false;
    }
    if (document.querySelector("#slctConQuienViveFichaSocieconomica").value == "OTRO") {
        if (document.querySelector("#txtConQuienViveFichaSocieconomica").value == "") {
            showAlertTopEnd("warning", 'Por favor ingresa con quien vives');
            document.querySelector("#txtConQuienViveFichaSocieconomica").focus();
            return false;
        }
    }
    if (document.querySelector("#slctRelacionFamiliaresFichaSocieconomica").value == "-1") {
        showAlertTopEnd("warning", 'Por favor selecciona la relación que lleva con sus familiares');
        return false;
    }
    if (document.querySelector("#slctDependenciaEconomicaFichaSocioeconomica").value == "-1") {
        showAlertTopEnd("warning", 'Por favor selecciona la dependencia económica que tienes');
        return false;
    }
    if (document.querySelector("#slctApoyoRecibeFichaSocioeconomica").value == "-1") {
        showAlertTopEnd("warning", 'Por favor selecciona el tipo de apoyo que recibes');
        return false;
    }
    if (document.querySelector("#slctTrabajas").value == "-1") {
        showAlertTopEnd("warning", 'Por favor selecciona si trabajas');
        return false;
    }
    if (document.querySelector("#slctTrabajas").value == "SI") {
        if (document.querySelector("#txtActividadEconomicaDesempeniaFichaSocioeconomica").value == "") {
            showAlertTopEnd("warning", 'Por favor ingresa la actividad económica que desempeñas');
            document.querySelector("#txtActividadEconomicaDesempeniaFichaSocioeconomica").focus();
            return false;
        }
    }
    if (document.querySelector("#slctTenenciaVivienda").value == "-1") {
        showAlertTopEnd("warning", 'Por favor selecciona el tipo de tenencia de vivienda que tienes');
        return false;
    }
    if (document.querySelector("#slctTenenciaVivienda").value == "OTRO") {
        if (document.querySelector("#txtTenenciaViviendaFichaSocieconomica").value == "") {
            showAlertTopEnd("warning", 'Por favor ingresa el tipo de tenencia de vivienda que tienes');
            document.querySelector("#txtTenenciaViviendaFichaSocieconomica").focus();
            return false;
        }
    }
    if (document.querySelector("#slctTipoViviendaFichaSocioeconomica").value == "-1") {
        showAlertTopEnd("warning", 'Por favor selecciona el tipo de vivienda que tienes');
        return false;
    }
    if (document.querySelector("#slctMaterialVivienda").value == "-1") {
        showAlertTopEnd("warning", 'Por favor selecciona el material de construacción de tu vivienda');
        return false;
    }
    if (document.querySelector("#slctMaterialVivienda").value == "OTRO") {
        if (document.querySelector("#txtMaterialViviendaFichaSocioeconomica").value == "") {
            showAlertTopEnd("warning", 'Por favor ingresa el material de construacción de tu vivienda');
            document.querySelector("#txtMaterialViviendaFichaSocioeconomica").focus();
            return false;
        }
    }
    if (document.querySelector("#slctEstadoConstruccionFichaSocioeconomica").value == "-1") {
        showAlertTopEnd("warning", 'Por favor selecciona el estado de construcción de tu vivienda');
        return false;
    }
    if (document.querySelector("#slctServicioInternetFichaSocioeconomica").value == "-1") {
        showAlertTopEnd("warning", 'Por favor selecciona si tienes internet o no en tu vivienda');
        return false;
    }
    if (document.querySelector("#slctTieneLaptopFichaSocioeconomica").value == "") {
        showAlertTopEnd("warning", 'Por favor selecciona si tienes internet o no en tu vivienda');
        return false;
    }
    if (document.querySelector("#slctCelPlanDatosFichaSocioeconomica").value == "-1") {
        showAlertTopEnd("warning", 'Por favor selecciona si tienes un celular con plan de datos(MB)');
        return false;
    }
    if (document.querySelector("#slctTipoSeguroFichaSocioeconomica").value == "-1") {
        showAlertTopEnd("warning", 'Por favor selecciona el tipo de seguro que tienes');
        return false;
    }
    if (document.querySelector("#slctTipoSeguroFichaSocioeconomica").value == "OTRO") {
        if (document.querySelector("#txtTipoSeguroFichaSocioeconomica").value == "") {
            showAlertTopEnd("warning", 'Por favor ingresa tu tipo de seguro');
            document.querySelector("#txtTipoSeguroFichaSocioeconomica").focus();
            return false;
        }
    }
    if (document.querySelector("#slctPresentaDiscapacidad").value == "-1") {
        showAlertTopEnd("warning", 'Por favor selecciona si presentas una discapacidad o no');
        return false;
    }
    if (document.querySelector("#slctPresentaDiscapacidad").value == "OTRO") {
        if (document.querySelector("#txtDiscapacidadFichaSocioeconomica").value == "") {
            showAlertTopEnd("warning", 'Por favor ingresa tu discapacidad');
            document.querySelector("#txtDiscapacidadFichaSocioeconomica").focus();
            return false;
        }
    }
    return true;
}