<%-- 
    Document   : index
    Created on : 21 set. 2019, 13:08:49
    Author     : James Carrillo
--%>
<div class="row justify-content-center" id="row-saludo-principal-usuario-nc" style="margin-top: 30px; display: none">
    <div class="col-12 text-center" style="margin-bottom: 30px">
        <img src="<%=request.getContextPath()%>/resources/prod/custom_app/kids.gif" class="img-fluid" alt="Fam. Pedro Ruiz Gallo">
    </div>
    <div class="col-12">
        <h2 class="text-center">¡Bienvenido(a) <span class="text-info" id="lblNameUserIndex">User</span>!
        </h2>
    </div>
    <div class="col-xl-3 col-sm-6 col-lg-3" >
        <div class="dt-card sisbu-cursor-mano icon-access-mi-perfil">
            <div class="dt-card__body d-flex flex-sm-column text-center">
                <div class="mb-sm-7">
                    <i class="icon icon-user-account dt-icon-bg text-primary"></i>
                </div>
                <a class="h2 mb-0 font-weight-500">Mis Datos</a>
            </div>
        </div>
    </div>
    <div class="col-xl-3 col-sm-6 col-lg-3">
        <div class="dt-card sisbu-cursor-mano" id="icon-access-reserva-citas">
            <div class="dt-card__body d-flex flex-sm-column text-center">
                <div class="mb-sm-7">
                    <i class="icon icon-description dt-icon-bg text-primary"></i>
                </div>
                <a class="h2 mb-0 font-weight-500">Reserva de Citas</a>
            </div>
        </div>
    </div>
</div>

<div class="row justify-content-center" id="row-saludo-principal" style="margin-top: 30px; display: none">
    <div class="col-md-6 col-sm-8">
        <div class="row">
            <div class="col-12 text-center">
                <img src="<%=request.getContextPath()%>/resources/prod/custom_app/kids.gif" class="img-fluid" alt="Fam. Pedro Ruiz Gallo">
            </div>
            <div class="col-12 mt-4">
                <h2 class="text-center">¡Bienvenido(a) <span class="text-info" id="lblNameUserIndex">User</span>!
                </h2>
                <p class="text-center" style="font-size: 18px">
                    Mira los videos tutoriales para llenar correctamente tus evaluaciones virtuales. Click en el botón que dice ¡Mirar los videos!
                </p>
                <p class="text-center text-danger" style="font-size: 12px">
                    ***Nota: Si tienes algún inconveniente escribemos a
                    <a href="mailto:sisbuapp.unprg@gmail.com">
                        <i class="icon icon-message icon-fw"></i>
                        sisbuapp.unprg@gmail.com
                    </a>,o si no acércate a la oficina de bienestar.
                </p>
            </div>
        </div>
    </div>
    <div class="col-12 text-center" style="margin-top: 30px;margin-bottom: 60px">
        <button class="btn btn-light mb-2 mr-4" id="btnMirarVideosSisbu"><i class="icon icon-youtube"></i> ¡Ver los videos!</button>
        <a href="<%=request.getContextPath()%>/app/ate/evaluaciones" class="btn btn-primary mr-4 mb-2" 
           data-toggle="popover" data-trigger="hover" data-placement="top" title="" data-content="Click para ir a tus evaluaciones virtuales."data-original-title="">
            <i class="icon icon-send"></i>
            Ir a mis evaluaciones
        </a>
        <a href="<%=request.getContextPath()%>/app/ate/documentos" class="btn btn-success mb-2"
           data-toggle="popover" data-trigger="hover" data-placement="top" title="" data-content="Click para ir a tus documentos. Ahí es donde encontrarás tus constancias."data-original-title="">
            <i class="icon icon-send"></i>
            Ir a mis documentos
        </a>
    </div>
</div>

<div class="row" id="row-videos-tutoriales" style="margin-top: 40px; display: none">
    <!--div class="col-md-6 dt-masonry__item">
        <div class="card">
            <div class="card-body">
                <h2 class="card-title">Como cambiar clave y subir foto a SISBU</h2>
                <h4 class="card-subtitle">¡No olvides subir tu foto! Recuerda que es obligatorio para sacar tu constancia de la evaluación socieconómica.</h4>
                <div class="embed-responsive embed-responsive-16by9">
                    <iframe class="embed-responsive-item" src="https://www.youtube.com/embed/3y1KP-q37Bw" allowfullscreen></iframe>
                </div>
            </div>
        </div>
    </div>
    <div class="col-md-6 dt-masonry__item">
        <div class="card">
            <div class="card-body">
                <h2 class="card-title">¿Como llenar la evaluación socieconómica?</h2>
                <h4 class="card-subtitle">Video instructivo para llenar nuestra evaluación socieconómica. No olvides de sacar tu constancia al culminar.</h4>
                <div class="embed-responsive embed-responsive-16by9">
                    <iframe class="embed-responsive-item" src="https://www.youtube.com/embed/3y1KP-q37Bw" allowfullscreen></iframe>
                </div>
            </div>
        </div>
    </div>
    <div class="col-md-6 dt-masonry__item">
        <div class="card">
            <div class="card-body">
                <h2 class="card-title">¿Como llenar la evaluación deportiva?</h2>
                <h4 class="card-subtitle">Video instructivo para llenar nuestra evaluación deportiva. No olvides de sacar tu constancia al culminar.</h4>
                <div class="embed-responsive embed-responsive-16by9">
                    <iframe class="embed-responsive-item" src="https://www.youtube.com/embed/3y1KP-q37Bw" allowfullscreen></iframe>
                </div>
            </div>
        </div>
    </div>
    <div class="col-md-6 dt-masonry__item">
        <div class="card">
            <div class="card-body">
                <h2 class="card-title">¿Como llenar la evaluación psicológica?</h2>
                <h4 class="card-subtitle">Video instructivo para llenar nuestra evaluación psicológica. No olvides de sacar tu constancia al culminar.</h4>
                <div class="embed-responsive embed-responsive-16by9">
                    <iframe class="embed-responsive-item" src="https://www.youtube.com/embed/3y1KP-q37Bw" allowfullscreen></iframe>
                </div>
            </div>
        </div>
    </div-->
</div>
<div class="row justify-content-center" id="row-pregunta-empiezo" style="margin-top: 20px; display: none">
    <div class="col-12 text-center" style="margin-top: 30px">
        <h3>¿Por donde quieres empezar <span class="text-info" id="lblNameUserIndex2">User</span>?</h3>
    </div>
</div>
<div class="row justify-content-center" id="row-access-direct" style="margin-top: 30px; display: none">
    <div class="col-xl-3 col-sm-6 col-lg-3">
        <div class="dt-card sisbu-cursor-mano icon-access-mi-perfil">
            <div class="dt-card__body d-flex flex-sm-column text-center">
                <div class="mb-sm-7">
                    <i class="icon icon-user-account dt-icon-bg text-primary"></i>
                </div>
                <a class="h2 mb-0 font-weight-500">Mis Datos</a>
            </div>
        </div>
    </div>
    <div class="col-xl-3 col-sm-6 col-lg-3">
        <div class="dt-card sisbu-cursor-mano" id="icon-access-mis-evaluaciones">
            <div class="dt-card__body d-flex flex-sm-column text-center">
                <div class="mb-sm-7">
                    <i class="icon icon-description dt-icon-bg text-primary"></i>
                </div>
                <a class="h2 mb-0 font-weight-500">Mis Evaluaciones</a>
            </div>
        </div>
    </div>
</div>