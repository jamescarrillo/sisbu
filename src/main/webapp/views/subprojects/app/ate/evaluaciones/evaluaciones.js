/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

var color = Chart.helpers.color;

var chartColors = chartColors = {
    red: '#f37070',
    pink: '#ff445d',
    orange: '#ff8f3a',
    yellow: '#ffde16',
    lightGreen: '#24cf91',
    green: '#4ecc48',
    blue: '#5797fc',
    skyBlue: '#33d4ff',
    gray: '#cfcfcf'
};



document.addEventListener("DOMContentLoaded", function () {

    // creating center text
    Chart.pluginService.register({
        beforeDraw: function (chart) {
            var width = chart.chart.width,
                    height = chart.chart.height,
                    ctx = chart.chart.ctx;

            var center_text = $(ctx.canvas).data('fill');
            if (center_text) {
                var $dtTheme = localStorage.getItem('dt-theme');
                ctx.restore();
                var fontSize = (height / 114).toFixed(2);
                ctx.font = 3 + "rem Source Sans Pro";
                ctx.textBaseline = "middle";

                /*if ($dtTheme == 'dark') {
                 ctx.fillStyle = "#fff";
                 }*/

                var textX = Math.round((width - ctx.measureText(center_text).width) / 2),
                        textY = height / 2;

                ctx.fillText(center_text, textX, textY);
                ctx.save();
            }
        }
    });

    document.querySelector("#lblNameUserIndex").innerHTML = getStringCapitalize(Cookies.getJSON('sisbu_user').usuario.split(" ")[0].toLowerCase());

    document.querySelector("#btnEmpezarEvaluaciones").onclick = function () {
        document.querySelector("#row-home-evaluaciones").style.display = "none";
        document.querySelector("#row-options-evaluaciones").style.display = "flex";
    };

    document.querySelector("#btnRegresarHome").onclick = function () {
        document.querySelector("#row-home-evaluaciones").style.display = "flex";
        document.querySelector("#row-options-evaluaciones").style.display = "none";
    };

    document.querySelectorAll(".option-evaluation").forEach(div => {
        div.onclick = function () {
            navigateOptionEvaluation(this.getAttribute('evaluation'));
        };
    });

    document.querySelectorAll(".btn-regresar-selected-evaluation").forEach(btn => {
        btn.onclick = function () {
            navigateOptionEvaluation('home');
        };
    });

});
function navigateOptionEvaluation(option) {
    switch (option) {
        case "home":
            document.querySelector("#row-options-evaluaciones").style.display = "flex";

            document.querySelector("#row-option-socioeconomica").style.display = "none";
            document.querySelector("#row-option-deportiva").style.display = "none";
            document.querySelector("#row-option-psicologica").style.display = "none";
            document.querySelector("#row-option-obstetricia").style.display = "none";
            break;
        case "deportiva":
            document.querySelector("#row-options-evaluaciones").style.display = "none";

            document.querySelector("#row-option-socioeconomica").style.display = "none";
            document.querySelector("#row-option-deportiva").style.display = "flex";
            document.querySelector("#row-option-psicologica").style.display = "none";
            document.querySelector("#row-option-obstetricia").style.display = "none";
            break;
        case "psicologica":
            document.querySelector("#row-options-evaluaciones").style.display = "none";

            document.querySelector("#row-option-socioeconomica").style.display = "none";
            document.querySelector("#row-option-deportiva").style.display = "none";
            document.querySelector("#row-option-psicologica").style.display = "flex";
            document.querySelector("#row-option-obstetricia").style.display = "none";
            break;
        case "obstetricia":
            document.querySelector("#row-options-evaluaciones").style.display = "none";

            document.querySelector("#row-option-socioeconomica").style.display = "none";
            document.querySelector("#row-option-deportiva").style.display = "none";
            document.querySelector("#row-option-psicologica").style.display = "none";
            document.querySelector("#row-option-obstetricia").style.display = "flex";
            break;
        default:
            //SOCIOECONOMICA
            document.querySelector("#row-options-evaluaciones").style.display = "none";

            document.querySelector("#row-option-socioeconomica").style.display = "flex";
            document.querySelector("#row-option-deportiva").style.display = "none";
            document.querySelector("#row-option-psicologica").style.display = "none";
            document.querySelector("#row-option-obstetricia").style.display = "none";

            $('#modalCargandoProcedimientoCicloSocie').modal('show');
            break;
    }
}