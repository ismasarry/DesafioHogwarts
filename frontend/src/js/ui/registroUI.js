//Jaime Ortega
import { postFormUsuario } from "../api/usuarioAPI.js" 

const registro = () => {
    const form = document.getElementById('registro')
    let errorMessage
    
    form.addEventListener('submit', async (e) => {
        e.preventDefault()

        const formData = new FormData(form)
        const contrasena = formData.get('contrasena')
        const confirmContrasena = formData.get('confirm_contrasena')
        const casasSeleccionadas = formData.getAll('prioridad')

        if (contrasena !== confirmContrasena) {
            if (!errorMessage) {
                errorMessage = document.createElement('span')
                errorMessage.style.color = 'red'
                errorMessage.textContent = 'Las contraseñas no coinciden.' 
                form.insertBefore(errorMessage, form.querySelector('input[type="submit"]')) 
            }
            return
        } else {
            if (errorMessage) {
                form.removeChild(errorMessage) 
                errorMessage = null 
            }
        }

        if (casasSeleccionadas.length === 0) {
            if (!errorMessage) {
                errorMessage = document.createElement('span')
                errorMessage.style.color = 'red'
                errorMessage.textContent = 'Seleccione al menos una casa.'
                form.insertBefore(errorMessage, form.querySelector('input[type="submit"]'))
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
            foto: formData.get('foto'),
            casa: casasSeleccionadas,
            prioridad: Array.from(formData.getAll('prioridad'))
        }

        try {
            const resultado = await postFormUsuario(usuarioCreado)
            console.log('Usuario registrado:', resultado)
        } catch (err) {
            console.error('Error al registrar el usuario:', err.message)
        }
    })
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

document.getElementById('casa').addEventListener('change', addListaPrioridad)

document.getElementById('prioridad').addEventListener('click', removeListaPrioridad)
registro()