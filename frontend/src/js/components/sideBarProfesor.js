//Raul Gutierrez
import { getTodosAsignaturas } from "../api/asignaturaAPI.js"
import { getBuscarAsignaturaProfesorPorProfesor } from "../api/asignaturaProfesorAPI.js"

/*const crearBarraLateral = async () => {
    const wrapper = document.getElementById('wrapper')
    const idProfesor = sessionStorage.getItem("userId")
    const asignaturas = await getTodosAsignaturas()
    const asignaturasProfesor = await getBuscarAsignaturaProfesorPorProfesor(idProfesor)

    const barraLateral = `
        <div id="sidebar-wrapper">
          <div class="list-group list-group-flush my-3">

              <a href="#" class="list-group-item list-group-item-action bg-transparent second-tex fw-bold"
                  data-bs-toggle="collapse" data-bs-target="#asignaturaCollapse" aria-expanded="false">
                  <i class="fas fa-cogs me-2"></i>Asignatura
                  <i class="fas fa-chevron-down ms-auto"></i>
              </a>

              <div class="collapse" id="asignaturaCollapse">
                
              </div>
          </div>
      </div>
    `
    wrapper.innerHTML = barraLateral

    const asignaturaCollapse = document.getElementById('asignaturaCollapse')

    let barraLateralAsig = ``

    for (let i = 0; i < asignaturasProfesor.length; i++) {
        let nombreAsig = asignaturasProfesor[0].idAsignatura
        barraLateralAsig =+ `
            <a href="${asignaturas[nombreAsig].nombre}.html" class="list-group-item list-group-item-action fw-bold">
                <i class="far fa-keyboard me-2 ms-3"></i> ${asignaturas[nombreAsig].nombre}
            </a>
        `
    }

    asignaturaCollapse.innerHTML = barraLateralAsig
}
crearBarraLateral()*/

document.getElementById('openSidebar').addEventListener("click", function () {
    //wrapper.classList.toggle("sidebar-open")
    crearBarraLateral()
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

    for (let i = 0; i < asignaturasProfesor.length; i++) {
        let nombreAsig = asignaturasProfesor[i].idAsignatura
        barraLateralAsig += `
            <a href="${asignaturas[nombreAsig].nombre}.html" class="list-group-item list-group-item-action fw-bold">
                <i class="far fa-keyboard me-2 ms-3"></i> ${asignaturas[nombreAsig].nombre}
            </a>
        `
    }
    asignaturaCollapse.innerHTML = barraLateralAsig
}

await crearBarraLateral()