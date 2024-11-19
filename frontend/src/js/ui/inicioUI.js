//Raul Gutierrez
import { getBuscarUsuario } from "../api/usuarioAPI.js"
import { getBuscarCasa } from "../api/casaAPI.js"

verUsuario()

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

//Jaime Ortega
document.addEventListener('DOMContentLoaded', () => {
    const rol = sessionStorage.getItem('rol')

    if (rol === 'Dumbledore') {
        import('../components/sideBarDumbledore.js').then(module => {
            module.crearBarraLateral()
        })
    } else if (rol === 'admin') {
        import('../components/sideBarAdmin.js').then(module => {
            module.crearBarraLateral()
        })
    } else if (rol === 'profesor') {
        import('../components/sideBarProfesor.js').then(module => {
            module.crearBarraLateral()
        })
    } else if (rol === 'alumno') {
        import('../components/sideBarAlumno.js').then(module => {
            module.crearBarraLateral()
        })
    } else {
        console.error('Rol no reconocido')
    }
})