var beanPaginationComida;
var comidaSelected;
var beanRequestComida = new BeanRequest();
document.addEventListener("DOMContentLoaded", function () {

    //INICIALIZANDO VARIABLES DE SOLICITUD
    beanRequestComida.entity_api = "api/comidas";
    beanRequestComida.operation = "paginate";
    beanRequestComida.type_request = "GET";

    document.querySelector("#btnOpenNewComida").onclick = function () {
        //CONFIGURAMOS LA SOLICITUD
        beanRequestComida.operation = "add";
        beanRequestComida.type_request = "POST";
        //SET TITLE MODAL
        //document.querySelector("#txtTituloModalMan").innerHTML = "REGISTRAR COMIDA";
        //OPEN MODEL
        document.querySelector("#ListaOpenComida").style.display = "none";
        document.querySelector("#FormularioOpenComida").innerHTML = viewFormulario();
        document.querySelector("#txtTituloModalMan").innerHTML = "AGREGAR COMIDA";
        //LIMPIAR LOS CAMPOS
        document.querySelector("#txtDescripcionComida").value = "";
        document.querySelector("#txtTipoComida").value = "-1";
        addViewFormulario();
    };

    $("#modalCargandoComida").on('shown.bs.modal', function () {
        processAjaxComida();
    });
    $('#FrmComida').submit(function (event) {
        beanRequestComida.operation = "paginate";
        beanRequestComida.type_request = "GET";
        $('#modalCargandoComida').modal('show');
        event.preventDefault();
        event.stopPropagation();
    });
    $('#modalCargandoComida').modal('show');

    $("#sizePageComida").change(function () {
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
        if (beanRequestComida.operation == "delete") {
            parameters_pagination = "/" + comidaSelected.idcomida;
        } else {
            json = {
                "descripcion": document.querySelector("#txtDescripcionComida").value,
                "tipo": document.querySelector("#txtTipoComida").value
            };
            if (beanRequestComida.operation == "update") {
                json.idcomida = comidaSelected.idcomida;
            }
        }


    }
    $.ajax({
        url: getHostAPI() + beanRequestComida.entity_api + "/" + beanRequestComida.operation + parameters_pagination,
        type: beanRequestComida.type_request,
        headers: {
            'Authorization': 'Bearer ' + Cookies.get("sisbu_token")
        },
        data: JSON.stringify(json),
        contentType: 'application/json; charset=utf-8',
        dataType: 'json'
    }).done(function (beanCrudResponse) {
        $('#modalCargandoComida').modal("hide");
        if (beanRequestComida.operation == "add") {
            //LIMPIAR LOS CAMPOS
            document.querySelector("#txtDescripcionComida").value = "";
            document.querySelector("#txtTipoComida").value = "-1";
        }
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
        row =
            `
               <div class="dt-widget__item border-success bg-primary text-white mb-0 pb-2 pl-5">
                     <!-- Widget Info -->
                    <div class="dt-widget__info text-truncate " >
                        <p class="mb-0 text-truncate ">
                           TIPO
                        </p>
                    </div>
                    <!-- /widget info -->
                     <!-- Widget Info -->
                    <div class="dt-widget__info text-truncate " >
                        <p class="mb-0 text-truncate ">
                           DESCRIPCIÓN
                        </p>
                    </div>
                    <!-- /widget info -->
                </div>
            `;
        document.querySelector("#tbodyComida").innerHTML += row;
        beanPagination.list.forEach(comida => {
            row =
                `
                 <div class="dt-widget__item border-success  pl-5">
                    
                    <!-- Widget Info -->
                    <div class="dt-widget__info text-truncate " >
                        <p class="mb-0 text-truncate ">
                           ${tipoComida(comida.tipo)} 
                        </p>
                       
                    </div>
                    <!-- /widget info -->
                    <!-- Widget Info -->
                    <div class="dt-widget__info text-truncate " >
                        <p class="mb-0 text-truncate ">
                           ${comida.descripcion}
                        </p>
                    </div>
                    <!-- /widget info -->
                    <!-- Widget Extra -->
                    <div class="dt-widget__extra text-right">
                      
                        <!-- Hide Content -->
                        <div class="hide-content pr-2"">
                            <!-- Action Button Group -->
                            <div class="action-btn-group">
                                <button class="btn btn-default text-primary dt-fab-btn editar-comida" idcomida='${comida.idcomida}' title="Editar" data-toggle="tooltip">
                                    <i class="icon icon-editors"></i>
                                </button>
                                <button class="btn btn-default text-danger dt-fab-btn eliminar-comida" idcomida='${comida.idcomida}' title="Eliminar" data-toggle="tooltip">
                                    <i class="icon icon-trash-filled"></i>
                                </button>
                              
                            </div>
                            <!-- /action button group -->
                        </div>
                        <!-- /hide content -->
                    </div>
                    <!-- /widget extra -->
                </div>
            `;
            document.querySelector("#tbodyComida").innerHTML += row;
            $('[data-toggle="tooltip"]').tooltip();
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
            comidaSelected = findByComida(btn.getAttribute('idcomida'));
            if (comidaSelected != undefined) {
                beanRequestComida.operation = "update";
                beanRequestComida.type_request = "PUT";
                document.querySelector("#ListaOpenComida").style.display = "none";
                document.querySelector("#FormularioOpenComida").innerHTML = viewFormulario();
                addViewFormulario();
                //SET VALUES MODAL
                console.log(comidaSelected.descripcion);
                document.querySelector("#txtDescripcionComida").value = comidaSelected.descripcion;
                document.querySelector("#txtTipoComida").value = comidaSelected.tipo;
                document.querySelector("#txtTituloModalMan").innerHTML = "EDITAR COMIDA";
            } else {
                showAlertTopEnd('warning', 'No se encontró el Comida para poder editar');
            }
        };
    });
    document.querySelectorAll('.eliminar-comida').forEach(btn => {
        //AGREGANDO EVENTO CLICK
        btn.onclick = function () {
            comidaSelected = findByComida(btn.getAttribute('idcomida'));
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
    } else if (document.querySelector("#txtTipoComida").value == "-1") {
        showAlertTopEnd('warning', 'Por favor ingrese tipo ');
        document.querySelector("#txtTipoComida").focus();
        return false;
    }
    return true;
}

function tipoComida(tipocomida) {
    switch (tipocomida) {
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

function viewFormulario() {
    return `
          
                 <h4 class="card-header m-1 text-center text-primary" id="txtTituloModalMan"></h4>
            
       
                <div class="card-body p-4">
                    <form id="FrmComidaModal">
                   <div class="row" >
                    <div class="col-12">
                        <div class="form-group">
                            <label for="txtDescripcionComida">DESCRIPCION</label>
                            <input class="form-control form-control-sm" id="txtDescripcionComida" type="text" placeholder="DESCRIPCION">
                        </div>
                    </div>
                    <div class="col-12">
                        <div class="form-group">
                            <label for="txtTipoComida">TIPO</label>
                            <select class="form-control form-control-sm" id="txtTipoComida">
                                <option value="-1">seleccione...</option>
                                <option value="1">SEGUNDO</option>
                                <option value="2">BEBIDA</option>
                                <option value="3">POSTRE</option>
                                <option value="4">SOPA</option>
                            </select>
                        </div>
                    </div>
                    <div class="form-group col-12 text-center">
                        <button type="submit" id="btnGuardar" class="btn btn-primary btn-sm"> GUARDAR</button>
                        <button type="button" class="btn btn-outline-primary btn-sm" id="btnRegresarComida"><i class="icon icon-reply"></i> REGRESAR</button>
                    </div></div>
                 </form>
                
            </div>
            `;
}

function addViewFormulario() {


    $('#FrmComidaModal').submit(function (event) {
        if (validateFormComida()) {
            $('#modalCargandoComida').modal('show');
        }
        event.preventDefault();
        event.stopPropagation();
    });
    document.querySelector("#btnRegresarComida").onclick = function () {
        document.querySelector("#FormularioOpenComida").innerHTML = "";
        document.querySelector("#ListaOpenComida").style.display = "block";
        beanRequestComida.operation = "paginate";
        beanRequestComida.type_request = "GET";
        $('#modalCargandoComida').modal('show');


    };
}
