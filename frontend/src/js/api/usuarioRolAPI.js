//Jaime Ortega
import { constantes } from "../classes/constantes"

export async function mostrarRolesUsuario($idUsuario) {
    const rutaUsuario = constantes.urlApi + constantes.usuRol + $idUsuario

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