//Raul Gutierrez
import { constantes } from "../classes/constantes.js"

export async function getTodosAsignaturas() {
    const rutaAsignatura = constantes.urlApi + constantes.asignatura

    try {
        const respuesta = await fetch(rutaAsignatura, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })

        if (!respuesta.ok){
            throw new Error(`Error al obtener la lista de asignaturas. Código de estado: ${respuesta.status}`);
        }

        const asignaturas = await respuesta.json()
        return asignaturas.asignatura

    } catch (error) {
        console.error('Error en la función getTodosAsignaturas:', error.message);
        throw error;
    }
}

export async function getBuscarAsignatura(id_asignatura) {
    const rutaAsignatura = constantes.urlApi + constantes.asignatura

    try {
        const respuesta = await fetch(rutaAsignatura + id_asignatura, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })

        if (!respuesta.ok) {
            throw new Error(`Error al obtener la asignatura. Código de estado: ${respuesta.status}`);
        }

        const asignatura = await respuesta.json();
        console.log(asignatura)
        return asignatura;
    } catch (error) {
        console.error('Error en la función getBuscarAsignatura:', error.message)
        throw error
    }
}

export async function postAsignatura(asignaturaCreada) {
    const rutaAsignatura = constantes.urlApi + constantes.asignatura
    
    try {
        const respuesta = await fetch(rutaAsignatura, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify(asignaturaCreada),
        })
        if (!respuesta.ok) {
            throw new Error(`Error al añadir la asignatura. Código de estado: ${respuesta.status}`);
        }

        const resultado = await respuesta.json();
        return resultado;
    } catch (error) {
        console.error('Error en la función postAsignatura:', error.message);
        throw error;
    }
}

export async function putAsignatura(id_asignatura, asignatura) {
    const rutaAsignatura = constantes.urlApi + constantes.asignatura
    try {
        const respuesta = await fetch(rutaAsignatura + id_asignatura, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            body: JSON.stringify(asignatura),
        });

        if (!respuesta.ok) {

            throw new Error(`Error al editar la asignatura. Código de estado: ${respuesta.status}`);
        }

        const resultado = await respuesta.json();
        return resultado;
    } catch (error) {
        console.error('Error en la función putAsignatura:', error.message);
        throw error;
    }
}

export async function deleteAsignatura(id_asignatura) {
    const rutaAsignatura = constantes.urlApi + constantes.asignatura

    try {
        const respuesta = await fetch(rutaAsignatura + id_asignatura, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (!respuesta.ok) {
            throw new Error(`Error al eliminar la asignatura. Código de estado: ${respuesta.status}`);
        }

        const resultado = await respuesta.json();
        return resultado;
    } catch (error) {
        console.error('Error en la función deleteAsignatura:', error.message)
        throw error
    }
}