<%-- 
    Document   : auth
    Created on : 24 ago. 2019, 09:27:22
    Author     : James Carrillo
--%>

<%@page import="com.ogbu.unprg.sisbu.util.Resource"%>
<%@page contentType="text/html" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html lang="es">
    <head>
        <jsp:include page="zinclude_pages/meta_tags.jsp" />
        <title><%=getServletContext().getInitParameter("name.page.base")%> SIGNUP</title>

        <!-- Site favicon -->
        <!--link rel="shortcut icon" href="<%=request.getContextPath()%>/assets/listing/images/favicon.ico" type="image/x-icon"-->
        <link rel="shortcut icon" href="<%=request.getContextPath()%>/resources/dev/img/global/logo-short-plomo.png">
        <!-- /site favicon -->

        <!-- Font Icon Styles -->
        <link rel="stylesheet" href="<%=request.getContextPath()%>/plugins/flag-icon-css/css/flag-icon.min.css">
        <link rel="stylesheet" href="<%=request.getContextPath()%>/vendors/gaxon-icon/styles.css">
        <!-- /font icon Styles -->

        <!-- Perfect Scrollbar stylesheet -->
        <link rel="stylesheet" href="<%=request.getContextPath()%>/plugins/perfect-scrollbar/css/perfect-scrollbar.css">
        <!-- /perfect scrollbar stylesheet -->

        <!-- Load Styles -->
        <link rel="stylesheet" href="<%=request.getContextPath()%>/assets/css/semidark-style-1.min.css">
        <link rel="stylesheet" href="<%=request.getContextPath()%>/assets/css/light-style-10.min.css">
        <!-- /load styles -->

    </head>
    <body class="dt-sidebar--fixed dt-header--fixed">
        <%
            Resource resource = (Resource) request.getAttribute("resource");
        %>
        <!-- Loader -->
        <div class="dt-loader-container">
            <div class="dt-loader">
                <svg class="circular" viewBox="25 25 50 50">
                <circle class="path" cx="50" cy="50" r="20" fill="none" stroke-width="2" stroke-miterlimit="10"></circle>
                </svg>
            </div>
        </div>
        <!-- /loader -->

        <!-- Root -->
        <div class="dt-root">
            <div class="dt-root__inner">

                <!-- Login Container -->
                <div class="dt-login--container">

                    <!-- Login Content -->
                    <div class="dt-login__content-wrapper">

                        <!-- Login Background Section -->
                        <div class="dt-login__bg-section" style="background-image: url()">

                            <div class="dt-login__bg-content">
                                <!-- Login Title -->
                                <h1 class="dt-login__title" style="font-size: 2.5rem">Registro</h1>
                                <!-- /login title -->

                                <p class="f-16">Regístrate y disfrute de los servicios que ofrece la Oficina General de Bienstar Universitario (OGBU).</p>
                            </div>


                            <!-- Brand logo https://via.placeholder.com/334x119 -->
                            <div class="dt-login__logo">
                                <a class="dt-brand__logo-link" href="<%=request.getContextPath()%>/index">
                                    <img class="dt-brand__logo-img" style="width: 120px; height: 50px"
                                         src="<%=request.getContextPath()%>/resources/dev/img/global/logo-blanco.png" alt="logo-SisBu">
                                </a>
                            </div>
                            <!-- /brand logo -->

                        </div>
                        <!-- /login background section -->

                        <!-- Login Content Section -->
                        <div class="dt-login__content">

                            <!-- Login Content Inner -->
                            <div class="dt-login__content-inner" style="padding-bottom: 10px">
                                <div class="row" id="row-verification">
                                    <div class="col-12">
                                        <h3 class="text-info text-center">Verificación de registro</h3>
                                    </div>
                                    <div class="col-12">
                                        <h6 class="text-dark">
                                            N° DNI
                                        </h6>
                                        <!-- Form Group -->
                                        <div class="form-group">
                                            <label class="sr-only" for="txtDNIVerificacion">DNI</label>
                                            <input type="text" class="form-control" aria-describedby="email-1"
                                                   placeholder="Ingresa tu DNI. . ." id="txtDNIVerificacion" maxlength="8">
                                        </div>
                                        <!-- /form group -->
                                        <h6 class="text-danger">
                                            *Si al verificar recibes el siguiente mensaje: "Ya existe un usuario con el DNI ingresado", <a href="/sisbu/auth/login">Inicia sesión</a> con tu DNI como nombre de usuario y contraseña.
                                        </h6>
                                        <!-- Form Group -->
                                        <div class="form-group">
                                            <button type="button" class="btn btn-primary text-uppercase" id="btn-verification-DNI" step="s_2">Verificar</button>
                                            <span class="d-inline-block ml-4">O
                                                <a class="d-inline-block font-weight-500 ml-3" href="/sisbu/auth/login">Iniciar Sesión</a>
                                            </span>
                                        </div>
                                        <!-- /form group -->
                                        <!-- Form Group -->
                                        <div class="d-flex flex-wrap align-items-center">
                                            <span class="d-inline-block mr-2">Síguenos en</span>

                                            <!-- List -->
                                            <ul class="dt-list dt-list-sm dt-list-cm-0 ml-auto">
                                                <li class="dt-list__item">
                                                    <!-- Fab Button -->
                                                    <a href="https://www.facebook.com/BienestarUNPRG/" target="_blank" class="btn btn-outline-primary dt-fab-btn size-30">
                                                        <i class="icon icon-facebook icon-xl"></i>
                                                    </a>
                                                    <!-- /fab button -->
                                                </li>

                                                <li class="dt-list__item">
                                                    <!-- Fab Button -->
                                                    <a href="https://www.youtube.com/channel/UCDpJg58pfAXwHxLCr6zUmbw" target="_blank" class="btn btn-outline-primary dt-fab-btn size-30">
                                                        <i class="icon icon-youtube icon-xl"></i>
                                                    </a>
                                                    <!-- /fab button -->
                                                </li>

                                                <li class="dt-list__item">
                                                    <!-- Fab Button -->
                                                    <a href="javascript:void(0)" class="btn btn-outline-primary dt-fab-btn size-30">
                                                        <i class="icon icon-instagram icon-xl"></i>
                                                    </a>
                                                    <!-- /fab button -->
                                                </li>

                                                <li class="dt-list__item">
                                                    <!-- Fab Button -->
                                                    <a href="javascript:void(0)" class="btn btn-outline-primary dt-fab-btn size-30">
                                                        <i class="icon icon-twitter icon-xl"></i>
                                                    </a>
                                                    <!-- /fab button -->
                                                </li>
                                            </ul>
                                            <!-- /list -->
                                        </div>
                                        <!-- /form group -->
                                        <div class="text-right">
                                            <a class="d-inline-block font-weight-500 mt-4" href="<%=request.getContextPath()%>/recovery">¿Olvidé mi contraseña?</a>
                                        </div>
                                    </div>

                                </div>
                                <div class="row" id="row-registro-1" style="display: none">
                                    <div class="col-12">
                                        <div class="form-group">
                                            <label for="slcTipoUsuario">TIPO DE USUARIO</label>
                                            <select  class="form-control form-control-sm sisbu-cursor-mano" id="slcTipoUsuario" >
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
                                    <div class="col-12">
                                        <div class="form-group">
                                            <label for="slcModalidadIngresoUsuario">MODALIDAD DE INGRESO</label>
                                            <select  class="form-control form-control-sm sisbu-cursor-mano" id="slcModalidadIngresoUsuario">
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
                                    <div class="col-lg-12">
                                        <div class="form-group">
                                            <label for="slcTipoPersonalUsuario">TIPO DE PERSONAL
                                                <i class="fa fa-question-circle" aria-hidden="true" data-toggle="popover" data-trigger="hover" data-placement="top" title="" 
                                                   data-content="Si no labora en la Universidad selecciona la opción 'OTRO'" style="cursor: pointer" data-original-title=""></i>
                                            </label>
                                            <select  class="form-control form-control-sm sisbu-cursor-mano" id="slcTipoPersonalUsuario" >
                                                <option  value="-1">Seleccione... </option>
                                                <option  value="1">NOMBRADO</option>
                                                <option  value="2">CONTRATADO</option>
                                                <option  value="3">OTRO</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div class="col-12">
                                        <div class="form-group">
                                            <label for="slcTipoDocumentoUsuario">TIPO DE DOCUMENTO</label>
                                            <select  class="form-control form-control-sm sisbu-cursor-mano" id="slcTipoDocumentoUsuario" disabled="">
                                                <option  value="-1">Seleccione... </option>
                                                <option  value="1">DNI</option>
                                                <option  value="2">CARNET DE EXTRANJERIA</option>
                                                <option  value="3">OTRO</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div class="col-12">
                                        <div class="form-group">
                                            <label for="txtNumeroDocumentoUsuario">N° DOCUMENTO</label>
                                            <input  type="text" class="form-control form-control-sm" id="txtNumeroDocumentoUsuario" placeholder="Ingrese n° documento. . ." maxlength="8">
                                        </div>
                                    </div>
                                    <div class="col-12 text-center">
                                        <div class="form-group">
                                            <button type="button" class="btn btn-warning text-uppercase text-white btn-reply-register" step="s_1">Regresar</button>
                                            <button type="button" class="btn btn-primary text-uppercase" id="btn-next-register-2" step="s_3">Siguiente</button>
                                        </div>
                                    </div>
                                </div>
                                <div class="row" id="row-registro-2" style="display: none">
                                    <div class="col-12">
                                        <div class="form-group">
                                            <label for="txtApPaternoUsuario">AP. PATERNO</label>
                                            <input  type="text" class="form-control form-control-sm text-uppercase" id="txtApPaternoUsuario" placeholder="AP. PATERNO" maxlength="45">
                                        </div>
                                    </div>
                                    <div class="col-12">
                                        <div class="form-group">
                                            <label for="txtApMaternoUsuario">AP. MATERNO</label>
                                            <input  type="text" class="form-control form-control-sm text-uppercase" id="txtApMaternoUsuario" placeholder="AP. MATERNO" maxlength="45">
                                        </div>
                                    </div>
                                    <div class="col-12">
                                        <div class="form-group">
                                            <label for="txtNombreUsuario">NOMBRES</label>
                                            <input  type="text" class="form-control form-control-sm text-uppercase" id="txtNombreUsuario" placeholder="NOMBRES" maxlength="45">
                                        </div>
                                    </div>
                                    <div class="col-12">
                                        <div class="form-group">
                                            <label for="txtCelularAlumno">CELULAR</label>
                                            <input maxlength="9"  type="number" class="form-control form-control-sm text-uppercase" id="txtCelularAlumno" placeholder="Ingrese celular. . ." maxlength="9">
                                        </div>
                                    </div>
                                    <div class="col-12">
                                        <div class="form-group">
                                            <label for="txtEmailUsuario">EMAIL</label>
                                            <input  type="email" class="form-control form-control-sm" id="txtEmailUsuario" placeholder="EMAIL" maxlength="100">
                                        </div>
                                    </div>
                                    <div class="col-12 text-center">
                                        <div class="form-group">
                                            <button type="button" class="btn btn-warning text-uppercase text-white btn-reply-register" step="s_2">Regresar</button>
                                            <button type="button" class="btn btn-primary text-uppercase" id="btn-finalizar-register">Finalizar</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <!-- /login content inner -->

                            <!-- Login Content Footer -->
                            <div class="dt-login__content-footer text-center">
                                <a href="http://www.unprg.edu.pe/univ/" target="_blank">Universidad Nacional Pedro Ruiz Gallo</a>
                            </div>
                            <!-- /login content footer -->

                        </div>
                        <!-- /login content section -->

                    </div>
                    <!-- /login content -->

                </div>
                <!-- /login container -->

            </div>
        </div>
        <!-- /root -->

        <div class="modal fade" id="modalCargandoRegister" data-backdrop="static" data-keyboard="false" tabindex="-1" role="dialog" style="padding-top: 18%; overflow-y: visible; display: none;" aria-hidden="true">
            <div class="modal-dialog modal-sm">
                <div class="modal-content">
                    <div class="modal-body">
                        <div class="progress" style="margin-bottom: 0px;">
                            <div class="progress-bar progress-bar-striped progress-bar-animated" role="progressbar" aria-valuenow="100" aria-valuemin="0" aria-valuemax="100" style="width:100%">
                                Finalizando registro. . .
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="modal fade" id="modalCargandoValidateDNI" data-backdrop="static" data-keyboard="false" tabindex="-1" role="dialog" style="padding-top: 18%; overflow-y: visible; display: none;" aria-hidden="true">
            <div class="modal-dialog modal-sm">
                <div class="modal-content">
                    <div class="modal-body">
                        <div class="progress" style="margin-bottom: 0px;">
                            <div class="progress-bar progress-bar-striped progress-bar-animated" role="progressbar" aria-valuenow="100" aria-valuemin="0" aria-valuemax="100" style="width:100%">
                                Validando DNI. . .
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- Optional JavaScript -->
        <script src="<%=request.getContextPath()%>/plugins/jquery/dist/jquery.min.js"></script>
        <script src="<%=request.getContextPath()%>/plugins/moment/moment.js"></script>
        <script src="<%=request.getContextPath()%>/plugins/bootstrap/dist/js/bootstrap.bundle.min.js"></script>
        <!-- Perfect Scrollbar jQuery -->
        <script src="<%=request.getContextPath()%>/plugins/perfect-scrollbar/dist/perfect-scrollbar.min.js"></script>
        <!-- /perfect scrollbar jQuery -->

        <!--JS COMPLEMENTS-->
        <script src="<%out.print(request.getContextPath());%>/scripts/util/functions.js?v=0.04"></script>
        <script src="<%out.print(request.getContextPath());%>/scripts/util/functions_alerts.js?v=0.04"></script>
        <script src="<%out.print(request.getContextPath());%>/scripts/util/functions_operational.js?v=0.04"></script>
        <script src="<%out.print(request.getContextPath());%>/scripts/util/configuration_api.js?v=0.04"></script>

        <!-- masonry script -->
        <script src="<%=request.getContextPath()%>/plugins/masonry-layout/dist/masonry.pkgd.min.js"></script>
        <script src="<%=request.getContextPath()%>/plugins/sweetalert2/dist/sweetalert2.js"></script>
        <script src="<%=request.getContextPath()%>/assets/js/functions.js"></script>
        <script src="<%=request.getContextPath()%>/assets/js/customizer.js"></script>

        <script src="<%out.print(request.getContextPath());%>/scripts/session/change.cookie.js"></script>
        <script src="<%out.print(request.getContextPath());%>/scripts/session/js.cookie.js"></script>
        <script src="<%out.print(request.getContextPath());%>/scripts/session/session.validate.login.js"></script>

        <!-- Custom JavaScript -->
        <script src="<%=request.getContextPath()%>/assets/js/script.js"></script>
        <%
            for (int i = 0; i < resource.getScripts().length; i++) {
                if (resource.getScripts()[i].contains("socket.io.js")) {
                    out.print("<script src='" + resource.getScripts()[i] + "'></script>");
                } else {
                    out.print("<script src='" + request.getContextPath() + resource.getScripts()[i] + "'></script>");
                }
            }
        %>
    </body>
</html>
