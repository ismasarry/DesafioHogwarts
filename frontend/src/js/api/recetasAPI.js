// ismael sarrion
import { constantes } from "../classes/constantes.js";

export const obtenerRecetasPorPocion = async (idPocion) => {
    const rutaReceta = `${constantes.urlApi}${constantes.recetas}/pocion/${idPocion}`;

    try {
        const respuesta = await fetch(rutaReceta, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (!respuesta.ok) {
            throw new Error(`Error al obtener las recetas de la poción. Código de estado: ${respuesta.status}`);
        }

        const recetas = await respuesta.json();
        console.log('Recetas asociadas a la poción:', recetas);
        return recetas;
    } catch (error) {
        console.error('Error en la función obtenerRecetasPorPocion:', error.message);
        throw error;
    }
};

export const getTodasRecetas = async () => {
    const rutaReceta = constantes.urlApi + constantes.recetas;

    try {
        const respuesta = await fetch(rutaReceta, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (!respuesta.ok) {
            throw new Error(`Error al obtener la lista de Recetas. Código de estado: ${respuesta.status}`);
        }

        const recetas = await respuesta.json();
        console.log(recetas);
        return recetas;
    } catch (error) {
        console.error('Error en la función getTodasRecetas:', error.message);
        throw error;
    }
};

export const getBuscarReceta = async (id_receta) => {
    const rutaReceta = constantes.urlApi + constantes.recetas;

    try {
        const respuesta = await fetch(rutaReceta + id_receta, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (!respuesta.ok) {
            throw new Error(`Error al obtener la receta. Código de estado: ${respuesta.status}`);
        }

        const receta = await respuesta.json();
        console.log(receta);
        return receta;
    } catch (error) {
        console.error('Error en la función getBuscarReceta:', error.message);
        throw error;
    }
};

export const postReceta = async (recetaCreada) => {
    const rutaReceta = constantes.urlApi + constantes.recetas;

    try {
        const respuesta = await fetch(rutaReceta, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify(recetaCreada),
        });

        if (!respuesta.ok) {
            throw new Error(`Error al añadir la receta. Código de estado: ${respuesta.status}`);
        }

        const resultado = await respuesta.json();
        return resultado;
    } catch (error) {
        console.error('Error en la función postReceta:', error.message);
        throw error;
    }
};

export const putReceta = async (id_receta, receta) => {
    const rutaReceta = constantes.urlApi + constantes.recetas;

    try {
        const respuesta = await fetch(rutaReceta + id_receta, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            body: JSON.stringify(receta),
        });

        if (!respuesta.ok) {
            throw new Error(`Error al editar la receta. Código de estado: ${respuesta.status}`);
        }

        const resultado = await respuesta.json();
        return resultado;
    } catch (error) {
        console.error('Error en la función putReceta:', error.message);
        throw error;
    }
};

export const deleteReceta = async (id_receta) => {
    const rutaReceta = constantes.urlApi + constantes.recetas;

    try {
        const respuesta = await fetch(rutaReceta + id_receta, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (!respuesta.ok) {
            throw new Error(`Error al eliminar la receta. Código de estado: ${respuesta.status}`);
        }

        const resultado = await respuesta.json();
        return resultado;
    } catch (error) {
        console.error('Error en la función deleteReceta:', error.message);
        throw error;
    }
};
