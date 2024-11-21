//Raul Gutierrez
import { getBuscarUsuario, getTodosUsuarios } from "../api/usuarioAPI.js"
import { cargarSideBar } from "../components/cargarSideBar.js"
import { getBuscarHechizo, getBuscarHechizoNivel, postHechizo, putHechizo, deleteHechizo } from "../api/hechizoAPI.js"

cargarSideBar
document.addEventListener("DOMContentLoaded", function () {
    async function rellenarHechizos() {
        const usuario = sessionStorage.getItem('userId')
        const usuarioInfo = await getBuscarUsuario(usuario)
        const usuariosParaHechizo = await getTodosUsuarios()
        const hechizos = await getBuscarHechizoNivel(usuarioInfo.Usuario.nivel)
        const tabla = $('#hechizos').DataTable()
        tabla.clear().draw()
        hechizos.hechizos.forEach(hec => {
            const esta = (hec.estadisticas).split(', ')
            let creador = 0
            if(hec.idUsuario == 0){
                creador = 'Desconocido'
            }else{
                for (let i = 0; i < usuariosParaHechizo.Usuario.length; i++) {
                    if (hec.idUsuario == usuariosParaHechizo.Usuario[i].id) {
                        creador = usuariosParaHechizo.Usuario[i].id
                    }
                }
            }
            const row = tabla.row.add([
                hec.nombre,
                esta[0],
                esta[1],
                esta[2],
                esta[3],
                esta[4],
                esta[5],
                creador,
                hec.nivel,
                `<button type="button" class="btn btn-primary btn-sm" data-bs-toggle="modal" data-bs-target="#myModal${hec.id}"><i class="fas fa-edit"></i> Editar</button>` +
                `<button class="btn btn-danger btn-sm" data-bs-toggle="modal" data-bs-target="#deleteModal${hec.id}" ><i class="fas fa-trash-alt"></i> Eliminar</button>`
            ]).draw()

            const editarHechizo = ` 
                    <div class="modal" id="myModal${hec.id}">
                        <div class="modal-dialog modal-md">
                            <div class="modal-content">
                                <div class="modal-header">
                                    <h4 class="modal-title">Editar hechizo ${hec.nombre}</h4>
                                    <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
                                </div>
                                <div class="modal-body">
                                    <div class="row">
                                    <div class="col-sm-12 col-md-6 col-lg-6">
                                        <label for="nombre" class="form-label">Nombre</label>
                                        <input type="text" id="nombre${hec.id}" name="nombre${hec.id}" class="form-control" value=${hec.nombre}>
                                        <div class="invalid-feedback" id="mensajeNombre"></div>
                                    </div>

                                    <div class="col-sm-12 col-md-6 col-lg-6">
                                        <label for="ataque" class="form-label">Ataque</label>
                                        <input type="text" id="ataque${hec.id}" name="ataque${hec.id}" class="form-control" value=${esta[0]}>
                                        <div class="invalid-feedback" id="mensajeAtaque"></div>
                                    </div>

                                    <div class="col-sm-12 col-md-6 col-lg-6">
                                        <label for="defensa" class="form-label">Defensa</label>
                                        <input type="text" id="defensa${hec.id}" name="defensa${hec.id}" class="form-control" value=${esta[1]}>
                                        <div class="invalid-feedback" id="mensajeDefensa"></div>
                                    </div>

                                    <div class="col-sm-12 col-md-6 col-lg-6">
                                        <label for="sanacion" class="form-label">Sanación</label>
                                        <input type="text" id="sanacion${hec.id}" name="sanacion${hec.id}" class="form-control" value=${esta[2]}>
                                        <div class="invalid-feedback" id="mensajeSanacion"></div>
                                    </div>

                                    <div class="col-sm-12 col-md-6 col-lg-6">
                                        <label for="dano" class="form-label">Daño</label>
                                        <input type="text" id="dano${hec.id}" name="dano${hec.id}" class="form-control" value=${esta[3]}>
                                        <div class="invalid-feedback" id="mensajeDano"></div>
                                    </div>

                                    <div class="col-sm-12 col-md-6 col-lg-6">
                                        <label for="invocacion" class="form-label">Invocación</label>
                                        <input type="text" id="invocacion${hec.id}" name="invocacion${hec.id}" class="form-control" value=${esta[4]}>
                                        <div class="invalid-feedback" id="mensajeInvocacion"></div>
                                    </div>

                                    <div class="col-sm-12 col-md-6 col-lg-6">
                                        <label for="accion" class="form-label">Acción</label>
                                        <input type="text" id="accion${hec.id}" name="accion${hec.id}" class="form-control" value=${esta[5  ]}>
                                        <div class="invalid-feedback" id="mensajeAccion"></div>
                                    </div>
    
                                    <div class="col-sm-12 col-md-6 col-lg-6">
                                        <label for="creador" class="form-label">Creador</label>
                                        <input type="text" id="creador${hec.id}" name="creador${hec.id}" class="form-control" value=${creador}>
                                        <div class="invalid-feedback" id="mensajeCreador"></div>
                                    </div>
                
                                    <div class="col-sm-12 col-md-6 col-lg-6">
                                        <label for="nivel" class="form-label">Nivel de hechizo</label>
                                        <input type="text" id="nivel${hec.id}" name="nivel${hec.id}" class="form-control" value=${hec.nivel}>
                                        <div class="invalid-feedback" id="mensajeNivel"></div>
                                    </div>
                                </div>
                            </div>
                            <div class="modal-footer">
                                <button type="button" class="btn btn-danger" data-bs-dismiss="modal" id="editarBtn${hec.id}">Editar usuario</button>
                            </div>
                        </div>                
                    </div>
                </div>
                `

            const eliminarHechizo =
                `
                    <div class="modal" id="deleteModal${hec.id}">
                        <div class="modal-dialog modal-md">
                            <div class="modal-content">
                
                                <div class="modal-header">
                                    <h4 class="modal-title">Confirmar Eliminación</h4>
                                    <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
                                </div>
                
                
                                <div class="modal-body">
                                    <p>¿Estás seguro de que deseas eliminar el usuario ${hec.nombre}?</p>
                                </div>
                
                                <div class="modal-footer">
                                    <button type="button" class="btn btn-danger" data-bs-dismiss="modal" id="confirmarEliminacion${hec.id}">Confirmar Eliminación</button>
                                </div>
                            </div>
                        </div>
                    </div>
                `
            document.body.insertAdjacentHTML('beforeend', editarHechizo)
            editarHechizoUI(hec.id)

            document.body.insertAdjacentHTML('beforeend', eliminarHechizo)
            eliminarHechizoUI(hec.id)

            row.nodes().to$().data('hechizos', hec)
        })
    }

    async function editarHechizoUI(id) {
        const modificarBtn = document.getElementById(`editarBtn${id}`)
        if (modificarBtn) {

            modificarBtn.addEventListener('click', async () => {
                try {

                    const modalElement = document.getElementById(`myModal${id}`)
                    const nombreHec = modalElement.querySelector(`#nombre${id}`).value
                    const ataqueHec = modalElement.querySelector(`#ataque${id}`).value
                    const defensaHec = modalElement.querySelector(`#defensa${id}`).value
                    const sanacionHec = modalElement.querySelector(`#sanacion${id}`).value
                    const danoHec = modalElement.querySelector(`#dano${id}`).value
                    const invocacionHec = modalElement.querySelector(`#invocacion${id}`).value
                    const accionHec = modalElement.querySelector(`#accion${id}`).value
                    const creadorHec = modalElement.querySelector(`#creador${id}`).value
                    const nivelHec = modalElement.querySelector(`#nivel${id}`).value

                    const esta = [ataqueHec,defensaHec,sanacionHec,danoHec,invocacionHec,accionHec]
                    const estadisticas = esta.toString(", ")
                    console.log(estadisticas)

                    // const hechizoObjeto = {
                    //     nombre: nombreUsu,
                    //     creador: creadorUsu,
                    //     contrasena: contraUsu,
                    //     idCasa: usuarioU.idCasa,
                    //     nivel: usuarioU.nivel,
                    //     exp: usuarioU.exp,
                    //     foto: usuarioU.foto,
                    //     activo: usuarioU.activo
                    // }
                    // await putUsuario(id, usuarioObjeto)

                    const modal = new bootstrap.Modal(modalElement)
                    modal.hide();
                    location.reload()
                } catch (error) {
                    console.error('Error al confirmar la modificación:', error)
                }
            });
        }
    }

    async function eliminarHechizoUI(id) {
        const confirmarEliminacion = document.getElementById(`confirmarEliminacion${id}`)

        if (confirmarEliminacion) {
            confirmarEliminacion.addEventListener('click', async () => {
                try {
                    await deleteHechizo(id)

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
    rellenarHechizos()
})