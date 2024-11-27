//Jaime Ortega
export const cargarSideBar = () => {
    document.addEventListener('DOMContentLoaded', () => {
        const rol = sessionStorage.getItem('rol')
    
        if (rol === 'Dumbledore') {
            import('../components/sideBarDumbledore.js').then(module => {
                module.crearBarraLateral()
            })
        } else if (rol === 'admin') {
            import('../components/sideBarAdmin.js').then(module => {
                module.crearBarraLateral()
            })
        } else if (rol === 'profesor') {
            import('../components/sideBarProfesor.js').then(module => {
                module.crearBarraLateral()
            })
        } else if (rol === 'alumno') {
            import('../components/sideBarAlumno.js').then(module => {
                module.crearBarraLateral()
            })
        } else {
            console.error('Rol no reconocido')
        }
    })
}