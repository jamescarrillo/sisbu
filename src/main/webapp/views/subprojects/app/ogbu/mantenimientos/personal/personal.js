var beanPaginationPersonal;
var personalSelected;
var areaSelected;
var cargoSelected;

var perfilSelected;
var beanRequestPersonal = new BeanRequest();
document.addEventListener("DOMContentLoaded", function () {
    $('#txtFechaNaciPersonal').bootstrapMaterialDatePicker({
        weekStart: 0,
        time: false,
        format: 'DD/MM/YYYY',
        lang: 'es'
    }).on('change', function (e, date) {
    });

    document.querySelector('#btnEliminarFechaNoticia').onclick = function () {
        document.querySelector('#txtFechaNaciPersonal').value = '';
    };

    //INICIALIZANDO VARIABLES DE SOLICITUD
    beanRequestPersonal.entity_api = "api/personal";
    beanRequestPersonal.operation = "paginate";
    beanRequestPersonal.type_request = "GET";

    $('#FrmPersonal').submit(function (event) {
        beanRequestPersonal.operation = "paginate";
        beanRequestPersonal.type_request = "GET";
        $('#modalCargandoPersonal').modal('show');
        event.preventDefault();
        event.stopPropagation();
    });

    $('#FrmPersonalModal').submit(function (event) {
        if (validateFormPersonal()) {
            $('#modalCargandoPersonal').modal('show');
        }
        event.preventDefault();
        event.stopPropagation();
    });

    document.querySelector("#btnOpenNewPersonal").onclick = function () {
        document.querySelector('#btnDatosLaborales').style.display = 'block';
        document.querySelector('#btnDatosGenerales').style.display = 'block';
        document.querySelector('#btnDatosAcceso').style.display = 'none';
        //CONFIGURAMOS LA SOLICITUD
        beanRequestPersonal.operation = "add";
        beanRequestPersonal.type_request = "POST";
        beanRequestUsuario.operation = "add";
        beanRequestUsuario.type_request = "POST";
        //LIMPIAR LOS CAMPOS
        limpiarInput();
        limpiarInputUsuario();
        viewDatosGenerales();
        //SET TITLE MODAL
        document.querySelector("#txtTituloModalPersonal").innerHTML = "REGISTRAR DATOS";
        //OPEN MODEL
        document.querySelector("#btnListaPersonal").style.display = "none";
        document.querySelector("#btnOpenPersonalDetalle").style.display = "block";

    };

    $("#modalCargandoPersonal").on('shown.bs.modal', function () {
        if (beanRequestUsuario.operation == "add") {
            processAjaxUsuario();
        }
        if (beanRequestPersonal.operation != "add") {
            processAjaxPersonal();
        }
    });

    $('#modalCargandoPersonal').modal('show');

    $("#sizePagePersonal").change(function () {
        $('#modalCargandoPersonal').modal('show');
    });

    document.querySelector('#btnRegresarLista').onclick = function () {
        document.querySelector('#btnOpenPersonalDetalle').style.display = 'none';
        document.querySelector('#btnListaPersonal').style.display = 'block';
        beanRequestPersonal.operation = "paginate";
        beanRequestPersonal.type_request = "GET";
        beanRequestUsuario.operation="get-user";
         beanRequestUsuario.type_request = "GET";
        $('#modalCargandoPersonal').modal('show');
    };


    document.querySelector('#btnDatosGenerales').onclick = function () {
        viewDatosGenerales();

    };

    document.querySelector('#btnDatosLaborales').onclick = function () {
        viewDatosLaborales();
    };
    document.querySelector("#txtDniPersonal").onkeyup = function () {
        document.querySelector("#txtLoginUsuario").value = document.querySelector("#txtDniPersonal").value;
        document.querySelector("#txtPassUsuario").value = document.querySelector("#txtDniPersonal").value;
    };
    document.querySelector("#txtNombrePersonal").onkeyup = function () {
        document.querySelector("#txtNombreUsuario").value = document.querySelector("#txtNombrePersonal").value;
    };


});

function processAjaxPersonal() {
    let parameters_pagination = "";
    let json = "";
    if (beanRequestPersonal.operation == "paginate") {
        if (document.querySelector("#txtFilterDniPersonal").value!="") {
           document.querySelector("#pagePersonal").value=1; 
        }
        parameters_pagination = "?filter=" + document.querySelector("#txtFilterDniPersonal").value;
        parameters_pagination += "&cargo=0&estado=" + document.querySelector("#txtFilterEstadoPersonal").value;
        parameters_pagination += "&page=" + document.querySelector("#pagePersonal").value;
        parameters_pagination += "&size=" + document.querySelector("#sizePagePersonal").value;

    } else {

        parameters_pagination = "";
        if (beanRequestPersonal.operation == "delete") {
            parameters_pagination = "/" + personalSelected.idpersonal;
           
        } else {
            json = {
                "apellido_pat": document.querySelector("#txtApPaternoPersonal").value,
                "apellido_mat": document.querySelector("#txtApMaternoPersonal").value,
                "celular": document.querySelector("#txtCelularPersonal").value,
                "direccion": document.querySelector("#txtDireccionPersonal").value,
                "dni": document.querySelector("#txtDniPersonal").value,
                "email": document.querySelector("#txtEmailPersonal").value,
                "estado": document.querySelector("#txtEstadoPersonal").value,
                "fecha_nacimiento": document.querySelector("#txtFechaNaciPersonal").value,
                "nombre": document.querySelector("#txtNombrePersonal").value,
                "sexo": document.querySelector("#txtSexoPersonal").value,
                "tipo_documento": document.querySelector("#txtTipoDocumento").value,
                "tipo_personal": document.querySelector("#txtTipoPersonal").value,
                "cargo": cargoSelected,
                "area": areaSelected,
                "usuario": {"idusuario": usuarioSelected.idusuario}
            };
            if (beanRequestPersonal.operation == "update") {
                json.idpersonal = personalSelected.idpersonal;
            }
        }


    }
    $.ajax({
        url: getHostAPI() + beanRequestPersonal.entity_api + "/" + beanRequestPersonal.operation + parameters_pagination,
        type: beanRequestPersonal.type_request,
        headers: {
            'Authorization': 'Bearer ' + Cookies.get("sisbu_token")
        },
        data: JSON.stringify(json),
        contentType: 'application/json; charset=utf-8',
        dataType: 'json'
    }).done(function (beanCrudResponse) {
        $('#modalCargandoPersonal').modal("hide");
        if (beanCrudResponse.messageServer !== undefined) {
            if (beanCrudResponse.messageServer.toLowerCase() == "ok") {
                showAlertTopEnd('success', 'Acción realizada exitosamente');
                $('#ventanaModalPersonal').modal('hide');
            } else {
                showAlertTopEnd('warning', beanCrudResponse.messageServer);
            }
        }
        if (beanCrudResponse.beanPagination !== undefined) {
            beanPaginationPersonal = beanCrudResponse.beanPagination;
            toListPersonal(beanPaginationPersonal);
        }
    }).fail(function (jqXHR, textStatus, errorThrown) {
        $('#modalCargandoPersonal').modal("hide");
        showAlertErrorRequest();

    });
}

function toListPersonal(beanPagination) {
    document.querySelector("#tbodyPersonal").innerHTML = "";
    document.querySelector("#titleManagerPersonal").innerHTML = "[ " + beanPagination.count_filter + " ] PERSONAL";
    if (beanPagination.count_filter > 0) {
        let row;
        beanPagination.list.forEach(personal => {
            row = "<div class='dt-widget__item border-bottom'>";
            row += "<div class='dt-extra animate-slide align-self-center mr-5' idpersonal='" + personal.idpersonal + "'>";
            row += "<span class='badge " + tipoPersonalColor(personal.tipo_personal) + " badge-circle-animate badge-pill badge-sm align-text-top'>" + tipoPersonal(personal.tipo_personal) + "</span>";
            row += "<div class='slide-content'>";
            row += "<a class='text-light-gray editar-personal' data-toggle='tooltip' title='Editar' href='javascript:void(0)'>";
            row += "<i class='text-info icon icon-editors'></i></a></div>";
            row += "<div class='slide-content'>";
            row += "<a class='text-light-gray acceso-personal' data-toggle='tooltip' title='Restaurar Contraseña de Usuario' href='javascript:void(0)'>";
            row += "<i class='text-primary icon icon-user'></i></a></div>";
            row += "<div class='slide-content'>";
            row += "<a class='text-light-gray eliminar-personal' data-toggle='tooltip' title='Eliminar' href='javascript:void(0)'>";
            row += "<i class='text-danger icon icon-trash-filled'></i></a></div></div>";

            row += "<div class='text-truncate mr-2' style='min-width:50px;width:15%;'>";
            row += "<p class='dt-widget__subtitle text-truncate text-dark'>";
            row += personal.dni + "</p></div>";

            row += "<div class=' text-truncate mr-2'  style='min-width:230px; width:42%;'>";
            row += "<p class='dt-widget__subtitle text-truncate text-dark'>";
            row += personal.apellido_pat + " " + personal.apellido_mat + " " + personal.nombre + "</p> <p> " + personal.cargo.nombre + "</p></div>";

            row += "<div class='dt-widget__info text-truncate '  style='min-width:60px;'>";
            row += "<p class='dt-widget__subtitle text-truncate text-dark'>";
            row += personal.area.nombre + "</p></div>";

            row += "</div>";
            document.querySelector("#tbodyPersonal").innerHTML += row;
        });
        buildPagination(
                beanPagination.count_filter,
                parseInt(document.querySelector("#sizePagePersonal").value),
                document.querySelector("#pagePersonal"),
                $('#modalCargandoPersonal'),
                $('#paginationPersonal'));
        addEventsPersonales();
        if (beanRequestPersonal.operation == "paginate") {
            document.querySelector("#txtFilterDniPersonal").focus();
        }
        $('[data-toggle="tooltip"]').tooltip();
    } else {
        destroyPagination($('#paginationPersonal'));
        showAlertTopEnd('warning', 'No se encontraron resultados');
        document.querySelector("#txtFilterDniPersonal").focus();
    }
}

function addEventsPersonales() {
    document.querySelectorAll('.editar-personal').forEach(btn => {
        //AGREGANDO EVENTO CLICK
        btn.onclick = function () {
            personalSelected = findByPersonal(btn.parentElement.parentElement.getAttribute('idpersonal'));
            if (personalSelected != undefined) {
                beanRequestPersonal.operation = "update";
                beanRequestPersonal.type_request = "PUT";
                beanRequestUsuario.operation = "get-user";
                beanRequestUsuario.type_request = "GET";


                //SET VALUES MODAL
                agregarInput(personalSelected);
                usuarioSelected = personalSelected.usuario;
                document.querySelector('#btnDatosLaborales').style.display = 'block';
                document.querySelector('#btnDatosGenerales').style.display = 'block';
                document.querySelector('#btnDatosAcceso').style.display = 'none';
                viewDatosGenerales();
                //SET TITLE MODAL
                document.querySelector("#txtTituloModalPersonal").innerHTML = "ACTUALIZAR DATOS";
                //OPEN MODEL
                document.querySelector("#btnListaPersonal").style.display = "none";
                document.querySelector("#btnOpenPersonalDetalle").style.display = "block";

                document.querySelector("#txtTipoDocumento").focus();
            } else {
                showAlertTopEnd('warning', 'No se encontró el Personal para poder editar');
            }
        };
    });
    document.querySelectorAll('.acceso-personal').forEach(btn => {
        //AGREGANDO EVENTO CLICK
        btn.onclick = function () {
            personalSelected = findByPersonal(btn.parentElement.parentElement.getAttribute('idpersonal'));
            if (personalSelected != undefined) {
                usuarioSelected = personalSelected.usuario;
                console.log(usuarioSelected);
                beanRequestUsuario.operation = "get-user";
                beanRequestUsuario.type_request = "GET";
                console.log(beanRequestUsuario);
                $('#modalCargandoUsuario').modal('show');
                viewDatosAcceso();
                document.querySelector('#btnDatosLaborales').style.display = 'none';
                document.querySelector('#btnDatosGenerales').style.display = 'none';
                document.querySelector('#btnDatosAcceso').style.display = 'block';
                //SET TITLE MODAL
                document.querySelector("#txtTituloModalPersonal").innerHTML = "ACTUALIZAR DATOS DE USUARIO";
                //OPEN MODEL
                document.querySelector("#btnListaPersonal").style.display = "none";
                document.querySelector("#btnOpenPersonalDetalle").style.display = "block";
            } else {
                showAlertTopEnd('warning', 'No se encontró el Personal para poder editar');
            }

        };
    });
    document.querySelectorAll('.eliminar-personal').forEach(btn => {
        //AGREGANDO EVENTO CLICK
        btn.onclick = function () {
            personalSelected = findByPersonal(btn.parentElement.parentElement.getAttribute('idpersonal'));
            if (personalSelected != undefined) {
                beanRequestPersonal.operation = "delete";
                beanRequestPersonal.type_request = "DELETE";
                $('#modalCargandoPersonal').modal('show');

            } else {
                showAlertTopEnd('warning', 'No se encontró el Personal para poder eliminar');
            }

        };
    });
}

function findByPersonal(idpersonal) {
    let personal_;
    beanPaginationPersonal.list.forEach(personal => {
        if (idpersonal == personal.idpersonal) {
            personal_ = personal;
            return;
        }
    });
    return personal_;
}

function validateFormPersonal() {
    if (document.querySelector("#txtTipoDocumento").value == "-1") {
        showAlertTopEnd('warning', 'Por favor ingrese Tipo de Documento');
        viewDatosGenerales();
        document.querySelector("#txtTipoDocumento").focus();
        return false;
    } else if (document.querySelector("#txtDniPersonal").value == "") {
        showAlertTopEnd('warning', 'Por favor ingrese Número de Documento ');
        viewDatosGenerales();
        document.querySelector("#txtDniPersonal").focus();
        return false;
    } else if (document.querySelector("#txtFechaNaciPersonal").value == "") {
        showAlertTopEnd('warning', 'Por favor ingrese Fecha de Nacimiento ');
        viewDatosGenerales();
        document.querySelector("#txtFechaNaciPersonal").focus();
        return false;
    } else if (document.querySelector("#txtApPaternoPersonal").value == "") {
        showAlertTopEnd('warning', 'Por favor ingrese Ap Paterno ');
        viewDatosGenerales();
        document.querySelector("#txtApPaternoPersonal").focus();
        return false;
    } else if (document.querySelector("#txtApMaternoPersonal").value == "") {
        showAlertTopEnd('warning', 'Por favor ingrese Ap Materno ');
        viewDatosGenerales();
        document.querySelector("#txtApMaternoPersonal").focus();
        return false;
    } else if (document.querySelector("#txtNombrePersonal").value == "") {
        showAlertTopEnd('warning', 'Por favor ingrese Nombre ');
        viewDatosGenerales();
        document.querySelector("#txtNombrePersonal").focus();
        return false;
    } else if (document.querySelector("#txtSexoPersonal").value == "-1") {
        showAlertTopEnd('warning', 'Por favor ingrese Sexo ');
        viewDatosGenerales();
        document.querySelector("#txtSexoPersonal").focus();
        return false;
    } else if (document.querySelector("#txtCelularPersonal").value == "") {
        showAlertTopEnd('warning', 'Por favor ingrese Celular ');
        viewDatosGenerales();
        document.querySelector("#txtCelularPersonal").focus();
        return false;
    } else if (document.querySelector("#txtEmailPersonal").value == "") {
        showAlertTopEnd('warning', 'Por favor ingrese Email ');
        viewDatosGenerales();
        document.querySelector("#txtEmailPersonal").focus();
        return false;
    } else if (document.querySelector("#txtDireccionPersonal").value == "") {
        showAlertTopEnd('warning', 'Por favor ingrese Dirección ');
        viewDatosGenerales();
        document.querySelector("#txtDireccionPersonal").focus();
        return false;
    } else if (document.querySelector("#txtAreaPersonal").value == "") {
        showAlertTopEnd('warning', 'Por favor ingrese Área ');
        viewDatosLaborales();
        document.querySelector("#txtAreaPersonal").focus();
        return false;
    } else if (document.querySelector("#txtCargoPersonal").value == "") {
        showAlertTopEnd('warning', 'Por favor ingrese Cargo ');
        viewDatosLaborales();
        document.querySelector("#txtCargoPersonal").focus();
        return false;
    } else if (document.querySelector("#txtTipoPersonal").value == "-1") {
        showAlertTopEnd('warning', 'Por favor ingrese Tipo de Personal ');
        viewDatosLaborales();
        document.querySelector("#txtTipoPersonal").focus();
        return false;
    } else if (document.querySelector("#txtEstadoPersonal").value == "-1") {
        showAlertTopEnd('warning', 'Por favor ingrese Estado ');
        viewDatosLaborales();
        document.querySelector("#txtEstadoPersonal").focus();
        return false;
    }
    return true;
}

function tipoPersonal(tipopersonal) {
    switch (tipopersonal) {
        case 1:
            return "NOMBRADO";
            break;
        case 2:
            return "CONTRATADO";
            break;
        case 3:
            return "PRACTICANTE";
            break;
        default:
            return "NINGUNO";
            break;

    }
}

function tipoPersonalColor(tipopersonal) {
    switch (tipopersonal) {
        case 1:
            return "badge-success";
            break;
        case 2:
            return "badge-info";
            break;
        case 3:
            return "badge-warning";
            break;
        default:
            return "badge-default";
            break;

    }
}

function limpiarInput() {
    document.querySelector("#txtTipoDocumento").value = "1";
    document.querySelector("#txtDniPersonal").value = "";
    document.querySelector("#txtFechaNaciPersonal").value = "";
    document.querySelector("#txtApPaternoPersonal").value = "";
    document.querySelector("#txtApMaternoPersonal").value = "";
    document.querySelector("#txtNombrePersonal").value = "";
    document.querySelector("#txtSexoPersonal").value = "-1";
    document.querySelector("#txtCelularPersonal").value = "";
    document.querySelector("#txtEmailPersonal").value = "";
    document.querySelector("#txtDireccionPersonal").value = "";
    document.querySelector("#txtAreaPersonal").value = "";
    document.querySelector("#txtCargoPersonal").value = "";
    document.querySelector("#txtTipoPersonal").value = "-1";
    document.querySelector("#txtEstadoPersonal").value = "-1";
    cargoSelected = null;
    areaSelected = null;
}

function agregarInput(personal) {
    document.querySelector("#txtTipoDocumento").value = personal.tipo_documento;
    document.querySelector("#txtDniPersonal").value = personal.dni;
    document.querySelector("#txtFechaNaciPersonal").value = personal.fecha_nacimiento;
    document.querySelector("#txtApPaternoPersonal").value = personal.apellido_pat;
    document.querySelector("#txtApMaternoPersonal").value = personal.apellido_mat;
    document.querySelector("#txtNombrePersonal").value = personal.nombre;
    document.querySelector("#txtSexoPersonal").value = personal.sexo;
    document.querySelector("#txtCelularPersonal").value = personal.celular;
    document.querySelector("#txtEmailPersonal").value = personal.email;
    document.querySelector("#txtDireccionPersonal").value = personal.direccion;
    document.querySelector("#txtAreaPersonal").value = personal.area.nombre;
    document.querySelector("#txtCargoPersonal").value = personal.cargo.nombre;
    document.querySelector("#txtTipoPersonal").value = personal.tipo_personal;
    document.querySelector("#txtEstadoPersonal").value = personal.estado;
    cargoSelected = personal.cargo;
    areaSelected = personal.area;
}

function viewDatosGenerales() {
    document.querySelector('#btnDatosAcceso').classList.remove('active');
    document.querySelector('#btnDatosLaborales').classList.remove('active');
    document.querySelector('#btnDatosGenerales').classList.add('active');

    document.querySelector('#tab-datos-laborales').style.display = 'none';
    document.querySelector('#tab-datos-acceso').style.display = 'none';
    document.querySelector('#tab-datos-generales').style.display = 'block';
}
function viewDatosLaborales() {
    document.querySelector('#btnDatosAcceso').classList.remove('active');
    document.querySelector('#btnDatosGenerales').classList.remove('active');
    ;
    document.querySelector('#btnDatosLaborales').classList.add('active');

    document.querySelector('#tab-datos-acceso').style.display = 'none';
    document.querySelector('#tab-datos-generales').style.display = 'none';
    document.querySelector('#tab-datos-laborales').style.display = 'block';
}
function viewDatosAcceso() {
    document.querySelector('#btnDatosLaborales').classList.remove('active');
    document.querySelector('#btnDatosGenerales').classList.remove('active');
    document.querySelector('#btnDatosAcceso').classList.add('active');

    document.querySelector('#tab-datos-generales').style.display = 'none';
    document.querySelector('#tab-datos-laborales').style.display = 'none';
    document.querySelector('#tab-datos-acceso').style.display = 'block';
}