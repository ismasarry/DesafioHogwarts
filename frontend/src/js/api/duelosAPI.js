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

export const getTurnoDuelosBot = async (id_usuario) => {
    const rutaHechizo = constantes.urlApi + constantes.turnoDuelo + 'hechizosUsablesBot/'

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

export const getTurnoDuelosPorDueloNormal = async (id_duelo) => {
    const rutaHechizo = constantes.urlApi + constantes.turnoDuelo + 'dueloNormal/'

    try {
        const respuesta = await fetch(rutaHechizo + id_duelo, {
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
        console.error('Error en la función getTurnoDuelosNormal:', error.message);
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

export const getDueloEnCurso = async (id_usuario) => {
    const rutaDuelo = constantes.urlApi + constantes.duelo + 'curso/'

    try {
        const respuesta = await fetch(rutaDuelo + id_usuario, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })

        if (!respuesta.ok){
            throw new Error(`Error al obtener la lista de Duelos en curso. Código de estado: ${respuesta.status}`);
        }

        const duelo = await respuesta.json()
        console.log(duelo)
        return duelo

    } catch (error) {
        console.error('Error en la función getDueloEnCurso:', error.message);
        throw error;
    }
}

export const getDueloPorUsuario = async (id_usuario) => {
    const rutaDuelo = constantes.urlApi + constantes.duelo + 'usuario/'

    try {
        const respuesta = await fetch(rutaDuelo + id_usuario, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })

        if (!respuesta.ok){
            throw new Error(`Error al obtener la lista de Duelos en curso. Código de estado: ${respuesta.status}`);
        }

        const duelo = await respuesta.json()
        console.log(duelo)
        return duelo

    } catch (error) {
        console.error('Error en la función getDueloEnCurso:', error.message);
        throw error;
    }
}

export const postTurnoDuelo = async (turnoDueloCreado) => {
    const rutaTurnoDuelo = constantes.urlApi + constantes.turnoDuelo
    
    try {
        const respuesta = await fetch(rutaTurnoDuelo, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify(turnoDueloCreado),
        })
        if (!respuesta.ok) {
            throw new Error(`Error al añadir el Turno Duelo. Código de estado: ${respuesta.status}`);
        }

        const resultado = await respuesta.json();
        console.log(resultado)
        return resultado;
    } catch (error) {
        console.error('Error en la función postTurnoDuelo:', error.message);
        throw error;
    }
}

export const putDuelo = async (id_duelo, duelo) => {
    const rutaDuelo = constantes.urlApi + constantes.duelo
    try {
        const respuesta = await fetch(rutaDuelo + id_duelo, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            body: JSON.stringify(duelo),
        });

        if (!respuesta.ok) {

            throw new Error(`Error al editar el duelo. Código de estado: ${respuesta.status}`);
        }

        const resultado = await respuesta.json()
        return resultado;
    } catch (error) {
        console.error('Error en la función putDuelo:', error.message);
        throw error;
    }
}

export const getWinRate = async (id_usuario) => {
    const rutaDuelo = constantes.urlApi + constantes.duelo + 'winRate/'

    try {
        const respuesta = await fetch(rutaDuelo + id_usuario, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })

        if (!respuesta.ok){
            throw new Error(`Error al obtener el win rate. Código de estado: ${respuesta.status}`);
        }

        const duelo = await respuesta.json()
        console.log(duelo)
        return duelo

    } catch (error) {
        console.error('Error en la función getWinrate:', error.message);
        throw error;
    }
}