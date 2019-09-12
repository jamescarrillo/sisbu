var beanPaginationPersonal;
var personalSelected;
var beanRequestPersonal = new BeanRequest();
document.addEventListener("DOMContentLoaded", function () {

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
        //CONFIGURAMOS LA SOLICITUD
        beanRequestPersonal.operation = "add";
        beanRequestPersonal.type_request = "POST";
        //LIMPIAR LOS CAMPOS
        document.querySelector("#txtDescripcionPersonal").value = "";
         document.querySelector("#txtTipoPersonal").options[0].selected = 'selected';
        //SET TITLE MODAL
        document.querySelector("#txtTituloModalMan").innerHTML = "REGISTRAR COMIDA";
        //OPEN MODEL
        $('#ventanaModalPersonal').modal('show');
    };

    $("#modalCargandoPersonal").on('shown.bs.modal', function () {
        processAjaxPersonal();
    });

    $('#modalCargandoPersonal').modal('show');
    
    $("#sizePagePersonal").change(function() {
     $('#modalCargandoPersonal').modal('show');
    });
   
});

function processAjaxPersonal() {
    let parameters_pagination = "";
    let json = "";
    if (beanRequestPersonal.operation == "paginate") {
        parameters_pagination = "?dni=" + document.querySelector("#txtFilterDniPersonal").value;
        parameters_pagination += "&estado=" + document.querySelector("#txtFilterEstadoPersonal").value;
        parameters_pagination += "&page=" + document.querySelector("#pagePersonal").value;
        parameters_pagination += "&size=" + document.querySelector("#sizePagePersonal").value;
        
    } else {
      
        parameters_pagination = "";
        if(beanRequestPersonal.operation == "delete" ){
        parameters_pagination = "/"+personalSelected.idpersonal; 
        json={};
        }else{
         json = {
            "descripcion": document.querySelector("#txtDescripcionPersonal").value,
            "tipo": document.querySelector("#txtTipoPersonal").value
        };
        if (beanRequestPersonal.operation == "update" ) {
            json.idpersonal = personalSelected.idpersonal;
        }   
        }
        
        
    }
    $.ajax({
        url: getHostAPI() + beanRequestPersonal.entity_api + "/" + beanRequestPersonal.operation + parameters_pagination,
        type: beanRequestPersonal.type_request,
        headers: {
            //'Authorization': 'Bearer ' + Cookies.get("sisbu_token")
        },
        data: JSON.stringify(json),
        contentType: 'application/json; charset=utf-8',
        dataType: 'json'
    }).done(function (beanCrudResponse) {
        console.log(beanCrudResponse);
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
            row = "<tr ";
            row += "idpersonal='" + personal.idpersonal + "' ";
            row += ">";
            row += "<td class='align-middle'>" + personal.dni + "</td>";
            row += "<td class='align-middle'>" + personal.apellido_pat + "</td>";
            row += "<td class='align-middle'>" + personal.apellido_mat + "</td>";
            row += "<td class='align-middle'>" + personal.nombre + "</td>";
            row += "<td class='align-middle'>" + personal.cargo.nombre + "</td>";
            row += "<td class='align-middle'>" + personal.area.nombre + "</td>";
            row += "<td class='align-middle'>" + tipoPersonal(personal.tipo_personal) + "</td>";
            row += "<td class='text-center align-middle'><button class='btn btn-outline-secondary btn-xs editar-personal' data-toggle='tooltip' title='Editar'><i class='icon icon-editors icon-fw'></i></button></td>";
            row += "<td class='text-center align-middle'><button class='btn btn-outline-secondary btn-xs eliminar-personal' data-toggle='tooltip' title='Eliminar'><i class='icon icon-trash icon-fw'></i></button></td>";
            row += "</tr>";
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
            document.querySelector("#txtFilterPersonal").focus();
        }
        $('[data-toggle="tooltip"]').tooltip();
    } else {
        destroyPagination($('#paginationPersonal'));
        showAlertTopEnd('warning', 'No se encontraron resultados');
        document.querySelector("#txtFilterPersonal").focus();
    }
}

function addEventsPersonales() {
    document.querySelectorAll('.editar-personal').forEach(btn => {
        //AGREGANDO EVENTO CLICK
        btn.onclick = function () {
            console.log(btn.parentElement.parentElement.getAttribute('idpersonal'));
            personalSelected = findByPersonal(btn.parentElement.parentElement.getAttribute('idpersonal'));
            if (personalSelected != undefined) {
                beanRequestPersonal.operation = "update";
                beanRequestPersonal.type_request = "PUT";
                //SET VALUES MODAL
                console.log(personalSelected.descripcion);
                document.querySelector("#txtDescripcionPersonal").value= personalSelected.descripcion;
                document.querySelector("#txtTipoPersonal").options[personalSelected.tipo].selected = 'selected';
                document.querySelector("#txtTituloModalMan").innerHTML = "EDITAR COMIDA";
                $('#ventanaModalPersonal').modal("show");
                document.querySelector("#txtDecripcionPersonal").focus();
            } else {
                showAlertTopEnd('warning', 'No se encontró el Personal para poder editar');
            }
        };
    });
 document.querySelectorAll('.eliminar-personal').forEach(btn => {
        //AGREGANDO EVENTO CLICK
        btn.onclick = function () {
          personalSelected = findByPersonal(btn.parentElement.parentElement.getAttribute('idpersonal'));
          beanRequestPersonal.operation = "delete";
           beanRequestPersonal.type_request = "DELETE";
            processAjaxPersonal();
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
    if (document.querySelector("#txtDescripcionPersonal").value == "") {
        showAlertTopEnd('warning', 'Por favor ingrese descripcion');
        document.querySelector("#txtDescripcionPersonal").focus();
        return false;
    }else  if (document.querySelector("#txtTipoPersonal").value == 0) {
        showAlertTopEnd('warning', 'Por favor ingrese tipo ');
        document.querySelector("#txtTipoPersonal").focus();
        return false;
    }
    return true;
}

function tipoPersonal(tipopersonal){
    switch(tipopersonal){
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
