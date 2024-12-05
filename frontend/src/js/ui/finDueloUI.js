//Raul Gutierrez
import { getTurnoDuelosPorDuelo, getDueloEnCurso, putDuelo } from "../api/duelosAPI";
import { sumarPuntos } from "../classes/constantes";
import { getBuscarUsuario, putUsuario } from "../api/usuarioAPI";
import { getBuscarCasa, putCasa } from "../api/casaAPI";

const idUsuario = sessionStorage.getItem("userId")
const turnos = await getTurnoDuelosPorDuelo(idUsuario)

let finUsuario = 0
let finBot = 0

for (let i = 0; i < turnos.length; i++) {
    if (turnos[i].ganador == 1) {
        finUsuario++
    }else{
        finBot++
    }
}

const html = document.getElementById('mensaje');
const boton = document.getElementById('boton');

async function mensaje() {
    if (finUsuario == 3) {
        html.innerHTML = `
                <img src="./../assets/bravoShinji.jpg" alt="Felicitaciones">
                <h2>¡Felicidades!</h2>
                <p>Bravo shinji. ¡Sigue así!</p>
            `;
        await modificarDuelo(finUsuario, idUsuario)
        await sumarPuntos(idUsuario, 2, 3)
    } else if (finBot == 3) {
        html.innerHTML = `
                <img src="./../assets/pusheen-harry-potter.gif" alt="Lo siento">
                <h2>Lo siento</h2>
                <p>AAAAAAAAAAAAAAAAAAAAAAA</p>
            `;
        await modificarDuelo(finUsuario, idUsuario)
    }
}

boton.addEventListener('click', () => {
    window.location.href = 'inicio.html';
});

async function modificarDuelo(finUsuario, idUsuario) {
    let dueloM
    if (finUsuario == 3) {
        dueloM = {
            idUsuario: idUsuario,
            ganador: true
        }
    } else {
        dueloM = {
            idUsuario: idUsuario,
            ganador: false
        }
    }
    const dueloEnCurso = await getDueloEnCurso(idUsuario)
    await putDuelo(dueloEnCurso.id, dueloM)
}
mensaje();