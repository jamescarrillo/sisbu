var beanPaginationAtendido;
var beanPaginationEscuela;
var atendidoSelected;
var escuelaSelected;
var cicloAcademicoSelected;
var distritoActualSelected;
var distritoProcedenciaSelected;
var beanRequestAtendido = new BeanRequest();

var distrito_option = "actual";

document.addEventListener("DOMContentLoaded", function () {

    //INICIALIZANDO VARIABLES DE SOLICITUD
    beanRequestAtendido.entity_api = "api/atendido";
    beanRequestAtendido.operation = "usuario";
    beanRequestAtendido.type_request = "GET";

    $('#txtFechaNacPaciente').bootstrapMaterialDatePicker({
        weekStart: 0,
        time: false,
        format: 'DD/MM/YYYY',
        lang: 'es'
    }).on('change', function (e, date) {
    });

    document.querySelector('#btnEliminarFechaNacPaciente').onclick = function () {
        document.querySelector('#txtFechaNacPaciente').value = '';
    };

    $('#FrmAtendido').submit(function (event) {
        beanRequestAtendido.operation = "usuario";
        beanRequestAtendido.type_request = "GET";
        $('#modalCargandoAtendido').modal('show');
        event.preventDefault();
        event.stopPropagation();
    });

    $('#FrmPersonalPaciente').submit(function (event) {
        try {
            beanRequestAtendido.operation = "update";
            beanRequestAtendido.type_request = "PUT";
            if (validateFormAtendido()) {
                $('#modalCargandoDatos').modal('show');
            }
        } catch (e) {
            console.log(e);
        }

        event.preventDefault();
        event.stopPropagation();
    });

    $("#modalCargandoDatos").on('shown.bs.modal', function () {
        processAjaxAtendido();
    });

    $("#ventanaModalAtendido").on('hidden.bs.modal', function () {
        beanRequestAtendido.operation = "paginate";
        beanRequestAtendido.type_request = "GET";
    });

    $("#modalCargandoDatos").on('hide.bs.modal', function () {
        beanRequestAtendido.operation = "update";
        beanRequestAtendido.type_request = "PUT";
    });

    $('#modalCargandoDatos').modal('show');

});

function processAjaxAtendido() {
    let parameters_pagination = "";
    let json = "";
    if (beanRequestAtendido.operation == "usuario") {
        parameters_pagination = "/" + user_session.idusuario;

    } else {
        parameters_pagination = "";
        if (beanRequestAtendido.operation == "delete") {
            parameters_pagination = "/" + atendidoSelected.idatendido;
            json = {};
        } else {
            json = {
                "nombre": document.querySelector("#txtNombrePaciente").value,
                "apellido_mat": document.querySelector("#txtApMaternoPaciente").value,
                "apellido_pat": document.querySelector("#txtApPaternoPaciente").value,
                "celular": document.querySelector("#txtCelularPaciente").value,
                "direccion_actual": document.querySelector("#txtDireccionActualPaciente").value,
                "direccion_procedencia": document.querySelector("#txtDireccionProcePaciente").value,
                "fecha_nacimiento": document.querySelector("#txtFechaNacPaciente").value,
                "estado_civil": document.querySelector("#txtEstadoPaciente").value,
                "codigo": document.querySelector("#txtCodigoPaciente").value,
                "dni": document.querySelector("#txtNumeroDocumentoPaciente").value,
                "email": document.querySelector("#txtEmailPaciente").value,
                "sexo": document.querySelector("#txtSexoPaciente").value,
                "tipo_colegio": document.querySelector("#txtTipoColegioPaciente").value,
                "tipo_documento": document.querySelector("#txtTipoDocumentoPaciente").value,
                "modalidad_ingreso": document.querySelector("#txtModalidadPaciente").value,
                "tipo_atendido": atendidoSelected.tipo_atendido,
                "subtipo_atendido": atendidoSelected.subtipo_atendido,
                "cachimbo": atendidoSelected.cachimbo,
                "comensal": atendidoSelected.comensal,
                "ciclo_academico_ingreso": {"idciclo_academico": cicloAcademicoSelected.idciclo_academico},
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
        //console.log(beanCrudResponse);
        if (beanCrudResponse.messageServer == "ok") {
            showAlertTopEnd('success', 'Datos actualizados exitosamente');
            $('#modalCargandoDatos').modal('hide');
        } else {
            if (beanCrudResponse.idatendido !== null) {
                //showAlertTopEnd('success', 'Acción realizada exitosamente');
                $('#modalCargandoDatos').modal('hide');
                atendidoSelected = beanCrudResponse;
                addInputDatos(atendidoSelected);
            }
        }
    }).fail(function (jqXHR, textStatus, errorThrown) {
        $('#modalCargandoAtendido').modal("hide");
        showAlertErrorRequest();

    });
}

function validateFormAtendido() {
    if (document.querySelector("#txtTipoDocumentoPaciente").value != "1") {
        showAlertTopEnd('warning', 'Por favor seleccione tipo de documento válido');
        document.querySelector("#txtTipoDocumentoPaciente").focus();
        return false;
    } else if (document.querySelector("#txtModalidadPaciente").value == "100") {
        showAlertTopEnd('warning', 'Por favor seleccione modalidad de ingreso');
        document.querySelector("#txtModalidadPaciente").focus();
        return false;
    } else if (document.querySelector("#txtTipoColegioPaciente").value == "-1") {
        showAlertTopEnd('warning', 'Por favor seleccione tipo de colegio de procedencia');
        document.querySelector("#txtTipoColegioPaciente").focus();
        return false;
    } else if (document.querySelector("#txtEstadoPaciente").value == "-1") {
        showAlertTopEnd('warning', 'Por favor seleccione estado civil');
        document.querySelector("#txtEstadoPaciente").focus();
        return false;
    } else if (document.querySelector("#txtNumeroDocumentoPaciente").value == "") {
        showAlertTopEnd('warning', 'Por favor ingrese DNI');
        document.querySelector("#txtNumeroDocumentoPaciente").focus();
        return false;
    } else if (document.querySelector("#txtApPaternoPaciente").value == "") {
        showAlertTopEnd('warning', 'Por favor ingrese apellido paterno');
        document.querySelector("#txtApPaternoPaciente").focus();
        return false;
    } else if (document.querySelector("#txtApMaternoPaciente").value == "") {
        showAlertTopEnd('warning', 'Por favor ingrese apellido materno');
        document.querySelector("#txtApMaternoPaciente").focus();
        return false;
    } else if (document.querySelector("#txtNombrePaciente").value == "") {
        showAlertTopEnd('warning', 'Por favor ingrese nombre');
        document.querySelector("#txtNombrePaciente").focus();
        return false;
    } else if (document.querySelector("#txtSexoPaciente").value == "-1") {
        showAlertTopEnd('warning', 'Por favor seleccione un sexo');
        document.querySelector("#txtSexoPaciente").focus();
        return false;
    } else if (document.querySelector("#txtFechaNacPaciente").value == "") {
        showAlertTopEnd('warning', 'Por favor ingrese fecha de nacimiento');
        document.querySelector("#txtFechaNacPaciente").focus();
        return false;
    } else if (document.querySelector("#txtCelularPaciente").value == "") {
        showAlertTopEnd('warning', 'Por favor ingrese celular');
        document.querySelector("#txtCelularPaciente").focus();
        return false;
    } else if (document.querySelector("#txtCelularPaciente").value.length > 9) {
        showAlertTopEnd('warning', 'El número de celular no debe exceder a los 9 dígitos');
        document.querySelector("#txtCelularPaciente").focus();
        return false;
    } else if (document.querySelector("#txtEmailPaciente").value == "") {
        showAlertTopEnd('warning', 'Por favor ingrese email');
        document.querySelector("#txtEmailPaciente").focus();
        return false;
    } else if (escuelaSelected == undefined) {
        showAlertTopEnd('warning', 'Por favor seleccione una escuela');
        return false;
    } else if (document.querySelector("#txtDireccionActualPaciente").value == "") {
        showAlertTopEnd('warning', 'Por favor ingrese dirección actual');
        document.querySelector("#txtDireccionActualPaciente").focus();
        return false;
    } else if (document.querySelector("#txtDireccionProcePaciente").value == "") {
        showAlertTopEnd('warning', 'Por favor ingrese dirección de procedencia');
        document.querySelector("#txtDireccionProcePaciente").focus();
        return false;
    } else if (distritoActualSelected == undefined) {
        showAlertTopEnd('warning', 'Por favor seleccione distrito actual');
        return false;
    } else if (distritoProcedenciaSelected == undefined) {
        showAlertTopEnd('warning', 'Por favor seleccione distrito de procedencia');
        return false;
    }
    return true;
}

function addInputDatos(atendidoSelected) {
    document.querySelector("#txtTipoDocumentoPaciente").value = atendidoSelected.tipo_documento;
    document.querySelector("#txtTipoDocumentoPaciente").disabled = true;
    document.querySelector("#txtEstadoPaciente").value = atendidoSelected.estado_civil;
    document.querySelector("#txtCodigoPaciente").value = atendidoSelected.codigo;
    document.querySelector("#txtNumeroDocumentoPaciente").value = atendidoSelected.dni;
    document.querySelector("#txtApPaternoPaciente").value = atendidoSelected.apellido_pat;
    document.querySelector("#txtApMaternoPaciente").value = atendidoSelected.apellido_mat;
    document.querySelector("#txtNombrePaciente").value = atendidoSelected.nombre;
    document.querySelector("#txtSexoPaciente").value = atendidoSelected.sexo;
    document.querySelector("#txtFechaNacPaciente").value = atendidoSelected.fecha_nacimiento;
    document.querySelector("#txtCelularPaciente").value = atendidoSelected.celular;
    document.querySelector("#txtEmailPaciente").value = atendidoSelected.email;
    document.querySelector("#txtModalidadPaciente").value = atendidoSelected.modalidad_ingreso;
    document.querySelector("#txtTipoColegioPaciente").value = atendidoSelected.tipo_colegio;
    document.querySelector("#txtDireccionActualPaciente").value = atendidoSelected.direccion_actual;
    document.querySelector("#txtDireccionProcePaciente").value = atendidoSelected.direccion_procedencia;
    document.querySelector("#txtEscuelaPaciente").value = atendidoSelected.escuela.nombre;
    document.querySelector("#txtDistritoActualPaciente").value = atendidoSelected.distrito_actual.nombre;
    document.querySelector("#txtDistritoProcedenciaPaciente").value = atendidoSelected.distrito_procedencia.nombre;
    document.querySelector("#txtCicloAcademicoPaciente").value = atendidoSelected.ciclo_academico_ingreso.nombre;
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
        cicloAcademicoSelected = undefined;
    } else {
        cicloAcademicoSelected = atendidoSelected.ciclo_academico_ingreso;
    }
    $('[data-toggle="popover"]').popover();
}
