import { iniciarSimulacion, obtenerMapaPorSegundo } from '../api/mapaMerodeadorAPI';

document.addEventListener('DOMContentLoaded', () => {
    const iniciarSimulacionBtn = document.getElementById('iniciarSimulacionBtn');
    const segundosSelect = document.getElementById('segundos');
    const mapaContenedor = document.getElementById('mapaContenedor');

    // Función para mostrar el mapa en el frontend
    const renderizarMapa = (mapa) => {
        mapaContenedor.innerHTML = ''; // Limpiar el contenedor

        mapa.forEach((fila) => {
            const filaDiv = document.createElement('div');
            filaDiv.className = 'fila';

            // Decodificar las celdas de cada fila
            const celdas = JSON.parse(fila.contenidofila);
            celdas.forEach((celda) => {
                const celdaDiv = document.createElement('div');
                celdaDiv.className = 'celda';
                celdaDiv.textContent = celda.persona ? `👤 ${celda.persona}` : celda.tipo;
                filaDiv.appendChild(celdaDiv);
            });

            mapaContenedor.appendChild(filaDiv);
        });
    };

    // Función para iniciar la simulación
    const iniciarSimulacionHandler = async () => {
        const segundos = parseInt(segundosSelect.value, 10);

        try {
            // Iniciar simulación en el backend
            await iniciarSimulacion({ segundo: segundos });
            console.log('Simulación iniciada.');

            // Traer los mapas para cada segundo
            for (let i = 1; i <= segundos; i++) {
                const mapaSegundo = await obtenerMapaPorSegundo(i);
                console.log(`Mapa del segundo ${i}:`, mapaSegundo.mapaSegundo);

                // Mostrar cada mapa con un delay de 1 segundo entre cada actualización
                setTimeout(() => renderizarMapa(mapaSegundo.mapaSegundo), i * 1000);
            }
        } catch (error) {
            console.error('Error al iniciar la simulación:', error);
        }
    };

    // Evento para el botón
    iniciarSimulacionBtn.addEventListener('click', iniciarSimulacionHandler);
});
