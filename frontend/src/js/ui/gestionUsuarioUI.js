//Raul Gutierrez
import { getBuscarUsuario, getTodosUsuarios, postUsuario, putUsuario } from "../api/usuarioAPI.js";
import { getTodosCasas } from "../api/casaAPI.js";

document.addEventListener("DOMContentLoaded", function () {
    async function rellenarUsuarios() {
        const usuarios = await getTodosUsuarios()
        const casas = await getTodosCasas()
        const tabla = $('#usuarios').DataTable()
        tabla.clear().draw()
        usuarios.Usuario.forEach(usu => {
            if (usu.activo == 1) {
                const row = tabla.row.add([
                    usu.foto,
                    usu.nombre,
                    usu.gmail,
                    casas[usu.idCasa-1].nombre,
                    usu.nivel,
                    usu.exp,
                    `<button type="button" class="btn btn-primary btn-sm" data-bs-toggle="modal" data-bs-target="#myModal${usu.id}"><i class="fas fa-edit"></i> Editar</button>` +
                    `<button class="btn btn-danger btn-sm" data-bs-toggle="modal" data-bs-target="#deleteModal${usu.id}" ><i class="fas fa-trash-alt"></i> Eliminar</button>`
                ]).draw()
    
                const editarUsuario = `
                    <div class="modal" id="myModal${usu.id}">
                        <div class="modal-dialog modal-md">
                            <div class="modal-content">
                                <div class="modal-header">
                                    <h4 class="modal-title">Editar usuario ${usu.nombre}</h4>
                                    <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
                                </div>
                                <div class="modal-body">
                                    <div class="row">
                                    <div class="col-sm-12 col-md-6 col-lg-6">
                                        <label for="nombre" class="form-label">Nombre</label>
                                        <input type="text" id="nombre${usu.id}" name="nombre${usu.id}" class="form-control" value=${usu.nombre}>
                                        <div class="invalid-feedback" id="mensajeNombre"></div>
                                    </div>
    
                                    <div class="col-sm-12 col-md-6 col-lg-6">
                                        <label for="gmail" class="form-label">Gmail</label>
                                        <input type="text" id="gmail${usu.id}" name="gmail${usu.id}" class="form-control" value=${usu.gmail}>
                                        <div class="invalid-feedback" id="mensajegmail"></div>
                                    </div>
                
                                    <div class="col-sm-12 col-md-6 col-lg-6">
                                        <label for="contra" class="form-label">Contraseña</label>
                                        <div class="input-group">
                                            <input type="password" id="contra${usu.id}" name="contra${usu.id}" class="form-control" >
                                        <div class="invalid-feedback" id="mensajeContrasena"></div>
                                    </div>
                                </div>
                            </div>
                            <div class="modal-footer">
                                <button type="button" class="btn btn-danger" data-bs-dismiss="modal" id="editarBtn${usu.id}">Editar usuario</button>
                            </div>
                        </div>                
                    </div>
                </div>
                `
                const eliminarUsuario = 
                `
                    <div class="modal" id="deleteModal${usu.id}">
                        <div class="modal-dialog modal-md">
                            <div class="modal-content">
                
                                <div class="modal-header">
                                    <h4 class="modal-title">Confirmar Eliminación</h4>
                                    <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
                                </div>
                
                
                                <div class="modal-body">
                                    <p>¿Estás seguro de que deseas eliminar el usuario ${usu.nombre}?</p>
                                </div>
                
                                <div class="modal-footer">
                                    <button type="button" class="btn btn-danger" data-bs-dismiss="modal" id="confirmarEliminacion${usu.id}">Confirmar Eliminación</button>
                                </div>
                            </div>
                        </div>
                    </div>
                `
    
                document.body.insertAdjacentHTML('beforeend', editarUsuario)
                editarUsuarioUI(usu.id)
                document.body.insertAdjacentHTML('beforeend', eliminarUsuario)
                eliminarUsuarioUI(usu.id)
    
                row.nodes().to$().data('usuarios', usu)
            } else {
                const row = tabla.row.add([
                    usu.foto,
                    usu.nombre,
                    usu.gmail,
                    casas[usu.idCasa-1].nombre,
                    usu.nivel,
                    usu.exp,
                    `<button type="button" class="btn btn-primary btn-sm" data-bs-toggle="modal" data-bs-target="#myModal${usu.id}"><i class="fas fa-edit"></i> Editar</button>` +
                    `<button class="btn btn-danger btn-sm" data-bs-toggle="modal" data-bs-target="#activeModal${usu.id}" ><i class="fas fa-trash-alt"></i> Añadir</button>`
                ]).draw()
    
                const editarUsuario = `
                    <div class="modal" id="myModal${usu.id}">
                        <div class="modal-dialog modal-md">
                            <div class="modal-content">
                                <div class="modal-header">
                                    <h4 class="modal-title">Editar usuario ${usu.nombre}</h4>
                                    <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
                                </div>
                                <div class="modal-body">
                                    <div class="row">
                                    <div class="col-sm-12 col-md-6 col-lg-6">
                                        <label for="nombre" class="form-label">Nombre</label>
                                        <input type="text" id="nombre${usu.id}" name="nombre${usu.id}" class="form-control" value=${usu.nombre}>
                                        <div class="invalid-feedback" id="mensajeNombre"></div>
                                    </div>
    
                                    <div class="col-sm-12 col-md-6 col-lg-6">
                                        <label for="gmail" class="form-label">Gmail</label>
                                        <input type="text" id="gmail${usu.id}" name="gmail${usu.id}" class="form-control" value=${usu.gmail}>
                                        <div class="invalid-feedback" id="mensajegmail"></div>
                                    </div>
                
                                    <div class="col-sm-12 col-md-6 col-lg-6">
                                        <label for="contra" class="form-label">Contraseña</label>
                                        <div class="input-group">
                                            <input type="password" id="contra${usu.id}" name="contra${usu.id}" class="form-control" >
                                        <div class="invalid-feedback" id="mensajeContrasena"></div>
                                    </div>
                                </div>
                            </div>
                            <div class="modal-footer">
                                <button type="button" class="btn btn-danger" data-bs-dismiss="modal" id="editarBtn${usu.id}">Editar usuario</button>
                            </div>
                        </div>                
                    </div>
                </div>
                `
                const anadirUsuario = 
                `
                    <div class="modal" id="activeModal${usu.id}">
                        <div class="modal-dialog modal-md">
                            <div class="modal-content">
                
                                <div class="modal-header">
                                    <h4 class="modal-title">Confirmar Activación</h4>
                                    <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
                                </div>
                
                
                                <div class="modal-body">
                                    <p>¿Estás seguro de que deseas añadir el usuario ${usu.nombre}?</p>
                                </div>
                
                                <div class="modal-footer">
                                    <button type="button" class="btn btn-danger" data-bs-dismiss="modal" id="confirmarActivacion${usu.id}">Confirmar Activación</button>
                                </div>
                            </div>
                        </div>
                    </div>
                `
    
                document.body.insertAdjacentHTML('beforeend', editarUsuario)
                editarUsuarioUI(usu.id)
                document.body.insertAdjacentHTML('beforeend', anadirUsuario)
                anadirUsuarioUI(usu.id)
    
                row.nodes().to$().data('usuarios', usu)
            }
        })
    }

    async function editarUsuarioUI(id) {
        const modificarBtn = document.getElementById(`editarBtn${id}`)
        const usuario = await getBuscarUsuario(id)
        const usuarioU = usuario.Usuario

        if (modificarBtn) {

            modificarBtn.addEventListener('click', async () => {
                try {

                    const modalElement = document.getElementById(`myModal${id}`)
                    const nombreUsu = modalElement.querySelector(`#nombre${id}`).value
                    const gmailUsu = modalElement.querySelector(`#gmail${id}`).value
                    const contraUsu = modalElement.querySelector(`#contra${id}`).value

                    const usuarioObjeto = {
                        nombre: nombreUsu,
                        gmail: gmailUsu,
                        contrasena: contraUsu,
                        idCasa: usuarioU.idCasa,
                        nivel: usuarioU.nivel,
                        exp: usuarioU.exp,
                        foto: usuarioU.foto,
                        activo: usuarioU.activo
                    }
                    await putUsuario(id, usuarioObjeto)

                    const modal = new bootstrap.Modal(modalElement)
                    modal.hide();
                    location.reload()
                } catch (error) {
                    console.error('Error al confirmar la modificación:', error)
                }
            });
        }
    }

    async function eliminarUsuarioUI(id) {
        const confirmarEliminacion = document.getElementById(`confirmarEliminacion${id}`)
        const usuario = await getBuscarUsuario(id)
        const usuarioU = usuario.Usuario

        if (confirmarEliminacion) {
            confirmarEliminacion.addEventListener('click', async () => {
                try {
                    const usuarioObjeto = {
                        nombre: usuarioU.nombre,
                        gmail: usuarioU.gmail,
                        contrasena: usuarioU.contrasena,
                        idCasa: usuarioU.idCasa,
                        nivel: usuarioU.nivel,
                        exp: usuarioU.exp,
                        foto: usuarioU.foto,
                        activo: false
                    }
                    await putUsuario(id, usuarioObjeto)

                    const modalElement = document.getElementById(`deleteModal${id}`);
                    const modal = new bootstrap.Modal(modalElement);
                    modal.hide();
                    location.reload()


                } catch (error) {
                    console.error('Error al confirmar la eliminación:', error);
                }
            });
        }
    }

    async function anadirUsuarioUI(id) {
        const confirmarEliminacion = document.getElementById(`confirmarActivacion${id}`)
        const usuario = await getBuscarUsuario(id)
        const usuarioU = usuario.Usuario

        if (confirmarEliminacion) {
            confirmarEliminacion.addEventListener('click', async () => {
                try {
                    const usuarioObjeto = {
                        nombre: usuarioU.nombre,
                        gmail: usuarioU.gmail,
                        contrasena: usuarioU.contrasena,
                        idCasa: usuarioU.idCasa,
                        nivel: usuarioU.nivel,
                        exp: usuarioU.exp,
                        foto: usuarioU.foto,
                        activo: true
                    }
                    await putUsuario(id, usuarioObjeto)

                    const modalElement = document.getElementById(`activeModal${id}`);
                    const modal = new bootstrap.Modal(modalElement);
                    modal.hide();
                    location.reload()


                } catch (error) {
                    console.error('Error al confirmar la eliminación:', error);
                }
            });
        }
    }
    rellenarUsuarios()
})