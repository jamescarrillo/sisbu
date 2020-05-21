<%-- 
    Document   : index
    Created on : 24 ago. 2019, 15:08:53
    Author     : James Carrillo
--%>
<%@page contentType="text/html" pageEncoding="UTF-8"%>

<!--div class="row">
    <div class="col-xl-12">
        <div id="carouselExampleIndicators" class="carousel slide" data-ride="carousel">
            <ol class="carousel-indicators">
                <li data-target="#carouselExampleIndicators" data-slide-to="0" class="active"></li>
                <li data-target="#carouselExampleIndicators" data-slide-to="1"></li>
                <li data-target="#carouselExampleIndicators" data-slide-to="2"></li>
                <li data-target="#carouselExampleIndicators" data-slide-to="3"></li>
            </ol>
            <div class="carousel-inner">
                <div class="carousel-item active">
                    <img class="d-block w-100" src="<%=request.getContextPath()%>/resources/prod/index/diapo1.jpg"
                         alt="Primer slide" height="100%">
                </div>
                <div class="carousel-item">
                    <img class="d-block w-100" src="https://redpos.app//assets_root/images/custom-app/diapos/diapo2_.jpg"
                         alt="Segundo slide" height="100%">
                </div>
                <div class="carousel-item">
                    <img class="d-block w-100" src="https://redpos.app//assets_root/images/custom-app/diapos/diapo3_.jpg"
                         alt="Tercer slide" height="100%">
                </div>
                <div class="carousel-item">
                    <img class="d-block w-100" src="https://redpos.app//assets_root/images/custom-app/diapos/diapo4_.jpg"
                         alt="Cuarto slide" height="100%">
                </div>
            </div>
            <a class="carousel-control-prev" href="#carouselExampleIndicators" role="button" data-slide="prev">
                <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                <span class="sr-only">Previous</span>
            </a>
            <a class="carousel-control-next" href="#carouselExampleIndicators" role="button" data-slide="next">
                <span class="carousel-control-next-icon" aria-hidden="true"></span>
                <span class="sr-only">Next</span>
            </a>
        </div>

    </div>
</div-->

<!--div class="row">
    <div class="col-12">

        <div class="dt-card">

            <div class="dt-card__header">

                <div class="dt-card__heading">
                    <h3 class="dt-card__title">OFICINA GENERAL DE BIENESTAR UNIVERSITARIO</h3>
                </div>

            </div>

            <div class="dt-card__body">

                <div id="carouselExampleIndicators" class="carousel slide" data-ride="carousel">

                    <ol class="carousel-indicators">
                        <li data-target="#carouselExampleIndicators" data-slide-to="0"
                            class="active"></li>
                        <li data-target="#carouselExampleIndicators" data-slide-to="1"></li>
                        <li data-target="#carouselExampleIndicators" data-slide-to="2"></li>
                    </ol>

                    <div class="carousel-inner">
                        <div class="carousel-item active">
                            <img src="https://via.placeholder.com/1280x450" alt="Slider"
                                 class="img-fluid">
                        </div>
                        <div class="carousel-item">
                            <img src="https://via.placeholder.com/1280x450" alt="Slider"
                                 class="img-fluid">
                        </div>
                        <div class="carousel-item">
                            <img src="https://via.placeholder.com/1280x450" alt="Slider"
                                 class="img-fluid">
                        </div>
                    </div>

                    <a class="carousel-control-prev" href="#carouselExampleIndicators" role="button"
                       data-slide="prev">
                        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                        <span class="sr-only">Previous</span>
                    </a>
                    <a class="carousel-control-next" href="#carouselExampleIndicators" role="button"
                       data-slide="next">
                        <span class="carousel-control-next-icon" aria-hidden="true"></span>
                        <span class="sr-only">Next</span>
                    </a>

                </div>

            </div>

        </div>

    </div>
</div-->

<!-- Grid -->
<div class="row">

    <!-- Grid Item -->
    <div class="col-12 order-xl-2">

        <!-- Grid -->
        <div class="row">
            <!-- Grid Item -->
            <div class="col-12">
                <!-- Card -->
                <div class="dt-card-">
                    <!-- Card Body -->
                    <div class="dt-card__body d-flex">
                        <div class="row">
                            <div class="col-12 text-center mb-4">
                                <h3 class="font-weight-500"><i class="icon icon-users dt-icon-bg bg-primary text-primary"></i> Aprendiendo a usar SISBU APP</h3>
                            </div>
                            <div class="col-lg-6 col-12">
                                <img class="img-fluid" src="<%=request.getContextPath()%>/resources/prod/news/login.png">
                            </div>
                            <div class="col-lg-6 col-12">
                                <h4 class="mt-4">¿Cómo iniciar sesión?</h4>
                                <ul>
                                    <li>Click en el botón donde dice "INICIAR SESION" ubicado en la parte 
                                        superior derecha de esta página o has click en este <a href="auth/login">enlace</a>.</li>
                                    <li>Ingresa tu DNI como nombre de usuario.</li>
                                    <li>Ingresa tu DNI como contraseña.</li>
                                </ul>
                                <h4 class="mt-4">¿Cómo recuperar mi cuenta?</h4>
                                <ul>
                                    <li>Click en este <a href="recovery">enlace</a>.</li>
                                    <li>Ingresa tu dirección de correo electrónico para recibir el código de recuperación.</li>
                                    <li>Ingresa el código de recuperación.</li>
                                    <li>Ingresa tu nueva contraseña.</li>
                                </ul>
                                <h4 class="mt-4">¿Cómo crear una cuenta?</h4>
                                <ul>
                                    <li>Click en el botón donde dice "CREAR CUENTA" ubicado en la parte superior derecha de esta página o has click en este <a href="signup">enlace</a>.</li>
                                    <li>Ingresa tu DNI para verificar si aun no estas registrado.</li>
                                    <li>Ingresa tus datos solicitados.</li>
                                    <li>Inicia sesión.</li>
                                    <li>Activa tu cuenta ingresando el código de activación que se te envió al correo que proporcionaste al momento de registrarte.</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <!-- /card body -->

                </div>
                <!-- /card -->
            </div>
            <!-- /grid item -->

        </div>
        <!-- /grid -->

    </div>
    <!-- /grid item -->

</div>
<!-- /grid -->


<div class="row">
    <!-- Grid Item -->
    <div class="col-xl-12 order-xl-3">

        <!-- Card -->
        <div class="dt-card">

            <!-- Card Header -->
            <div class="dt-card__header mb-4">

                <div class="dt-card__heading">
                    <h3 class="dt-card__title">Oficinas</h3>
                </div>

            </div>
            <!-- /card header -->

            <!-- Card Body -->
            <div class="dt-card__body p-0 max-h-350- ps-custom-scrollbar-">

                <!-- Widget-->
                <div class="dt-widget dt-widget-xl dt-widget-separator dt-widget-hover">
                    <!-- Widget Item -->
                    <div class="dt-widget__item">

                        <!-- Widget Image -->
                        <div class="dt-widget__img">
                            <!-- Avatar -->
                            <i class="icon icon-company text-indigo icon-3x"></i>
                            <!-- /avatar -->
                        </div>
                        <!-- /widget image -->

                        <!-- Shape -->
                        <div class="dot-shape dot-shape-lg bg-success mx-5"></div>
                        <!-- /shape -->

                        <!-- Widget Info -->
                        <div class="dt-widget__info align-text-top">
                            <a class="dt-widget__title" href="javascript:void(0)">Oficina de Servicio Médico</a>
                            <h6>Jfe. Dr. Amalia Arauco Nava</h6>
                        </div>
                        <!-- /widget info -->

                        <!-- Widget Extra -->
                        <div class="dt-widget__extra">
                            <div class="dt-task">
                                <div class="dt-task__number" style="margin-right: 5px">5 Áreas</div>
                            </div>
                        </div>
                        <!-- /widget extra -->

                    </div>
                    <!-- /widget item -->



                    <!-- Widget Item -->
                    <div class="dt-widget__item">

                        <!-- Widget Image -->
                        <div class="dt-widget__img">
                            <!-- Avatar -->
                            <i class="icon icon-heart-o text-light-pink icon-3x"></i>
                            <!-- /avatar -->
                        </div>
                        <!-- /widget image -->

                        <!-- Shape -->
                        <div class="dot-shape dot-shape-lg bg-danger mx-5"></div>
                        <!-- /shape -->

                        <!-- Widget Info -->
                        <div class="dt-widget__info align-text-top">
                            <a class="dt-widget__title" href="javascript:void(0)">Oficina de Servicio Psicopedagógico</a>
                            <h6>Jfe. Lic. Ingrid Quiñones Rado</h6>
                        </div>
                        <!-- /widget info -->

                        <!-- Widget Extra -->
                        <div class="dt-widget__extra">
                            <div class="dt-task">
                                <div class="dt-task__number" style="margin-right: 5px">1 Área</div>
                            </div>
                        </div>
                        <!-- /widget extra -->

                    </div>
                    <!-- /widget item -->

                    <!-- Widget Item -->
                    <div class="dt-widget__item">

                        <!-- Widget Image -->
                        <div class="dt-widget__img">
                            <!-- Avatar -->
                            <i class="icon icon-users text-orange icon-3x"></i>
                            <!-- /avatar -->
                        </div>
                        <!-- /widget image -->

                        <!-- Shape -->
                        <div class="dot-shape dot-shape-lg bg-light mx-5"></div>
                        <!-- /shape -->

                        <!-- Widget Info -->
                        <div class="dt-widget__info align-text-top">
                            <a class="dt-widget__title" href="javascript:void(0)">Oficina de Servicio Social</a>
                            <h6>Jfe. Lic. Carmen Torres Días</h6>
                        </div>
                        <!-- /widget info -->

                        <!-- Widget Extra -->
                        <div class="dt-widget__extra">
                            <div class="dt-task">
                                <div class="dt-task__number" style="margin-right: 5px">2 Áreas</div>
                            </div>
                        </div>
                        <!-- /widget extra -->

                    </div>
                    <!-- /widget item -->

                    <!-- Widget Item -->
                    <div class="dt-widget__item">

                        <!-- Widget Image -->
                        <div class="dt-widget__img">
                            <!-- Avatar -->
                            <i class="icon icon-ripple text-light-green icon-3x"></i>
                            <!-- /avatar -->
                        </div>
                        <!-- /widget image -->

                        <!-- Shape -->
                        <div class="dot-shape dot-shape-lg bg-yellow mx-5"></div>
                        <!-- /shape -->

                        <!-- Widget Info -->
                        <div class="dt-widget__info align-text-top">
                            <a class="dt-widget__title" href="javascript:void(0)">Oficina de educación, recreación y deporte</a>
                            <h6>Jfe. Juan Ramón Damian García</h6>
                        </div>
                        <!-- /widget info -->

                        <!-- Widget Extra -->
                        <div class="dt-widget__extra">
                            <div class="dt-task">
                                <div class="dt-task__number" style="margin-right: 5px">1 Área</div>
                            </div>
                        </div>
                        <!-- /widget extra -->

                    </div>
                    <!-- /widget item -->

                </div>
                <!-- /widget-->

            </div>
            <!-- /card body -->

        </div>
        <!-- /card -->

    </div>
    <!-- /grid item -->
</div>


<!-- Page Header -->
<div class="dt-page__header">
    <h1 class="dt-page__title">Team Sisbu</h1>
</div>
<!-- /page header -->

<!-- Grid -->
<div class="row">

    <!-- Grid Item -->
    <div class="col-xl-12 order-xl-2">
        <!-- Card -->
        <div class="dt-card dt-contact-card">

            <!-- Card Header -->
            <div class="dt-card__header mb-3 header-sm-inline">

                <!-- Card Heading -->
                <div class="dt-card__heading">
                    <h3 class="dt-card__title">Egresados 2019-I UNPRG</h3>
                </div>
                <!-- /card heading -->

                <!-- Card Tools -->
                <div class="dt-card__tools">
                    <ul class="nav nav-sm nav-underline nav-underline-none" role="tablist">
                        <li class="nav-item">
                            <a class="nav-link active" data-toggle="tab" href="#lider-proyecto"
                               role="tab"
                               aria-controls="marketing"
                               aria-selected="true">Lider de Proyecto</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" data-toggle="tab" href="#colaborador-principal" role="tab"
                               aria-controls="account"
                               aria-selected="true">Colaborador Principal</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" data-toggle="tab" href="#otros-colaboradores" role="tab"
                               aria-controls="account"
                               aria-selected="true">Otros Colaboradores</a>
                        </li>
                    </ul>
                </div>
                <!-- /card tools -->

            </div>
            <!-- /card header -->

            <!-- Card Body -->
            <div class="dt-card__body pb-4">

                <!-- Tab Content-->
                <div class="tab-content">

                    <!-- Tab panel -->
                    <div id="lider-proyecto" class="tab-pane active">
                        <!-- Grid -->
                        <div class="row no-gutters">

                            <!-- Grid Item -->
                            <div class="col-12">

                                <!-- Contact Short Info -->
                                <div class="dt-contact-info-short">

                                    <!-- Avatar Wrapper -->
                                    <div class="dt-avatar-wrapper">
                                        <!-- Avatar -->
                                        <img class="dt-avatar"
                                             src="https://via.placeholder.com/150x150"
                                             alt="Harriet Boone">
                                        <!-- /avatar -->

                                        <!-- Info -->
                                        <div class="dt-avatar-info">
                                            <a href="https://www.facebook.com/carrilloc.james"
                                               class="dt-avatar-name text-dark">James Carrillo</a>
                                            <span class="f-12 text-light-gray">jcarrilloc@unprg.edu.pe</span>
                                        </div>
                                        <!-- /info -->
                                    </div>
                                    <!-- /avatar wrapper -->

                                </div>
                                <!-- /contact short info -->

                            </div>
                            <!-- /grid item -->

                        </div>
                        <!-- /grid -->
                    </div>
                    <!-- /tab panel -->

                    <div id="colaborador-principal" class="tab-pane">
                        <div class="row no-gutters">
                            <!-- Grid Item -->
                            <div class="col-md-4 col-sm-6 col-12">

                                <!-- Contact Short Info -->
                                <div class="dt-contact-info-short">

                                    <!-- Avatar Wrapper -->
                                    <div class="dt-avatar-wrapper">
                                        <!-- Avatar -->
                                        <img class="dt-avatar"
                                             src="https://via.placeholder.com/150x150"
                                             alt="Lily Jennings">
                                        <!-- /avatar -->

                                        <!-- Info -->
                                        <div class="dt-avatar-info">
                                            <a href="https://www.facebook.com/Andres.enginner.systems"
                                               class="dt-avatar-name text-dark">Andrés Llontop</a>
                                            <span class="f-12 text-light-gray">llontopdiazandres@gmail.com</span>
                                        </div>
                                        <!-- /info -->
                                    </div>
                                    <!-- /avatar wrapper -->

                                </div>
                                <!-- /contact short info -->

                            </div>
                            <!-- /grid item -->
                        </div>
                    </div>

                    <!-- Tab panel -->
                    <div id="otros-colaboradores" class="tab-pane">
                        <!-- Grid -->
                        <div class="row no-gutters">

                            <!-- Grid Item -->
                            <div class="col-md-4 col-sm-6 col-12">

                                <!-- Contact Short Info -->
                                <div class="dt-contact-info-short">

                                    <!-- Avatar Wrapper -->
                                    <div class="dt-avatar-wrapper">
                                        <!-- Avatar -->
                                        <img class="dt-avatar"
                                             src="https://via.placeholder.com/150x150"
                                             alt="Pearl Cooper">
                                        <!-- /avatar -->

                                        <!-- Info -->
                                        <div class="dt-avatar-info">
                                            <a href="https://www.facebook.com/Lizet.Cv.Hn"
                                               class="dt-avatar-name text-dark">Lizet Cueva</a>
                                            <span class="f-12 text-light-gray">-</span>
                                        </div>
                                        <!-- /info -->
                                    </div>
                                    <!-- /avatar wrapper -->

                                </div>
                                <!-- /contact short info -->

                            </div>
                            <!-- /grid item -->

                            <!-- Grid Item -->
                            <div class="col-md-4 col-sm-6 col-12">

                                <!-- Contact Short Info -->
                                <div class="dt-contact-info-short">

                                    <!-- Avatar Wrapper -->
                                    <div class="dt-avatar-wrapper">
                                        <!-- Avatar -->
                                        <img class="dt-avatar"
                                             src="https://via.placeholder.com/150x150"
                                             alt="Johanna Terry">
                                        <!-- /avatar -->

                                        <!-- Info -->
                                        <div class="dt-avatar-info">
                                            <a href="https://www.facebook.com/Agresivo5000"
                                               class="dt-avatar-name text-dark">Juan Barrantes</a>
                                            <span class="f-12 text-light-gray">-</span>
                                        </div>
                                        <!-- /info -->
                                    </div>
                                    <!-- /avatar wrapper -->

                                </div>
                                <!-- /contact short info -->

                            </div>
                            <!-- /grid item -->

                            <!-- Grid Item -->
                            <div class="col-md-4 col-sm-6 col-12">

                                <!-- Contact Short Info -->
                                <div class="dt-contact-info-short">

                                    <!-- Avatar Wrapper -->
                                    <div class="dt-avatar-wrapper">
                                        <!-- Avatar -->
                                        <img class="dt-avatar"
                                             src="https://via.placeholder.com/150x150"
                                             alt="Johanna Terry">
                                        <!-- /avatar -->

                                        <!-- Info -->
                                        <div class="dt-avatar-info">
                                            <a href="https://www.facebook.com/juanjose.alarconsanches"
                                               class="dt-avatar-name text-dark">Juan Alarcón</a>
                                            <span class="f-12 text-light-gray">-</span>
                                        </div>
                                        <!-- /info -->
                                    </div>
                                    <!-- /avatar wrapper -->

                                </div>
                                <!-- /contact short info -->

                            </div>
                            <!-- /grid item -->


                        </div>
                        <!-- /grid -->
                    </div>
                    <!-- /tab panel -->

                </div>
                <!-- /tab content-->

            </div>
            <!-- /card body -->

        </div>
        <!-- /card -->
    </div>
    <!-- /grid item -->

</div>
<!-- /grid -->


<!-- Page Header -->
<div class="dt-page__header">
    <h1 class="dt-page__title">Redes Sociales</h1>
</div>
<!-- /page header -->

<!-- Grid -->
<div class="row">

    <!-- Grid Item -->
    <div class="col-xl-3 col-sm-6 col-12">

        <!-- Card -->
        <div class="dt-card dt-social-card animate-slide border border-w-2 border-indigo">
            <!-- Social Circle -->
            <div class="dt-social__circle bg-indigo">
                <i class="icon icon-facebook icon-fw icon-3x text-indigo"></i>
            </div>
            <!-- /social circle -->

            <!-- Card Body -->
            <div class="dt-card__body">
                <h3 class="font-weight-500 mb-1">Facebook</h3>
                <!-- List -->
                <ul class="dt-list dt-list-bordered dt-list-cm-0 flex-nowrap">
                    <!-- List Item -->
                    <li class="dt-list__item text-truncate">
                        <span><span class="text-dark">10.5k </span>Likes</span>
                    </li>
                    <!-- /list item -->

                    <!-- List Item -->
                    <li class="dt-list__item text-truncate">
                        <span><span class="text-dark">1.4k </span>Friends</span>
                    </li>
                    <!-- /list item -->
                </ul>
                <!-- /list -->
            </div>
            <!-- /card body -->
        </div>
        <!-- /card -->

    </div>
    <!-- /grid item -->

    <!-- Grid Item -->
    <div class="col-xl-3 col-sm-6 col-12">

        <!-- Card -->
        <div class="dt-card dt-social-card animate-slide border border-w-2 border-sky-blue">
            <!-- Social Circle -->
            <div class="dt-social__circle bg-sky-blue">
                <i class="icon icon-twitter icon-fw icon-3x text-sky-blue"></i>
            </div>
            <!-- /social circle -->

            <!-- Card Body -->
            <div class="dt-card__body">
                <h3 class="font-weight-500 mb-1">Twitter</h3>
                <!-- List -->
                <ul class="dt-list dt-list-bordered dt-list-cm-0 flex-nowrap">
                    <!-- List Item -->
                    <li class="dt-list__item text-truncate">
                        <span><span class="text-dark">800 </span>Like</span>
                    </li>
                    <!-- /list item -->

                    <!-- List Item -->
                    <li class="dt-list__item text-truncate">
                        <span><span class="text-dark">2.1k </span>Follower</span>
                    </li>
                    <!-- /list item -->
                </ul>
                <!-- /list -->
            </div>
            <!-- /card body -->
        </div>
        <!-- /card -->

    </div>
    <!-- /grid item -->

    <!-- Grid Item -->
    <div class="col-xl-3 col-sm-6 col-12">

        <!-- Card -->
        <div class="dt-card dt-social-card animate-slide border border-w-2 border-light-brown">
            <!-- Social Circle -->
            <div class="dt-social__circle bg-light-brown">
                <i class="icon icon-youtube icon-fw icon-3x text-light-brown"></i>
            </div>
            <!-- /social circle -->

            <!-- Card Body -->
            <div class="dt-card__body">
                <h3 class="font-weight-500 mb-1">YouTube</h3>
                <!-- List -->
                <ul class="dt-list dt-list-bordered dt-list-cm-0 flex-nowrap">
                    <!-- List Item -->
                    <li class="dt-list__item text-truncate">
                        <span><span class="text-dark">2.5k </span>Likes</span>
                    </li>
                    <!-- /list item -->

                    <!-- List Item -->
                    <li class="dt-list__item text-truncate">
                        <span><span class="text-dark">1.4k </span>Friends</span>
                    </li>
                    <!-- /list item -->
                </ul>
                <!-- /list -->
            </div>
            <!-- /card body -->
        </div>
        <!-- /card -->

    </div>
    <!-- /grid item -->

    <!-- Grid Item -->
    <div class="col-xl-3 col-sm-6 col-12">

        <!-- Card -->
        <div class="dt-card dt-social-card animate-slide border border-w-2 border-light-teal">
            <!-- Social Circle -->
            <div class="dt-social__circle bg-light-teal">
                <i class="icon icon-linkedin icon-fw icon-3x text-light-teal"></i>
            </div>
            <!-- /social circle -->

            <!-- Card Body -->
            <div class="dt-card__body">
                <h3 class="font-weight-500 mb-1">LinkedIn</h3>
                <!-- List -->
                <ul class="dt-list dt-list-bordered dt-list-cm-0 flex-nowrap">
                    <!-- List Item -->
                    <li class="dt-list__item text-truncate">
                        <span><span class="text-dark">1k </span>Likes</span>
                    </li>
                    <!-- /list item -->

                    <!-- List Item -->
                    <li class="dt-list__item text-truncate">
                        <span><span class="text-dark">807 </span>Friends</span>
                    </li>
                    <!-- /list item -->
                </ul>
                <!-- /list -->
            </div>
            <!-- /card body -->
        </div>
        <!-- /card -->

    </div>
    <!-- /grid item -->

</div>
<!-- /grid -->
