//Raul Gutierrez Merino
import { getTodosCasas } from "../api/casaAPI.js";

document.addEventListener("DOMContentLoaded", async () => {
    const casas = await getTodosCasas()
    casas.forEach(casa => {
        const mostrarTop = `
        <div class="col-md-3">
            <div class="card mb-4">
                <img src="./../assets/${casa.nombre}.png" class="card-img-top">
                <div class="card-body text-center">
                    <h5 class="card-title">${casa.nombre}</h5>
                    <p class="card-text">Puntos: ${casa.puntos}</p>
                </div>
            </div>
        </div>
    `
    document.body.insertAdjacentHTML('beforeend', mostrarTop)
    })
})