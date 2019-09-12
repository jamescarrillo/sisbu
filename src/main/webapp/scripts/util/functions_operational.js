
/*
 * PAGINATION
 */

function getDefaultOptionsPagination() {
    var defaultOpts = {
        totalPages: 10,
        visiblePages: 5,
        initiateStartPageClick: false,
        first: "<i class='icon icon-double-arrow-left icon-sisbu' aria-hidden='true'></i>",
        prev: "<i class='icon icon-chevrolet-left icon-sisbu' aria-hidden='true'></i>",
        next: "<i class='icon icon-chevrolet-right icon-sisbu' aria-hidden='true'></i>",
        last: "<i class='icon icon-double-arrow-right icon-sisbu' aria-hidden='true'></i>"
        
        /*
         * first: "<i class='fa fa-angle-double-left' aria-hidden='true'></i>",
        prev: "<i class='fa fa-angle-left' aria-hidden='true'></i>",
        next: "<i class='fa fa-angle-right' aria-hidden='true'></i>",
        last: "<i class='fa fa-angle-double-right' aria-hidden='true'></i>"
         */
    };
    // icon icon-company icon-fw
    return defaultOpts;
}

function getOptionsPagination(count_filter, sizePage, $pageInput, $modalLoanding) {
    var totalPages; // = (count_filter / $sizePage.val()) + 1;
    if (count_filter >= sizePage) {
        if (count_filter % sizePage == 0) {
            totalPages = count_filter / sizePage;
        } else {
            totalPages = (count_filter / sizePage) + 1;
        }
    } else {
        totalPages = 1;
    }
    var options =
            {
                startPage: parseInt($pageInput.value),
                totalPages: totalPages,
                visiblePages: 5,
                initiateStartPageClick: false,
                first: "<i class='icon icon-double-arrow-left icon-sisbu' aria-hidden='true'></i>",
                prev: "<i class='icon icon-chevrolet-left icon-sisbu' aria-hidden='true'></i>",
                next: "<i class='icon icon-chevrolet-right icon-sisbu' aria-hidden='true'></i>",
                last: "<i class='icon icon-double-arrow-right icon-sisbu' aria-hidden='true'></i>",
                onPageClick: function (evt, page) {
                    $pageInput.value = page;
                    $modalLoanding.modal("show");
                }
            };
    return options;
}

function buildPagination(
        count_filter,
        sizePage,
        $pageInput,
        $modalLoanding,
        $pagination) {
    let options = getOptionsPagination(count_filter, sizePage, $pageInput, $modalLoanding);
    destroyPagination($pagination);
    $pagination.twbsPagination($.extend({}, getDefaultOptionsPagination(), options));
}

function destroyPagination($pagination) {
    $pagination.twbsPagination('destroy');
}

/*
 * SELECT PAGINATION
 */
function addEventsSelectPaginar(_class) {
    document.querySelectorAll('.' + _class).forEach(select => {
        select.onchange = function () {
            console.log(this.value);
            $("#" + select.getAttribute('idbtnbuscar')).trigger('click');
            //document.querySelector("#" + select.getAttribute('idbtnbuscar')).dispatchEvent(new Event('click'));
        };
    });
}

function getFullNameShortUser(usuario) {
    let full_name = "";
    if (usuario.nombre != undefined && usuario.apellido_pat != undefined) {
        if (usuario.nombre.includes(' ')) {
            full_name += getStringCapitalize(usuario.nombre.split(" ")[0].toLowerCase());
        } else {
            full_name += getStringCapitalize(usuario.nombre.toLowerCase());
        }
        full_name += " " + getStringCapitalize(usuario.apellido_pat.toLowerCase());
    }
    if (full_name == "" || full_name == " ") {
        full_name = getStringCapitalize(usuario.alias);
    }
    return full_name;
}

function getStringCapitalize(s) {
    if (typeof s !== 'string')
        return ''
    return s.charAt(0).toUpperCase() + s.slice(1);
}