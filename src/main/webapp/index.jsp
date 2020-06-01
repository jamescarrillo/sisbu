<%-- 
    Document   : index
    Created on : 24 ago. 2019, 11:49:01
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
        <meta name="description" content="Sistema de Bienestar Universitario - SISBU">
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
        <title>Sistema de Bienestar Universitario - SISBU</title>

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
        <link rel="stylesheet" href="<%=request.getContextPath()%>/plugins/owl.carousel/dist/assets/owl.carousel.min.css">
        <link rel="stylesheet" href="<%=request.getContextPath()%>/assets/listing/css/style.min.css">
        <!-- /load styles -->

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

        <!-- Root -->
        <div class="dt-root">
            <div class="dt-root__inner">

                <!-- Header -->
                <header class="dt-header">

                    <!-- Topbar -->
                    <div class="dt-topbar">

                        <!-- Custom Container -->
                        <div class="dt-container">

                            <!-- Topbar Inner -->
                            <div class="dt-topbar__inner">
                                <div class="d-flex align-items-center text-truncate mr-2">
                                    <i class="icon icon-megaphone icon-fw mr-3 icon-xl"></i>
                                    <span class="text-truncate">Bienvenidos estudiantes de la UNPRG</span>
                                </div>

                                <ul class="dt-list dt-list-xl dt-list-bordered text-uppercase">
                                    <li class="dt-list__item">
                                        <a href="<%=request.getContextPath()%>/auth/login" class="dt-list__link">Iniciar Sesión</a>
                                    </li>
                                    <li class="dt-list__item">
                                        <a href="<%=request.getContextPath()%>/signup" class="dt-list__link">Crear Cuenta</a>
                                    </li>
                                </ul>
                            </div>
                            <!-- /topbar inner -->

                        </div>
                        <!-- /custom container -->

                    </div>
                    <!-- /topbar -->

                    <!-- Header Top -->
                    <div class="dt-header__top">

                        <!-- Custom Container -->
                        <div class="dt-container">

                            <!-- Brand -->
                            <div class="dt-brand">

                                <!-- Brand tool -->
                                <div class="dt-brand__tool d-lg-none" data-toggle="main-sidebar">
                                    <div class="hamburger-inner"></div>
                                </div>
                                <!-- /brand tool -->

                                <!-- Brand logo -->
                                <span class="dt-brand__logo">
                                    <a class="dt-brand__logo-link" href="<%=request.getContextPath()%>/index">
                                        <img class="dt-brand__logo-img d-none d-sm-inline-block" src="<%=request.getContextPath()%>/resources/dev/img/global/logo-plomo.png" alt="Logo Sisbu">
                                        <img class="dt-brand__logo-symbol d-sm-none" src="<%=request.getContextPath()%>/resources/dev/img/global/logo-short-plomo.png" alt="Logo Sisbu">
                                    </a>
                                </span>
                                <!-- /brand logo -->

                            </div>
                            <!-- /brand -->

                            <!-- Header toolbar-->
                            <div class="dt-header__toolbar">

                                <!-- Navbar -->
                                <ul class="navbar-nav navbar-expand-lg dt-navbar d-none d-lg-flex">

                                    <!-- Nav Item -->
                                    <li class="nav-item">
                                        <a class="nav-link" href="<%=request.getContextPath()%>/index">Inicio</a>
                                    </li>
                                    <!-- /nav item -->

                                    <!-- Nav Item -->
                                    <li class="nav-item">
                                        <a class="nav-link" href="javascript:void(0)">Oficinas</a>
                                        <!-- Sub-menu -->
                                        <ul class="sub-menu">
                                            <!-- Nav Item -->
                                            <li class="nav-item">
                                                <a href="javascript:void(0)" class="nav-link dt-side-nav__arrow">
                                                    <i class="icon icon-company icon-fw icon-xl"></i> <span class="nav-text">Oficina de Servicio Médico</span> </a>
                                                <!-- Sub-menu -->
                                                <ul class="sub-menu">
                                                    <li class="nav-item">
                                                        <a href="javascript:void(0)" class="nav-link">
                                                            <i class="icon icon-components icon-fw icon-xl"></i> <span class="nav-text">Área de Servicio de Enfermería</span> </a>
                                                    </li>
                                                    <li class="nav-item">
                                                        <a href="javascript:void(0)" class="nav-link">
                                                            <i class="icon icon-home icon-fw icon-xl"></i> <span class="nav-text">Área de Servicio de Farmácia</span> </a>
                                                    </li>
                                                    <li class="nav-item">
                                                        <a href="javascript:void(0)" class="nav-link">
                                                            <i class="icon icon-contacts-app icon-fw icon-xl"></i> <span class="nav-text">Área de Servicio de Obtetricia</span> </a>
                                                    </li>
                                                    <li class="nav-item">
                                                        <a href="javascript:void(0)" class="nav-link">
                                                            <i class="icon icon-customer icon-fw icon-xl"></i> <span class="nav-text">Área de Servicio Médico</span> </a>
                                                    </li>
                                                    <li class="nav-item">
                                                        <a href="javascript:void(0)" class="nav-link">
                                                            <i class="icon icon-link icon-fw icon-xl"></i> <span class="nav-text">Área de Servicio Odontológico</span> </a>
                                                    </li>
                                                </ul>
                                                <!-- /sub-menu -->
                                            </li>
                                            <!-- /nav item -->

                                            <!-- Nav Item -->
                                            <li class="nav-item">
                                                <a href="javascript:void(0)" class="nav-link dt-side-nav__arrow">
                                                    <i class="icon icon-heart-o icon-fw icon-xl"></i> <span class="nav-text">Oficina de Servicio Psicopedagógico</span> </a>
                                                <!-- Sub-menu -->
                                                <ul class="sub-menu">
                                                    <li class="nav-item">
                                                        <a href="javascript:void(0)" class="nav-link">
                                                            <i class="icon icon-pin icon-fw icon-xl"></i> <span class="nav-text">Área de Psicopedagogía</span> </a>
                                                    </li>
                                                </ul>
                                                <!-- /sub-menu -->
                                            </li>
                                            <!-- /nav item -->

                                            <!-- Nav Item -->
                                            <li class="nav-item">
                                                <a href="javascript:void(0)" class="nav-link dt-side-nav__arrow">
                                                    <i class="icon icon-users icon-fw icon-xl"></i> <span class="nav-text">Oficina de Servicio Social</span> </a>
                                                <!-- Sub-menu -->
                                                <ul class="sub-menu">
                                                    <li class="nav-item">
                                                        <a href="javascript:void(0)" class="nav-link">
                                                            <i class="icon icon-user icon-fw icon-xl"></i> <span class="nav-text">Área de Servicio Social</span> </a>
                                                    </li>
                                                    <li class="nav-item">
                                                        <a href="javascript:void(0)" class="nav-link">
                                                            <i class="icon icon-refer icon-fw icon-xl"></i> <span class="nav-text">Servicio de Comedor Universitario</span> </a>
                                                    </li>
                                                </ul>
                                                <!-- /sub-menu -->
                                            </li>
                                            <!-- /nav item -->

                                            <!-- Nav Item -->
                                            <li class="nav-item">
                                                <a href="javascript:void(0)" class="nav-link dt-side-nav__arrow">
                                                    <i class="icon icon-ripple icon-fw icon-xl"></i> <span class="nav-text">Oficina de educación, recreación y deporte</span> </a>
                                                <!-- Sub-menu -->
                                                <ul class="sub-menu">
                                                    <li class="nav-item">
                                                        <a href="javascript:void(0)" class="nav-link">
                                                            <i class="icon icon-icons icon-fw icon-xl"></i> <span class="nav-text">Área de educación, recreación y deporte</span> </a>
                                                    </li>
                                                </ul>
                                                <!-- /sub-menu -->
                                            </li>
                                            <!-- /nav item -->
                                        </ul>
                                        <!-- /sub-menu -->
                                    </li>
                                    <!-- /nav item -->

                                    <!-- Nav Item -->
                                    <li class="nav-item">
                                        <a class="nav-link" href="<%=request.getContextPath()%>/news">Noticias</a>
                                    </li>
                                    <!-- /nav item -->

                                    <!-- Nav Item -->
                                    <li class="nav-item">
                                        <a class="nav-link" href="<%=request.getContextPath()%>/downloads">Descargas</a>
                                    </li>
                                    <!-- /nav item -->

                                    <!-- Nav Item -->
                                    <li class="nav-item">
                                        <a class="nav-link" href="javascript:void(0)">Proyecto Sisbu</a>
                                        <!-- Sub-menu -->
                                        <ul class="sub-menu">
                                            <!-- Nav Item -->
                                            <li class="nav-item">
                                                <a href="javascript:void(0)" class="nav-link"> <i
                                                        class="icon icon-question-circle icon-fw icon-xl"></i>
                                                    <span class="nav-text" style="text-transform: none">¿Que es?</span> </a>
                                            </li>
                                            <!-- /nav item -->
                                            <!-- Nav Item -->
                                            <li class="nav-item">
                                                <a href="javascript:void(0)" class="nav-link"> <i
                                                        class="icon icon-users icon-fw icon-xl"></i>
                                                    <span class="nav-text" style="text-transform: none">¿Quienes integran el equipo Sisbu?</span> </a>
                                            </li>
                                            <!-- /nav item -->

                                            <!-- Nav Item -->
                                            <li class="nav-item">
                                                <a href="javascript:void(0)" class="nav-link">
                                                    <i class="icon icon-news icon-fw icon-xl"></i> <span class="nav-text" style="text-transform: none">¿Como ser parte?</span> </a>
                                            </li>
                                            <!-- /nav item -->
                                        </ul>
                                        <!-- /sub-menu -->
                                    </li>
                                    <!-- /nav item -->

                                </ul>
                                <!-- /navbar -->

                                <!-- Header Menu Wrapper -->
                                <div class="dt-nav-wrapper">

                                    <!-- Header Menu -->
                                    <ul class="dt-nav">
                                        <li class="dt-nav__item dt-notification-search dropdown">

                                            <!-- Dropdown Link -->
                                            <a href="#" class="dt-nav__link dropdown-toggle no-arrow" data-toggle="dropdown"
                                               aria-haspopup="true" aria-expanded="false"> <i class="icon icon-search icon-fw icon-xl"></i> </a>
                                            <!-- /dropdown link -->

                                            <!-- Dropdown Option -->
                                            <div class="dropdown-menu">

                                                <!-- Search Box -->
                                                <form class="search-box right-side-icon">
                                                    <input class="form-control form-control-lg" type="search" placeholder="Search in app...">
                                                    <button type="submit" class="search-icon"><i class="icon icon-search icon-lg"></i></button>
                                                </form>
                                                <!-- /search box -->

                                            </div>
                                            <!-- /dropdown option -->

                                        </li>
                                    </ul>
                                    <!-- /header menu -->

                                    <!-- Header Menu -->
                                    <ul class="dt-nav">
                                        <li class="dt-nav__item dt-notification dropdown">

                                            <!-- Dropdown Link -->
                                            <a href="mailto:sisbuapp.unprg@gmail.com" class="dt-nav__link dropdown-toggle no-arrow" data-toggle="dropdown"
                                               aria-haspopup="true" aria-expanded="false"> <i class="icon icon-open-mail icon-fw icon-xl"></i>
                                            </a>
                                            <!-- /dropdown link -->
                                        </li>
                                    </ul>
                                    <!-- /header menu -->

                                </div>
                                <!-- Header Menu Wrapper -->

                            </div>
                            <!-- /header toolbar -->

                        </div>
                        <!-- /custom container -->

                    </div>
                    <!-- /header top -->

                </header>
                <!-- /header -->

                <!-- Site Main -->
                <main class="dt-main">
                    <!-- Sidebar -->
                    <aside id="main-sidebar" class="dt-sidebar d-lg-none">
                        <div class="dt-sidebar__container">

                            <!-- Sidebar Navigation -->
                            <ul class="dt-side-nav">

                                <!-- Menu Header -->
                                <li class="dt-side-nav__item dt-side-nav__header">
                                    <span class="dt-side-nav__text">Navegacion</span>
                                </li>
                                <!-- /menu header -->

                                <!-- Menu Item -->
                                <li class="dt-side-nav__item">
                                    <a href="<%=request.getContextPath()%>/index" class="dt-side-nav__link" title="Inicio"> <i
                                            class="icon icon-home icon-fw icon-lg"></i>
                                        <span class="dt-side-nav__text">Inicio</span> </a>
                                </li>
                                <!-- /menu item -->

                                <!-- Menu Item -->
                                <li class="dt-side-nav__item">
                                    <a href="<%=request.getContextPath()%>/auth/login" class="dt-side-nav__link" title="Ingresar"> <i
                                            class="icon icon-double-arrow-right icon-fw icon-lg"></i>
                                        <span class="dt-side-nav__text">Iniciar Sesión</span> </a>
                                </li>
                                <!-- /menu item -->

                                <!-- Menu Header -->
                                <li class="dt-side-nav__item dt-side-nav__header">
                                    <span class="dt-side-nav__text">Oficinas</span>
                                </li>
                                <!-- /menu header -->

                                <!-- Menu Item -->
                                <li class="dt-side-nav__item">
                                    <a href="javascript:void(0)" class="dt-side-nav__link dt-side-nav__arrow" title="Servicio Médico">
                                        <i class="icon icon-company icon-fw icon-lg"></i> <span class="dt-side-nav__text" style="text-transform: none">Servicio Médico</span> </a>

                                    <!-- Sub-menu -->
                                    <ul class="dt-side-nav__sub-menu">
                                        <li class="dt-side-nav__item">
                                            <a href="javascript:void(0)" class="dt-side-nav__link" title="Área de Servicio de Enfermería">
                                                <i class="icon icon-components icon-fw icon-lg"></i> <span class="dt-side-nav__text" style="text-transform: none">Área de Servicio<br> de Enfermería</span> </a>
                                        </li>
                                        <li class="dt-side-nav__item">
                                            <a href="javascript:void(0)" class="dt-side-nav__link" title="Área de Servicio de Farmácia">
                                                <i class="icon icon-home icon-fw icon-lg"></i> <span class="dt-side-nav__text" style="text-transform: none">Área de Servicio<br> de Farmácia</span>
                                            </a>
                                        </li>
                                        <li class="dt-side-nav__item">
                                            <a href="javascript:void(0)" class="dt-side-nav__link" title="Área de Servicio de Obtetricia">
                                                <i class="icon icon-contacts-app icon-fw icon-lg"></i> <span class="dt-side-nav__text" style="text-transform: none">Área de Servicio<br> de Obtetricia</span>
                                            </a>
                                        </li>
                                        <li class="dt-side-nav__item">
                                            <a href="javascript:void(0)" class="dt-side-nav__link" title="Área de Servicio Médico">
                                                <i class="icon icon-customer icon-fw icon-lg"></i> <span class="dt-side-nav__text" style="text-transform: none">Área de Servicio<br> Médico</span>
                                            </a>
                                        </li>
                                        <li class="dt-side-nav__item">
                                            <a href="javascript:void(0)" class="dt-side-nav__link" title="Área de Servicio Odontológico">
                                                <i class="icon icon-link icon-fw icon-lg"></i> <span class="dt-side-nav__text" style="text-transform: none">Área de Servicio<br> Odontológico</span>
                                            </a>
                                        </li>
                                    </ul>
                                    <!-- /sub-menu -->
                                </li>

                                <li class="dt-side-nav__item">
                                    <a href="javascript:void(0)" class="dt-side-nav__link dt-side-nav__arrow" title="Servicio Psicopedagógico">
                                        <i class="icon icon-heart-o icon-fw icon-lg"></i> <span class="dt-side-nav__text" style="text-transform: none">Servicio Psicopedagógico</span> </a>
                                    <!-- Sub-menu -->
                                    <ul class="dt-side-nav__sub-menu">
                                        <li class="dt-side-nav__item">
                                            <a href="javascript:void(0)" class="dt-side-nav__link" title="Área de Psicopedagogía">
                                                <i class="icon icon-pin icon-fw icon-lg"></i> <span class="dt-side-nav__text" style="text-transform: none">Área de Psicopedagogía</span>
                                            </a>
                                        </li>
                                    </ul>
                                    <!-- /sub-menu -->
                                </li>

                                <li class="dt-side-nav__item">
                                    <a href="javascript:void(0)" class="dt-side-nav__link dt-side-nav__arrow" title="Servicio Psicopedagógico">
                                        <i class="icon icon-users icon-fw icon-lg"></i> <span class="dt-side-nav__text" style="text-transform: none">Servicio Social</span> </a>
                                    <!-- Sub-menu -->
                                    <ul class="dt-side-nav__sub-menu">
                                        <li class="dt-side-nav__item">
                                            <a href="javascript:void(0)" class="dt-side-nav__link" title="Área de Servicio Social">
                                                <i class="icon icon-user icon-fw icon-lg"></i> <span class="dt-side-nav__text" style="text-transform: none">Área de Servicio<br> Social</span>
                                            </a>
                                        </li>
                                        <li class="dt-side-nav__item">
                                            <a href="javascript:void(0)" class="dt-side-nav__link" title="Área de Servicio Social">
                                                <i class="icon icon-refer icon-fw icon-lg"></i> <span class="dt-side-nav__text" style="text-transform: none">Servicio de Comedor<br> Universitario</span>
                                            </a>
                                        </li>
                                    </ul>
                                    <!-- /sub-menu -->
                                </li>

                                <li class="dt-side-nav__item">
                                    <a href="javascript:void(0)" class="dt-side-nav__link dt-side-nav__arrow" title="Educación, recreación y deporte">
                                        <i class="icon icon-ripple icon-fw icon-lg"></i> <span class="dt-side-nav__text" style="text-transform: none">Educación, recreación<br> y deporte</span> </a>
                                    <!-- Sub-menu -->
                                    <ul class="dt-side-nav__sub-menu">
                                        <li class="dt-side-nav__item">
                                            <a href="javascript:void(0)" class="dt-side-nav__link" title="Área de educación, recreación y deporte">
                                                <i class="icon icon-icons icon-fw icon-lg"></i> <span class="dt-side-nav__text" style="text-transform: none">Área de educación,<br> recreación y deporte</span>
                                            </a>
                                        </li>
                                    </ul>
                                    <!-- /sub-menu -->
                                </li>
                                <!-- /menu item -->

                                <!-- Menu Header -->
                                <li class="dt-side-nav__item dt-side-nav__header" style="height: 35px">
                                </li>
                                <!-- /menu header -->

                                <!-- Menu Item -->
                                <li class="dt-side-nav__item">
                                    <a href="<%=request.getContextPath()%>/news" class="dt-side-nav__link" title="Noticias"> <i
                                            class="icon icon-news icon-fw icon-lg"></i>
                                        <span class="dt-side-nav__text">Noticias</span> </a>
                                </li>
                                <!-- /menu item -->

                                <!-- Menu Header -->
                                <li class="dt-side-nav__item dt-side-nav__header" style="height: 35px">
                                </li>
                                <!-- /menu header -->
                                <!-- Menu Item -->
                                <li class="dt-side-nav__item">
                                    <a href="<%=request.getContextPath()%>/downloads" class="dt-side-nav__link" title="Descargas"> <i
                                            class="icon icon-download icon-fw icon-lg"></i>
                                        <span class="dt-side-nav__text">Descargas</span> </a>
                                </li>
                                <!-- /menu item -->
                            </ul>
                            <!-- /sidebar navigation -->

                        </div>
                    </aside>
                    <!-- /sidebar -->

                    <!-- Custom Container -->
                    <div class="dt-container">

                        <!-- Site Content Wrapper -->
                        <div class="dt-content-wrapper">

                            <!-- Site Content -->
                            <div class="dt-content" style="padding-top: 20px">

                                <!--INCLUDE HTML-->
                                <div class="container-dinamic-sisbu-index">
                                    <jsp:include page="<%= resource.getPath()%>" />
                                </div>

                            </div>
                            <!-- /site content -->

                        </div>
                        <!-- /site content wrapper -->

                    </div>
                    <!-- /custom Container -->

                    <!-- Theme Chooser -->
                    <div class="dt-customizer-toggle" style="display: none">
                        <a href="javascript:void(0)" data-toggle="customizer"> <i class="icon icon-customizer animation-customizer"></i>
                        </a>
                    </div>
                    <!-- /theme chooser -->

                    <!-- Customizer Sidebar -->
                    <aside class="dt-customizer dt-drawer position-right">
                        <div class="dt-customizer__inner">

                            <!-- Customizer Header -->
                            <div class="dt-customizer__header">

                                <!-- Customizer Title -->
                                <div class="dt-customizer__title">
                                    <h3 class="mb-0">Configuración de Tema</h3>
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
                                    <section class="d-none d-lg-block" id="layout-chooser">
                                        <h4>Diseño</h4>

                                        <!-- List -->
                                        <ul class="dt-list dt-list-sm">
                                            <li class="dt-list__item">
                                                <div class="choose-option">
                                                    <a href="javascript:void(0)" class="choose-option__icon" data-layout="framed">
                                                        <img src="assets/images/customizer-icons/framed.png" alt="Framed">
                                                    </a>
                                                    <span class="choose-option__name">Framed</span>
                                                </div>
                                            </li>
                                            <li class="dt-list__item">
                                                <div class="choose-option">
                                                    <a href="javascript:void(0)" class="choose-option__icon" data-layout="full-width">
                                                        <img src="assets/images/customizer-icons/full-width.png" alt="Full Width">
                                                    </a>
                                                    <span class="choose-option__name">Full Width</span>
                                                </div>
                                            </li>
                                            <li class="dt-list__item">
                                                <div class="choose-option">
                                                    <a href="javascript:void(0)" class="choose-option__icon" data-layout="boxed">
                                                        <img src="assets/images/customizer-icons/boxed.png" alt="Boxed">
                                                    </a>
                                                    <span class="choose-option__name">Boxed</span>
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
                <!-- /main -->

                <!-- Footer -->
                <footer class="dt-footer">
                    <div class="dt-container">
                        Copyright UNPRG © 2019 | Sisbu V 2.0
                    </div>
                </footer>
                <!-- /footer -->

            </div>
        </div>
        <!-- /root -->

        <!-- Optional JavaScript -->
        <script src="<%=request.getContextPath()%>/plugins/jquery/dist/jquery.min.js"></script>
        <script src="<%=request.getContextPath()%>/plugins/moment/moment.js"></script>
        <script src="<%=request.getContextPath()%>/plugins/bootstrap/dist/js/bootstrap.bundle.min.js"></script>
        <!-- Perfect Scrollbar jQuery -->
        <script src="<%=request.getContextPath()%>/plugins/perfect-scrollbar/dist/perfect-scrollbar.min.js"></script>
        <!-- /perfect scrollbar jQuery -->

        <!-- masonry script -->
        <script src="<%=request.getContextPath()%>/plugins/masonry-layout/dist/masonry.pkgd.min.js"></script>
        <script src="<%=request.getContextPath()%>/plugins/sweetalert2/dist/sweetalert2.js"></script>
        <script src="<%=request.getContextPath()%>/assets/listing/js/functions.js"></script>
        <script src="<%=request.getContextPath()%>/assets/listing/js/customizer.js"></script>

        <script src="<%=request.getContextPath()%>/plugins/chart.js/dist/Chart.min.js"></script>
        <script src="http://maps.google.com/maps/api/js?key=AIzaSyBbyv4oQ2Y4cDpMC8MGhERZ_kicy4YKcuc"></script>
        <script src="<%=request.getContextPath()%>/plugins/gmaps/gmaps.min.js"></script>
        <script src='<%=request.getContextPath()%>/plugins/echarts/dist/echarts.min.js'></script>
        <script src='<%=request.getContextPath()%>/plugins/echarts-liquidfill/dist/echarts-liquidfill.min.js'></script>

        <script src="<%=request.getContextPath()%>/assets/listing/js/custom/charts/dashboard-real-estate.js"></script>
        <!-- Custom JavaScript -->
        <script src="<%=request.getContextPath()%>/assets/listing/js/script.js"></script>
        <script src="<%=request.getContextPath()%>/assets/listing/js/custom/maps/gmaps.js"></script>


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
