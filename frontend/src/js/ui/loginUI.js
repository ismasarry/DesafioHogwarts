// ismael sarrion
import { constantes } from "../classes/constantes.js"

document.addEventListener('DOMContentLoaded', () => {
  console.log("El DOM ha sido completamente cargado")

  const form = document.querySelector('.login-form')
  console.log("Formulario de login seleccionado:", form)

  if (!form) {
    console.error("No se encontró el formulario de login. Revisa el selector.")
    return
  }

  form.addEventListener('submit', async function (event) {
    event.preventDefault() 
    console.log("Evento submit capturado.")

    // Obtener los valores de los campos
    const email = form.querySelector('input[type="email"]').value
    const contrasena = form.querySelector('input[type="password"]').value

    // Validación de correo electrónico
    if (!email || !/\S+@\S+\.\S+/.test(email)) {
      alert('Por favor, ingresa un correo electrónico válido.')
      return  // Detener la ejecución si el correo no es válido
    }

    // Validación de contraseña
    if (!contrasena) {
      alert('Por favor, ingresa tu contraseña.')
      return  // Detener la ejecución si la contraseña está vacía
    }

    console.log("Datos capturados - Correo:", email, "Contraseña:", contrasena)

    const rutaLogIn = constantes.urlApi + constantes.log
    console.log("Ruta para login:", rutaLogIn)

    try {
      const response = await fetch(rutaLogIn, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          gmail: email,  // Usamos 'gmail' aunque puede ser un email genérico
          contrasena: contrasena
        }),
      })

      console.log("Respuesta recibida del servidor:", response)

      const data = await response.json()
      console.log("Datos parseados desde la respuesta:", data)

      if (response.ok && data.success) {
        console.log("Inicio de sesión exitoso. ID del usuario:", data.data.id)

        sessionStorage.setItem('userId', data.data.id)
        sessionStorage.setItem('token', data.data.token) 

        console.log("Datos guardados en sessionStorage. Redirigiendo...")
        window.location.href = '../html/preInicio.html' 
      } else {
        console.warn("Inicio de sesión fallido. Mensaje del servidor:", data.message)
        alert(data.message || 'Error al iniciar sesión')
      }
    } catch (error) {
      console.error("Error en la solicitud fetch:", error)
      alert('Hubo un problema con la solicitud. Intenta de nuevo más tarde.')
    }
  })
})
