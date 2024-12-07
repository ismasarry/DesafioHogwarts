//Raul Gutierrez
import { getTurnoDuelosPorDuelo, getDueloEnCurso, putDuelo } from "../api/duelosAPI";
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

async function sumarPuntos(idUsuario, exp, expCasa) {
    const usuario = await getBuscarUsuario(idUsuario)
    const casa = await getBuscarCasa(usuario.Usuario.idCasa)
    const expSubido = usuario.Usuario.exp + exp
    const puntosSubidos = casa.casa.puntos + expCasa
    let nivelSubido = 0

    if (expSubido > 0 && expSubido <= 50) {
        nivelSubido = 1
    }else if (expSubido > 51 && expSubido <= 150) {
        nivelSubido = 2
    }else if (expSubido > 151 && expSubido <= 300) {
        nivelSubido = 3
    }else if (expSubido > 301 && expSubido <= 500) {
        nivelSubido = 4
    }else if (expSubido > 501) {
        nivelSubido = 5
    }

    const usu = {
        nombre : usuario.Usuario.nombre,
        gmail :  usuario.Usuario.gmail,
        idCasa : usuario.Usuario.idCasa,
        nivel : nivelSubido,
        exp : expSubido,
        foto : usuario.Usuario.foto,
        activo : usuario.Usuario.activo
    }

    const casaNueva = {
        nombre : casa.casa.nombre,
        puntos : puntosSubidos
    }

    await putUsuario (idUsuario, usu)
    await putCasa (casa.casa.id, casaNueva)
}
mensaje();