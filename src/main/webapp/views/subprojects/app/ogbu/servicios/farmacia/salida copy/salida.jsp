<%-- Document : Salida Created on : 23/10/2019, 06:15:02 PM Author : Andres
--%>

<div class="row" id="btnListaSalida">
  <!-- Card -->
  <div class="col-xl-12 p-0">
    <!-- Card Header -->
    <div class="card-header bg-transparent">
      <h4 class="mb-0" id="titleManagerSalida">[ 0 ] Salida</h4>
      <input type="hidden" id="pageSalida" value="1" />
    </div>
    <!-- /card header -->
    <!-- Card Body -->
    <div class="card-body p-0">
      <form id="FrmSalida" class="search-box mw-100 left-side-icon">
        <div class="input-group">
          <input type="search" id="txtFilterSalida" class="form-control form-control-sm" placeholder="Filter Nombre..."
            data-toggle="tooltip" data-placement="left" data-original-title="Buscar" />
          <button type="submit" class="search-icon">
            <i class="icon icon-search icon-lg"></i></button>
          <div class="input-group-append">
            <button type="button" class="btn btn-primary btn-sm ml-5" id="btnOpenNewSalida" data-toggle="tooltip"
              title="Agregar Salida">
              <i class="icon icon-addnew"></i>
            </button>
          </div>

        </div>
      </form>
      <div class="dt-card mt-4">
        <!-- Card Body -->
        <div class="dt-card__body p-0  ">
          <!-- Widget -->
          <div class="dt-widget dt-widget-hl-item-space dt-widget-mb-item dt-widget-hover-bg" id="tbodySalida"></div>
          <!-- /widget -->
          <!-- /card body -->
        </div>
      </div>
      <!-- /card -->
      <!-- /tables -->
      <div class="row mt-2">
        <div class="col-md-2 col-sm-3 col-4">
          <select id="sizePageSalida" class="form-control form-control-sm select2-single">
            <option value="10">10</option>
            <option value="15">15</option>
            <option value="20">20</option>
          </select>
        </div>
        <div class="col-md-10 col-sm-9 col-8">
          <nav aria-label="Page navigation example">
            <ul id="paginationSalida" class="pagination pagination-sm justify-content-end"></ul>
          </nav>
        </div>
      </div>
    </div>
    <!-- /card body -->
  </div>
  <!-- /card -->
</div>

<div class="row d-none" id="btnOpenSalida">
  <!-- Card -->
  <div class="col-12 card p-0">
    <div class="card-header bg-transparent">
      <h4 class="mb-0 text-center" id="txtTituloModalMan">
        Salida
      </h4>
    </div>
    <form id="FrmSalidaModal">
      <div class="col-sm-12 form-row m-0">
        <div class="form-group col-lg-4 col-sm-6">
          <label for="txtFechaSalida">Fecha Salida</label>
          <div class="input-group">
            <input type="text" class="form-control form-control-sm" id="txtFechaSalida" placeholder="DD/MM/AAAA" />
            <div class="input-group-append">
              <button type="button" id="btnEliminarFechaSalida" data-toggle="tooltip" title="Eliminar Fecha"
                class="btn btn-primary btn-sm">
                <i class="icon icon-trash"></i>
              </button>
            </div>
          </div>
        </div>
        <div class="form-group col-lg-4 col-sm-6">
          <label for="txtPersonalSalida">Personal </label>
          <div class="input-group">
            <input type="text" class="form-control form-control-sm" id="txtPersonalSalida" aria-describedby="nombre"
              placeholder="Click en el bot&oacute;n para seleccionar. . ." disabled="" />
            <div class="input-group-append">
              <button type="button" id="btnSeleccionarPersonal" class="btn btn-primary btn-sm">
                <i class="icon icon-subscribe"></i>
              </button>
            </div>
          </div>
        </div>
        <div class="form-group col-lg-4 col-sm-6">
          <label for="txtDiagnosticoSalida">Diagn&oacute;stico </label>
          <div class="input-group">
            <input type="text" class="form-control form-control-sm" id="txtDiagnoticoSalida" aria-describedby="nombre"
              placeholder="Click en el bot&oacute;n para seleccionar. . ." disabled="" />
            <div class="input-group-append">
              <button type="button" id="btnSeleccionarDiagnostico" class="btn btn-primary btn-sm">
                <i class="icon icon-subscribe"></i>
              </button>
            </div>
          </div>
        </div>
      </div>
      <div id="newOpenDiagnostico" class="col-12 form-row d-none m-0">

        <div class="card-header bg-transparent w-100 pt-0">
          <h4 class="mb-0 text-primary" id="txtTituloModalDiagnostico"></h4>
        </div>
        <div class="col-sm-4">
          <h4 class="mb-2">Enfermedad Actual</h4>
          <p id="txtEnfermedadPaciente" class="mb-5">
          </p>
        </div>
        <div class="col-sm-4">
          <h4 class="mb-2">Diagn&oacute;stico</h4>
          <p id="txtDxPaciente" class="mb-5">
          </p>
        </div>
        <div class="col-sm-4">
          <h4 class="mb-2">Tratamiento</h4>
          <p id="txtTtoPaciente" class="mb-5">
          </p>
        </div>
      </div>
      <!-- Grid Item -->
      <div class="col-xl-12">
        <!-- Entry Header -->
        <div class="dt-entry__header">
          <!-- Entry Heading -->
          <div class="dt-entry__heading">

          </div>
          <!-- /entry heading -->
        </div>
        <!-- /entry header -->
        <div class="row justify-content-center">

          <div class="form-group col-lg-4 col-sm-6 col-md-6 col-6">
            <label for="txtPresentacionSalida">Presentacion </label>
            <div class="input-group">
              <input type="text" class="form-control form-control-sm" id="txtPresentacionSalida"
                aria-describedby="nombre" placeholder="Click en el boton para seleccionar. . ." disabled="" />
              <div class="input-group-append">
                <button type="button" id="btnSeleccionarPresentacion" class="btn btn-primary btn-sm">
                  <i class="icon icon-subscribe"></i>
                </button>
              </div>
            </div>
          </div>
          <div class="form-group col-lg-4  col-sm-6 col-md-6 col-6">
            <label for="txtCantidadPresentacion">Cantidad</label>

            <div class="input-group">
              <input class="form-control form-control-sm" id="txtCantidadPresentacion" type="number"
                placeholder="CANTIDAD" maxlength="6" />
              <div class="input-group-append pl-5">
                <button type="button" id="btnAgregarPresentacion" class="btn btn-outline-primary btn-sm pulse-primary"
                  data-toggle="tooltip" title="Agregar a la Lista">
                  <i class="icon icon-addnew"></i>
                </button>
              </div>
            </div>
          </div>
        </div>

        <div class="dt-card mt-4">
          <!-- Card Body -->
          <div class="dt-card__body p-0  ">
            <!-- Widget -->
            <div class="dt-widget dt-widget-hl-item-space dt-widget-mb-item dt-widget-hover-bg" id="tbodyDetalleSalida">
              <div class="dt-widget__item border-success bg-primary text-white mb-0 pl-5">
                <!-- Widget Info -->
                <div class="dt-widget__info text-truncate ">
                  <p class="mb-0 text-truncate ">
                    Fecha de Vencimiento
                  </p>
                </div>
                <!-- /widget info -->
                <!-- Widget Info -->
                <div class="dt-widget__info text-truncate ">
                  <p class="mb-0 text-truncate ">
                    Presentacion
                  </p>
                </div>
                <!-- /widget info -->
                <!-- Widget Info -->
                <div class="dt-widget__info text-truncate ">
                  <p class="mb-0 text-truncate ">
                    Cantidad
                  </p>
                </div>
                <!-- /widget info -->
              </div>
            </div>
            <!-- /widget -->
            <!-- /card body -->
          </div>
        </div>
        <!-- /card -->
        <!-- /tables -->

      </div>
      <!-- /grid item -->
      <div class="form-group col-12 text-center">

        <button type="submit" id="btnGuardar" class="btn btn-primary btn-sm">
          <i class="fas fa-check"></i> GUARDAR
        </button>
        <button type="button" id="btnRegresar" class="btn btn-outline-secondary btn-sm">
          <i class="icon icon-reply"></i> CANCELAR
        </button>
      </div>
    </form>
  </div>
  <!-- /card -->
</div>

<div class="row d-none" id="ListaPaciente">
  <div class="col-xl-12 p-0">
    <!-- Card -->
    <div class="overflow-hidden">
      <!-- Card Header -->
      <div class="card-header bg-transparent pt-0">
        <h4 class="mb-0" id="titleManagerPaciente">[ 0 ] PACIENTES</h4>
        <input type="hidden" id="pagePaciente" value="1">
      </div>
      <!-- /card header -->
      <!-- Card Body -->
      <div class="card-body p-1">
        <form id="FrmPaciente" class="search-box mw-100">
          <div class="input-group">
            <input type="search" id="txtFilterPaciente" class="form-control form-control-sm" placeholder="FILTRO. . .">
            <button type="submit" class="search-icon">
              <i class="icon icon-search text-primary icon-lg"></i></button>
          </div>
        </form>
        <!-- Card -->
        <div class="dt-card mt-4">
          <!-- Card Body -->
          <div class="dt-card__body p-0 ">
            <!-- Widget -->
            <div class="dt-widget dt-widget-hl-item-space dt-widget-mb-item dt-widget-hover-bg" id="tbodyPaciente">
            </div>
            <!-- /widget -->
            <!-- /card body -->
          </div>

        </div>
        <!-- /card -->
        <div class="row mt-2">
          <div class="col-md-2 col-sm-3 col-4">
            <select id="sizePagePaciente" class="form-control form-control-sm select2-single">
              <option value="10">10</option>
              <option value="15">15</option>
              <option value="20">20</option>
            </select>
          </div>
          <div class="col-md-10 col-sm-9 col-8">
            <nav aria-label="Page navigation example">
              <ul id="paginationPaciente" class="pagination pagination-sm justify-content-end">
              </ul>
            </nav>
          </div>
        </div>
      </div>
      <!-- /card body -->
    </div>
  </div>
</div>
<!-- Card -->
<div class="row d-none" id="openPaciente">
  <!-- Tab DIAGNOSTICO -->

  <div class="col-12 p-0">
    <div class="float-left">
      <button data-toggle="tooltip" title="Regresar" type="button" id="btnCerrar"
        class="btn btn-outline-primary btn-sm dt-avatar">
        <i class="icon icon-reply icon-lg"></i></button>
    </div>
    <!-- Card Heading -->
    <div class="dt-card__header dt-card__header mb-4 p-0 pt-2 text-center">
      <h3 id="titleManagerDiagnostico" class="dt-card__title text-primary w-100">LISTA DE
        DIAGN&Oacute;STICOS</h3>
      <input type="hidden" id="pageDiagnostico" value="1">
    </div>
    <!-- /card heading -->
    <div class="card-body p-2">
      <!-- Tables -->
      <div class="table-responsive">
        <table class="table mb-0 table-hover">
          <thead style="line-height: 0.4;border-bottom-style: hidden;" class="bg-primary ">
            <tr>
              <th class="text-uppercase text-white" scope="col" style="font-weight: 500;">
                ATENDIDO </th>
              <th class="text-uppercase text-white" scope="col">
                FECHA </th>
              <th class="text-uppercase text-white" scope="col">
                DIAGN&Oacute;STICO</th>

            </tr>
          </thead>
          <tbody id="tbodyDiagnostico" class="overflow-auto">
          </tbody>
        </table>
      </div>
      <!-- /tables -->
      <div class="mt-2 form-row">
        <div class="col-md-2 col-sm-3 col-4">
          <select id="sizePageDiagnostico" class="form-control form-control-sm select2-single">
            <option value="10">10</option>
            <option value="15">15</option>
            <option value="20">20</option>
          </select>
        </div>
        <div class="col-md-10 col-sm-9 col-8">
          <nav aria-label="Page navigation example">
            <ul id="paginationDiagnostico" class="pagination pagination-sm justify-content-end">
            </ul>
          </nav>
        </div>
      </div>
    </div>
  </div>
  <!-- /tab pane-->

  <!-- /tab content -->
</div>
<!-- /card -->

<div class="modal fade" id="modalCargandoPaciente" data-backdrop="static" data-keyboard="false" tabindex="-1"
  role="dialog" style="padding-top: 18%; overflow-y: visible; display: none;" aria-hidden="true">
  <div class="modal-dialog modal-sm">
    <div class="modal-content">
      <div class="modal-body">
        <div class="progress" style="margin-bottom: 0px;">
          <div class="progress-bar progress-bar-striped progress-bar-animated" role="progressbar" aria-valuenow="100"
            aria-valuemin="0" aria-valuemax="100" style="width:100%">
            Cargando Pacientes. . .
          </div>
        </div>
      </div>
    </div>
  </div>
</div>

<div class="modal fade" id="modalCargandoDiagnostico" data-backdrop="static" data-keyboard="false" tabindex="-1"
  role="dialog" style="padding-top: 18%; overflow-y: visible; display: none;" aria-hidden="true">
  <div class="modal-dialog modal-sm">
    <div class="modal-content">
      <div class="modal-body">
        <div class="progress" style="margin-bottom: 0px;">
          <div class="progress-bar progress-bar-striped progress-bar-animated" role="progressbar" aria-valuenow="100"
            aria-valuemin="0" aria-valuemax="100" style="width:100%">
            Cargando Diagnosticos. . .
          </div>
        </div>
      </div>
    </div>
  </div>
</div>

<div class="modal fade" id="modalCargandoSalida" data-backdrop="static" data-keyboard="false" tabindex="-1"
  role="dialog" style="padding-top: 18%; overflow-y: visible; display: none;" aria-hidden="true">
  <div class="modal-dialog modal-sm">
    <div class="modal-content">
      <div class="modal-body">
        <div class="progress" style="margin-bottom: 0px;">
          <div class="progress-bar progress-bar-striped progress-bar-animated" role="progressbar" aria-valuenow="100"
            aria-valuemin="0" aria-valuemax="100" style="width:100%">
            Cargando Salidas. . .
          </div>
        </div>
      </div>
    </div>
  </div>
</div>

<!--T: PERSONAL SELECTED-->
<div id="ventanaModalSelectedPersonalC" class="modal" tabindex="-1" role="dialog" data-backdrop="static"
  data-keyboard="false" style="padding-top: 2%; overflow-y: visible;background-color: rgba(0,0,0,.2)">
  <div class="modal-dialog" role="document">
    <div class="modal-content" style="border-color: #0085c1; border-width: 4px;">
      <div class="modal-header">
        <h5 class="mb-0" id="titleManagerPersonalC">
          <strong>[ 0 ] PERSONAL</strong>
        </h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body pb-0 pt-0">
        <div class="row">
          <div class="col-12 pt-2">
            <input type="hidden" id="pagePersonalC" value="1" />
            <form id="FrmPersonalC" class="search-box mw-100 right-side-icon">
              <input type="search" id="txtFilterPersonalC" class="form-control form-control-sm mr-3"
                placeholder="INGRESE FILTRO . . ." data-toggle="tooltip" data-placement="left"
                data-original-title="Buscar" />
              <button type="submit" class="search-icon">
                <i class="icon icon-search icon-lg"></i></button>

            </form>

          </div>
          <div class="col-12">

            <div class="table-responsive">
              <table class="table mb-0 table-fluid">
                <thead>
                  <tr>
                    <th class="align-middle text-left">Personal</th>
                  </tr>
                </thead>
                <tbody id="tbodyPersonalC"></tbody>
              </table>
            </div>

            <div class="row mt-2 mb-2" style="display: none">
              <div class="col-sm-4 mt-2">
                <select id="sizePagePersonalC" class="form-control form-control-sm sisbu-cursor-mano combo-paginar">
                  <option value="5">05</option>
                  <option value="10">10</option>
                  <option value="15">15</option>
                </select>
              </div>
              <div class="col-sm-8 mt-2">
                <nav aria-label="Page navigation">
                  <ul id="paginationPersonalC" class="pagination justify-content-end"></ul>
                </nav>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-outline-primary btn-xs" data-dismiss="modal"
          id="btnCancelSelectionPersonalC">
          <i class="fas fa-ban"></i> CANCELAR
        </button>
        <button type="button" id="btn-selecionar-Personalc" class="btn btn-primary btn-xs">
          <i class="fas fa-check"></i> SELECCIONAR
        </button>
      </div>
    </div>
  </div>
</div>

<div class="modal" id="modalCargandoSelectedPersonalC" data-backdrop="static" data-keyboard="false" tabindex="-1"
  role="dialog" aria-hidden="true" style="padding-top: 18%; overflow-y: visible;background-color: rgba(0,0,0,.3)">
  <div class="modal-dialog modal-sm">
    <div class="modal-content">
      <div class="modal-body">
        <div class="progress" style="margin-bottom: 0px;height: 15px;">
          <div class="progress-bar progress-bar-striped progress-bar-animated" role="progressbar" aria-valuenow="100"
            aria-valuemin="0" aria-valuemax="100" style="width: 100%;">
            Cargando Personal. . .
          </div>
        </div>
      </div>
    </div>
  </div>
</div>

<!--T: PRODUCTO SELECTED-->
<div id="ventanaModalSelectedPresentacionC" class="modal" tabindex="-1" role="dialog" data-backdrop="static"
  data-keyboard="false" style="padding-top: 2%; overflow-y: visible;background-color: rgba(0,0,0,.2)">
  <div class="modal-dialog" role="document">
    <div class="modal-content" style="border-color: #0085c1; border-width: 4px;">
      <div class="modal-header">
        <h5 class="mb-0" id="titleManagerPresentacionC">
          <strong>[ 0 ] PRODUCTO</strong>
        </h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body pb-0 pt-0">
        <div class="row">
          <div class="col-12">
            <input type="hidden" id="pagePresentacionC" value="1" />
            <form id="FrmPresentacionC" class="search-box mw-100 right-side-icon">
              <input type="search" id="txtFilterPresentacionC" class="form-control form-control-sm mr-3"
                placeholder="INGRESE FILTRO . . ." data-toggle="tooltip" data-placement="left"
                data-original-title="Buscar" />
              <button type="submit" class="search-icon">
                <i class="icon icon-search icon-lg"></i></button>
            </form>

          </div>
          <div class="col-12">
            <div class="table-responsive">
              <table class="table mb-0 table-fluid">
                <thead>
                  <tr>
                    <th class="align-middle text-left">Fecha Vencimiento</th>
                    <th class="align-middle text-left">Producto</th>
                    <th class="align-middle text-left">Stock</th>
                  </tr>
                </thead>
                <tbody id="tbodyPresentacionC"></tbody>
              </table>
            </div>
          </div>
          <div class="col-12" style="display: none">
            <div class="col-sm-4 mt-2">
              <select id="sizePagePresentacionC" class="form-control form-control-sm sisbu-cursor-mano combo-paginar">
                <option value="5">05</option>
                <option value="10">10</option>
                <option value="15">15</option>
              </select>
            </div>
            <div class="col-sm-8 mt-2">
              <nav aria-label="Page navigation">
                <ul id="paginationPresentacionC" class="pagination justify-content-end"></ul>
              </nav>
            </div>
          </div>
        </div>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-outline-primary btn-xs" data-dismiss="modal"
          id="btnCancelSelectionPresentacionC">
          <i class="fas fa-ban"></i> CANCELAR
        </button>
        <button type="button" id="btn-selecionar-Presentacionc" class="btn btn-primary btn-xs">
          <i class="fas fa-check"></i> SELECCIONAR
        </button>
      </div>
    </div>
  </div>
</div>

<div class="modal" id="modalCargandoSelectedPresentacionC" data-backdrop="static" data-keyboard="false" tabindex="-1"
  role="dialog" aria-hidden="true" style="padding-top: 18%; overflow-y: visible;background-color: rgba(0,0,0,.3)">
  <div class="modal-dialog modal-sm">
    <div class="modal-content">
      <div class="modal-body">
        <div class="progress" style="margin-bottom: 0px;height: 15px;">
          <div class="progress-bar progress-bar-striped progress-bar-animated" role="progressbar" aria-valuenow="100"
            aria-valuemin="0" aria-valuemax="100" style="width: 100%;">
            Cargando Presentacion. . .
          </div>
        </div>
      </div>
    </div>
  </div>
</div>