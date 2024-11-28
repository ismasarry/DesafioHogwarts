//Raul Gutierrez
import { getTurnoDuelos, getTurnoDuelosBot, getTurnoDuelosPorDuelo, postTurnoDuelo } from "../api/duelosAPI.js"
import { getBuscarHechizo } from "../api/hechizoAPI.js"

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
                    const hechizosDisponibleBot = await getTurnoDuelosBot(idUsuario)

                    const ale = Math.floor(Math.random() * 4)

                    let hechizoBot = ""
                    let hechizo = []
                    let hechizosConEsta = []

                    for (let i = 0; i < hechizosDisponibleBot.length; i++) {
                        hechizo = [hechizosDisponibleBot[i].id, hechizosDisponibleBot[i].estadisticas.split(',')]
                        hechizosConEsta.push(hechizo)
                    }

                    //Algoritmo escoger hechizo bot 
                    switch (turnos.length) {
                        case 0:
                            // El hechizo con mas ataque que tenga (75% de que sea un hechizo aleatorio)
                            if (ale == 0) {
                                //hechizo random
                                hechizoBot = hechizosDisponibleBot[Math.floor(Math.random() * hechizosDisponibleBot.length)].id
                                console.log(hechizoBot)
                            } else {
                                //hechizo con mas ataque
                                let max = 0
                                for (let i = 0; i < hechizosConEsta.length; i++) {
                                    if (hechizosConEsta[i][1][0] >= max) {
                                        hechizoBot = hechizosConEsta[i][0]
                                        max = hechizosConEsta[i][1][0]
                                    }
                                }
                            }
                            break;
                        case 1:
                            // Escoge el hechizo con mas accion que tenga (25% de que sea un hechizo defensivo)
                            if (ale == 0) {
                                //hechizo defensa
                                let max1 = 0
                                for (let i = 0; i < hechizosConEsta.length; i++) {
                                    if (hechizosConEsta[i][1][1] >= max1) {
                                        hechizoBot = hechizosConEsta[i][0]
                                        max1 = hechizosConEsta[i][1][1]
                                    }
                                }
                            } else {
                                //hechizo con mas accion
                                let max1 = 0
                                for (let i = 0; i < hechizosConEsta.length; i++) {
                                    if (hechizosConEsta[i][1][5] >= max1) {
                                        hechizoBot = hechizosConEsta[i][0]
                                        max1 = hechizosConEsta[i][1][5]
                                    }
                                }
                            }
                            break;
                        case 2:
                            // Si ha ganado los 2 anteriores tirara el hechizo más fuerte que tenga y si no pues jugará con el hechizo que más defensa tenga
                            if (turnos[0].ganador == false && turnos[1].ganador == false) {
                                let max2 = 0
                                for (let i = 0; i < hechizosConEsta.length; i++) {
                                    if (hechizosConEsta[i][1][0] >= max2) {
                                        hechizoBot = hechizosConEsta[i][0]
                                        max2 = hechizosConEsta[i][1][0]
                                    }
                                }
                            } else {
                                let max2 = 0
                                for (let i = 0; i < hechizosConEsta.length; i++) {
                                    if (hechizosConEsta[i][1][1] >= max2) {
                                        hechizoBot = hechizosConEsta[i][0]
                                        max2 = hechizosConEsta[i][1][1]
                                    }
                                }
                            }
                            break;
                        case 3:
                            // Si le queda 1 para ganar usará el ataque mas fuerte que tenga y si no usará el hechizo que más defensan tenga (50% de que sea un hechizo aleatorio) 
                            if (ale <= 1) {
                                if ((turnos[0].ganador == false && turnos[1].ganador == false) || (turnos[0].ganador == false && turnos[2].ganador == false) || (turnos[1].ganador == false && turnos[2].ganador == false)) {
                                    let max3 = 0
                                    for (let i = 0; i < hechizosConEsta.length; i++) {
                                        if (hechizosConEsta[i][1][0] >= max3) {
                                            hechizoBot = hechizosConEsta[i][0]
                                            max3 = hechizosConEsta[i][1][0]
                                        }
                                    }
                                } else {
                                    let max3 = 0
                                    for (let i = 0; i < hechizosConEsta.length; i++) {
                                        if (hechizosConEsta[i][1][1] >= max3) {
                                            hechizoBot = hechizosConEsta[i][0]
                                            max3 = hechizosConEsta[i][1][1]
                                        }
                                    }
                                }
                            } else {
                                hechizoBot = hechizosDisponibleBot[Math.floor(Math.random() * hechizosDisponibleBot.length)].id
                            }
                            break;
                        case 4:
                            // Lanzará el hechizo que más ataque tenga para desempatar
                            let max4 = 0
                            for (let i = 0; i < hechizosConEsta.length; i++) {
                                if (hechizosConEsta[i][1][0] >= max4) {
                                    hechizoBot = hechizosConEsta[i][0]
                                    max4 = hechizosConEsta[i][1][0]
                                }
                            }
                            break;
                    }

                    //compara usuario con bot
                    const hechizoDelUsuario = await getBuscarHechizo(id)
                    let estaUsuario = hechizoDelUsuario.hechizos.estadisticas.split(',')

                    const hechizoDelBot = await getBuscarHechizo(hechizoBot)
                    let estaBot = hechizoDelBot.hechizos.estadisticas.split(',')

                    //Calcular ataque usuario
                    const accProbUsuario = estaUsuario[5] / 2
                    const invProbUsuario = estaUsuario[4] / 2
                    const ale2 = Math.floor(Math.random() * 100)
                    if (ale2 <= accProbUsuario) {
                        estaUsuario[0] = estaUsuario[0] * 2
                    }
                    if (ale2 <= invProbUsuario) {
                        estaUsuario[1] = estaUsuario[1] * 2
                    }
                    estaUsuario[0] = estaUsuario[0] + estaUsuario[3]
                    estaUsuario[1] = estaUsuario[1] + estaUsuario[2]


                    //Calcular ataque Bot
                    const accProbBot = estaBot[5] / 2
                    const invProbBot = estaBot[4] / 2
                    const ale3 = Math.floor(Math.random() * 100)
                    if (ale3 <= accProbBot) {
                        estaBot[0] * 2
                    }
                    if (ale3 <= invProbBot) {
                        estaBot[1] * 2
                    }
                    estaBot[0] = estaBot[0] + estaBot[3]
                    estaBot[1] = estaBot[1] + estaBot[2]


                    estaBot[0] = estaBot[0] - estaUsuario[1]
                    estaUsuario[0] = estaUsuario[0] - estaBot[1]
                    //ver ganador
                    let ganador = null
                    if (estaUsuario[0] > estaBot[0]) {
                        ganador = true
                    }else if (estaUsuario[0] < estaBot[0]) {
                        ganador = false
                    }else{
                        if (hechizoDelUsuario.hechizos.nivel >= hechizoDelBot.hechizos.nivel) {
                            ganador = true
                        }else{
                            ganador = false
                        }
                    }

                    console.log(hechizoDelUsuario)
                    console.log(hechizoDelBot)
                    console.log(accProbUsuario)
                    console.log(invProbUsuario)
                    console.log(accProbBot)
                    console.log(invProbBot)
                    console.log(estaUsuario[0])
                    console.log(estaBot[0])
                    console.log(ganador)

                    const idDuelo = await getDueloEnCurso(idUsuario)

                    const turnoDuelo = {
                        idDuelo : idDuelo,
                        turno: turnos.length + 1,
                        idHechizoUsadoUsuario: id,
                        idHechizoUsadoBot: hechizoBot,
                        ganador : ganador
                    }

                    //postTurnoDuelo(turnoDuelo)

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