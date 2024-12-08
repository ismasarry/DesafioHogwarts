import { obtenerMapaBase, obtenerMapaPorSegundo, iniciarSimulacion, resetSimulacion } from "../api/mapaMerodeadorAPI.js";

document.addEventListener("DOMContentLoaded", () => {
    const tablaMapa = document.querySelector(".mapa-table");
    const iniciarSimulacionBtn = document.getElementById("iniciarSimulacionBtn");
    const resetSimulacionBtn = document.getElementById("resetSimulacionBtn");
    const segundosSelect = document.getElementById("segundos");

    /**
     *
     * @param {Array} mapa 
     */

    const renderizarMapa = (mapa) => {
        const tablaMapa = document.querySelector('.mapa-table');
        tablaMapa.innerHTML = ''; 
    
        mapa.forEach((fila) => {
            const celdas = JSON.parse(fila.contenidofila);
    
            const filaMapa = document.createElement('tr');
    
            celdas.forEach((celda) => {
                const celdaMapa = document.createElement('td');
    
                if (celda.tipo === 'X') {
                    celdaMapa.classList.add('celda-pared');
                } else if (celda.tipo === 'P') {
                    celdaMapa.classList.add('celda-puerta');
                } else if (celda.tipo === 'S') {
                    celdaMapa.classList.add('celda-suelo');
                }
    
                filaMapa.appendChild(celdaMapa);
            });
    
            tablaMapa.appendChild(filaMapa); 
        });
    };

  
    const iniciarSimulacionHandler = async () => {
        const segundos = segundosSelect.value;

        if (!segundos || segundos < 1 || segundos > 10) {
            alert("Selecciona un número de segundos válido entre 1 y 10.");
            return;
        }

        try {
            console.log("Iniciando simulación...");
            const resultado = await iniciarSimulacion(segundos);

            console.log("Simulación iniciada:", resultado.message);

            for (let segundo = 1; segundo <= segundos; segundo++) {
                const mapaPorSegundo = await obtenerMapaPorSegundo(segundo);
                console.log(`Mapa del segundo ${segundo}:`, mapaPorSegundo.mapaSegundo);
                renderizarMapa(mapaPorSegundo.mapaSegundo);
                await new Promise((resolve) => setTimeout(resolve, 1000)); 
            }
        } catch (error) {
            console.error("Error al iniciar la simulación:", error);
        }
    };

    const resetSimulacionHandler = async () => {
        try {
            console.log("Reiniciando simulación...");
            const resultado = await resetSimulacion();
            console.log("Simulación reiniciada:", resultado.message);

            const mapaBase = await obtenerMapaBase();
            renderizarMapa(mapaBase.mapaBase);
        } catch (error) {
            console.error("Error al reiniciar la simulación:", error);
        }
    };

    if (iniciarSimulacionBtn) {
        iniciarSimulacionBtn.addEventListener("click", iniciarSimulacionHandler);
    }

    if (resetSimulacionBtn) {
        resetSimulacionBtn.addEventListener("click", resetSimulacionHandler);
    }

    const cargarMapaBase = async () => {
        try {
            const mapaBase = await obtenerMapaBase();
            console.log("Mapa base cargado:", mapaBase.mapaBase);
            renderizarMapa(mapaBase.mapaBase);
        } catch (error) {
            console.error("Error al cargar el mapa base:", error);
        }
    };

    cargarMapaBase();
});
