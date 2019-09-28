var beanPaginationMenuSemanal;
var menusemanalSelected;
var beanRequestMenuSemanal = new BeanRequest();
document.addEventListener("DOMContentLoaded", function () {

    //INICIALIZANDO VARIABLES DE SOLICITUD
    beanRequestMenuSemanal.entity_api = "api/menusemanal";
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
        document.querySelector("#txtFechaInicialMenuSemanal").value = "";
        document.querySelector("#txtFechaFinalMenuSemanal").value = "";
        document.querySelector("#txtObservacionMenuSemanal").value = "";
        
        //SET TITLE MODAL
        document.querySelector("#txtTituloModalMan").innerHTML = "REGISTRAR MENU SEMANAL";
        //OPEN MODEL
        $('#ventanaModalMenuSemanal').modal('show');
    };

    $("#modalCargandoMenuSemanal").on('shown.bs.modal', function () {
        processAjaxMenuSemanal();
    });

    $('#modalCargandoMenuSemanal').modal('show');
     $("#sizePageMenuSemanal").change(function() {
     $('#modalCargandoMenuSemanal').modal('show');
    });

});

function processAjaxMenuSemanal() {
    let parameters_pagination = "";
    let json = "";
    if (beanRequestMenuSemanal.operation === "paginate") {
        parameters_pagination = "?fechai=" + document.querySelector("#txtFilterFechaInicial").value.toUpperCase();
        parameters_pagination += "&fechaf=" + document.querySelector("#txtFilterFechaFinal").value.toUpperCase();
        parameters_pagination += "&page=" + document.querySelector("#pageMenuSemanal").value;
        parameters_pagination += "&size=" + document.querySelector("#sizePageMenuSemanal").value;
       
    } else {
        parameters_pagination = "";
        if(beanRequestMenuSemanal.operation === "delete" ){
        parameters_pagination = "/"+menusemanalSelected.idmenusemanal; 
        json={};
        }else{
         json = {
             "fechai": dmy(document.querySelector("#txtFechaInicialMenuSemanal").value),
            "fechaf": dmy(document.querySelector("#txtFechaFinalMenuSemanal").value),
            "observacion": document.querySelector("#txtObservacionMenuSemanal").value
        };
        if (beanRequestMenuSemanal.operation === "update" ) {
            json.idmenusemanal = menusemanalSelected.idmenusemanal;
        }   
        }
        console.log(json);
        
    }
    $.ajax({
        url: getHostAPI() + beanRequestMenuSemanal.entity_api + "/" + beanRequestMenuSemanal.operation + parameters_pagination,
        type: beanRequestMenuSemanal.type_request,
        headers: {
            'Authorization': 'Bearer ' + Cookies.get("sisbu_token")
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
    document.querySelector("#titleManagerMenuSemanal").innerHTML = "[ " + beanPagination.count_filter + " ] MENU SEMANAL";
    if (beanPagination.count_filter > 0) {
        let row;
        beanPagination.list.forEach(menusemanal => {
            row = "<tr ";
            row += "idmenusemanal='" + menusemanal.idmenu_semanal + "' ";
            row += ">";
            row += "<td class='align-middle'>" + menusemanal.fechai + "</td>";
            row += "<td class='align-middle'>" + menusemanal.fechaf + "</td>";
            row += "<td class='align-middle'>" + menusemanal.observacion + "</td>";
            row += "<td class='text-center align-middle'><button class='btn btn-secondary btn-xs editar-menusemanal' data-toggle='tooltip' title='Editar'><i class='icon icon-undo icon-fw'></i></button></td>";
            row += "<td class='text-center align-middle'><button class='btn btn-secondary btn-xs eliminar-menusemanal' data-toggle='tooltip' title='Eliminar'><i class='icon icon-trash icon-fw'></i></button></td>";
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
            document.querySelector("#txtFilterFechaInicial").focus();
        }
        $('[data-toggle="tooltip"]').tooltip();
    } else {
        destroyPagination($('#paginationMenuSemanal'));
        showAlertTopEnd('warning', 'No se encontraron resultados');
        document.querySelector("#txtFilterFechaInicial").focus();
    }
}

function addEventsMenuSemanales() {
    document.querySelectorAll('.editar-menusemanal').forEach(btn => {
        //AGREGANDO EVENTO CLICK
        btn.onclick = function () {
            menusemanalSelected = findByMenuSemanal(btn.parentElement.parentElement.getAttribute('idmenusemanal'));
            if (menusemanalSelected != undefined) {
                beanRequestMenuSemanal.operation = "update";
                beanRequestMenuSemanal.type_request = "PUT";
                //SET VALUES MODAL
               document.querySelector("#txtDescripcionMenuSemanal").value= menusemanalSelected.descripcion;
                document.querySelector("#txtTipoMenuSemanal").options[menusemanalSelected.tipo].selected = 'selected';
                document.querySelector("#txtTituloModalMan").innerHTML = "EDITAR COMIDA";
                $('#ventanaModalMenuSemanal').modal("show");
                document.querySelector("#txtDecripcionMenuSemanal").focus();
            } else {
                showAlertTopEnd('warning', 'No se encontró el MenuSemanal para poder editar');
            }
        };
    });
    document.querySelectorAll('.eliminar-menusemanal').forEach(btn => {
        //AGREGANDO EVENTO CLICK
        btn.onclick = function () {
          menusemanalSelected = findByMenuSemanal(btn.parentElement.parentElement.getAttribute('idmenusemanal'));
          beanRequestMenuSemanal.operation = "delete";
           beanRequestMenuSemanal.type_request = "DELETE";
            processAjaxMenuSemanal();
        };
    });
}

function findByMenuSemanal(idmenusemanal) {
    let menusemanal_;
    beanPaginationMenuSemanal.list.forEach(menusemanal => {
        if (idmenusemanal == menusemanal.idmenusemanal) {
            menusemanal_ = menusemanal;
            return;
        }
    });
    return menusemanal_;
}

function validateFormMenuSemanal() {
    if (document.querySelector("#txtFechaInicialMenuSemanal").value == "") {
        showAlertTopEnd('warning', 'Por favor ingrese fecha inical');
        document.querySelector("#txtFechaInicialMenuSemanal").focus();
        return false;
    }else  if (document.querySelector("#txtFechaFinalMenuSemanal").value == "") {
        showAlertTopEnd('warning', 'Por favor ingrese fecha final');
        document.querySelector("#txtFechaFinalMenuSemanal").focus();
        return false;
    }else  if (document.querySelector("#txtObservacionMenuSemanal").value == "") {
        showAlertTopEnd('warning', 'Por favor ingrese observacion');
        document.querySelector("#txtObservacionMenuSemanal").focus();
        return false;
    }
    return true;
}

function dmy(mydate){
    return mydate.split("-")[2]+"/"+mydate.split("-")[1]+"/"+mydate.split("-")[0]
}