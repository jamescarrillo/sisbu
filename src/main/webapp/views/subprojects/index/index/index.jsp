<%-- 
    Document   : index
    Created on : 24 ago. 2019, 15:08:53
    Author     : James Carrillo
--%>
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

<!-- Page Header -->
<div class="dt-page__header" style="margin-top: 30px">
    <h1 class="dt-page__title">Últimas Noticias</h1>
</div>
<!-- /page header -->

<!-- Grid -->
<div class="row">

    <!-- Grid Item -->
    <div class="col-12 order-xl-2">

        <!-- Grid -->
        <div class="row">
            <!-- Grid Item -->
            <div class="col-12">
                <!-- Card -->
                <div class="dt-card">
                    <!-- Card Body -->
                    <div class="dt-card__body d-flex">
                        <div class="row">
                            <div class="col-12 text-center mb-4">
                                <h3 class="font-weight-500"><i class="icon icon-users dt-icon-bg bg-primary text-primary"></i> Aprendiendo a iniciar sesión en Sisbu</h3>
                                <span class="h4 mb-0 font-weight-500 mr-2">Tutorial para</span>
                                <span class="d-inline-flex text-success">
                                    <i class="icon icon-profit icon-fw"></i>+Ingresantes 2019-II
                                </span>
                            </div>
                            <div class="col-lg-6 col-12">
                                <img class="img-fluid" src="<%=request.getContextPath()%>/resources/prod/news/tutorial_inicio_sesion.png">
                            </div>
                            <div class="col-lg-6 col-12">
                                <h4>¿Como iniciar sesión en sisbu por primera vez?</h4>
                                <p>Si eres un alumno ingresante del presente ciclo, lo único que tienes
                                    que hacer es ir al botón donde dice "iniciar sesión" ubicado en la parte 
                                    superior derecha de esta página y darle click.</p>
                                <p>Enseguida te aparecerá una página con una interfáz similár a la de la parte izquiera 
                                    de este tutorial, donde tienes que ingresar tus credenciales y listo.</p>
                                <h4>¿Cuál es mi Username(Nombre de Usuario) y Password(Contraseña)?</h4>
                                <p>Cuando eres ingresante, tu nombre de usuario y contraseña es tu número de DNI. 
                                    Eso quiere decir que en la caja de texto donde te solicitan nombre de usuario colocarás
                                    tu número de DNI y lo mismo en la caja donde te solicitan contraseña.</p>
                            </div>
                        </div>
                        <div class="flex-1">
                            <div class="h5 mb-2">Fecha de Publicación</div>
                            <p class="card-text text-light-gray f-12">01/09/2019 17:30</p>
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
                                            <span class="f-12 text-light-gray">jamescarrilloc@gmail.com</span>
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
