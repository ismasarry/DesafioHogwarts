// ismael sarrion
import { constantes } from "../classes/constantes.js";

export const getTodosIngredientes = async () => {
    const rutaIngrediente = constantes.urlApi + constantes.ingredientes;

    try {
        const respuesta = await fetch(rutaIngrediente, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (!respuesta.ok) {
            throw new Error(`Error al obtener la lista de Ingredientes. Código de estado: ${respuesta.status}`);
        }

        const ingredientes = await respuesta.json();
        console.log(ingredientes);
        return ingredientes;
    } catch (error) {
        console.error('Error en la función getTodosIngredientes:', error.message);
        throw error;
    }
};

export const getBuscarIngrediente = async (id_ingrediente) => {
    const rutaIngrediente = constantes.urlApi + constantes.ingredientes;

    try {
        const respuesta = await fetch(rutaIngrediente + id_ingrediente, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (!respuesta.ok) {
            throw new Error(`Error al obtener el ingrediente. Código de estado: ${respuesta.status}`);
        }

        const ingrediente = await respuesta.json();
        console.log(ingrediente);
        return ingrediente;
    } catch (error) {
        console.error('Error en la función getBuscarIngrediente:', error.message);
        throw error;
    }
};

export const postIngrediente = async (ingredienteCreado) => {
    const rutaIngrediente = constantes.urlApi + constantes.ingredientes;

    try {
        const respuesta = await fetch(rutaIngrediente, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify(ingredienteCreado),
        });

        if (!respuesta.ok) {
            throw new Error(`Error al añadir el ingrediente. Código de estado: ${respuesta.status}`);
        }

        const resultado = await respuesta.json();
        return resultado;
    } catch (error) {
        console.error('Error en la función postIngrediente:', error.message);
        throw error;
    }
};

export const putIngrediente = async (id_ingrediente, ingrediente) => {
    const rutaIngrediente = constantes.urlApi + constantes.ingredientes;

    try {
        const respuesta = await fetch(rutaIngrediente + id_ingrediente, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            body: JSON.stringify(ingrediente),
        });

        if (!respuesta.ok) {
            throw new Error(`Error al editar el ingrediente. Código de estado: ${respuesta.status}`);
        }

        const resultado = await respuesta.json();
        return resultado;
    } catch (error) {
        console.error('Error en la función putIngrediente:', error.message);
        throw error;
    }
};

export const deleteIngrediente = async (id_ingrediente) => {
    const rutaIngrediente = constantes.urlApi + constantes.ingredientes;

    try {
        const respuesta = await fetch(rutaIngrediente + id_ingrediente, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (!respuesta.ok) {
            throw new Error(`Error al eliminar el ingrediente. Código de estado: ${respuesta.status}`);
        }

        const resultado = await respuesta.json();
        return resultado;
    } catch (error) {
        console.error('Error en la función deleteIngrediente:', error.message);
        throw error;
    }
};
