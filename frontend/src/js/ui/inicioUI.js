//Raul Gutierrez
import { getBuscarUsuario } from "../api/usuarioAPI.js"
import { getBuscarCasa } from "../api/casaAPI.js"

verUsuario()

async function verUsuario() {
    const idUsuario = 1//sessionStorage.getItem("id") Falta la parte del login para ver el id del usuario logeado
    const usuario = await getBuscarUsuario(idUsuario)
    const casa = await getBuscarCasa(usuario.Usuario.idCasa)

    const fotoCasa = document.getElementById("fotoCasa")
    const puntosCasa = document.getElementById("puntosCasa")
    const nivel = document.getElementById("nivel")
    const exp = document.getElementById("exp")
    
    fotoCasa.src = './../assets/' + casa.casa.nombre + '.png'
    
    puntosCasa.textContent = `Puntos de la Casa: ${casa.casa.puntos}`
    nivel.textContent = `Nivel del Usuario: ${usuario.Usuario.nivel}`
    exp.textContent = `Experiencia Total: ${usuario.Usuario.exp}`
}