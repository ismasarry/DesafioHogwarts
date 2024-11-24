//Jaime Ortega
import { constantes } from "../classes/constantes"

export const mostrarRolesUsuario = async (idUsuario) => {
    const rutaUsuario = constantes.urlApi + constantes.usuRol + idUsuario

    try {
        const respuesta = await fetch(rutaUsuario, {
            method: 'GET',
            headers: {
                "Authorization": "Bearer " + sessionStorage.getItem("token"),
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*"
            }
        
        })

        if (!respuesta.ok) {
            throw new Error(`Error al obtener la lista de roles del usuario. Código de estado: ${respuesta.status}`);
        }

        const resultado = await respuesta.json()
        return resultado

    } catch (error) {
        console.error('Error en la función getTodosUsuarios:', error.message);
        throw error;
    }
}
//Raul Gutierrez
export async function getTodosUsuariosRoles() {
    const rutaUsuario = constantes.urlApi + constantes.usuRol

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
        return usuarios

    } catch (error) {
        console.error('Error en la función getTodosUsuariosRoles:', error.message);
        throw error;
    }
}
//Raul Gutierrez
export const deleteUsuarioRol = async (id_usuarioRol, id_rol) => {
    const rutaUsuario = constantes.urlApi + constantes.usuRol

    try {
        const respuesta = await fetch(rutaUsuario + id_usuarioRol + '/' + id_rol, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (!respuesta.ok) {
            throw new Error(`Error al eliminar el rol del usuario. Código de estado: ${respuesta.status}`);
        }

        const resultado = await respuesta.json();
        return resultado;
    } catch (error) {
        console.error('Error en la función deleteUsuarioRol:', error.message)
        throw error
    }
}
//Raul Gutierrez
export const postUsuarioRol = async (usuarioCreado) => {
    const rutaUsuario = constantes.urlApi + constantes.usuRol
    
    try {
        const respuesta = await fetch(rutaUsuario, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                //'Accept': 'application/json'
            },
            body: JSON.stringify(usuarioCreado),
        })
        if (!respuesta.ok) {
            throw new Error(`Error al añadir el usuario. Código de estado: ${respuesta.status}`);
        }

        const resultado = await respuesta.json();
        return resultado;
    } catch (error) {
        console.error('Error en la función postUsuarioRol:', error.message);
        throw error;
    }
}