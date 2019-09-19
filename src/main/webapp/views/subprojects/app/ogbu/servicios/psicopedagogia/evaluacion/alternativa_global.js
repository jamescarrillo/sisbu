/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 * 
 Ctrl
 Alt
 Shift
 */
var list_alternativas_globales = [];
var alternativa_global;

class Alternativa {
    contructor() {
        this.idalternativa = 0;
        this.descripcion = "";
        this.valor = 0;
    }
}

document.addEventListener("DOMContentLoaded", function () {

    document.querySelector("#btnAgregarAlternativaGlobal").onclick = function () {
        document.querySelector("#txtDescripcionAlternativaGlobal").value = "";
        document.querySelector("#txtValorAlternativaGlobal").value = ""
        $('#ventanaModalAddAlternativaGlobal').modal('show');
        setTimeout(() => {
            document.querySelector("#txtDescripcionAlternativaGlobal").focus();
        }, 500);
    };

    shortcut.add("Ctrl+Shift+A", function () {
        document.querySelector("#btnAgregarAlternativaGlobal").dispatchEvent(new Event('click'));
    });

    document.querySelector("#txtDescripcionAlternativaGlobal").onkeypress = function (e) {
        if (e.keyCode == 13) {
            if (this.value != "") {
                document.querySelector("#txtValorAlternativaGlobal").focus();
            }
        }
    };

    document.querySelector("#txtValorAlternativaGlobal").onkeypress = function (e) {
        if (e.keyCode == 13) {
            if (this.value != "") {
                document.querySelector("#btnIngresarAlternativaGlobal").dispatchEvent(new Event('click'));
            }
        }
    };

    document.querySelector("#btnIngresarAlternativaGlobal").onclick = function () {
        if (document.querySelector("#txtDescripcionAlternativaGlobal").value == "") {
            showAlertTopEnd('warning', 'Por favor ingrese una descripción');
            return;
        }
        if (document.querySelector("#txtValorAlternativaGlobal").value == "") {
            showAlertTopEnd('warning', 'Por favor ingrese un valor numérico');
            return;
        }
        alternativa_global = new Alternativa();
        alternativa_global.descripcion = document.querySelector("#txtDescripcionAlternativaGlobal").value;
        alternativa_global.valor = document.querySelector("#txtValorAlternativaGlobal").value;
        addAlternativaGlobal(alternativa_global);
    };


});

function addAlternativaGlobal(alternativa) {
    let index_ = getIndexAlternativaGlobal(alternativa.descripcion);
    if (index_ == -1) {
        list_alternativas_globales.push(alternativa);
        toListAlternativasGlobales();
        $('#ventanaModalAddAlternativaGlobal').modal('hide');
    } else {
        showAlertTopEnd('warning', 'Ya existe una alternativa con la descripción ingresada');
    }
}

function getIndexAlternativaGlobal(descripcion) {
    let index_ = -1;
    list_alternativas_globales.forEach(function (alternativa, index) {
        if (alternativa.descripcion === descripcion) {
            index_ = index;
            return;
        }
    });
    return index_;
}

function toListAlternativasGlobales() {
    document.querySelector("#tbodyAlternativasGlobales").innerHTML = "";
    let row;
    list_alternativas_globales.forEach(alternativa => {
        row = "<tr descripcion='" + alternativa.descripcion + "'>";
        row += "<td class='align-middle'>" + alternativa.descripcion + "</td>";
        row += "<td class='text-center align-middle'>" + alternativa.valor + "</td>";
        row += "<td class='text-center align-middle'><button class='btn btn-outline-primary btn-xs btn-eliminar-alternativa-global' data-toggle='tooltip' title='Eliminar'><i class='icon icon-trash icon-fw'></i></button></td>";
        row += "</tr>";
        document.querySelector("#tbodyAlternativasGlobales").innerHTML += row;
    });
    $('[data-toggle="tooltip"]').tooltip();
    addEventsAlternativasGlobales();
}


function addEventsAlternativasGlobales() {
    document.querySelectorAll('.btn-eliminar-alternativa-global').forEach(btn => {
        btn.onclick = function () {
            let index_ = getIndexAlternativaGlobal(this.parentElement.parentElement.getAttribute('descripcion'));
            if (index_ != -1) {
                list_alternativas_globales.splice(index_, 1);
                toListAlternativasGlobales();
            } else {
                showAlertTopEnd('warning', 'No se encontró la alternativa para eliminar')
            }
        };
    });
}

function getStringAlternativasGlobales() {
    let s = "";
    list_alternativas_globales.forEach(function (alternativa, index) {
        if (index == list_alternativas_globales.length - 1) {
            s += alternativa.descripcion + ":" + alternativa.valor + "";
        } else {
            s += alternativa.descripcion + ":" + alternativa.valor + "::";
        }
    });
    return s;
}