//Raul Gutierrez
import { getTurnoDuelos, getTurnoDuelosBot, getTurnoDuelosPorDuelo, postTurnoDuelo, getDueloEnCurso, calcularGanador} from "../api/duelosAPI.js"
import { getBuscarHechizo } from "../api/hechizoAPI.js"

document.addEventListener("DOMContentLoaded", function () {
    async function rellenarHechizos() {
        const idUsuario = sessionStorage.getItem("userId")
        const hechizos = await getTurnoDuelos(idUsuario)
        const turnos = await getTurnoDuelosPorDuelo(idUsuario)
        const info = document.getElementById("info")
        let finUsuario = 0
        let finBot = 0
        let score = ''

        let vidaUsu = 0
        let vidaBot = 0
        if (turnos.length == 0) {
            vidaUsu = 200
            vidaBot = 200
            vidaUsu = sessionStorage.setItem("vidaUsu", vidaUsu)
            vidaBot = sessionStorage.setItem("vidaBot", vidaBot)
        }else{
            vidaUsu = sessionStorage.getItem("vidaUsu")
            vidaBot = sessionStorage.getItem("vidaBot")
        }


        for (let i = 0; i < turnos.length; i++) {
            if (turnos[i].ganador == 1) {
                score += `
                    <img src="./../assets/circuloVerde.png" width="5%" height="100%"/>
                `
                finUsuario++
            } else {
                score += `
                    <img src="./../assets/circuloRojo.png" width="5%" height="100%"/>
                `
                finBot++
            }
        }

        if (turnos.length != 0) {
            info.innerHTML = score
        }
        
        if (finUsuario == 3 || finBot == 3 || vidaBot <= 0 || vidaUsu <= 0) {
            window.location.href = "./finDuelo.html"
        }
        
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
                const hechizosDisponibleBot = await getTurnoDuelosBot(idUsuario)

                const ale = Math.floor(Math.random() * 4)

                const ganador = await calcularGanador(id, idUsuario)

                const idDuelo = await getDueloEnCurso(idUsuario)

                const turnoDuelo = {
                    idDuelo: idDuelo.id,
                    turno: turnos.length + 1,
                    idHechizoUsadoUsuario: id,
                    idHechizoUsadoBot: ganador.idHechizoBot,
                    ganador: ganador.ganador
                }

                let vidaBot = sessionStorage.getItem("vidaBot")
                let vidaUsu = sessionStorage.getItem("vidaUsu")
                
                let vidaBotAc = vidaBot - parseInt(ganador.DanoUsuario, 10)
                let vidaUsuAc = vidaUsu - parseInt(ganador.DanoBot, 10)

                sessionStorage.setItem("vidaBot", vidaBotAc)
                sessionStorage.setItem("vidaUsu", vidaUsuAc)
                await postTurnoDuelo(turnoDuelo)

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