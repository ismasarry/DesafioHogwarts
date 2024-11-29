//Raul Gutierrez
import { getTurnoDuelosPorDuelo } from "../api/duelosAPI";

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

function mensaje() {
    if (finUsuario == 3) {
        html.innerHTML = `
                <img src="./../assets/bravoShinji.jpg" alt="Felicitaciones">
                <h2>¡Felicidades!</h2>
                <p>Bravo shinji. ¡Sigue así!</p>
            `;
    } else if (finBot == 3) {
        html.innerHTML = `
                <img src="./../assets/fallo.jpeg" alt="Lo siento">
                <h2>Lo siento</h2>
                <p>¿Que hiciste viktor? ¡Inténtalo de nuevo!</p>
            `;
    }
}

boton.addEventListener('click', () => {
    window.location.href = 'inicio.html';
});

mensaje();