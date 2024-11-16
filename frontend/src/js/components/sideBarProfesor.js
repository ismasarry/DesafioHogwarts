//Raul Gutierrez
import { getTodosAsignaturas } from "../api/asignaturaAPI.js"
import { getBuscarAsignaturaProfesorPorProfesor } from "../api/asignaturaProfesorAPI.js"

/*document.addEventListener("headerTerminado", () => {
    const openSidebarButton = document.getElementById('openSidebar')
    const wrapper = document.getElementById('wrapper')
    console.log(openSidebarButton)
    crearBarraLateral()
    if (openSidebarButton) {
        openSidebarButton.addEventListener("click", function () {
            wrapper.classList.toggle("sidebar-open")
        })
    }
})


const crearBarraLateral = async () => {

    const wrapper = document.getElementById('wrapper')
    
    const barraLateralHTML = `
      <div id="sidebar-wrapper">
        <div class="list-group list-group-flush my-3">
          <a href="#" class="list-group-item list-group-item-action bg-transparent second-tex fw-bold"
              data-bs-toggle="collapse" data-bs-target="#asignaturaCollapse" aria-expanded="false">
              <i class="fas fa-cogs me-2"></i>Asignatura
              <i class="fas fa-chevron-down ms-auto"></i>
          </a>
          <div class="collapse" id="asignaturaCollapse">
            <!-- Aquí se añadirán las asignaturas -->
          </div>
        </div>
      </div>
    `
    wrapper.insertAdjacentHTML("afterend", barraLateralHTML)

    const asignaturaCollapse = document.getElementById('asignaturaCollapse')
    let barraLateralAsig = ``

    const idProfesor = sessionStorage.getItem("userId")
    const asignaturas = await getTodosAsignaturas()
    const asignaturasProfesor = await getBuscarAsignaturaProfesorPorProfesor(idProfesor)
    console.log(asignaturas)
    console.log(asignaturasProfesor)

    for (let i = 0; i < asignaturasProfesor.length; i++) {
        let nombreAsig = asignaturasProfesor[i].idAsignatura
        barraLateralAsig += `
            <a href="${asignaturas[nombreAsig].nombre}.html" class="list-group-item list-group-item-action fw-bold">
                <i class="far fa-keyboard me-2 ms-3"></i> ${asignaturas[nombreAsig].nombre}
            </a>
        `
    }
    asignaturaCollapse.innerHTML = barraLateralAsig
}*/

document.addEventListener('headerTerminado', () => {
    crearBarraLateral()
    const openSidebarButton = document.getElementById('openSidebar');
    const wrapper = document.getElementById('wrapper'); // Contenedor principal

    if (openSidebarButton) {
        openSidebarButton.addEventListener("click", function () {
            wrapper.classList.toggle("sidebar-open"); // Alterna la clase
        });

        // Cierra la barra lateral si haces clic fuera de ella
        document.addEventListener("click", (event) => {
            if (!wrapper.contains(event.target) && !event.target.matches('#openSidebar')) {
                wrapper.classList.remove("sidebar-open");
            }
        });
    } else {
        console.error("El botón 'openSidebar' no se encontró después de cargar la cabecera.");
    }
});

const crearBarraLateral = async () => {
    const wrapper = document.getElementById('wrapper');
    
    const barraLateralHTML = `
      <div id="sidebar-wrapper">
        <div class="list-group list-group-flush my-3">
          <a href="#" class="list-group-item list-group-item-action bg-transparent second-tex fw-bold"
              data-bs-toggle="collapse" data-bs-target="#asignaturaCollapse" aria-expanded="false">
              <i class="fas fa-cogs me-2"></i>Asignatura
              <i class="fas fa-chevron-down ms-auto"></i>
          </a>
          <div class="collapse" id="asignaturaCollapse">
            <!-- Aquí se añadirán las asignaturas -->
          </div>
        </div>
      </div>
    `;
    
    // Solo insertar la barra lateral si no existe ya
    if (!document.getElementById('sidebar-wrapper')) {
        wrapper.insertAdjacentHTML("beforeend", barraLateralHTML);
    }

    // Agregar asignaturas (contenido dinámico)
    const asignaturaCollapse = document.getElementById('asignaturaCollapse');
    let barraLateralAsig = ``;

    const idProfesor = sessionStorage.getItem("userId");
    const asignaturas = await getTodosAsignaturas();
    const asignaturasProfesor = await getBuscarAsignaturaProfesorPorProfesor(idProfesor);

    for (let i = 0; i < asignaturasProfesor.length; i++) {
        let nombreAsig = asignaturasProfesor[i].idAsignatura;
        barraLateralAsig += `
            <a href="${asignaturas[nombreAsig].nombre}.html" class="list-group-item list-group-item-action fw-bold">
                <i class="far fa-keyboard me-2 ms-3"></i> ${asignaturas[nombreAsig].nombre}
            </a>
        `;
    }
    asignaturaCollapse.innerHTML = barraLateralAsig;
};

