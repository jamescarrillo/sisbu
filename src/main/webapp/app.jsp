<%-- 
    Document   : app
    Created on : 23 ago. 2019, 10:38:18
    Author     : James Carrillo
--%>

<%@page import="com.ogbu.unprg.sisbu.util.Resource"%>
<%@page contentType="text/html" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html lang="es">
    <head>
        <jsp:include page="zinclude_pages/meta_tags.jsp" />
        <title><%=getServletContext().getInitParameter("name.page.base")%></title>

        <!-- Site favicon -->
        <!--link rel="shortcut icon" href="<%=request.getContextPath()%>/assets/listing/images/favicon.ico" type="image/x-icon"-->
        <link rel="shortcut icon" href="<%=request.getContextPath()%>/resources/dev/img/global/logo-short-plomo.png">
        <!-- /site favicon -->

        <!-- Font Icon Styles -->
        <link rel="stylesheet" href="<%=request.getContextPath()%>/plugins/flag-icon-css/css/flag-icon.min.css">
        <link rel="stylesheet" href="<%=request.getContextPath()%>/vendors/gaxon-icon/styles.css">

        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.4.0/css/all.min.css">

        <link rel="stylesheet" href="<%=request.getContextPath()%>/plugins/picker/css/bootstrap-material-datetimepicker.css" />
        <link href='http://fonts.googleapis.com/css?family=Roboto:400,500' rel='stylesheet' type='text/css'>
        <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">

        <!-- /font icon Styles -->

        <!-- Perfect Scrollbar stylesheet -->
        <link rel="stylesheet" href="<%=request.getContextPath()%>/plugins/perfect-scrollbar/css/perfect-scrollbar.css">
        <!-- /perfect scrollbar stylesheet -->

        <!-- Load Styles -->
        <link rel="stylesheet" href="<%=request.getContextPath()%>/plugins/owl.carousel/dist/assets/owl.carousel.min.css">
        <link rel="stylesheet" href="<%=request.getContextPath()%>/plugins/chartist/dist/chartist.min.css">

        <link rel="stylesheet" href="<%=request.getContextPath()%>/plugins/summernote/dist/summernote-bs4.css">

        <link rel="stylesheet" href="<%=request.getContextPath()%>/assets/css/semidark-style-1.min.css">

        <link rel="stylesheet" href="<%=request.getContextPath()%>/assets/css/light-style-10.min.css">
        <!-- /load styles -->

        <link rel="stylesheet" href="<%=request.getContextPath()%>/css/styles_sisbu.css">

        <link rel="stylesheet" href="<%=request.getContextPath()%>/plugins/chart.js/dist/Chart.min.css">

        <link rel="stylesheet" href="<%=request.getContextPath()%>/plugins/picker/css/bootstrap-material-datetimepicker.css">

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
                <!-- Header -->
                <header class="dt-header">

                    <!-- Header container -->
                    <div class="dt-header__container">

                        <!-- Brand -->
                        <div class="dt-brand">

                            <!-- Brand tool -->
                            <div class="dt-brand__tool" data-toggle="main-sidebar">
                                <div class="hamburger-inner"></div>
                            </div>
                            <!-- /brand tool -->

                            <!-- Brand logo -->
                            <span class="dt-brand__logo">
                                <a class="dt-brand__logo-link a-index sisbu-cursor-mano">
                                    <img class="dt-brand__logo-img d-none d-sm-inline-block" src="<%=request.getContextPath()%>/resources/dev/img/global/logo-plomo.png" alt="Logo Sisbu">
                                    <img class="dt-brand__logo-symbol d-sm-none" src="<%=request.getContextPath()%>/resources/dev/img/global/logo-short-plomo.png" alt="Logo Sisbu">
                                </a>
                            </span>
                            <!-- /brand logo -->

                        </div>
                        <!-- /brand -->

                        <!-- Header toolbar-->
                        <div class="dt-header__toolbar">

                            <!-- Header Menu Wrapper -->
                            <div class="dt-nav-wrapper">

                                <!-- Header Menu -->
                                <ul class="dt-nav">
                                    <li class="dt-nav__item dt-notification dropdown">

                                        <!-- Dropdown Link -->
                                        <a href="#" class="dt-nav__link dropdown-toggle no-arrow" data-toggle="dropdown"
                                           aria-haspopup="true" aria-expanded="false"> <i
                                                class="icon icon-notification2 icon-fw dt-icon-alert"></i>
                                        </a>
                                        <!-- /dropdown link -->

                                        <!-- Dropdown Option -->
                                        <div class="dropdown-menu dropdown-menu-right dropdown-menu-media">
                                            <!-- Dropdown Menu Header -->
                                            <div class="dropdown-menu-header">
                                                <h4 class="title">Notificaciones (0)</h4>

                                                <div class="ml-auto action-area">
                                                    <a href="javascript:void(0)">Marcar todos como leídos</a> <a class="ml-2"
                                                                                                                 href="javascript:void(0)">
                                                        <i class="icon icon-settings icon-lg text-light-gray"></i> </a>
                                                </div>
                                            </div>
                                            <!-- /dropdown menu header -->

                                            <!-- Dropdown Menu Body -->
                                            <!--div class="dropdown-menu-body ps-custom-scrollbar">
                                                <div class="h-auto">
                                                    <a href="javascript:void(0)" class="media">
                                                        <img class="dt-avatar mr-3" src="https://via.placeholder.com/150x150"
                                                             alt="User">
                                                        <span class="media-body">
                                                            <span class="message">
                                                                <span class="user-name">Stella Johnson</span> and <span class="user-name">Chris Harris</span>
                                                                have birthdays today. Help them celebrate!
                                                            </span>
                                                            <span class="meta-date">8 hours ago</span>
                                                        </span>
                                                    </a>
                                                </div>
                                            </div-->
                                            <div class="dropdown-menu-footer">
                                                <a href="javascript:void(0)" class="card-link"> Ver todo <i
                                                        class="icon icon-arrow-right icon-fw"></i>
                                                </a>
                                            </div>
                                            <!-- /dropdown menu footer -->
                                        </div>
                                        <!-- /dropdown option -->
                                    </li>
                                </ul>
                                <!-- /header menu -->

                                <!-- Header Menu -->
                                <ul class="dt-nav">
                                    <li class="dt-nav__item dropdown">
                                        <!-- Dropdown Link -->
                                        <a href="#" class="dt-nav__link dropdown-toggle no-arrow dt-avatar-wrapper"
                                           data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                            <img class="dt-avatar size-30" src="https://via.placeholder.com/150x150"
                                                 alt="Foto User">
                                            <span class="dt-avatar-info d-none d-sm-block">
                                                <span class="dt-avatar-name name-user-session">James Carrillo</span>
                                            </span> </a>
                                        <!-- /dropdown link -->
                                        <!-- Dropdown Option -->
                                        <div class="dropdown-menu dropdown-menu-right">
                                            <div class="dt-avatar-wrapper flex-nowrap p-6 mt-n2 bg-gradient-purple text-white rounded-top" style="background-image: linear-gradient(135deg, #1079a9, #b9abab);">
                                                <img class="dt-avatar" src="https://via.placeholder.com/150x150"
                                                     alt="Foto User">
                                                <span class="dt-avatar-info">
                                                    <span class="dt-avatar-name name-user-session">James Carrillo</span>
                                                    <span class="f-12 name-type-user-session">Sistemas</span>
                                                </span>
                                            </div>
                                            <a class="dropdown-item" id="a-mi-perfil" href="javascript:void(0)">
                                                <i class="icon icon-user icon-fw mr-2 mr-sm-1"></i>Mi Perfil
                                            </a>
                                            <a class="dropdown-item" id="a-mis-datos" href="javascript:void(0)"> 
                                                <i class="icon icon-user-account icon-fw mr-2 mr-sm-1"></i>Mis Datos
                                            </a> 
                                            <a class="dropdown-item a-close-session" href="javascript:void(0)"> <i
                                                    class="icon icon-arrow-right icon-fw mr-2 mr-sm-1"></i>Cerrar Sesión
                                            </a>
                                        </div>
                                        <!-- /dropdown option -->

                                    </li>
                                </ul>
                                <!-- /header menu -->
                            </div>
                            <!-- Header Menu Wrapper -->

                        </div>
                        <!-- /header toolbar -->

                    </div>
                    <!-- /header container -->

                </header>
                <!-- /header -->

                <!-- Site Main -->
                <main class="dt-main">
                    <!-- Sidebar -->
                    <aside id="main-sidebar" class="dt-sidebar">
                        <div class="dt-sidebar__container" >

                            <!-- Sidebar Navigation -->
                            <ul class="dt-side-nav" id="menus_sisbu">

                            </ul>
                            <!-- /sidebar navigation -->

                        </div>
                    </aside>
                    <!-- /sidebar -->

                    <!-- Site Content Wrapper -->
                    <div class="dt-content-wrapper">

                        <!-- Site Content -->
                        <div class="dt-content">

                            <!--INCLUDE HTML-->
                            <div class="container-dinamic-sisbu">
                                <jsp:include page="<%= resource.getPath()%>" />
                            </div>
                        </div>
                        <!-- /site content -->

                        <!-- Footer -->
                        <footer class="dt-footer">
                            Copyright OGBU-UNPRG © 2019 v 2.0
                        </footer>
                        <!-- /footer -->

                    </div>
                    <!-- /site content wrapper -->


                    <!-- Theme Chooser -->
                    <div class="dt-customizer-toggle" style="top: 530px">
                        <a href="javascript:void(0)" data-toggle="customizer"> <i
                                class="icon icon-customizer animation-customizer"></i> </a>
                    </div>
                    <!-- /theme chooser -->

                    <!-- Customizer Sidebar -->
                    <aside class="dt-customizer dt-drawer position-right">
                        <div class="dt-customizer__inner">

                            <!-- Customizer Header -->
                            <div class="dt-customizer__header">

                                <!-- Customizer Title -->
                                <div class="dt-customizer__title">
                                    <h3 class="mb-0">Theme Settings</h3>
                                </div>
                                <!-- /customizer title -->

                                <!-- Close Button -->
                                <button type="button" class="close" data-toggle="customizer">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                                <!-- /close button -->

                            </div>
                            <!-- /customizer header -->

                            <!-- Customizer Body -->
                            <div class="dt-customizer__body ps-custom-scrollbar">
                                <!-- Customizer Body Inner  -->
                                <div class="dt-customizer__body-inner">

                                    <!-- Section -->
                                    <section>
                                        <h4>Theme</h4>

                                        <!-- List -->
                                        <ul class="dt-list dt-list-sm" id="theme-chooser">
                                            <li class="dt-list__item">
                                                <div class="choose-option">
                                                    <a href="javascript:void(0)" class="choose-option__icon" data-theme="light">
                                                        <img src="<%=request.getContextPath()%>/assets/images/customizer-icons/theme-light.png" alt="Light">
                                                    </a>
                                                    <span class="choose-option__name">Light</span>
                                                </div>
                                            </li>
                                            <li class="dt-list__item">
                                                <div class="choose-option">
                                                    <a href="javascript:void(0)" class="choose-option__icon"
                                                       data-theme="semidark">
                                                        <img src="<%=request.getContextPath()%>/assets/images/customizer-icons/theme-normal.png" alt="Normal">
                                                    </a>
                                                    <span class="choose-option__name">Semi-dark</span>
                                                </div>
                                            </li>
                                            <li class="dt-list__item">
                                                <div class="choose-option">
                                                    <a href="javascript:void(0)" class="choose-option__icon" data-theme="dark">
                                                        <img src="<%=request.getContextPath()%>/assets/images/customizer-icons/theme-dark.png" alt="Dark">
                                                    </a>
                                                    <span class="choose-option__name">Dark</span>
                                                </div>
                                            </li>
                                        </ul>
                                        <!-- /list -->

                                    </section>
                                    <!-- /section -->

                                    <!-- Section -->
                                    <section>
                                        <h4>Style</h4>

                                        <!-- List -->
                                        <ul class="dt-list dt-list-sm">
                                            <li class="dt-list__item d-none d-lg-block">
                                                <div class="choose-option">
                                                    <a href="javascript:void(0)" id="toggle-fixed-sidebar"
                                                       class="choose-option__icon">
                                                        <img src="<%=request.getContextPath()%>/assets/images/customizer-icons/fix-sidebar.png"
                                                             alt="Fix Sidebar">
                                                    </a>
                                                    <span class="choose-option__name">Fix Sidebar</span>
                                                </div>
                                            </li>
                                            <li class="dt-list__item">
                                                <div class="choose-option">
                                                    <a href="javascript:void(0)" id="toggle-fixed-header"
                                                       class="choose-option__icon">
                                                        <img src="<%=request.getContextPath()%>/assets/images/customizer-icons/fix-header.png"
                                                             alt="Fix Header">
                                                    </a>
                                                    <span class="choose-option__name">Fix Header</span>
                                                </div>
                                            </li>
                                        </ul>
                                        <!-- /list -->

                                    </section>
                                    <!-- /section -->

                                    <!-- Section -->
                                    <section id="theme-style-chooser">
                                        <h4>Color</h4>

                                        <!-- List -->
                                        <ul class="dt-list dt-list-sm dt-color-options">
                                            <li class="dt-list__item">
                                                <span class="dt-color-option" data-style="style-1"></span>
                                            </li>
                                            <li class="dt-list__item">
                                                <span class="dt-color-option" data-style="style-2"></span>
                                            </li>
                                            <li class="dt-list__item">
                                                <span class="dt-color-option" data-style="style-3"></span>
                                            </li>
                                            <li class="dt-list__item">
                                                <span class="dt-color-option" data-style="style-4"></span>
                                            </li>
                                            <li class="dt-list__item">
                                                <span class="dt-color-option" data-style="style-5"></span>
                                            </li>
                                            <li class="dt-list__item">
                                                <span class="dt-color-option" data-style="style-6"></span>
                                            </li>
                                            <li class="dt-list__item">
                                                <span class="dt-color-option" data-style="style-7"></span>
                                            </li>
                                            <li class="dt-list__item">
                                                <span class="dt-color-option" data-style="style-8"></span>
                                            </li>
                                            <li class="dt-list__item">
                                                <span class="dt-color-option" data-style="style-9"></span>
                                            </li>
                                            <li class="dt-list__item">
                                                <span class="dt-color-option" data-style="style-10"></span>
                                            </li>
                                        </ul>
                                        <!-- /list -->

                                    </section>
                                    <!-- /section -->

                                    <!-- Section -->
                                    <section class="d-none d-lg-block" id="sidebar-layout">
                                        <h4>Sidebar Layout</h4>

                                        <!-- List -->
                                        <ul class="dt-list dt-list-sm">
                                            <li class="dt-list__item">
                                                <div class="choose-option">
                                                    <a href="javascript:void(0)" class="choose-option__icon" id="sl-option1"
                                                       data-value="folded">
                                                        <img src="<%=request.getContextPath()%>/assets/images/customizer-icons/folded.png" alt="Folded">
                                                    </a>
                                                    <span class="choose-option__name">Folded</span>
                                                </div>
                                            </li>
                                            <li class="dt-list__item">
                                                <div class="choose-option">
                                                    <a href="javascript:void(0)" class="choose-option__icon" id="sl-option2"
                                                       data-value="default">
                                                        <img src="<%=request.getContextPath()%>/assets/images/customizer-icons/default.png" alt="Default">
                                                    </a>
                                                    <span class="choose-option__name">Default</span>
                                                </div>
                                            </li>
                                            <li class="dt-list__item">
                                                <div class="choose-option">
                                                    <a href="javascript:void(0)" class="choose-option__icon" id="sl-option3"
                                                       data-value="drawer">
                                                        <img src="<%=request.getContextPath()%>/assets/images/customizer-icons/drawer.png" alt="Drawer">
                                                    </a>
                                                    <span class="choose-option__name">Drawer</span>
                                                </div>
                                            </li>
                                        </ul>
                                        <!-- /list -->

                                    </section>
                                    <!-- /section -->

                                    <!-- Section -->
                                    <section class="d-none d-lg-block" id="layout-chooser">
                                        <h4>Layout</h4>

                                        <!-- List -->
                                        <ul class="dt-list dt-list-sm">
                                            <li class="dt-list__item">
                                                <div class="choose-option">
                                                    <a href="javascript:void(0)" class="choose-option__icon"
                                                       data-layout="framed">
                                                        <img src="<%=request.getContextPath()%>/assets/images/customizer-icons/framed.png" alt="Framed">
                                                    </a>
                                                    <span class="choose-option__name">Framed</span>
                                                </div>
                                            </li>
                                            <li class="dt-list__item">
                                                <div class="choose-option">
                                                    <a href="javascript:void(0)" class="choose-option__icon"
                                                       data-layout="full-width">
                                                        <img src="<%=request.getContextPath()%>/assets/images/customizer-icons/full-width.png"
                                                             alt="Full Width">
                                                    </a>
                                                    <span class="choose-option__name">Full Width</span>
                                                </div>
                                            </li>
                                            <li class="dt-list__item">
                                                <div class="choose-option">
                                                    <a href="javascript:void(0)" class="choose-option__icon"
                                                       data-layout="boxed">
                                                        <img src="<%=request.getContextPath()%>/assets/images/customizer-icons/boxed.png" alt="Boxed">
                                                    </a>
                                                    <span class="choose-option__name">Boxed</span>
                                                </div>
                                            </li>
                                        </ul>
                                        <!-- /list -->

                                    </section>
                                    <!-- /section -->

                                    <!-- Section -->
                                    <section>
                                        <h4>Nav Style</h4>

                                        <!-- List -->
                                        <ul class="dt-list">
                                            <li class="dt-list__item">
                                                <div class="choose-option">
                                                    <a href="http://drift.g-axon.work/html-bs4/default" target="_blank"
                                                       class="choose-option__icon">
                                                        <img src="<%=request.getContextPath()%>/assets/images/customizer-icons/layout-default.png"
                                                             alt="Layout Default">
                                                    </a>
                                                    <span class="choose-option__name">Default</span>
                                                </div>
                                            </li>
                                            <li class="dt-list__item">
                                                <div class="choose-option">
                                                    <a href="http://drift.g-axon.work/html-bs4/saas" target="_blank"
                                                       class="choose-option__icon">
                                                        <img src="<%=request.getContextPath()%>/assets/images/customizer-icons/layout-saas.png"
                                                             alt="Layout SAAS">
                                                    </a>
                                                    <span class="choose-option__name">SAAS Layout</span>
                                                </div>
                                            </li>
                                            <li class="dt-list__item">
                                                <div class="choose-option">
                                                    <a href="http://drift.g-axon.work/html-bs4/listing" target="_blank"
                                                       class="choose-option__icon">
                                                        <img src="<%=request.getContextPath()%>/assets/images/customizer-icons/layout-listing.png"
                                                             alt="Layout listing">
                                                    </a>
                                                    <span class="choose-option__name">Listing</span>
                                                </div>
                                            </li>
                                            <li class="dt-list__item">
                                                <div class="choose-option">
                                                    <a href="http://drift.g-axon.work/html-bs4/intranet" target="_blank"
                                                       class="choose-option__icon">
                                                        <img src="<%=request.getContextPath()%>/assets/images/customizer-icons/layout-intranet.png"
                                                             alt="Layout Intranet">
                                                    </a>
                                                    <span class="choose-option__name">Intranet</span>
                                                </div>
                                            </li>
                                            <li class="dt-list__item">
                                                <div class="choose-option">
                                                    <a href="http://drift.g-axon.work/html-bs4/back-office" target="_blank"
                                                       class="choose-option__icon">
                                                        <img src="<%=request.getContextPath()%>/assets/images/customizer-icons/layout-back-office.png"
                                                             alt="Layout Back Office">
                                                    </a>
                                                    <span class="choose-option__name">Back Office</span>
                                                </div>
                                            </li>
                                            <li class="dt-list__item">
                                                <div class="choose-option">
                                                    <a href="http://drift.g-axon.work/html-bs4/back-office-mini" target="_blank"
                                                       class="choose-option__icon">
                                                        <img src="<%=request.getContextPath()%>/assets/images/customizer-icons/layout-back-office-mini.png"
                                                             alt="Layout Back Office Minimal">
                                                    </a>
                                                    <span class="choose-option__name">Back Office Minimal</span>
                                                </div>
                                            </li>
                                            <li class="dt-list__item">
                                                <div class="choose-option">
                                                    <a href="http://drift.g-axon.work/html-bs4/modern" target="_blank"
                                                       class="choose-option__icon">
                                                        <img src="<%=request.getContextPath()%>/assets/images/customizer-icons/layout-modern.png"
                                                             alt="Layout Modern">
                                                    </a>
                                                    <span class="choose-option__name">Modern</span>
                                                </div>
                                            </li>
                                            <li class="dt-list__item">
                                                <div class="choose-option">
                                                    <a href="http://drift.g-axon.work/html-bs4/crm" target="_blank"
                                                       class="choose-option__icon">
                                                        <img src="<%=request.getContextPath()%>/assets/images/customizer-icons/layout-crm.png"
                                                             alt="Layout CRM">
                                                    </a>
                                                    <span class="choose-option__name">CRM</span>
                                                </div>
                                            </li>
                                        </ul>
                                        <!-- /list -->

                                    </section>
                                    <!-- /section -->

                                </div>
                                <!-- /customizer body inner -->
                            </div>
                            <!-- /customizer body -->

                        </div>
                    </aside>
                    <!-- /customizer sidebar -->

                </main>
            </div>
        </div>
        <!-- /root -->

        <!-- Optional JavaScript -->
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
        <script src="<%out.print(request.getContextPath());%>/scripts/util/functions_file.js?v=0.04"></script>
        <script src="<%out.print(request.getContextPath());%>/scripts/util/configuration_api.js?v=0.04"></script>
        <script src="<%out.print(request.getContextPath());%>/scripts/util/shortcut.js"></script>

        <!-- masonry script -->
        <script src="<%=request.getContextPath()%>/plugins/masonry-layout/dist/masonry.pkgd.min.js"></script>
        <script src="<%=request.getContextPath()%>/plugins/sweetalert2/dist/sweetalert2.js"></script>
        <script src="<%=request.getContextPath()%>/assets/js/functions.js"></script>
        <script src="<%=request.getContextPath()%>/assets/js/customizer.js"></script>

        <script src="<%out.print(request.getContextPath());%>/scripts/session/change.cookie.js"></script>
        <script src="<%out.print(request.getContextPath());%>/scripts/session/js.cookie.js?v=0.04"></script>
        <script src="<%out.print(request.getContextPath());%>/scripts/session/session.validate.js?v=0.04"></script>
        <script src="<%out.print(request.getContextPath());%>/scripts/session/session.validate.init.js?v=0.04"></script>

        <!-- Custom JavaScript -->
        <script src="<%=request.getContextPath()%>/plugins/chartist/dist/chartist.min.js"></script>
        <script src="<%=request.getContextPath()%>/plugins/summernote/dist/summernote-bs4.js"></script>
        <script src="<%=request.getContextPath()%>/plugins/summernote/dist/lang/summernote-es-ES.js"></script>
        <script src="<%=request.getContextPath()%>/plugins/owl.carousel/dist/owl.carousel.min.js"></script>
        <script src="<%=request.getContextPath()%>/assets/js/script.js"></script>
        <script src="<%=request.getContextPath()%>/assets/js/custom/charts/dashboard-listing.js"></script>

        <script src="<%=request.getContextPath()%>/plugins/jquery-pagination/jquery.Pagination.min.js"></script>
        <script src="<%=request.getContextPath()%>/plugins/chart.js/dist/Chart.min.js"></script>
        <script src="<%=request.getContextPath()%>/plugins/picker/js/bootstrap-material-datetimepicker.js"></script>

        <script src="<%out.print(request.getContextPath());%>/scripts/init_parameters.js"></script>

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
