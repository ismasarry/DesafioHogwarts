//Raul Gutierrez
const headerContainer = document.getElementById("header-container")

const usuario = "Juan"//sessionStorage.getItem("usuario")
const usuarioCorreo = "CorreoPrueba@gmail.com"

headerContainer.innerHTML = `
  <!-- Cabecera -->
  <header class="header p-3 d-flex align-items-center justify-content-between shadow" style="background-color: #007bff; color: white;">
    <div class="d-flex align-items-center">
      <span class="h4 mb-0 me-3 text-white">Hogarwts</span>
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

        <form id="perfilUsuarioForm">
          <div class="col-md-6">
            <label for="nombre" class="form-label">Nombre:</label>
            <input class="form-control" type="text" id="nombre" name="nombre" required>
          </div>

          <div class="col-md-6">
            <label class="form-label" for="correo">Correo Electrónico:</label>
            <input class="form-control" type="email" id="correo" name="correo" required>
          </div>

          <div class="col-md-6">
            <label for="contrasena" class="form-label">Contraseña:</label>
            <input class="form-control" type="contrasena" id="contrasena" name="contrasena" required>
          </div>

          <div class="col-md-6">
            <label for="casa" class="form-label">Casa de Harry Potter:</label>
            <select id="casa" name="casa" class="form-select" required>
              <option value="gryffindor">Gryffindor</option>
              <option value="hufflepuff">Hufflepuff</option>
              <option value="ravenclaw">Ravenclaw</option>
              <option value="slytherin">Slytherin</option>
            </select>
          </div>

          <div class="col-md-12">
            <label for="foto" class="form-label">Foto:</label>
            <input class="form-control" type="file" id="foto" name="foto" accept="image/*">
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

  
`;

document.getElementById("botonPerfil").addEventListener("click", () => {

  document.getElementById("nombre").value = usuario //usuario.nombre
  document.getElementById("correo").value = usuarioCorreo //usuario.gmail
  //falta la foto y la casa

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
