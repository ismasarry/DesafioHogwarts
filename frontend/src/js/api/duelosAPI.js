//Raul Gutierrez
import { constantes } from "../classes/constantes.js"

export const getTurnoDuelos = async (id_usuario) => {
    const rutaHechizo = constantes.urlApi + constantes.turnoDuelo + 'hechizosUsablesUsuario/'

    try {
        const respuesta = await fetch(rutaHechizo + id_usuario, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })

        if (!respuesta.ok){
            throw new Error(`Error al obtener la lista de Hechizos para duelos. Código de estado: ${respuesta.status}`);
        }

        const hechizos = await respuesta.json()
        console.log(hechizos)
        return hechizos

    } catch (error) {
        console.error('Error en la función getTurnoDuelos:', error.message);
        throw error;
    }
}

export const getTurnoDuelosPorDuelo = async (id_usuario) => {
    const rutaHechizo = constantes.urlApi + constantes.turnoDuelo + 'duelo/'

    try {
        const respuesta = await fetch(rutaHechizo + id_usuario, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })

        if (!respuesta.ok){
            throw new Error(`Error al obtener la lista de Hechizos para duelos. Código de estado: ${respuesta.status}`);
        }

        const hechizos = await respuesta.json()
        console.log(hechizos)
        return hechizos

    } catch (error) {
        console.error('Error en la función getTurnoDuelos:', error.message);
        throw error;
    }
}

export const postDuelo = async (dueloCreado) => {
    const rutaDuelo = constantes.urlApi + constantes.duelo
    
    try {
        const respuesta = await fetch(rutaDuelo, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify(dueloCreado),
        })
        if (!respuesta.ok) {
            throw new Error(`Error al añadir el Duelo. Código de estado: ${respuesta.status}`);
        }

        const resultado = await respuesta.json();
        return resultado;
    } catch (error) {
        console.error('Error en la función postDuelo:', error.message);
        throw error;
    }
}