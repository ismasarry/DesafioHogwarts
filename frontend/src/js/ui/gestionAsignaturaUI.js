//Jaime Ortega
import { mostrarUsuariosRolPorIdRol } from "../api/usuarioRolAPI.js"
import { constantes } from "../classes/constantes.js"
import { getTodosAsignaturas, getBuscarAsignatura, postAsignatura, putAsignatura, deleteAsignatura } from "../api/asignaturaAPI.js"
import { getTodosAsignaturaProfesores, postAsignaturaProfesor, deleteAsignaturaProfesorEspecifico } from "../api/asignaturaProfesorAPI.js"
import { getTodosAsignaturaAlumnos, postAsignaturaAlumno, deleteAsignaturaAlumno } from "../api/asignaturaAlumnoAPI.js"
import { cargarSideBar } from "../components/cargarSideBar.js"

await cargarSideBar()

const init = async () => {
    const tabla = $('#asignaturas').DataTable()

    const asignaturas = await getTodosAsignaturas() || []

    const profesoresData = await mostrarUsuariosRolPorIdRol(3) || {}
    const profesores = profesoresData.usuarios || []
    const profesorAsignatura = await getTodosAsignaturaProfesores() || []

    const alumnosData = await mostrarUsuariosRolPorIdRol(4) || {}
    const alumnos = alumnosData.usuarios || []
    const alumnosAsignatura = await getTodosAsignaturaAlumnos() || []

    for (const asig of asignaturas) {
        const profesoresImparten = []
        const profesoresNoImparten = []

        const alumnosAsisten = []
        const alumnosNoAsisten = []

        let conteoProfesores = 0
        let conteoAlumnos = 0

        for (const profe of profesores) {
            let imparteAsignatura = false
            for (const profeAsig of profesorAsignatura) {
                if (profe.id === profeAsig.idProfesor && profeAsig.idAsignatura === asig.id) {
                    profesoresImparten.push(profe)
                    imparteAsignatura = true
                    conteoProfesores++
                }
            }
            if (!imparteAsignatura) {
                profesoresNoImparten.push(profe)
            }
        }

        for (const alumn of alumnos) {
            let asisteAsignatura = false
            for (const alumnAsig of alumnosAsignatura) {
                if (alumn.id === alumnAsig.idAlumno && alumnAsig.idAsignatura === asig.id) {
                    alumnosAsisten.push(alumn)
                    asisteAsignatura = true
                    conteoAlumnos++
                }
            }
            if (!asisteAsignatura) {
                alumnosNoAsisten.push(alumn)
            }
        }

        const row = tabla.row.add([
            asig.nombre,
            profesoresImparten.map(profe => profe.nombre).join(','),
            // conteoProfesores,
            // alumnosAsisten.map(alumn => alumn.nombre).join(','),
            conteoAlumnos,
            `<button class='btn-editar btn btn-primary btn-sm' data-bs-toggle='modal' data-bs-target='#editModal${asig.id}'><i class='fas fa-edit'></i>Editar</button>` +
            `<button class='btn-eliminar btn btn-danger btn-sm' data-bs-toggle='modal' data-bs-target='#deleteModal${asig.id}'><i class='fas fa-trash-alt'></i>Eliminar</button>`
        ]).draw()

        const editarModal = `
            <div class="modal" id="editModal${asig.id}">
                <div class="modal-dialog modal-md">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h4 class="modal-title">Editar asignatura ${asig.nombre}</h4>
                            <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
                        </div>
                        <div class="modal-body">
                            <ul class="nav nav-tabs">
                                <li class="nav-item">
                                    <a class="nav-link active" data-bs-toggle="tab" href="#asignatura${asig.id}">Asignatura</a>
                                </li>
                                <li class="nav-item">
                                    <a class="nav-link" data-bs-toggle="tab" href="#profesores${asig.id}">Profesores</a>
                                </li>
                                <li class="nav-item">
                                    <a class="nav-link" data-bs-toggle="tab" href="#alumnos${asig.id}">Alumnos</a>
                                </li>
                            </ul>
                            <div class="tab-content">
                                <div id="asignatura${asig.id}" class="tab-pane fade show active">
                                    <label for="nombre${asig.id}" class="form-label">Nombre de la Asignatura</label>
                                    <input type="text" id="nombre${asig.id}" class="form-control" value="${asig.nombre}"
                                    data-original='${asig.nombre}'>
                                </div>
                                <div id="profesores${asig.id}" class="tab-pane fade">
                                    <label class="form-label">Profesores</label>
                                    <div class='row'>
                                        <div class='col'>
                                            <h5>Imparten</h5>
                                            <ul class='no-puntos' id="imparten${asig.id}">
                                            ${profesoresImparten.length > 0 ? profesoresImparten.map(prof => `
                                                <li class='profesor' data-id='${prof.id}'>
                                                    ${prof.nombre ? prof.nombre : 'Nombre no disponible'}
                                                </li>`).join('') : '<li>Libre</li>'}
                                            </ul>
                                        </div>
                                        <div class='col'>
                                            <h5>No imparten</h5>
                                            <ul class="no-puntos" id="noImparten${asig.id}">
                                            ${profesoresNoImparten.length > 0 ? profesoresNoImparten.map(prof => `
                                                <li class="profesor" data-id="${prof.id}">
                                                    ${prof.nombre ? prof.nombre : 'Nombre no disponible'}
                                                </li>`).join('') : '<li>Libre</li>'}
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                                <div id="alumnos${asig.id}" class="tab-pane fade">
                                    <label class="form-label">Alumnos</label>
                                    <div class='row'>
                                        <div class='col'>
                                            <h5>Asisten</h5>
                                            <ul class='no-puntos' id="asisten${asig.id}">
                                            ${alumnosAsisten.length > 0 ? alumnosAsisten.map(al => `
                                                <li class='alumno' data-id='${al.id}'>
                                                    ${al.nombre ? al.nombre : 'Nombre no disponible'}
                                                </li>`).join('') : '<li>Libre</li>'}
                                            </ul>
                                        </div>
                                        <div class='col'>
                                            <h5>No asisten</h5>
                                            <ul class="no-puntos" id="noAsisten${asig.id}">
                                            ${alumnosNoAsisten.length > 0 ? alumnosNoAsisten.map(al => `
                                                <li class="profesor" data-id="${al.id}">
                                                    ${al.nombre ? al.nombre : 'Nombre no disponible'}
                                                </li>`).join('') : '<li>Libre</li>'}
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-danger" id="guardarBtn${asig.id}">Guardar cambios</button>
                        </div>
                    </div>
                </div>
            </div>
        `

        document.body.insertAdjacentHTML('beforeend', editarModal)

        const listaImparten = document.getElementById(`imparten${asig.id}`)
        const listaNoImparten = document.getElementById(`noImparten${asig.id}`)
        const listaAsisten = document.getElementById(`asisten${asig.id}`)
        const listaNoAsisten = document.getElementById(`noAsisten${asig.id}`)

        if (listaImparten && listaNoImparten) {
            addClickEventToProfesores(listaImparten, listaNoImparten, asig.id)
            addClickEventToProfesores(listaNoImparten, listaImparten, asig.id)
        }

        // if (listaAsisten && listaNoAsisten) {
        //     addClickEventToAlumnos(listaAsisten, listaNoAsisten, asig.id)
        //     addClickEventToAlumnos(listaNoAsisten, listaAsisten, asig.id)
        // }

        document.querySelector(`#guardarBtn${asig.id}`).addEventListener('click', async () => {
            const nombreInput = document.querySelector(`#nombre${asig.id}`)
            const nombreActual = nombreInput.value.trim()
            const nombreOriginal = nombreInput.dataset.original

            if (nombreActual !== nombreOriginal) {
                try {
                    const respuesta = await putAsignatura(asig.id, { nombre: nombreActual })
                    if (respuesta.ok) {
                        console.log("Nombre de la asignatura actualizado correctamente")
                        nombreInput.dataset.original = nombreActual
                        const rowIndex = tabla.row(`#editModal${asig.id}`).index()
                        tabla.cell(rowIndex, 0).data(nombreActual).draw()
                    } else {
                        console.error("Error al actualizar el nombre de la asignatura")
                        alert("No se pudo actualizar el nombre. Intenta nuevamente.")
                    }
                } catch (error) {
                    console.error("Error en la solicitud PUT", error)
                }
            }
        })
    }
}

const addClickEventToProfesores = (lista, listaContraria, idAsignatura) => {
    lista.querySelectorAll('.profesor').forEach(i => {
        const manejarClick = () => {
            const profesorId = i.getAttribute('data-id')
            const profesorNombre = i.textContent

            if (!listaContraria.querySelector(`.profesor[data-id='${profesorId}']`)) {
                removeProfesores(idAsignatura, profesorId)
                const iNew = document.createElement('li')
                iNew.className = 'profesor'
                iNew.setAttribute('data-id', profesorId)
                iNew.textContent = profesorNombre

                listaContraria.appendChild(iNew)
            } else {
                addProfesores(idAsignatura, profesorId)

                i.remove()
            }

            addClickEventToProfesores(listaContraria, lista, idAsignatura)
        }

        i.removeEventListener('click', manejarClick)
        i.addEventListener('click', manejarClick)
    })
}

const addProfesores = async (idAsignatura, idProfesor) => {
    try {
        const asignaturaData = {
            idAsignatura: idAsignatura,
            idProfesor: [idProfesor]
        }
        await postAsignaturaProfesor(asignaturaData) // Realiza el POST para agregar el profesor
        console.log(`Profesor con ID ${idProfesor} agregado a la asignatura ${idAsignatura}`)
    } catch (error) {
        console.error('Error al agregar el profesor:', error)
    }
}

const removeProfesores = async (idAsignatura, idProfesor) => {
    try {
        await deleteAsignaturaProfesorEspecifico(idAsignatura,idProfesor) // Realiza el DELETE para eliminar al profesor de la asignatura
        console.log(`Profesor con ID ${idProfesor} eliminado de la asignatura ${idAsignatura}`)
    } catch (error) {
        console.error('Error al eliminar el profesor:', error)
    }
}

// const addClickEventToAlumnos = (lista, listaContraria, idAsignatura) => {
//     lista.querySelectorAll('.alumno').forEach(i => {
//         const manejarClick = () => {
//             const alumnoId = i.getAttribute('data-id')
//             const alumnoNombre = i.textContent

//             if (!listaContraria.querySelector(`.alumno[data-id='${alumnoId}']`)) {
//                 removeAlumnos(idAsignatura, alumnoId)
//                 const iNew = document.createElement('li')
//                 iNew.className = 'alumno'
//                 iNew.setAttribute('data-id', alumnoId)
//                 iNew.textContent = alumnoNombre

//                 listaContraria.appendChild(iNew)
//             } else {
//                 addAlumnos(idAsignatura, alumnoId)

//                 i.remove()
//             }

//             addClickEventToAlumnos(listaContraria, lista, idAsignatura)
//         }

//         i.removeEventListener('click', manejarClick)
//         i.addEventListener('click', manejarClick)
//     })
// }

init()
