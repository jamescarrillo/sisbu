<%-- 
    Document   : institucion
    Created on : 2 ago. 2019, 02:29:09
    Author     : James Carrillo
--%>

<div class="row">
    <div class="col-xl-3 col-lg-4 col-md-4 col-sm-12 mb-30">
        <div class="pd-20 bg-white border-radius-4 box-shadow">
            <div class="profile-photo">
                <a href="modal" data-toggle="modal" data-target="#modal" class="edit-avatar"><i class="fa fa-pencil"></i></a>
                <img src="<%out.print(request.getContextPath());%>/vendors/images/photo2.jpg" alt="" class="avatar-photo">
                <div class="modal fade" id="modal" tabindex="-1" role="dialog" aria-labelledby="modalLabel" aria-hidden="true">
                    <div class="modal-dialog modal-dialog-centered" role="document">
                        <div class="modal-content">
                            <div class="modal-body pd-5">
                                <div class="img-container">
                                    <img id="image" src="<%out.print(request.getContextPath());%>/vendors/images/photo2.jpg" alt="Picture">
                                </div>
                            </div>
                            <div class="modal-footer">
                                <input type="submit" value="Update" class="btn btn-primary">
                                <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <h5 class="text-center" id="lblFullName">James Carrillo</h5>
            <p class="text-center text-muted" id="lblTypeUser">Estudiante de Ing. de Sistemas</p>
            <div class="profile-info">
                <h5 class="mb-20 weight-500">Información Personal</h5>
                <ul>
                    <li id="liEmail">
                        <span>Email:</span>
                        jamescarrilloc@gmail.com
                    </li>
                    <!--li>
                        <span>Teléfono/Celular:</span>
                        949836533
                    </li-->
                    <li>
                        <span>Pais:</span>
                        Perú
                    </li>
                    <li id="liInstitucion">
                        <span>Dirección:</span>
                        Manuel Seoane <br>
                        Lambayeque, 330
                    </li>
                </ul>
            </div>
            <div class="profile-social">
                <h5 class="mb-20 weight-500">Social Links</h5>
                <ul class="clearfix">
                    <li><a href="#" class="btn" data-bgcolor="#3b5998" data-color="#ffffff"><i class="fa fa-facebook"></i></a></li>
                    <li><a href="#" class="btn" data-bgcolor="#1da1f2" data-color="#ffffff"><i class="fa fa-twitter"></i></a></li>
                    <li><a href="#" class="btn" data-bgcolor="#007bb5" data-color="#ffffff"><i class="fa fa-linkedin"></i></a></li>
                    <li><a href="#" class="btn" data-bgcolor="#f46f30" data-color="#ffffff"><i class="fa fa-instagram"></i></a></li>
                    <li><a href="#" class="btn" data-bgcolor="#c32361" data-color="#ffffff"><i class="fa fa-dribbble"></i></a></li>
                    <li><a href="#" class="btn" data-bgcolor="#3d464d" data-color="#ffffff"><i class="fa fa-dropbox"></i></a></li>
                    <li><a href="#" class="btn" data-bgcolor="#db4437" data-color="#ffffff"><i class="fa fa-google-plus"></i></a></li>
                    <li><a href="#" class="btn" data-bgcolor="#bd081c" data-color="#ffffff"><i class="fa fa-pinterest-p"></i></a></li>
                    <li><a href="#" class="btn" data-bgcolor="#00aff0" data-color="#ffffff"><i class="fa fa-skype"></i></a></li>
                </ul>
            </div>
            <div class="profile-skills">
                <h5 class="mb-20 weight-500">Lo que me interesa</h5>
                <h6 class="mb-5">Guitarra</h6>
                <div class="progress mb-20" style="height: 6px;">
                    <div class="progress-bar" role="progressbar" style="width: 90%" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100"></div>
                </div>
                <h6 class="mb-5">Futbol</h6>
                <div class="progress mb-20" style="height: 6px;">
                    <div class="progress-bar" role="progressbar" style="width: 100%" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100"></div>
                </div>
                <h6 class="mb-5">Tecnología</h6>
                <div class="progress mb-20" style="height: 6px;">
                    <div class="progress-bar" role="progressbar" style="width: 100%" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100"></div>
                </div>
            </div>
        </div>
    </div>
    <div class="col-xl-9 col-lg-8 col-md-8 col-sm-12 mb-30">
        <div class="bg-white border-radius-4 box-shadow height-100-p">
            <div class="profile-tab height-100-p">
                <div class="tab height-100-p">
                    <ul class="nav nav-tabs customtab" role="tablist">
                        <li class="nav-item">
                            <a class="nav-link active" data-toggle="tab" href="#setting" role="tab">Información</a>
                        </li>
                    </ul>
                    <div class="tab-content">
                        <!-- Setting Tab start -->
                        <div class="tab-pane fade show active fade height-100-p" id="setting" role="tabpanel">
                            <div class="profile-setting">
                                <form id="FrmUsuarioU">
                                    <ul class="profile-edit-list row">
                                        <li class="weight-500 col-md-6">
                                            <h4 class="text-blue mb-20">Datos Personales</h4>
                                            <div class="form-group">
                                                <label>N° Documento</label>
                                                <input class="form-control form-control-lg" type="text" id="txtNroDocumentoUsuarioU" maxlength="8">
                                            </div>
                                            <div class="form-group" id="divColegiatura">
                                                <label>Colegiatura</label>
                                                <input class="form-control form-control-lg" type="text" id="txtColegiaturaUsuarioU" maxlength="15">
                                            </div>
                                            <div class="form-group">
                                                <label>Nombres</label>
                                                <input class="form-control form-control-lg" type="text" id="txtNombreUsuarioU">
                                            </div>
                                            <div class="form-group">
                                                <label>Apellido Pat</label>
                                                <input class="form-control form-control-lg" type="text" id="txtApellidoPatU">
                                            </div>
                                            <div class="form-group">
                                                <label>Apellido Mat</label>
                                                <input class="form-control form-control-lg" type="text" id="txtApellidoMatU">
                                            </div>
                                            <div class="form-group">
                                                <label>Alias</label>
                                                <input class="form-control form-control-lg" type="text" id="txtAliasU">
                                            </div>
                                            <div class="form-group">
                                                <label>Genero</label>
                                                <div class="d-flex">
                                                    <div class="custom-control custom-radio mr-10">
                                                        <input type="radio" id="radioMasculino" class="custom-control-input radio-sexo">
                                                        <label class="custom-control-label weight-400" for="radioMasculino">Masculino</label>
                                                    </div>
                                                    <div class="custom-control custom-radio mr-10">
                                                        <input type="radio" id="radioFemenino" class="custom-control-input radio-sexo">
                                                        <label class="custom-control-label weight-400" for="radioFemenino">Femenino</label>
                                                    </div>
                                                    <div class="custom-control custom-radio">
                                                        <input type="radio" id="radioOtro" class="custom-control-input radio-sexo">
                                                        <label class="custom-control-label weight-400" for="radioOtro">Otro</label>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="form-group">
                                                <label for="txtFechaNacU">FECHA NAC.</label>
                                                <div class="input-group" style="margin-bottom: 0px">
                                                    <input type="text" id="txtFechaNacU"
                                                           class="form-control form-control-sm material-picker-date" placeholder="DD/MM/AAAA">
                                                    <button class="btn btn-sm btn-secondary" type="button"
                                                            id="btnEliminarFechaNacU" data-toggle="tooltip" title="Eliminar Fecha">
                                                        <i class="fa fa-trash"></i></button>
                                                </div>
                                            </div>
                                            <div class="form-group">
                                                <label>Email ( *Otra forma de iniciar sesión )</label>
                                                <input class="form-control form-control-lg" type="email" id="txtEmailU">
                                            </div>
                                            <div class="form-group">
                                                <label>Nombre de Usuario</label>
                                                <input class="form-control form-control-lg" type="text" id="txtUsernameU">
                                            </div>
                                            <div class="form-group">
                                                <label>Contraseña</label>
                                                <input class="form-control form-control-lg" type="password" placeholder="**************" id="txtPassU">
                                            </div>

                                            <!--div class="form-group">
                                                <label>País</label>
                                                <select class="selectpicker form-control form-control-lg" data-style="btn-outline-secondary btn-lg" title="Not Chosen">
                                                    <option>Perú</option>
                                                    <option>Colombia</option>
                                                    <option>Brazil</option>
                                                    <option>Argentina</option>
                                                    <option>Chile</option>
                                                    <option>Venezuela</option>
                                                    <option>Paraguay</option>
                                                    <option>Bolivia</option>
                                                    <option>Otro</option>
                                                </select>
                                            </div>
                                            <div class="form-group">
                                                <label>Estado/Provincia/Región</label>
                                                <input class="form-control form-control-lg" type="text">
                                            </div>															
                                            <div class="form-group">
                                                <label>Teléfono/Celular</label>
                                                <input class="form-control form-control-lg" type="text">
                                            </div>
                                            <div class="form-group">
                                                <label>Dirección</label>
                                                <textarea class="form-control"></textarea>
                                            </div>
                                            <div class="form-group">
                                                <div class="custom-control custom-checkbox mb-5">
                                                    <input type="checkbox" class="custom-control-input" id="customCheck1-1">
                                                    <label class="custom-control-label weight-400" for="customCheck1-1">Recibir notificacioens en mi correo sobre eventos y actualizaciones</label>
                                                </div>
                                            </div-->
                                            <div class="form-group mb-0">
                                                <input type="submit" class="btn btn-primary" value="Actualizar Información">
                                            </div>
                                        </li>
                                        <li class="weight-500 col-md-6">
                                            <h4 class="text-blue mb-20">Links Redes Sociales</h4>
                                            <div class="form-group">
                                                <label>Facebook URL:</label>
                                                <input class="form-control form-control-lg" type="text" placeholder="Pega el link aquí">
                                            </div>
                                            <div class="form-group">
                                                <label>Twitter URL:</label>
                                                <input class="form-control form-control-lg" type="text" placeholder="Pega el link aquí">
                                            </div>
                                            <div class="form-group">
                                                <label>Linkedin URL:</label>
                                                <input class="form-control form-control-lg" type="text" placeholder="Pega el link aquí">
                                            </div>
                                            <div class="form-group">
                                                <label>Instagram URL:</label>
                                                <input class="form-control form-control-lg" type="text" placeholder="Pega el link aquí">
                                            </div>
                                            <div class="form-group">
                                                <label>Dribbble URL:</label>
                                                <input class="form-control form-control-lg" type="text" placeholder="Pega el link aquí">
                                            </div>
                                            <div class="form-group">
                                                <label>Dropbox URL:</label>
                                                <input class="form-control form-control-lg" type="text" placeholder="Pega el link aquí">
                                            </div>
                                            <div class="form-group">
                                                <label>Google-plus URL:</label>
                                                <input class="form-control form-control-lg" type="text" placeholder="Pega el link aquí">
                                            </div>
                                            <div class="form-group">
                                                <label>Pinterest URL:</label>
                                                <input class="form-control form-control-lg" type="text" placeholder="Pega el link aquí">
                                            </div>
                                            <div class="form-group">
                                                <label>Skype URL:</label>
                                                <input class="form-control form-control-lg" type="text" placeholder="Pega el link aquí">
                                            </div>
                                            <div class="form-group mb-0">
                                                <input type="button" disabled="" class="btn btn-primary" value="Actualizar Redes Sociales">
                                            </div>
                                        </li>
                                    </ul>
                                </form>
                            </div>
                        </div>
                        <!-- Setting Tab End -->
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>

<div class="modal" id="modalCargandoUsuario" data-backdrop="static" data-keyboard="false" tabindex="-1" role="dialog"
     aria-hidden="true" style="padding-top: 18%; overflow-y: visible;">
    <div class="modal-dialog modal-sm">
        <div class="modal-content">
            <div class="modal-body">
                <div class="progress" style="margin-bottom: 0px;height: 15px;">
                    <div class="progress-bar progress-bar-striped progress-bar-animated" role="progressbar"
                         aria-valuenow="100" aria-valuemin="0" aria-valuemax="100" style="width: 100%;">
                        Cargando...
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
