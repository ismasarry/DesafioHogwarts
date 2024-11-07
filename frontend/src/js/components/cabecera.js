const headerContainer = document.getElementById("header-container")

const usuario = "Juan"//sessionStorage.getItem("usuario")

headerContainer.innerHTML = `
  <!-- Cabecera -->
  <header class="header p-3 d-flex align-items-center justify-content-between shadow" style="background-color: #007bff; color: white;">
    <div class="d-flex align-items-center">
      <span class="h4 mb-0 me-3 text-white">Dashboard</span>
      <button class="btn" style="background-color: #0056b3; color: white;">Ranking de Casas</button>
    </div>
    
    <div class="dropdown">
      <span class="me-2 text-white">${usuario}</span>
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
          <h5 class="modal-title" id="modalPerfilLabel">Perfil de ${usuario}</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Cerrar"></button>
        </div>
        <div class="modal-body">
          <!--Aqui vendrá el formulario del perfil-->
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-primary" data-bs-dismiss="modal" id="guardarCambios">Guardar cambios</button>
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
        </div>
      </div>
    </div>
  </div>

  
`;

document.getElementById("botonPerfil").addEventListener("click", () => {
    const modalPerfil = new bootstrap.Modal(document.getElementById('modalPerfil'))
    modalPerfil.show()
})

document.getElementById("guardarCambios").addEventListener("click", () => {
    //Editar el usuario
})

document.getElementById("botonCerrarSesion").addEventListener("click", () => {
    //sessionStorage.clear()
    console.log("sesion cerrada")
    window.location.href = "./../index.html"
})
