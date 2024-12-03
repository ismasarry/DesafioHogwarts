//Raul Gutierrez
import { getTurnoDuelos, getTurnoDuelosBot, getTurnoDuelosPorDueloNormal, postTurnoDuelo, getDueloEnCurso, getDueloPorUsuario } from "../api/duelosAPI.js"
import { getBuscarHechizo, getBuscarHechizoNivel } from "../api/hechizoAPI.js"
import { getBuscarUsuario } from "../api/usuarioAPI.js"
import { cargarSideBar } from "../components/cargarSideBar.js"

cargarSideBar
document.addEventListener("DOMContentLoaded", function () {
    async function rellenarHechizos() {
        const idUsuario = sessionStorage.getItem("userId")
        const usuario = await getBuscarUsuario(idUsuario)
        const duelos = await getDueloPorUsuario(idUsuario)

        const tabla = $('#duelos').DataTable()
        tabla.clear().draw()
        duelos.forEach(du => {
            let ganador = ''
            if (du.ganador == 1) {
                ganador = usuario.Usuario.nombre
            } else {
                ganador = "Bot"
            }
            console.log(usuario)
            const row = tabla.row.add([
                ganador,
                `<button class="btn btn-danger btn-sm" data-bs-toggle="modal" data-bs-target="#hisModal${du.id}" ><i class="fas fa-trash-alt"></i>Ver turnos</button>`
            ]).draw()

            const dueloTurnoModal = `
                    <div class="modal" id="hisModal${du.id}">
                        <div class="modal-dialog modal-md"class="text-dark">
                            <div class="modal-content"class="text-dark">
                                <div class="modal-header"class="text-dark">
                                    <h4 class="modal-title text-dark">Información duelo</h4>
                                    <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
                                </div>
    
                                <div class="modal-body" id="body${du.id}">
                                    
                                </div>
                            </div>
                        </div>
                    </div>
                `


            document.body.insertAdjacentHTML('beforeend', dueloTurnoModal)
            escribirHistorial(du.id, usuario.Usuario.nivel)

            row.nodes().to$().data('duelos', du)

        })

    }

    async function escribirHistorial(idDuelo, nivel) {

            const body = document.getElementById(`body${idDuelo}`)
            const turnos = await getTurnoDuelosPorDueloNormal(idDuelo)
            const hechizos = await getBuscarHechizoNivel(nivel)
            console.log(turnos)
            console.log(hechizos.hechizos[(turnos[0].idHechizoUsadoUsuario) - 1].nombre)
            let historial = ''
            for (let i = 0; i < turnos.length; i++) {
                let estado = ''

                if (turnos[i].ganador == 1) {
                    estado = "ganaste"
                } else {
                    estado = "perdiste"
                }

                historial = `
                <p>En este turno usaste: ${hechizos.hechizos[(turnos[i].idHechizoUsadoUsuario) - 1].nombre}, el oponente usó: ${hechizos.hechizos[(turnos[i].idHechizoUsadoBot) - 1].nombre} y ${estado}</p>
            `
                body.innerHTML += historial
            }
        
    }

    rellenarHechizos()
})