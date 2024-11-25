//Raul Gutierrez
import { getBuscarUsuario, getTodosUsuarios, postUsuario, putUsuario } from "../api/usuarioAPI.js";
import { getTodosCasas } from "../api/casaAPI.js";
import { getTodosUsuariosRoles, mostrarRolesUsuario, deleteUsuarioRol, postUsuarioRol } from "../api/usuarioRolAPI.js";
import { cargarSideBar } from "../components/cargarSideBar.js"

await cargarSideBar()
document.addEventListener("DOMContentLoaded", function () {
    async function rellenarUsuarios() {
        const usuarios = await getTodosUsuarios()
        const casas = await getTodosCasas()
        const roles = await getTodosUsuariosRoles()
        console.log(roles)
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
                    `<button class="btn btn-danger btn-sm" data-bs-toggle="modal" data-bs-target="#deleteModal${usu.id}" ><i class="fas fa-trash-alt"></i> Eliminar</button>` +
                    `<button class="btn btn-danger btn-sm" data-bs-toggle="modal" data-bs-target="#rolModal${usu.id}" ><i class="fas fa-trash-alt"></i> Roles</button>`
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
                
                const editarRol = `
                <div class="modal" id="rolModal${usu.id}">
                    <div class="modal-dialog modal-md">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h4 class="modal-title">Editar rol de ${usu.nombre}</h4>
                                <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
                            </div>
                            <div class="modal-body" id="roles${usu.id}">
                                <label>
                                    <input type="checkbox" id="alumno${usu.id}"> Alumno
                                </label><br>

                                <label>  
                                    <input type="checkbox" id="profesor${usu.id}"> Profesor
                                </label><br>

                                <label>
                                    <input type="checkbox" id="administrador${usu.id}"> Administrador
                                </label><br>
                            </div>
                            <div class="modal-footer">
                            <button type="button" class="btn btn-danger" data-bs-dismiss="modal" id="editarRolBtn${usu.id}">Editar roles</button>
                        </div>
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
                document.body.insertAdjacentHTML('beforeend', editarRol)
                editarRolesUI(usu.id)

    
                row.nodes().to$().data('usuarios', usu)

                const meterAdmin = document.getElementById(`alumno${usu.id}`)
                const meterProfe = document.getElementById(`profesor${usu.id}`)
                const meterAlumn = document.getElementById(`administrador${usu.id}`)

                for (let i = 0; i < roles.usuarioRoles.length; i++) {
                    if (roles.usuarioRoles[i].idUsuario == usu.id && roles.usuarioRoles[i].idRol == 2) {
                        meterAlumn.checked = true
                    }

                    if (roles.usuarioRoles[i].idUsuario == usu.id && roles.usuarioRoles[i].idRol == 3) {
                        meterProfe.checked = true
                    }

                    if (roles.usuarioRoles[i].idUsuario == usu.id && roles.usuarioRoles[i].idRol == 4) {
                        meterAdmin.checked = true
                    }
                }

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

                    // const tabla = $('#usuarios').DataTable();
                    // const fila = tabla.row((idx, data, node) => data.usuarios.id === id);
    
                    // if (fila.length > 0) {
                    //     fila.data([
                    //         usuarioObjeto.foto,
                    //         usuarioObjeto.nombre,
                    //         usuarioObjeto.gmail,
                    //         casas[usuarioObjeto.idCasa - 1].nombre,
                    //         usuarioObjeto.nivel,
                    //         usuarioObjeto.exp,
                    //         `<button type="button" class="btn btn-primary btn-sm" data-bs-toggle="modal" data-bs-target="#myModal${id}"><i class="fas fa-edit"></i> Editar</button>` +
                    //         `<button class="btn btn-danger btn-sm" data-bs-toggle="modal" data-bs-target="#deleteModal${id}" ><i class="fas fa-trash-alt"></i> Eliminar</button>` +
                    //         `<button class="btn btn-danger btn-sm" data-bs-toggle="modal" data-bs-target="#rolModal${id}" ><i class="fas fa-trash-alt"></i> Roles</button>`
                    //     ]).draw();
                    // }

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

    async function editarRolesUI(id) {
        const modificarRolBtn = document.getElementById(`editarRolBtn${id}`)
        const roles = await mostrarRolesUsuario(id)
        console.log(roles)

        if (modificarRolBtn) {

            modificarRolBtn.addEventListener('click', async () => {
                try {
                    
                    const modalElement = document.getElementById(`rolModal${id}`)
                    const checkedAlumn = document.getElementById(`alumno${id}`)
                    const checkedProfe = document.getElementById(`profesor${id}`)
                    const checkedAdmin = document.getElementById(`administrador${id}`)

                    console.log(roles.roles.find((rol) => rol.nombre))
                    if (roles.roles.find((rol) => rol.nombre === "admin") && checkedAdmin.checked == false) {
                        //decir de eliminar rol admin
                        await deleteUsuarioRol(id, 2)
                    }else if (roles.roles.find((rol) => rol.nombre != "admin") && checkedAdmin.checked == true){
                        //decir de añadir rol admin
                        const rolObjeto = {
                            idUsuario: id,
                            idRol: 2
                        }
                        await postUsuarioRol(rolObjeto)
                    }

                    if (roles.roles.find((rol) => rol.nombre === "profesor") && checkedProfe.checked == false) {
                        //decir de eliminar rol profe
                        await deleteUsuarioRol(id, 3) 
                    }else if (roles.roles.find((rol) => rol.nombre != "profesor") && checkedProfe.checked == true){
                        //decir de añadir rol profe
                        const rolObjeto = {
                            idUsuario: id,
                            idRol: 3
                        }
                        await postUsuarioRol(rolObjeto)
                    }

                    if (roles.roles.find((rol) => rol.nombre === "alumno") && checkedAlumn.checked == false) {
                        //decir de eliminar rol alumn 
                        await deleteUsuarioRol(id, 4)
                    }else if (roles.roles.find((rol) => rol.nombre != "alumno") && checkedAlumn.checked == true){
                        //decir de añadir rol alumn
                        const rolObjeto = {
                            idUsuario: id,
                            idRol: 4
                        }
                        await postUsuarioRol(rolObjeto)
                    }

                    if (roles.roles.find((rol) => rol.nombre != "alumno") && roles.roles.find((rol) => rol.nombre != "profesor") && roles.roles.find((rol) => rol.nombre != "admin") && roles.roles.find((rol) => rol.nombre != "Dumbledore")){
                        const rolObjeto = {
                            idUsuario: id,
                            idRol: 4
                        }
                        await postUsuarioRol(rolObjeto)
                    }

                    const modal = new bootstrap.Modal(modalElement)
                    modal.hide();
                    location.reload()
                } catch (error) {
                    console.error('Error al confirmar la modificación:', error)
                }
            });
        }
    }
    rellenarUsuarios()
})