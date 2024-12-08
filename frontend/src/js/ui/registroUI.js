//Jaime Ortega
import { postFormUsuario } from "../api/usuarioAPI.js"
import { getTodosCasas, getBuscarIntegrantesCasa } from "../api/casaAPI.js"
import { constantes } from "../classes/constantes.js"

const nombreInput = document.getElementById('nombre')
const gmailInput = document.getElementById('gmail')
const contrasenaInput = document.getElementById('contrasena')
const confirm_contrasenaInput = document.getElementById('confirm_contrasena')
const prioridadInput = document.getElementById('prioridad')

const validacionNombre = (nombre) => {
    const errores = []

    if (!constantes.nombreRegex.test(nombre)) {
        errores.push("El nombre debe tener entre 2 y 50 caracteres, solo letras y espacios.")
    }

    return errores
}

const validacionGmail = (gmail) => {
    const errores = []

    if (!constantes.gmailRegex.test(gmail)) {
        errores.push("El correo debe ser un correo válido de Gmail ( ejemplo@gmail.com ).")
    }

    return errores
}

const validacionContrasena = (contrasena) => {
    const errores = []

    if (!/.{8,}/.test(contrasena)) {
        errores.push("Debe tener al menos 8 caracteres.")
    }
    if (!/[A-Z]/.test(contrasena)) {
        errores.push("Debe contener al menos una letra mayúscula.")
    }
    if (!/[a-z]/.test(contrasena)) {
        errores.push("Debe contener al menos una letra minúscula.")
    }
    if (!/\d/.test(contrasena)) {
        errores.push("Debe contener al menos un número.")
    }
    if (!/[\W_]/.test(contrasena)) {
        errores.push("Debe contener al menos un carácter especial (por ejemplo: !, @, #, ...).")
    }

    return errores
}

const mostrarErrores = (errores, input) => {
    let errorMessage = input.nextElementSibling

    if (errorMessage && errorMessage.classList && errorMessage.classList.contains('error-message')) {
        errorMessage.remove()
    }

    if (errores.length > 0) {
        errorMessage = document.createElement('div')
        errorMessage.classList.add('error-message')
        errorMessage.style.color = 'red'
        errorMessage.innerHTML = errores.join('<br>')
        input.insertAdjacentElement('afterend', errorMessage)
    }
}

const registro = async () => {
    const form = document.getElementById('registro')
    let errorMessage

    nombreInput.addEventListener('input', () => {
        const nombre = nombreInput.value
        const errores = validacionNombre(nombre)
        mostrarErrores(errores, nombreInput)
    })

    gmailInput.addEventListener('input', () => {
        const gmail = gmailInput.value
        const errores = validacionGmail(gmail)
        mostrarErrores(errores, gmailInput)
    })

    contrasenaInput.addEventListener('input', () => {
        const contrasena = contrasenaInput.value
        const errores = validacionContrasena(contrasena)
        mostrarErrores(errores, contrasenaInput)
    })

    form.addEventListener('submit', async (e) => {
        e.preventDefault()

        const formData = new FormData(form)
        const contrasena = formData.get('contrasena')
        const confirm_contrasena = formData.get('confirm_contrasena')
        const casasSeleccionadas = formData.getAll('prioridad')

        if (contrasena !== confirm_contrasena) {
            if (!errorMessage) {
                errorMessage = document.createElement('span')
                errorMessage.style.color = 'red'
                errorMessage.textContent = 'Las contraseñas no coinciden.'
                confirm_contrasenaInput.insertAdjacentElement('afterend', errorMessage)
            }
            return
        } else {
            if (errorMessage) {
                form.removeChild(errorMessage)
                errorMessage = null
            }
        }

        if (casasSeleccionadas.length > 0 && casasSeleccionadas.length < 4) {
            if (!errorMessage) {
                errorMessage = document.createElement('span')
                errorMessage.style.color = 'red'
                errorMessage.textContent = 'Seleccione todas las casas en orden de prioridad de mayor ↑ a menor ↓ o quite todas y que el sombrero seleccionador decida tu destino.'
                prioridadInput.insertAdjacentElement('afterend', errorMessage)
            }
            return
        } else {
            if (errorMessage) {
                form.removeChild(errorMessage)
                errorMessage = null
            }
        }

        const usuarioCreado = {
            nombre: formData.get('nombre'),
            gmail: formData.get('gmail'),
            contrasena: contrasena,
            confirm_contrasena: confirm_contrasena,
            idCasa: await gorroSeleccionador(),
            foto: formData.get('foto')
        }

        try {
            const resultado = await postFormUsuario(usuarioCreado)
            window.location.href = '../html/login.html'
            form.reset()
        } catch (err) {
            console.error('Error al registrar el usuario:', err.message)
        }
    })
}

const cargarCasas = async () => {
    const select = document.getElementById('casa')

    try {
        const casas = await getTodosCasas()
        casas.forEach(casa => {
            const option = document.createElement('option')
            option.value = casa.id
            option.textContent = casa.nombre
            select.appendChild(option)
        })
    } catch (err) {
        console.error('Error al cargar las casas:', err.message)
    }
}

const addListaPrioridad = () => {
    const select = document.getElementById('casa')
    const prioridad = document.getElementById('prioridad')

    const selectedOptions = Array.from(select.selectedOptions)

    selectedOptions.forEach(option => {
        prioridad.appendChild(option)
    })
}

const removeListaPrioridad = (event) => {
    const select = document.getElementById('casa')
    const prioridad = document.getElementById('prioridad')

    const selectedOption = event.target.value

    if (selectedOption) {
        const optionToMove = Array.from(prioridad.options).find(option => option.value === selectedOption)
        prioridad.removeChild(optionToMove)
        select.appendChild(optionToMove)
    }
}

const gorroSeleccionador = async () => {
    const casas = document.getElementById('casa').options
    const prioridad = document.getElementById('prioridad')
    const seleccionados = Array.from(prioridad.selectedOptions)

    let casaSeleccionada

    if (seleccionados.length === 0) {
        let casaMasIntegrantes = null
        let casaIntegrantes = Infinity
        let casasEmpatadas = []

        for (let c of casas) {
            const respuesta = await getBuscarIntegrantesCasa(c.value)
            const conteoIntegrantes = respuesta.conteoUsuarios

            if (conteoIntegrantes < casaIntegrantes) {
                casaIntegrantes = conteoIntegrantes
                casaMasIntegrantes = c.value
                casasEmpatadas = [c.value]
            } else if (conteoIntegrantes === casaIntegrantes) {
                casasEmpatadas.push(c.value)
            }
        }

        if (casasEmpatadas.length > 0) {
            casaSeleccionada = casasEmpatadas[Math.floor(Math.random() * casasEmpatadas.length)]
        } else {
            casaSeleccionada = casaMasIntegrantes
        }
    }

    const alea = Math.floor(Math.random() * 100) + 1

    if (seleccionados.length === 4) {
        if (alea <= 40) {
            casaSeleccionada = seleccionados[0].value
        } else if (alea > 40 && alea <= 65) {
            casaSeleccionada = seleccionados[1].value
        } else if (alea > 65 && alea <= 85) {
            casaSeleccionada = seleccionados[2].value
        } else {
            casaSeleccionada = seleccionados[3].value
        }
    }
    return casaSeleccionada
}

export {
    validacionNombre,
    validacionGmail,
    validacionContrasena,
    mostrarErrores
}

const init = () => {
    cargarCasas()
    document.getElementById('casa').addEventListener('change', addListaPrioridad)
    document.getElementById('prioridad').addEventListener('click', removeListaPrioridad)
    registro()
}

init()
