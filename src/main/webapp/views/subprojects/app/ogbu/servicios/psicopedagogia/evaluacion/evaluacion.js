/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


var beanRequestEvaluacion = new BeanRequest();
var beanPaginationEvaluacion;
var evaluacionSelected;

document.addEventListener("DOMContentLoaded", function () {

    //INICIALIZANDO VARIABLES DE SOLICITUD
    inicializarEvaluaciones();

    //INICIALIZACION DE SUMMENOTE
    $('#txtInstrucciones').summernote({
        placeholder: 'Ingrese Instrucciones. . .',
        tabsize: 2,
        height: 250,
        lang: 'es-ES'
    });

    //OCULTAMOS COMPONENTES
    document.querySelector("#row-evaluaciones").style.display = "none";
    document.querySelector("#row-configurations").style.display = "none";

    document.querySelector("#btnIrRepositorio").onclick = function () {
        navigateHome("repositorio");
    };

    document.querySelector("#btnIrConfiguraciones").onclick = function () {
        navigateHome("configuraciones");
    };

    document.querySelector("#btn-regresar-principal").onclick = function () {
        navigateHome("home");
    };

    document.querySelector("#btnOpenNewEvaluacion").onclick = function () {
        beanRequestEvaluacion.operation = "add";
        beanRequestEvaluacion.type_request = "POST";
        clearEvaluacion();
        navigateEvaluaciones("crud");
    };

    document.querySelector("#btnCancelarCrudEvaluacion").onclick = function () {
        inicializarEvaluaciones();
        navigateEvaluaciones("home");
    };

    document.querySelector("#txtUsaAlternativasGlobalesRU").onchange = function () {
        if (this.value == "1") {
            document.querySelector("#tbodyAlternativasGlobales").innerHTML = "";
            list_alternativas_globales = [];
            document.querySelector("#div-alternativas-globales").style.display = "block";
        } else {
            document.querySelector("#tbodyAlternativasGlobales").innerHTML = "";
            list_alternativas_globales = [];
            document.querySelector("#div-alternativas-globales").style.display = "none";
        }
    }

    $('#FrmEvaluacion').submit(function (event) {
        beanRequestEvaluacion.operation = "paginate";
        beanRequestEvaluacion.type_request = "GET";
        $('#modalCargandoEvaluacion').modal('show');
        event.preventDefault();
        event.stopPropagation();
    });

    document.querySelector('#btnGuardarEvaluacion').onclick = function () {
        if (validateFormEvaluacion()) {
            $('#modalCargandoEvaluacion').modal('show');
        }
    };

    $("#sizePageEvaluacion").change(function () {
        $('#modalCargandoEvaluacion').modal('show');
    });

    $("#modalCargandoEvaluacion").on('shown.bs.modal', function () {
        processAjaxEvaluacion();
    });

});

function navigateHome(ir) {
    switch (ir) {
        case "repositorio":
            document.querySelector("#row-text-selected-option").style.display = "none";
            document.querySelector("#row-options-selected").style.display = "none";
            document.querySelector("#row-navigation-options").style.display = "flex";

            document.querySelector("#row-evaluaciones").style.display = "flex";
            document.querySelector("#row-configurations").style.display = "none";

            $("#modalCargandoEvaluacion").modal('show');
            break;
        case "configuraciones":
            document.querySelector("#row-text-selected-option").style.display = "none";
            document.querySelector("#row-options-selected").style.display = "none";
            document.querySelector("#row-navigation-options").style.display = "flex";

            document.querySelector("#row-evaluaciones").style.display = "none";
            document.querySelector("#row-configurations").style.display = "flex";
            break;
        default:
            //MENU PRINCIPAL
            document.querySelector("#row-text-selected-option").style.display = "flex";
            document.querySelector("#row-options-selected").style.display = "flex";
            document.querySelector("#row-navigation-options").style.display = "none";

            document.querySelector("#row-evaluaciones").style.display = "none";
            document.querySelector("#row-configurations").style.display = "none";
            break;
    }
}

function navigateEvaluaciones(ir) {
    switch (ir) {
        case "crud":
            document.querySelector("#row-text-selected-option").style.display = "none";
            document.querySelector("#row-options-selected").style.display = "none";
            document.querySelector("#row-navigation-options").style.display = "none";

            document.querySelector("#row-evaluaciones").style.display = "none";
            document.querySelector("#row-configurations").style.display = "none";

            document.querySelector("#row-crud-evaluaciones").style.display = "flex";
            break;
        default:
            document.querySelector("#row-text-selected-option").style.display = "none";
            document.querySelector("#row-options-selected").style.display = "none";
            document.querySelector("#row-navigation-options").style.display = "flex";

            document.querySelector("#row-evaluaciones").style.display = "flex";
            document.querySelector("#row-configurations").style.display = "none";
            document.querySelector("#row-crud-evaluaciones").style.display = "none";
            break;
    }
}

function clearEvaluacion() {
    document.querySelector("#txtDescripcionRU").value = ""
    document.querySelector("#txtTipoRU").value = "-1"
    document.querySelector("#txtComentarioRU").value = ""
    document.querySelector("#txtEstadoRU").value = "-1"
    document.querySelector("#txtUsaAlternativasGlobalesRU").value = "-1"
    document.querySelector("#txtUsaAlternativasGlobalesRU").dispatchEvent(new Event('change'));
    $('#txtInstrucciones').summernote('code', "");
    document.querySelector("#titleCrudEvaluaciones").innerHTML = "REGISTRO DE EVALUACIÓN";
    setTimeout(() => {
        document.querySelector("#txtDescripcionRU").focus();
    }, 500);
}

function validateFormEvaluacion() {
    if (document.querySelector("#txtDescripcionRU").value == "") {
        showAlertTopEnd('warning', 'Por favor ingrese un nombre');
        return false;
    }
    if (document.querySelector("#txtTipoRU").value == "-1") {
        showAlertTopEnd('warning', 'Por favor seleccione un tipo');
        return false;
    }
    if (document.querySelector("#txtEstadoRU").value == "-1") {
        showAlertTopEnd('warning', 'Por favor seleccione un estado');
        return false;
    }
    if (document.querySelector("#txtUsaAlternativasGlobalesRU").value == "-1") {
        if (list_alternativas_globales.length == 0) {
            showAlertTopEnd('warning', 'Por favor ingrese al menos una alternativa global');
            return false;
        }
    }
    return true;
}

function inicializarEvaluaciones() {
    beanRequestEvaluacion.entity_api = "api/procedimientos";
    beanRequestEvaluacion.operation = "paginate";
    beanRequestEvaluacion.type_request = "GET";
}

function processAjaxEvaluacion() {
    let parameters_pagination = "";
    let json = "";
    if (beanRequestEvaluacion.operation == "paginate") {
        parameters_pagination += "?filter=" + document.querySelector("#txtFilterEvaluacion").value.toUpperCase();
        parameters_pagination += "&idarea=" + getIdAreaUserSession();
        parameters_pagination += "&page=" + document.querySelector("#pageEvaluacion").value;
        parameters_pagination += "&size=" + document.querySelector("#sizePageEvaluacion").value;

    } else {
        json = {
            "descripcion": document.querySelector("#txtDescripcionRU").value,
            "tipo": document.querySelector("#txtTipoRU").value,
            "comentario": document.querySelector("#txtComentarioRU").value,
            "estado": document.querySelector("#txtEstadoRU").value,
            "usa_alternativas_globales": document.querySelector("#txtUsaAlternativasGlobalesRU").value,
            "alternativas_globales": getStringAlternativasGlobales(),
            "instrucciones": $('#txtInstrucciones').summernote('code'),
            "num_preguntas": "0",
            "area": {
                "idarea": getIdAreaUserSession()
            }
        }
        if (beanRequestEvaluacion.operation == "update") {
            json.idprocedimiento = evaluacionSelected.idprocedimiento;
        }
    }
    $.ajax({
        url: getHostAPI() + beanRequestEvaluacion.entity_api + "/" + beanRequestEvaluacion.operation + parameters_pagination,
        type: beanRequestEvaluacion.type_request,
        headers: {
            'Authorization': 'Bearer ' + Cookies.get("sisbu_token")
        },
        data: JSON.stringify(json),
        contentType: 'application/json; charset=utf-8',
        dataType: 'json'
    }).done(function (beanCrudResponse) {
        $('#modalCargandoEvaluacion').modal("hide");
        if (beanCrudResponse.messageServer !== undefined) {
            if (beanCrudResponse.messageServer.toLowerCase() == "ok") {
                showAlertTopEnd('success', 'Acción realizada exitosamente');
                document.querySelector("#btnCancelarCrudEvaluacion").dispatchEvent(new Event('click'));
                setTimeout(() => {
                    $("#FrmEvaluacion").submit();
                }, 500);
            } else {
                showAlertTopEnd('warning', beanCrudResponse.messageServer);
            }
        }
        if (beanCrudResponse.beanPagination !== undefined) {
            beanPaginationEvaluacion = beanCrudResponse.beanPagination;
            toListEvaluacion(beanPaginationEvaluacion);
        }
    }).fail(function (jqXHR, textStatus, errorThrown) {
        $('#modalCargandoEvaluacion').modal("hide");
        showAlertErrorRequest();

    });
}

function toListEvaluacion(beanPagination) {
    document.querySelector("#div-container-evaluaciones").innerHTML = "";
    document.querySelector("#titleManagerEvaluacion").innerHTML = "[ " + beanPagination.count_filter + " ] EVALUACIONES";
    if (beanPagination.count_filter > 0) {
        let div;
        beanPagination.list.forEach(evaluacion => {
            div =
                    `
                <div class="dt-widget__item ${evaluacion.estado == "V" ? "border-success" : "border-danger" }">
                    <!-- Widget Info -->
                    <div class="dt-widget__info text-truncate">
                        <div class="dt-widget__title f-16 font-weight-500 text-truncate">
                            ${evaluacion.descripcion}
                        </div>
                        <p class="mb-0 text-truncate ${evaluacion.usa_alternativas_globales == 1 ? "text-primary" : "text-light-gray"}">
                            ${evaluacion.usa_alternativas_globales == 1 ? "Usa Alternativas Globales" : "No Usa Alternativas Globales"}
                        </p>
                    </div>
                    <!-- /widget info -->
                    <!-- Widget Extra -->
                    <div class="dt-widget__extra text-right">
                        <!-- Show Content -->
                        <div class="show-content">
                            <span class="d-block text-dark">${evaluacion.num_preguntas == undefined ? "Sin" : evaluacion.num_preguntas}</span>
                            <span class="d-block">Preguntas</span>
                        </div>
                        <!-- /show content -->
                        <!-- Hide Content -->
                        <div class="hide-content">
                            <!-- Action Button Group -->
                            <div class="action-btn-group">
                                <button class="btn btn-default text-success dt-fab-btn btn-editar-evaluacion" idprocedimiento='${evaluacion.idprocedimiento}' title="Editar Evaluación" data-toggle="tooltip">
                                    <i class="icon icon-editors icon-1x"></i>
                                </button>
                                <button class="btn btn-default text-danger dt-fab-btn btn-editar-preguntas" idprocedimiento='${evaluacion.idprocedimiento}' title="Editar Preguntas" data-toggle="tooltip">
                                    <i class="icon icon-assignment icon-xl"></i>
                                </button>
                            </div>
                            <!-- /action button group -->
                        </div>
                        <!-- /hide content -->
                    </div>
                    <!-- /widget extra -->

                </div>
            `;
            document.querySelector("#div-container-evaluaciones").innerHTML += div;
        });
        buildPagination(
                beanPagination.count_filter,
                parseInt(document.querySelector("#sizePageEvaluacion").value),
                document.querySelector("#pageEvaluacion"),
                $('#modalCargandoEvaluacion'),
                $('#paginationEvaluacion'));
        addEventsEvaluaciones();
        if (beanRequestEvaluacion.operation == "paginate") {
            document.querySelector("#txtFilterEvaluacion").focus();
        }
        $('[data-toggle="tooltip"]').tooltip();
    } else {
        destroyPagination($('#paginationEvaluacion'));
        showAlertTopEnd('warning', 'No se encontraron resultados');
        document.querySelector("#txtFilterEvaluacion").focus();
    }
}

function addEventsEvaluaciones() {
    document.querySelectorAll(".btn-editar-evaluacion").forEach(btn => {
        btn.onclick = function () {
            evaluacionSelected = getEvaluacionForId(this.getAttribute('idprocedimiento'));
            if (evaluacionSelected != undefined) {
                openEvaluacion();
            } else {
                showAlertTopEnd('warnign', 'No se encontró el registro para editar');
            }
        };
    });

    document.querySelectorAll(".btn-editar-preguntas").forEach(btn => {
        btn.onclick = function () {
            evaluacionSelected = getEvaluacionForId(this.getAttribute('idprocedimiento'));
            if (evaluacionSelected != undefined) {
                document.querySelector("#titleNameEvaluacionInPreguntas").innerHTML = evaluacionSelected.descripcion;
                navigatePreguntas('home');
            } else {
                showAlertTopEnd('warnign', 'No se encontró el registro para editar');
            }
        };
    });
}

function openEvaluacion() {
    beanRequestEvaluacion.operation = "update";
    beanRequestEvaluacion.type_request = "PUT";
    document.querySelector("#txtDescripcionRU").value = evaluacionSelected.descripcion;
    document.querySelector("#txtTipoRU").value = evaluacionSelected.tipo;
    document.querySelector("#txtComentarioRU").value = evaluacionSelected.comentario;
    document.querySelector("#txtEstadoRU").value = evaluacionSelected.estado == null ? "-1" : evaluacionSelected.estado;
    document.querySelector("#txtUsaAlternativasGlobalesRU").value = evaluacionSelected.usa_alternativas_globales == null ? "-1" : evaluacionSelected.usa_alternativas_globales;
    if (document.querySelector("#txtUsaAlternativasGlobalesRU").value == "1") {
        //cargamos la lista de alternativas globales
        if (evaluacionSelected.alternativas_globales != null) {
            let list_temp = evaluacionSelected.alternativas_globales.split('::');
            list_alternativas_globales = [];
            list_temp.forEach(temp_ => {
                let temp = temp_.split(":");
                let alternativa_ = new Alternativa();
                alternativa_.descripcion = temp[0];
                alternativa_.valor = temp[1];
                list_alternativas_globales.push(alternativa_);
            });
            toListAlternativasGlobales();
        }
    }
    $('#txtInstrucciones').summernote('code', evaluacionSelected.instrucciones == null ? "" : evaluacionSelected.instrucciones);
    document.querySelector("#titleCrudEvaluaciones").innerHTML = "EDICIÓN DE EVALUACIÓN";
    navigateEvaluaciones("crud");
}

function getEvaluacionForId(idprocedimiento) {
    let eva_ = -1;
    beanPaginationEvaluacion.list.forEach(function (evaluacion, index) {
        if (evaluacion.idprocedimiento == idprocedimiento) {
            eva_ = evaluacion;
            return;
        }
    });
    return eva_;
}