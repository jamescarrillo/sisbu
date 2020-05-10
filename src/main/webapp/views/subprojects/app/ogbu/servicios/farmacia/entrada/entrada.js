var beanPaginationEntrada;
var entradaSelected;
var beanRequestEntrada = new BeanRequest();
var PersonalSelected;
document.addEventListener("DOMContentLoaded", function () {
  //INICIALIZANDO VARIABLES DE SOLICITUD
  beanRequestEntrada.entity_api = "api/entradas";
  beanRequestEntrada.operation = "paginate";
  beanRequestEntrada.type_request = "GET";

  $("#FrmEntrada").submit(function (event) {
    beanRequestEntrada.operation = "paginate";
    beanRequestEntrada.type_request = "GET";
    $("#modalCargandoEntrada").modal("show");
    event.preventDefault();
    event.stopPropagation();
  });

  $("#FrmEntradaModal").submit(function (event) {
    if (validateFormEntrada()) {
      $("#modalCargandoEntrada").modal("show");
    }
    event.preventDefault();
    event.stopPropagation();
  });


  $("#txtFechaEntrada")
    .bootstrapMaterialDatePicker({
      weekStart: 0,
      time: false,
      format: "DD/MM/YYYY",
      lang: "es"
    })
    .on("change", function (e, date) {

    });

  document.querySelector("#btnEliminarFechaEntrada").onclick = function () {
    document.querySelector("#txtFechaEntrada").value = "";
  };
  $("#txtFechaVencimientoEntrada")
    .bootstrapMaterialDatePicker({
      weekStart: 0,
      time: false,
      format: "DD/MM/YYYY",
      lang: "es"
    })
    .on("change", function (e, date) { });

  let current_date = new Date();
  $('#txtFechaEntrada').val(getDateJava(current_date));
  $('#txtFechaVencimientoEntrada').val(getDateJava(addDays(current_date, 30)));

  document.querySelector(
    "#btnEliminarFechaVencimientoEntrada"
  ).onclick = function () {
    document.querySelector("#txtFechaVencimientoEntrada").value = "";
  };
  document.querySelector("#btnOpenNewEntrada").onclick = function () {
    //CONFIGURAMOS LA SOLICITUD
    beanRequestEntrada.operation = "add";
    beanRequestEntrada.type_request = "POST";
    //LIMPIAR LOS CAMPOS
    limpiarInputEntrada();
    //SET TITLE MODAL
    document.querySelector("#txtTituloModalMan").innerHTML =
      "REGISTRAR ENTRADA";
    //OPEN MODEL
    document.querySelector("#btnListaEntrada").style.display = "none";
    document.querySelector("#btnOpenEntrada").style.display = "block";
  };

  document.querySelector("#btnRegresar").onclick = function () {
    beanRequestEntrada.operation = "paginate";
    beanRequestEntrada.type_request = "GET";
    $("#modalCargandoEntrada").modal("show");
    document.querySelector("#btnOpenEntrada").style.display = "none";
    document.querySelector("#btnListaEntrada").style.display = "block";
  };

  $("#modalCargandoEntrada").on("shown.bs.modal", function () {
    processAjaxEntrada();
  });

  $("#modalCargandoEntrada").modal("show");

  $("#sizePageEntrada").change(function () {
    $("#modalCargandoEntrada").modal("show");
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

function processAjaxEntrada() {
  let parameters_pagination = "";
  let json = "";
  if (beanRequestEntrada.operation == "paginate") {
    if (document.querySelector("#txtFechaIFilterCita").value != "") {
      document.querySelector("#pageEntrada").value = 1;
    }

    parameters_pagination += "?fechai=" + document.querySelector("#txtFechaIFilterCita").value.trim();
    parameters_pagination += "&fechaf=" + document.querySelector("#txtFechaFFilterCita").value.trim();
    parameters_pagination +=
      "&page=" + document.querySelector("#pageEntrada").value;
    parameters_pagination +=
      "&size=" + document.querySelector("#sizePageEntrada").value;
  } else {
    parameters_pagination = "";
    if (beanRequestEntrada.operation == "delete") {
      parameters_pagination = "/" + entradaSelected.identrada;
    } else {
      json = {
        entrada: new Entrada(document.querySelector("#txtFechaEntrada").value, new Personal(PersonalSelected.idpersonal)),
        list: listDetalleEntrada
      };
      if (beanRequestEntrada.operation == "update") {
        json.entrada.identrada = entradaSelected.identrada;
      }
    }
  }
  $.ajax({
    url:
      getHostAPI() +
      beanRequestEntrada.entity_api +
      "/" +
      beanRequestEntrada.operation +
      parameters_pagination,
    type: beanRequestEntrada.type_request,
    headers: {
      Authorization: "Bearer " + Cookies.get("sisbu_token")
    },
    data: JSON.stringify(json),
    contentType: "application/json; charset=utf-8",
    dataType: "json"
  })
    .done(function (beanCrudResponse) {
      $("#modalCargandoEntrada").modal("hide");
      if (beanCrudResponse.messageServer !== undefined) {
        if (beanCrudResponse.messageServer.toLowerCase() == "ok") {
          if (beanRequestEntrada.operation == "add") {
            limpiarInputEntrada();
          }
          toListDetalleEntrada(listDetalleEntrada);
          showAlertTopEnd("success", "Acción realizada exitosamente");
        } else {
          showAlertTopEnd("warning", beanCrudResponse.messageServer);
        }
      }
      if (beanCrudResponse.beanPagination !== undefined) {
        beanPaginationEntrada = beanCrudResponse.beanPagination;
        toListEntrada(beanPaginationEntrada);
      }
    })
    .fail(function (jqXHR, textStatus, errorThrown) {
      $("#modalCargandoEntrada").modal("hide");
      showAlertErrorRequest();
    });
}

function toListEntrada(beanPagination) {
  document.querySelector("#tbodyEntrada").innerHTML = "";
  document.querySelector("#titleManagerEntrada").innerHTML =
    "[ " + beanPagination.count_filter + " ] ENTRADAS DE PRODUCTO";
  let row;
  row = `
               <div class="dt-widget__item border-success bg-primary text-white m-0 ">
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
    destroyPagination($("#paginationEntrada"));
    row += `
    <div class="dt-widget__item  m-0 pt-1 pb-1">
         <!-- Widget Info -->
         <div class="dt-widget__info text-truncate text-center" >
             <p class="mb-0 text-truncate ">
                NO HAY REGISTROS
             </p>
         </div>
         <!-- /widget info -->
        
     </div>
 `;
    document.querySelector("#tbodyEntrada").innerHTML += row;
    showAlertTopEnd("warning", "No se encontraron resultados");
    return;
  }

  document.querySelector("#tbodyEntrada").innerHTML += row;
  beanPagination.list.forEach(BeanEntrada => {
    row = `
                 <div class="dt-widget__item m-0 pt-1 pb-1">
                    <!-- Widget Info -->
                    <div class="dt-widget__info text-truncate" >
                        <p class="mb-0 text-truncate ">
                           ${BeanEntrada.entrada.fecha}
                        </p>
                    </div>
                    <!-- /widget info -->
                    <!-- Widget Info -->
                    <div class="dt-widget__info text-truncate " >
                        <p class="mb-0 text-truncate ">
                           ${BeanEntrada.entrada.personal.apellido_pat}
                           ${BeanEntrada.entrada.personal.apellido_mat}
                           ${BeanEntrada.entrada.personal.nombre}
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
                                <button class="btn btn-default text-primary dt-fab-btn editar-entrada" identrada='${BeanEntrada.entrada.identrada}' title="Editar" data-toggle="tooltip">
                                    <i class="icon icon-editors"></i>
                                </button>
                                <button class="btn btn-default text-danger dt-fab-btn eliminar-entrada" identrada='${BeanEntrada.entrada.identrada}' title="Eliminar" data-toggle="tooltip">
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
    document.querySelector("#tbodyEntrada").innerHTML += row;
    $('[data-toggle="tooltip"]').tooltip();
  });
  buildPagination(
    beanPagination.count_filter,
    parseInt(document.querySelector("#sizePageEntrada").value),
    document.querySelector("#pageEntrada"),
    $("#modalCargandoEntrada"),
    $("#paginationEntrada")
  );
  addEventsEntradaes();



}

function addEventsEntradaes() {
  document.querySelectorAll(".editar-entrada").forEach(btn => {
    //AGREGANDO EVENTO CLICK
    btn.onclick = function () {
      entradaSelected = findByEntrada(btn.getAttribute("identrada")).entrada;
      listDetalleEntrada = findByEntrada(btn.getAttribute("identrada")).list;

      if (entradaSelected != undefined) {
        beanRequestEntrada.operation = "update";
        beanRequestEntrada.type_request = "PUT";
        //SET VALUES MODAL
        toListDetalleEntrada(listDetalleEntrada);
        document.querySelector("#txtFechaEntrada").value =
          entradaSelected.fecha;
        PersonalSelected = entradaSelected.personal;
        document.querySelector("#txtPersonalEntrada").value =
          entradaSelected.personal.nombre;

        document.querySelector("#txtTituloModalMan").innerHTML =
          "EDITAR ENTRADA";
        //OPEN MODEL
        document.querySelector("#btnListaEntrada").style.display = "none";
        document.querySelector("#btnOpenEntrada").style.display = "block";
      } else {
        showAlertTopEnd(
          "warning",
          "No se encontró el Entrada para poder editar"
        );
      }
    };
  });
  document.querySelectorAll(".eliminar-entrada").forEach(btn => {
    //AGREGANDO EVENTO CLICK
    btn.onclick = function () {
      entradaSelected = findByEntrada(btn.getAttribute("identrada")).entrada;
      beanRequestEntrada.operation = "delete";
      beanRequestEntrada.type_request = "DELETE";
      processAjaxEntrada();
    };
  });
}

function findByEntrada(identrada) {
  let beanentrada_;
  beanPaginationEntrada.list.forEach(BeanEntrada => {
    if (identrada == BeanEntrada.entrada.identrada) {
      beanentrada_ = BeanEntrada;
      return;
    }
  });
  return beanentrada_;
}

function validateFormEntrada() {
  if (document.querySelector("#txtFechaEntrada").value == "") {
    showAlertTopEnd("warning", "Por favor ingrese Fecha");
    document.querySelector("#txtFechaEntrada").focus();
    return false;
  } else if (document.querySelector("#txtPersonalEntrada").value == "") {
    showAlertTopEnd("warning", "Por favor ingrese Personal");
    document.querySelector("#txtPersonalEntrada").focus();
    return false;
  }

  return true;
}

function limpiarInputEntrada() {
  document.querySelector("#txtPersonalEntrada").value = "";
  PersonalSelected = undefined;
  listDetalleEntrada.length = 0;
  toListDetalleEntrada(listDetalleEntrada);
}
