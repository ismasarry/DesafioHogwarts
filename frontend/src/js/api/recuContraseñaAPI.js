import { constantes } from "../classes/constantes";

//ismael sarrion
document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('correoForm');
    const mensajeDiv = document.getElementById('mensaje');

    form.addEventListener('submit', async function (e) {
        e.preventDefault(); 

        const gmail = document.getElementById('gmail').value;
        console.log("Correo a enviar:", gmail);  

        const rutaEnviarGmail = constantes.urlApi + constantes.enviarGmail;
        console.log("Ruta de la API:", rutaEnviarGmail);  

        const csrfToken = document.querySelector('input[name="_token"]').value; 
        console.log("Token CSRF:", csrfToken); 

        try {
            const response = await fetch(rutaEnviarGmail, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRF-TOKEN': csrfToken,
                },
                body: JSON.stringify({ gmail: gmail }) 
            });

            console.log("Respuesta del servidor:", response); 

            const data = await response.json();
            console.log("Datos de la respuesta:", data); 

            if (response.ok) {
                mensajeDiv.innerHTML = `<span style="color: green;">${data.mensaje}</span>`;
                console.log("Correo enviado con éxito");  
            } else {
                mensajeDiv.innerHTML = `<span style="color: red;">Error: ${data.message || 'No se pudo enviar el correo'}</span>`;
                console.log("Error en el envío del correo:", data.message);  
            }
        } catch (error) {
            mensajeDiv.innerHTML = `<span style="color: red;">Error de conexión</span>`;
            console.log("Error de red:", error); 
        }
        console.log('Respuesta del servidor:', response);
console.log('Texto de la respuesta:', await response.text());

    });
});
