<%-- 
    Document   : perfil
    Created on : 26 set. 2019, 12:40:25
    Author     : James Carrillo
--%>
<div class="row justify-content-center">
    <div class="col-lg-5 col-md-6 col-sm-8">
        <div class="dt-card sisbu-cursor-mano option-evaluation" evaluation="socioconomica">
            <div class="dt-card__body d-flex flex-sm-column">
                <div class="row">
                    <div class="col-12 mb-4">
                        <div class="text-center p-2" style="border-color: #2962FF; border-width: 3px;border-style: solid">
                            <img id="visorImagenFotoUser" class="dt-avatar" src="" alt="img-foto-user" style="width: 130px; height: 130px">
                        </div>
                        <div class="button-group text-center mt-2">
                            <button id="btnEliminarLogoTicket" type="button" class="btn btn-danger btn-sm btn-delete-image" idvisor="visorImagenFotoUser" idinput="fileImageFotoUser">
                                <i class="icon icon-remove"></i>
                            </button>
                            <div style="display: inline">
                                <input id="fileImageFotoUser" name="fileImageFotoUser" class="input-image" idvisor="visorImagenFotoUser" type="file" style="display: none">
                                <button type="button" class="btn btn-warning btn-sm btn-selected-image" idvisor="visorImagenFotoUser" idinput="fileImageFotoUser">
                                    <i class="icon icon-folder-o"></i>
                                </button>
                            </div>
                            <button id="btnSubirFotoUser" type="button" class="btn btn-primary btn-sm btn-upload" input="fileImageFotoUser">
                                <i class="icon icon-file-upload"></i>
                            </button>
                        </div>
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
                                <i class="icon icon-question-circle" aria-hidden="true" data-toggle="popover" 
                                   data-trigger="hover" data-placement="top" 
                                   title="" data-content="Recuerda que con este nombre de usuario iniciarás sesión. Máximo 20 caracteres" 
                                   style="cursor: pointer" data-original-title="">
                                </i></label>
                            <input class="form-control form-control-sm" id="txtUserNamePerfil" placeholder="Ingrese nombre de usuario. . .">
                        </div>
                    </div>
                    <div class="col-12">
                        <div class="form-group">
                            <label for>Password
                                <i class="icon icon-question-circle" aria-hidden="true" data-toggle="popover" 
                                   data-trigger="hover" data-placement="top" 
                                   title="" data-content="Evita usar caracteres raros. Mínimo 6 y Máximo 20 caracteres" 
                                   style="cursor: pointer" data-original-title="">
                                </i>
                            </label>
                            <input class="form-control form-control-sm" id="txtUserNamePerfil" placeholder="Ingrese nombre de usuario. . .">
                        </div>
                    </div>
                    <div class="col-12 text-right">
                        <button class="btn btn-primary btn-sm">ACTUALIZAR DATOS</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
