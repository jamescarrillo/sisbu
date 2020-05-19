<%-- 
    Document   : perfil
    Created on : 26 set. 2019, 12:40:25
    Author     : James Carrillo
--%>
<div class="row justify-content-center">
    <div class="col-lg-5 col-md-6 col-sm-8">
        <input id="idusuario" type="hidden" value="">
        <div class="dt-card sisbu-cursor-mano option-evaluation" evaluation="socioconomica">
            <div class="dt-card__body d-flex flex-sm-column">
                <div class="row">
                    <div class="col-12 mb-4">
                        <div class="text-center p-2" style="border-color: #2962FF; border-width: 3px;border-style: solid">
                            <img id="visorImagenFotoUser" class="dt-avatar" src="" alt="img-foto-user" style="width: 130px; height: 130px">
                        </div>
                        <h6 class="text-danger text-center mt-1 mb-1">Tam. Máximo de archivo 1MB</h6>
                        <div class="button-group text-center mt-2">
                            <button id="btnEliminarFotoUser" type="button" title="Click para eliminar tu foto" data-toggle="tooltip"
                                    class="btn btn-danger btn-sm btn-delete-image" idvisor="visorImagenFotoUser" idinput="fileImageFotoUser">
                                <i class="fa fa-trash"></i>
                            </button>
                            <div style="display: inline">
                                <input id="fileImageFotoUser" name="fileImageFotoUser"
                                       class="input-image" idvisor="visorImagenFotoUser" type="file" style="display: none">
                                <button type="button" class="btn btn-warning btn-sm btn-selected-image" title="Click para seleccionar una foto" data-toggle="tooltip"
                                        idvisor="visorImagenFotoUser" idinput="fileImageFotoUser" id="btn-selected-image-tmp">
                                    <i class="fa fa-folder-open"></i>
                                </button>
                            </div>
                            <button id="btnSubirFotoUser" type="button" title="Click para subir tu foto" data-toggle="tooltip"
                                    class="btn btn-primary btn-sm btn-upload" input="fileImageFotoUser">
                                <i class="fa fa-upload"></i>
                            </button>
                        </div>
                    </div>
                    <div class="col-12 mb-3" id="div-row-pasos-subir-foto" style="display: none">
                        <h5 class="mb-1 text-danger">Pasos para subir tu foto:</h5>
                        <h6 class="mb-0"><i class="fa fa-check"></i> Click en el <strong>botón anaranjado</strong> para seleccionar una foto.</h6>
                        <h6 class="mb-0"><i class="fa fa-check"></i> Click en el <strong>botón azúl</strong> para subir tu foto.</h6>
                        <h6 class="mb-0"><i class="fa fa-check"></i> Cierra sesión y vuelve a ingresar.</h6>
                    </div>
                    <div class="col-12">
                        <div class="form-group">
                            <label for>Nombre Completo
                                <i class="icon icon-question-circle" aria-hidden="true" data-toggle="popover" 
                                   data-trigger="hover" data-placement="top" 
                                   title="" data-content="Recomendamos ingresar un nombre y un apellido. Máximo 45 caracteres" 
                                   style="cursor: pointer" data-original-title="">
                                </i>
                            </label>
                            <input class="form-control form-control-sm" id="txtUsuarioPerfil" placeholder="Ingrese su nombre completo. . ." maxlength="45">
                        </div>
                    </div>
                    <div class="col-12">
                        <div class="form-group">
                            <label for>Username 
                                <!--i class="icon icon-question-circle" aria-hidden="true" data-toggle="popover" 
                                   data-trigger="hover" data-placement="top" 
                                   title="" data-content="Recuerda que con este nombre de usuario iniciarás sesión. Máximo 20 caracteres" 
                                   style="cursor: pointer" data-original-title="">
                                </i--></label>
                            <input type="text" class="form-control form-control-sm" id="txtUserNamePerfil" placeholder="Ingrese nombre de usuario. . .">
                        </div>
                    </div>
                    <div class="col-12 mb-4">
                        <label for>Password
                            <i class="icon icon-question-circle" aria-hidden="true" data-toggle="popover" 
                               data-trigger="hover" data-placement="top" 
                               title="" data-content="Evita usar caracteres raros. Mínimo 6 y Máximo 20 caracteres" 
                               style="cursor: pointer" data-original-title="">
                            </i>
                        </label>
                        <div class="input-group">
                            <input type="password" class="form-control form-control-sm" id="txtPassPerfil" placeholder="Ingrese password. . .">
                            <div class="input-group-append">
                                <button type="button" class="btn btn-sm btn-primary" id="btnMostrarPass">
                                    <i id="icono_mostrar_pass" class="fas fa-eye-slash"></i>
                                </button>
                            </div>
                        </div>
                    </div>
                    <div class="col-12 mt-4 text-center">
                        <button class="btn btn-primary btn-sm btn-block" id="btnActualizarDatos">ACTUALIZAR DATOS</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>

<div class="modal" id="modalCargandoUpdatePerfil" data-backdrop="static" data-keyboard="false" tabindex="-1"
     role="dialog" aria-hidden="true" style="padding-top: 18%; overflow-y: visible;background-color: rgba(0,0,0,.1)">
    <div class="modal-dialog modal-sm">
        <div class="modal-content">
            <div class="modal-body">
                <div class="progress" style="margin-bottom: 0px;height: 15px;">
                    <div class="progress-bar progress-bar-striped progress-bar-animated" role="progressbar"
                         aria-valuenow="100" aria-valuemin="0" aria-valuemax="100" style="width: 100%;">
                        Actualizando Datos. . .
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>

<div class="modal" id="modalCargandoUploadDelete" data-backdrop="static" data-keyboard="false" tabindex="-1"
     role="dialog" aria-hidden="true" style="padding-top: 18%; overflow-y: visible;background-color: rgba(0,0,0,.1)">
    <div class="modal-dialog modal-sm">
        <div class="modal-content">
            <div class="modal-body">
                <div class="progress" style="margin-bottom: 0px;height: 15px;">
                    <div class="progress-bar progress-bar-striped progress-bar-animated" role="progressbar"
                         aria-valuenow="100" aria-valuemin="0" aria-valuemax="100" style="width: 100%;">
                        Procesando Solicitud. . .
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>