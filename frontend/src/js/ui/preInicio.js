//Jaime Ortega
import { mostrarRolesUsuario } from "../api/usuarioRolAPI"

const btnDumbledore = document.getElementById('btnDumbledore')
const btnAdministrador = document.getElementById('btnAdmin')
const btnProfesor = document.getElementById('btnProfesor')
const btnAlumno = document.getElementById('btnAlumno')

const init = () => {
    sessionStorage.removeItem('rol')
    const idUsuario = sessionStorage.getItem('userId')
    ocultarBotones()

    mostrarRolesUsuario(idUsuario).then(data => {
        const roles = data.roles

        roles.forEach(rol => {
            if (rol.nombre === "Dumbledore") {
                btnDumbledore.hidden = false
            } else if (rol.nombre === "admin") {
                btnAdministrador.hidden = false
            } else if (rol.nombre === "profesor") {
                btnProfesor.hidden = false
            } else if (rol.nombre === "alumno") {
                btnAlumno.hidden = false
            }
        })
    })
        .catch(error => console.error('Error al obtener los roles del usuario:', error))
}

export const ocultarBotones = () => {
    btnDumbledore.hidden = true
    btnAdministrador.hidden = true
    btnProfesor.hidden = true
    btnAlumno.hidden = true
}

btnDumbledore.addEventListener('click', function (e) {
    e.preventDefault()

    sessionStorage.setItem('rol', 'Dumbledore')
    window.location.href = '../html/inicio.html'
})

btnAdministrador.addEventListener('click', function (e) {
    e.preventDefault()

    sessionStorage.setItem('rol', 'admin')
    window.location.href = '../html/inicio.html'
})

btnProfesor.addEventListener('click', function (e) {
    e.preventDefault()

    sessionStorage.setItem('rol', 'profesor')
    window.location.href = '../html/inicio.html'
})

btnAlumno.addEventListener('click', function (e) {
    e.preventDefault()

    sessionStorage.setItem('rol', 'alumno')
    window.location.href = '../html/inicio.html'
})

init()