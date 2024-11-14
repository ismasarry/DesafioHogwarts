//Raul Gutierrez
import { constantes } from "../classes/constantes.js"

export async function getTodosUsuarios() {
    const rutaUsuario = constantes.urlApi + constantes.usu

    try {
        const respuesta = await fetch(rutaUsuario, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })

        if (!respuesta.ok){
            throw new Error(`Error al obtener la lista de usuarios. Código de estado: ${respuesta.status}`);
        }

        const usuarios = await respuesta.json()
        console.log(usuarios)
        return usuarios.usuario

    } catch (error) {
        console.error('Error en la función getTodosUsuarios:', error.message);
        throw error;
    }
}

export async function getBuscarUsuario(id_usuario) {
    const rutaUsuario = constantes.urlApi + constantes.usu

    try {
        const respuesta = await fetch(rutaUsuario + id_usuario, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })

        if (!respuesta.ok) {
            throw new Error(`Error al obtener el usuario. Código de estado: ${respuesta.status}`);
        }

        const usuario = await respuesta.json();
        console.log(usuario)
        return usuario;
    } catch (error) {
        console.error('Error en la función getBuscarUsuario:', error.message)
        throw error
    }
}

export async function postUsuario(usuarioCreado) {
    const rutaUsuario = constantes.urlApi + constantes.usu
    
    try {
        const respuesta = await fetch(rutaUsuario, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify(usuarioCreado),
        })
        if (!respuesta.ok) {
            throw new Error(`Error al añadir el usuario. Código de estado: ${respuesta.status}`);
        }

        const resultado = await respuesta.json();
        return resultado;
    } catch (error) {
        console.error('Error en la función postUsuario:', error.message);
        throw error;
    }
}

//Jaime Ortega (postFormUsuario)
export async function postFormUsuario(usuarioCreado) {
    const rutaUsuario = constantes.urlApi + constantes.registro
    
    try {
        const respuesta = await fetch(rutaUsuario, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(usuarioCreado),
            // body: usuarioCreado,
        })
        if (!respuesta.ok) {
            throw new Error(`Error al añadir el usuario. Código de estado: ${respuesta.status}`);
        }

        const resultado = await respuesta.json();
        return resultado;
    } catch (error) {
        console.error('Error en la función postFormUsuario:', error.message);
        throw error;
    }
}

export async function putUsuario(id_usuario, usuario) {
    const rutaUsuario = constantes.urlApi + constantes.usu
    try {
        const respuesta = await fetch(rutaUsuario + id_usuario, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            body: JSON.stringify(usuario),
        });

        if (!respuesta.ok) {

            throw new Error(`Error al editar el usuario. Código de estado: ${respuesta.status}`);
        }

        const resultado = await respuesta.json();
        return resultado;
    } catch (error) {
        console.error('Error en la función putUsuario:', error.message);
        throw error;
    }
}

export async function deleteUsuario(id_usuario) {
    const rutaUsuario = constantes.urlApi + constantes.usu

    try {
        const respuesta = await fetch(rutaUsuario + id_usuario, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (!respuesta.ok) {
            throw new Error(`Error al eliminar el usuario. Código de estado: ${respuesta.status}`);
        }

        const resultado = await respuesta.json();
        return resultado;
    } catch (error) {
        console.error('Error en la función deleteUsuario:', error.message)
        throw error
    }
}