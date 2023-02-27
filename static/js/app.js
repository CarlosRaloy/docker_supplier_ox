$(document).click(function (event) {
    if (((event.target.id).search("pdf_")) != (-1)) {
        id_g = (event.target.id).split("_");
        id = id_g[(id_g.length) - 1];
        abrir_archivo($('#pdf_'+id).attr('tp'), $('#pdf_'+id).attr('file'));
    }
    if (((event.target.id).search("xml_")) != (-1)) {
        id_g = (event.target.id).split("_");
        id = id_g[(id_g.length) - 1];
        abrir_archivo($('#xml_'+id).attr('tp'), $('#xml_'+id).attr('file'));
    }
    if (((event.target.id).search("poa_")) != (-1)) {
        id_g = (event.target.id).split("_");
        id = id_g[(id_g.length) - 1];
        abrir_archivo($('#poa_'+id).attr('tp'), $('#poa_'+id).attr('file'));
    }
    if (((event.target.id).search("ara_")) != (-1)) {
        id_g = (event.target.id).split("_");
        id = id_g[(id_g.length) - 1];
        abrir_archivo($('#ara_'+id).attr('tp'), $('#ara_'+id).attr('file'));
    }
    if (((event.target.id).search("leermsj_")) != (-1)) {
        id_g = (event.target.id).split("_");
        id = id_g[(id_g.length) - 1];
        muestra_mensaje(id);
    }
    if (((event.target.id).search("proveedornombre_")) != (-1)) {
        id_g = (event.target.id).split("_");
        id = id_g[(id_g.length) - 1];
        copiar_portapapeles(document.getElementById('proveedornombre_'+id).innerHTML);
    }

    if (((event.target.id).search("proveedorusuario_")) != (-1)) {
        id_g = (event.target.id).split("_");
        id = id_g[(id_g.length) - 1];
        copiar_portapapeles(document.getElementById('proveedorusuario_'+id).innerHTML);
    }
    if (((event.target.id).search("proveedorcontrasena_")) != (-1)) {
        id_g = (event.target.id).split("_");
        id = id_g[(id_g.length) - 1];
        copiar_portapapeles(document.getElementById('proveedorcontrasena_'+id).innerHTML);
    }
    if (((event.target.id).search("proveedorrfc_")) != (-1)) {
        id_g = (event.target.id).split("_");
        id = id_g[(id_g.length) - 1];
        copiar_portapapeles(document.getElementById('proveedorrfc_'+id).innerHTML);
    }
    if (((event.target.id).search("folio_")) != (-1)) {
        id_g = (event.target.id).split("_");
        id = id_g[(id_g.length) - 1];
        copiar_portapapeles(document.getElementById('folio_'+id).innerHTML);
    }
    if (((event.target.id).search("serie_")) != (-1)) {
        id_g = (event.target.id).split("_");
        id = id_g[(id_g.length) - 1];
        copiar_portapapeles(document.getElementById('serie_'+id).innerHTML);
    }
    if (((event.target.id).search("cestado_")) != (-1)) {
        id_g = (event.target.id).split("_");
        id = id_g[(id_g.length) - 1];
        copiar_portapapeles(document.getElementById('cestado_'+id).innerHTML);
    }
    if (((event.target.id).search("correo_actual")) != (-1)) {
        copiar_portapapeles(document.getElementById('correo_actual').value);
    }
    if (((event.target.id).search("perfilusuario")) != (-1)) {
        copiar_portapapeles(document.getElementById('perfilusuario').value);
    }
});

function copiar_portapapeles(elemento) {
      var aux = document.createElement("input");
      aux.setAttribute("value", elemento);
      document.body.appendChild(aux);
      aux.select();
      document.execCommand("copy");
      document.body.removeChild(aux);
      toastr.options = {
          "closeButton": true,
          "debug": false,
          "newestOnTop": false,
          "progressBar": true,
          "positionClass": "toast-top-right",
          "preventDuplicates": false,
          "onclick": null,
          "showDuration": "300",
          "hideDuration": "1000",
          "timeOut": "2000",
          "extendedTimeOut": "1000",
          "showEasing": "swing",
          "hideEasing": "linear",
          "showMethod": "fadeIn",
          "hideMethod": "fadeOut"
      }
      toastr.success(elemento, "Campo copiado");
}

$('body').tooltip({selector: '[data-toggle="tooltip"]'});
$(".custom-file-input").on("change", function() {
  var fileName = $(this).val().split("\\").pop();
  $(this).siblings(".custom-file-label").addClass("selected").html(fileName);
});


function mensaje_correo(){
    $('#mtitulo').empty().html('Mensaje');
    $('#mcuerpo').empty().append(`<p class="text-muted">Favor de actualizar su <strong>correo electrónico</strong> para que reciba su número de orden de pago y <strong>pueda subir sus complementos de pago.</strong></p>`);
    $('#mpie').empty().append(`<a href="/user/profile" class="btn btn-primary">Actualizar</a>`);
    $('#dialogo').modal({backdrop: 'static', keyboard: false})
}