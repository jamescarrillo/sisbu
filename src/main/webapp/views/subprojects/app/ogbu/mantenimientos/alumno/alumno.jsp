<%-- 
    Document   : comida.jsp
    Created on : 28/08/2019, 09:48:09 AM
    Author     : Andres
--%>

<div class="row">
    <div class="col-xl-12">
        <!-- Card -->
        <div class="card overflow-hidden" id="btnListaAlumno">
            <!-- Card Header -->
            <div class="card-header bg-transparent">
                <h4 class="mb-0" id="titleManagerAlumno">[ 0 ] PERSONAL</h4>
                <input type="hidden" id="pageAlumno" value="1">
            </div>
            <!-- /card header -->
            <!-- Card Body -->
            <div class=" card-body pt-0">
                <form id="FrmAlumno" >
                    <div class="input-group search-box" style="max-width: 100%;">
                        <input type="search" id="txtFilterDniAlumno" class="form-control form-control-sm" placeholder="FILTRO DNI">
                        <div class="input-group-append">
                            <span class="search-icon"><i class="icon icon-search icon-lg"></i></span>
                            <button type="submit" class="btn btn-primary btn-sm mr-2"><i class="icon icon-search icon-fw"></i> BUSCAR</button>
                        </div>
                        <button type="button" class="btn btn-primary btn-sm" id="btnOpenNewAlumno"data-toggle="tooltip" title="Agregar Alumno" ><i class="icon icon-addnew"></i></button>
                    </div>
                </form>

                <!-- Card -->
                <div class=" pb-4 ">

                    <!-- Card Header -->
                    <div class="dt-card__header mb-3 p-0 pt-3">

                        <!-- Card Heading -->
                        <div class="dt-card__heading">

                            <!-- Widget Item -->
                            <div class="dt-widget__item border-bottom bg-primary pb-2" >

                                <!-- Widget Info -->
                                <div class="dt-widget__info text-truncate">
                                    <h3 class="dt-card__title text-white">DNI</h3>
                                </div>
                                <!-- /widget info -->

                                <!-- Widget Info -->
                                <div class="dt-widget__info text-truncate">
                                    <h3 class="dt-card__title text-white">NOMBRE /<br>FECHA NACIMIENTO</h3>
                                </div>
                                <!-- /widget info -->

                                <!-- Widget Info -->
                                <div class="dt-widget__info text-truncate">
                                    <h3 class="dt-card__title text-white">ESCUELA</h3>
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
                        <div class="dt-widget dt-widget-hover ps-custom-scrollbar ps ps--active-y" id="tbodyAlumno">
                        </div>
                        <!-- /widget -->
                        <!-- /card body -->
                    </div>
                    <!-- /card -->
                </div>

                <div class="row mt-2">
                    <div class="col-md-2 col-sm-3 col-4">
                        <select id="sizePageAlumno" class="form-control form-control-sm select2-single">
                            <option value="10">10</option>
                            <option value="15">15</option>
                            <option value="20">20</option>
                        </select>
                    </div>
                    <div class="col-md-10 col-sm-9 col-8">
                        <nav aria-label="Page navigation example">
                            <ul id="paginationAlumno" class="pagination pagination-sm justify-content-end">
                            </ul>
                        </nav>  
                    </div>
                </div>

                <!-- /card body -->
            </div>
            <!-- /card -->
        </div>


        <!-- Card -->
        <div class="card " id="btnOpenAlumnoDetalle" style="display:none">
            <!-- Card Header -->
            <div class="dt-card__header mb-0 p-0 pt-5 pb-3 border-bottom">
                <!-- Card Tools -->
                <div class="dt-card__tools">
                    <button type="button" class="btn btn-primary btn-sm dt-avatar" id="btnRegresarLista" data-toggle="tooltip" title="Regresar a la Lista">
                        <i class="icon icon-reply icon-lg" ></i></button>
                </div>
                <!-- /card tools -->
                <!-- Card Heading -->
                <div class="dt-card__heading">
                    <h4 class="dt-card__title text-primary text-center" id="txtTituloModalAlumno">[ 0 ] PERSONAL</h4>
                </div>
                <!-- /card heading -->

            </div>
            <!-- Card Header -->
            <div class="card-header">
                <!-- Tab Navigation -->
                <ul class="card-header-pills nav nav-pills nav-fill" role="tablist">
                    <div class="col-6"> 
                        <li class="nav-item">
                            <a class="nav-link" id="btnDatosLaborales" data-toggle="tab" 
                               href="#tab-datos-laborales" role="tab" aria-controls="tab-datos-laborales"
                               aria-="true">DATOS LABORALES</a>
                        </li>
                    </div>
                    <div class="col-6"> 
                        <li class="nav-item">
                            <a class="nav-link  active" id="btnDatosGenerales" data-toggle="tab" 
                               href="#tab-datos-generales" role="tab" aria-controls="tab-datos-generales"
                               aria-="true">DATOS GENERALES</a>
                        </li>
                    </div>


                </ul>
                <!-- /tab navigation -->
            </div>
            <!-- /card header -->
            <!-- /card header -->
            <!-- Card Body -->
            <div class=" card-body p-0">

                <div class="tabs-container">
                    <!-- Tab Content -->
                    <div class="tab-content">
                        <form id="FrmAlumnoModal"> 
                            <!-- Tab Pane DATOS GENERALES-->
                            <div id="tab-datos-generales" >
                                <div class="card-body p-3">
                                    <div class="row">
                                        <div class="col-lg-3 col-sm-4 col-6">
                                            <div class="form-group">
                                                <label for="txtTipoPersonaAlumno">TIPO DE USUARIO</label>
                                                <select  class="form-control form-control-sm sisbu-cursor-mano" id="txtTipoPersonaAlumno" >
                                                    <option  value="-1">Seleccione... </option>
                                                    <option  value="1">ALUMNO</option>
                                                    <option  value="2">DOCENTE</option>
                                                    <option  value="3">ADMINISTRATIVO</option>
                                                    <option  value="4">FAMILIAR DOCENTE</option>
                                                    <option  value="5">FAMILIAR ADMINISTRATIVO</option>
                                                    <option  value="6">OTRO</option>
                                                </select>
                                            </div>
                                        </div>
                                        <div class="col-lg-3 col-sm-4 col-6">
                                            <div class="form-group">
                                                <label for="txtTipoDocumentoAlumno">TIPO DE DOCUMENTO</label>
                                                <select  class="form-control form-control-sm sisbu-cursor-mano" id="txtTipoDocumentoAlumno" >
                                                    <option  value="-1">Seleccione... </option>
                                                    <option  value="1">DNI</option>
                                                    <option  value="2">CARNET DE EXTRANJERIA</option>
                                                    <option  value="3">OTRO</option>
                                                </select>
                                            </div>
                                        </div>
                                        <div class="col-lg-3 col-sm-4 col-6">
                                            <div class="form-group">
                                                <label for="txtNumeroDocumentoAlumno">N° DOCUMENTO</label>
                                                <input  type="text" class="form-control form-control-sm" id="txtNumeroDocumentoAlumno" placeholder="Ingrese n° documento. . ." maxlength="8">
                                            </div>
                                        </div>

                                        <div class="col-lg-3 col-sm-4 col-6">
                                            <div class="form-group">
                                                <label for="txtEstadoCivilAlumno">ESTADO CIVIL</label>
                                                <select  class="form-control form-control-sm sisbu-cursor-mano" id="txtEstadoCivilAlumno">
                                                    <option  value="-1">Seleccionar...</option>
                                                    <option  value="1">SOLTERO(A)</option>
                                                    <option  value="2">CASADO(A)</option>
                                                    <option  value="3">DIVORSIADO(A)</option>
                                                    <option  value="4">VIUDO(A)</option>
                                                </select>
                                            </div>
                                        </div>
                                        <div class="col-lg-3 col-sm-4 col-6">
                                            <div class="form-group">
                                                <label for="txtSexoAlumno">SEXO</label>
                                                <select  class="form-control form-control-sm" id="txtSexoAlumno">
                                                    <option value="-1">Seleccione. . .</option>
                                                    <option value="1">MASCULINO</option>
                                                    <option  value="2">FEMENINO</option>
                                                    <option  value="3">OTRO</option>
                                                </select>
                                            </div>
                                        </div>
                                        <div class="col-lg-3 col-sm-4 mb-3 col-6">
                                            <label for="txtFechaNacAlumno">FECHA DE NACIMIENTO</label>
                                            <div class="input-group">
                                                <input  type="text" class="form-control form-control-sm" id="txtFechaNacAlumno" placeholder="DD/MM/AAAA">
                                                <div class="input-group-append">
                                                    <button type="button" id="btnEliminarFechaNacAlumno" data-toggle="tooltip" title="Eliminar Fecha" class="btn btn-primary btn-sm"><i class="fa fa-trash"></i></button>
                                                </div>
                                            </div>
                                        </div>

                                        <div class="col-lg-3 col-sm-4 col-6">
                                            <div class="form-group">
                                                <label for="txtApPaternoAlumno">AP. PATERNO</label>
                                                <input  type="text" class="form-control form-control-sm" id="txtApPaternoAlumno" placeholder="AP. PATERNO" maxlength="45">
                                            </div>
                                        </div>
                                        <div class="col-lg-3 col-sm-4 col-6">
                                            <div class="form-group">
                                                <label for="txtApMaternoAlumno">AP. MATERNO</label>
                                                <input  type="text" class="form-control form-control-sm" id="txtApMaternoAlumno" placeholder="AP. MATERNO" maxlength="45">
                                            </div>
                                        </div>
                                        <div class="col-lg-3 col-sm-4 col-6">
                                            <div class="form-group">
                                                <label for="txtNombreAlumno">NOMBRES</label>
                                                <input  type="text" class="form-control form-control-sm" id="txtNombreAlumno" placeholder="NOMBRES" maxlength="45">
                                            </div>
                                        </div>
                                        <div class="col-lg-3 col-sm-4 col-6">
                                            <div class="form-group">
                                                <label for="txtCelularAlumno">CELULAR</label>
                                                <input maxlength="9"  type="number" class="form-control form-control-sm" id="txtCelularAlumno" placeholder="Ingrese celular. . ." maxlength="9">
                                            </div>
                                        </div>
                                        <div class="col-lg-6 col-sm-8 col-12">
                                            <div class="form-group">
                                                <label for="txtEmailAlumno">EMAIL</label>
                                                <input  type="email" class="form-control form-control-sm" id="txtEmailAlumno" placeholder="EMAIL" maxlength="100">
                                            </div>
                                        </div>
                                        <div class="col-lg-6  col-sm-6 mb-3 ">
                                            <label for="txtDistritoActualAlumno">DISTRITO ACTUAL</label>
                                            <div class="input-group">
                                                <input type="text" class="form-control form-control-sm" id="txtDistritoActualAlumno" aria-describedby="nombre" placeholder="Click en el botón para seleccionar. . ." disabled="">
                                                <div class="input-group-append">
                                                    <button type="button" id="btnSeleccionarDistritoActual" class="btn btn-primary btn-sm"><i class="icon icon-subscribe"></i></button>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="col-lg-6  col-sm-6  mb-3">
                                            <label for="txtDistritoProcedenciaAlumno">DISTRITO PROCEDENCIA</label>
                                            <div class="input-group">
                                                <input type="text" class="form-control form-control-sm" id="txtDistritoProcedenciaAlumno" aria-describedby="nombre" placeholder="Click en el botón para seleccionar. . ." disabled="">
                                                <div class="input-group-append">
                                                    <button type="button" id="btnSeleccionarDistritoProcedencia" class="btn btn-primary btn-sm"><i class="icon icon-subscribe"></i></button>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="col-lg-6  col-sm-6 ">
                                            <div class="form-group">
                                                <label for="txtDireccionActualAlumno">DIRECCION ACTUAL
                                                    <i class="fa fa-question-circle" aria-hidden="true" data-toggle="popover" data-trigger="hover" data-placement="top" title="" data-content="Dirección donde vives actualmente. Si vives en un caserío ingresa tu dirección y luego agrega tu caserío separado por un guión. Ejm: #LOS PINOS - SAN MARTÍN" style="cursor: pointer" data-original-title=""></i>
                                                </label>
                                                <input  type="text" class="form-control form-control-sm" id="txtDireccionActualAlumno" placeholder="Ingrese dirección actual. . ." maxlength="80">
                                            </div>
                                        </div>
                                        <div class="col-lg-6 col-sm-6 ">
                                            <div class="form-group">
                                                <label for="txtDireccionProceAlumno">DIRECCION PROCEDENCIA
                                                    <i class="fa fa-question-circle" aria-hidden="true" data-toggle="popover" data-trigger="hover" data-placement="top" title="" data-content="Dirección de donde vienes. Si vienes de un caserío ingresa tu dirección y luego agrega tu caserío separado por un guión. Ejm: #LOS ROSALES - SAN JUAN" style="cursor: pointer" data-original-title=""></i>
                                                </label>
                                                <input  type="text" class="form-control form-control-sm" id="txtDireccionProceAlumno" placeholder="Ingrese dirección de procedencia" maxlength="80">
                                            </div>
                                        </div>
                                        <div class="form-group col-12 text-center">
                                            <button type="submit" id="btnGuardarAlumno" class="btn btn-primary btn-sm">GUARDAR</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <!-- /tab pane-->
                            <!-- Tab Pane DATOS LABORALES-->
                            <div id="tab-datos-laborales" >

                                <div class="card-body p-3 ">
                                    <div class="row">
                                        <div class="col-lg-3 col-sm-4 col-6">
                                            <div class="form-group">
                                                <label for="txtTipoPersonalAlumno">TIPO DE PERSONAL
                                                    <i class="fa fa-question-circle" aria-hidden="true" data-toggle="popover" data-trigger="hover" data-placement="top" title="" 
                                                       data-content="Si no labora en la Universidad selecciona la opción 'OTRO'" style="cursor: pointer" data-original-title=""></i>

                                                </label>
                                                <select  class="form-control form-control-sm sisbu-cursor-mano" id="txtTipoPersonalAlumno" >
                                                    <option  value="-1">Seleccione... </option>
                                                    <option  value="1">NOMBRADO</option>
                                                    <option  value="2">CONTRATADO</option>
                                                    <option  value="3">OTRO</option>
                                                </select>
                                            </div>
                                        </div>
                                        <div class="col-lg-3 col-sm-4 col-6 mb-3">
                                            <label for="txtCicloAlumno">CICLO DE INGRESO
                                                <i class="fa fa-question-circle" aria-hidden="true" data-toggle="popover" data-trigger="hover" data-placement="top" title="" 
                                                   data-content="Ciclo que ingresaste. Si no es Alumno deja la caja de texto en blanco" style="cursor: pointer" data-original-title=""></i>
                                            </label>
                                            <div class="input-group">
                                                <input type="text" class="form-control form-control-sm" id="txtCicloAlumno" aria-describedby="nombre" placeholder="Click en el botón para seleccionar. . ." disabled="">
                                                <div class="input-group-append">
                                                    <button type="button" id="btnSeleccionarCiclo" class="btn btn-primary btn-sm"><i class="icon icon-subscribe"></i></button>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="col-lg-3 col-sm-4 col-6">
                                            <div class="form-group">
                                                <label for="txtCodigoAlumno">CÓDIGO
                                                    <i class="fa fa-question-circle" aria-hidden="true" data-toggle="popover" data-trigger="hover" data-placement="top" title="" 
                                                       data-content="Es el código único de estudiante. Si aún no sabes cual es tu código, deja la caja de texto en blanco. Si no es Alumno deja la caja de texto en blanco" style="cursor: pointer" data-original-title=""></i>
                                                </label>
                                                <input  type="text" class="form-control form-control-sm" id="txtCodigoAlumno" placeholder="Ingrese Código. . ." maxlength="7">
                                            </div>
                                        </div>
                                        <div class="col-lg-3 col-sm-4 col-6">
                                            <div class="form-group">
                                                <label for="txtCachimboAlumno">CACHIMBO
                                                    <i class="fa fa-question-circle" aria-hidden="true" data-toggle="popover" data-trigger="hover" data-placement="top" title="" 
                                                       data-content="Si no es Alumno selecciona la opción 'NO'" style="cursor: pointer" data-original-title=""></i>

                                                </label>
                                                <select  class="form-control form-control-sm sisbu-cursor-mano" id="txtCachimboAlumno" >
                                                    <option  value="-1">Seleccione... </option>
                                                    <option  value="1">SI</option>
                                                    <option  value="2">NO</option>
                                                </select>
                                            </div>
                                        </div>
                                        <div class="col-lg-3 col-sm-4 col-6">
                                            <div class="form-group">
                                                <label for="txtTipoColegioAlumno">TIPO DE COLEGIO
                                                    <i class="fa fa-question-circle" aria-hidden="true" data-toggle="popover" data-trigger="hover" data-placement="top" title="" 
                                                       data-content="Si no es Alumno selecciona la opción 'OTRO'" style="cursor: pointer" data-original-title=""></i>

                                                </label>
                                                <select  class="form-control form-control-sm sisbu-cursor-mano" id="txtTipoColegioAlumno">
                                                    <option   value="-1">Seleccione. . .</option>
                                                    <option   value="1">NACIONAL</option>
                                                    <option  value="2">PARTICULAR</option>
                                                    <option  value="3">OTRO</option>
                                                </select>
                                            </div>
                                        </div>
                                        <div class="col-lg-3 col-sm-4 col-6">
                                            <div class="form-group">
                                                <label for="txtModalidadAlumno">MODALIDAD DE INGRESO
                                                    <i class="fa fa-question-circle" aria-hidden="true" data-toggle="popover" data-trigger="hover" data-placement="top" title="" 
                                                       data-content="Si no es Alumno selecciona la opción 'OTRO'" style="cursor: pointer" data-original-title=""></i>

                                                </label>
                                                <select  class="form-control form-control-sm sisbu-cursor-mano" id="txtModalidadAlumno">
                                                    <option   value="-1">Seleccione. . .</option>
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

                                        <div class="col-lg-3 col-sm-3 col-6">
                                            <div class="form-group">
                                                <label for="txtComensalAlumno">COMENSAL</label>
                                                <select  class="form-control form-control-sm sisbu-cursor-mano" id="txtComensalAlumno" >
                                                    <option  value="-1">Seleccione... </option>
                                                    <option  value="1">SI</option>
                                                    <option  value="2">NO</option>
                                                    <option  value="3">COMENSAL DEPURADO</option>
                                                </select>
                                            </div>
                                        </div>
                                        <div class="col-lg-3 col-sm-3 col-6">
                                            <div class="form-group">
                                                <label for="txtEstadoAlumno">ESTADO </label>
                                                <select  class="form-control form-control-sm sisbu-cursor-mano" id="txtEstadoAlumno">
                                                    <option  value="-1">Seleccionar...</option>
                                                    <option  value="1">ACTIVO</option>
                                                    <option  value="2">INACTIVO</option>
                                                </select>
                                            </div>
                                        </div>
                                        <div class="col-lg-12 col-sm-6 mb-3">
                                            <label for="txtEscuelaAlumno">ESCUELA
                                                <i class="fa fa-question-circle" aria-hidden="true" data-toggle="popover" data-trigger="hover" data-placement="top" title="" 
                                                   data-content="Carrera profesional a la que ingresaste. Si no es Alumno deja la caja de texto en blanco" style="cursor: pointer" data-original-title=""></i>
                                            </label>
                                            <div class="input-group">
                                                <input type="text" class="form-control form-control-sm" id="txtEscuelaAlumno" aria-describedby="nombre" placeholder="Click en el botón para seleccionar. . ." disabled="">
                                                <div class="input-group-append">
                                                    <button type="button" id="btnSeleccionarEscuela" class="btn btn-primary btn-sm"><i class="icon icon-subscribe"></i></button>
                                                </div>
                                            </div>
                                        </div>


                                    </div>
                                </div>
                            </div>
                            <!-- /tab pane-->
                        </form>
                        <!-- Tab Pane DATOS ACCESO-->
                        <div id="tab-datos-acceso" style="display:none">
                            <div class="card-body ">
                                <form id="FrmUsuarioModal"> 
                                    <div class="row">
                                        <div class="form-group col-lg-4 col-sm-6">
                                            <label for="txtNombreUsuario">NOMBRE USUARIO</label>
                                            <input class="form-control form-control-sm" id="txtNombreUsuario" type="text" placeholder="NOMBRE USUARIO">
                                        </div>
                                        <div class="form-group col-lg-4 col-sm-6">
                                            <label for="txtLoginUsuario">LOGIN </label>
                                            <div class="input-group input-group-sm mb-3">
                                                <div class="input-group-prepend">
                                                    <span class="input-group-text bg-primary" ><i class="text-white icon icon-user"></i></span>
                                                </div>
                                                <input type="text" class="form-control form-control-sm" id="txtLoginUsuario" placeholder="LOGIN" aria-label="Small" >
                                            </div>

                                        </div>
                                        <div class="form-group col-lg-4 col-sm-6">
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

                                        <div class="form-group col-lg-4 col-sm-6">
                                            <label for="txtTipoPerfilUsuario">TIPO PERFIL</label>
                                            <select class="form-control form-control-sm" id="txtTipoPerfilUsuario">
                                                <option selected value="-1">Seleccione...</option>
                                                <option value="1000">CACHIMBOS</option>
                                                <option value="1100">NORMAL</option>
                                                <option value="1110">OTRO</option>

                                            </select>
                                        </div>
                                        <div class="form-group col-lg-4 col-sm-6">
                                            <label for="txtEstadoUsuario">ESTADO</label>
                                            <select class="form-control form-control-sm" id="txtEstadoUsuario">
                                                <option selected value="1">HABILITADO</option>
                                                <option value="2">DESHABILITADO</option>

                                            </select>
                                        </div>
                                        <div class="form-group col-12 text-center">
                                            <button type="submit" id="btnGuardarUsuario" class="btn btn-primary btn-sm">ACTUALIZAR</button>
                                        </div>
                                    </div>
                                </form>

                            </div>
                        </div>
                        <!-- /tab pane-->
                    </div>
                    <!-- /tab content -->
                </div>
                <!-- /card body -->
            </div>
            <!-- /card -->
        </div>
    </div>
    <!-- Card -->
    <div class=" col-xl-4 col-lg-4 col-sm-3 ">

    </div>
    <div class=" col-xl-4 col-lg-4 col-sm-6 " id="frmIngresarDni" style="display: none">
        <form id="FrmAlumnoValidar" >
            <div class="input-group search-box" style="max-width: 100%;">
                <input type="search" id="txtFilterDni" class="form-control form-control-sm" placeholder="INGRESA DNI">
                <div class="input-group-append">
                    <span class="search-icon"><i class="icon icon-search icon-lg"></i></span>
                    <button type="submit" class="btn btn-primary btn-sm mr-2"><i class="icon icon-search icon-fw"></i> BUSCAR</button>
                </div>
            </div>
            <div class="text-center pt-5">
                <button  id="btnCancelarFilterDni"type="button" class="btn btn-outline-primary btn-sm mr-2"><i class="icon icon-reply"></i> CANCELAR</button>                   
            </div>
        </form>
    </div>


</div>

<div class="modal fade" id="modalCargandoAlumno" data-backdrop="static" data-keyboard="false" tabindex="-1" role="dialog" style="padding-top: 18%; overflow-y: visible; display: none;" aria-hidden="true">
    <div class="modal-dialog modal-sm">
        <div class="modal-content">
            <div class="modal-body">
                <div class="progress" style="margin-bottom: 0px;">
                    <div class="progress-bar progress-bar-striped progress-bar-animated" role="progressbar" aria-valuenow="100" aria-valuemin="0" aria-valuemax="100" style="width:100%">
                        Cargando Alumnos. . .
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
                        Cargando usuarios. . .
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>


<!--T: DISTRITO SELECTED-->
<div id="ventanaModalSelectedDistritoC" class="modal" tabindex="-1" role="dialog" data-backdrop="static"
     data-keyboard="false" style="padding-top: 2%; overflow-y: visible;background-color: rgba(0,0,0,.2)">
    <div class="modal-dialog " role="document">
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

<!--T: CICLOS SELECTED-->
<div id="ventanaModalSelectedCicloC" class="modal" tabindex="-1" role="dialog" data-backdrop="static"
     data-keyboard="false" style="padding-top: 2%; overflow-y: visible;background-color: rgba(0,0,0,.2)">
    <div class="modal-dialog" role="document">
        <div class="modal-content" style="border-color: #0085c1; border-width: 4px;">
            <div class="modal-header">
                <h5 class="mb-0" id="titleManagerCicloC"><strong>[ 0 ]
                        CICLOS</strong></h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body pb-0 pt-0">
                <div class="row">
                    <div class="col-12">
                        <input type="hidden" id="pageCicloC"
                               value="1">
                        <form id="FrmCicloC">
                            <div class="row mt-3">
                                <div class="input-group col-12">
                                    <input type="text" id="txtFilterCicloC"
                                           class="form-control form-control-sm mr-3" placeholder="INGRESE FILTRO . . .">
                                    <button type="submit" id="btnBuscarCicloC"
                                            class="btn btn-primary btn-xs" data-toggle="tooltip"
                                            title="Buscar Ciclo"><i class="fa fa-search" aria-hidden="true"></i>
                                        BUSCAR</button>
                                </div>
                            </div>
                        </form>
                        <div class="row pl-5 pr-5 mb-2">
                            <div class="table-responsive">
                                <table class="table mb-0 table-fluid">
                                    <thead>
                                        <tr>
                                            <th class="align-middle text-left">Ciclo</th>
                                        </tr>
                                    </thead>
                                    <tbody id="tbodyCicloC">
                                    </tbody>
                                </table>
                            </div>
                        </div>
                        <div class="row mt-2 mb-2" style="display: none">
                            <div class="col-sm-4 mt-2">
                                <select id="sizePageCicloC"
                                        class="form-control form-control-sm sisbu-cursor-mano combo-paginar">
                                    <option value="5">05</option>
                                    <option value="10">10</option>
                                    <option value="15">15</option>
                                </select>
                            </div>
                            <div class="col-sm-8 mt-2">
                                <nav aria-label="Page navigation">
                                    <ul id="paginationCicloC"
                                        class="pagination justify-content-end">

                                    </ul>
                                </nav>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-outline-primary btn-xs" data-dismiss="modal" id="btnCancelSelectionCicloC"><i class="fas fa-ban"></i>
                    CANCELAR</button>
                <button type="button" id="btn-selecionar-cicloc" class="btn btn-primary btn-xs"><i
                        class="fas fa-check"></i> SELECCIONAR</button>
            </div>
        </div>
    </div>
</div>

<div class="modal" id="modalCargandoSelectedCicloC" data-backdrop="static" data-keyboard="false" tabindex="-1"
     role="dialog" aria-hidden="true" style="padding-top: 18%; overflow-y: visible;background-color: rgba(0,0,0,.3)">
    <div class="modal-dialog modal-sm">
        <div class="modal-content">
            <div class="modal-body">
                <div class="progress" style="margin-bottom: 0px;height: 15px;">
                    <div class="progress-bar progress-bar-striped progress-bar-animated" role="progressbar"
                         aria-valuenow="100" aria-valuemin="0" aria-valuemax="100" style="width: 100%;">
                        Cargando Ciclos Académicos. . .
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>

