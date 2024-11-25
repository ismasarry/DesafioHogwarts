//Jaime Ortega
import { mostrarUsuariosRolPorIdRol } from "../api/usuarioRolAPI.js"
import { constantes } from "../classes/constantes.js"
import { getTodosAsignaturas, getBuscarAsignatura, postAsignatura, putAsignatura, deleteAsignatura } from "../api/asignaturaAPI.js"
import { getTodosAsignaturaProfesores, postAsignaturaProfesor, deleteAsignaturaProfesor } from "../api/asignaturaProfesorAPI.js"
import { getTodosAsignaturaAlumnos, postAsignaturaAlumno, deleteAsignaturaAlumno } from "../api/asignaturaAlumnoAPI.js"
import { cargarSideBar } from "../components/cargarSideBar.js"

await cargarSideBar()

const init = async () => {
    const tabla = $('#asignaturas').DataTable()
    const asignaturas = await getTodosAsignaturas() || []
    const profesoresData = await mostrarUsuariosRolPorIdRol(3) || {}
    const profesores = profesoresData.usuarios || []
    console.log('profesores:', profesores)
    const alumnosData = await mostrarUsuariosRolPorIdRol(4) || {}
    const alumnos = alumnosData.usuarios || []
    console.log('alumnos:', alumnos)
    const profesorAsignatura = await getTodosAsignaturaProfesores() || []
    console.log('profesorAsignatura:', profesorAsignatura)
    const alumnosAsignatura = await getTodosAsignaturaAlumnos() || []
    console.log('alumnosAsignatura:', alumnosAsignatura)
    

    for (const asig of asignaturas) {
        const profesoresImparten = []
        const alumnosAsisten = []

        for (const profe of profesores) {
            for (const profeAsig of profesorAsignatura) {
                if (profe.id === profeAsig.idProfesor) {
                    profesoresImparten.push(profe)
                }
            }
        }

        for (const alumn of alumnos) {
            for (const alumnAsig of alumnos) {
                if (alumn.id === alumnAsig.idAlumno) {
                    alumnosAsisten.push(alumn)
                }
            }
        }

        const row = tabla.row.add([
            asig.nombre,
            profesoresImparten.map(profe => profe.nombre).join(','),
            alumnosAsisten.map(alumn => alumn.nombre).join(','),
            `<button class='btn-editar btn btn-primary btn-sm' data-bs-toggle='modal' data-bs-target='#editModal${asig.id}'><i class='fas fa-edit'></i>Editar</button>` +
            `<button class='btn-eliminar btn btn-danger btn-sm' data-bs-toggle='modal' data-bs-target='#deleteModal${asig.id}'><i class='fas fa-trash-alt'></i>Eliminar</button>`
        ]).draw()
    }
}
init()
