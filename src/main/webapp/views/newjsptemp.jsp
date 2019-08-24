<%-- 
    Document   : newjsptemp
    Created on : 24 ago. 2019, 16:37:53
    Author     : James Carrillo
--%>

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
                <a href="page-blank.html?menu=search" class="nav-link"> <i
                        class="icon icon-question-circle icon-fw icon-xl"></i>
                    <span class="nav-text" style="text-transform: none">¿Que es?</span> </a>
            </li>
            <!-- /nav item -->
            <!-- Nav Item -->
            <li class="nav-item">
                <a href="page-blank.html?menu=search" class="nav-link"> <i
                        class="icon icon-users icon-fw icon-xl"></i>
                    <span class="nav-text" style="text-transform: none">¿Quienes integran el equipo Sisbu?</span> </a>
            </li>
            <!-- /nav item -->

            <!-- Nav Item -->
            <li class="nav-item">
                <a href="page-blank.html?menu=realtors-news" class="nav-link">
                    <i class="icon icon-news icon-fw icon-xl"></i> <span class="nav-text" style="text-transform: none">¿Como ser parte?</span> </a>
            </li>
            <!-- /nav item -->
        </ul>
        <!-- /sub-menu -->
    </li>
    <!-- /nav item -->

</ul>
<!-- /navbar -->