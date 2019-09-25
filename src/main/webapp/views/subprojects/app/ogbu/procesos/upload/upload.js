

var beanPaginationUploadAlumno;
var uploadAlumnoSelected;
var beanRequestUploadAlumno = new BeanRequest();
var list_atendidos = [];
class Atendido {
    constructor() {
        this.idatendido = 0;
        this.dni = "";
        this.codigo = "";
        this.nombre = "";
        this.apellido_pat = "";
        this.apellido_mat = "";
        this.tipo_documento = 1; //DNIS
        this.tipo_atendido = 1; //ALUMNO
        this.subtipo_atendido = 3; //NINGUNO
        this.sexo = ""; // 1 = MAS, 2 = FEM, 3 = OTRO
        this.estado_civil = -1; // SIN DEFINIR
        this.celular = "";
        this.fecha_nacimiento = "";
        this.email = "";
        this.estado = 1;
        this.cachimbo = 1; //SI
        this.comensal = 2; // NO
        this.direccion_procedencia = "";
        this.direccion_actual = "";
        this.tipo_colegio = 3; //NINGUNO
        this.modalidad_ingreso = 100; // SIN SELECCIONAR
        this.ciclo_academico_ingreso = null;
    }
}

class Usuario {
    constructor() {
        this.idusuario = 0;
        
    }
}

document.addEventListener("DOMContentLoaded", function () {

    document.querySelector("#row-uploads").style.display = "flex";
    document.querySelector("#row-crud-uploads").style.display = "none";
    //INICIALIZANDO VARIABLES DE SOLICITUD
    beanRequestUploadAlumno.entity_api = "api/upload";
    beanRequestUploadAlumno.operation = "paginate";
    beanRequestUploadAlumno.type_request = "GET";
    $('#FrmUploadAlumno').submit(function (event) {
        beanRequestUploadAlumno.operation = "paginate";
        beanRequestUploadAlumno.type_request = "GET";
        $('#modalCargandoUploadAlumno').modal('show');
        event.preventDefault();
        event.stopPropagation();
    });

    document.querySelector("#btnGuardarCargaUsuarios").onclick = function () {
        if (validateFormUploadAlumno()) {
            $('#modalCargandoUploadAlumno').modal('show');
        }
    };

    document.querySelector("#btnOpenNewUploadAlumno").onclick = function () {
        //CONFIGURAMOS LA SOLICITUD
        beanRequestUploadAlumno.operation = "add";
        beanRequestUploadAlumno.type_request = "POST";
        //LIMPIAR LOS CAMPOS
        document.querySelector("#exceltable").innerHTML = "";
        document.querySelector("#lblCantidadImportar").innerHTML = "[ 0 ] USUARIOS";
        document.querySelector("#txtCicloAcademico").value = "";
        document.querySelector("#txtComentario").value = "";
        document.querySelector("#txtNombreFileExcel").value = "";
        document.querySelector("#excelfile").value = null;
        //SET TITLE MODAL
        document.querySelector("#titleCrudUploadAlumno").innerHTML = "REGISTRAR IMPORTACIÓN";
        document.querySelector("#row-uploads").style.display = "none";
        document.querySelector("#row-crud-uploads").style.display = "flex";
    };

    document.querySelector("#btnSeleccionarArchivo").onclick = function () {
        $('#excelfile').trigger('click');
    };

    document.querySelector("#btnCancelarCargaUsuarios").onclick = function () {
        document.querySelector("#row-uploads").style.display = "flex";
        document.querySelector("#row-crud-uploads").style.display = "none";
    };

    $("#modalCargandoUploadAlumno").on('shown.bs.modal', function () {
        processAjaxUploadAlumno();
    });

    document.querySelector("#excelfile").onchange = function () {
        //CAMPO QUE VALIDARA SI SELECCIONO FILE
        if (this.value.toLowerCase() !== "") {
            readViewNameFile(this, 'txtNombreFileExcel');
        } else {
            $('#exceltable').empty();
            $('#txtNombreFileExcel').val("");
            showAlertTopEnd('warning', 'Por favor seleccione nuevamente un archivo excel!');
        }
    }

    document.querySelector("#btnCargarTablaHTML").onclick = function () {
        if ($('#txtNombreFileExcel').val() !== "") {
            $('#modalCargandoExcel').modal("show");
        } else {
            showAlertTopEnd('warning', 'Por favor, seleccione un archivo Excel!');
        }
    }

    $("#modalCargandoExcel").on('shown.bs.modal', function () {
        ExportToTable();
    });
    $('#modalCargandoUploadAlumno').modal('show');
    $("#sizePageUploadAlumno").change(function () {
        $('#modalCargandoUploadAlumno').modal('show');
    });
});
function processAjaxUploadAlumno() {
    let parameters_pagination = "";
    let json = "";
    let url_request = getHostAPI() + beanRequestUploadAlumno.entity_api + "/" + beanRequestUploadAlumno.operation;
    switch (beanRequestUploadAlumno.operation) {
        case "add":
            json = {
                "upload": {
                    "comentario": document.querySelector("#txtComentario").value,
                    "fecha": getTimesTampJavaScriptCurrent(),
                    "ciclo_academico": ciclo_academicoSelected,
                    "usuario": {
                        "idusuario" : Cookies.getJSON('sisbu_user').idusuario
                    }
                },
                "list_atendidos": list_atendidos
            };
            break;
        default:
            parameters_pagination += "?filter=" + document.querySelector("#txtFilterUploadAlumno").value.toUpperCase();
            parameters_pagination += "&page=" + document.querySelector("#pageUploadAlumno").value;
            parameters_pagination += "&size=" + document.querySelector("#sizePageUploadAlumno").value;
            url_request += parameters_pagination;
            break;
    }
    $.ajax({
        url: url_request,
        type: beanRequestUploadAlumno.type_request,
        headers: {
            'Authorization': 'Bearer ' + Cookies.get("sisbu_token")
        },
        data: JSON.stringify(json),
        contentType: 'application/json; charset=utf-8',
        dataType: 'json'
    }).done(function (beanCrudResponse) {
        $('#modalCargandoUploadAlumno').modal("hide");
        if (beanCrudResponse.messageServer !== undefined) {
            if (beanCrudResponse.messageServer.toLowerCase() == "ok") {
                showAlertTopEnd('success', 'Acción realizada exitosamente');
                $('#FrmUploadAlumno').submit();
            } else {
                showAlertTopEnd('warning', beanCrudResponse.messageServer);
            }
        }
        if (beanCrudResponse.beanPagination !== undefined) {
            beanPaginationUploadAlumno = beanCrudResponse.beanPagination;
            toListUploadAlumno(beanPaginationUploadAlumno);
        }
    }).fail(function (jqXHR, textStatus, errorThrown) {
        $('#ventanaModalManUploadAlumno').modal("hide");
        $('#modalCargandoUploadAlumno').modal("hide");
        showAlertErrorRequest();
    });
}

function toListUploadAlumno(beanPagination) {
    document.querySelector("#tbodyUploadAlumno").innerHTML = "";
    document.querySelector("#titleManagerUploadAlumno").innerHTML = "[ " + beanPagination.count_filter + " ] IMPORTACIONES";
    if (beanPagination.count_filter > 0) {
        let row;
        beanPagination.list.forEach(uploadAlumno => {
            row = "<tr ";
            row += "idupload_alumnos='" + uploadAlumno.idupload_alumnos + "' ";
            row += ">";
            row += "<td class='align-middle'>" + uploadAlumno.ciclo_academico.nombre + "</td>";
            row += "<td class='align-middle'>" + uploadAlumno.fecha + "</td>";
            row += "<td class='align-middle'>" + uploadAlumno.cant + "</td>";
            row += "<td class='align-middle'>" + uploadAlumno.usuario.usuario + "</td>";
            row += "</tr>";
            document.querySelector("#tbodyUploadAlumno").innerHTML += row;
        });
        buildPagination(
                beanPagination.count_filter,
                parseInt(document.querySelector("#sizePageUploadAlumno").value),
                document.querySelector("#pageUploadAlumno"),
                $('#modalCargandoUploadAlumno'),
                $('#paginationUploadAlumno'));
        addEventsUploadAlumnoes();
        if (beanRequestUploadAlumno.operation == "paginate") {
            document.querySelector("#txtFilterUploadAlumno").focus();
        }
        $('[data-toggle="tooltip"]').tooltip();
    } else {
        destroyPagination($('#paginationUploadAlumno'));
        showAlertTopEnd('warning', 'No se encontraron resultados');
        document.querySelector("#txtFilterUploadAlumno").focus();
    }
}

function addEventsUploadAlumnoes() {

}

function findByUploadAlumno(iduploadAlumno) {
    let uploadAlumno_;
    beanPaginationUploadAlumno.list.forEach(uploadAlumno => {
        if (iduploadAlumno == uploadAlumno.iduploadAlumno) {
            uploadAlumno_ = uploadAlumno;
            return;
        }
    });
    return uploadAlumno_;
}

function validateFormUploadAlumno() {
    if (ciclo_academicoSelected == undefined) {
        showAlertTopEnd('warning', 'Por favor seleccione ciclo academico');
        return false;
    }
    if (ciclo_academicoSelected.idciclo_academico == 0) {
        showAlertTopEnd('warning', 'Por favor seleccione ciclo academico correctamente');
        return false;
    }
    if (list_atendidos.length == 0) {
        showAlertTopEnd('warning', 'Por favor lea el archivo excel seleccionado');
        return false;
    }
    return true;
}

function readViewNameFile(input, idtxtname) {
    if (input.files && input.files[0]) {
        var reader = new FileReader();
        reader.readAsDataURL(input.files[0]);
        $('#' + idtxtname).val(input.files[0].name);
        $('#' + idtxtname).trigger("change");
    }
}


function ExportToTable() {
//LIMPIAMOS
    $('#exceltable').empty();
    var regex = /^([a-zA-Z0-9\s_\\.\-:])+(.xlsx|.xls)$/;
    /*Checks whether the file is a valid excel file*/
    if (regex.test($("#excelfile").val().toLowerCase())) {
        var xlsxflag = false; /*Flag for checking whether excel is .xls format or .xlsx format*/
        if ($("#excelfile").val().toLowerCase().indexOf(".xlsx") > 0) {
            xlsxflag = true;
        }
        /*Checks whether the browser supports HTML5*/
        if (typeof (FileReader) !== "undefined") {
            var reader = new FileReader();
            reader.onload = function (e) {
                var data = e.target.result;
                //console.log(data);
                /*Converts the excel data in to object*/
                if (xlsxflag) {
                    var workbook = XLSX.read(data, {type: 'binary'});
                } else {
                    var workbook = XLS.read(data, {type: 'binary'});
                }
                /*Gets all the sheetnames of excel in to a variable*/
                var sheet_name_list = workbook.SheetNames;
                var cnt = 0; /*This is used for restricting the script to consider only first sheet of excel*/
                sheet_name_list.forEach(function (y) { /*Iterate through all sheets*/
                    /*Convert the cell value to Json*/
                    if (xlsxflag) {
                        var exceljson = XLSX.utils.sheet_to_json(workbook.Sheets[y]);
                    } else {
                        var exceljson = XLS.utils.sheet_to_row_object_array(workbook.Sheets[y]);
                    }
                    if (exceljson.length > 0 && cnt == 0) {
                        BindTable(exceljson, '#exceltable');
                        cnt++;
                    }
                });
                $('#exceltable').show();
            }
            if (xlsxflag) {/*If excel file is .xlsx extension than creates a Array Buffer from excel*/
                reader.readAsArrayBuffer($("#excelfile")[0].files[0]);
            } else {
                reader.readAsBinaryString($("#excelfile")[0].files[0]);
            }
        } else {
            showAlertTopEnd('warning', 'Lo sientimos, tu navegador no doporta HTML5 para realizar esta operación!');
            //alert("Sorry! Your browser does not support HTML5!");
            $('#modalCargandoExcel').modal("hide");
        }
    } else {
        showAlertTopEnd('warning', 'Solo se permiten archivos Excel(xlsx, xls)!');
        $('#modalCargandoExcel').modal("hide");
        //alert("Please upload a valid Excel file!");
    }

}

function BindTable(jsondata, tableid) {
    /*Function used to convert the JSON array to Html Table*/
    var columns = BindTableHeader(jsondata, tableid); /*Gets all the column headings of Excel*/
    var tbody = "<tbody>";
    var tr;
    for (var i = 0; i < jsondata.length; i++) {
        tr = "<tr>";
        for (var colIndex = 0; colIndex < columns.length; colIndex++) {
            if (colIndex === 6) {
//console.log(cellValue);
            }
            var cellValue = jsondata[i][columns[colIndex]];
            if (cellValue == null)
                cellValue = "";
            tr = tr + "<td class='align-middle'>" + cellValue + "</td>";
        }
        tr = tr + "</tr>";
        tbody = tbody + tr;
    }
    document.querySelector("#lblCantidadImportar").innerHTML = "[ " + jsondata.length + " ] USUARIOS";
    list_atendidos = [];
    jsondata.forEach(element => {
        let atendido = new Atendido();
        atendido.dni = element.Dni;
        atendido.apellido_pat = element.ApellidoPaterno;
        atendido.apellido_mat = element.ApellidoMaterno;
        atendido.nombre = element.Nombres;
        atendido.sexo = (element.Sexo == "M" ? 1 : 2);
        atendido.direccion_actual = element.Direccion;
        atendido.celular = element.Telefono;
        list_atendidos.push(atendido);
    });
    tbody = tbody + "</tbody>";
    $(tableid).append(tbody);
    $('#modalCargandoExcel').modal("hide");
}

function BindTableHeader(jsondata, tableid) {
    /*Function used to get all column names from JSON and bind the html table header*/
    var columnSet = [];
    var thead = "<thead>";
    var tr;
    for (var i = 0; i < jsondata.length; i++) {
        tr = "<tr class = 'table-info'>";
        var rowHash = jsondata[i];
        for (var key in rowHash) {
            if (rowHash.hasOwnProperty(key)) {
                if ($.inArray(key, columnSet) == -1) {
                    /*Adding each unique column names to a variable array*/
                    columnSet.push(key);
                    tr = tr + "<th class='align-middle'>" + key + "</th>";
                }

            }
        }
        tr = tr + "</tr>";
        //SOLO QUE INGRESE UNA VEZ
        if (i === 0) {
            break;
        }
    }
    thead = thead + tr + "</thead>";
    $(tableid).append(thead);
    return columnSet;
}  