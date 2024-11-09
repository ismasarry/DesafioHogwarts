//Raul Gutierrez
import { getBuscarUsuario } from "../api/usuarioAPI.js"
import { getBuscarCasa } from "../api/casaAPI.js"

verUsuario()

async function verUsuario() {
    const idUsuario = 1//sessionStorage.getItem("id")//id usuario
    const usuario = await getBuscarUsuario(idUsuario)
    const casa = await getBuscarCasa(1)//usuario.idCasa)
    console.log(casa)

    const fotoCasa = document.getElementById("fotoCasa")
    const puntosCasa = document.getElementById("puntosCasa")
    const nivel = document.getElementById("nivel")
    const exp = document.getElementById("exp")
    
    fotoCasa.src = './../assets/' + casa.nombre + '.png'
    
    puntosCasa.textContent = `Puntos de la Casa: ${casa.puntos}`
    nivel.textContent = `Nivel del Usuario: ${usuario.nivel}`
    exp.textContent = `Experiencia Total: ${usuario.exp}`
}