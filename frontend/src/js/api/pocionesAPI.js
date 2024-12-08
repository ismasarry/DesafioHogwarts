//ismael sarrion
import { constantes } from "../classes/constantes.js";

export const getTodasPociones = async () => {
    const rutaPocion = constantes.urlApi + constantes.pociones;

    try {
        const respuesta = await fetch(rutaPocion, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (!respuesta.ok) {
            throw new Error(`Error al obtener la lista de Pociones. Código de estado: ${respuesta.status}`);
        }

        const pociones = await respuesta.json();
        console.log(pociones);
        return pociones;
    } catch (error) {
        console.error('Error en la función getTodasPociones:', error.message);
        throw error;
    }
};

export const getBuscarPocion = async (id_pocion) => {
    const rutaPocion = constantes.urlApi + constantes.pociones;

    try {
        const respuesta = await fetch(rutaPocion + id_pocion, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (!respuesta.ok) {
            throw new Error(`Error al obtener la poción. Código de estado: ${respuesta.status}`);
        }

        const pocion = await respuesta.json();
      //  console.log(pocion);
        return pocion;
    } catch (error) {
        console.error('Error en la función getBuscarPocion:', error.message);
        throw error;
    }
};

export const getPocionesPorUsuario = async (id_usuario) => {
    const rutaPocion = constantes.urlApi + constantes.pociones + 'usuario/';

    try {
        const respuesta = await fetch(rutaPocion + id_usuario, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (!respuesta.ok) {
            throw new Error(`Error al obtener las pociones del usuario. Código de estado: ${respuesta.status}`);
        }

        const pociones = await respuesta.json();
        console.log(pociones);
        return pociones;
    } catch (error) {
        console.error('Error en la función getPocionesPorUsuario:', error.message);
        throw error;
    }
};

export const postPocion = async (pocionCreada) => {
    const rutaPocion = constantes.urlApi + constantes.pociones;

    try {
        const respuesta = await fetch(rutaPocion, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify(pocionCreada),
        });

        if (!respuesta.ok) {
            const errorDetails = await respuesta.json();  
            console.error('Detalles del error:', errorDetails); 
            throw new Error(`Error al añadir la poción. Código de estado: ${respuesta.status}`);
        }

        const resultado = await respuesta.json();
        return resultado;
    } catch (error) {
        console.error('Error en la función postPocion:', error.message);
        throw error;
    }
};



export const putPocion = async (id_pocion, pocion) => {
    const rutaPocion = constantes.urlApi + constantes.pociones;

    try {
        const respuesta = await fetch(rutaPocion + id_pocion, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            body: JSON.stringify(pocion),
        });

        if (!respuesta.ok) {
            throw new Error(`Error al editar la poción. Código de estado: ${respuesta.status}`);
        }

        const resultado = await respuesta.json();
        return resultado;
    } catch (error) {
        console.error('Error en la función putPocion:', error.message);
        throw error;
    }
};

export const deletePocion = async (id_pocion) => {
    const rutaPocion = constantes.urlApi + constantes.pociones;

    try {
        const respuesta = await fetch(rutaPocion + id_pocion, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (!respuesta.ok) {
            throw new Error(`Error al eliminar la poción. Código de estado: ${respuesta.status}`);
        }

        const resultado = await respuesta.json();
        return resultado;
    } catch (error) {
        console.error('Error en la función deletePocion:', error.message);
        throw error;
    }
};
