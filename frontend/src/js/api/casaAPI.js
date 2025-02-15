//Raul Gutierrez
import { constantes } from "../classes/constantes.js"

export const getTodosCasas = async () => {
    const rutaCasa = constantes.urlApi + constantes.casa

    try {
        const respuesta = await fetch(rutaCasa, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })

        if (!respuesta.ok){
            throw new Error(`Error al obtener la lista de Casas. Código de estado: ${respuesta.status}`);
        }

        const casas = await respuesta.json()
        return casas.casa

    } catch (error) {
        console.error('Error en la función getTodosCasas:', error.message);
        throw error;
    }
}

export const getBuscarIntegrantesCasa = async (id_casa) => {
    const rutaCasa = constantes.urlApi + constantes.casa + 'integrantes/'

    try {
        const respuesta = await fetch(rutaCasa + id_casa, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })

        if (!respuesta.ok) {
            throw new Error(`Error al obtener la Casa. Código de estado: ${respuesta.status}`);
        }

        const Casa = await respuesta.json();
        return Casa;
    } catch (error) {
        console.error('Error en la función getBuscarCasa:', error.message)
        throw error
    }
}

export const getBuscarCasa = async (id_casa) => {
    const rutaCasa = constantes.urlApi + constantes.casa

    try {
        const respuesta = await fetch(rutaCasa + id_casa, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })

        if (!respuesta.ok) {
            throw new Error(`Error al obtener la Casa. Código de estado: ${respuesta.status}`);
        }

        const Casa = await respuesta.json();
        return Casa;
    } catch (error) {
        console.error('Error en la función getBuscarCasa:', error.message)
        throw error
    }
}

export const postCasa = async (casaCreado) => {
    const rutaCasa = constantes.urlApi + constantes.casa
    
    try {
        const respuesta = await fetch(rutaCasa, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify(casaCreado),
        })
        if (!respuesta.ok) {

            throw new Error(`Error al añadir la Casa. Código de estado: ${respuesta.status}`);
        }
        const resultado = await respuesta.json();
        return resultado;
    } catch (error) {
        console.error('Error en la función postCasa:', error.message);

        throw error;
    }
}

export const putCasa = async (id_casa, casa) => {
    const rutaCasa = constantes.urlApi + constantes.casa
    try {
        const respuesta = await fetch(rutaCasa + id_casa, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            body: JSON.stringify(casa),
        });

        if (!respuesta.ok) {

            throw new Error(`Error al editar la Casa. Código de estado: ${respuesta.status}`);
        }

        const resultado = await respuesta.json();
        return resultado;
    } catch (error) {
        console.error('Error en la función putCasa:', error.message);
        throw error;
    }
}

export const deleteCasa = async (id_casa) => {
    const rutaCasa = constantes.urlApi + constantes.casa

    try {
        const respuesta = await fetch(rutaCasa + id_casa, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (!respuesta.ok) {
            throw new Error(`Error al eliminar la Casa. Código de estado: ${respuesta.status}`);
        }

        const resultado = await respuesta.json();
        return resultado;
    } catch (error) {
        console.error('Error en la función deleteCasa:', error.message)
        throw error
    }
}