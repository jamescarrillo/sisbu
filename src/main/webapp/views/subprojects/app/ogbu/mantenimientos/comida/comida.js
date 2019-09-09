var beanPaginationComida;
var comidaSelected;
var beanRequestComida = new BeanRequest();
document.addEventListener("DOMContentLoaded", function () {

    //INICIALIZANDO VARIABLES DE SOLICITUD
    beanRequestComida.entity_api = "api/comidas";
    beanRequestComida.operation = "paginate";
    beanRequestComida.type_request = "GET";

    $('#FrmComida').submit(function (event) {
        beanRequestComida.operation = "paginate";
        beanRequestComida.type_request = "GET";
        $('#modalCargandoComida').modal('show');
        event.preventDefault();
        event.stopPropagation();
    });

    $('#FrmComidaModal').submit(function (event) {
        if (validateFormComida()) {
            $('#modalCargandoComida').modal('show');
        }
        event.preventDefault();
        event.stopPropagation();
    });

    document.querySelector("#btnOpenNewComida").onclick = function () {
        //CONFIGURAMOS LA SOLICITUD
        beanRequestComida.operation = "add";
        beanRequestComida.type_request = "POST";
        //LIMPIAR LOS CAMPOS
        document.querySelector("#txtDescripcionComida").value = "";
         document.querySelector("#txtTipoComida").options[0].selected = 'selected';
        //SET TITLE MODAL
        document.querySelector("#txtTituloModalMan").innerHTML = "REGISTRAR COMIDA";
        //OPEN MODEL
        $('#ventanaModalComida').modal('show');
    };

    $("#modalCargandoComida").on('shown.bs.modal', function () {
        processAjaxComida();
    });

    $('#modalCargandoComida').modal('show');
    
    $("#sizePageComida").change(function() {
     $('#modalCargandoComida').modal('show');
    });
   
});

function processAjaxComida() {
    let parameters_pagination = "";
    let json = "";
    if (beanRequestComida.operation == "paginate") {
        parameters_pagination = "?tipo=" + document.querySelector("#txtFilterTipoComida").value;
        parameters_pagination += "&nombre=" + document.querySelector("#txtFilterComida").value.toUpperCase();
        parameters_pagination += "&page=" + document.querySelector("#pageComida").value;
        parameters_pagination += "&size=" + document.querySelector("#sizePageComida").value;
        
    } else {
      
        parameters_pagination = "";
        if(beanRequestComida.operation == "delete" ){
        parameters_pagination = "/"+comidaSelected.idcomida; 
        json={};
        }else{
         json = {
            "descripcion": document.querySelector("#txtDescripcionComida").value,
            "tipo": document.querySelector("#txtTipoComida").value
        };
        if (beanRequestComida.operation == "update" ) {
            json.idcomida = comidaSelected.idcomida;
        }   
        }
        
        
    }
    $.ajax({
        url: getHostAPI() + beanRequestComida.entity_api + "/" + beanRequestComida.operation + parameters_pagination,
        type: beanRequestComida.type_request,
        headers: {
            //'Authorization': 'Bearer ' + Cookies.get("sisbu_token")
        },
        data: JSON.stringify(json),
        contentType: 'application/json; charset=utf-8',
        dataType: 'json'
    }).done(function (beanCrudResponse) {
        console.log(beanCrudResponse);
        $('#modalCargandoComida').modal("hide");
        if (beanCrudResponse.messageServer !== undefined) {
            if (beanCrudResponse.messageServer.toLowerCase() == "ok") {
                showAlertTopEnd('success', 'Acción realizada exitosamente');
                $('#ventanaModalComida').modal('hide');
            } else {
                showAlertTopEnd('warning', beanCrudResponse.messageServer);
            }
        }
        if (beanCrudResponse.beanPagination !== undefined) {
            beanPaginationComida = beanCrudResponse.beanPagination;
            toListComida(beanPaginationComida);
        }
    }).fail(function (jqXHR, textStatus, errorThrown) {
        $('#modalCargandoComida').modal("hide");
        showAlertErrorRequest();
       
    });
}

function toListComida(beanPagination) {
    document.querySelector("#tbodyComida").innerHTML = "";
    document.querySelector("#titleManagerComida").innerHTML = "[ " + beanPagination.count_filter + " ] COMIDAS";
    if (beanPagination.count_filter > 0) {
        let row;
        beanPagination.list.forEach(comida => {
            row = "<tr ";
            row += "idcomida='" + comida.idcomida + "' ";
            row += ">";
            row += "<td class='align-middle'>" + tipoComida(comida.tipo) + "</td>";
            row += "<td class='align-middle'>" + comida.descripcion + "</td>";
            row += "<td class='text-center align-middle'><button class='btn btn-secondary btn-xs editar-comida' data-toggle='tooltip' title='Editar'><i class='icon icon-undo icon-fw'></i></button></td>";
            row += "<td class='text-center align-middle'><button class='btn btn-secondary btn-xs eliminar-comida' data-toggle='tooltip' title='Eliminar'><i class='icon icon-trash icon-fw'></i></button></td>";
            row += "</tr>";
            document.querySelector("#tbodyComida").innerHTML += row;
        });
        buildPagination(
                beanPagination.count_filter,
                parseInt(document.querySelector("#sizePageComida").value),
                document.querySelector("#pageComida"),
                $('#modalCargandoComida'),
                $('#paginationComida'));
        addEventsComidaes();
        if (beanRequestComida.operation == "paginate") {
            document.querySelector("#txtFilterComida").focus();
        }
        $('[data-toggle="tooltip"]').tooltip();
    } else {
        destroyPagination($('#paginationComida'));
        showAlertTopEnd('warning', 'No se encontraron resultados');
        document.querySelector("#txtFilterComida").focus();
    }
}

function addEventsComidaes() {
    document.querySelectorAll('.editar-comida').forEach(btn => {
        //AGREGANDO EVENTO CLICK
        btn.onclick = function () {
            console.log(btn.parentElement.parentElement.getAttribute('idcomida'));
            comidaSelected = findByComida(btn.parentElement.parentElement.getAttribute('idcomida'));
            if (comidaSelected != undefined) {
                beanRequestComida.operation = "update";
                beanRequestComida.type_request = "PUT";
                //SET VALUES MODAL
                console.log(comidaSelected.descripcion);
                document.querySelector("#txtDescripcionComida").value= comidaSelected.descripcion;
                document.querySelector("#txtTipoComida").options[comidaSelected.tipo].selected = 'selected';
                document.querySelector("#txtTituloModalMan").innerHTML = "EDITAR COMIDA";
                $('#ventanaModalComida').modal("show");
                document.querySelector("#txtDecripcionComida").focus();
            } else {
                showAlertTopEnd('warning', 'No se encontró el Comida para poder editar');
            }
        };
    });
 document.querySelectorAll('.eliminar-comida').forEach(btn => {
        //AGREGANDO EVENTO CLICK
        btn.onclick = function () {
          comidaSelected = findByComida(btn.parentElement.parentElement.getAttribute('idcomida'));
          beanRequestComida.operation = "delete";
           beanRequestComida.type_request = "DELETE";
            processAjaxComida();
        };
    });
}

function findByComida(idcomida) {
    let comida_;
    beanPaginationComida.list.forEach(comida => {
        if (idcomida == comida.idcomida) {
            comida_ = comida;
            return;
        }
    });
    return comida_;
}

function validateFormComida() {
    if (document.querySelector("#txtDescripcionComida").value == "") {
        showAlertTopEnd('warning', 'Por favor ingrese descripcion');
        document.querySelector("#txtDescripcionComida").focus();
        return false;
    }else  if (document.querySelector("#txtTipoComida").value == 0) {
        showAlertTopEnd('warning', 'Por favor ingrese tipo ');
        document.querySelector("#txtTipoComida").focus();
        return false;
    }
    return true;
}

function tipoComida(tipocomida){
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
