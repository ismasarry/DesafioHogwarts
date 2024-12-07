import { constantes } from "../classes/constantes"

//Jaime Ortega
export const obtenerMapaBase = async () => {
    const rutaMapa = constantes.urlApi + constantes.mapa + 'base'

    try {
        const respuesta = await fetch(rutaMapa, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })

        if (!respuesta.ok) {
            throw new Error(`Error al obtener mapa base: ${respuesta.status}`)
        }

        const mapaBase = await respuesta.json()
        return mapaBase
    } catch (e) {
        console.error('Error en la función getMapaBase: ', e.message)
        throw e
    }
}

export const obtenerMapaPorSegundo = async (segundo) => {
    const rutaMapa = constantes.urlApi + constantes.mapa + constantes.segundo

    try {
        const respuesta = await fetch(rutaMapa + segundo, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })

        if (!respuesta.ok) {
            throw new Error(`Error al obtener mapa del segundo seleccionado: ${respuesta.status}`)
        }

        const mapaSegundo = await respuesta.json()
        return mapaSegundo
    } catch (e) {
        console.error('Error en la función getMapaPorSegundo: ', e.message)
        throw e
    }
}

export const iniciarSimulacion = async (segundoSimulacion) => {
    const rutaMapa = constantes.urlApi + constantes.mapa + constantes.simulacion

    try {
        const respuesta = await fetch(rutaMapa, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify(segundoSimulacion),
        })

        if (!respuesta.ok) {
            throw new Error(`Error al iniciar simulación: ${respuesta.status}`)
        }

        const simulacion = await respuesta.json()
        return simulacion
    } catch (e) {
        console.error('Error en la funcion iniciarSimulacion: ', e.message)
        throw e
    }
}

export const resetSimulacion = async () => {
    const rutaMapa = constantes.urlApi + constantes.mapa + constantes.simulacion + 'reset'

    try {
        const respuesta = await fetch(rutaMapa, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            }
        })

        if (!respuesta.ok) {
            throw new Error(`Error al eliminar la simulación anterior: ${respuesta.status}`)
        }

        const simulacionReset = await respuesta.json()
        return simulacionReset
    } catch (e) {
        console.error('Error en la función resetSimulacion: ', e.message)
        throw e
    }
}
