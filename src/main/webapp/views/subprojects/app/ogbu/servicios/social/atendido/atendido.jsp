<%-- 
    Document   : atendido.jsp
    Created on : 28/08/2019, 09:48:09 AM
    Author     : Andres
--%>

<div class="row">

    <!-- Tab DATOS ATENDIDO -->
    <div class="col-xl-12" id="btnListaAtendido">
        <!-- Card -->
        <div class="card overflow-hidden">
            <!-- Card Header -->
            <div class="card-header bg-transparent">
                <h4 class="mb-0" id="titleManagerAtendido">[ 0 ] ATENDIDOS</h4>
                <input type="hidden" id="pageAtendido" value="1">
            </div>
            <!-- /card header -->
            <!-- Card Body -->
            <div class="card-body pt-0">
                <form id="FrmAtendido">
                    <div class="input-group search-box" style="max-width: 100%;">
                        <input type="text" id="txtFilterAtendido" class="form-control form-control-sm" placeholder="Filter...">
                        <div class="input-group-append">
                            <button type="submit" class="btn btn-primary btn-sm mr-2"><i class="icon icon-search icon-fw"></i> BUSCAR</button>
                        </div>
                        <button type="button" class="btn btn-primary btn-sm" id="btnOpenNewAtendido" data-toggle="tooltip" title="Agregar " ><i class="icon icon-plus icon-fw"></i></button>
                    </div>
                </form>
                <!-- Tables -->
                <!-- Card -->
                <div class=" pb-4 ">

                    <!-- Card Header -->
                    <div class="dt-card__header mb-3">

                        <!-- Card Heading -->
                        <div class="dt-card__heading">

                            <!-- Widget Item -->
                            <div class="dt-widget__item border-bottom" >

                                <!-- Widget Info -->
                                <div class="dt-widget__info text-truncate">
                                    <h3 class="dt-card__title">DNI</h3>
                                </div>
                                <!-- /widget info -->

                                <!-- Widget Info -->
                                <div class="dt-widget__info text-truncate">
                                    <h3 class="dt-card__title">NOMBRE</h3>
                                </div>
                                <!-- /widget info -->
                                <!-- Widget Info -->
                                <div class="dt-widget__info text-truncate">
                                    <h3 class="dt-card__title">FECHA NACIMIENTO</h3>
                                </div>
                                <!-- /widget info -->
                                <!-- Widget Info -->
                                <div class="dt-widget__info text-truncate">
                                    <h3 class="dt-card__title">EMAIL</h3>
                                </div>
                                <!-- /widget info -->
                                <!-- Widget Info -->
                                <div class="dt-widget__info text-truncate">
                                    <h3 class="dt-card__title">ESCUELA</h3>
                                </div>
                                <!-- /widget info -->
                            </div>
                            <!-- /widgets item -->

                        </div>
                        <!-- /card heading -->

                    </div>
                    <!-- /card header -->

                    <!-- Card Body -->
                    <div class="dt-card__body p-0  " >
                        <!-- Widget -->
                        <div class="dt-widget dt-widget-hover ps-custom-scrollbar ps ps--active-y" id="tbodyAtendido">

                        </div>
                        <!-- /widget -->
                        <!-- /card body -->

                    </div>
                    <!-- /card -->

                </div>

                <!-- /tables -->
                <div class="row mt-2">
                    <div class="col-md-2 col-sm-3 col-4">
                        <select id="sizePageAtendido" class="form-control form-control-sm select2-single">
                            <option value="10">10</option>
                            <option value="15">15</option>
                            <option value="20">20</option>
                        </select>
                    </div>
                    <div class="col-md-10 col-sm-9 col-8">
                        <nav aria-label="Page navigation example">
                            <ul id="paginationAtendido" class="pagination pagination-sm justify-content-end">
                            </ul>
                        </nav>  
                    </div>
                </div>
            </div>
            <!-- /card body -->
        </div>
        <!-- /card -->

    </div>

    <div class="col-xl-12" id="btnOpenAtendido" style="display:none;">
        <!-- Card -->
        <div class="card overflow-hidden p-5">
            <div class="card-header bg-transparent">
                <h4 class="mb-0 text-center" id="txtTituloModalMan"> ATENDIDO</h4>

            </div>
            <form id="FrmAtendidoModal" autocomplete="off"> 

                <div class="row">
                    <div class="col-lg-4 col-sm-6">
                        <div class="form-group">
                            <label for="txtTipoDocumentoAtendido">TIPO DE DOCUMENTO</label>
                            <select  class="form-control form-control-sm sisbu-cursor-mano" id="txtTipoDocumentoAtendido" disabled="">
                                <option  value="1">DNI</option>
                                <option  value="2">CARNET DE EXTRANJERIA</option>
                                <option  value="3">OTRO</option>
                            </select>
                        </div>
                    </div>
                    <div class="col-lg-4 col-sm-6">
                        <div class="form-group">
                            <label for="txtModalidadAtendido">MODALIDAD DE INGRESO</label>
                            <select  class="form-control form-control-sm sisbu-cursor-mano" id="txtModalidadAtendido">
                                <option   value="100">Seleccione. . .</option>
                                <option   value="1">EXAMEN ORDINARIO</option>
                                <option  value="2">DEPORTISTA CALIFICADO</option>
                                <option  value="3">PRIMEROS PUESTOS</option>
                                <option  value="4">INGRESANTE CPU</option>
                                <option  value="5">CAMBIO DE UNIVERSIDAD</option>
                                <option  value="6">GRADUADOS O TITULADOS</option>
                                <option  value="7">5TO DE SECUNDARIA</option>
                                <option  value="8">OTRO</option>
                            </select>
                        </div>
                    </div>
                    <div class="col-lg-4 col-sm-6">
                        <div class="form-group">
                            <label for="txtTipoColegioAtendido">TIPO DE COLEGIO</label>
                            <select  class="form-control form-control-sm sisbu-cursor-mano" id="txtTipoColegioAtendido">
                                <option   value="-1">Seleccione. . .</option>
                                <option   value="1">NACIONAL</option>
                                <option  value="2">PARTICULAR</option>
                                <option  value="3">OTRO</option>
                            </select>
                        </div>
                    </div>
                    <div class="col-lg-4 col-sm-6">
                        <div class="form-group">
                            <label for="txtEstadoAtendido">ESTADO CIVIL</label>
                            <select  class="form-control form-control-sm sisbu-cursor-mano" id="txtEstadoAtendido">
                                <option  value="-1">Seleccionar...</option>
                                <option  value="1">SOLTERO(A)</option>
                                <option  value="2">CASADO(A)</option>
                                <option  value="3">DIVORSIADO(A)</option>
                                <option  value="4">VIUDO(A)</option>
                            </select>
                        </div>
                    </div>

                    <div class="col-lg-4 col-sm-6">
                        <div class="form-group">
                            <label for="txtCodigoAtendido">CÓDIGO
                                <i class="fa fa-question-circle" aria-hidden="true" data-toggle="popover" data-trigger="hover" data-placement="top" title="" data-content="Es el código único de estudiante. Si aún no sabes cual es tu código, deja la caja de texto en blanco" style="cursor: pointer" data-original-title=""></i>
                            </label>
                            <input  type="text" class="form-control form-control-sm" id="txtCodigoAtendido" placeholder="Ingrese Código. . ." maxlength="7">
                        </div>
                    </div>
                    <div class="col-lg-4 col-sm-6">
                        <div class="form-group">
                            <label for="txtNumeroDocumentoAtendido">N° DOCUMENTO</label>
                            <input  type="text" class="form-control form-control-sm" id="txtNumeroDocumentoAtendido" placeholder="Ingrese n° documento. . ." maxlength="8">
                        </div>
                    </div>
                    <div class="col-lg-4 col-sm-6">
                        <div class="form-group">
                            <label for="txtApPaternoAtendido">AP. PATERNO</label>
                            <input  type="text" class="form-control form-control-sm" id="txtApPaternoAtendido" placeholder="AP. PATERNO" maxlength="45">
                        </div>
                    </div>
                    <div class="col-lg-4 col-sm-6">
                        <div class="form-group">
                            <label for="txtApMaternoAtendido">AP. MATERNO</label>
                            <input  type="text" class="form-control form-control-sm" id="txtApMaternoAtendido" placeholder="AP. MATERNO" maxlength="45">
                        </div>
                    </div>
                    <div class="col-lg-4 col-sm-6">
                        <div class="form-group">
                            <label for="txtNombreAtendido">NOMBRES</label>
                            <input  type="text" class="form-control form-control-sm" id="txtNombreAtendido" placeholder="NOMBRES" maxlength="45">
                        </div>
                    </div>
                    <div class="col-lg-4 col-sm-6">
                        <div class="form-group">
                            <label for="txtSexoAtendido">SEXO</label>
                            <select  class="form-control form-control-sm" id="txtSexoAtendido">
                                <option value="-1">Seleccione. . .</option>
                                <option value="1">MASCULINO</option>
                                <option  value="2">FEMENINO</option>
                                <option  value="3">OTRO</option>
                            </select>
                        </div>
                    </div>
                    <div class="col-lg-4 col-sm-6 mb-3">
                        <label for="txtFechaNacAtendido">FECHA DE NACIMIENTO</label>
                        <div class="input-group">
                            <input  type="text" class="form-control form-control-sm " id="txtFechaNacAtendido" placeholder="DD/MM/AAAA">
                            <div class="input-group-append">
                                <button type="button" id="btnEliminarFechaNacAtendido" data-toggle="tooltip" title="Eliminar Fecha" class="btn btn-primary btn-sm"><i class="fa fa-trash"></i></button>
                            </div>
                        </div>
                    </div>
                    <div class="col-lg-4 col-sm-6">
                        <div class="form-group">
                            <label for="txtCelularAtendido">CELULAR</label>
                            <input  type="number" class="form-control form-control-sm" id="txtCelularAtendido" placeholder="Ingrese celular. . ." maxlength="9">
                        </div>
                    </div>
                    <div class="col-lg-4 col-sm-12">
                        <div class="form-group">
                            <label for="txtEmailAtendido">EMAIL</label>
                            <input  type="email" class="form-control form-control-sm" id="txtEmailAtendido" placeholder="EMAIL" maxlength="100">
                        </div>
                    </div>
                    <div class="col-lg-8 col-12 mb-3">
                        <label for="txtEscuelaAtendido">ESCUELA
                            <i class="fa fa-question-circle" aria-hidden="true" data-toggle="popover" data-trigger="hover" data-placement="top" title="" data-content="Carrera profesional a la que ingresaste" style="cursor: pointer" data-original-title=""></i>
                        </label>
                        <div class="input-group">
                            <input type="text" class="form-control form-control-sm" id="txtEscuelaAtendido" aria-describedby="nombre" placeholder="Click en el botón para seleccionar. . ." disabled="">
                            <div class="input-group-append">
                                <button type="button" id="btnSeleccionarEscuela" class="btn btn-primary btn-sm"><i class="icon icon-subscribe"></i></button>
                            </div>
                        </div>
                    </div>
                    <div class="col-sm-12">
                        <div class="form-group">
                            <label for="txtDireccionActualAtendido">DIRECCION ACTUAL
                                <i class="fa fa-question-circle" aria-hidden="true" data-toggle="popover" data-trigger="hover" data-placement="top" title="" data-content="Dirección donde vives actualmente. Si vives en un caserío ingresa tu dirección y luego agrega tu caserío separado por un guión. Ejm: #LOS PINOS - SAN MARTÍN" style="cursor: pointer" data-original-title=""></i>
                            </label>
                            <input  type="text" class="form-control form-control-sm" id="txtDireccionActualAtendido" placeholder="Ingrese dirección actual. . ." maxlength="80">
                        </div>
                    </div>
                    <div class="col-sm-12">
                        <div class="form-group">
                            <label for="txtDireccionProceAtendido">DIRECCION PROCEDENCIA
                                <i class="fa fa-question-circle" aria-hidden="true" data-toggle="popover" data-trigger="hover" data-placement="top" title="" data-content="Dirección de donde vienes. Si vienes de un caserío ingresa tu dirección y luego agrega tu caserío separado por un guión. Ejm: #LOS ROSALES - SAN JUAN" style="cursor: pointer" data-original-title=""></i>
                            </label>
                            <input  type="text" class="form-control form-control-sm" id="txtDireccionProceAtendido" placeholder="Ingrese dirección de procedencia" maxlength="80">
                        </div>
                    </div>
                    <div class="col-lg-6 col-12 mb-3">
                        <label for="txtDistritoActualAtendido">DISTRITO ACTUAL</label>
                        <div class="input-group">
                            <input type="text" class="form-control form-control-sm" id="txtDistritoActualAtendido" aria-describedby="nombre" placeholder="Click en el botón para seleccionar. . ." disabled="">
                            <div class="input-group-append">
                                <button type="button" id="btnSeleccionarDistritoActual" class="btn btn-primary btn-sm"><i class="icon icon-subscribe"></i></button>
                            </div>
                        </div>
                    </div>
                    <div class="col-lg-6 col-12 mb-3">
                        <label for="txtDistritoProcedenciaAtendido">DISTRITO PROCEDENCIA</label>
                        <div class="input-group">
                            <input type="text" class="form-control form-control-sm" id="txtDistritoProcedenciaAtendido" aria-describedby="nombre" placeholder="Click en el botón para seleccionar. . ." disabled="">
                            <div class="input-group-append">
                                <button type="button" id="btnSeleccionarDistritoProcedencia" class="btn btn-primary btn-sm"><i class="icon icon-subscribe"></i></button>
                            </div>
                        </div>
                    </div>
                    <div class="col-lg-12 text-left mt-3">
                        <button type="button" id="btnRegresar" class="btn btn-outline-primary btn-sm" ><i class="icon icon-reply"></i> CANCELAR</button>
                        <button type="submit" class="btn btn-outline-primary btn-sm" id="btnGuardarPersonales">ACTUALIZAR DATOS</button>
                    </div> 

                </div>
            </form>
        </div>
        <!-- /card -->
    </div>

    <!-- Tab DATOS USUARIO -->
    <div class="col-xl-12" id="btnOpenUsuario" style="display:none;">
        <!-- Card -->
        <div class="card overflow-hidden p-5">
            <div class="card-header bg-transparent">
                <h4 class="mb-0 text-center" id="txtTituloUsuario"> USUARIO</h4>

            </div>
            <form id="FrmUsuarioModal"> 
                <div class="row">
                    <div class="form-group col-6">
                        <label for="txtNombreUsuario">ACTUALIZAR USUARIO</label>
                        <input class="form-control form-control-sm" id="txtNombreUsuario" type="text" placeholder="TÍTULO">
                    </div>
                    <div class="form-group col-6">
                        <label for="txtLoginUsuario">LOGIN</label>
                        <input class="form-control form-control-sm" id="txtLoginUsuario" type="text" placeholder="LOGIN">
                    </div>
                    <div class="form-group col-6">
                        <label for="txtPassUsuario">CONTRASEÑA</label>
                        <div class="input-group">
                            <input class="form-control form-control-sm" id="txtPassUsuario" type="text" placeholder="Ingrese password. . .">
                            <div class="input-group-append">
                                <button type="button" class="btn btn-sm btn-primary" id="btnMostrarPass">
                                    <i id="icono_mostrar_pass" class="fas fa-eye-slash"></i>
                                </button>
                            </div>
                        </div>

                    </div>
                    <div class="form-group col-6">
                        <label for="txtEstadoUsuario">ESTADO</label>
                        <select class="form-control form-control-sm" id="txtEstadoUsuario">
                            <option selected value="1">HABILITADO</option>
                            <option value="2">DESHABILITADO</option>

                        </select>
                    </div>
                    <div class="form-group col-6">
                        <label for="txtTipoPefilUsuario">TIPO PERFIL</label>
                        <select class="form-control form-control-sm" id="txtTipoPefilUsuario">
                            <option selected value="1000">CACHIMBOS</option>
                            <option value="1100">NORMAL</option>
                            <option value="1110">OTRO</option>

                        </select>
                    </div>

                    <div class="form-group col-12 text-center">
                        <button type="button" id="btnRegresarUsuario" class="btn btn-outline-primary btn-sm" ><i class="icon icon-reply"></i> CANCELAR</button>
                        <button type="submit" id="btnGuardarUsuario" class="btn btn-primary btn-sm">ACTUALIZAR</button>

                    </div>
                </div>
            </form>
        </div>
        <!-- /card -->
    </div>

    <!-- Tab DATOS FAMILIARES -->
    <div class="col-xl-12" id="btnOpenFamiliar" style="display:none;">
        <div class="form-row">
            <div class="col-11 text-center">
                <label id="titleManagerFamiliar" for="normal-input-3" class="col-form-label col-form-label-lg text-sm-center text-primary">LISTA DE FAMILIARES</label>
                <input type="hidden" id="pageTriaje" value="1">
            </div>

            <div class="float-right">
                <button type="button" class="btn btn-primary btn-sm" id="btnOpenNewFamiliar" data-toggle="tooltip" title="Agregar Familiar" ><i class="icon icon-plus icon-fw"></i></button>
            </div>
        </div>

        <div class="form-group col-12 ">
            <!-- Tables -->
            <div class="table-responsive">
                <table class="table mb-0">
                    <thead class="bg-primary" style="line-height: 1.0;">
                        <tr>
                            <th class="text-uppercase text-white" scope="col" style="font-weight: 500;width: 10%">ACCIÓN</th>
                            <th class="text-uppercase text-white" scope="col" style="font-weight: 500;">NOMBRE COMPLETO</th>
                            <th class="text-uppercase text-white" scope="col" style="font-weight: 500;width: 10%">FECHA NACIMIENTO</th>
                            <th class="text-uppercase text-white" scope="col" style="font-weight: 500;width: 20%">ESTADO CIVIL/<br>NIVEL INSTRUCCIÓN</th>
                            <th class="text-uppercase text-white" scope="col" style="font-weight: 500;width: 10%">INGRESOS</th>

                        </tr>
                    </thead>
                    <tbody id="tbodyDatosFamiliares" class="overflow-auto" >
                    </tbody>
                </table>
            </div>
            <!-- /tables -->
        </div>

        <div class="form-group col-12 text-center">
            <button type="button" id="btnRegresarFamiliar" class="btn btn-outline-primary btn-sm" ><i class="icon icon-reply"></i> REGRESAR</button>

        </div>

    </div>
    <!-- /tab pane-->

</div>

<div class="modal fade" id="modalCargandoAtendido" data-backdrop="static" data-keyboard="false" tabindex="-1" role="dialog" style="padding-top: 18%; overflow-y: visible; display: none;" aria-hidden="true">
    <div class="modal-dialog modal-sm">
        <div class="modal-content">
            <div class="modal-body">
                <div class="progress" style="margin-bottom: 0px;">
                    <div class="progress-bar progress-bar-striped progress-bar-animated" role="progressbar" aria-valuenow="100" aria-valuemin="0" aria-valuemax="100" style="width:100%">
                        Cargando Atendidos. . .
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>

<div class="modal fade" id="modalCargandoUsuario" data-backdrop="static" data-keyboard="false" tabindex="-1" role="dialog" style="padding-top: 18%; overflow-y: visible; display: none;" aria-hidden="true">
    <div class="modal-dialog modal-sm">
        <div class="modal-content">
            <div class="modal-body">
                <div class="progress" style="margin-bottom: 0px;">
                    <div class="progress-bar progress-bar-striped progress-bar-animated" role="progressbar" aria-valuenow="100" aria-valuemin="0" aria-valuemax="100" style="width:100%">
                        Cargando Usuarios. . .
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>

<!--T: FAMILIARES SELECTED-->
<div class="modal fade overflow-auto" id="ventanaModalFamiliar" data-backdrop="static"
     tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-lg" role="document">
        <div class="modal-content">

            <div class="modal-header">
                <h6  class="modal-title" id="txtTituloModalFamiliar"></h6>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">×</span>
                </button>
            </div>
            <form id="FrmFamiliarAtendido" autocomplete="off">
                <div class="modal-body">
                    <div class="row" >
                        <div class="col-lg-6">
                            <div class="form-group ">
                                <label for="txtNombreFamiliar">NOMBRE COMPLETO</label>
                                <input  type="text" class="form-control form-control-sm" id="txtNombreFamiliar" placeholder="Ingrese nombre completo. . ." maxlength="100">
                            </div>
                        </div>

                        <div class="col-lg-6">
                            <div class="form-group ">
                                <label for="txtParentescoFamiliar">PARENTESCO</label>
                                <select class="form-control form-control-sm sisbu-cursor-mano" id="txtParentescoFamiliar">
                                    <option value="-1">Seleccione. . .</option>
                                    <option value="1">PAPÁ</option>
                                    <option value="2">MAMÁ</option>
                                    <option value="3">HERMANO(A)</option>
                                    <option value="4">TIO(A)</option>
                                    <option value="5">OTRO</option>

                                </select>
                            </div>
                        </div>
                        <div class="col-lg-6 mb-3">
                            <label for="txtFechaNaciFamiliar">FECHA NACIMIENTO
                                <i class="fa fa-question-circle" aria-hidden="true" data-toggle="popover" data-trigger="hover" data-placement="top" title="" data-content="Si no sabes puedes dejar la caja de texto en blanco" style="cursor: pointer" data-original-title=""></i>
                            </label>
                            <div class="input-group ">
                                <input  type="text" class="form-control form-control-sm" id="txtFechaNaciFamiliar" placeholder="DD/MM/AAAA">
                                <div class="input-group-append">
                                    <button type="button" id="btnEliminarFechaNacFamiliar" data-toggle="tooltip" title="Eliminar Fecha" class="btn btn-primary btn-sm"><i class="fa fa-trash"></i></button>
                                </div>
                            </div>
                        </div>
                        <div class="col-lg-6">
                            <div class="form-group ">
                                <label for="txtEstadoFamiliar">ESTADO CIVIL</label>
                                <select class="form-control form-control-sm sisbu-cursor-mano" id="txtEstadoFamiliar">
                                    <option value="-1">seleccione. . .</option>
                                    <option value="1">SOLTERO</option>
                                    <option value="2">CASADO</option>
                                    <option value="3">DIVORCIADO</option>
                                </select>
                            </div>
                        </div>
                        <div class="col-lg-6">
                            <div class="form-group ">
                                <label for="txtNivelInstFamiliar">NIVEL INSTRUCCIÓN</label>
                                <select class="form-control form-control-sm sisbu-cursor-mano" id="txtNivelInstFamiliar">
                                    <option value="-1">seleccione. . .</option>
                                    <option value="1">SIN ESTUDIOS</option>
                                    <option value="2">PRIMARIA</option>
                                    <option value="3">SECUNDARIA</option>
                                    <option value="4">TÉCNICO</option>
                                    <option value="5">UNIVERSIDAD</option>
                                </select>
                            </div>
                        </div>

                        <div class="col-lg-6">
                            <div class="form-group ">
                                <label for="txtIngresosFamiliar">INGRESOS
                                    <i class="fa fa-question-circle" aria-hidden="true" data-toggle="popover" data-trigger="hover" data-placement="top" title="" data-content="Coloca el monto mensual que tiene de ingresos tu familiar" style="cursor: pointer" data-original-title=""></i>
                                </label>
                                <input type="number" class="form-control form-control-sm" id="txtIngresosFamiliar" placeholder="INGRESOS">
                            </div>
                        </div>
                        <div class="col-lg-6 mb-3">
                            <label for="txtOcupacionAtendido">OCUPACIÓN
                                <i class="fa fa-question-circle" aria-hidden="true" data-toggle="popover" data-trigger="hover" data-placement="top" title="" data-content="Es a lo que se dedica tu familiar" style="cursor: pointer" data-original-title=""></i>
                            </label>
                            <div class="input-group">
                                <input type="text" class="form-control form-control-sm" id="txtOcupacionAtendido" aria-describedby="nombre" placeholder="Click en el botón para seleccionar. . ." disabled="">
                                <div class="input-group-append">
                                    <button type="button" id="btnSeleccionarOcupacion" class="btn btn-primary btn-sm"><i class="icon icon-subscribe"></i></button>
                                </div>
                            </div>
                        </div>
                        <div class="col-lg-6 mb-3">
                            <label for="txtDistritoAtendido">DISTRITO PROCEDENCIA
                                <i class="fa fa-question-circle" aria-hidden="true" data-toggle="popover" data-trigger="hover" data-placement="top" title="" data-content="Es el distrito donde nacio tu familiar" style="cursor: pointer" data-original-title=""></i>
                            </label>
                            <div class="input-group">
                                <input type="text" class="form-control form-control-sm" id="txtDistritoAtendido" aria-describedby="nombre" placeholder="Click en el botón para seleccionar. . ." disabled="">
                                <div class="input-group-append">
                                    <button type="button" id="btnSeleccionarDistritoFamiliar" class="btn btn-primary btn-sm"><i class="icon icon-subscribe"></i></button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="modal-footer">
                    <button type="button" class="btn btn-outline-primary btn-sm" data-dismiss="modal">CANCELAR</button>
                    <button type="submit" class="btn btn-primary btn-sm" id="btnGuardarAddMenus">GUARDAR</button>
                </div>
            </form>
        </div>
    </div>
</div>

<div class="modal fade" id="modalCargandoFamiliar" data-backdrop="static" data-keyboard="false" tabindex="-1" role="dialog" style="padding-top: 18%; overflow-y: visible; display: none;background-color: rgba(0,0,0,.2)" aria-hidden="true">
    <div class="modal-dialog modal-sm">
        <div class="modal-content">
            <div class="modal-body">
                <div class="progress" style="margin-bottom: 0px;">
                    <div class="progress-bar progress-bar-striped progress-bar-animated" role="progressbar" aria-valuenow="100" aria-valuemin="0" aria-valuemax="100" style="width:100%">
                        Cargando familiares. . .
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>

<!--T: DISTRITO SELECTED-->
<div id="ventanaModalSelectedDistritoC" class="modal" tabindex="-1" role="dialog" data-backdrop="static"
     data-keyboard="false" style="padding-top: 2%; overflow-y: visible;background-color: rgba(0,0,0,.2)">
    <div class="modal-dialog modal-lg" role="document">
        <div class="modal-content" style="border-color: #0085c1; border-width: 4px;">
            <div class="modal-header">
                <h5 class="mb-0" id="titleManagerDistritoC"><strong>[ 0 ]
                        DISTRITOS</strong></h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body pb-0 pt-0">
                <div class="row">
                    <div class="col-12">
                        <input type="hidden" id="pageDistritoC"
                               value="1">
                        <form id="FrmDistritoC">
                            <div class="row mt-3">
                                <div class="input-group col-12">
                                    <input type="text" id="txtFilterDistritoC"
                                           class="form-control form-control-sm mr-3" placeholder="INGRESE FILTRO . . .">
                                    <button type="submit" id="btnBuscarDistritoC"
                                            class="btn btn-primary btn-xs" data-toggle="tooltip"
                                            title="Buscar Pregunta"><i class="fa fa-search" aria-hidden="true"></i>
                                        BUSCAR</button>
                                </div>
                            </div>
                        </form>
                        <div class="row pl-5 pr-5 mb-2">
                            <div class="table-responsive">
                                <table class="table mb-0 table-fluid">
                                    <thead>
                                        <tr>
                                            <th class="align-middle text-left">Distrito</th>
                                        </tr>
                                    </thead>
                                    <tbody id="tbodyDistritoC">
                                    </tbody>
                                </table>
                            </div>
                        </div>
                        <div class="row mt-2 mb-2" style="display: none">
                            <div class="col-sm-4 mt-2">
                                <select id="sizePageDistritoC"
                                        class="form-control form-control-sm sisbu-cursor-mano combo-paginar">
                                    <option value="5">05</option>
                                    <option value="10">10</option>
                                    <option value="15">15</option>
                                </select>
                            </div>
                            <div class="col-sm-8 mt-2">
                                <nav aria-label="Page navigation">
                                    <ul id="paginationDistritoC"
                                        class="pagination justify-content-end">

                                    </ul>
                                </nav>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-outline-primary btn-xs" data-dismiss="modal" id="btnCancelSelectionDistritoC"><i class="fas fa-ban"></i>
                    CANCELAR</button>
                <button type="button" id="btn-selecionar-distritoc" class="btn btn-primary btn-xs"><i
                        class="fas fa-check"></i> SELECCIONAR</button>
            </div>
        </div>
    </div>
</div>

<div class="modal" id="modalCargandoSelectedDistritoC" data-backdrop="static" data-keyboard="false" tabindex="-1"
     role="dialog" aria-hidden="true" style="padding-top: 18%; overflow-y: visible;background-color: rgba(0,0,0,.3)">
    <div class="modal-dialog modal-sm">
        <div class="modal-content">
            <div class="modal-body">
                <div class="progress" style="margin-bottom: 0px;height: 15px;">
                    <div class="progress-bar progress-bar-striped progress-bar-animated" role="progressbar"
                         aria-valuenow="100" aria-valuemin="0" aria-valuemax="100" style="width: 100%;">
                        Cargando distritos. . .
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>

<!--T: ESCUELA SELECTED-->
<div id="ventanaModalSelectedEscuelaC" class="modal" tabindex="-1" role="dialog" data-backdrop="static"
     data-keyboard="false" style="padding-top: 2%; overflow-y: visible;background-color: rgba(0,0,0,.2)">
    <div class="modal-dialog" role="document">
        <div class="modal-content" style="border-color: #0085c1; border-width: 4px;">
            <div class="modal-header">
                <h5 class="mb-0" id="titleManagerEscuelaC"><strong>[ 0 ]
                        ESCUELAS</strong></h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body pb-0 pt-0">
                <div class="row">
                    <div class="col-12">
                        <input type="hidden" id="pageEscuelaC"
                               value="1">
                        <form id="FrmEscuelaC">
                            <div class="row mt-3">
                                <div class="input-group col-12">
                                    <input type="text" id="txtFilterEscuelaC"
                                           class="form-control form-control-sm mr-3" placeholder="INGRESE FILTRO . . .">
                                    <button type="submit" id="btnBuscarEscuelaC"
                                            class="btn btn-primary btn-xs" data-toggle="tooltip"
                                            title="Buscar Pregunta"><i class="fa fa-search" aria-hidden="true"></i>
                                        BUSCAR</button>
                                </div>
                            </div>
                        </form>
                        <div class="row pl-5 pr-5 mb-2">
                            <div class="table-responsive">
                                <table class="table mb-0 table-fluid">
                                    <thead>
                                        <tr>
                                            <th class="align-middle text-left">Escuela</th>
                                        </tr>
                                    </thead>
                                    <tbody id="tbodyEscuelaC">
                                    </tbody>
                                </table>
                            </div>
                        </div>
                        <div class="row mt-2 mb-2" style="display: none">
                            <div class="col-sm-4 mt-2">
                                <select id="sizePageEscuelaC"
                                        class="form-control form-control-sm sisbu-cursor-mano combo-paginar">
                                    <option value="5">05</option>
                                    <option value="10">10</option>
                                    <option value="15">15</option>
                                </select>
                            </div>
                            <div class="col-sm-8 mt-2">
                                <nav aria-label="Page navigation">
                                    <ul id="paginationEscuelaC"
                                        class="pagination justify-content-end">

                                    </ul>
                                </nav>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-outline-primary btn-xs" data-dismiss="modal" id="btnCancelSelectionEscuelaC"><i class="fas fa-ban"></i>
                    CANCELAR</button>
                <button type="button" id="btn-selecionar-escuelac" class="btn btn-primary btn-xs"><i
                        class="fas fa-check"></i> SELECCIONAR</button>
            </div>
        </div>
    </div>
</div>

<div class="modal" id="modalCargandoSelectedEscuelaC" data-backdrop="static" data-keyboard="false" tabindex="-1"
     role="dialog" aria-hidden="true" style="padding-top: 18%; overflow-y: visible;background-color: rgba(0,0,0,.3)">
    <div class="modal-dialog modal-sm">
        <div class="modal-content">
            <div class="modal-body">
                <div class="progress" style="margin-bottom: 0px;height: 15px;">
                    <div class="progress-bar progress-bar-striped progress-bar-animated" role="progressbar"
                         aria-valuenow="100" aria-valuemin="0" aria-valuemax="100" style="width: 100%;">
                        Cargando escuelas. . .
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>


<!--T: OCUPACION SELECTED-->
<div id="ventanaModalSelectedOcupacionC" class="modal" tabindex="-1" role="dialog" data-backdrop="static"
     data-keyboard="false" style="padding-top: 2%; overflow-y: visible;background-color: rgba(0,0,0,.2)">
    <div class="modal-dialog" role="document">
        <div class="modal-content" style="border-color: #0085c1; border-width: 4px;">
            <div class="modal-header">
                <h5 class="mb-0" id="titleManagerOcupacionC"><strong>[ 0 ]
                        OCUPACIONES</strong></h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body pb-0 pt-0">
                <div class="row">
                    <div class="col-12">
                        <input type="hidden" id="pageOcupacionC"
                               value="1">
                        <form id="FrmOcupacionC">
                            <div class="row mt-3">
                                <div class="input-group col-12">
                                    <input type="text" id="txtFilterOcupacionC"
                                           class="form-control form-control-sm mr-3" placeholder="INGRESE FILTRO . . .">
                                    <button type="submit" id="btnBuscarOcupacionC"
                                            class="btn btn-primary btn-xs" data-toggle="tooltip"
                                            title="Buscar Pregunta"><i class="fa fa-search" aria-hidden="true"></i>
                                        BUSCAR</button>
                                </div>
                            </div>
                        </form>
                        <div class="row pl-5 pr-5 mb-2">
                            <div class="table-responsive">
                                <table class="table mb-0 table-fluid">
                                    <thead>
                                        <tr>
                                            <th class="align-middle text-left">Ocupación</th>
                                        </tr>
                                    </thead>
                                    <tbody id="tbodyOcupacionC">
                                    </tbody>
                                </table>
                            </div>
                        </div>
                        <div class="row mt-2 mb-2" style="display: none">
                            <div class="col-sm-4 mt-2">
                                <select id="sizePageOcupacionC"
                                        class="form-control form-control-sm sisbu-cursor-mano combo-paginar">
                                    <option value="5">05</option>
                                    <option value="10">10</option>
                                    <option value="15">15</option>
                                </select>
                            </div>
                            <div class="col-sm-8 mt-2">
                                <nav aria-label="Page navigation">
                                    <ul id="paginationOcupacionC"
                                        class="pagination justify-content-end">

                                    </ul>
                                </nav>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-outline-primary btn-xs" data-dismiss="modal" id="btnCancelSelectionOcupacionC"><i class="fas fa-ban"></i>
                    CANCELAR</button>
                <button type="button" id="btn-selecionar-ocupacionc" class="btn btn-primary btn-xs"><i
                        class="fas fa-check"></i> SELECCIONAR</button>
            </div>
        </div>
    </div>
</div>

<div class="modal" id="modalCargandoSelectedOcupacionC" data-backdrop="static" data-keyboard="false" tabindex="-1"
     role="dialog" aria-hidden="true" style="padding-top: 18%; overflow-y: visible;background-color: rgba(0,0,0,.3)">
    <div class="modal-dialog modal-sm">
        <div class="modal-content">
            <div class="modal-body">
                <div class="progress" style="margin-bottom: 0px;height: 15px;">
                    <div class="progress-bar progress-bar-striped progress-bar-animated" role="progressbar"
                         aria-valuenow="100" aria-valuemin="0" aria-valuemax="100" style="width: 100%;">
                        Cargando ocupaciones. . .
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
