//Jaime Ortega
import { getTodosUsuarios } from "../api/usuarioAPI.js"
import { constantes } from "../classes/constantes.js"
import { getTodosAsignaturas, getBuscarAsignatura, postAsignatura, putAsignatura, deleteAsignatura } from "../api/asignaturaAPI"
import { getTodosAsignaturaAlumnos, getBuscarAsignaturaAlumno, getBuscarAsignaturaAlumnoPorAlumno, postAsignaturaAlumno, putAsignaturaAlumno, deleteAsignaturaAlumno, getBuscarAsignaturaAlumnoPorId } from "../api/asignaturaAlumnoAPI"
import { getTodosAsignaturaProfesores, getBuscarAsignaturaProfesor, getBuscarAsignaturaProfesorPorProfesor, postAsignaturaProfesor, putAsignaturaProfesor, deleteAsignaturaProfesor, getBuscarAsignaturaProfesorPorId } from "../api/asignaturaProfesorAPI"
import { cargarSideBar } from "../components/cargarSideBar.js"

await cargarSideBar()

const init = async () => {
    const tabla = $('#asignaturas').DataTable()
    const asignaturas = await getTodosAsignaturas() || []
    const todosProfesores = await getTodosAsignaturaProfesores() || []
    console.log('Todos los Profesores:', todosProfesores)
    const todosAlumnos = await getTodosAsignaturaAlumnos() || []

    for (const asig of asignaturas) {
        const profesorData = await getBuscarAsignaturaProfesorPorId(asig.id) || []
        console.log(`Datos de profesores para la asignatura ${asig.id}:`, profesorData)
        const alumnoData = await getBuscarAsignaturaAlumnoPorId(asig.id) || []

        const profesoresNombres = profesorData.profesores ? profesorData.profesores.map(prof => prof.nombre) : []
        const alumnosNombres = alumnoData.alumns ? alumnoData.alumns.map(al => al.nombre) : []

        const conteoProfesores = profesorData.conteoProfesores || 0
        const conteoAlumnos = alumnoData.conteoAlumnos || 0

        const profesoresImparten = profesorData.profesores || []
        const profesoresNoImparten = todosProfesores.filter(prof =>
            !profesoresImparten.some(p => p.idProfesor === prof.idProfesor) &&
            prof.idAsignatura === asig.id
        )

        console.log('Profesores que imparten:', profesoresImparten)
        console.log('Profesores que no imparten:', profesoresNoImparten)

        const profesoresImpartenDisplay = profesoresImparten.length > 0 ? profesoresNombres.join(', ') : 'Libre'

        const row = tabla.row.add([
            asig.nombre,
            profesoresImpartenDisplay,
            // conteoProfesores,
            // alumnosNombres.join(', '),
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
                                    <input type="text" id="nombre${asig.id}" class="form-control" value="${asig.nombre}">
                                </div>
                                <div id="profesores${asig.id}" class="tab-pane fade">
                                    <label class="form-label">Profesores</label>
                                    <div class='row'>
                                        <div class='col'>
                                            <h5>Imparten</h5>
                                            <ul class='no-puntos' id="imparten${asig.id}">
                                                ${profesoresImparten.length > 0 ? profesoresImparten.map(prof => `<li class='profesor' data-id='${prof.id}'>${prof.nombre ? prof.nombre : 'Nombre no disponible'}</li>`).join('') : '<li>Libre</li>'}
                                            </ul>
                                        </div>
                                        <div class='col'>
                                            <h5>No imparten</h5>
                                            <ul class='no-puntos' id="noImparten${asig.id}">
                                                ${profesoresNoImparten.map(prof => `<li class='profesor' data-id='${prof.idProfesor}'>${prof.usuario ? prof.usuario.nombre : 'Nombre no disponible'}</li>`).join('')}
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                                <div id="alumnos${asig.id}" class="tab-pane fade">
                                    <label for="alumnosInput${asig.id}" class="form-label">Alumnos</label>
                                    <input type="text" id="alumnosInput${asig.id}" class="form-control" value="${alumnosNombres.join(', ')}">
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

        if (listaImparten && listaNoImparten) {
            addClickEventToProfesores(listaImparten, listaNoImparten)
            addClickEventToProfesores(listaNoImparten, listaImparten)
        }

        editarAsignaturaUI()
    }
}

const editarAsignaturaUI = async (id) => {
    const btnGuardar = document.getElementById(`guardarBtn${id}`)
    console.log('entra')

    if (btnGuardar) {
        btnGuardar.addEventListener('click', async () => {
            console.log('intenta guardar')
            const asignaturasInput = document.getElementById(`nombre${id}`).value
            const profesoresInput = Array.from(document.querySelectorAll(`#imparten${id} .profesor`))
                .map(prof => prof.getAttribute('data-id'))
            const alumnosInput = Array.from(document.querySelectorAll(`#alumnosInput${id}`))
                .map(al => al.value)

            const asignaturaData = {
                nombre: asignaturasInput,
                profesores: profesoresInput,
                alumnos: alumnosInput,
            }

            const existeAsignatura = await verificarAsignatura(id)

            if (existeAsignatura) {
                // Si existe, hacer un PUT
                await putAsignaturaProfesor(id, asignaturaData)
            } else {
                // Si no existe, hacer un POST
                await postAsignaturaProfesor(asignaturaData)
            }

            const modalElement = document.getElementById(`editModal${id}`)
            const modal = new bootstrap.Modal(modalElement)
            modal.hide()
            location.reload() // Recargar la página para reflejar los cambios
        })
    }
}

const verificarAsignatura = async (id) => {
    try {
        const respuesta = await fetch(`${constantes.urlApi}${constantes.asignaturaProfesor}${id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        return respuesta.ok // Devuelve true si la asignatura existe
    } catch (error) {
        console.error('Error al verificar la asignatura:', error.message)
        return false // Devuelve false en caso de error
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

const removeProfesores = async (idAsignatura, idProfesor) => {
    try {
        await deleteAsignaturaProfesor(idProfesor) 
        console.log(`Profesor con ID ${idProfesor} eliminado de la asignatura ${idAsignatura}`)
    } catch (error) {
        console.error('Error al eliminar el profesor:', error)
    }
}

const addProfesores = async (idAsignatura, idProfesor) => {
    try {
        const asignaturaData = {
            idAsignatura: idAsignatura,
            idProfesor: [idProfesor] 
        }
        await postAsignaturaProfesor(asignaturaData) 
        console.log(`Profesor con ID ${idProfesor} agregado a la asignatura ${idAsignatura}`)
    } catch (error) {
        console.error('Error al agregar el profesor:', error)
    }
}

init()
