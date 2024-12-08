import { constantes } from "./constantes"

//Jaime Ortega
export const validacionNombre = (nombre) => {
    const errores = []

    if (!constantes.nombreRegex.test(nombre)) {
        errores.push("El nombre debe tener entre 2 y 50 caracteres, solo letras y espacios.")
    }

    return errores
}

export const validacionGmail = (gmail) => {
    const errores = []

    if (!constantes.gmailRegex.test(gmail)) {
        errores.push("El correo debe ser un correo válido de email ( ejemplo@ej.ej ).")
    }

    return errores
}

export const validacionContrasena = (contrasena) => {
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

export const mostrarErrores = (errores, input) => {
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