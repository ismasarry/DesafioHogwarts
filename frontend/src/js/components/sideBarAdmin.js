//Jaime Ortega
export const crearBarraLateral = () => {
    const wrapper = document.getElementById('wrapper')

    const barraLateralHTML = `
            <div id="sidebar-wrapper">
                <div class="list-group list-group-flush my-3">
                    <a href="#" class="list-group-item list-group-item-action bg-transparent second-tex fw-bold" 
                    data-bs-toggle="collapse" data-bs-target="#administracionCollapse" aria-expanded="false">
                        <i class="fas fa-cogs me-2"></i>Administración
                        <i class="fas fa-chevron-down ms-auto"></i>
                    </a>
                    <div class="collapse" id="administracionCollapse">
                        <!-- Aquí se añadirán las gestiones del admin -->
                    </div>
                </div>
            </div>
        `

    if (!document.getElementById('sidebar-wrapper')) {
        wrapper.insertAdjacentHTML("beforeend", barraLateralHTML)
    }

    const administracionCollapse = document.getElementById('administracionCollapse')
    let barraLateralAdmin = `
            <a href="../html/gestionUsuario.html" class="list-group-item list-group-item-action fw-bold">
                <i class="far fa-keyboard me-2 ms-3">Gestión usuarios</i>
            </a>
            <a href="../html/gestionAsignatura.html" class="list-group-item list-group-item-action fw-bold">
                <i class="far fa-keyboard me-2 ms-3">Gestión asignaturas</i>
            </a>
        `

    administracionCollapse.innerHTML = barraLateralAdmin
}

document.addEventListener('headerTerminado', () => {
    crearBarraLateral()
    const openSidebarButton = document.getElementById('openSidebar')
    const wrapper = document.getElementById('wrapper')

    if (openSidebarButton) {
        openSidebarButton.addEventListener("click", function () {
            wrapper.classList.toggle("sidebar-open")
        })

        document.addEventListener("click", (event) => {
            if (!wrapper.contains(event.target) && !event.target.matches('#openSidebar')) {
                wrapper.classList.remove("sidebar-open")
            }
        })
    }
})
