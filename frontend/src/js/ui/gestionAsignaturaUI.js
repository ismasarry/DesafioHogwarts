//Jaime Ortega
import { mostrarUsuariosRolPorIdRol } from "../api/usuarioRolAPI.js"
import { getTodosAsignaturas, postAsignatura, putAsignatura, deleteAsignatura } from "../api/asignaturaAPI.js"
import { getTodosAsignaturaProfesores, postAsignaturaProfesor, deleteAsignaturaProfesorEspecifico } from "../api/asignaturaProfesorAPI.js"
import { getTodosAsignaturaAlumnos, postAsignaturaAlumno, deleteAsignaturaAlumnoEspecifico } from "../api/asignaturaAlumnoAPI.js"
import { cargarSideBar } from "../components/cargarSideBar.js"
import languageES from '../local-DataTables/es-ES.json'

await cargarSideBar()

const init = async () => {
    const tabla = $('#asignaturas').DataTable({
        columns: [
            { title: 'ID', data: 'id' },
            { title: 'Asignatura', data: 'nombre' },
            { title: 'Profesor/es', data: 'profesores' },
            { title: 'Alumnos', data: 'alumnos' },
            { title: 'Acciones', data: 'acciones', orderable: false }
        ],
        language: languageES,
        responsive: true,
        scrollX: true,
        pagingType: 'full_numbers',
        lengthMenu: [[10, 25, 50, -1], [10, 25, 50, 'Todos']],
    })

    const [asignaturas, profesoresData, profesorAsignatura, alumnosData, alumnosAsignatura] = await Promise.all([
        getTodosAsignaturas(),
        mostrarUsuariosRolPorIdRol(3),
        getTodosAsignaturaProfesores(),
        mostrarUsuariosRolPorIdRol(4),
        getTodosAsignaturaAlumnos(),
    ])

    const profesores = profesoresData.usuarios || []
    const alumnos = alumnosData.usuarios || []

    const crearModal = `
            <div class="modal fade" id="crearAsignaturaModal" tabindex="-1" aria-labelledby="crearAsignaturaLabel" aria-hidden="true">
                <div class="modal-dialog modal-dialog-centered">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="crearAsignaturaLabel">Crear Nueva Asignatura</h5>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">
                            <form id="crearAsignaturaForm">
                                <div class="mb-3">
                                    <label for="nombreAsignatura" class="form-label">Nombre de la Asignatura</label>
                                    <input type="text" class="form-control" id="nombreAsignatura" placeholder="Introduce el nombre" required>
                                </div>
                            </form>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
                            <button type="button" class="btn btn-primary" id="guardarAsignatura">Guardar</button>
                        </div>
                    </div>
                </div>
            </div>
        `
    document.body.insertAdjacentHTML('beforeend', crearModal)

    tabla.clear()

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

        const acciones = `  
                            <button class='btn-editar btn btn-primary btn-sm' data-bs-toggle='modal' data-bs-target='#editModal${asig.id}'>
                                <i class='fas fa-edit'></i>Editar
                            </button> 
                            <button class='btn-eliminar btn btn-danger btn-sm' data-bs-toggle='modal' data-bs-target='#deleteModal${asig.id}'>
                                <i class='fas fa-trash-alt'></i>Eliminar
                            </button>
                        `

        const existeFila = tabla.row(`#row-${asig.id}`)
        if (existeFila.node()) {
            existeFila.data({
                id: asig.id,
                nombre: asig.nombre,
                profesores: profesoresImparten.map(profe => profe.nombre).join(',') || '-',
                // profesores: conteoProfesores,
                // alumnos: alumnosAsisten.map(alumn => alumn.nombre).join(','),
                alumnos: conteoAlumnos,
                acciones: acciones
            })
        }

        const newFila = tabla.row.add({
            id: asig.id,
            nombre: asig.nombre,
            profesores: profesoresImparten.map(profe => profe.nombre).join(',') || '-',
            // profesores: conteoProfesores,
            // alumnos: alumnosAsisten.map(alumn => alumn.nombre).join(','),
            alumnos: conteoAlumnos,
            acciones: acciones
        }).node()

        if (newFila) {
            newFila.id = `row-${asig.id}`
        }

        tabla.draw(false)

        const editarModal = `
            <div class="modal" id="editModal${asig.id}">
                <div class="modal-dialog modal-md">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h4 id='titulo-modal' class="modal-title">Editar asignatura ${asig.nombre}</h4>
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
                                        <div class='col colImparten${asig.id}'>
                                            <h5>Imparten</h5>
                                            <ul class='no-puntos' id="imparten${asig.id}">
                                            ${profesoresImparten.length > 0 ? profesoresImparten.map(prof => `
                                                <li class='profesor' data-id='${prof.id}'>
                                                    ${prof.nombre ? prof.nombre : 'Nombre no disponible'}
                                                </li>`).join('') : ''}
                                            </ul>
                                        </div>

                                        <div class='col colNoImparten${asig.id}'>
                                            <h5>No imparten</h5>
                                            <ul class="no-puntos" id="noImparten${asig.id}">
                                            ${profesoresNoImparten.length > 0 ? profesoresNoImparten.map(prof => `
                                                <li class="profesor" data-id="${prof.id}">
                                                    ${prof.nombre ? prof.nombre : 'Nombre no disponible'}
                                                </li>`).join('') : ''}
                                            </ul>
                                        </div>
                                    </div>
                                </div>

                                <div id="alumnos${asig.id}" class="tab-pane fade">
                                    <label class="form-label">Alumnos</label>
                                    <div class='row'>
                                        <div class='col colAsisten${asig.id}'>
                                            <h5>Asisten</h5>
                                            <ul class='no-puntos' id="asisten${asig.id}">
                                            ${alumnosAsisten.length > 0 ? alumnosAsisten.map(al => `
                                                <li class='alumno' data-id='${al.id}'>
                                                    ${al.nombre ? al.nombre : 'Nombre no disponible'}
                                                </li>`).join('') : ''}
                                            </ul>
                                        </div>

                                        <div class='col colNoAsisten${asig.id}'>
                                            <h5>No asisten</h5>
                                            <ul class="no-puntos" id="noAsisten${asig.id}">
                                            ${alumnosNoAsisten.length > 0 ? alumnosNoAsisten.map(al => `
                                                <li class="alumno" data-id="${al.id}">
                                                    ${al.nombre ? al.nombre : 'Nombre no disponible'}
                                                </li>`).join('') : ''}
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

        const eliminarModal = `
            <div class="modal" id="deleteModal${asig.id}">
                <div class="modal-dialog modal-md">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h4 class="modal-title">Confirmar Eliminación</h4>
                            <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
                        </div>

                        <div class="modal-body">
                            <p>¿Estás seguro de que deseas eliminar la asiignatura ${asig.nombre}?</p>
                        </div>

                        <div class="modal-footer">
                            <button type="button" class="btn btn-danger" data-bs-dismiss="modal" id="confirmarEliminacion${asig.id}">Confirmar Eliminación</button>
                        </div>
                    </div>
                </div>
            </div>
        `
        document.body.insertAdjacentHTML('beforeend', eliminarModal)

        const listaImparten = document.getElementById(`imparten${asig.id}`)
        const listaNoImparten = document.getElementById(`noImparten${asig.id}`)
        const listaAsisten = document.getElementById(`asisten${asig.id}`)
        const listaNoAsisten = document.getElementById(`noAsisten${asig.id}`)

        if (listaImparten && listaNoImparten) {
            addClickEventToProfesores(listaImparten, listaNoImparten, asig.id, tabla)
            addClickEventToProfesores(listaNoImparten, listaImparten, asig.id, tabla)
        }

        if (listaAsisten && listaNoAsisten) {
            addClickEventToAlumnos(listaAsisten, listaNoAsisten, asig.id, tabla)
            addClickEventToAlumnos(listaNoAsisten, listaAsisten, asig.id, tabla)
        }

        document.querySelector(`#guardarBtn${asig.id}`).addEventListener('click', async () => {
            const nombreInput = document.querySelector(`#nombre${asig.id}`)
            const nombreActual = nombreInput.value.trim()
            const nombreOriginal = nombreInput.dataset.original

            if (nombreActual !== nombreOriginal) {
                try {
                    const respuesta = await putAsignatura(asig.id, { nombre: nombreActual })
                    if (respuesta) {
                        nombreInput.dataset.original = nombreActual

                        const fila = tabla.row(`#row-${asig.id}`).data()
                        fila.nombre = nombreActual
                        tabla.row(`#row-${asig.id}`).data(fila).invalidate().draw(false)

                        const tituloModal = document.querySelector(`#editModal${asig.id} .modal-title`)
                        if (tituloModal) {
                            tituloModal.textContent = `Editar asignatura ${nombreActual}`
                        }
                    } else {
                        console.error("Error al actualizar el nombre de la asignatura")
                    }
                } catch (error) {
                    console.error("Error en la solicitud PUT", error)
                }
            }
        })

        const eliminarAsignatura = async (id) => {
            const confirmarEliminacion = document.getElementById(`confirmarEliminacion${id}`)

            if (confirmarEliminacion) {
                confirmarEliminacion.addEventListener('click', async () => {
                    try {
                        const respuesta = await deleteAsignatura(id)

                        if (respuesta) {
                            const row = $(`#asignaturas tbody tr`).filter(function () {
                                return $(this).find('td').eq(0).text() == id
                            })

                            if (row.length > 0) {
                                tabla.row(row).remove().draw(false)
                            }
                        } else {
                            console.error("Error al eliminar la asignatura")
                        }
                    } catch (error) {
                        console.error('Error al confirmar la eliminación:', error)
                    }
                })
            }
        }
        eliminarAsignatura(asig.id)
    }

    const crearAsignatura = document.getElementById('guardarAsignatura')
    crearAsignatura.addEventListener('click', async () => {
        const nombreAsignatura = document.getElementById('nombreAsignatura')
        if (nombreAsignatura.value) {
            try {
                await postAsignatura(nombreAsignatura.value)
                location.reload()
            } catch (error) {
                console.error("Error al crear la asignatura:", error)
            }
        } else {
            const existeError = document.querySelector('.error-message')
            if (!existeError) {
                let errorMessage = document.createElement('span')
                errorMessage.innerHTML = 'El nombre de la asignatura no puede estar vacío'

                errorMessage.classList.add('error-message')

                nombreAsignatura.insertAdjacentElement('afterend', errorMessage)
            }
        }
    })
}

const addClickEventToProfesores = (lista, listaContraria, idAsignatura, tabla) => {
    lista.querySelectorAll('.profesor').forEach(i => {
        const manejarClick = async () => {
            const profesorId = i.getAttribute('data-id')
            const profesorNombre = i.textContent

            if (lista === document.getElementById(`imparten${idAsignatura}`)) {
                await removeProfesores(idAsignatura, profesorId)

                const nuevoElemento = document.createElement('li')
                nuevoElemento.className = 'profesor'
                nuevoElemento.setAttribute('data-id', profesorId)
                nuevoElemento.textContent = profesorNombre
                listaContraria.appendChild(nuevoElemento)
                i.remove()

                addClickEventToProfesores(listaContraria, lista, idAsignatura)

            } else if (lista === document.getElementById(`noImparten${idAsignatura}`)) {
                await addProfesores(idAsignatura, profesorId)

                const nuevoElemento = document.createElement('li')
                nuevoElemento.className = 'profesor'
                nuevoElemento.setAttribute('data-id', profesorId)
                nuevoElemento.textContent = profesorNombre
                listaContraria.appendChild(nuevoElemento)
                i.remove()

                addClickEventToProfesores(listaContraria, lista, idAsignatura)
            }
            const profesoresActualizados = Array.from(document.getElementById(`imparten${idAsignatura}`).querySelectorAll('li'))
                .map(profe => profe.textContent)
                .join(', ')

            const fila = tabla.row(`#row-${idAsignatura}`).data()
            fila.profesores = profesoresActualizados || '-'
            tabla.row(`#row-${idAsignatura}`).data(fila).invalidate().draw(false)
        }

        i.removeEventListener('click', manejarClick)
        i.addEventListener('click', manejarClick)
    })
}




const addProfesores = async (idAsignatura, idProfesor) => {
    try {
        await postAsignaturaProfesor(idAsignatura, idProfesor)
    } catch (error) {
        console.error('Error al agregar el profesor:', error)
    }
}

const removeProfesores = async (idAsignatura, idProfesor) => {
    try {
        await deleteAsignaturaProfesorEspecifico(idAsignatura, idProfesor)
    } catch (error) {
        console.error('Error al eliminar el profesor:', error)
    }
}

const addClickEventToAlumnos = (lista, listaContraria, idAsignatura, tabla) => {
    lista.querySelectorAll('.alumno').forEach(i => {
        const manejarClick = async () => {
            const alumnoId = i.getAttribute('data-id')
            const alumnoNombre = i.textContent

            if (lista === document.getElementById(`asisten${idAsignatura}`)) {
                await removeAlumnos(idAsignatura, alumnoId)

                const nuevoElemento = document.createElement('li')
                nuevoElemento.className = 'alumno'
                nuevoElemento.setAttribute('data-id', alumnoId)
                nuevoElemento.textContent = alumnoNombre
                listaContraria.appendChild(nuevoElemento)
                i.remove()

                addClickEventToAlumnos(listaContraria, lista, idAsignatura)

            } else if (lista === document.getElementById(`noAsisten${idAsignatura}`)) {
                await addAlumnos(idAsignatura, alumnoId)

                const nuevoElemento = document.createElement('li')
                nuevoElemento.className = 'alumno'
                nuevoElemento.setAttribute('data-id', alumnoId)
                nuevoElemento.textContent = alumnoNombre
                listaContraria.appendChild(nuevoElemento)
                i.remove()

                addClickEventToAlumnos(listaContraria, lista, idAsignatura)
            }
            const alumnosActualizados = Array.from(document.getElementById(`asisten${idAsignatura}`).querySelectorAll('li')).length

            const fila = tabla.row(`#row-${idAsignatura}`).data()
            fila.alumnos = alumnosActualizados
            tabla.row(`#row-${idAsignatura}`).data(fila).invalidate().draw(false)
        }

        i.removeEventListener('click', manejarClick)
        i.addEventListener('click', manejarClick)
    })
}

const addAlumnos = async (idAsignatura, idAlumno) => {
    try {
        await postAsignaturaAlumno(idAsignatura, idAlumno)
    } catch (error) {
        console.error('Error al agregar el alumno:', error)
    }
}

const removeAlumnos = async (idAsignatura, idAlumno) => {
    try {
        await deleteAsignaturaAlumnoEspecifico(idAsignatura, idAlumno)
    } catch (error) {
        console.error('Error al eliminar el alumno:', error)
    }
}


init()
