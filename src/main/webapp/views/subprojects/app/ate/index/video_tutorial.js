var beanPaginationVideoTutorial;
var videoTutorialSelected;
var beanRequestVideoTutorial = new BeanRequest();

class VideoTutorial {
    constructor() {
        this.idvideoTutorial = 0;
    }
}

document.addEventListener("DOMContentLoaded", function () {

    //INICIALIZANDO VARIABLES DE SOLICITUD
    beanRequestVideoTutorial.entity_api = "api/video/tutorial";
    beanRequestVideoTutorial.operation = "paginate";
    beanRequestVideoTutorial.type_request = "GET";
    
    processAjaxVideoTutorial();

});

function processAjaxVideoTutorial() {
    let parameters_pagination = "";
    let url_request = getHostAPI() + beanRequestVideoTutorial.entity_api + "/" + beanRequestVideoTutorial.operation;
    switch (beanRequestVideoTutorial.operation) {
        default:
            //parameters_pagination += "?filter=" + document.querySelector("#txtFilterVideoTutorial").value.toUpperCase();
            parameters_pagination += "?filter=";
            parameters_pagination += "&page=1";
            parameters_pagination += "&size=10";
            url_request += parameters_pagination;
            break;
    }
    $.ajax({
        url: url_request,
        type: beanRequestVideoTutorial.type_request,
        headers: {
            'Authorization': 'Bearer ' + Cookies.get("sisbu_token")
        },
        //data: JSON.stringify(json),
        contentType: 'application/json; charset=utf-8',
        dataType: 'json'
    }).done(function (beanCrudResponse) {
        if (beanCrudResponse.beanPagination !== undefined) {
            beanPaginationVideoTutorial = beanCrudResponse.beanPagination;
            toListVideoTutorial(beanPaginationVideoTutorial);
        }
    }).fail(function (jqXHR, textStatus, errorThrown) {
        $('#modalCargandoVideoTutorial').modal("hide");
        showAlertTopEnd('warning', 'Error interno al cargar los videos tutoriales');
        //showAlertErrorRequest();
    });
}

function toListVideoTutorial(beanPagination) {
    document.querySelector("#row-videos-tutoriales").innerHTML = "";
    if (beanPagination.count_filter > 0) {
        let card;
        beanPagination.list.forEach(videoTutorial => {
            card =
                    `
            <div class="col-md-6 dt-masonry__item">
                <div class="card">
                    <div class="card-body">
                        <h2 class="card-title">${videoTutorial.titulo}</h2>
                        <h4 class="card-subtitle">${videoTutorial.descripcion}</h4>
                        <div class="embed-responsive embed-responsive-16by9">
                            <iframe class="embed-responsive-item" src="${videoTutorial.link}" allowfullscreen></iframe>
                        </div>
                    </div>
                </div>
            </div>
            `;
            document.querySelector("#row-videos-tutoriales").innerHTML += card;
        });
        //$('[data-toggle="tooltip"]').tooltip();
    }
}
