import { constantes } from "../classes/constantes.js";

document.addEventListener('DOMContentLoaded', function () {
  console.log("El DOM ha sido completamente cargado");

  const form = document.querySelector('.login-form');
  console.log("Formulario de login seleccionado:", form);

  if (!form) {
    console.error("No se encontró el formulario de login. Revisa el selector.");
    return;
  }

  form.addEventListener('submit', async function (event) {
    event.preventDefault(); 
    console.log("Evento submit capturado.");

    const rutaLogIn = constantes.urlApi + constantes.log;
    console.log("Ruta para login:", rutaLogIn);

    const gmail = form.querySelector('input[type="text"]').value;
    const contrasena = form.querySelector('input[type="password"]').value;
    console.log("Datos capturados - Gmail:", gmail, "Contraseña:", contrasena);

    try {
      const response = await fetch(rutaLogIn, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          gmail: gmail, 
          contrasena: contrasena
        }),
      });

      console.log("Respuesta recibida del servidor:", response);

      const data = await response.json();
      console.log("Datos parseados desde la respuesta:", data);

      if (response.ok && data.success) {
        console.log("Inicio de sesión exitoso. ID del usuario:", data.data.id);

        sessionStorage.setItem('userId', data.data.id);
        sessionStorage.setItem('token', data.data.token); 

        console.log("Datos guardados en sessionStorage. Redirigiendo...");
        window.location.href = '../html/inicio.html'; 
      } else {
        console.warn("Inicio de sesión fallido. Mensaje del servidor:", data.message);
        alert(data.message || 'Error al iniciar sesión');
      }
    } catch (error) {
      console.error("Error en la solicitud fetch:", error);
      alert('Hubo un problema con la solicitud. Intenta de nuevo más tarde.');
    }
  });
});
