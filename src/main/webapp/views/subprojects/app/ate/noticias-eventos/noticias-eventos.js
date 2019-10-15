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
        let contador=0,color;
        beanPagination.list.forEach(noticia => {
            contador++;
            if(contador%2){
                 color="bg-gradient-blue--after"; 
            }else if(contador%3){
                 color="bg-gradient-purple--after"; 
            }

            row = '<div class="col-xl-4 col-sm-6">';
            row += '<div class="dt-card dt-card__full-height  bg-overlay overlay-opacity-0_8 '+color+' text-white">';
            row += ' <div class="bg-overlay__inner">';
            row += '<div class="dt-card__header mb-2">';
            row += '<div class="dt-card__heading">';
            row += '<h3 class="dt-card__title text-white">' + noticia.fuente + '</h3></div>';
            row += '<div class="dt-card__tools">';
            row += '<span class="dt-card__more font-weight-500">' + noticia.fecha_publicacion + '</span></div></div>';
            row += '<div class="dt-card__body p-3">';
            row += '<div class="media mb-5">';
            row += '<div class="media-body ">';
            row += '<div class="d-block display-5 font-weight-600 mb-1">' + noticia.titulo + '</div>';
            row += '</div></div>';
            row += ' <p class="card-text">' + noticia.descripcion + '</p>';
            row += '</div></div>';
            row += '</div></div>';
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







