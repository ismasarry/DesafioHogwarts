// import { cargarSideBar } from "../components/cargarSideBar.js"



const mapa = [
    ['X', 'X', 'X', 'X', 'X', 'P', 'X', 'X'],
    ['X', 'S', 'S', 'S', 'S', 'S', 'S', 'X'],
    ['P', 'S', 'S', 'S', 'S', 'S', 'S', 'X'],
    ['X', 'S', 'S', 'S', 'S', 'S', 'S', 'X'],
    ['X', 'S', 'S', 'S', 'S', 'S', 'S', 'P'],
    ['X', 'S', 'S', 'S', 'S', 'S', 'S', 'X'],
    ['X', 'X', 'P', 'X', 'X', 'X', 'X', 'X']
];

const renderizarMapa = (mapa) => {
    const tabla = document.querySelector('.mapa-table');
    tabla.innerHTML = ''; 
    mapa.forEach((fila, filaIndex) => {
        const filaElemento = document.createElement('tr');
        fila.forEach((celda, colIndex) => {
            const celdaElemento = document.createElement('td');
            switch (celda) {
                case 'X':
                    celdaElemento.classList.add('celda-muro');
                    celdaElemento.textContent = '🧱';
                    break;
                case 'P':
                    celdaElemento.classList.add('celda-puerta');
                    celdaElemento.textContent = '🚪';
                    break;
                case 'S':
                    celdaElemento.classList.add('celda-suelo');
                    celdaElemento.textContent = ' ';
                    break;
                default:
                    celdaElemento.textContent = celda;
            }
            filaElemento.appendChild(celdaElemento);
        });
        tabla.appendChild(filaElemento);
    });
};

renderizarMapa(mapa);
