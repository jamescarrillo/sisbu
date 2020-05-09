var beanPaginationSalida;
var SalidaSelected;
var beanRequestSalida = new BeanRequest();
var PersonalSelected;
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
  document.querySelector("#btnSeleccionarDiagnostico").onclick = function () {
    addClass(document.querySelector("#btnOpenSalida"), "d-none");
    removeClass(document.querySelector("#ListaPaciente"), "d-none");
    $('#modalCargandoPaciente').modal('show');

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
      "?fecha=" + document.querySelector("#txtFilterSalida").value;
    parameters_pagination +=
      "&page=" + document.querySelector("#pageSalida").value;
    parameters_pagination +=
      "&size=" + document.querySelector("#sizePageSalida").value;
  } else {
    parameters_pagination = "";
    if (beanRequestSalida.operation == "delete") {
      parameters_pagination = "/" + SalidaSelected.idSalida;
    } else {
      json = {
        salida: new Salida(document.querySelector("#txtFechaSalida").value, new Personal(PersonalSelected.idpersonal), new Diagnostico(diagnosticoSelected.iddiagnostico)),
        list: listDetalleSalida
      };
      if (beanRequestSalida.operation == "update") {
        json.idSalida = SalidaSelected.idSalida;
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
      console.log(beanCrudResponse);
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
    "[ " + beanPagination.count_filter + " ] Salida";
  let row;
  row = `
               <div class="dt-widget__item border-success bg-primary text-white mb-0 ">
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
                           PERSONAL
                        </p>
                    </div>
                    <!-- /widget info -->
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
                 <div class="dt-widget__item m-0 pt-1 pb-1">
                    <!-- Widget Info -->
                    <div class="dt-widget__info text-truncate" >
                        <p class="mb-0 text-truncate ">
                           ${BeanSalida.Salida.fecha}
                        </p>
                    </div>
                    <!-- /widget info -->
                    <!-- Widget Info -->
                    <div class="dt-widget__info text-truncate " >
                        <p class="mb-0 text-truncate ">
                           ${BeanSalida.Salida.personal.apellido_pat}
                           ${BeanSalida.Salida.personal.apellido_mat}
                           ${BeanSalida.Salida.personal.nombre}
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
                                <button class="btn btn-default text-primary dt-fab-btn editar-Salida" idSalida='${BeanSalida.Salida.idSalida}' title="Editar" data-toggle="tooltip">
                                    <i class="icon icon-editors"></i>
                                </button>
                                <button class="btn btn-default text-danger dt-fab-btn eliminar-Salida" idSalida='${BeanSalida.Salida.idSalida}' title="Eliminar" data-toggle="tooltip">
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
      SalidaSelected = findBySalida(btn.getAttribute("idSalida")).Salida;
      listDetalleSalida = findBySalida(btn.getAttribute("idSalida")).list;

      if (SalidaSelected != undefined) {
        beanRequestSalida.operation = "update";
        beanRequestSalida.type_request = "PUT";
        //SET VALUES MODAL
        console.log(listDetalleSalida);
        toListDetalleSalida(listDetalleSalida);
        document.querySelector("#txtFechaSalida").value =
          SalidaSelected.fecha;
        PersonalSelected = SalidaSelected.personal;
        document.querySelector("#txtPersonalSalida").value =
          SalidaSelected.personal.nombre;

        document.querySelector("#txtTituloModalMan").innerHTML =
          "EDITAR Salida";
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
      SalidaSelected = findBySalida(btn.getAttribute("idSalida")).Salida;
      beanRequestSalida.operation = "delete";
      beanRequestSalida.type_request = "DELETE";
      processAjaxSalida();
    };
  });
}

function findBySalida(idSalida) {
  let beanSalida_;
  beanPaginationSalida.list.forEach(BeanSalida => {
    if (idSalida == BeanSalida.Salida.idSalida) {
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
  listDetalleSalida.length = 0;
  toListDetalleSalida(listDetalleSalida);
}
