//Raul Gutierrez

import { getBuscarUsuario, putUsuario } from "../api/usuarioAPI.js"

document.addEventListener("DOMContentLoaded", async () => {
  let usuario

  const ensenarCabecera = async () => {
    const headerContainer = document.getElementById("header-container")
  
    const idUsuario = sessionStorage.getItem("userId")
    usuario = await getBuscarUsuario(idUsuario)
    console.log(usuario.Usuario)

    if (usuario) {
      headerContainer.innerHTML = `
        <!-- Cabecera -->
        <header class="header p-3 d-flex align-items-center justify-content-between shadow" style="background-color: #007bff; color: white;">
          <div class="d-flex align-items-center">
            <button id="openSidebar" class="icon-desplegable btn btn-outline-light me-3" style="font-size: 1.2em;">☰</button>
            <a class="h4 mb-0 me-3 text-white" href="inicio.html">Hogwarts</a>
            <button class="btn" onclick="location.href='ranking.html'" style="background-color: #0056b3; color: white;">Ranking de Casas</button>
          </div>
          
          <div class="dropdown">
            <span class="me-2 text-white">${usuario.Usuario.nombre}</span>
            <img src="./../assets/pruebaHarry.webp" alt="Imagen de usuario" class="user-img dropdown-toggle" id="userDropdown" data-bs-toggle="dropdown" aria-expanded="false" style="width: 40px; height: 40px; border-radius: 50%; border: 2px solid white; cursor: pointer;">
            <ul class="dropdown-menu dropdown-menu-end" aria-labelledby="userDropdown">
              <li><a class="dropdown-item" href="#" id="botonPerfil">Perfil</a></li>
              <li><a class="dropdown-item" href="#" id="botonCerrarSesion">Cerrar sesión</a></li>
            </ul>
          </div>
        </header>
        
        <!-- Modal de Perfil -->
        <div class="modal fade" id="modalPerfil" tabindex="-1" aria-labelledby="modalPerfilLabel" aria-hidden="true">
          <div class="modal-dialog">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title" id="modalPerfilLabel">Perfil de ${usuario.Usuario.nombre}</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Cerrar"></button>
              </div>
              <div class="modal-body">
                <form id="perfilUsuarioForm">
                  <div class="col-md-6">
                    <label for="nombre" class="form-label">Nombre:</label>
                    <input class="form-control" type="text" id="nombre" name="nombre">
                  </div>
                  
                  <div class="col-md-6">
                    <label class="form-label" for="gmail">Correo Electrónico:</label>
                    <input class="form-control" type="email" id="gmail" name="gmail">
                  </div>

                  <div class="col-md-6">
                    <label for="contrasena" class="form-label">Contraseña:</label>
                    <input class="form-control" type="password" id="contrasena" name="contrasena">
                  </div>
                </form>
              </div>
              <div class="modal-footer">
                <button type="button" class="btn btn-primary" data-bs-dismiss="modal" id="guardarCambios">Guardar cambios</button>
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
              </div>
            </div>
          </div>
        </div>
      `
    } else {
      console.error("No se pudo cargar la información del usuario.");
    }

    const event = new Event('headerTerminado');
    document.dispatchEvent(event);
    
    editarPerfil(idUsuario)
  }

  await ensenarCabecera()

  document.getElementById("header-container").addEventListener("click", (event) => {
    if (event.target && event.target.id === "botonPerfil") {
      if (usuario) {
        document.getElementById("nombre").value = usuario.Usuario.nombre
        document.getElementById("gmail").value = usuario.Usuario.gmail
        const modalPerfil = new bootstrap.Modal(document.getElementById('modalPerfil'))
        modalPerfil.show()
      }
    }
  });

  document.getElementById("header-container").addEventListener("click", (event) => {
    if (event.target && event.target.id === "botonCerrarSesion") {
      console.log("Sesión cerrada")
      window.location.href = "./../index.html";
    }
  });


  async function editarPerfil(id) {
    const modificarBtn = document.getElementById('guardarCambios')
    const usuario = await getBuscarUsuario(id)
    const usuarioU = usuario.Usuario

    if (modificarBtn) {

        modificarBtn.addEventListener('click', async () => {
            try {

                const modalElement = document.getElementById(`modalPerfil`)
                const nombreUsu = modalElement.querySelector(`#nombre`).value
                const gmailUsu = modalElement.querySelector(`#gmail`).value
                const contraUsu = modalElement.querySelector(`#contrasena`).value

                let usuarioObjeto

                if (contraUsu.trim() === "") {
                  usuarioObjeto = {
                    nombre: nombreUsu,
                    gmail: gmailUsu,
                    idCasa: usuarioU.idCasa,
                    nivel: usuarioU.nivel,
                    exp: usuarioU.exp,
                    foto: usuarioU.foto,
                    activo: usuarioU.activo
                  }
                }else{
                  usuarioObjeto = {
                    nombre: nombreUsu,
                    gmail: gmailUsu,
                    contrasena: contraUsu,
                    idCasa: usuarioU.idCasa,
                    nivel: usuarioU.nivel,
                    exp: usuarioU.exp,
                    foto: usuarioU.foto,
                    activo: usuarioU.activo
                  }
                }
                await putUsuario(id, usuarioObjeto)

                const modal = new bootstrap.Modal(modalElement)
                modal.hide();
                location.reload()
            } catch (error) {
                console.error('Error al confirmar la modificación:', error)
            }
        });
    }
  }
});
