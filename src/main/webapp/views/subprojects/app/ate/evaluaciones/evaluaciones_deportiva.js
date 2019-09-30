/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
var deporteSelected;
var aficionSelected;

document.addEventListener("DOMContentLoaded", function () {

    document.querySelector("#div-ed-option-deportes").onclick = function () {
        document.querySelector("#div-content-ev-deportes").style.display = "flex";
        document.querySelector("#div-content-ev-aficiones").style.display = "none";
        document.querySelector("#div-evaluacion-deportiva").style.display = "none";
        document.querySelector("#div-regresar-selected-option-ed").style.display = "flex";
        document.querySelector("#div-regresar-selected-evaluation-deporte").style.display = "none";
        document.querySelector("#div-imagen-general-ed").style.display = "none";
    };

    document.querySelector("#div-ed-option-aficiones").onclick = function () {
        document.querySelector("#div-content-ev-deportes").style.display = " none";
        document.querySelector("#div-content-ev-aficiones").style.display = "flex";
        document.querySelector("#div-evaluacion-deportiva").style.display = "none";
        document.querySelector("#div-regresar-selected-option-ed").style.display = "flex";
        document.querySelector("#div-regresar-selected-evaluation-deporte").style.display = "none";
        document.querySelector("#div-imagen-general-ed").style.display = "none";
    };

    document.querySelector("#btnRegresarSelectedOptionED").onclick = function () {
        document.querySelector("#div-content-ev-deportes").style.display = "none";
        document.querySelector("#div-content-ev-aficiones").style.display = "none";
        document.querySelector("#div-evaluacion-deportiva").style.display = "flex";
        document.querySelector("#div-regresar-selected-option-ed").style.display = "none";
        document.querySelector("#div-regresar-selected-evaluation-deporte").style.display = "block";
        document.querySelector("#div-imagen-general-ed").style.display = "flex";
    };



});
