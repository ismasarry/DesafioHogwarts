//Raul Gutierrez
import { constantes } from "../classes/constantes.js"

export async function getTodosAsignaturaProfesores() {
    const rutaAsignaturaProfesor = constantes.urlApi + constantes.asignaturaProfesor

    try {
        const respuesta = await fetch(rutaAsignaturaProfesor, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })

        if (!respuesta.ok){
            throw new Error(`Error al obtener la lista de asignaturaProfesors. Código de estado: ${respuesta.status}`);
        }

        const asignaturaProfesors = await respuesta.json()
        return asignaturaProfesors.asignaturaProfesor

    } catch (error) {
        console.error('Error en la función getTodosAsignaturaProfesores:', error.message);
        throw error;
    }
}

export async function getBuscarAsignaturaProfesor(id_asignaturaProfesor) {
    const rutaAsignaturaProfesor = constantes.urlApi + constantes.asignaturaProfesor

    try {
        const respuesta = await fetch(rutaAsignaturaProfesor + id_asignaturaProfesor, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })

        if (!respuesta.ok) {
            throw new Error(`Error al obtener la asignaturaProfesor. Código de estado: ${respuesta.status}`);
        }

        const asignaturaProfesor = await respuesta.json();
        return asignaturaProfesor;
    } catch (error) {
        console.error('Error en la función getBuscarAsignaturaProfesor:', error.message)
        throw error
    }
}

export async function getBuscarAsignaturaProfesorPorProfesor(id_profesor) {
    const rutaAsignaturaProfesor = constantes.urlApi + constantes.asignaturaProfesor + 'profesor/'

    try {
        const respuesta = await fetch(rutaAsignaturaProfesor + id_profesor, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })

        if (!respuesta.ok) {
            throw new Error(`Error al obtener la asignaturaProfesor. Código de estado: ${respuesta.status}`);
        }

        const asignaturaProfesor = await respuesta.json();
        return asignaturaProfesor;
    } catch (error) {
        console.error('Error en la función getBuscarAsignaturaProfesor:', error.message)
        throw error
    }
}

export async function postAsignaturaProfesor(asignaturaProfesorCreada) {
    const rutaAsignaturaProfesor = constantes.urlApi + constantes.asignaturaProfesor
    
    try {
        const respuesta = await fetch(rutaAsignaturaProfesor, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify(asignaturaProfesorCreada),
        })
        if (!respuesta.ok) {
            throw new Error(`Error al añadir la asignaturaProfesor. Código de estado: ${respuesta.status}`);
        }

        const resultado = await respuesta.json();
        return resultado;
    } catch (error) {
        console.error('Error en la función postAsignaturaProfesor:', error.message);
        throw error;
    }
}

export async function putAsignaturaProfesor(id_asignaturaProfesor, asignaturaProfesor) {
    const rutaAsignaturaProfesor = constantes.urlApi + constantes.asignaturaProfesor
    try {
        const respuesta = await fetch(rutaAsignaturaProfesor + id_asignaturaProfesor, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            body: JSON.stringify(asignaturaProfesor),
        });

        if (!respuesta.ok) {

            throw new Error(`Error al editar la asignaturaProfesor. Código de estado: ${respuesta.status}`);
        }

        const resultado = await respuesta.json();
        return resultado;
    } catch (error) {
        console.error('Error en la función putAsignaturaProfesor:', error.message);
        throw error;
    }
}

export async function deleteAsignaturaProfesor(id_asignaturaProfesor) {
    const rutaAsignaturaProfesor = constantes.urlApi + constantes.asignaturaProfesor

    try {
        const respuesta = await fetch(rutaAsignaturaProfesor + id_asignaturaProfesor, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (!respuesta.ok) {
            throw new Error(`Error al eliminar la asignaturaProfesor. Código de estado: ${respuesta.status}`);
        }

        const resultado = await respuesta.json();
        return resultado;
    } catch (error) {
        console.error('Error en la función deleteAsignaturaProfesor:', error.message)
        throw error
    }
}