var beanPaginationNoticia;
var noticiaSelected;
var beanRequestNoticia = new BeanRequest();
document.addEventListener("DOMContentLoaded", function () {

    $("#modalCargandoNoticia").on('shown.bs.modal', function () {
        processAjaxNoticia();
    });

    $('#modalCargandoNoticia').modal('show');
    $("#sizePageNoticia").change(function () {
        $('#modalCargandoNoticia').modal('show');
    });

});

function processAjaxNoticia() {
    $.ajax({
        url: getHostAPI() + "api/noticias/paginate?fechai=&fechaf=&page=" +
            document.querySelector("#pageNoticia").value + "&size=" +
            document.querySelector("#sizePageNoticia").value,
        type: "GET",
        headers: {
            'Authorization': 'Bearer ' + Cookies.get("sisbu_token")
        },
        contentType: 'application/json; charset=utf-8',
        dataType: 'json'
    }).done(function (beanCrudResponse) {
        console.log(beanCrudResponse);
        $('#modalCargandoNoticia').modal("hide");
        if (beanCrudResponse.messageServer !== undefined) {
            if (beanCrudResponse.messageServer.toLowerCase() == "ok") {
                showAlertTopEnd('success', 'Acción realizada exitosamente');
            } else {
                showAlertTopEnd('warning', beanCrudResponse.messageServer);
            }
        }
        if (beanCrudResponse.beanPagination !== undefined) {
            beanPaginationNoticia = beanCrudResponse.beanPagination;
            toListNoticia(beanPaginationNoticia);
        }
    }).fail(function (jqXHR, textStatus, errorThrown) {
        $('#modalCargandoNoticia').modal("hide");
        showAlertErrorRequest();

    });
}

function toListNoticia(beanPagination) {
    document.querySelector("#tbodyNoticia").innerHTML = "";
    if (beanPagination.count_filter > 0) {
        let row;

        beanPagination.list.forEach(noticia => {
            row = `   <div class="col-xl-4 col-sm-6 mb-3">
                             <div class="card dt-social-card border border-w-2 border-light-teal h-100 m-0">
                                <div class="card-body" style="max-height:260px;">
                                <h3 class="card-title text-center">${noticia.titulo}</h3>
                                ${noticia.descripcion}
                                </div>   
                               
                                <a class="card-link w-100 p-4 pr-10 pl-10 bg-white"  style="z-index: 2;" href="javascript:void(0)">
                                ... Check Detalle <i class="icon icon-double-arrow-right"></i>
                                    </a>   
                                <div class="card-footer bg-light" style="z-index: 2;">
                                    <span class="d-inline-block text-truncate mr-3">${noticia.fuente}</span>
                                    <span class="d-inline-block float-right"><i class="icon icon-calendar icon-fw"></i> ${ noticia.fecha_publicacion}</span>
                                </div>
                            </div>
                        </div>
            `;

            document.querySelector("#tbodyNoticia").innerHTML += row;
        });
        buildPagination(
            beanPagination.count_filter,
            parseInt(document.querySelector("#sizePageNoticia").value),
            document.querySelector("#pageNoticia"),
            $('#modalCargandoNoticia'),
            $('#paginationNoticia'));
    } else {
        destroyPagination($('#paginationNoticia'));
        showAlertTopEnd('warning', 'No se encontraron resultados');
    }
}







