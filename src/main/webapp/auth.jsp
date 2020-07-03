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
        <!-- Meta tags -->
        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
        <meta name="description" content="Inicio de Sesión">
        <meta name="author" content="UNPRG">
        <meta name="copyright" content="OGBU - UNPRG">
        <meta name="keywords" content="
              sisbu, 
              sisbu unprg, 
              sistema de bienestar universitario, 
              bienestar unprg,
              unprg
              ">
        <!-- /meta tags -->
        <title>SISBU Login</title>

        <!-- Site favicon -->
        <link rel="shortcut icon" href="<%=request.getContextPath()%>/resources/dev/img/global/logo-short-plomo.png">
        <!-- /site favicon -->

        <!-- Font Icon Styles -->
        <link rel="stylesheet" href="<%=request.getContextPath()%>/plugins/flag-icon-css/css/flag-icon.min.css">
        <link rel="stylesheet" href="<%=request.getContextPath()%>/vendors/gaxon-icon/styles.css">
        <!-- /font icon Styles -->
        <!-- /load styles -->
        <style>

            .form-group-md>label {
                /*top: 37px;
                */
                top: 40px;
                left: 15px;
                position: relative;
                background-color: white;
                padding: 0px 5px 0px 5px;
                font-size: 1em;
                transition: 0.2s;
                pointer-events: none;
                color: #a1aab2;
            }

            .form-group-md.label-animate>label {
                top: 18px !important;
                left: 16px !important;
                font-size: 1em;
            }

            .form-group-md>input {
                padding-left: 15px;
                padding-right: 15px;
                font-size: 1.3rem;
                padding-top: 8px;
                height: 50px;
            }

            .field-icon {
                float: right;
                margin-right: 8px;
                margin-top: -30px;
                position: relative;
                z-index: 2;
                cursor: pointer;
            }

            .container {
                padding-top: 50px;
                margin: auto;
            }

            .btn-auth:focus{
                box-shadow: 0 0 0 0.2rem #4fc3f7;
            }

            body{
                overflow-x: hidden !important;
            }
        </style>
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
        <div class="row">
            <div class="col-12">
                <div class="card-body" >
                    <div class="row justify-content-center" id="row-login-account"
                         style="margin-top: 50px;">
                        <div class="col-lg-4 col-md-6 col-sm-7">
                            <div class="card">
                                <div class="card-body pb-4">
                                    <div class="row mb-3">
                                        <div class="col-12 text-center">
                                            <img src="<%=request.getContextPath()%>/resources/dev/img/global/logo-and-text-plomo.png"
                                                 alt="logo sisbu" height="80" width="230" />
                                        </div>
                                    </div>
                                    <form id="FrmLogin">
                                        <div class="row">
                                            <div class="col-12" style="height: 70px;top: -10px;">
                                                <div class="form-group form-group-md mb-0">
                                                    <label for="txtUsername">Nombre de Usuario</label>
                                                    <input type="text" class="form-control form-control-md"
                                                           id="txtUsername" maxlength="20" name="login">
                                                </div>
                                            </div>
                                            <div class="col-12 mb-2" style="height: 70px;top: -10px;">
                                                <div class="form-group form-group-md mb-0">
                                                    <label for="txtConfirPasswordUsuario">Contraseña</label>
                                                    <input type="password" class="form-control form-control-md"
                                                           id="txtPass" maxlength="20" name="password">
                                                    <span class="span_icon_password"
                                                          idinput="txtPass">
                                                        <i class="fas fa-eye field-icon"></i>
                                                    </span>
                                                </div>
                                            </div>
                                            <div class="col-12" style="top: -20px;">
                                                <div class="text-right">
                                                    <a class="d-inline-block font-weight-500 mt-4" href="<%=request.getContextPath()%>/recovery">¿Olvidé mi contraseña?</a>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="row">
                                            <div class="col-12" style="top: -10px;">
                                                <h6 class="text-danger mb-2">
                                                    *Ingresa con tu DNI como nombre de usuario y contraseña.
                                                </h6>
                                                <!--h6 class="text-danger mb-2">
                                                    *Si al iniciar sesión recibes este mensaje: "El usuario ingresado no existe", crea una nueva cuenta.
                                                </h6-->
                                            </div>
                                        </div>
                                        <div class="row">
                                            <div class="col-12">
                                                <button type="submit" class="btn btn-primary btn-block text-uppercase">Iniciar Sesión</button>
                                                <!--span class="d-inline-block ml-4">O
                                                                                                <a class="d-inline-block font-weight-500 ml-3" href="/sisbu/signup">Crear una Cuenta</a>
                                                                                            </span-->
                                            </div>
                                        </div>
                                    </form>
                                    <!--div class="row">
                                        <div class="col-12 mt-3">
                                            <h6 class="text-danger mb-2">
                                                Tambien ingresa con
                                            </h6>
                                        </div>
                                        <div class="col-12 mt-2 mb-3">
                                            <button type="button" id="btnLoginWhitGoogle" class="btn btn-outline-danger btn-block text-uppercase">
                                                <i class="icon icon-google-plus icon-xl"></i>
                                                Correo Institucional</button>
                                        </div>
                                    </div-->
                                    <div class="d-flex flex-wrap align-items-center">
                                        <span class="d-inline-block mr-2">Síguenos en</span>
                                        <ul class="dt-list dt-list-sm dt-list-cm-0 ml-auto">
                                            <li class="dt-list__item">
                                                <a href="https://www.facebook.com/BienestarUNPRG/" target="_blank" class="btn btn-outline-primary dt-fab-btn size-30">
                                                    <i class="icon icon-facebook icon-xl"></i>
                                                </a>
                                            </li>
                                            <li class="dt-list__item">
                                                <a href="https://www.youtube.com/channel/UCe_kuooOn2vSa-NxgJ8rn-A" target="_blank" class="btn btn-outline-primary dt-fab-btn size-30">
                                                    <i class="icon icon-youtube icon-xl"></i>
                                                </a>
                                            </li>
                                            <li class="dt-list__item">
                                                <a href="javascript:void(0)" class="btn btn-outline-primary dt-fab-btn size-30">
                                                    <i class="icon icon-instagram icon-xl"></i>
                                                </a>
                                            </li>
                                            <li class="dt-list__item">
                                                <a href="javascript:void(0)" class="btn btn-outline-primary dt-fab-btn size-30">
                                                    <i class="icon icon-twitter icon-xl"></i>
                                                </a>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                                <div class="dt-login__content-footer text-center">
                                    <a href="http://www.unprg.edu.pe/univ/" target="_blank">Universidad Nacional Pedro Ruiz Gallo</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
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

        <div class="modal fade" id="modal-loanding-validate-user-by-email" data-backdrop="static" data-keyboard="false" tabindex="-1" role="dialog" style="padding-top: 18%; overflow-y: visible; display: none;" aria-hidden="true">
            <div class="modal-dialog modal-sm">
                <div class="modal-content">
                    <div class="modal-body">
                        <div class="progress" style="margin-bottom: 0px;">
                            <div class="progress-bar progress-bar-striped progress-bar-animated" role="progressbar" aria-valuenow="100" aria-valuemin="0" aria-valuemax="100" style="width:100%">
                                Verificando cuenta institucional. . .
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="modal fade" id="modalCargandoRegister" data-backdrop="static" data-keyboard="false" tabindex="-1" role="dialog" style="padding-top: 18%; overflow-y: visible; display: none;" aria-hidden="true">
            <div class="modal-dialog modal-sm">
                <div class="modal-content">
                    <div class="modal-body">
                        <div class="progress" style="margin-bottom: 0px;">
                            <div class="progress-bar progress-bar-striped progress-bar-animated" role="progressbar" aria-valuenow="100" aria-valuemin="0" aria-valuemax="100" style="width:100%">
                                Completando registro, por favor espere. . .
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <script src="https://www.google.com/recaptcha/api.js" async defer></script>
        <script src="https://apis.google.com/js/api:client.js"></script>

        <script src="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.4.0/js/all.min.js"></script>
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

        <!--script src="<%out.print(request.getContextPath());%>/scripts/session/change.cookie.js"></script-->
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
