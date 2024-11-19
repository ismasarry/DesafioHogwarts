//Raul Gutierrez
import { getBuscarUsuario } from "../api/usuarioAPI.js"
import { getBuscarCasa } from "../api/casaAPI.js"

const verUsuario = async () => {
    const idUsuario = sessionStorage.getItem("userId")
    const usuario = await getBuscarUsuario(idUsuario)
    const casa = await getBuscarCasa(usuario.Usuario.idCasa)
    console.log(casa)

    const fotoCasa = document.getElementById("fotoCasa")
    const puntosCasa = document.getElementById("puntosCasa")
    const nivel = document.getElementById("nivel")
    const exp = document.getElementById("exp")

    fotoCasa.src = './../assets/' + casa.casa.nombre + '.png'

    puntosCasa.textContent = `Puntos de la Casa: ${casa.casa.puntos}`
    nivel.textContent = `Nivel del Usuario: ${usuario.Usuario.nivel}`
    exp.textContent = `Experiencia Total: ${usuario.Usuario.exp}`
}

verUsuario()

//Jaime Ortega
document.addEventListener('DOMContentLoaded', async () => {
    const rol = sessionStorage.getItem('rol')

    try {
        if (rol === 'Dumbledore') {
            const module = await import('../components/sideBarDumbledore.js')
            module.crearBarraLateral()
        } else if (rol === 'admin') {
            const module = await import('../components/sideBarAdmin.js')
            module.crearBarraLateral()
        } else if (rol === 'profesor') {
            const module = await import('../components/sideBarProfesor.js')
            module.crearBarraLateral()
        } else if (rol === 'alumno') {
            const module = await import('../components/sideBarAlumno.js')
            module.crearBarraLateral()
        } else {
            console.error('Rol no reconocido')
        }
    } catch (error) {
        console.error('Error al cargar el módulo de la barra lateral:', error)
    }
})