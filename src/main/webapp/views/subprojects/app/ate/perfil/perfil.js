/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

var mostrar_pass = false;

document.addEventListener("DOMContentLoaded", function () {
    document.querySelector('#fileImageFotoUser').value = null;

    $('#idusuario').val(r_user.idusuario);

    addEventsBtnsSelectedImages('btn-selected-image', $('#idusuario'));

    var fileExtensions = ['jpeg', 'jpg', 'png', 'gif', 'bmp'];

    addEventsChangeInputsImagesGeneric('input-image', 'btn-upload', 'btn-delete-image', fileExtensions, '/workspace/_assets_redpos/images/users/1.jpg');

    addEventsUploadFilesGeneric('btn-upload', 'usuarios/upload-foto-user', $('#idusuario'));

    addEventsRemoveFileGeneric('btn-delete-image', 'usuarios/delete-foto-user', $('#idusuario'), '/workspace/_assets_redpos/images/users/1.jpg', '1.png');

    document.querySelector('#btnMostrarPass').onclick = function () {
        if (mostrar_pass) {
            mostrar_pass = false;
            removeClass(document.querySelector('#icono_mostrar_pass'), "fas fa-eye");
            addClass(document.querySelector('#icono_mostrar_pass'), "fas fa-eye-slash");
            document.querySelector('#txtPassPerfil').setAttribute('type', 'password');
        } else {
            mostrar_pass = true;
            removeClass(document.querySelector('#icono_mostrar_pass'), "fas fa-eye-slash");
            addClass(document.querySelector('#icono_mostrar_pass'), "fas fa-eye");
            document.querySelector('#txtPassPerfil').setAttribute('type', 'text');
        }
    }

});











function addEventsBtnsSelectedImages(_class, $idbackend) {
    $('.' + _class).click(function () {
        if (parseInt($idbackend.val()) > 0) {
            $('#' + $(this).attr('idinput')).trigger('click');
        } else {
            viewAlertTop('warning', 'Por favor registre primero para poder subir archivo de Imagen');
        }
    });
}

function addEventsChangeInputsImagesGeneric(_class, _classbtn_upload, _classbtn_remove, fileExtensions, src_default) {
    $("." + _class).on('change', function () {
        readImageSelectedGeneric(this, $(this).attr('idvisor'), _classbtn_upload, _classbtn_remove, fileExtensions, src_default);
    });
}
;


function readImageSelectedGeneric(input, idvisor, _classbtn_upload, _classbtn_remove,
        fileExtensions, src_default = "/webapp/workspace/_assets_redpos/images/logos-redpos/icono-azul.png") {
    if (input.files && input.files[0]) {
        //VALIDAMOS SI ES EL FORMATO CORRECTO
        if (validateFile(input, fileExtensions)) {
            var btnUploads_remove = document.getElementsByClassName(_classbtn_upload);
            for (let i = 0; i < btnUploads_remove.length; i++) {
                if ($(btnUploads_remove[i]).attr("input") == $(input).attr('id')) {
                    $(btnUploads_remove[i]).removeAttr("disabled");
                }
            }
            var reader = new FileReader();
            reader.onload = function (e) {
                $('#' + idvisor).attr('src', e.target.result);
            };
            reader.readAsDataURL(input.files[0]);
            //ACTIVAMOS EL REMOVE DE LA IMAGEN SELECCIONADA
            btnUploads_remove = document.getElementsByClassName(_classbtn_remove);
            for (let i = 0; i < btnUploads_remove.length; i++) {
                if ($(btnUploads_remove[i]).attr("input") == $(input).attr('id')) {
                    $(btnUploads_remove[i]).removeAttr("disabled");
                }
            }
        } else {
            viewAlertTop('warning', 'El archivo no tiene la extensión adecuada');
        }
    } else {
        $('#' + idvisor).attr('src', src_default);
        $(input).val(null);
        var btnUploads = document.getElementsByClassName(_classbtn_upload);
        for (let i = 0; i < btnUploads.length; i++) {
            if ($(btnUploads[i]).attr("input") == $(input).attr('id')) {
                $(btnUploads[i]).attr("disabled", "disabled");
            }
        }
}
}
