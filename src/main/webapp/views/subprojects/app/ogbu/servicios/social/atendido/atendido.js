var beanPaginationAtendido;
var atendidoSelected;
var beanRequestAtendido = new BeanRequest();
document.addEventListener("DOMContentLoaded", function () {
    //INICIALIZANDO VARIABLES DE SOLICITUD
    beanRequestAtendido.entity_api = "api/atendido";
    beanRequestAtendido.operation = "paginate";
    beanRequestAtendido.type_request = "GET";


    $('#txtFechaNacAtendido').bootstrapMaterialDatePicker({
        weekStart: 0,
        time: false,
        format: 'DD/MM/YYYY',
        lang: 'es'
    }).on('change', function (e, date) {
    });

    document.querySelector('#btnEliminarFechaNacAtendido').onclick = function () {
        document.querySelector('#txtFechaNacAtendido').value = '';
    };


    $('#FrmAtendido').submit(function (event) {
        beanRequestAtendido.operation = "paginate";
        beanRequestAtendido.type_request = "GET";
        $('#modalCargandoAtendido').modal('show');
        event.preventDefault();
        event.stopPropagation();
    });

    $('#FrmAtendidoModal').submit(function (event) {
        if (validateFormAtendido()) {
            $('#modalCargandoAtendido').modal('show');
        }
        event.preventDefault();
        event.stopPropagation();
    });

    document.querySelector("#btnOpenNewAtendido").onclick = function () {
        //CONFIGURAMOS LA SOLICITUD
        beanRequestAtendido.operation = "add";
        beanRequestAtendido.type_request = "POST";
        //LIMPIAR LOS CAMPOS
        limpiarInput();
        //SET TITLE MODAL
        document.querySelector("#txtTituloModalMan").innerHTML = "REGISTRAR ATENDIDO";
        //OPEN MODEL
        document.querySelector("#btnListaAtendido").style.display = 'none';
        document.querySelector("#btnOpenAtendido").style.display = 'block';
    };

    document.querySelector("#btnRegresar").onclick = function () {
        beanRequestAtendido.operation = "paginate";
        beanRequestAtendido.type_request = "GET";
        $('#modalCargandoAtendido').modal('show');
        document.querySelector("#btnOpenAtendido").style.display = 'none';
        document.querySelector("#btnListaAtendido").style.display = 'block';
    };

    $("#modalCargandoAtendido").on('shown.bs.modal', function () {
        processAjaxAtendido();
    });
    $('#modalCargandoAtendido').modal('show');

    $("#sizePageAtendido").change(function () {
        $('#modalCargandoAtendido').modal('show');
    });

});

function processAjaxAtendido() {
    let parameters_pagination = "";
    let json = "";
    if (beanRequestAtendido.operation == "paginate") {
        parameters_pagination += "?filter=" + document.querySelector("#txtFilterAtendido").value;
        parameters_pagination += "&page=" + document.querySelector("#pageAtendido").value;
        parameters_pagination += "&size=" + document.querySelector("#sizePageAtendido").value;

    } else {
        parameters_pagination = "";
        if (beanRequestAtendido.operation == "delete") {
            parameters_pagination = "/" + atendidoSelected.idatendido;
            json = {};
        } else {
            json = {
                "nombre": document.querySelector("#txtNombreAtendido").value,
                "apellido_mat": document.querySelector("#txtApMaternoAtendido").value,
                "apellido_pat": document.querySelector("#txtApPaternoAtendido").value,
                "celular": document.querySelector("#txtCelularAtendido").value,
                "direccion_actual": document.querySelector("#txtDireccionActualAtendido").value,
                "direccion_procedencia": document.querySelector("#txtDireccionProceAtendido").value,
                "fecha_nacimiento": document.querySelector("#txtFechaNacAtendido").value,
                "estado_civil": document.querySelector("#txtEstadoAtendido").value,
                "codigo": document.querySelector("#txtCodigoAtendido").value,
                "dni": document.querySelector("#txtNumeroDocumentoAtendido").value,
                "email": document.querySelector("#txtEmailAtendido").value,
                "sexo": document.querySelector("#txtSexoAtendido").value,
                "tipo_colegio": document.querySelector("#txtTipoColegioAtendido").value,
                "tipo_documento": document.querySelector("#txtTipoDocumentoAtendido").value,
                "modalidad_ingreso": document.querySelector("#txtModalidadAtendido").value,
                "escuela": {"idescuela": escuelaSelected.idescuela},
                "distrito_actual": {"iddistrito": distritoActualSelected.iddistrito},
                "distrito_procedencia": {"iddistrito": distritoProcedenciaSelected.iddistrito},
            };
            if (beanRequestAtendido.operation == "update") {
                json.idatendido = atendidoSelected.idatendido;
            }
        }
    }
    $.ajax({
        url: getHostAPI() + beanRequestAtendido.entity_api + "/" + beanRequestAtendido.operation + parameters_pagination,
        type: beanRequestAtendido.type_request,
        headers: {
            'Authorization': 'Bearer ' + Cookies.get("sisbu_token")
        },
        data: JSON.stringify(json),
        contentType: 'application/json; charset=utf-8',
        dataType: 'json'
    }).done(function (beanCrudResponse) {
        console.log(beanCrudResponse);
        $('#modalCargandoAtendido').modal("hide");
        if (beanCrudResponse.messageServer !== undefined) {
            if (beanCrudResponse.messageServer.toLowerCase() == "ok") {
                if (beanRequestAtendido.operation == "add") {
                    limpiarInput();
                }

                showAlertTopEnd('success', 'Acción realizada exitosamente');

            } else {
                showAlertTopEnd('warning', beanCrudResponse.messageServer);
            }
        }
        if (beanCrudResponse.beanPagination !== undefined) {
            beanPaginationAtendido = beanCrudResponse.beanPagination;
            toListAtendido(beanPaginationAtendido);
        }
    }).fail(function (jqXHR, textStatus, errorThrown) {
        $('#modalCargandoAtendido').modal("hide");
        showAlertErrorRequest();

    });
}

function toListAtendido(beanPagination) {
    document.querySelector("#tbodyAtendido").innerHTML = "";
    document.querySelector("#titleManagerAtendido").innerHTML = "[ " + beanPagination.count_filter + " ] ATENDIDOS";
    if (beanPagination.count_filter > 0) {
        let row;
        beanPagination.list.forEach(atendido => {
            row = "<div class='dt-widget__item border-bottom'>";
            row += "<div class='dt-extra animate-slide align-self-center mr-5' idatendido='" + atendido.idatendido + "'>";
            row += "<span class='badge badge-info badge-circle-animate badge-pill badge-sm align-text-top mr-2'>"
            row += "<a class='text-light-gray editar-atendido' data-toggle='tooltip' title='Editar' href='javascript:void(0)'>";
            row += "<i class='text-white icon icon-editors'></i></a>";
            row += "</span>";
            row += "<div class='slide-content'>";
            row += "<a idusuario='" + atendido.usuario.idusuario + "' class='text-light-gray usuario-atendido' data-toggle='tooltip' title='Datos Usuario' href='javascript:void(0)'>";
            row += "<i class='text-success fa fa-user-circle'></i></a></div>";
            row += "<div class='slide-content'>";
            row += "<a class='text-light-gray familiar-atendido' data-toggle='tooltip' title='Lista de Familiares'' href='javascript:void(0)'>";
            row += "<i class='text-primary fa fa-users'></i></a></div>";
            row += "<div class='slide-content'>";
            row += "<a class='text-info text-light-gray fichas-atendido' data-toggle='tooltip' title='Fichas'' href='javascript:void(0)'>";
            row += "<i class='text-warning fa fa-list-ol'></i></a></div>";
            row += "</div>";

            row += "<div class='dt-widget__info text-truncate mr-5' style='min-width:50px; max-width:10%'>";
            row += "<p class='dt-widget__subtitle text-truncate text-dark'>";
            row += atendido.dni + "</p></div>";

            row += "<div class='text-truncate mr-5' style='min-width:60px; width:25%;'>";
            row += "<p class='dt-widget__subtitle text-truncate text-dark'>";
            row += atendido.apellido_pat + " " + atendido.apellido_mat + " " + atendido.nombre + "</p></div>";

            row += "<div class=' text-truncate mr-5'  style='min-width:60px; max-width:18%;'>";
            row += "<p class='dt-widget__subtitle text-truncate text-dark'>";
            row += atendido.fecha_nacimiento + "</p></div>";

            row += "<div class='text-truncate mr-5' style='min-width:60px; max-width:15%;'>";
            row += "<p class='dt-widget__subtitle text-truncate text-dark'>";
            row += atendido.email + "</p></div>";

            row += "<div class='text-truncate' style='min-width:60px; max-width:15%;'>";
            row += "<p class='dt-widget__subtitle text-truncate text-dark'>";
            row += atendido.escuela.nombre + "</p></div>";

            row += "</div>";

            document.querySelector("#tbodyAtendido").innerHTML += row;
            $('[data-toggle="tooltip"]').tooltip();
        });
        buildPagination(
                beanPagination.count_filter,
                parseInt(document.querySelector("#sizePageAtendido").value),
                document.querySelector("#pageAtendido"),
                $('#modalCargandoAtendido'),
                $('#paginationAtendido'));
        addEventsAtendidoes();


    } else {
        destroyPagination($('#paginationAtendido'));
        showAlertTopEnd('warning', 'No se encontraron resultados');
    }
}

function addEventsAtendidoes() {
    document.querySelectorAll('.editar-atendido').forEach(btn => {
        //AGREGANDO EVENTO CLICK
        btn.onclick = function () {
            atendidoSelected = findByAtendido(btn.parentElement.parentElement.getAttribute('idatendido'));
            if (atendidoSelected != undefined) {
                beanRequestAtendido.operation = "update";
                beanRequestAtendido.type_request = "PUT";

                document.querySelector("#btnListaAtendido").style.display = 'none';
                document.querySelector("#btnOpenAtendido").style.display = 'block';

                //SET VALUES MODAL
                document.querySelector("#txtTipoDocumentoAtendido").value = atendidoSelected.tipo_documento;
                document.querySelector("#txtModalidadAtendido").value = atendidoSelected.modalidad_ingreso;
                document.querySelector("#txtTipoColegioAtendido").value = atendidoSelected.tipo_colegio;
                document.querySelector("#txtEstadoAtendido").value = atendidoSelected.estado_civil;
                document.querySelector("#txtCodigoAtendido").value = atendidoSelected.codigo;
                document.querySelector("#txtNumeroDocumentoAtendido").value = atendidoSelected.dni;
                document.querySelector("#txtApPaternoAtendido").value = atendidoSelected.apellido_pat;
                document.querySelector("#txtApMaternoAtendido").value = atendidoSelected.apellido_mat;
                document.querySelector("#txtNombreAtendido").value = atendidoSelected.nombre;
                document.querySelector("#txtSexoAtendido").value = atendidoSelected.sexo;
                document.querySelector("#txtFechaNacAtendido").value = atendidoSelected.fecha_nacimiento;
                document.querySelector("#txtCelularAtendido").value = atendidoSelected.celular;
                document.querySelector("#txtEmailAtendido").value = atendidoSelected.email;
                document.querySelector("#txtEscuelaAtendido").value = atendidoSelected.escuela.nombre;
                document.querySelector("#txtDireccionActualAtendido").value = atendidoSelected.direccion_actual;
                document.querySelector("#txtDireccionProceAtendido").value = atendidoSelected.direccion_procedencia;
                document.querySelector("#txtDistritoActualAtendido").value = atendidoSelected.distrito_actual.nombre;
                document.querySelector("#txtDistritoProcedenciaAtendido").value = atendidoSelected.distrito_procedencia.nombre;

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
                    distritoProcedenciaSelected = 0;
                } else {
                    distritoProcedenciaSelected = atendidoSelected.distrito_procedencia;
                }
                $('[data-toggle="popover"]').popover();
                document.querySelector("#txtTituloModalMan").innerHTML = "EDITAR ATENDIDO";
                //OPEN MODEL

                document.querySelector("#txtTipoDocumentoAtendido").focus();
            } else {
                showAlertTopEnd('warning', 'No se encontró el Atendido para poder editar');
            }
        };
    });
    document.querySelectorAll('.usuario-atendido').forEach(btn => {
        //AGREGANDO EVENTO CLICK
        btn.onclick = function () {
            atendidoSelected = findByAtendidoUsuario(btn.getAttribute('idusuario'));
            if (atendidoSelected != undefined) {
                beanRequestUsuario.operation = "get-user";
                beanRequestUsuario.type_request = "GET";
                usuarioSelected = atendidoSelected.usuario;
                document.querySelector("#btnListaAtendido").style.display = 'none';
                document.querySelector("#btnOpenUsuario").style.display = 'block';
                $('#modalCargandoUsuario').modal('show');
            }




        };
    });
    document.querySelectorAll('.familiar-atendido').forEach(btn => {
        //AGREGANDO EVENTO CLICK
        btn.onclick = function () {
            atendidoSelected = findByAtendido(btn.parentElement.parentElement.getAttribute('idatendido'));
            if (atendidoSelected != undefined) {
                beanRequestFamiliar.operation = "paginate";
                beanRequestFamiliar.type_request = "GET";
                document.querySelector("#btnListaAtendido").style.display = 'none';
                document.querySelector("#btnOpenFamiliar").style.display = 'block';
                $('#modalCargandoFamiliar').modal('show');
            }

        };
    });
}

function findByAtendido(idatendido) {
    let atendido_;
    beanPaginationAtendido.list.forEach(atendido => {
        if (idatendido == atendido.idatendido) {
            atendido_ = atendido;
            return;
        }
    });
    return atendido_;
}

function findByAtendidoUsuario(idatendido) {
    let atendido_;
    beanPaginationAtendido.list.forEach(atendido => {
        if (idatendido == atendido.usuario.idusuario) {
            atendido_ = atendido;
            return;
        }
    });
    return atendido_;
}

function validateFormAtendido() {
    if (document.querySelector("#txtTipoDocumentoAtendido").value == "") {
        showAlertTopEnd('warning', 'Por favor ingrese Tipo de Documento');
        document.querySelector("#txtTipoDocumentoAtendido").focus();
        return false;
    }
    if (document.querySelector("#txtModalidadAtendido").value == "") {
        showAlertTopEnd('warning', 'Por favor ingrese Modalidad de Ingreso');
        document.querySelector("#txtModalidadAtendido").focus();
        return false;
    }

    if (document.querySelector("#txtTipoColegioAtendido").value == "") {
        showAlertTopEnd('warning', 'Por favor ingrese Tipo de Colegio');
        document.querySelector("#txtTipoColegioAtendido").focus();
        return false;
    }
    if (document.querySelector("#txtEstadoAtendido").value == "") {
        showAlertTopEnd('warning', 'Por favor ingrese Estado Civil');
        document.querySelector("#txtEstadoAtendido").focus();
        return false;
    }
    if (document.querySelector("#txtNumeroDocumentoAtendido").value == "") {
        showAlertTopEnd('warning', 'Por favor ingrese Numero de Documento');
        document.querySelector("#txtNumeroDocumentoAtendido").focus();
        return false;
    }
    if (document.querySelector("#txtApPaternoAtendido").value == "") {
        showAlertTopEnd('warning', 'Por favor ingrese Apellido Paterno');
        document.querySelector("#txtApPaternoAtendido").focus();
        return false;
    }
    if (document.querySelector("#txtApMaternoAtendido").value == "") {
        showAlertTopEnd('warning', 'Por favor ingrese Apellido Materno');
        document.querySelector("#txtApMaternoAtendido").focus();
        return false;
    }
    if (document.querySelector("#txtNombreAtendido").value == "") {
        showAlertTopEnd('warning', 'Por favor ingrese Nombres');
        document.querySelector("#txtNombreAtendido").focus();
        return false;
    }
    if (document.querySelector("#txtSexoAtendido").value == "") {
        showAlertTopEnd('warning', 'Por favor ingrese Sexo');
        document.querySelector("#txtSexoAtendido").focus();
        return false;
    }
    if (document.querySelector("#txtFechaNacAtendido").value == "") {
        showAlertTopEnd('warning', 'Por favor ingrese Fecha');
        document.querySelector("#txtFechaNacAtendido").focus();
        return false;
    }
    if (document.querySelector("#txtCelularAtendido").value == "") {
        showAlertTopEnd('warning', 'Por favor ingrese Celular');
        document.querySelector("#txtCelularAtendido").focus();
        return false;
    }
    if (document.querySelector("#txtEmailAtendido").value == "") {
        showAlertTopEnd('warning', 'Por favor ingrese Email');
        document.querySelector("#txtEmailAtendido").focus();
        return false;
    }
    if (document.querySelector("#txtEscuelaAtendido").value == "") {
        showAlertTopEnd('warning', 'Por favor ingrese Escuela');
        document.querySelector("#txtEscuelaAtendido").focus();
        return false;
    }
    if (document.querySelector("#txtDireccionActualAtendido").value == "") {
        showAlertTopEnd('warning', 'Por favor ingrese Dirección Actual');
        document.querySelector("#txtDireccionActualAtendido").focus();
        return false;
    }
    if (document.querySelector("#txtDireccionProceAtendido").value == "") {
        showAlertTopEnd('warning', 'Por favor ingrese Dirección de Procedencia');
        document.querySelector("#txtDireccionProceAtendido").focus();
        return false;
    }
    if (document.querySelector("#txtDistritoActualAtendido").value == "") {
        showAlertTopEnd('warning', 'Por favor ingrese Distrito Actual');
        document.querySelector("#txtDistritoActualAtendido").focus();
        return false;
    }
    if (document.querySelector("#txtDistritoProcedenciaAtendido").value == "") {
        showAlertTopEnd('warning', 'Por favor ingrese Distrito Procedencia');
        document.querySelector("#txtDistritoProcedenciaAtendido").focus();
        return false;
    }
    return true;
}

function limpiarInput() {
    document.querySelector("#txtTipoDocumentoAtendido").value = "1";
    document.querySelector("#txtModalidadAtendido").value = "100";
    document.querySelector("#txtTipoColegioAtendido").value = "-1";
    document.querySelector("#txtEstadoAtendido").value = "-1";
    document.querySelector("#txtCodigoAtendido").value = "";
    document.querySelector("#txtNumeroDocumentoAtendido").value = "";
    document.querySelector("#txtApPaternoAtendido").value = "";
    document.querySelector("#txtApMaternoAtendido").value = "";
    document.querySelector("#txtNombreAtendido").value = "";
    document.querySelector("#txtSexoAtendido").value = "-1";
    document.querySelector("#txtFechaNacAtendido").value = "";
    document.querySelector("#txtCelularAtendido").value = "";
    document.querySelector("#txtEmailAtendido").value = "";
    document.querySelector("#txtEscuelaAtendido").value = "";
    document.querySelector("#txtDireccionActualAtendido").value = "";
    document.querySelector("#txtDireccionProceAtendido").value = "";
    document.querySelector("#txtDistritoActualAtendido").value = "";
    document.querySelector("#txtDistritoProcedenciaAtendido").value = "";
}

