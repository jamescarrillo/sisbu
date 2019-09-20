var beanPaginationAlternativa;
var alternativaSelected;
var beanRequestAlternativa = new BeanRequest();

document.addEventListener("DOMContentLoaded", function () {

    //INICIALIZANDO VARIABLES DE SOLICITUD
    beanRequestAlternativa.entity_api = "api/alternativas";
    beanRequestAlternativa.operation = "paginate";
    beanRequestAlternativa.type_request = "GET";

    $('#FrmAlternativa').submit(function (event) {
        beanRequestAlternativa.operation = "paginate";
        beanRequestAlternativa.type_request = "GET";
        $('#modalCargandoAlternativa').modal('show');
        event.preventDefault();
        event.stopPropagation();
    });

    $('#FrmAlternativaModal').submit(function (event) {
        try {
            if (validateFormAlternativa()) {
                $('#modalCargandoAlternativa').modal('show');
            }
        } catch (e) {
            console.log(e);
        }
        event.preventDefault();
        event.stopPropagation();
    });

    document.querySelector("#btnOpenNewAlternativa").onclick = function () {
        //CONFIGURAMOS LA SOLICITUD
        beanRequestAlternativa.operation = "add";
        beanRequestAlternativa.type_request = "POST";
        //LIMPIAR LOS CAMPOS
        clearAlternativa();
        document.querySelector("#txtTituloModalManAlternativa").innerHTML = "Registrar Alternativa";
        $('#ventanaModalManAlternativa').modal('show');
        document.querySelector("#txtDescripcionAlternativa").focus();
    };

    $("#modalCargandoAlternativa").on('shown.bs.modal', function () {
        processAjaxAlternativa();
    });

    $("#ventanaModalAlternativa").on('shown.bs.modal', function () {
        $('#modalCargandoAlternativa').modal('show');
    });

    $("#ventanaModalAlternativa").on('hidden.bs.modal', function () {
        beanRequestAlternativa.operation = "paginate";
        beanRequestAlternativa.type_request = "GET";
    });

    $("#sizePageAlternativa").change(function () {
        $('#modalCargandoAlternativa').modal('show');
    });

    document.querySelector("#btn-selecionar-area-psi").onclick = function () {
        if (alternativaSelected.idalternativa != 0) {
            setAlternativaSelectedSubAlternativa();
        } else {
            showAlertTopEnd('warning', 'Por favor seleccione una area');
        }
    };

});

function processAjaxAlternativa() {
    let parameters_pagination = "";
    let json = "";
    let url_request = getHostAPI() + beanRequestAlternativa.entity_api + "/" + beanRequestAlternativa.operation;
    switch (beanRequestAlternativa.operation) {
        case "add":
            json = {
                "idalternativa": 0,
                "descripcion": document.querySelector("#txtDescripcionAlternativa").value,
                "valor": document.querySelector("#txtValorAlternativa").value,
                "pregunta": preguntaSelected
            };
            break;
        case "update":
            json = {
                "idalternativa": alternativaSelected.idalternativa,
                "descripcion": document.querySelector("#txtDescripcionAlternativa").value,
                "valor": document.querySelector("#txtValorAlternativa").value,
                "pregunta": preguntaSelected
            };
            break;
        case "delete":
            url_request += "/" + alternativaSelected.idalternativa;
            break;
        default:
            parameters_pagination += "?filter=" + document.querySelector("#txtFilterAlternativa").value.toUpperCase();
            parameters_pagination += "&idpregunta=" + preguntaSelected.idpregunta;
            parameters_pagination += "&page=" + document.querySelector("#pageAlternativa").value;
            parameters_pagination += "&size=" + document.querySelector("#sizePageAlternativa").value;
            url_request += parameters_pagination;
            break;
    }
    $.ajax({
        url: url_request,
        type: beanRequestAlternativa.type_request,
        headers: {
            'Authorization': 'Bearer ' + Cookies.get("sisbu_token")
        },
        data: JSON.stringify(json),
        contentType: 'application/json; charset=utf-8',
        dataType: 'json'
    }).done(function (beanCrudResponse) {
        $('#modalCargandoAlternativa').modal("hide");
        if (beanCrudResponse.messageServer !== undefined) {
            if (beanCrudResponse.messageServer.toLowerCase() == "ok") {
                showAlertTopEnd('success', 'Acción realizada exitosamente');
                $('#ventanaModalManAlternativa').modal('hide');
                $('#FrmAlternativa').submit();
            } else {
                showAlertTopEnd('warning', beanCrudResponse.messageServer);
            }
        }
        if (beanCrudResponse.beanPagination !== undefined) {
            beanPaginationAlternativa = beanCrudResponse.beanPagination;
            toListAlternativa(beanPaginationAlternativa);
        }
    }).fail(function (jqXHR, textStatus, errorThrown) {
        $('#ventanaModalManAlternativa').modal("hide");
        showAlertErrorRequest();

    });
}

function toListAlternativa(beanPagination) {
    document.querySelector("#tbodyAlternativa").innerHTML = "";
    document.querySelector("#titleManagerAlternativa").innerHTML = "[ " + beanPagination.count_filter + " ] ALTERNATIVA";
    if (beanPagination.count_filter > 0) {
        let row;
        beanPagination.list.forEach(alternativa => {
            row = "<tr class='click-selection-area sisbu-cursor-mano' idalternativa='" + alternativa.idalternativa + "'>";
            row += "<td class='align-middle'>" + alternativa.descripcion + "</td>";
            row +=
                    `
                <td>
                    <ul class="dt-list dt-list-cm-0">
                        <li class="dt-list__item">
                            <a idalternativa='${alternativa.idalternativa}' class="text-light-gray editar-alternativa" href="javascript:void(0)">
                                <i class="icon icon-editors "></i>
                            </a>
                        </li>
                        <li class="dt-list__item">
                            <a idalternativa='${alternativa.idalternativa}' class="text-light-gray eliminar-alternativa" href="javascript:void(0)">
                                <i class="icon icon-trash-filled"></i>
                            </a>
                        </li>
                    </ul>
                </td>
            `;
            row += "</tr>";
            document.querySelector("#tbodyAlternativa").innerHTML += row;
        });
        buildPagination(
                beanPagination.count_filter,
                parseInt(document.querySelector("#sizePageAlternativa").value),
                document.querySelector("#pageAlternativa"),
                $('#modalCargandoAlternativa'),
                $('#paginationAlternativa'));
        addEventsAlternativaes();
        if (beanRequestAlternativa.operation == "paginate") {
            document.querySelector("#txtFilterAlternativa").focus();
        }
        $('[data-toggle="tooltip"]').tooltip();
    } else {
        destroyPagination($('#paginationAlternativa'));
        showAlertTopEnd('warning', 'No se encontraron resultados');
        document.querySelector("#txtFilterAlternativa").focus();
    }
}

function addEventsAlternativaes() {
    document.querySelectorAll('.editar-alternativa').forEach(btn => {
        //AGREGANDO EVENTO CLICK
        btn.onclick = function () {
            alternativaSelected = findByAlternativa(btn.getAttribute('idalternativa'));
            if (alternativaSelected != undefined) {
                beanRequestAlternativa.operation = "update";
                beanRequestAlternativa.type_request = "PUT";
                openAlternativa();
            } else {
                showAlertTopEnd('warning', 'No se encontró el registro para poder editar');
            }
        };
    });
    document.querySelectorAll('.eliminar-alternativa').forEach(btn => {
        //AGREGANDO EVENTO CLICK
        btn.onclick = function () {
            alternativaSelected = findByAlternativa(btn.getAttribute('idalternativa'));
            if (alternativaSelected != undefined) {
                beanRequestAlternativa.operation = "delete";
                beanRequestAlternativa.type_request = "DELETE";
                //MODAL ELIMINAR
                showAlertDelete('modalCargandoAlternativa')
            }
        };
    });
    /*
     document.querySelectorAll('.click-selection-area').forEach(function (element) {
     element.onclick = function () {
     if (this.classList.contains('row-selected-celeste-claro')) {
     this.classList.remove('row-selected-celeste-claro');
     alternativaSelected = new Alternativa();
     } else {
     alternativaSelected = findByAlternativa(this.getAttribute('idalternativa'));
     this.parentElement.childNodes.forEach(function (element) {
     element.classList.remove('row-selected-celeste-claro');
     });
     this.classList.add('row-selected-celeste-claro');
     }
     }
     });
     */
}

function findByAlternativa(idalternativa) {
    let alternativa_;
    beanPaginationAlternativa.list.forEach(alternativa => {
        if (idalternativa == alternativa.idalternativa) {
            alternativa_ = alternativa;
            return;
        }
    });
    return alternativa_;
}

function validateFormAlternativa() {
    if (document.querySelector("#txtDescripcionAlternativa").value == "") {
        showAlertTopEnd('warning', 'Por favor ingrese descripción');
        document.querySelector("#txtDescripcionAlternativa").focus();
        return false;
    }
    if (document.querySelector("#txtValorAlternativa").value == "") {
        showAlertTopEnd('warning', 'Por favor ingrese valor numérico');
        document.querySelector("#txtValorAlternativa").focus();
        return false;
    }
    if (parseInt(document.querySelector("#txtValorAlternativa").value) < 0) {
        showAlertTopEnd('warning', 'Por favor ingrese valor numérico > 0');
        document.querySelector("#txtValorAlternativa").focus();
        return false;
    }
    return true;
}

function clearAlternativa() {
    document.querySelector("#txtDescripcionAlternativa").value = "";
    document.querySelector("#txtValorAlternativa").value = "";
}

function openAlternativa() {
    document.querySelector("#txtDescripcionAlternativa").value = alternativaSelected.descripcion;
    document.querySelector("#txtValorAlternativa").value = alternativaSelected.valor;
    document.querySelector("#txtTituloModalManAlternativa").innerHTML = "Editar Alternativa";
    $('#ventanaModalManAlternativa').modal('show');
    document.querySelector("#txtDescripcionAlternativa").focus();
}