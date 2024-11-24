//Raul Gutierrez
import { constantes } from "../classes/constantes.js"

export const getTodosAsignaturaAlumnos = async () => {
    const rutaAsignaturaAlumno = constantes.urlApi + constantes.asignaturaAlumno

    try {
        const respuesta = await fetch(rutaAsignaturaAlumno, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })

        if (!respuesta.ok){
            throw new Error(`Error al obtener la lista de asignaturaAlumnos. Código de estado: ${respuesta.status}`);
        }

        const asignaturaAlumnos = await respuesta.json()
        return asignaturaAlumnos.asignaturaAlumno

    } catch (error) {
        console.error('Error en la función getTodosAsignaturaAlumnos:', error.message);
        throw error;
    }
}

export const getBuscarAsignaturaAlumno = async (id_asignaturaAlumno) => {
    const rutaAsignaturaAlumno = constantes.urlApi + constantes.asignaturaAlumno

    try {
        const respuesta = await fetch(rutaAsignaturaAlumno + id_asignaturaAlumno, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })

        if (!respuesta.ok) {
            throw new Error(`Error al obtener la asignaturaAlumno. Código de estado: ${respuesta.status}`);
        }

        const asignaturaAlumno = await respuesta.json();
        return asignaturaAlumno;
    } catch (error) {
        console.error('Error en la función getBuscarAsignaturaAlumno:', error.message)
        throw error
    }
}

export const getBuscarAsignaturaAlumnoPorAlumno = async (id_alumno) => {
    const rutaAsignaturaAlumno = constantes.urlApi + constantes.asignaturaAlumno + 'alumnoPorId/'

    try {
        const respuesta = await fetch(rutaAsignaturaAlumno + id_alumno, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })

        if (!respuesta.ok) {
            throw new Error(`Error al obtener la asignaturaAlumno. Código de estado: ${respuesta.status}`);
        }

        const asignaturaAlumno = await respuesta.json();
        return asignaturaAlumno;
    } catch (error) {
        console.error('Error en la función getBuscarAsignaturaAlumno:', error.message)
        throw error
    }
}

export const postAsignaturaAlumno = async (asignaturaAlumnoCreada) => {
    const rutaAsignaturaAlumno = constantes.urlApi + constantes.asignaturaAlumno
    
    try {
        const respuesta = await fetch(rutaAsignaturaAlumno, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify(asignaturaAlumnoCreada),
        })
        if (!respuesta.ok) {
            throw new Error(`Error al añadir la asignaturaAlumno. Código de estado: ${respuesta.status}`);
        }

        const resultado = await respuesta.json();
        return resultado;
    } catch (error) {
        console.error('Error en la función postAsignaturaAlumno:', error.message);
        throw error;
    }
}

export const putAsignaturaAlumno = async (id_asignaturaAlumno, asignaturaAlumno) => {
    const rutaAsignaturaAlumno = constantes.urlApi + constantes.asignaturaAlumno
    try {
        const respuesta = await fetch(rutaAsignaturaAlumno + id_asignaturaAlumno, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            body: JSON.stringify(asignaturaAlumno),
        });

        if (!respuesta.ok) {

            throw new Error(`Error al editar la asignaturaAlumno. Código de estado: ${respuesta.status}`);
        }

        const resultado = await respuesta.json();
        return resultado;
    } catch (error) {
        console.error('Error en la función putAsignaturaAlumno:', error.message);
        throw error;
    }
}

export const deleteAsignaturaAlumno = async (id_asignaturaAlumno) => {
    const rutaAsignaturaAlumno = constantes.urlApi + constantes.asignaturaAlumno

    try {
        const respuesta = await fetch(rutaAsignaturaAlumno + id_asignaturaAlumno, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (!respuesta.ok) {
            throw new Error(`Error al eliminar la asignaturaAlumno. Código de estado: ${respuesta.status}`);
        }

        const resultado = await respuesta.json();
        return resultado;
    } catch (error) {
        console.error('Error en la función deleteAsignaturaAlumno:', error.message)
        throw error
    }
}