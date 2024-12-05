import { getTodosIngredientes } from '../api/ingredientesAPI';

document.addEventListener('DOMContentLoaded', async () => {
    const tablaIngredientesDisponibles = document.getElementById('tablaIngredientesDisponibles').querySelector('tbody');
    const tablaIngredientesUtilizados = document.getElementById('tablaIngredientesUtilizados').querySelector('tbody');
    const botonCrearPocion = document.getElementById('crearPocion');

    try {
        const respuesta = await getTodosIngredientes();
        const ingredientes = respuesta.ingredientes; 

        if (Array.isArray(ingredientes)) {
            ingredientes.forEach(ingrediente => {
                const fila = document.createElement('tr');
                fila.innerHTML = `
                    <td>${ingrediente.nombre}</td>
                    <td><img src="${ingrediente.foto || ''}" alt="${ingrediente.nombre}" width="50" height="50"></td>
                    <td>
                        <button class="btn btn-primary btn-sm mover-a-utilizados" data-id="${ingrediente.id}">Usar</button>
                        <button class="btn btn-info btn-sm detalles" data-estadisticas="${ingrediente.estadisticas}" data-nombre="${ingrediente.nombre}">Detalles</button>
                    </td>
                `;
                tablaIngredientesDisponibles.appendChild(fila);
            });

            tablaIngredientesDisponibles.addEventListener('click', (e) => {
                if (e.target.classList.contains('mover-a-utilizados')) {
                    moverIngrediente(e.target, tablaIngredientesDisponibles, tablaIngredientesUtilizados);
                } else if (e.target.classList.contains('detalles')) {
                    mostrarDetallesIngrediente(e.target);
                }
            });

            tablaIngredientesUtilizados.addEventListener('click', (e) => {
                if (e.target.classList.contains('mover-a-disponibles')) {
                    moverIngrediente(e.target, tablaIngredientesUtilizados, tablaIngredientesDisponibles);
                } else if (e.target.classList.contains('detalles')) {
                    mostrarDetallesIngrediente(e.target);
                }
            });

            botonCrearPocion.addEventListener('click', () => {
                const ingredientesUtilizados = [...tablaIngredientesUtilizados.querySelectorAll('tr')].map(row =>
                    row.querySelector('button').getAttribute('data-id')
                );
                console.log("Ingredientes seleccionados para la poción:", ingredientesUtilizados);
                alert('Poción creada con los ingredientes seleccionados.');
            });
        } else {
            console.error('Los datos recibidos no son un arreglo.');
        }
    } catch (error) {
        console.error('Error al cargar los ingredientes:', error);
    }
});

function moverIngrediente(boton, origen, destino) {
    const fila = boton.closest('tr');
    const nombreIngrediente = fila.querySelector('td:first-child').textContent.trim();
    const estadisticas = boton.getAttribute('data-estadisticas'); 
    const idIngrediente = boton.getAttribute('data-id'); 

    const nuevoBoton = boton.classList.contains('mover-a-utilizados')
        ? `<button class="btn btn-danger btn-sm mover-a-disponibles" data-id="${idIngrediente}" data-estadisticas="${estadisticas}" data-nombre="${nombreIngrediente}">Quitar</button>
           <button class="btn btn-info btn-sm detalles" data-estadisticas="${estadisticas}" data-nombre="${nombreIngrediente}">Detalles</button>`
        : `<button class="btn btn-primary btn-sm mover-a-utilizados" data-id="${idIngrediente}" data-estadisticas="${estadisticas}" data-nombre="${nombreIngrediente}">Usar</button>
           <button class="btn btn-info btn-sm detalles" data-estadisticas="${estadisticas}" data-nombre="${nombreIngrediente}">Detalles</button>`;

    fila.querySelector('td:last-child').innerHTML = nuevoBoton;
    destino.appendChild(fila);
}



function mostrarDetallesIngrediente(boton) {
    const estadisticas = boton.getAttribute('data-estadisticas');
    const nombreIngrediente = boton.getAttribute('data-nombre');

    const estadisticasArray = estadisticas.split(',');
    const listaEstadisticas = document.getElementById('estadisticasIngrediente');

    const nombresEstadisticas = [
        'Sanación', 'Envenenamiento', 'Analgesia', 'Dolor',
        'Curativo', 'Enfermante', 'Inflamatorio', 'Desinflamatorio'
    ];

    listaEstadisticas.innerHTML = '';

    const titulo = document.createElement('h5');
    titulo.textContent = `Estadísticas de ${nombreIngrediente}`;
    listaEstadisticas.appendChild(titulo);

    for (let i = 0; i < nombresEstadisticas.length; i++) {
        const li = document.createElement('li');

        const valorEstadistica = estadisticasArray[i] ? estadisticasArray[i].trim() : 'No disponible';
        
        li.textContent = `${nombresEstadisticas[i]}: ${valorEstadistica}`;
        listaEstadisticas.appendChild(li);
    }

    const modal = new bootstrap.Modal(document.getElementById('modalDetalles'));
    modal.show();
}
