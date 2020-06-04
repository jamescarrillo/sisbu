var beanPaginationCita;
var citaSelected;
var beanRequestCita = new BeanRequest();

/*
 var areaSelected;
 var atendidoSelected;
 var personalSelected;
 */

let fecha_solicitud;

document.addEventListener("DOMContentLoaded", function () {

    //INICIALIZANDO VARIABLES DE SOLICITUD
    beanRequestCita.entity_api = "api/citas";
    beanRequestCita.operation = "servicio/paginate";
    beanRequestCita.type_request = "GET";

    document.querySelector("#pageCita").value = 1;

    $('#txtFechaIFilterCita').bootstrapMaterialDatePicker({
        weekStart: 0,
        time: false,
        format: 'DD/MM/YYYY',
        lang: 'es'
    }).on('change', function (e, date) {
        $('#txtFechaFFilterCita').bootstrapMaterialDatePicker('setMinDate', date);
    });

    $('#txtFechaFFilterCita').bootstrapMaterialDatePicker({
        weekStart: 0,
        time: false,
        format: 'DD/MM/YYYY',
        lang: 'es'
    }).on('change', function (e, date) {
        document.querySelector('#FrmCita').dispatchEvent(new Event('submit'));
    });

    document.querySelector('#btnEliminarFechaIFilterCita').onclick = function () {
        document.querySelector('#txtFechaIFilterCita').value = '';
    };

    document.querySelector('#btnEliminarFechaFFilterCita').onclick = function () {
        document.querySelector('#txtFechaFFilterCita').value = '';
    };

    let current_date = new Date();
    $('#txtFechaIFilterCita').val(getDateJava(current_date));
    $('#txtFechaFFilterCita').val(getDateJava(addDays(current_date, 30)));

    $('#FrmCita').submit(function (event) {
        if (document.querySelector('#txtFechaIFilterCita').value == "" && document.querySelector('#txtFechaFFilterCita').value == "") {
            beanRequestCita.operation = "servicio/paginate";
            beanRequestCita.type_request = "GET";
            $('#modalCargandoCita').modal('show');
        } else {
            if (document.querySelector('#txtFechaIFilterCita').value != "" && document.querySelector('#txtFechaFFilterCita').value != "") {
                beanRequestCita.operation = "servicio/paginate";
                beanRequestCita.type_request = "GET";
                $('#modalCargandoCita').modal('show');
            } else {
                showAlertTopEnd('warning', 'Por favor ingrese las fechas correctamente para aplicar el filtro');
            }
        }
        event.preventDefault();
        event.stopPropagation();
    });

    $("#modalCargandoCita").on('shown.bs.modal', function () {
        processAjaxCita();
    });

    $("#modalCargandoCita").on('hide.bs.modal', function () {
        beanRequestCita.operation = "servicio/paginate";
        beanRequestCita.type_request = "GET";
    });

    $('#modalCargandoCita').modal('show');

    $("#sizePageCita").change(function () {
        $('#modalCargandoCita').modal('show');
    });

    $("#txtTypeRequestCita").change(function () {
        $('#modalCargandoCita').modal('show');
    });

});

function processAjaxCita() {
    let parameters_pagination = "";
    let json = "";
    if (beanRequestCita.operation == "servicio/paginate") {

        parameters_pagination += "?type_service=6&type_request=" + document.querySelector("#txtTypeRequestCita").value.toLowerCase();
        parameters_pagination += "&filter=" + document.querySelector("#txtFilterCita").value.toLowerCase();
        parameters_pagination += "&fechai=" + document.querySelector("#txtFechaIFilterCita").value.toLowerCase();
        parameters_pagination += "&fechaf=" + document.querySelector("#txtFechaFFilterCita").value.toLowerCase();
        parameters_pagination += "&page=" + document.querySelector("#pageCita").value;
        parameters_pagination += "&size=" + document.querySelector("#sizePageCita").value;
    } else {
        parameters_pagination = "";

        if (beanRequestCita.operation == "update") {
            citaSelected.estado_cita = "ATE";
            citaSelected.fecha_atendida = getTimesTampJavaScriptCurrent();
            json = citaSelected;
        }


    }
    $.ajax({
        url: getHostAPI() + beanRequestCita.entity_api + "/" + beanRequestCita.operation + parameters_pagination,
        type: beanRequestCita.type_request,
        headers: {
            'Authorization': 'Bearer ' + Cookies.get("sisbu_token")
        },
        data: JSON.stringify(json),
        contentType: 'application/json; charset=utf-8',
        dataType: 'json'
    }).done(function (beanCrudResponse) {
        $('#modalCargandoCita').modal("hide");
        if (beanCrudResponse.messageServer !== undefined) {
            if (beanCrudResponse.messageServer.toLowerCase() == "ok") {
                showAlertTopEnd('success', 'Acción realizada exitosamente');
                $('#ventanaModalCita').modal('hide');
                setTimeout(() => {
                    document.querySelector('#FrmCita').dispatchEvent(new Event('submit'));
                }, 1000);
            } else {
                showAlertTopEnd('warning', beanCrudResponse.messageServer);
            }
        }
        if (beanCrudResponse.beanPagination !== undefined) {
            beanPaginationCita = beanCrudResponse.beanPagination;
            toListCita(beanPaginationCita);
        }
    }).fail(function (jqXHR, textStatus, errorThrown) {
        $('#modalCargandoCita').modal("hide");
        showAlertErrorRequest();

    });
}

function toListCita(beanPagination) {
    document.querySelector("#tbodyCita").innerHTML = "";
    document.querySelector("#titleManagerCita").innerHTML = "[ " + beanPagination.count_filter + " ] CITAS";
    let row;
    row =
        `
               <div class="dt-widget__item border-success bg-primary text-white mb-0 pr-3 pl-3">
                    <!-- Widget Info -->
                    <div class="dt-widget__info text-truncate " style="max-width: 105px;">
                        <p class="mb-0 text-truncate ">
                           DNI
                        </p>
                    </div>
                    <!-- /widget info -->
                    <!-- Widget Info -->
                    <div class="dt-widget__info text-truncate " style="max-width: 150px;">
                        <p class="mb-0 text-truncate ">
                           PACIENTE
                        </p>
                    </div>
                    <!-- /widget info -->
                    <!-- Widget Info -->
                    <div class="dt-widget__info">
                        <p class="mb-0 ">
                           ESCUELA PROFESIONAL
                        </p>
                    </div>
                    <!-- /widget info -->
                    
                    <!-- Widget Info -->
                    <div class="dt-widget__info text-truncate "style="max-width: 170px;" >
                        <p class="mb-0 text-truncate ">
                        PERSONAL ASIGNADO
                        </p>
                    </div>
                    <!-- /widget info -->
                    <!-- Widget Info -->
                    <div class="dt-widget__info text-truncate " >
                        <p class="mb-0 text-truncate ">
                           MOTIVO
                        </p>
                    </div>
                    <!-- /widget info -->
                    <!-- Widget Info -->
                    <div class="dt-widget__info text-truncate "style="max-width: 115px;" >
                        <p class="mb-0 text-truncate ">
                           PROGRAMADO
                        </p>
                    </div>
                    <!-- /widget info -->
                    <!-- Widget Info -->
                    <div class="dt-widget__info text-truncate text-center"style="max-width: 115px;" >
                        <p class="mb-0 text-truncate ">
                           ATENDIDO
                        </p>
                    </div>
                    <!-- /widget info -->
                </div>
                
            `;
    if (beanPagination.count_filter == 0) {
        destroyPagination($('#paginationCita'));
        row +=
            `
            <div class="dt-widget__item">
                <!-- Widget Info -->
                <div class="dt-widget__info text-center" >
                    <p class="mb-0 text-truncate ">No hay Citas
                    </p>
                </div>
                <!-- /widget info -->
            </div>
            `;
        document.querySelector("#tbodyCita").innerHTML += row;
        showAlertTopEnd('warning', 'No se encontraron resultados');
        return;
    }


    document.querySelector("#tbodyCita").innerHTML += row;
    beanPagination.list.forEach(cita => {
        row =
            `
                 <div class="dt-widget__item border-bottom m-0 pt-2 pb-2 pr-3 pl-3">
                    <!-- Widget Info -->
                    <div class="dt-widget__info text-truncate " style="max-width: 105px;">
                        <p class="mb-0 text-truncate ">${cita.atendido.dni.trim()}
                        </p>
                    </div>
                    <!-- /widget info -->
                    <!-- Widget Info -->
                    <div class="dt-widget__info" style="max-width: 150px;">
                        <p class="mb-0 ">${cita.atendido.nombre.toUpperCase()}
                        </p>
                        <p class="mb-0 ">${cita.atendido.apellido_pat.toUpperCase() + " " + cita.atendido.apellido_mat.toUpperCase()}
                        </p>
                    </div>
                    <!-- /widget info -->
                    <!-- Widget Info -->
                    <div class="dt-widget__info">
                        <p class="mb-0 ">${cita.atendido.escuela.nombre} <br> ${cita.atendido.celular}
                        </p>
                    </div>
                    <!-- /widget info -->
                   
                    <!-- Widget Info -->
                    <div class="dt-widget__info " style="max-width: 170px;">
                    <p class="mb-0 ">${cita.personal.nombre.toUpperCase()}
                    </p>
                    <p class="mb-0 ">${cita.personal.apellido_pat.toUpperCase() + " " + cita.personal.apellido_mat.toUpperCase()}
                    </p>
                    </div>
                    <!-- /widget info -->
                    <!-- Widget Info -->
                    <div class="dt-widget__info" >
                        <p class="mb-0 ">${cita.motivo}
                        </p>
                    </div>
                    <!-- /widget info -->
                    <!-- Widget Info -->
                    <div class="dt-widget__info text-truncate " style="max-width: 115px;">
                        <p class="mb-0 text-truncate ">${cita.fecha_programada.split(" ")[0]}
                        </p>
                        <p class="mb-0 text-truncate">${cita.fecha_programada.split(" ")[1]}
                        </p>
                    </div>
                    <!-- /widget info -->
                    <!-- Widget Info -->
                    <div class="dt-widget__info text-truncate text-center" style="max-width: 115px;">`;
        if (cita.fecha_atendida == undefined) {
            row += `  <button class="btn btn-sm btn-danger editar-cita p-1" idcita='${cita.idcita}' title="Editar" data-toggle="tooltip">Pendiente
            </button>`;
        } else {
            row += `<p class="mb-0 text-truncate ">${cita.fecha_atendida.split(" ")[0]}</p>
            <p class="mb-0 text-truncate ">${cita.fecha_atendida.split(" ")[1]}</p>`;
        }




        row += `</div>
                    <!-- /widget info -->
                   
                </div>
            `;
        document.querySelector("#tbodyCita").innerHTML += row;
        $('[data-toggle="tooltip"]').tooltip();
    });
    buildPagination(
        beanPagination.count_filter,
        parseInt(document.querySelector("#sizePageCita").value),
        document.querySelector("#pageCita"),
        $('#modalCargandoCita'),
        $('#paginationCita'));
    addEventsCitas();
    $('[data-toggle="tooltip"]').tooltip();

}

function addEventsCitas() {
    document.querySelectorAll('.editar-cita').forEach(btn => {
        //AGREGANDO EVENTO CLICK
        btn.onclick = function () {
            citaSelected = findByCita(btn.getAttribute('idcita'));
            if (citaSelected != undefined) {
                beanRequestCita.operation = "update";
                beanRequestCita.type_request = "PUT";
                //SET VALUES MODAL
                showAlertDelete("modalCargandoCita","¿Desea confirmar Atención del Paciente?");
            } else {
                showAlertTopEnd('warning', 'No se encontró la Cita para poder aceptar la solicitud');
            }
        };
    });

}

function findByCita(idcita) {
    let cita_;
    beanPaginationCita.list.forEach(cita => {
        if (idcita == cita.idcita) {
            cita_ = cita;
            return;
        }
    });
    return cita_;
}


