import { cargarSideBar } from "../components/cargarSideBar.js";
import { getTodosIngredientes, postIngrediente } from '../api/ingredientesAPI.js';
import { postReceta } from '../api/recetasAPI.js';
import { postPocion } from '../api/pocionesAPI.js';
import { mostrarRolesUsuario } from "../api/usuarioRolAPI.js";

cargarSideBar();

document.addEventListener('DOMContentLoaded', async () => {
    const tablaIngredientesDisponibles = document.getElementById('tablaIngredientesDisponibles').querySelector('tbody');
    const tablaIngredientesUtilizados = document.getElementById('tablaIngredientesUtilizados').querySelector('tbody');
    const botonCrearPocion = document.getElementById('crearPocion');
    const usuario = sessionStorage.getItem('userId');
    const guardarIngredienteBtn = document.getElementById('guardarIngrediente');
    const formCrearIngrediente = document.getElementById('formCrearIngrediente');
    const nombreIngredienteInput = document.getElementById('nombreIngrediente');
    const estadisticasIngredienteInput = document.getElementById('estadisticasIngrediente');
    console.log("Usuario obtenido del sessionStorage:", usuario);

    try {
        const respuesta = await getTodosIngredientes();
        console.log("Respuesta obtenida de getTodosIngredientes:", respuesta);

        const ingredientes = respuesta.ingredientes;

        if (Array.isArray(ingredientes)) {
            console.log("Ingredientes disponibles:", ingredientes);

            ingredientes.forEach(ingrediente => {
                const fila = document.createElement('tr');
                fila.innerHTML = `
                    <td>${ingrediente.nombre}</td>
                    <td>
                        <button class="btn btn-primary btn-sm mover-a-utilizados" data-id="${ingrediente.id}" data-estadisticas="${ingrediente.estadisticas}">Usar</button>
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

        } else {
            console.error('Los datos recibidos no son un arreglo:', respuesta);
        }
    } catch (error) {
        console.error('Error al cargar los ingredientes:', error);
    }

    function moverIngrediente(boton, origen, destino) {
        console.log("Moviendo ingrediente:", boton);

        const fila = boton.closest('tr');
        const nombreIngrediente = fila.querySelector('td:first-child').textContent.trim();
        const estadisticas = boton.getAttribute('data-estadisticas');
        const idIngrediente = boton.getAttribute('data-id');
        console.log(`Nombre: ${nombreIngrediente}, ID: ${idIngrediente}, Estadísticas: ${estadisticas}`);

        const nuevoBoton = boton.classList.contains('mover-a-utilizados')
            ? `<button class="btn btn-danger btn-sm mover-a-disponibles" data-id="${idIngrediente}" data-estadisticas="${estadisticas}" data-nombre="${nombreIngrediente}">Quitar</button>
               <button class="btn btn-info btn-sm detalles" data-estadisticas="${estadisticas}" data-nombre="${nombreIngrediente}">Detalles</button>`
            : `<button class="btn btn-primary btn-sm mover-a-utilizados" data-id="${idIngrediente}" data-estadisticas="${estadisticas}" data-nombre="${nombreIngrediente}">Usar</button>
               <button class="btn btn-info btn-sm detalles" data-estadisticas="${estadisticas}" data-nombre="${nombreIngrediente}">Detalles</button>`;

        fila.querySelector('td:last-child').innerHTML = nuevoBoton;
        destino.appendChild(fila);
    }

    function mostrarDetallesIngrediente(boton) {
        try {
            console.log("Mostrando detalles para el ingrediente:", boton);
    
            if (!boton) {
                console.error("El botón proporcionado es null o undefined.");
                return;
            }
    
            const estadisticas = boton.getAttribute('data-estadisticas');
            const nombreIngrediente = boton.getAttribute('data-nombre');
    
            if (!estadisticas) {
                console.error("No se encontró el atributo 'data-estadisticas' en el botón.");
                return;
            }
    
            if (!nombreIngrediente) {
                console.error("No se encontró el atributo 'data-nombre' en el botón.");
                return;
            }
    
            console.log("Estadísticas obtenidas:", estadisticas);
            console.log("Nombre del ingrediente obtenido:", nombreIngrediente);
    
            const estadisticasArray = estadisticas.split(',').map(valor => valor.trim());
            console.log("Estadísticas procesadas como array:", estadisticasArray);
    
            const listaEstadisticas = document.getElementById('estadisticasIngrediente');
            if (!listaEstadisticas) {
                console.error("No se encontró el elemento con ID 'estadisticasIngrediente' en el DOM.");
                return;
            }
    
            const nombresEstadisticas = [
                'Sanación', 'Envenenamiento', 'Analgesia', 'Dolor',
                'Curativo', 'Enfermante', 'Desinflamatorio', 'Inflamatorio'
            ];
    
            listaEstadisticas.innerHTML = '';
    
            const titulo = document.createElement('h5');
            titulo.textContent = `Estadísticas de ${nombreIngrediente}`;
            listaEstadisticas.appendChild(titulo);
    
            for (let i = 0; i < nombresEstadisticas.length; i++) {
                const li = document.createElement('li');
                const valorEstadistica = estadisticasArray[i] !== undefined ? estadisticasArray[i] : 'No disponible';
                li.textContent = `${nombresEstadisticas[i]}: ${valorEstadistica}`;
                listaEstadisticas.appendChild(li);
            }
    
            console.log("Lista de estadísticas creada exitosamente.");
    
            const modalElement = document.getElementById('modalDetalles');
            if (!modalElement) {
                console.error("No se encontró el elemento con ID 'modalDetalles' en el DOM.");
                return;
            }
    
            const modal = new bootstrap.Modal(modalElement);
            modal.show();
    
            console.log("Modal mostrado correctamente.");
        } catch (error) {
            console.error("Ocurrió un error inesperado:", error);
        }
    }
    
    

    async function crearPocion() {
        if (!usuario) {
            mostrarMensaje('Error: No se pudo obtener el usuario. Asegúrate de haber iniciado sesión.', 'danger');
            return;
        }
    
        try {
            const rolesData = await mostrarRolesUsuario(usuario);
            console.log("Roles obtenidos para el usuario:", rolesData);
    
            const rolesArray = rolesData.roles.map(role => role.nombre);
            console.log("Roles como arreglo de nombres:", rolesArray);
    
            const veri = rolesArray.includes('profesor') || rolesArray.includes('admin') || rolesArray.includes('Dumbledore') ? 1 : 0;
            console.log("Valor de 'veri' calculado:", veri);
    
            const nombrePocion = document.getElementById('nombrePocion').value.trim();
            const descripcionPocion = document.getElementById('descripcionPocion').value.trim();
    
            console.log("Nombre de la poción ingresado:", nombrePocion);
            console.log("Descripción de la poción ingresada:", descripcionPocion);
    
            if (!nombrePocion || !descripcionPocion) {
                mostrarMensaje('Por favor, completa el nombre y la descripción de la poción.', 'danger');
                return;
            }
    
            const ingredientesUtilizados = [...tablaIngredientesUtilizados.querySelectorAll('tr')].map(row =>
                row.querySelector('button[data-id]').getAttribute('data-id')
            );
    
            console.log("Ingredientes utilizados seleccionados:", ingredientesUtilizados);
    
            if (ingredientesUtilizados.length === 0) {
                mostrarMensaje('Selecciona al menos un ingrediente para crear la poción.', 'danger');
                return;
            }
    
            const estadisticasTotales = ingredientesUtilizados.reduce((totales, idIngrediente) => {
                const fila = document.querySelector(`button[data-id="${idIngrediente}"]`);
                const estadisticas = fila.getAttribute('data-estadisticas').split(',').map(Number);
                console.log(`Estadísticas del ingrediente (ID ${idIngrediente}):`, estadisticas);
                return totales.map((total, index) => total + (estadisticas[index] || 0));
            }, Array(8).fill(0));
    
            console.log("Estadísticas totales calculadas para la poción:", estadisticasTotales);
    
            const primerasEstadisticas = estadisticasTotales.slice(0, 4); 
            const segundasEstadisticas = estadisticasTotales.slice(4, 8); 
    
            const mediaPrimeras = primerasEstadisticas.reduce((a, b) => a + b, 0) / primerasEstadisticas.length;
            const mediaSegundas = segundasEstadisticas.reduce((a, b) => a + b, 0) / segundasEstadisticas.length;
    
            console.log("Media de las primeras estadísticas:", mediaPrimeras);
            console.log("Media de las segundas estadísticas:", mediaSegundas);
    
            let descripcionFinal = descripcionPocion;
            if (mediaPrimeras > mediaSegundas) {
                descripcionFinal = `Es una poción beneficiosa que ${descripcionPocion}`;
            } else if (mediaSegundas > mediaPrimeras) {
                descripcionFinal = `Es una poción perjudicial que ${descripcionPocion}`;
            }
    
            const nuevaPocion = {
                nombre: nombrePocion,
                descripcion: descripcionFinal,
                estadisticas: estadisticasTotales.join(','),
                idUsuario: usuario,
                veri: veri,
            };
    
            console.log("Datos enviados para la creación de la poción:", nuevaPocion);
    
            const respuesta = await postPocion(nuevaPocion);
            console.log("Respuesta de la creación de la poción:", respuesta);
    
            const idPocionCreada = respuesta.pocion.id;
            console.log("ID de la poción creada:", idPocionCreada);
    
            for (const idIngrediente of ingredientesUtilizados) {
                const recetaData = { idPocion: idPocionCreada, idIngrediente: idIngrediente };
                console.log("Datos enviados para la receta:", recetaData);
                await postReceta(recetaData);
            }
    
            mostrarMensaje('Poción creada exitosamente.', 'success');
        } catch (error) {
            console.error('Error al crear la poción:', error);
            mostrarMensaje('Ocurrió un error al crear la poción. Revisa la consola para más detalles.', 'danger');
        }
    }

    function mostrarMensaje(mensaje, tipo = 'info') {
        const divMensaje = document.getElementById('mensaje');
        divMensaje.classList.remove('alert-success', 'alert-danger', 'alert-info');
        divMensaje.classList.add(`alert-${tipo}`);
        divMensaje.textContent = mensaje;
        divMensaje.style.display = 'block';
        setTimeout(() => {
            divMensaje.style.display = 'none';
        }, 5000); 
    }

    botonCrearPocion.addEventListener('click', crearPocion);
    
    guardarIngredienteBtn.addEventListener('click', async () => {
        const nombre = nombreIngredienteInput.value.trim();
        const estadisticas = estadisticasIngredienteInput.value.trim();
    
        if (!nombre || !estadisticas) {
            alert('Por favor, completa todos los campos.');
            return;
        }
    
        const nuevoIngrediente = {
            nombre: nombre,
            estadisticas: estadisticas
        };
    
        try {
            const respuesta = await postIngrediente(nuevoIngrediente);
            console.log('Ingrediente creado:', respuesta);
            
            const modal = new bootstrap.Modal(document.getElementById('modalCrearIngrediente'));
            modal.hide();
            
            cargarIngredientesDisponibles();
        } catch (error) {
            console.error('Error al crear el ingrediente:', error);
            alert('Ocurrió un error al crear el ingrediente.');
        }
    });
});
