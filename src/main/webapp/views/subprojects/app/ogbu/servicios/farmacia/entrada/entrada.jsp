<%-- Document : entrada Created on : 23/10/2019, 06:15:02 PM Author : Andres
--%>

<div class="row">
  <div class="col-xl-12" id="btnListaEntrada">
    <!-- Card -->
    <div class="card overflow-hidden">
      <!-- Card Header -->
      <div class="card-header bg-transparent">
        <h4 class="mb-0" id="titleManagerEntrada">[ 0 ] ENTRADA</h4>
        <input type="hidden" id="pageEntrada" value="1" />
      </div>
      <!-- /card header -->
      <!-- Card Body -->
      <div class="card-body pt-0">
        <form id="FrmEntrada">
          <div class="input-group search-box" style="max-width: 100%;">
            <input
              type="search"
              id="txtFilterEntrada"
              class="form-control form-control-sm"
              placeholder="Filter Nombre..."
            />
            <div class="input-group-append">
              <span class="search-icon"
                ><i class="icon icon-search icon-lg"></i
              ></span>
              <button type="submit" class="btn btn-primary btn-sm mr-2">
                <i class="icon icon-search icon-fw"></i> BUSCAR
              </button>
            </div>
            <button
              type="button"
              class="btn btn-primary btn-sm"
              id="btnOpenNewEntrada"
              data-toggle="tooltip"
              title="Agregar Entrada"
            >
              <i class="icon icon-addnew"></i>
            </button>
          </div>
        </form>
        <div class="dt-card mt-4">
          <!-- Card Body -->
          <div class="dt-card__body p-0  ">
            <!-- Widget -->
            <div
              class="dt-widget dt-widget-hl-item-space dt-widget-mb-item dt-widget-hover-bg"
              id="tbodyEntrada"
            ></div>
            <!-- /widget -->
            <!-- /card body -->
          </div>
        </div>
        <!-- /card -->
        <!-- /tables -->
        <div class="row mt-2">
          <div class="col-md-2 col-sm-3 col-4">
            <select
              id="sizePageEntrada"
              class="form-control form-control-sm select2-single"
            >
              <option value="10">10</option>
              <option value="15">15</option>
              <option value="20">20</option>
            </select>
          </div>
          <div class="col-md-10 col-sm-9 col-8">
            <nav aria-label="Page navigation example">
              <ul
                id="paginationEntrada"
                class="pagination pagination-sm justify-content-end"
              ></ul>
            </nav>
          </div>
        </div>
      </div>
      <!-- /card body -->
    </div>
    <!-- /card -->
  </div>

  <div class="col-xl-12" id="btnOpenEntrada" style="display: none">
    <!-- Card -->
    <div class="card overflow-hidden p-5">
      <div class="card-header bg-transparent">
        <h4 class="mb-0 text-center" id="txtTituloModalMan">
          ENTRADA
        </h4>
      </div>
      <form id="FrmEntradaModal">
        <div class="row">
          <div class="form-group col-lg-2 "></div>
          <div class="form-group col-lg-4 col-sm-6">
            <label for="txtFechaEntrada">Fecha Ingreso</label>
            <div class="input-group">
              <input
                type="text"
                class="form-control form-control-sm"
                id="txtFechaEntrada"
                placeholder="DD/MM/AAAA"
              />
              <div class="input-group-append">
                <button
                  type="button"
                  id="btnEliminarFechaEntrada"
                  data-toggle="tooltip"
                  title="Eliminar Fecha"
                  class="btn btn-primary btn-sm"
                >
                  <i class="fa fa-trash"></i>
                </button>
              </div>
            </div>
          </div>
          <div class="form-group col-lg-4 col-sm-6">
            <label for="txtPersonalEntrada">Personal </label>
            <div class="input-group">
              <input
                type="text"
                class="form-control form-control-sm"
                id="txtPersonalEntrada"
                aria-describedby="nombre"
                placeholder="Click en el bot�n para seleccionar. . ."
                disabled=""
              />
              <div class="input-group-append">
                <button
                  type="button"
                  id="btnSeleccionarPersonal"
                  class="btn btn-primary btn-sm"
                >
                  <i class="icon icon-subscribe"></i>
                </button>
              </div>
            </div>
          </div>
        </div>
        <!-- Grid Item -->
        <div class="col-xl-12">
          <!-- Entry Header -->
          <div class="dt-entry__header">
            <!-- Entry Heading -->
            <div class="dt-entry__heading">
              <h3 class="dt-entry__title">Detalle Producto</h3>
              
            </div>
            <!-- /entry heading -->
          </div>
          <!-- /entry header -->
          <div class="row">
            <div class="form-group col-lg-4 col-sm-12 col-md-12 col-12">
              <label for="txtFechaVencimientoEntrada">Fecha Vencimiento</label>
              <div class="input-group">
                <input
                  type="text"
                  class="form-control form-control-sm"
                  id="txtFechaVencimientoEntrada"
                  placeholder="DD/MM/AAAA"
                />
                <div class="input-group-append">
                  <button
                    type="button"
                    id="btnEliminarFechaVencimientoEntrada"
                    data-toggle="tooltip"
                    title="Eliminar Fecha"
                    class="btn btn-primary btn-sm"
                  >
                    <i class="fa fa-trash"></i>
                  </button>
                </div>
              </div>
            </div>
            <div class="form-group col-lg-4 col-sm-6 col-md-6 col-6">
              <label for="txtProductoEntrada">Producto </label>
              <div class="input-group">
                <input
                  type="text"
                  class="form-control form-control-sm"
                  id="txtProductoEntrada"
                  aria-describedby="nombre"
                  placeholder="Click en el boton para seleccionar. . ."
                  disabled=""
                />
                <div class="input-group-append">
                  <button
                    type="button"
                    id="btnSeleccionarProducto"
                    class="btn btn-primary btn-sm"
                  >
                    <i class="icon icon-subscribe"></i>
                  </button>
                </div>
              </div>
            </div>
            <div class="form-group col-lg-4  col-sm-6 col-md-6 col-6">
              <label for="txtCantidadProducto">Cantidad</label>

              <div class="input-group">
                <input
                  class="form-control form-control-sm"
                  id="txtCantidadProducto"
                  type="text"
                  placeholder="CANTIDAD"
                  maxlength="6"
                />
                <div class="input-group-append pl-5">
                  <button
                    type="button"
                    id="btnAgregarProducto"
                    class="btn btn-outline-primary btn-sm"
                    data-toggle="tooltip"
                    title="Agregar a la Lista"
                  >
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
              <div
                class="dt-widget dt-widget-hl-item-space dt-widget-mb-item dt-widget-hover-bg"
                id="tbodyDetalleEntrada"
              >
                <div
                  class="dt-widget__item border-success bg-primary text-white mb-0 pl-5"
                >
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
                      Producto
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
          <button
            type="button"
            id="btnRegresar"
            class="btn btn-outline-primary btn-sm"
          >
            <i class="icon icon-reply"></i> CANCELAR
          </button>
          <button type="submit" id="btnGuardar" class="btn btn-primary btn-sm">
            <i class="fas fa-check"></i> GUARDAR
          </button>
        </div>
      </form>
    </div>
    <!-- /card -->
  </div>
</div>

<div
  class="modal fade"
  id="modalCargandoEntrada"
  data-backdrop="static"
  data-keyboard="false"
  tabindex="-1"
  role="dialog"
  style="padding-top: 18%; overflow-y: visible; display: none;"
  aria-hidden="true"
>
  <div class="modal-dialog modal-sm">
    <div class="modal-content">
      <div class="modal-body">
        <div class="progress" style="margin-bottom: 0px;">
          <div
            class="progress-bar progress-bar-striped progress-bar-animated"
            role="progressbar"
            aria-valuenow="100"
            aria-valuemin="0"
            aria-valuemax="100"
            style="width:100%"
          >
            Cargando Entradas. . .
          </div>
        </div>
      </div>
    </div>
  </div>
</div>

<!--T: PERSONAL SELECTED-->
<div
  id="ventanaModalSelectedPersonalC"
  class="modal"
  tabindex="-1"
  role="dialog"
  data-backdrop="static"
  data-keyboard="false"
  style="padding-top: 2%; overflow-y: visible;background-color: rgba(0,0,0,.2)"
>
  <div class="modal-dialog" role="document">
    <div
      class="modal-content"
      style="border-color: #0085c1; border-width: 4px;"
    >
      <div class="modal-header">
        <h5 class="mb-0" id="titleManagerPersonalC">
          <strong>[ 0 ] PERSONAL</strong>
        </h5>
        <button
          type="button"
          class="close"
          data-dismiss="modal"
          aria-label="Close"
        >
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body pb-0 pt-0">
        <div class="row">
          <div class="col-12">
            <input type="hidden" id="pagePersonalC" value="1" />
            <form id="FrmPersonalC">
              <div class="row mt-3">
                <div class="input-group col-12">
                  <input
                    type="text"
                    id="txtFilterPersonalC"
                    class="form-control form-control-sm mr-3"
                    placeholder="INGRESE FILTRO . . ."
                  />
                  <button
                    type="submit"
                    id="btnBuscarPersonalC"
                    class="btn btn-primary btn-xs"
                    data-toggle="tooltip"
                    title="Buscar Pregunta"
                  >
                    <i class="fa fa-search" aria-hidden="true"></i> BUSCAR
                  </button>
                </div>
              </div>
            </form>
            <div class="row pl-5 pr-5 mb-2">
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
            </div>
            <div class="row mt-2 mb-2" style="display: none">
              <div class="col-sm-4 mt-2">
                <select
                  id="sizePagePersonalC"
                  class="form-control form-control-sm sisbu-cursor-mano combo-paginar"
                >
                  <option value="5">05</option>
                  <option value="10">10</option>
                  <option value="15">15</option>
                </select>
              </div>
              <div class="col-sm-8 mt-2">
                <nav aria-label="Page navigation">
                  <ul
                    id="paginationPersonalC"
                    class="pagination justify-content-end"
                  ></ul>
                </nav>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="modal-footer">
        <button
          type="button"
          class="btn btn-outline-primary btn-xs"
          data-dismiss="modal"
          id="btnCancelSelectionPersonalC"
        >
          <i class="fas fa-ban"></i> CANCELAR
        </button>
        <button
          type="button"
          id="btn-selecionar-Personalc"
          class="btn btn-primary btn-xs"
        >
          <i class="fas fa-check"></i> SELECCIONAR
        </button>
      </div>
    </div>
  </div>
</div>

<div
  class="modal"
  id="modalCargandoSelectedPersonalC"
  data-backdrop="static"
  data-keyboard="false"
  tabindex="-1"
  role="dialog"
  aria-hidden="true"
  style="padding-top: 18%; overflow-y: visible;background-color: rgba(0,0,0,.3)"
>
  <div class="modal-dialog modal-sm">
    <div class="modal-content">
      <div class="modal-body">
        <div class="progress" style="margin-bottom: 0px;height: 15px;">
          <div
            class="progress-bar progress-bar-striped progress-bar-animated"
            role="progressbar"
            aria-valuenow="100"
            aria-valuemin="0"
            aria-valuemax="100"
            style="width: 100%;"
          >
            Cargando Personal. . .
          </div>
        </div>
      </div>
    </div>
  </div>
</div>

<!--T: PRODUCTO SELECTED-->
<div
  id="ventanaModalSelectedProductoC"
  class="modal"
  tabindex="-1"
  role="dialog"
  data-backdrop="static"
  data-keyboard="false"
  style="padding-top: 2%; overflow-y: visible;background-color: rgba(0,0,0,.2)"
>
  <div class="modal-dialog" role="document">
    <div
      class="modal-content"
      style="border-color: #0085c1; border-width: 4px;"
    >
      <div class="modal-header">
        <h5 class="mb-0" id="titleManagerProductoC">
          <strong>[ 0 ] PRODUCTO</strong>
        </h5>
        <button
          type="button"
          class="close"
          data-dismiss="modal"
          aria-label="Close"
        >
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body pb-0 pt-0">
        <div class="row">
          <div class="col-12">
            <input type="hidden" id="pageProductoC" value="1" />
            <form id="FrmProductoC">
              <div class="row mt-3">
                <div class="input-group col-12">
                  <input
                    type="text"
                    id="txtFilterProductoC"
                    class="form-control form-control-sm mr-3"
                    placeholder="INGRESE FILTRO . . ."
                  />
                  <button
                    type="submit"
                    id="btnBuscarProductoC"
                    class="btn btn-primary btn-xs"
                    data-toggle="tooltip"
                    title="Buscar Pregunta"
                  >
                    <i class="fa fa-search" aria-hidden="true"></i> BUSCAR
                  </button>
                </div>
              </div>
            </form>
            <div class="row pl-5 pr-5 mb-2">
              <div class="table-responsive">
                <table class="table mb-0 table-fluid">
                  <thead>
                    <tr>
                      <th class="align-middle text-left">Producto</th>
                    </tr>
                  </thead>
                  <tbody id="tbodyProductoC"></tbody>
                </table>
              </div>
            </div>
            <div class="row mt-2 mb-2" style="display: none">
              <div class="col-sm-4 mt-2">
                <select
                  id="sizePageProductoC"
                  class="form-control form-control-sm sisbu-cursor-mano combo-paginar"
                >
                  <option value="5">05</option>
                  <option value="10">10</option>
                  <option value="15">15</option>
                </select>
              </div>
              <div class="col-sm-8 mt-2">
                <nav aria-label="Page navigation">
                  <ul
                    id="paginationProductoC"
                    class="pagination justify-content-end"
                  ></ul>
                </nav>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="modal-footer">
        <button
          type="button"
          class="btn btn-outline-primary btn-xs"
          data-dismiss="modal"
          id="btnCancelSelectionProductoC"
        >
          <i class="fas fa-ban"></i> CANCELAR
        </button>
        <button
          type="button"
          id="btn-selecionar-Productoc"
          class="btn btn-primary btn-xs"
        >
          <i class="fas fa-check"></i> SELECCIONAR
        </button>
      </div>
    </div>
  </div>
</div>

<div
  class="modal"
  id="modalCargandoSelectedProductoC"
  data-backdrop="static"
  data-keyboard="false"
  tabindex="-1"
  role="dialog"
  aria-hidden="true"
  style="padding-top: 18%; overflow-y: visible;background-color: rgba(0,0,0,.3)"
>
  <div class="modal-dialog modal-sm">
    <div class="modal-content">
      <div class="modal-body">
        <div class="progress" style="margin-bottom: 0px;height: 15px;">
          <div
            class="progress-bar progress-bar-striped progress-bar-animated"
            role="progressbar"
            aria-valuenow="100"
            aria-valuemin="0"
            aria-valuemax="100"
            style="width: 100%;"
          >
            Cargando Producto. . .
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
