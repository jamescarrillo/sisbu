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
        <title><%=getServletContext().getInitParameter("name.page.base")%> AUTH</title>

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
                        <div class="dt-login__bg-section">

                            <div class="dt-login__bg-content">
                                <!-- Login Title -->
                                <h1 class="dt-login__title" style="font-size: 2.5rem">Inicio de Sesión</h1>
                                <!-- /login title -->

                                <p class="f-16">Inicia sesión y explora los servicios que ofrece la Oficina General de Bienstar Universitario (OGBU).</p>
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

                                <!-- Form -->
                                <form id="FrmLogin">

                                    <!-- Form Group -->
                                    <div class="form-group">
                                        <label class="sr-only" for="email-1">Username</label>
                                        <input type="text" class="form-control" aria-describedby="email-1"
                                               placeholder="Username" id="txtUsername" name="login">
                                    </div>
                                    <!-- /form group -->

                                    <!-- Form Group -->
                                    <div class="form-group">
                                        <label class="sr-only" for="password-1">Password</label>
                                        <input type="password" class="form-control" id="txtPass" name="password" placeholder="Password">
                                    </div>
                                    <!-- /form group -->

                                    <!-- Form Group -->
                                    <h6 class="text-danger">
                                        **Los estudiantes cachimbos de la sede Lambayeque ingresan con su DNI como Username y Password.
                                    </h6>
                                    <h6 class="text-danger">
                                        **Los estudiantes de la sede Cutervo ingresan con su Código como Username y Password.
                                    </h6>
                                    <!--div class="dt-checkbox d-block mb-6">
                                        <input type="checkbox" id="checkbox-1">
                                        <label class="dt-checkbox-content" for="checkbox-1">
                                            Mantenerme conectado en este dispositivo
                                        </label>
                                    </div-->
                                    <!-- /form group -->

                                    <!-- Form Group -->
                                    <div class="form-group">
                                        <button type="submit" class="btn btn-primary text-uppercase">Ingresar</button>
                                        <span class="d-inline-block ml-4">O
                                            <a class="d-inline-block font-weight-500 ml-3" href="signup">Crear una Cuenta</a>
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
                                        <a class="d-inline-block font-weight-500 mt-4" href="<%=request.getContextPath()%>/recovery">¿No puedes acceder a tu cuenta?</a>
                                    </div>
                                </form>
                                <!-- /form -->

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

        <div class="modal fade" id="modalCargandoLogin" data-backdrop="static" data-keyboard="false" tabindex="-1" role="dialog" style="padding-top: 18%; overflow-y: visible; display: none;" aria-hidden="true">
            <div class="modal-dialog modal-sm">
                <div class="modal-content">
                    <div class="modal-body">
                        <div class="progress" style="margin-bottom: 0px;">
                            <div class="progress-bar progress-bar-striped progress-bar-animated" role="progressbar" aria-valuenow="100" aria-valuemin="0" aria-valuemax="100" style="width:100%">
                                Autenticando. . .
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
        <script src="<%out.print(request.getContextPath());%>/scripts/util/functions.js?v=0.02"></script>
        <script src="<%out.print(request.getContextPath());%>/scripts/util/functions_alerts.js?v=0.02"></script>
        <script src="<%out.print(request.getContextPath());%>/scripts/util/functions_operational.js?v=0.02"></script>
        <script src="<%out.print(request.getContextPath());%>/scripts/util/configuration_api.js?v=0.02"></script>

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
