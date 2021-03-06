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
        <h2 class="text-center">�Bienvenido(a) <span class="text-info" id="lblNameUserIndex1">User</span>!
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

<div class="row justify-content-center" id="row-activation-account" style="margin-top: 10px; display: none">
    <div class="col-md-6 col-sm-8">
        <div class="row">
            <div class="col-12 text-center">
                <img src="<%=request.getContextPath()%>/resources/prod/custom_app/kids.gif" class="img-fluid" alt="Fam. Pedro Ruiz Gallo">
            </div>
            <div class="col-12 mt-4">
                <h2 class="text-center">�Bienvenido(a) <span class="text-info lblNameUserIndex2">User</span>!
                </h2>
            </div>
            <div class="col-12">
                <div class="form-group">
                    <label>CODIGO DE ACTIVACI�N</label>
                    <input type="text" id="txtCodeActivationAccount" maxlength="6" class="form-control" placeholder="Ingrese c�digo. . .">
                </div>
            </div>
            <div class="col-12">
                <p class="text-center text-danger" style="font-size: 12px">
                    *Nota: Si no te lleg� el c�digo de activaci�n escribemos a
                    <a href="mailto:sisbuapp.unprg@gmail.com">
                        <i class="icon icon-message icon-fw"></i>
                        sisbuapp.unprg@gmail.com
                    </a>
                </p>
            </div>
            <div class="col-12 text-center" style="margin-top: 10px;margin-bottom: 60px">
                <button class="btn btn-primary mb-2 mr-4 pulse-primary btn-block" id="btn-activate-account"><i class="fas fa-check"></i> ACTIVAR CUENTA</button>
            </div>
        </div>
    </div>

</div>

<div class="row justify-content-center" id="row-saludo-principal" style="margin-top: 10px; display: none">
    <div class="col-md-6 col-sm-8">
        <div class="row">
            <div class="col-12 text-center">
                <img src="<%=request.getContextPath()%>/resources/prod/custom_app/kids.gif" class="img-fluid" alt="Fam. Pedro Ruiz Gallo">
            </div>
            <div class="col-12 mt-4">
                <h2 class="text-center">�Bienvenido(a) <span class="text-info lblNameUserIndex2">User</span>!
                </h2>
                <p class="text-center" style="font-size: 18px">
                    Mira los videos tutoriales para llenar llenar correctamente tu informaci�n. Click en el bot�n que dice �Ver los videos!
                </p>
                <p class="text-center text-danger" style="font-size: 12px">
                    *Nota: Si tienes alg�n inconveniente escribemos a
                    <a href="mailto:sisbuapp.unprg@gmail.com">
                        <i class="icon icon-message icon-fw"></i>
                        sisbuapp.unprg@gmail.com
                    </a>
                </p>
            </div>
        </div>
    </div>
    <div class="col-12 text-center" style="margin-top: 30px;margin-bottom: 60px">
        <button class="btn btn-light mb-2 mr-4 pulse-primary" id="btnMirarVideosSisbu"><i class="icon icon-youtube"></i> �Ver los videos!</button>
        <a href="<%=request.getContextPath()%>/app/ate/evaluaciones" class="btn btn-primary mr-4 mb-2" 
           <i class="icon icon-send"></i>
            Ir a mis evaluaciones
        </a>
        <a href="<%=request.getContextPath()%>/app/ate/documentos" class="btn btn-success mb-2"
           <i class="icon icon-send"></i>
            Ir a mis documentos
        </a>
    </div>
</div>

<div class="row" id="row-videos-tutoriales" style="margin-top: 40px; display: none">
    <!--div class="col-md-6 dt-masonry__item">
                   data-toggle="popover" data-trigger="hover" data-placement="top" title="" data-content="Click para ir a tus evaluaciones virtuales."data-original-title="">
           data-toggle="popover" data-trigger="hover" data-placement="top" title="" data-content="Click para ir a tus documentos. Ah� es donde encontrar�s tus constancias."data-original-title="">

    
        <div class="card">
            <div class="card-body">
                <h2 class="card-title">Como cambiar clave y subir foto a SISBU</h2>
                <h4 class="card-subtitle">�No olvides subir tu foto! Recuerda que es obligatorio para sacar tu constancia de la evaluaci�n sociecon�mica.</h4>
                <div class="embed-responsive embed-responsive-16by9">
                    <iframe class="embed-responsive-item" src="https://www.youtube.com/embed/3y1KP-q37Bw" allowfullscreen></iframe>
                </div>
            </div>
        </div>
    </div>
    <div class="col-md-6 dt-masonry__item">
        <div class="card">
            <div class="card-body">
                <h2 class="card-title">�Como llenar la evaluaci�n sociecon�mica?</h2>
                <h4 class="card-subtitle">Video instructivo para llenar nuestra evaluaci�n sociecon�mica. No olvides de sacar tu constancia al culminar.</h4>
                <div class="embed-responsive embed-responsive-16by9">
                    <iframe class="embed-responsive-item" src="https://www.youtube.com/embed/3y1KP-q37Bw" allowfullscreen></iframe>
                </div>
            </div>
        </div>
    </div>
    <div class="col-md-6 dt-masonry__item">
        <div class="card">
            <div class="card-body">
                <h2 class="card-title">�Como llenar la evaluaci�n deportiva?</h2>
                <h4 class="card-subtitle">Video instructivo para llenar nuestra evaluaci�n deportiva. No olvides de sacar tu constancia al culminar.</h4>
                <div class="embed-responsive embed-responsive-16by9">
                    <iframe class="embed-responsive-item" src="https://www.youtube.com/embed/3y1KP-q37Bw" allowfullscreen></iframe>
                </div>
            </div>
        </div>
    </div>
    <div class="col-md-6 dt-masonry__item">
        <div class="card">
            <div class="card-body">
                <h2 class="card-title">�Como llenar la evaluaci�n psicol�gica?</h2>
                <h4 class="card-subtitle">Video instructivo para llenar nuestra evaluaci�n psicol�gica. No olvides de sacar tu constancia al culminar.</h4>
                <div class="embed-responsive embed-responsive-16by9">
                    <iframe class="embed-responsive-item" src="https://www.youtube.com/embed/3y1KP-q37Bw" allowfullscreen></iframe>
                </div>
            </div>
        </div>
    </div-->
</div>
<div class="row justify-content-center" id="row-pregunta-empiezo" style="margin-top: 20px; display: none">
    <div class="col-12 text-center" style="margin-top: 30px">
        <h3>�Por donde quieres empezar <span class="text-info" id="lblNameUserIndex3">User</span>?</h3>
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


<div class="modal fade" id="modal-loanding-activation-account" data-backdrop="static" data-keyboard="false" tabindex="-1" role="dialog"
     style="padding-top: 18%; overflow-y: visible; display: none;" aria-hidden="true">
    <div class="modal-dialog modal-sm">
        <div class="modal-content">
            <div class="modal-body">
                <div class="progress" style="margin-bottom: 0px;">
                    <div class="progress-bar progress-bar-striped progress-bar-animated" role="progressbar"
                         aria-valuenow="100" aria-valuemin="0" aria-valuemax="100" style="width:100%">
                        Activando cuenta, por favor espere. . .
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>