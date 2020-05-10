var beanPaginationSalida;
var SalidaSelected;
var beanRequestSalida = new BeanRequest();
var PersonalSelected;
var PacienteSelected;
document.addEventListener("DOMContentLoaded", function () {
  //INICIALIZANDO VARIABLES DE SOLICITUD
  beanRequestSalida.entity_api = "api/salidas";
  beanRequestSalida.operation = "paginate";
  beanRequestSalida.type_request = "GET";

  $("#FrmSalida").submit(function (event) {
    beanRequestSalida.operation = "paginate";
    beanRequestSalida.type_request = "GET";
    $("#modalCargandoSalida").modal("show");
    event.preventDefault();
    event.stopPropagation();
  });

  $("#FrmSalidaModal").submit(function (event) {
    if (validateFormSalida()) {
      $("#modalCargandoSalida").modal("show");
    }
    event.preventDefault();
    event.stopPropagation();
  });


  $("#txtFechaSalida")
    .bootstrapMaterialDatePicker({
      weekStart: 0,
      time: false,
      format: "DD/MM/YYYY",
      lang: "es"
    })
    .on("change", function (e, date) {

    });

  document.querySelector("#btnEliminarFechaSalida").onclick = function () {
    document.querySelector("#txtFechaSalida").value = "";
  };

  let current_date = new Date();
  $('#txtFechaSalida').val(getDateJava(current_date));


  document.querySelector("#btnOpenNewSalida").onclick = function () {
    AccionAgregarNewSalida()
  };

  document.querySelector("#btnRegresar").onclick = function () {
    beanRequestSalida.operation = "paginate";
    beanRequestSalida.type_request = "GET";
    $("#modalCargandoSalida").modal("show");
    addClass(document.querySelector("#btnOpenSalida"), "d-none");
    removeClass(document.querySelector("#btnListaSalida"), "d-none");
  };

  $("#modalCargandoSalida").on("shown.bs.modal", function () {
    processAjaxSalida();
  });
  $("#modalCargandoSalida").modal("show");

  $("#sizePageSalida").change(function () {
    $("#modalCargandoSalida").modal("show");
  });

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
    document.querySelector('#btnRegresar').dispatchEvent(new Event('click'));
  });

  document.querySelector('#btnEliminarFechaIFilterCita').onclick = function () {
    document.querySelector('#txtFechaIFilterCita').value = '';
  };

  document.querySelector('#btnEliminarFechaFFilterCita').onclick = function () {
    document.querySelector('#txtFechaFFilterCita').value = '';
  };


  $('#txtFechaIFilterCita').val(getDateJava(current_date));
  $('#txtFechaFFilterCita').val(getDateJava(addDays(current_date, 30)));

});

function AccionAgregarNewSalida() {
  //CONFIGURAMOS LA SOLICITUD
  beanRequestSalida.operation = "add";
  beanRequestSalida.type_request = "POST";
  //LIMPIAR LOS CAMPOS
  limpiarInputSalida();
  //SET TITLE MODAL
  document.querySelector("#txtTituloModalMan").innerHTML =
    "REGISTRAR SALIDA";
  //OPEN MODEL
  addClass(document.querySelector("#btnListaSalida"), "d-none");
  removeClass(document.querySelector("#btnOpenSalida"), "d-none");
}

function processAjaxSalida() {
  let parameters_pagination = "";
  let json = "";
  if (beanRequestSalida.operation == "paginate") {
    if (document.querySelector("#txtFilterSalida").value != "") {
      document.querySelector("#pageSalida").value = 1;
    }
    parameters_pagination +=
      "?filter=" + document.querySelector("#txtFilterSalida").value;
    parameters_pagination += "&fechai=" + document.querySelector("#txtFechaIFilterCita").value.trim();
    parameters_pagination += "&fechaf=" + document.querySelector("#txtFechaFFilterCita").value.trim();
    parameters_pagination +=
      "&page=" + document.querySelector("#pageSalida").value;
    parameters_pagination +=
      "&size=" + document.querySelector("#sizePageSalida").value;
  } else {
    parameters_pagination = "";
    if (beanRequestSalida.operation == "delete") {
      parameters_pagination = "/" + SalidaSelected.idsalida;
    } else {
      json = {
        salida: new Salida(document.querySelector("#txtFechaSalida").value, new Personal(PersonalSelected.idpersonal), new Atendido(PacienteSelected.idatendido)),
        list: listDetalleSalida
      };
      if (beanRequestSalida.operation == "update") {
        json.idsalida = SalidaSelected.idsalida;
      }
    }
  }
  $.ajax({
    url:
      getHostAPI() +
      beanRequestSalida.entity_api +
      "/" +
      beanRequestSalida.operation +
      parameters_pagination,
    type: beanRequestSalida.type_request,
    headers: {
      Authorization: "Bearer " + Cookies.get("sisbu_token")
    },
    data: JSON.stringify(json),
    contentType: "application/json; charset=utf-8",
    dataType: "json"
  })
    .done(function (beanCrudResponse) {
      $("#modalCargandoSalida").modal("hide");
      if (beanCrudResponse.messageServer !== undefined) {
        if (beanCrudResponse.messageServer.toLowerCase() == "ok") {
          if (beanRequestSalida.operation == "add") {
            limpiarInputSalida();
          }
          toListDetalleSalida(listDetalleSalida);
          showAlertTopEnd("success", "Acción realizada exitosamente");
        } else {
          showAlertTopEnd("warning", beanCrudResponse.messageServer);
        }
      }
      if (beanCrudResponse.beanPagination !== undefined) {
        beanPaginationSalida = beanCrudResponse.beanPagination;
        toListSalida(beanPaginationSalida);
      }
    })
    .fail(function (jqXHR, textStatus, errorThrown) {
      $("#modalCargandoSalida").modal("hide");
      showAlertErrorRequest();
    });
}

function toListSalida(beanPagination) {
  document.querySelector("#tbodySalida").innerHTML = "";
  document.querySelector("#titleManagerSalida").innerHTML =
    "[ " + beanPagination.count_filter + " ] SALIDAS DE PRODUCTO ";
  let row;
  row = `
               <div class="dt-widget__item border-success bg-primary text-white m-0 pr-0 pt-2 pb-2 pl-3">
                    <!-- Widget Info -->
                    <div class="dt-widget__info text-truncate " >
                        <p class="mb-0 text-truncate ">
                           FECHA
                        </p>
                    </div>
                    <!-- /widget info -->
                    <!-- Widget Info -->
                    <div class="dt-widget__info text-truncate " >
                        <p class="mb-0 text-truncate ">
                           PACIENTE
                        </p>
                    </div>
                    <!-- /widget info -->
                    <!-- Widget Info -->
                    <div class="dt-widget__info text-truncate " >
                        <p class="mb-0 text-truncate ">
                           ESCUELA PROFESIONAL
                        </p>
                    </div>
                    <!-- /widget info -->
                    <!-- Widget Info -->
                    <div class="dt-widget__info text-truncate " >
                        <p class="mb-0 text-truncate ">
                           PERSONAL
                        </p>
                    </div>
                    <!-- /widget info -->
                    <!-- Widget Extra -->
                    <div class="dt-widget__extra">
                    <div class="dt-task">
                       
                        </div>
                    </div>
                    <!-- /widget extra -->
                </div>
            `;
  if (beanPagination.count_filter == 0) {
    destroyPagination($("#paginationSalida"));
    showAlertTopEnd("warning", "No se encontraron resultados");
    row += `<div class="dt-widget__item m-0 pt-1 pb-1">
    <!-- Widget Info -->
    <div class="dt-widget__info text-truncate text-center" >
        <p class="mb-0 text-truncate ">
           No hay salida de productos
        </p>
    </div>
    <!-- /widget info -->
                </div>
            `;
    document.querySelector("#tbodySalida").innerHTML += row;
    return;
  }

  document.querySelector("#tbodySalida").innerHTML += row;
  beanPagination.list.forEach(BeanSalida => {
    row = `
                 <div class="dt-widget__item m-0 p-1 pl-3 ">
                    <!-- Widget Info -->
                    <div class="dt-widget__info" >
                        <p class="mb-0">
                           ${BeanSalida.salida.fecha}
                        </p>
                    </div>
                    <!-- /widget info -->
                    <!-- Widget Info -->
                    <div class="dt-widget__info " >
                        <p class="mb-0 ">
                           ${BeanSalida.salida.atendido.apellido_pat}
                           ${BeanSalida.salida.atendido.apellido_mat}
                           ${BeanSalida.salida.atendido.nombre}
                        </p>
                    </div>
                    <!-- /widget info -->
                    <!-- Widget Info -->
                    <div class="dt-widget__info" >
                        <p class="mb-0 ">
                           ${BeanSalida.salida.atendido.escuela.nombre}
                          
                        </p>
                    </div>
                    <!-- /widget info -->
                    <!-- Widget Info -->
                    <div class="dt-widget__info" >
                        <p class="mb-0">
                           ${BeanSalida.salida.personal.apellido_pat}
                           ${BeanSalida.salida.personal.apellido_mat}
                           ${BeanSalida.salida.personal.nombre}
                        </p>
                    </div>
                    <!-- /widget info -->
                    <!-- Widget Extra -->
                    <div class="dt-widget__extra">
                    <div class="dt-task">
                        <!-- Hide Content -->
                        <div class="dt-task__redirect">
                            <!-- Action Button Group -->
                            <div class="action-btn-group">
                                <!--button class="btn btn-default text-primary dt-fab-btn editar-Salida" idsalida='${BeanSalida.salida.idsalida}' title="Editar" data-toggle="tooltip">
                                    <i class="icon icon-editors"></i>
                                </button-->
                                <button class="btn btn-default text-danger dt-fab-btn eliminar-Salida" idsalida='${BeanSalida.salida.idsalida}' title="Eliminar" data-toggle="tooltip">
                                    <i class="icon icon-trash-filled"></i>
                                </button>
                              
                            </div>
                            <!-- /action button group -->
                        </div>
                        <!-- /hide content -->
                        </div>
                    </div>
                    <!-- /widget extra -->
                </div>
            `;
    document.querySelector("#tbodySalida").innerHTML += row;
    $('[data-toggle="tooltip"]').tooltip();
  });
  buildPagination(
    beanPagination.count_filter,
    parseInt(document.querySelector("#sizePageSalida").value),
    document.querySelector("#pageSalida"),
    $("#modalCargandoSalida"),
    $("#paginationSalida")
  );
  addEventsSalidaes();



}

function addEventsSalidaes() {
  document.querySelectorAll(".editar-Salida").forEach(btn => {
    //AGREGANDO EVENTO CLICK
    btn.onclick = function () {
      SalidaSelected = findBySalida(btn.getAttribute("idsalida")).salida;
      listDetalleSalida = findBySalida(btn.getAttribute("idsalida")).list;

      if (SalidaSelected != undefined) {
        beanRequestSalida.operation = "update";
        beanRequestSalida.type_request = "PUT";
        //SET VALUES MODAL
        toListDetalleSalida(listDetalleSalida);
        document.querySelector("#txtFechaSalida").value =
          SalidaSelected.fecha;
        PersonalSelected = SalidaSelected.personal;
        document.querySelector("#txtPersonalSalida").value =
          SalidaSelected.personal.apellido_pat.trim() + " " + SalidaSelected.personal.apellido_mat.trim() + " " + SalidaSelected.personal.nombre.trim();

        PacienteSelected = SalidaSelected.atendido;
        document.querySelector("#txtPacienteSalida").value =
          SalidaSelected.atendido.apellido_pat.trim() + " " + SalidaSelected.atendido.apellido_mat.trim() + " " + SalidaSelected.atendido.nombre.trim();
        document.querySelector("#txtTituloModalMan").innerHTML =
          "EDITAR SALIDA";
        //OPEN MODEL

        addClass(document.querySelector("#btnListaSalida"), "d-none");
        removeClass(document.querySelector("#btnOpenSalida"), "d-none");
      } else {
        showAlertTopEnd(
          "warning",
          "No se encontró el Salida para poder editar"
        );
      }
    };
  });
  document.querySelectorAll(".eliminar-Salida").forEach(btn => {
    //AGREGANDO EVENTO CLICK
    btn.onclick = function () {
      SalidaSelected = findBySalida(btn.getAttribute("idsalida")).salida;
      beanRequestSalida.operation = "delete";
      beanRequestSalida.type_request = "DELETE";
      processAjaxSalida();
    };
  });
}

function findBySalida(idsalida) {
  let beanSalida_;
  beanPaginationSalida.list.forEach(BeanSalida => {
    if (idsalida == BeanSalida.salida.idsalida) {
      beanSalida_ = BeanSalida;
      return;
    }
  });
  return beanSalida_;
}

function validateFormSalida() {
  if (document.querySelector("#txtFechaSalida").value == "") {
    showAlertTopEnd("warning", "Por favor ingrese Fecha");
    document.querySelector("#txtFechaSalida").focus();
    return false;
  } else if (document.querySelector("#txtPersonalSalida").value == "") {
    showAlertTopEnd("warning", "Por favor ingrese Personal");
    document.querySelector("#txtPersonalSalida").focus();
    return false;
  }

  return true;
}

function limpiarInputSalida() {
  document.querySelector("#txtPersonalSalida").value = "";
  PersonalSelected = undefined;
  document.querySelector("#txtPacienteSalida").value = "";
  PacienteSelected = undefined;
  listDetalleSalida.length = 0;
  toListDetalleSalida(listDetalleSalida);
}
