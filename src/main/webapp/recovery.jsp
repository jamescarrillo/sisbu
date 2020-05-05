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
        <title><%=getServletContext().getInitParameter("name.page.base")%> RECOVERY</title>

        <!-- Site favicon -->
        <link rel="shortcut icon" href="<%=request.getContextPath()%>/resources/dev/img/global/logo-short-plomo.png">
        <!-- /site favicon -->

        <!-- Font Icon Styles -->
        <link rel="stylesheet" href="<%=request.getContextPath()%>/plugins/flag-icon-css/css/flag-icon.min.css">
        <link rel="stylesheet" href="<%=request.getContextPath()%>/vendors/gaxon-icon/styles.css">
        <!-- /font icon Styles -->
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.4.0/css/all.min.css">
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
    <body>
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
        <div class="row">
            <div class="col-12">
                <div class="card-body"
                     >
                    <!--ROW REQUEST-->
                    <div class="row justify-content-center" id="row-send-mail-recovery-account"
                         style="margin-top: 100px;">
                        <div class="col-lg-4 col-md-5 col-sm-7">
                            <div class="card">
                                <div class="card-body m-b-0">
                                    <div class="row mt-3 mb-3">
                                        <div class="col-12 text-center">
                                            <img src="<%=request.getContextPath()%>/resources/dev/img/global/logo-and-text-plomo.png"
                                                 alt="logo sisbu" height="90" width="250" />
                                        </div>
                                    </div>
                                    <form id="FrmSendMailRecoveryAccount">
                                        <div class="row">
                                            <div class="col-12" style="height: 70px;top: -5px;">
                                                <div class="form-group form-group-md mb-0">
                                                    <label for="txtEmailRecovery">Email</label>
                                                    <input type="text"
                                                           class="form-control form-control-md email-inputmask"
                                                           id="txtEmailRecovery" maxlength="50">
                                                </div>
                                            </div>
                                            <div class="col-12" style="font-size: 12px; margin-top: 20px">
                                                <h6 class="text-center" style="color: #707070;">
                                                    ¡Ingresa tu email para recibir un código y
                                                    recuperar tu cuenta!</h6>
                                            </div>
                                        </div>
                                        <div class="form-group text-center">
                                            <!--
                                                dev
                                                data-sitekey="6LcmkvIUAAAAACHi45Nm5Cgq4Eu42wIt5UjN3Ocv"
                                                prod
                                                data-sitekey="6LcZgekUAAAAAB-kh5CQLnmSAEOdbVLGQcVYPH0Y"
                                            -->
                                            <div class="col-xs-12 p-b-5">
                                                <button id="btn-send-mail-recovery-account"
                                                        class="btn btn-block btn-info g-recaptcha btn-auth" type="submit"
                                                        data-sitekey="6LcmkvIUAAAAACHi45Nm5Cgq4Eu42wIt5UjN3Ocv"
                                                        data-callback='onSubmitSendMailRecoveryAccount'
                                                        style="background-color: #2ca8d8; border-color: #2ca8d8; font-size: 1.4rem;">Enviar</button>
                                            </div>
                                        </div>
                                        <div class="form-group m-b-0 m-t-5">
                                            <div class="col-sm-12 text-center">
                                                ¿No tienes una cuenta? <a href="<%=request.getContextPath()%>/signup" class="m-l-5"
                                                                          style="color: #024475!important;"><b>Regístrate</b></a>
                                            </div>                                           
                                        </div>
                                        <div class="form-group m-b-0 m-t-10">
                                            <div class="col-sm-12 text-center">
                                                <a href="<%=request.getContextPath()%>/auth/login" class="m-l-5" style="color: #024475"><b><i
                                                            class="fa fa-sign-in-alt"></i>
                                                        Iniciar Sesión</b></a>
                                            </div>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                    <!--ROW CHECK-->
                    <div class="row justify-content-center" id="row-check-recovery-account"
                         style="margin-top: 100px;display: none;">
                        <div class="col-lg-4 col-md-5 col-sm-7">
                            <div class="card">
                                <div class="card-body m-b-0">
                                    <div class="row mt-3 mb-3">
                                        <div class="col-12 text-center">
                                            <img src="<%=request.getContextPath()%>/resources/dev/img/global/logo-and-text-plomo.png"
                                                 alt="logo sisbu" height="90" width="250" />
                                        </div>
                                    </div>
                                    <form id="FrmValidateCodeRecoveryAccount">
                                        <div class="row">
                                            <div class="col-12" style="height: 70px;top: -5px;">
                                                <div class="form-group form-group-md mb-0">
                                                    <label for="txtCodeRecoveryAccount">Código</label>
                                                    <input type="text" class="form-control form-control-md"
                                                           id="txtCodeRecoveryAccount" maxlength="6">
                                                </div>
                                            </div>
                                            <div class="col-12" style="font-size: 12px;margin-top: 20px">
                                                <h6 class="text-center" style="color: #707070;">
                                                    Hola <span id="lbl-name-user-recovery-account"
                                                               style="color: #76c5f0;">James</span>, ingresa el código
                                                    que enviamos a tu email.
                                                </h6>
                                            </div>
                                        </div>
                                        <div class="row">
                                            <div class="col-12">
                                                <div class="form-group text-center">
                                                    <div class="col-xs-12 " style="margin-bottom: 5px; margin-top: 10px">
                                                        <button id="btn-validate-code-recovery-account"
                                                                class="btn btn-block btn-info btn-auth" type="submit"
                                                                style="background-color: #2ca8d8; border-color: #2ca8d8; font-size: 1.4rem;"><i
                                                                class="fas fa-check"></i> Verificar</button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="row mb-4">
                                            <div class="col-12">
                                                <h6 class="text-center text-danger" style="font-size: 12px;">
                                                    Si no recibiste el código, escríbenos a <a style="color: #024475;"
                                                                                               href="mailto:sisbuapp.unprg@gmail.com">sisbuapp.unprg@gmail.com</a>
                                                </h6>
                                            </div>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                    <!--UPDATE PASSWORD-->
                    <div class="row justify-content-center" id="row-change-password-account"
                         style="margin-top: 100px;display: none;">
                        <div class="col-lg-4 col-md-5 col-sm-7">
                            <div class="card">
                                <div class="card-body m-b-0">
                                    <div class="row mt-3 mb-3">
                                        <div class="col-12 text-center">
                                            <img src="<%=request.getContextPath()%>/resources/dev/img/global/logo-and-text-plomo.png"
                                                 alt="logo sisbu" height="90" width="250" />
                                        </div>
                                    </div>
                                    <form id="FrmChangePasswordAccount">
                                        <div class="row">
                                            <div class="col-12" style="height: 70px;top: -10px;">
                                                <div class="form-group form-group-md mb-0">
                                                    <label for="txtPasswordUsuario">Contraseña</label>
                                                    <input type="password" class="form-control form-control-md"
                                                           id="txtPasswordUsuario" maxlength="20">
                                                    <span class="span_icon_password"
                                                          idinput="txtPasswordUsuario">
                                                        <i class="fas fa-eye field-icon"></i>
                                                    </span>
                                                </div>
                                            </div>
                                            <div class="col-12 mb-2" style="height: 70px;top: -10px;">
                                                <div class="form-group form-group-md mb-0">
                                                    <label for="txtConfirPasswordUsuario">Confirmar Contraseña</label>
                                                    <input type="password" class="form-control form-control-md"
                                                           id="txtConfirPasswordUsuario" maxlength="20">
                                                    <span class="span_icon_password"
                                                          idinput="txtConfirPasswordUsuario">
                                                        <i class="fas fa-eye field-icon"></i>
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="row">
                                            <div class="col-12">
                                                <div class="form-group text-center">
                                                    <div class="col-xs-12" style="margin-bottom: 5px; margin-top: 10px">
                                                        <button id="btn-change-password-account"
                                                                class="btn btn-block btn-info btn-auth" type="submit"
                                                                style="background-color: #2ca8d8; border-color: #2ca8d8; font-size: 1.4rem;"><i
                                                                class="fas fa-check"></i> Cambiar Contraseña</button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="row mb-4">
                                            <div class="col-12">
                                                <h6 class="text-center text-danger" style="font-size: 12px;">
                                                    Si tienes inconvenientes para actualizar tu clave, escríbenos a <a
                                                        style="color: #024475;"
                                                        href="mailto:sisbuapp.unprg@gmail.com">sisbuapp.unprg@gmail.com</a>
                                                </h6>
                                            </div>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="modal" id="modal-loanding-recovery-account" data-backdrop="static" data-keyboard="false"
             tabindex="-1" role="dialog" aria-hidden="true" style="padding-top: 18%; overflow-y: visible;">
            <div class="modal-dialog modal-sm">
                <div class="modal-content">
                    <div class="modal-body">
                        <div class="progress" style="margin-bottom: 0px;height: 15px;">
                            <div class="progress-bar progress-bar-striped progress-bar-animated lbl-loanding-recovery-account"
                                 role="progressbar" aria-valuenow="100" aria-valuemin="0" aria-valuemax="100"
                                 style="width: 100%;background-color: #2ca8d8">
                                Enviando código de recuperación...
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="modal" id="modal-loanding-validate-captcha" data-backdrop="static" data-keyboard="false"
             tabindex="-1" role="dialog" aria-hidden="true" style="padding-top: 18%; overflow-y: visible;">
            <div class="modal-dialog modal-sm">
                <div class="modal-content">
                    <div class="modal-body">
                        <div class="progress" style="margin-bottom: 0px;height: 15px;">
                            <div class="progress-bar progress-bar-striped progress-bar-animated lbl-loanding-recovery-account"
                                 role="progressbar" aria-valuenow="100" aria-valuemin="0" aria-valuemax="100"
                                 style="width: 100%;background-color: #2ca8d8">
                                Enviando código de recuperación...
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- Optional JavaScript -->
        <script src="https://www.google.com/recaptcha/api.js" async defer></script>

        <script src="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.4.0/js/all.min.js"></script>
        <script src="<%=request.getContextPath()%>/plugins/jquery/dist/jquery.min.js"></script>
        <script src="<%=request.getContextPath()%>/plugins/moment/moment.js"></script>
        <script src="<%=request.getContextPath()%>/plugins/bootstrap/dist/js/bootstrap.bundle.min.js"></script>
        <!-- Perfect Scrollbar jQuery -->
        <script src="<%=request.getContextPath()%>/plugins/inputmask/js/jquery.inputmask.bundle.js"></script>
        <!-- /perfect scrollbar jQuery -->

        <!--JS COMPLEMENTS-->
        <script src="<%out.print(request.getContextPath());%>/scripts/util/functions.js?v=0.04"></script>
        <script src="<%out.print(request.getContextPath());%>/scripts/util/functions_alerts.js?v=0.04"></script>
        <script src="<%out.print(request.getContextPath());%>/scripts/util/functions_operational.js?v=0.04"></script>
        <script src="<%out.print(request.getContextPath());%>/scripts/util/configuration_api.js?v=0.04"></script>

        <!-- masonry script -->
        <script src="<%=request.getContextPath()%>/plugins/sweetalert2/dist/sweetalert2.js"></script>
        <script src="<%=request.getContextPath()%>/assets/js/functions.js"></script>

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
