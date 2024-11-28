//Raul Gutierrez
import { getBuscarUsuario, getTodosUsuarios } from "../api/usuarioAPI.js"
import { getTurnoDuelos, getTurnoDuelosBot, getTurnoDuelosPorDuelo } from "../api/duelosAPI.js"
import { mostrarRolesUsuario } from "../api/usuarioRolAPI.js"
import { constantes } from "../classes/constantes.js"

document.addEventListener("DOMContentLoaded", function () {
    async function rellenarHechizos() {
        const idUsuario = sessionStorage.getItem("userId")
        const hechizos = await getTurnoDuelos(idUsuario)
        console.log(hechizos)

        const tabla = $('#hechizos').DataTable()
        tabla.clear().draw()
        hechizos.forEach(hec => {
            const esta = (hec.estadisticas).split(',')
            const row = tabla.row.add([
                hec.nombre,
                esta[0],
                esta[1],
                esta[2],
                esta[3],
                esta[4],
                esta[5],
                hec.nivel,
                `<button class="btn btn-danger btn-sm" data-bs-toggle="modal" data-bs-target="#useModal${hec.id}" ><i class="fas fa-trash-alt"></i>Usar</button>`
            ]).draw()

            const dueloHechizo = `
                <div class="modal" id="useModal${hec.id}">
                    <div class="modal-dialog modal-md"class="text-dark">
                        <div class="modal-content"class="text-dark">

                            <div class="modal-header"class="text-dark">
                                <h4 class="modal-title text-dark">Confirmar Eliminación</h4>
                                <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
                            </div>

                            <div class="modal-body">
                                <p class="text-dark">¿Estás seguro de usar el hechizo ${hec.nombre}?</p>
                            </div>

                            <div class="modal-footer">
                                <button type="button" class="btn btn-danger" data-bs-dismiss="modal" id="confirmarUso${hec.id}">Usar</button>
                            </div>
                        </div>
                    </div>
                </div>
            `

            document.body.insertAdjacentHTML('beforeend', dueloHechizo)
            dueloHechizoUI(hec.id, idUsuario)

            row.nodes().to$().data('hechizos', hec)
        })

    }

    async function dueloHechizoUI(id, idUsuario) {
        const confirmarUso = document.getElementById(`confirmarUso${id}`)

        if (confirmarUso) {
            confirmarUso.addEventListener('click', async () => {
                try {
                    const modalElement = document.getElementById(`useModal${id}`);
                    const turnos = await getTurnoDuelosPorDuelo(idUsuario)
                    const hechizosBot = await getTurnoDuelosBot(idUsuario)
                    console.log(hechizosBot)
                    const ale = Math.floor(Math.random() * 4)
                    switch (turnos.length) {
                        
                        case 0:
                            // El hechizo con mas ataque que tenga (75% de que sea un hechizo aleatorio)
                            if (ale == 0) {
                                //hechizo random
                            }else{
                                //hechizo con mas daño
                            }
                            break;
                        case 1:
                            // Escoge entre los 3 hechizo con mas ataque que tenga (25% de que sea un hechizo defensivo def>=atq)
                            if (ale == 0) {
                                //hechizo defensivo
                            }else{
                                //hechizo con mas daño
                            }
                            break;
                        case 2:
                            // Si ha ganado los 2 anteriores tirara el hechizo más fuerte que tenga y si no pues jugará con el hechizo que más defensa tenga
                            break;
                        case 3:
                            // Si le queda 1 para ganar usará el ataque mas fuerte que tenga y si no usará el hechizo que más defensan tenga (50% de que sea un hechizo aleatorio) 
                            break;
                        case 4:
                            // Lanzará el hechizo que más ataque tenga par desenpatar
                            break;
                        default:
                            break;
                    }

                    const modal = new bootstrap.Modal(modalElement);
                    modal.hide();
                    //location.reload()


                } catch (error) {
                    console.error('Error al confirmar la eliminación:', error);
                }
            });
        }
    }

    async function guardarTurno(idHechizoUsuario, idHechizoBot, idUsuario, turnos) {
        
    }

    rellenarHechizos()
})