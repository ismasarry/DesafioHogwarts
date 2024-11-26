//Jaime Ortega
import { getTodosUsuarios } from "../api/usuarioAPI.js"
import { mostrarRolesUsuario } from "../api/usuarioRolAPI.js"
import { constantes } from "../classes/constantes.js"
import { getTodosAsignaturas, getBuscarAsignatura, postAsignatura, putAsignatura, deleteAsignatura } from "../api/asignaturaAPI.js"
import { getTodosAsignaturaAlumnos, getBuscarAsignaturaAlumno, getBuscarAsignaturaAlumnoPorAlumno, postAsignaturaAlumno, putAsignaturaAlumno, deleteAsignaturaAlumno, getBuscarAsignaturaAlumnoPorId } from "../api/asignaturaAlumnoAPI.js"
import { getTodosAsignaturaProfesores, getBuscarAsignaturaProfesor, getBuscarAsignaturaProfesorPorProfesor, postAsignaturaProfesor, putAsignaturaProfesor, deleteAsignaturaProfesor, getBuscarAsignaturaProfesorPorId } from "../api/asignaturaProfesorAPI.js"
import { cargarSideBar } from "../components/cargarSideBar.js"

await cargarSideBar()

const verificarRol = async (idUsuario, nomRol) => {
    try {
        const rolesUsuario = await mostrarRolesUsuario(idUsuario)
        return rolesUsuario.roles.some(rol => rol.nombre === nomRol)
    } catch (e) {
        console.error(`Error al verificar el rol ${nomRol} del usuario ${idUsuario}`, e)
        return
    }
}

const init = async () => {
    const tabla = $('#asignaturas').DataTable()
    const asignaturas = await getTodosAsignaturas() || []
    const todosProfesores = await getTodosUsuarios() || []
    console.log('todos profes:', todosProfesores)
    const todosAlumnos = await getTodosUsuarios() || []
    console.log('todos alumnos:', todosAlumnos)

    const profesoresRol = Array.isArray(todosProfesores) ? await Promise.all(
        todosProfesores.filter(async user => await verificarRol(user.id, 'profesor'))
    ) : []
    
    const alumnosRol = Array.isArray(todosAlumnos) ? await Promise.all(
        todosAlumnos.filter(async user => await verificarRol(user.id, 'alumno'))
    ) : []

    for (const asig of asignaturas) {
        const profesorData = await getBuscarAsignaturaProfesorPorId(asig.id) || []
        const alumnoData = await getBuscarAsignaturaAlumnoPorId(asig.id) || []

        const profesoresValidos = []
        for (const profesor of profesorData.profesores || []) {
            const esProfesor = profesor && profesor.id ? await verificarRol(profesor.id, 'profesor') : false
            if (esProfesor) {
                profesoresValidos.push(profesor)
            }
        }

        const profesoresNoImparten = profesoresRol.filter(prof =>
            !profesoresValidos.some(valido => valido.id === prof.id)
        )

        const alumnosValidos = []
        for (const alumno of alumnoData.alumnos || []) {
            const esAlumno = alumno && alumno.id ? await verificarRol(alumno.id, 'alumno') : false
            if (esAlumno) {
                alumnosValidos.push(alumno)
            }
        }

        const alumnosNoAsisten = alumnosRol.filter(al =>
            !alumnosValidos.some(valido => valido.id === al.id)
        )

        // const conteoProfesores = profesorData.conteoProfesores || 0
        const conteoAlumnos = alumnoData.conteoAlumnos || 0

        const profesoresImpartenDisplay = profesoresValidos.length > 0 ? profesoresValidos.map(prof => prof.nombre).join(', ') : 'Libre'
        const alumnosAsistenDisplay = alumnosValidos.length > 0 ? alumnosValidos.map(al => al.nombre).join(', ') : 'Libre'

        const row = tabla.row.add([
            asig.nombre,
            profesoresImpartenDisplay,
            // conteoProfesores,
            // alumnosAsistenDisplay,
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
                                            ${profesoresValidos.length > 0 ? profesoresValidos.map(prof => `
                                                <li class='profesor' data-id='${prof.id}'>
                                                    ${prof.nombre ? prof.nombre : 'Nombre no disponible'}
                                                </li>`).join('') : '<li>Libre</li>'}
                                            </ul>
                                        </div>
                                        <div class='col'>
                                            <h5>No imparten</h5>
                                            <ul class="no-puntos" id="noImparten${asig.id}">
                                            ${profesoresNoImparten.length > 0 ? profesoresNoImparten.map(prof => `
                                                <li class="profesor" data-id="${prof.idProfesor}"> 
                                                    ${prof.usuario ? prof.usuario.nombre : 'Nombre no disponible'}
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
                                            ${alumnosValidos.length > 0 ? alumnosValidos.map(al => `
                                                <li class='alumno' data-id='${al.id}'>
                                                    ${al.nombre ? al.nombre : 'Nombre no disponible'}
                                                </li>`).join('') : '<li>Libre</li>'}
                                            </ul>
                                        </div>
                                        <div class='col'>
                                            <h5>No asisten</h5>
                                            <ul class="no-puntos" id="noAsisten${asig.id}">
                                            ${alumnosNoAsisten.length > 0 ? alumnosNoAsisten.map(al => `
                                                <li class="alumno" data-id="${al.idAlumno}">
                                                    ${al.usuario ? al.usuario.nombre : 'Nombre no disponible'}
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

        if (listaAsisten && listaNoAsisten) {
            addClickEventToAlumnos(listaAsisten, listaNoAsisten, asig.id)
            addClickEventToAlumnos(listaNoAsisten, listaAsisten, asig.id)
        }

        editarAsignaturaUI(asig.id)
    }
}

const editarAsignaturaUI = async (id) => {
    const btnGuardar = document.getElementById(`guardarBtn${id}`)
    if (btnGuardar) {
        btnGuardar.addEventListener('click', async () => {
            const asignaturasInput = document.getElementById(`nombre${id}`).value
            const profesoresInput = Array.from(document.querySelectorAll(`#imparten${id} .profesor`))
                .map(prof => prof.getAttribute('data-id'))
            const alumnosInput = Array.from(document.querySelectorAll(`#asisten${id} .alumno`))
                .map(al => al.getAttribute('data-id'))

            const asignaturaData = {
                nombre: asignaturasInput,
                profesores: profesoresInput,
                alumnos: alumnosInput,
            }

            // Actualizar la asignatura existente (PUT)
            await putAsignatura(id, asignaturaData)

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
        await deleteAsignaturaProfesor(idProfesor) // Realiza el DELETE para eliminar al profesor de la asignatura
        console.log(`Profesor con ID ${idProfesor} eliminado de la asignatura ${idAsignatura}`)
    } catch (error) {
        console.error('Error al eliminar el profesor:', error)
    }
}

const addClickEventToAlumnos = (lista, listaContraria, idAsignatura) => {
    lista.querySelectorAll('.alumno').forEach(i => {
        const manejarClick = () => {
            const alumnoId = i.getAttribute('data-id')
            const alumnoNombre = i.textContent

            if (!listaContraria.querySelector(`.alumno[data-id='${alumnoId}']`)) {
                removeAlumnos(idAsignatura, alumnoId)
                const iNew = document.createElement('li')
                iNew.className = 'alumno'
                iNew.setAttribute('data-id', alumnoId)
                iNew.textContent = alumnoNombre

                listaContraria.appendChild(iNew)
            } else {
                addAlumnos(idAsignatura, alumnoId)

                i.remove()
            }

            addClickEventToAlumnos(listaContraria, lista, idAsignatura)
        }

        i.removeEventListener('click', manejarClick)
        i.addEventListener('click', manejarClick)
    })
}

const addAlumnos = async (idAsignatura, idAlumno) => {
    try {
        const asignaturaData = {
            idAsignatura: idAsignatura,
            idAlumno: [idAlumno] // Solo un ID de alumno
        }
        await postAsignaturaAlumno(asignaturaData) // Asegúrate de que esta función esté definida
        console.log(`Alumno con ID ${idAlumno} agregado a la asignatura ${idAsignatura}`)
    } catch (error) {
        console.error('Error al agregar el alumno:', error)
    }
}

const removeAlumnos = async (idAsignatura, idAlumno) => {
    try {
        await deleteAsignaturaAlumno(idAlumno) // Asegúrate de que esta función esté definida para eliminar el alumno
        console.log(`Alumno con ID ${idAlumno} eliminado de la asignatura ${idAsignatura}`)
    } catch (error) {
        console.error('Error al eliminar el alumno:', error)
    }
}

init()
