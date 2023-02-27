$(document).click(function (event) {

     if (((event.target.id).search("editar_")) != (-1)) {
         id_g = (event.target.id).split("_");
         id = id_g[(id_g.length) - 1];
         indirecto = ($('#indirecto_'+id).hasClass('fa-check-square') == true)? 'checked': '';
         transportista = ($('#transportista_'+id).hasClass('fa-check-square') == true)? 'checked': '';
         proveedor = $('#editar_'+id).data('proveedor')
         $('#mtitulo').empty().html('Actualización de Proveedor');
         $('#mcuerpo').empty().append(`
            <form autocomplete="off">
                 <div class="row">
                    <div class="col-md-12 mb-3">
                        <label>Nombre</label>
                        <textarea class="form-control" id="nombre_proveedor" maxlength="200">${$('#proveedornombre_'+id).text()}</textarea>
                    </div>
                    <div class="col-md-12 mb-3">
                       <div class="row">
                            <div class="col-md-6 mb-3">
                                <label>Usuario</label>
                                <input type="text" class="form-control" value="${$('#proveedorusuario_'+id).text()}" disabled>
                            </div>
                            <div class="col-md-6 mb-3">
                                <label>Contraseña</label>
                                <input type="text" class="form-control" value="${$('#proveedorcontrasena_'+id).text()}" id="contrasena_proveedor" maxlength="15">
                            </div>
                       </div>
                    </div>
                    <div class="col-md-12 mb-3">
                        <div class="row">
                            <div class="col-md-6 mb-3">
                                <label>RFC</label>
                                <input type="text" class="form-control" value="${$('#proveedorrfc_'+id).text()}" id="rfc_proveedor" maxlength="15">
                            </div>
                            <div class="col-md-6 mb-3">
                                <div class="row">
                                    <div class="col-md-6 mb-3">
                                        <label for="indirecto_proveedor" class="form-check-label">Indirectos</label>
                                        <div class="form-check form-check-inline">
                                            <input class="form-check-input" type="checkbox" id="indirecto_proveedor" ${indirecto}>
                                        </div>
                                    </div>
                                    <div class="col-md-6 mb-3">
                                        <label for="transportista_proveedor" class="form-check-label">Transportista</label>    
                                        <div class="form-check form-check-inline">
                                            <input class="form-check-input" type="checkbox" id="transportista_proveedor" ${transportista}>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </form>`);
         $('#mpie').empty().append(`<button type="button" class="btn btn-danger" data-dismiss="modal">Cancelar</button><button type="button" class="btn btn-primary" onclick="editar_proveedor(${id}, ${proveedor});">Actualizar</button>`);
         $('#dialogo').modal({backdrop: 'static', keyboard: false})
     }
    if (((event.target.id).search("mensaje_")) != (-1)) {
        id_g = (event.target.id).split("_");
        id = id_g[(id_g.length) - 1];
        proveedor = $('select[name="f_proveedores"] option:selected').text();
        $('#mtitulo').empty().html('Mensaje');
        $('#mcuerpo').empty().append(`<div class="row"><div class="col-md-12"><label>Destinatario:&nbsp;</label>${proveedor}<span></span></div><div class="col-md-12"><label>CFDI:&nbsp;</label><span id="mcfdi">${id}</span></div></div><div class="col-md-12"><textarea class="form-control" id="mensaje" rows="3"></textarea></div>`);
        $('#mpie').empty().append(`<button type="button" class="btn btn-danger" data-dismiss="modal">Cerrar</button><button type="button" class="btn btn-primary" onclick="enviar_mensaje()">Enviar</button>`);
        $('#dialogo').modal({backdrop: 'static', keyboard: false})
    }
    if (((event.target.id).search("estado_")) != (-1)) {
        id_g = (event.target.id).split("_");
        id = id_g[(id_g.length) - 1];
        estado = $('#testado_'+id).text();
        bandera = true;
        $('#testado_'+id).empty();
        $('#testado_'+id).append(`
        <select class="form-control" onchange="cambia_estatus(${id});"  id="factura_${id}">
            <option value="A" ${sel(estado, 1)}>Aprobada</option>
            <option value="I" ${sel(estado, 2)}>Impresa</option>
            <option value="X" ${sel(estado, 3)}>Rechazada</option>
            <option value="C" ${sel(estado, 4)}>Cancelada</option>
            <option value="R" ${sel(estado, 5)}>Recibida</option>
        </select>
    `);
    }
    if (((event.target.id).search("suplantacion_")) != (-1)) {
        id_g = (event.target.id).split("_");
        id = id_g[(id_g.length) - 1];
        suplantacion_identidad(id);
    }

    if (((event.target.id).search("regresar")) != (-1)) {
        usuario = $('#usuario').val();
        contrasena = $('#contrasena').val();
        Swal.fire({
          title: 'Mensaje',
          text: '¿Estás seguro de regresar como administrador?',
          icon: 'info',
          showCancelButton: true,
          allowOutsideClick: false,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          cancelButtonText: "Cerrar",
          confirmButtonText: 'Aceptar'
        }).then((result) => {
            if (result.isConfirmed) {
                $.ajax({
                    type: 'POST',
                    url: '/user/login/',
                    data: {username:usuario, password:contrasena},
                    dataType:'json',
                    success: function(data){
                        if(data.error){
                            Swal.fire({
                            title: 'Mensaje',
                            text: 'Datos incorrectos',
                            icon: 'error',
                            allowOutsideClick: false
                            }).then((result) => {
                                window.location.replace('/');
                            });
                        }else{
                           Swal.fire({
                            title: 'Mensaje',
                            text: 'Se regreso la sesión del administrador.',
                            icon: 'success',
                            allowOutsideClick: false
                            }).then((result) => {
                                window.location.replace('/');
                            });
                        }
                    }
                });
            }
        });
    }
});


   function sel(sel, accion){
        if(bandera){
            if(accion == 1){
                if("Aprobada" == sel){
                    bandera = false;
                    return 'selected';
                }
            }else if(accion ==2){
                if("Impresa" == sel){
                    bandera = false;
                    return 'selected';
                }
            }else if(accion ==3){
                if("Rechazada" == sel){
                    bandera = false;
                    return 'selected';
                }
            }else if(accion ==4){
                if("Cancelada" == sel){
                    bandera = false;
                    return 'selected';
                }
            }else{
                bandera = false;
                return 'selected';
            }
        }
    }