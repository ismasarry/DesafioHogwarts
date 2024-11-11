document.addEventListener('DOMContentLoaded', function () {
    const form = document.querySelector('.login-form');
    
    form.addEventListener('submit', async function (event) {
      event.preventDefault(); 

      const gmail = form.querySelector('input[type="text"]').value;
      const contrasena = form.querySelector('input[type="password"]').value;

      const response = await fetch('http://127.0.0.1:8000/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          gmail: gmail, 
          contrasena: contrasena
        }),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        sessionStorage.setItem('userId', data.data.id);
        sessionStorage.setItem('token', data.data.token); 

        
        window.location.href = '/dashboard.html'; 
      } else {
        
        alert(data.message || 'Error al iniciar sesión');
      }
    });
  });