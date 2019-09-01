var beanPaginationMenuSemanal;
var comidaSelected;
var beanRequestMenuSemanal = new BeanRequest();
document.addEventListener("DOMContentLoaded", function () {

    //INICIALIZANDO VARIABLES DE SOLICITUD
    beanRequestMenuSemanal.entity_api = "api/comidas";
    beanRequestMenuSemanal.operation = "paginate";
    beanRequestMenuSemanal.type_request = "GET";

    $('#FrmMenuSemanal').submit(function (event) {
        $('#modalCargandoMenuSemanal').modal('show');
        event.preventDefault();
        event.stopPropagation();
    });

    $('#FrmMenuSemanalModal').submit(function (event) {
        if (validateFormMenuSemanal()) {
            $('#modalCargandoMenuSemanal').modal('show');
        }
        event.preventDefault();
        event.stopPropagation();
    });

    document.querySelector("#btnOpenNewMenuSemanal").onclick = function () {
        //CONFIGURAMOS LA SOLICITUD
        beanRequestMenuSemanal.operation = "add";
        beanRequestMenuSemanal.type_request = "POST";
        //LIMPIAR LOS CAMPOS
        document.querySelector("#txtDescripcionMenuSemanal").value = "";
         document.querySelector("#txtTipoMenuSemanal").options[0].selected = 'selected';
        //SET TITLE MODAL
        document.querySelector("#txtTituloModalMan").innerHTML = "REGISTRAR COMIDA";
        //OPEN MODEL
        $('#ventanaModalMenuSemanal').modal('show');
    };

    $("#modalCargandoMenuSemanal").on('shown.bs.modal', function () {
        processAjaxMenuSemanal();
    });

    $('#modalCargandoMenuSemanal').modal('show');

});

function processAjaxMenuSemanal() {
    let parameters_pagination = "";
    let json = "";
    if (beanRequestMenuSemanal.operation === "paginate") {
        parameters_pagination = "?nombre=" + document.querySelector("#txtFilterMenuSemanal").value.toUpperCase();
        parameters_pagination += "&page=" + document.querySelector("#pageMenuSemanal").value;
        parameters_pagination += "&size=" + document.querySelector("#sizePageMenuSemanal").value;
    } else {
        parameters_pagination = "";
        if(beanRequestMenuSemanal.operation === "delete" ){
        parameters_pagination = "/"+comidaSelected.idcomida; 
        json={};
        }else{
         json = {
            "descripcion": document.querySelector("#txtDescripcionMenuSemanal").value,
            "tipo": document.querySelector("#txtTipoMenuSemanal").value
        };
        if (beanRequestMenuSemanal.operation === "update" ) {
            json.idcomida = comidaSelected.idcomida;
        }   
        }
        
        
    }
    $.ajax({
        url: getHostAPI() + beanRequestMenuSemanal.entity_api + "/" + beanRequestMenuSemanal.operation + parameters_pagination,
        type: beanRequestMenuSemanal.type_request,
        headers: {
            //'Authorization': 'Bearer ' + Cookies.get("sisbu_token")
        },
        data: JSON.stringify(json),
        contentType: 'application/json; charset=utf-8',
        dataType: 'json'
    }).done(function (beanCrudResponse) {
        console.log(beanCrudResponse);
        $('#modalCargandoMenuSemanal').modal("hide");
        if (beanCrudResponse.messageServer !== undefined) {
            if (beanCrudResponse.messageServer.toLowerCase() === "ok") {
                showAlertTopEnd('success', 'Acción realizada exitosamente');
                $('#ventanaModalMenuSemanal').modal('hide');
            } else {
                showAlertTopEnd('warning', beanCrudResponse.messageServer);
            }
        }
        if (beanCrudResponse.beanPagination !== undefined) {
            beanPaginationMenuSemanal = beanCrudResponse.beanPagination;
            toListMenuSemanal(beanPaginationMenuSemanal);
        }
    }).fail(function (jqXHR, textStatus, errorThrown) {
        $('#modalCargandoMenuSemanal').modal("hide");
        showAlertErrorRequest();
       
    });
}

function toListMenuSemanal(beanPagination) {
    document.querySelector("#tbodyMenuSemanal").innerHTML = "";
    document.querySelector("#titleManagerMenuSemanal").innerHTML = "[ " + beanPagination.count_filter + " ] COMIDAS";
    if (beanPagination.count_filter > 0) {
        let row;
        beanPagination.list.forEach(comida => {
            row = "<tr ";
            row += "idcomida='" + comida.idcomida + "' ";
            row += ">";
            row += "<td class='align-middle'>" + tipoMenuSemanal(comida.tipo) + "</td>";
            row += "<td class='align-middle'>" + comida.descripcion + "</td>";
            row += "<td class='text-center align-middle'><button class='btn btn-secondary btn-xs editar-comida' data-toggle='tooltip' title='Editar'><i class='icon icon-undo icon-fw'></i></button></td>";
            row += "<td class='text-center align-middle'><button class='btn btn-secondary btn-xs eliminar-comida' data-toggle='tooltip' title='Eliminar'><i class='icon icon-trash icon-fw'></i></button></td>";
            row += "</tr>";
            document.querySelector("#tbodyMenuSemanal").innerHTML += row;
        });
        buildPagination(
                beanPagination.count_filter,
                parseInt(document.querySelector("#sizePageMenuSemanal").value),
                document.querySelector("#pageMenuSemanal"),
                $('#modalCargandoMenuSemanal'),
                $('#paginationMenuSemanal'));
        addEventsMenuSemanales();
        if (beanRequestMenuSemanal.operation === "paginate") {
            document.querySelector("#txtFilterMenuSemanal").focus();
        }
        $('[data-toggle="tooltip"]').tooltip();
    } else {
        destroyPagination($('#paginationMenuSemanal'));
        showAlertTopEnd('warning', 'No se encontraron resultados');
        document.querySelector("#txtFilterMenuSemanal").focus();
    }
}

function addEventsMenuSemanales() {
    document.querySelectorAll('.editar-comida').forEach(btn => {
        //AGREGANDO EVENTO CLICK
        btn.onclick = function () {
            comidaSelected = findByMenuSemanal(btn.parentElement.parentElement.getAttribute('idcomida'));
            if (comidaSelected != undefined) {
                beanRequestMenuSemanal.operation = "update";
                beanRequestMenuSemanal.type_request = "PUT";
                //SET VALUES MODAL
                console.log(comidaSelected.descripcion);
                document.querySelector("#txtDescripcionMenuSemanal").value= comidaSelected.descripcion;
                document.querySelector("#txtTipoMenuSemanal").options[comidaSelected.tipo].selected = 'selected';
                document.querySelector("#txtTituloModalMan").innerHTML = "EDITAR COMIDA";
                $('#ventanaModalMenuSemanal').modal("show");
                document.querySelector("#txtDecripcionMenuSemanal").focus();
            } else {
                showAlertTopEnd('warning', 'No se encontró el MenuSemanal para poder editar');
            }
        };
    });
 document.querySelectorAll('.eliminar-comida').forEach(btn => {
        //AGREGANDO EVENTO CLICK
        btn.onclick = function () {
          comidaSelected = findByMenuSemanal(btn.parentElement.parentElement.getAttribute('idcomida'));
          beanRequestMenuSemanal.operation = "delete";
           beanRequestMenuSemanal.type_request = "DELETE";
            processAjaxMenuSemanal();
        };
    });
}

function findByMenuSemanal(idcomida) {
    let comida_;
    beanPaginationMenuSemanal.list.forEach(comida => {
        if (idcomida == comida.idcomida) {
            comida_ = comida;
            return;
        }
    });
    return comida_;
}

function validateFormMenuSemanal() {
    if (document.querySelector("#txtDescripcionMenuSemanal").value == "") {
        showAlertTopEnd('warning', 'Por favor ingrese descripcion');
        document.querySelector("#txtDescripcionMenuSemanal").focus();
        return false;
    }else  if (document.querySelector("#txtTipoMenuSemanal").value == 0) {
        showAlertTopEnd('warning', 'Por favor ingrese tipo ');
        document.querySelector("#txtTipoMenuSemanal").focus();
        return false;
    }
    return true;
}

function tipoMenuSemanal(tipocomida){
    switch(tipocomida){
        case 1:
            return "SEGUNDO";
            break;
        case 2:
            return "BEBIDA";
            break;
        case 3:
            return "POSTRE";
            break;
        case 4:
            return "SOPA";
            break;
        default:
            return "NINGUNO";
            break;    
            
    }
}
