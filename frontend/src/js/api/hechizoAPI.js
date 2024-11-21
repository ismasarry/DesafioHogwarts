//Raul Gutierrez
import { constantes } from "../classes/constantes.js"

export const getTodosHechizos = async () => {
    const rutaHechizo = constantes.urlApi + constantes.hechizo

    try {
        const respuesta = await fetch(rutaHechizo, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })

        if (!respuesta.ok){
            throw new Error(`Error al obtener la lista de Hechizos. Código de estado: ${respuesta.status}`);
        }

        const hechizos = await respuesta.json()
        console.log(hechizos)
        return hechizos

    } catch (error) {
        console.error('Error en la función getTodosHechizos:', error.message);
        throw error;
    }
}

export const getBuscarHechizo = async (id_hechizo) => {
    const rutaHechizo = constantes.urlApi + constantes.hechizo

    try {
        const respuesta = await fetch(rutaHechizo + id_hechizo, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })

        if (!respuesta.ok) {
            throw new Error(`Error al obtener el hechizo. Código de estado: ${respuesta.status}`);
        }

        const hechizo = await respuesta.json();
        console.log(hechizo)
        return hechizo;
    } catch (error) {
        console.error('Error en la función getBuscarHechizo:', error.message)
        throw error
    }
}

export const getBuscarHechizoNivel = async (nivel) => {
    const rutaHechizo = constantes.urlApi + constantes.hechizo + 'nivel/'

    try {
        const respuesta = await fetch(rutaHechizo + nivel, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })

        if (!respuesta.ok) {
            throw new Error(`Error al obtener el hechizo. Código de estado: ${respuesta.status}`);
        }

        const hechizo = await respuesta.json();
        console.log(hechizo)
        return hechizo;
    } catch (error) {
        console.error('Error en la función getBuscarHechizo:', error.message)
        throw error
    }
}

export const postHechizo = async (hechizoCreado) => {
    const rutaHechizo = constantes.urlApi + constantes.hechizo
    
    try {
        const respuesta = await fetch(rutaHechizo, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify(hechizoCreado),
        })
        if (!respuesta.ok) {
            throw new Error(`Error al añadir el hechizo. Código de estado: ${respuesta.status}`);
        }

        const resultado = await respuesta.json();
        return resultado;
    } catch (error) {
        console.error('Error en la función postHechizo:', error.message);
        throw error;
    }
}

export const putHechizo = async (id_hechizo, hechizo) => {
    const rutaHechizo = constantes.urlApi + constantes.hechizo
    try {
        const respuesta = await fetch(rutaHechizo + id_hechizo, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            body: JSON.stringify(hechizo),
        });

        if (!respuesta.ok) {

            throw new Error(`Error al editar el hechizo. Código de estado: ${respuesta.status}`);
        }

        const resultado = await respuesta.json()
        return resultado;
    } catch (error) {
        console.error('Error en la función putHechizo:', error.message);
        throw error;
    }
}

export const deleteHechizo = async (id_hechizo) => {
    const rutaHechizo = constantes.urlApi + constantes.hechizo

    try {
        const respuesta = await fetch(rutaHechizo + id_hechizo, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (!respuesta.ok) {
            throw new Error(`Error al eliminar el hechizo. Código de estado: ${respuesta.status}`);
        }

        const resultado = await respuesta.json();
        return resultado;
    } catch (error) {
        console.error('Error en la función deleteHechizo:', error.message)
        throw error
    }
}