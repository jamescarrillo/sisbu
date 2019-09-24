<%-- 
    Document   : index
    Created on : 21 set. 2019, 13:08:49
    Author     : James Carrillo
--%>
<div class="row justify-content-center" id="row-saludo-principal" style="margin-top: 70px">
    <div class="col-md-6 col-sm-8">
        <h2 class="text-center">¡Bienvenido <span class="text-info">James</span>!
        </h2>
        <p class="text-center" style="font-size: 18px">
            Mira los videos tutoriales para llenar correctamente tus evaluaciones virtuales. Dale click en el botón azul de abajo.
        </p>
        <p class="text-center text-danger" style="font-size: 12px">
            ***Nota: Si tienes algún inconveniente escribemos a
            <a href="mailto:sisbu.ogbu.unprg@gmail.com">
                <i class="icon icon-message icon-fw"></i>
                sisbu.ogbu.unprg@gmail.com
            </a>,o si no acércate a la oficina de bienestar.
        </p>
    </div>
    <div class="col-12 text-center" style="margin-top: 40px">
        <button class="btn btn-primary" id="btnMirarVideosSisbu">¡Mirar los videos!</button>
    </div>
</div>

<div class="row" id="row-videos-tutoriales" style="margin-top: 40px; display: none">
    <div class="col-md-6 dt-masonry__item">
        <!-- Card -->
        <div class="card">
            <!-- Card Body -->
            <div class="card-body">
                <h2 class="card-title">Como cambiar clave y subir foto a SISBU</h2>
                <h4 class="card-subtitle">¡No olvides subir tu foto! Recuerda que es obligatorio para sacar tu constancia de la evaluación socieconómica.</h4>
                <!-- 16:9 aspect ratio -->
                <div class="embed-responsive embed-responsive-16by9">
                    <iframe class="embed-responsive-item" src="https://www.youtube.com/embed/3y1KP-q37Bw" allowfullscreen></iframe>
                </div>
            </div>
            <!-- /card body -->
        </div>
        <!-- /card -->
    </div>
    <div class="col-md-6 dt-masonry__item">
        <!-- Card -->
        <div class="card">
            <!-- Card Body -->
            <div class="card-body">
                <h2 class="card-title">¿Como llenar la evaluación socieconómica?</h2>
                <h4 class="card-subtitle">Video instructivo para llenar nuestra evaluación socieconómica. No olvides de sacar tu constancia al culminar.</h4>
                <!-- 16:9 aspect ratio -->
                <div class="embed-responsive embed-responsive-16by9">
                    <iframe class="embed-responsive-item" src="https://www.youtube.com/embed/3y1KP-q37Bw" allowfullscreen></iframe>
                </div>
            </div>
            <!-- /card body -->
        </div>
        <!-- /card -->
    </div>
    <div class="col-md-6 dt-masonry__item">
        <!-- Card -->
        <div class="card">
            <!-- Card Body -->
            <div class="card-body">
                <h2 class="card-title">¿Como llenar la evaluación deportiva?</h2>
                <h4 class="card-subtitle">Video instructivo para llenar nuestra evaluación deportiva. No olvides de sacar tu constancia al culminar.</h4>
                <!-- 16:9 aspect ratio -->
                <div class="embed-responsive embed-responsive-16by9">
                    <iframe class="embed-responsive-item" src="https://www.youtube.com/embed/3y1KP-q37Bw" allowfullscreen></iframe>
                </div>
            </div>
            <!-- /card body -->
        </div>
        <!-- /card -->
    </div>
    <div class="col-md-6 dt-masonry__item">
        <!-- Card -->
        <div class="card">
            <!-- Card Body -->
            <div class="card-body">
                <h2 class="card-title">¿Como llenar la evaluación psicológica?</h2>
                <h4 class="card-subtitle">Video instructivo para llenar nuestra evaluación psicológica. No olvides de sacar tu constancia al culminar.</h4>
                <!-- 16:9 aspect ratio -->
                <div class="embed-responsive embed-responsive-16by9">
                    <iframe class="embed-responsive-item" src="https://www.youtube.com/embed/3y1KP-q37Bw" allowfullscreen></iframe>
                </div>
            </div>
            <!-- /card body -->
        </div>
        <!-- /card -->
    </div>
    <div class="col-12 text-center">
        <a class="btn btn-primary" href="<%=request.getContextPath()%>/app/ate/evaluaciones">Ir a mis Evaluaciones Virtuales</a>
    </div>
</div>
