var beanPaginationAlumno;
var alumnoSelected;
var escuelaSelected;
var distritoSelected;
var cicloSelected;

var beanRequestAlumno = new BeanRequest();
document.addEventListener("DOMContentLoaded", function () {
    $('#txtFechaNacAlumno').bootstrapMaterialDatePicker({
        weekStart: 0,
        time: false,
        format: 'DD/MM/YYYY',
        lang: 'es'
    }).on('change', function (e, date) {
    });

    document.querySelector('#btnEliminarFechaNacAlumno').onclick = function () {
        document.querySelector('#txtFechaNacAlumno').value = '';
    };

    //INICIALIZANDO VARIABLES DE SOLICITUD
    beanRequestAlumno.entity_api = "api/atendido";
    beanRequestAlumno.operation = "paginate";
    beanRequestAlumno.type_request = "GET";

    $('#FrmAlumno').submit(function (event) {
        beanRequestAlumno.operation = "paginate";
        beanRequestAlumno.type_request = "GET";
        $('#modalCargandoAlumno').modal('show');
        event.preventDefault();
        event.stopPropagation();
    });

    $('#FrmAlumnoModal').submit(function (event) {

        event.preventDefault();
        event.stopPropagation();
        if (beanRequestAlumno.operation == "add") {
            if (validateFormAddAlumno()) {
                $('#modalCargandoAlumno').modal('show');
            }
        } else {
            if (validateFormAlumno()) {
                $('#modalCargandoAlumno').modal('show');
            }
        }


    });

    document.querySelector("#btnOpenNewAlumno").onclick = function () {
        //CONFIGURAMOS LA SOLICITUD
        beanRequestAlumno.operation = "add";
        beanRequestAlumno.type_request = "POST";
        beanRequestUsuario.operation = "add";
        beanRequestUsuario.type_request = "POST";
        //LIMPIAR LOS CAMPOS
        limpiarInput();
        limpiarInputUsuario();
        viewDatosGenerales();
        //SET TITLE MODAL
        document.querySelector("#txtTituloModalAlumno").innerHTML = "REGISTRAR DATOS";
        //OPEN MODEL
        document.querySelector("#btnListaAlumno").style.display = "none";
        document.querySelector("#btnOpenAlumnoDetalle").style.display = "block";

    };

    $("#modalCargandoAlumno").on('shown.bs.modal', function () {
        if (beanRequestUsuario.operation == "add") {
            // if (document.querySelector("#txtTipoPersonaAlumno").value == "1") {
            //    processAjaxUsuario();
            // } else {
            //   beanRequestAlumno.operation = "add";
            //   beanRequestAlumno.type_request = "POST";
            //  processAjaxAlumno();
            //}
            processAjaxUsuario();
        }
        if (beanRequestAlumno.operation != "add") {

            processAjaxAlumno();


        }
    });

    $('#modalCargandoAlumno').modal('show');

    $("#sizePageAlumno").change(function () {
        $('#modalCargandoAlumno').modal('show');
    });

    document.querySelector('#btnRegresarLista').onclick = function () {
        document.querySelector('#btnOpenAlumnoDetalle').style.display = 'none';
        document.querySelector('#btnListaAlumno').style.display = 'block';
        beanRequestAlumno.operation = "paginate";
        beanRequestAlumno.type_request = "GET";
        beanRequestUsuario.operation = "get-user";
        beanRequestUsuario.type_request = "GET";
        $('#modalCargandoAlumno').modal('show');
    };

    document.querySelector("#txtNumeroDocumentoAlumno").onkeyup = function () {
        document.querySelector("#txtLoginUsuario").value = document.querySelector("#txtNumeroDocumentoAlumno").value;
        document.querySelector("#txtPassUsuario").value = document.querySelector("#txtNumeroDocumentoAlumno").value;
    };
    document.querySelector("#txtNombreAlumno").onkeyup = function () {
        document.querySelector("#txtNombreUsuario").value = document.querySelector("#txtNombreAlumno").value;
    };
});

function processAjaxAlumno() {
    let parameters_pagination = "";
    let json = "";
    if (beanRequestAlumno.operation == "paginate") {
        if (document.querySelector("#txtFilterDniAlumno").value != "") {
            document.querySelector("#pageAlumno").value = 1;
        }
        parameters_pagination = "?filter=" + document.querySelector("#txtFilterDniAlumno").value;
        parameters_pagination += "&page=" + document.querySelector("#pageAlumno").value;
        parameters_pagination += "&size=" + document.querySelector("#sizePageAlumno").value;

    } else {

        parameters_pagination = "";
        if (beanRequestAlumno.operation == "delete") {
            parameters_pagination = "/" + alumnoSelected.idatendido;

        } else {
            if (escuelaSelected == undefined) {
                escuelaSelected = {"idescuela": 0};
            }
            if (cicloSelected == undefined) {
                cicloSelected = {"idciclo_academico": 0};
            }
            if (distritoActualSelected == undefined) {
                distritoActualSelected = {"iddistrito": 0};
            }
            if (distritoProcedenciaSelected == undefined) {
                distritoProcedenciaSelected = {"iddistrito": 0};
            }
            json = {
                "nombre": document.querySelector("#txtNombreAlumno").value,
                "apellido_mat": document.querySelector("#txtApMaternoAlumno").value,
                "apellido_pat": document.querySelector("#txtApPaternoAlumno").value,
                "celular": document.querySelector("#txtCelularAlumno").value,
                "direccion_actual": document.querySelector("#txtDireccionActualAlumno").value,
                "direccion_procedencia": document.querySelector("#txtDireccionProceAlumno").value,
                "fecha_nacimiento": document.querySelector("#txtFechaNacAlumno").value,
                "estado_civil": document.querySelector("#txtEstadoCivilAlumno").value,
                "estado": document.querySelector("#txtEstadoAlumno").value,
                "codigo": document.querySelector("#txtCodigoAlumno").value,
                "dni": document.querySelector("#txtNumeroDocumentoAlumno").value,
                "email": document.querySelector("#txtEmailAlumno").value,
                "sexo": document.querySelector("#txtSexoAlumno").value,
                "tipo_colegio": document.querySelector("#txtTipoColegioAlumno").value,
                "tipo_documento": document.querySelector("#txtTipoDocumentoAlumno").value,
                "modalidad_ingreso": document.querySelector("#txtModalidadAlumno").value,
                "tipo_atendido": document.querySelector("#txtTipoPersonaAlumno").value,
                "subtipo_atendido": document.querySelector("#txtTipoPersonalAlumno").value,
                "cachimbo": document.querySelector("#txtCachimboAlumno").value,
                "comensal": document.querySelector("#txtComensalAlumno").value,
                "escuela": {"idescuela": escuelaSelected.idescuela},
                "ciclo_academico_ingreso": {"idciclo_academico": cicloSelected.idciclo_academico},
                "distrito_actual": distritoActualSelected,
                "distrito_procedencia": distritoProcedenciaSelected,
                "usuario": {"idusuario": usuarioSelected.idusuario}
            };
            if (beanRequestAlumno.operation == "update") {
                json.idatendido = alumnoSelected.idatendido;
            }
        }


    }
    $.ajax({
        url: getHostAPI() + beanRequestAlumno.entity_api + "/" + beanRequestAlumno.operation + parameters_pagination,
        type: beanRequestAlumno.type_request,
        headers: {
            'Authorization': 'Bearer ' + Cookies.get("sisbu_token")
        },
        data: JSON.stringify(json),
        contentType: 'application/json; charset=utf-8',
        dataType: 'json'
    }).done(function (beanCrudResponse) {
        console.log(beanCrudResponse);
        $('#modalCargandoAlumno').modal("hide");
        if (beanCrudResponse.messageServer !== undefined) {
            if (beanCrudResponse.messageServer.toLowerCase() == "ok") {
                if (beanRequestAlumno.operation == "add") {
                    limpiarInput();
                    limpiarInputUsuario();
                }
                showAlertTopEnd('success', 'Acción realizada exitosamente');
                $('#ventanaModalAlumno').modal('hide');
            } else {
                showAlertTopEnd('warning', beanCrudResponse.messageServer);
            }
        }
        if (beanCrudResponse.beanPagination !== undefined) {
            beanPaginationAlumno = beanCrudResponse.beanPagination;
            toListAlumno(beanPaginationAlumno);
        }
    }).fail(function (jqXHR, textStatus, errorThrown) {
        $('#modalCargandoAlumno').modal("hide");
        showAlertErrorRequest();

    });
}

function toListAlumno(beanPagination) {
    document.querySelector("#tbodyAlumno").innerHTML = "";
    document.querySelector("#titleManagerAlumno").innerHTML = "[ " + beanPagination.count_filter + " ] ALUMNO";
    if (beanPagination.count_filter > 0) {
        let row;
        beanPagination.list.forEach(alumno => {
            row = "<div class='dt-widget__item border-bottom'>";
            row += "<div class='dt-extra animate-slide align-self-center mr-5' idalumno='" + alumno.idatendido + "'>";
            row += "<span class='badge " + tipoAlumnoColor(alumno.tipo_atendido) + " badge-circle-animate badge-pill badge-sm align-text-top'>" + tipoAlumno(alumno.tipo_atendido) + "</span>";
            row += "<div class='slide-content'>";
            row += "<a class='text-light-gray editar-alumno' data-toggle='tooltip' title='Editar' href='javascript:void(0)'>";
            row += "<i class='text-info icon icon-editors'></i></a></div>";
            row += "<div class='slide-content'>";
            row += "<a class='text-light-gray acceso-alumno' data-toggle='tooltip' title='Restaurar Contraseña de Usuario' href='javascript:void(0)'>";
            row += "<i class='text-primary icon icon-user'></i></a></div>";
            row += "<!-- div class='slide-content'>";
            row += "<a class='text-light-gray eliminar-alumno' data-toggle='tooltip' title='Eliminar' href='javascript:void(0)'>";
            row += "<i class='text-danger icon icon-trash-filled'></i></a></div-->";
            row += "</div>";

            row += "<div class='text-truncate mr-2' style='min-width:50px;width:15%;'>";
            row += "<p class='dt-widget__subtitle text-truncate text-dark'>";
            row += alumno.dni + "</p></div>";

            row += "<div class=' text-truncate mr-2'  style='min-width:230px; width:42%;'>";
            row += "<p class='dt-widget__subtitle text-truncate text-dark'>";
            row += alumno.apellido_pat + " " + alumno.apellido_mat + " " + alumno.nombre + "</p> <p> " + alumno.fecha_nacimiento + "</p></div>";

            row += "<div class='dt-widget__info text-truncate '  style='min-width:60px;'>";
            row += "<p class='dt-widget__subtitle text-truncate text-dark'>";
            row += alumno.escuela.nombre + "</p></div>";

            row += "</div>";
            document.querySelector("#tbodyAlumno").innerHTML += row;
        });
        buildPagination(
                beanPagination.count_filter,
                parseInt(document.querySelector("#sizePageAlumno").value),
                document.querySelector("#pageAlumno"),
                $('#modalCargandoAlumno'),
                $('#paginationAlumno'));
        addEventsAlumnoes();
        if (beanRequestAlumno.operation == "paginate") {
            document.querySelector("#txtFilterDniAlumno").focus();
        }
        $('[data-toggle="tooltip"]').tooltip();
    } else {
        destroyPagination($('#paginationAlumno'));
        showAlertTopEnd('warning', 'No se encontraron resultados');
        document.querySelector("#txtFilterDniAlumno").focus();
    }
}

function addEventsAlumnoes() {
    document.querySelectorAll('.editar-alumno').forEach(btn => {
        //AGREGANDO EVENTO CLICK
        btn.onclick = function () {
            alumnoSelected = findByAlumno(btn.parentElement.parentElement.getAttribute('idalumno'));
            if (alumnoSelected != undefined) {
                beanRequestAlumno.operation = "update";
                beanRequestAlumno.type_request = "PUT";
                beanRequestUsuario.operation = "get-user";
                beanRequestUsuario.type_request = "GET";


                //SET VALUES MODAL
                addInputDatos(alumnoSelected);
                usuarioSelected = alumnoSelected.usuario;
                viewDatosGenerales();
                //SET TITLE MODAL
                document.querySelector("#txtTituloModalAlumno").innerHTML = "ACTUALIZAR DATOS";
                //OPEN MODEL
                document.querySelector("#btnListaAlumno").style.display = "none";
                document.querySelector("#btnOpenAlumnoDetalle").style.display = "block";
            } else {
                showAlertTopEnd('warning', 'No se encontró el Alumno para poder editar');
            }
        };
    });
    document.querySelectorAll('.acceso-alumno').forEach(btn => {
        //AGREGANDO EVENTO CLICK
        btn.onclick = function () {
            alumnoSelected = findByAlumno(btn.parentElement.parentElement.getAttribute('idalumno'));
            if (alumnoSelected != undefined) {
                usuarioSelected = alumnoSelected.usuario;
                console.log(usuarioSelected);
                beanRequestUsuario.operation = "get-user";
                beanRequestUsuario.type_request = "GET";
                console.log(beanRequestUsuario);
                $('#modalCargandoUsuario').modal('show');
                viewDatosAcceso();
                //SET TITLE MODAL
                document.querySelector("#txtTituloModalAlumno").innerHTML = "ACTUALIZAR DATOS DE USUARIO";
                //OPEN MODEL
                document.querySelector("#btnListaAlumno").style.display = "none";
                document.querySelector("#btnOpenAlumnoDetalle").style.display = "block";
            } else {
                showAlertTopEnd('warning', 'No se encontró el Alumno para poder editar');
            }

        };
    });
    document.querySelectorAll('.eliminar-alumno').forEach(btn => {
        //AGREGANDO EVENTO CLICK
        btn.onclick = function () {
            alumnoSelected = findByAlumno(btn.parentElement.parentElement.getAttribute('idalumno'));
            if (alumnoSelected != undefined) {
                beanRequestAlumno.operation = "delete";
                beanRequestAlumno.type_request = "DELETE";
                $('#modalCargandoAlumno').modal('show');

            } else {
                showAlertTopEnd('warning', 'No se encontró el Alumno para poder eliminar');
            }

        };
    });
}

function findByAlumno(idalumno) {
    let alumno_;
    beanPaginationAlumno.list.forEach(alumno => {
        if (idalumno == alumno.idatendido) {
            alumno_ = alumno;
            return;
        }
    });
    return alumno_;
}


function tipoAlumno(tipoalumno) {
    switch (tipoalumno) {
        case 1:
            return "ALUMNO";
            break;
        case 2:
            return "DOCENTE";
            break;
        case 3:
            return "ADMINISTRATIVO";
            break;
        case 4:
            return "FAMILIAR DOCENTE";
            break;
        case 5:
            return "FAMILIAR ADMINISTRATIVO";
            break;
        default:
            return "NINGUNO";
            break;

    }
}

function tipoAlumnoColor(tipoalumno) {
    switch (tipoalumno) {
        case 1:
            return "badge-success";
            break;
        case 2:
            return "badge-info";
            break;
        case 3:
            return "badge-warning";
            break;
        case 4:
            return "badge-primary";
            break;
        case 5:
            return "badge-danger";
            break;
        default:
            return "badge-default";
            break;

    }
}

function limpiarInput() {
    document.querySelector("#txtTipoDocumentoAlumno").value = "-1";
    document.querySelector("#txtEstadoCivilAlumno").value = "-1";
    document.querySelector("#txtEstadoAlumno").value = "-1";
    document.querySelector("#txtNumeroDocumentoAlumno").value = "";
    document.querySelector("#txtApPaternoAlumno").value = "";
    document.querySelector("#txtApMaternoAlumno").value = "";
    document.querySelector("#txtNombreAlumno").value = "";
    document.querySelector("#txtSexoAlumno").value = "-1";
    document.querySelector("#txtFechaNacAlumno").value = "";
    document.querySelector("#txtCelularAlumno").value = "";
    document.querySelector("#txtEmailAlumno").value = "";
    document.querySelector("#txtDireccionActualAlumno").value = "";
    document.querySelector("#txtDireccionProceAlumno").value = "";
    document.querySelector("#txtDistritoActualAlumno").value = "";
    document.querySelector("#txtDistritoProcedenciaAlumno").value = "";

    document.querySelector("#txtTipoPersonaAlumno").value = "-1";
    document.querySelector("#txtTipoPersonalAlumno").value = "-1";
    document.querySelector("#txtCicloAlumno").value = "";
    document.querySelector("#txtCachimboAlumno").value = "-1";
    document.querySelector("#txtComensalAlumno").value = "-1";
    document.querySelector("#txtCodigoAlumno").value = "";
    document.querySelector("#txtModalidadAlumno").value = "-1";
    document.querySelector("#txtTipoColegioAlumno").value = "-1";
    document.querySelector("#txtEscuelaAlumno").value = "";
    cicloSelected = undefined;
    escuelaSelected = undefined;
    distritoActualSelected = null;
    distritoProcedenciaSelected = null;
    $('[data-toggle="popover"]').popover();
}

function validateFormAlumno() {
    if (document.querySelector("#txtTipoPersonaAlumno").value == "1") {
        if (cicloSelected == undefined) {
            showAlertTopEnd('warning', 'Por favor seleccione Ciclo Académico');
            document.querySelector("#txtCicloAlumno").focus();
            return false;
        } else if (escuelaSelected == undefined) {
            showAlertTopEnd('warning', 'Por favor ingrese Escuela');
            document.querySelector("#txtEscuelaAlumno").focus();
            return false;
        }
    }
    if (document.querySelector("#txtTipoDocumentoAlumno").value != "1") {
        showAlertTopEnd('warning', 'Por favor seleccione tipo de documento válido');
        document.querySelector("#txtTipoDocumentoAlumno").focus();
        return false;
    } else if (document.querySelector("#txtNumeroDocumentoAlumno").value == "") {
        showAlertTopEnd('warning', 'Por favor ingrese DNI');
        document.querySelector("#txtNumeroDocumentoAlumno").focus();
        return false;
    } else if (document.querySelector("#txtEstadoCivilAlumno").value == "-1") {
        showAlertTopEnd('warning', 'Por favor seleccione estado civil');
        document.querySelector("#txtEstadoCivilAlumno").focus();
        return false;
    } else if (document.querySelector("#txtModalidadAlumno").value == "100") {
        showAlertTopEnd('warning', 'Por favor seleccione modalidad de ingreso');
        document.querySelector("#txtModalidadAlumno").focus();
        return false;
    } else if (document.querySelector("#txtTipoColegioAlumno").value == "-1") {
        showAlertTopEnd('warning', 'Por favor seleccione tipo de colegio de procedencia');
        document.querySelector("#txtTipoColegioAlumno").focus();
        return false;
    } else if (document.querySelector("#txtEstadoCivilAlumno").value == "-1") {
        showAlertTopEnd('warning', 'Por favor seleccione Estado Civil');
        document.querySelector("#txtEstadoCivilAlumno").focus();
        return false;
    } else if (document.querySelector("#txtSexoAlumno").value == "-1") {
        showAlertTopEnd('warning', 'Por favor seleccione un sexo');
        document.querySelector("#txtSexoAlumno").focus();
        return false;
    } else if (document.querySelector("#txtFechaNacAlumno").value == "") {
        showAlertTopEnd('warning', 'Por favor ingrese fecha de nacimiento');
        document.querySelector("#txtFechaNacAlumno").focus();
        return false;
    } else if (document.querySelector("#txtApPaternoAlumno").value == "") {
        showAlertTopEnd('warning', 'Por favor ingrese apellido paterno');
        document.querySelector("#txtApPaternoAlumno").focus();
        return false;
    } else if (document.querySelector("#txtApMaternoAlumno").value == "") {
        showAlertTopEnd('warning', 'Por favor ingrese apellido materno');
        document.querySelector("#txtApMaternoAlumno").focus();
        return false;
    } else if (document.querySelector("#txtNombreAlumno").value == "") {
        showAlertTopEnd('warning', 'Por favor ingrese nombre');
        document.querySelector("#txtNombreAlumno").focus();
        return false;
    } else if (document.querySelector("#txtCelularAlumno").value == "") {
        showAlertTopEnd('warning', 'Por favor ingrese celular');
        document.querySelector("#txtCelularAlumno").focus();
        return false;
    } else if (document.querySelector("#txtEmailAlumno").value == "") {
        showAlertTopEnd('warning', 'Por favor ingrese email');
        document.querySelector("#txtEmailAlumno").focus();
        return false;
    } else if (distritoActualSelected == undefined) {
        showAlertTopEnd('warning', 'Por favor seleccione distrito actual');
        return false;
    } else if (distritoProcedenciaSelected == undefined) {
        showAlertTopEnd('warning', 'Por favor seleccione distrito de procedencia');
        return false;
    } else if (document.querySelector("#txtDireccionActualAlumno").value == "") {
        showAlertTopEnd('warning', 'Por favor ingrese dirección actual');
        document.querySelector("#txtDireccionActualAlumno").focus();
        return false;
    } else if (document.querySelector("#txtDireccionProceAlumno").value == "") {
        showAlertTopEnd('warning', 'Por favor ingrese dirección de procedencia');
        document.querySelector("#txtDireccionProceAlumno").focus();
        return false;

    } else if (document.querySelector("#txtTipoPersonaAlumno").value == "-1") {
        showAlertTopEnd('warning', 'Por favor ingrese Tipo de Usuario');
        document.querySelector("#txtTipoPersonaAlumno").focus();
        return false;
    } else if (document.querySelector("#txtTipoPersonalAlumno").value == "-1") {
        showAlertTopEnd('warning', 'Por favor ingrese Tipo de Personal');
        document.querySelector("#txtTipoPersonalAlumno").focus();
        return false;
    } else if (document.querySelector("#txtCachimboAlumno").value == "-1") {
        showAlertTopEnd('warning', 'Por favor ingrese Cachimbo');
        document.querySelector("#txtCachimboAlumno").focus();
        return false;
    } else if (document.querySelector("#txtTipoColegioAlumno").value == "-1") {
        showAlertTopEnd('warning', 'Por favor ingrese Tipo de Colegio');
        document.querySelector("#txtTipoColegioAlumno").focus();
        return false;
    } else if (document.querySelector("#txtModalidadAlumno").value == "-1") {
        showAlertTopEnd('warning', 'Por favor ingrese Modalidad de Ingreso');
        document.querySelector("#txtModalidadAlumno").focus();
        return false;
    } else if (document.querySelector("#txtComensalAlumno").value == "-1") {
        showAlertTopEnd('warning', 'Por favor ingrese Comensal');
        document.querySelector("#txtComensalAlumno").focus();
        return false;
    } else if (document.querySelector("#txtEstadoAlumno").value == "-1") {
        showAlertTopEnd('warning', 'Por favor ingrese Estado');
        document.querySelector("#txtEstadoAlumno").focus();
        return false;
    }

    return true;
}

function validateFormAddAlumno() {
    if (document.querySelector("#txtTipoDocumentoAlumno").value != "1") {
        showAlertTopEnd('warning', 'Por favor seleccione Tipo de Documento válido');
        document.querySelector("#txtTipoDocumentoAlumno").focus();
        return false;
    } else if (document.querySelector("#txtNumeroDocumentoAlumno").value == "") {
        showAlertTopEnd('warning', 'Por favor ingrese DNI');
        document.querySelector("#txtNumeroDocumentoAlumno").focus();
        return false;
    } else if (document.querySelector("#txtApPaternoAlumno").value == "") {
        showAlertTopEnd('warning', 'Por favor ingrese Apellido Paterno');
        document.querySelector("#txtApPaternoAlumno").focus();
        return false;
    } else if (document.querySelector("#txtApMaternoAlumno").value == "") {
        showAlertTopEnd('warning', 'Por favor ingrese Apellido Materno');
        document.querySelector("#txtApMaternoAlumno").focus();
        return false;
    } else if (document.querySelector("#txtNombreAlumno").value == "") {
        showAlertTopEnd('warning', 'Por favor ingrese Nombre');
        document.querySelector("#txtNombreAlumno").focus();
        return false;
    } else if (document.querySelector("#txtTipoPersonaAlumno").value == "-1") {
        showAlertTopEnd('warning', 'Por favor ingrese Tipo de Usuario');
        document.querySelector("#txtTipoPersonaAlumno").focus();
        return false;
    }
    return true;
}

function addInputDatos(atendidoSelected) {
    //general
    document.querySelector("#txtTipoDocumentoAlumno").value = atendidoSelected.tipo_documento;
    document.querySelector("#txtEstadoCivilAlumno").value = atendidoSelected.estado_civil;
    document.querySelector("#txtEstadoAlumno").value = atendidoSelected.estado;
    document.querySelector("#txtNumeroDocumentoAlumno").value = atendidoSelected.dni;
    document.querySelector("#txtApPaternoAlumno").value = atendidoSelected.apellido_pat;
    document.querySelector("#txtApMaternoAlumno").value = atendidoSelected.apellido_mat;
    document.querySelector("#txtNombreAlumno").value = atendidoSelected.nombre;
    document.querySelector("#txtSexoAlumno").value = atendidoSelected.sexo;
    document.querySelector("#txtFechaNacAlumno").value = atendidoSelected.fecha_nacimiento;
    document.querySelector("#txtCelularAlumno").value = atendidoSelected.celular;
    document.querySelector("#txtEmailAlumno").value = atendidoSelected.email;
    document.querySelector("#txtDireccionActualAlumno").value = atendidoSelected.direccion_actual;
    document.querySelector("#txtDireccionProceAlumno").value = atendidoSelected.direccion_procedencia;
    document.querySelector("#txtDistritoActualAlumno").value = atendidoSelected.distrito_actual.nombre;
    document.querySelector("#txtDistritoProcedenciaAlumno").value = atendidoSelected.distrito_procedencia.nombre;

    //laboral
    document.querySelector("#txtTipoPersonaAlumno").value = atendidoSelected.tipo_atendido;
    document.querySelector("#txtTipoPersonalAlumno").value = atendidoSelected.subtipo_atendido;
    document.querySelector("#txtCicloAlumno").value = atendidoSelected.ciclo_academico_ingreso.nombre;
    document.querySelector("#txtCachimboAlumno").value = atendidoSelected.cachimbo;
    document.querySelector("#txtComensalAlumno").value = atendidoSelected.comensal;
    document.querySelector("#txtCodigoAlumno").value = atendidoSelected.codigo;
    document.querySelector("#txtModalidadAlumno").value = atendidoSelected.modalidad_ingreso;
    document.querySelector("#txtTipoColegioAlumno").value = atendidoSelected.tipo_colegio;
    document.querySelector("#txtEscuelaAlumno").value = atendidoSelected.escuela.nombre;
    if (atendidoSelected.escuela.idescuela == 0) {
        escuelaSelected = undefined;
    } else {
        escuelaSelected = atendidoSelected.escuela;
    }
    if (atendidoSelected.distrito_actual.iddistrito == 0) {
        distritoActualSelected = undefined;
    } else {
        distritoActualSelected = atendidoSelected.distrito_actual;
    }
    if (atendidoSelected.distrito_procedencia.iddistrito == 0) {
        distritoProcedenciaSelected = undefined;
    } else {
        distritoProcedenciaSelected = atendidoSelected.distrito_procedencia;
    }
    if (atendidoSelected.ciclo_academico_ingreso.idciclo_academico == 0) {
        cicloSelected = undefined;
    } else {
        cicloSelected = atendidoSelected.ciclo_academico_ingreso;
    }
    $('[data-toggle="popover"]').popover();
}

function viewDatosGenerales() {

    document.querySelector('#tab-datos-acceso').style.display = 'none';
    document.querySelector('#tab-datos-generales').style.display = 'block';
}

function viewDatosAcceso() {
    document.querySelector('#tab-datos-generales').style.display = 'none';
    document.querySelector('#tab-datos-acceso').style.display = 'block';
}