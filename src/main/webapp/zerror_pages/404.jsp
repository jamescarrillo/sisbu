<%-- 
    Document   : 404
    Created on : 24 ago. 2019, 11:31:26
    Author     : James Carrillo
--%>

<%@page contentType="text/html" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html lang="es">
    <head>
        <jsp:include page="../zinclude_pages/meta_tags.jsp" />
        <title><%=getServletContext().getInitParameter("name.page.base")%> Error 404</title>

        <!-- Site favicon -->
        <link rel="shortcut icon" href="<%=request.getContextPath()%>/assets/images/favicon.ico" type="image/x-icon">
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
        <!-- /load styles -->

    </head>
    <body class="dt-sidebar--fixed dt-header--fixed">

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
                <div class="dt-page--container">

                    <!-- 404 Page -->
                    <div class="error-page text-center">

                        <!-- Title -->
                        <h1 class="title">404</h1>
                        <!-- /title -->

                        <p class="display-2 text-dark mb-7">Lo siento! La página no fue encontrada</p>
                        <p class="mb-10">El enlace que siguió probablemente esté roto o la página se ha eliminado.</p>

                        <div class="text-center">
                            <a class="d-inline-block font-weight-500 mt-4" href="<%=request.getContextPath()%>/index">Click para ir a la página principal</a>
                        </div>

                        <!-- Search Box -->
                        <!--form class="search-box right-side-icon">
                            <input class="form-control form-control-lg" type="search" id="address" name="address"
                                   placeholder="Search in app...">
                            <button type="submit" class="search-icon"><i class="icon icon-search icon-lg"></i></button>
                        </form-->
                        <!-- /search box -->

                        <!---->

                    </div>
                    <!-- /404 page -->

                </div>
                <!-- /login container -->
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
        <script src="<%=request.getContextPath()%>/assets/js/functions.js"></script>
        <script src="<%=request.getContextPath()%>/assets/js/customizer.js"></script>
        <!-- Custom JavaScript -->
        <script src="<%=request.getContextPath()%>/assets/js/script.js"></script>

    </body>
</html>
