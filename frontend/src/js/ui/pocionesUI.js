import { getBuscarUsuario, getTodosUsuarios } from "../api/usuarioAPI.js";
import { cargarSideBar } from "../components/cargarSideBar.js";
import { getTodasPociones, getBuscarPocion, postPocion, putPocion, deletePocion } from "../api/pocionesAPI.js";
import { mostrarRolesUsuario } from "../api/usuarioRolAPI.js";
cargarSideBar

document.addEventListener("DOMContentLoaded", function () {
    async function rellenarPociones() {
        const usuario = sessionStorage.getItem('userId');
        const usuariosParaPocion = await getTodosUsuarios(); 
        const pociones = await getTodasPociones(); 
        const roles = await mostrarRolesUsuario(usuario);
        console.log(roles);
        console.log(pociones.pociones.nombre)

        anadirPocionUI()

        const tabla = $('#pociones').DataTable();
tabla.clear().draw();

pociones.pociones.forEach(pocion => {
    console.log(pocion.veri)
    if (roles.roles[0].nombre == "profesor" && pocion.veri == 0) {
        
        const esta = (pocion.estadisticas).split(','); 
        let creador = 0;
        if (pocion.idUsuario == 0) {
            creador = 'Desconocido';
        } else {
            for (let i = 0; i < usuariosParaPocion.Usuario.length; i++) {
                if (pocion.idUsuario == usuariosParaPocion.Usuario[i].id) {
                    creador = usuariosParaPocion.Usuario[i].nombre;
                }
            }
        }

        const row = tabla.row.add([
            pocion.nombre,
            esta[0],  // Sanación
            esta[1],  // Envenenamiento
            esta[2],  // Analgesia
            esta[3],  // Dolor
            esta[4],  // Curativo
            esta[5],  // Enfermante
            esta[6],  // Inflamatorio
            esta[7],  // Desinflamatorio
            pocion.descripcion, 
            creador,
            `<button type="button" class="btn btn-primary btn-sm" data-bs-toggle="modal" data-bs-target="#myModal${pocion.id}"><i class="fas fa-edit"></i> Editar</button>` +
            `<button class="btn btn-danger btn-sm" data-bs-toggle="modal" data-bs-target="#deleteModal${pocion.id}" ><i class="fas fa-trash-alt"></i> Eliminar</button>` +
            `<button type="button" class="btn btn-primary btn-sm" data-bs-toggle="modal" data-bs-target="#veriModal${pocion.id}"><i class="fas fa-edit"></i> Verificar</button>`
        ]).draw();

        const editarPocion = ` 
            <div class="modal" id="myModal${pocion.id}">
                <div class="modal-dialog modal-md">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h4 class="modal-title">Editar poción ${pocion.nombre}</h4>
                            <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
                        </div>
                        <div class="modal-body">
                            <div class="row">
                                <div class="col-sm-12 col-md-6 col-lg-6">
                                    <label for="nombre" class="form-label">Nombre</label>
                                    <input type="text" id="nombre${pocion.id}" name="nombre${pocion.id}" class="form-control" value="${pocion.nombre}">
                                    <div class="invalid-feedback" id="mensajeNombre"></div>
                                </div>

                                <div class="col-sm-12 col-md-6 col-lg-6">
                                    <label for="sanacion" class="form-label">Sanación</label>
                                    <input type="text" id="sanacion${pocion.id}" name="sanacion${pocion.id}" class="form-control" value="${esta[0]}">
                                    <div class="invalid-feedback" id="mensajeSanacion"></div>
                                </div>

                                <div class="col-sm-12 col-md-6 col-lg-6">
                                    <label for="envenenamiento" class="form-label">Envenenamiento</label>
                                    <input type="text" id="envenenamiento${pocion.id}" name="envenenamiento${pocion.id}" class="form-control" value="${esta[1]}">
                                    <div class="invalid-feedback" id="mensajeEnvenenamiento"></div>
                                </div>

                                <div class="col-sm-12 col-md-6 col-lg-6">
                                    <label for="analgesia" class="form-label">Analgesia</label>
                                    <input type="text" id="analgesia${pocion.id}" name="analgesia${pocion.id}" class="form-control" value="${esta[2]}">
                                    <div class="invalid-feedback" id="mensajeAnalgesia"></div>
                                </div>

                                <div class="col-sm-12 col-md-6 col-lg-6">
                                    <label for="dolor" class="form-label">Dolor</label>
                                    <input type="text" id="dolor${pocion.id}" name="dolor${pocion.id}" class="form-control" value="${esta[3]}">
                                    <div class="invalid-feedback" id="mensajeDolor"></div>
                                </div>

                                <div class="col-sm-12 col-md-6 col-lg-6">
                                    <label for="curativo" class="form-label">Curativo</label>
                                    <input type="text" id="curativo${pocion.id}" name="curativo${pocion.id}" class="form-control" value="${esta[4]}">
                                    <div class="invalid-feedback" id="mensajeCurativo"></div>
                                </div>

                                <div class="col-sm-12 col-md-6 col-lg-6">
                                    <label for="enfermante" class="form-label">enfermante</label>
                                    <textarea id="enfermante${pocion.id}" name="enfermante${pocion.id}" class="form-control">${pocion.enfermante}</textarea>
                                    <div class="invalid-feedback" id="mensajeEnfermante"></div>
                                </div>

                                <div class="col-sm-12 col-md-6 col-lg-6">
                                    <label for="inflamatorio" class="form-label">inflamatorio</label>
                                    <textarea id="inflamatorio${pocion.id}" name="inflamatorio${pocion.id}" class="form-control">${pocion.inflamatorio}</textarea>
                                    <div class="invalid-feedback" id="mensajeInflamatorio"></div>
                                </div>

                                <div class="col-sm-12 col-md-6 col-lg-6">
                                    <label for="desinflamatorio" class="form-label">desinflamatorio</label>
                                    <textarea id="desinflamatorio${pocion.id}" name="desinflamatorio${pocion.id}" class="form-control">${pocion.desinflamatorio}</textarea>
                                    <div class="invalid-feedback" id="mensajeDesinflamatorio"></div>
                                </div>

                                 <div class="col-sm-12 col-md-6 col-lg-6">
                                    <label for="descripcion" class="form-label">Descripción</label>
                                    <textarea id="descripcion${pocion.id}" name="descripcion${pocion.id}" class="form-control">${pocion.descripcion}</textarea>
                                    <div class="invalid-feedback" id="mensajeDescripcion"></div>
                                </div>

                                <div class="col-sm-12 col-md-6 col-lg-6">
                                    <label for="creador" class="form-label">Creador</label>
                                    <input type="text" id="creador${pocion.id}" name="creador${pocion.id}" class="form-control" value="${creador}">
                                    <div class="invalid-feedback" id="mensajeCreador"></div>
                                </div>
                            </div>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-danger" data-bs-dismiss="modal" id="editarBtn${pocion.id}">Editar poción</button>
                        </div>
                    </div>                
                </div>
            </div>
        `;

        const eliminarPocion =
            `
            <div class="modal" id="deleteModal${pocion.id}">
                <div class="modal-dialog modal-md">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h4 class="modal-title">Confirmar Eliminación</h4>
                            <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
                        </div>

                        <div class="modal-body">
                            <p>¿Estás seguro de que deseas eliminar la poción ${pocion.nombre}?</p>
                        </div>

                        <div class="modal-footer">
                            <button type="button" class="btn btn-danger" data-bs-dismiss="modal" id="confirmarEliminacion${pocion.id}">Confirmar Eliminación</button>
                        </div>
                    </div>
                </div>
            </div>
        `;

        const veriPocion =
        `
            <div class="modal" id="veriModal${pocion.id}">
                <div class="modal-dialog modal-md">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h4 class="modal-title">Confirmar verificación</h4>
                            <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
                        </div>

                        <div class="modal-body">
                            <p>¿Estás seguro de que deseas verificar la poción ${pocion.nombre}?</p>
                        </div>

                        <div class="modal-footer">
                            <button type="button" class="btn btn-danger" data-bs-dismiss="modal" id="confirmarVerificacion${pocion.id}">Confirmar verificación</button>
                        </div>
                    </div>
                </div>
            </div>
        `;

        document.body.insertAdjacentHTML('beforeend', editarPocion);
            editarPocionUI(pocion.id);

        document.body.insertAdjacentHTML('beforeend', eliminarPocion);
         eliminarPocionUI(pocion.id);

        document.body.insertAdjacentHTML('beforeend', veriPocion);
         veriPocionUI(pocion.id);

        row.nodes().to$().data('pociones', pocion);
        
            //profesor pero ya verificado
        }else if (roles.roles[0].nombre == "profesor" && pocion.veri == 1) {

            const esta = (pocion.estadisticas).split(',');
            let creador = 0;
            if (pocion.idUsuario == 0) {
                creador = 'Desconocido';
            } else {
                for (let i = 0; i < usuariosParaPocion.Usuario.length; i++) {
                    if (pocion.idUsuario == usuariosParaPocion.Usuario[i].id) {
                        creador = usuariosParaPocion.Usuario[i].nombre;
                    }
                }
            }
        
            const row = tabla.row.add([
                pocion.nombre,
                esta[0],  // Sanación
                esta[1],  // Envenenamiento
                esta[2],  // Analgesia
                esta[3],  // Dolor
                esta[4],  // Curativo
                esta[5],  // Enfermante
                esta[6],  // Inflamatorio
                esta[7],  // Desinflamatorio
                pocion.descripcion, 
                creador,
                `<button type="button" class="btn btn-primary btn-sm" data-bs-toggle="modal" data-bs-target="#myModal${pocion.id}"><i class="fas fa-edit"></i> Editar</button>` +
                `<button class="btn btn-danger btn-sm" data-bs-toggle="modal" data-bs-target="#deleteModal${pocion.id}"><i class="fas fa-trash-alt"></i> Eliminar</button>`
            ]).draw();
        
            const editarPocion = ` 
            <div class="modal" id="myModal${pocion.id}">
                <div class="modal-dialog modal-md">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h4 class="modal-title">Editar poción ${pocion.nombre}</h4>
                            <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
                        </div>
                        <div class="modal-body">
                            <div class="row">
                                <div class="col-sm-12 col-md-6 col-lg-6">
                                    <label for="nombre" class="form-label">Nombre</label>
                                    <input type="text" id="nombre${pocion.id}" name="nombre${pocion.id}" class="form-control" value="${pocion.nombre}">
                                    <div class="invalid-feedback" id="mensajeNombre"></div>
                                </div>

                                <div class="col-sm-12 col-md-6 col-lg-6">
                                    <label for="sanacion" class="form-label">Sanación</label>
                                    <input type="text" id="sanacion${pocion.id}" name="sanacion${pocion.id}" class="form-control" value="${esta[0]}">
                                    <div class="invalid-feedback" id="mensajeSanacion"></div>
                                </div>

                                <div class="col-sm-12 col-md-6 col-lg-6">
                                    <label for="envenenamiento" class="form-label">Envenenamiento</label>
                                    <input type="text" id="envenenamiento${pocion.id}" name="envenenamiento${pocion.id}" class="form-control" value="${esta[1]}">
                                    <div class="invalid-feedback" id="mensajeEnvenenamiento"></div>
                                </div>

                                <div class="col-sm-12 col-md-6 col-lg-6">
                                    <label for="analgesia" class="form-label">Analgesia</label>
                                    <input type="text" id="analgesia${pocion.id}" name="analgesia${pocion.id}" class="form-control" value="${esta[2]}">
                                    <div class="invalid-feedback" id="mensajeAnalgesia"></div>
                                </div>

                                <div class="col-sm-12 col-md-6 col-lg-6">
                                    <label for="dolor" class="form-label">Dolor</label>
                                    <input type="text" id="dolor${pocion.id}" name="dolor${pocion.id}" class="form-control" value="${esta[3]}">
                                    <div class="invalid-feedback" id="mensajeDolor"></div>
                                </div>

                                <div class="col-sm-12 col-md-6 col-lg-6">
                                    <label for="curativo" class="form-label">Curativo</label>
                                    <input type="text" id="curativo${pocion.id}" name="curativo${pocion.id}" class="form-control" value="${esta[4]}">
                                    <div class="invalid-feedback" id="mensajeCurativo"></div>
                                </div>

                                <div class="col-sm-12 col-md-6 col-lg-6">
                                    <label for="enfermante" class="form-label">enfermante</label>
                                    <textarea id="enfermante${pocion.id}" name="enfermante${pocion.id}" class="form-control">${pocion.enfermante}</textarea>
                                    <div class="invalid-feedback" id="mensajeEnfermante"></div>
                                </div>

                                <div class="col-sm-12 col-md-6 col-lg-6">
                                    <label for="inflamatorio" class="form-label">inflamatorio</label>
                                    <textarea id="inflamatorio${pocion.id}" name="inflamatorio${pocion.id}" class="form-control">${pocion.inflamatorio}</textarea>
                                    <div class="invalid-feedback" id="mensajeInflamatorio"></div>
                                </div>

                                <div class="col-sm-12 col-md-6 col-lg-6">
                                    <label for="desinflamatorio" class="form-label">desinflamatorio</label>
                                    <textarea id="desinflamatorio${pocion.id}" name="desinflamatorio${pocion.id}" class="form-control">${pocion.desinflamatorio}</textarea>
                                    <div class="invalid-feedback" id="mensajeDesinflamatorio"></div>
                                </div>

                                 <div class="col-sm-12 col-md-6 col-lg-6">
                                    <label for="descripcion" class="form-label">Descripción</label>
                                    <textarea id="descripcion${pocion.id}" name="descripcion${pocion.id}" class="form-control">${pocion.descripcion}</textarea>
                                    <div class="invalid-feedback" id="mensajeDescripcion"></div>
                                </div>

                                <div class="col-sm-12 col-md-6 col-lg-6">
                                    <label for="creador" class="form-label">Creador</label>
                                    <input type="text" id="creador${pocion.id}" name="creador${pocion.id}" class="form-control" value="${creador}">
                                    <div class="invalid-feedback" id="mensajeCreador"></div>
                                </div>
                            </div>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-danger" data-bs-dismiss="modal" id="editarBtn${pocion.id}">Editar poción</button>
                        </div>
                    </div>                
                </div>
            </div>
        `;
        
            document.body.insertAdjacentHTML('beforeend', editarPocion);
            editarPocionUI(pocion.id);
        
            document.body.insertAdjacentHTML('beforeend', eliminarPocion);
            eliminarPocionUI(pocion.id);
        
            row.nodes().to$().data('pociones', pocion)

        }
    })
}

            async function editarPocionUI(id) { 
            const modificarBtn = document.getElementById(`editarBtn${id}`);
            if (modificarBtn) {
        
                modificarBtn.addEventListener('click', async () => {
                    try {
        
                        const modalElement = document.getElementById(`myModal${id}`);
                        const nombrePocion = modalElement.querySelector(`#nombre${id}`).value;
                        const descripcionPocion = modalElement.querySelector(`#descripcion${id}`).value;
                        const sanacionPocion = modalElement.querySelector(`#sanacion${id}`).value;
                        const envenenamientoPocion = modalElement.querySelector(`#envenenamiento${id}`).value;
                        const analgesiaPocion = modalElement.querySelector(`#analgesia${id}`).value;
                        const danoPocion = modalElement.querySelector(`#dano${id}`).value;
                        const dolorPocion = modalElement.querySelector(`#dolor${id}`).value;
                        const curativoPocion = modalElement.querySelector(`#curativo${id}`).value;
                        const creadorPocion = modalElement.querySelector(`#creador${id}`).value;
                        const nivelPocion = modalElement.querySelector(`#nivel${id}`).value;
        
                        const estadisticas = [sanacionPocion, envenenamientoPocion, analgesiaPocion, danoPocion, dolorPocion, curativoPocion].toString(", ");
        
                        let creador = '';
        
                        if (creadorPocion == 'Desconocido') {
                            creador = 0;
                        } else {
                            const creadores = await getTodosUsuarios();
                            creador = (creadores.Usuario.find((nombre) => nombre.nombre == creadorPocion)).id;
                        }
        
                        const pocionObjeto = {
                            nombre: nombrePocion,
                            descripcion: descripcionPocion,
                            estadisticas: estadisticas,
                            idUsuario: creador.toString(),
                            nivel: nivelPocion,
                            veri: 0,
                            veriD: 0
                        };
        
                        await putPocion(id, pocionObjeto);
        
                        const modal = new bootstrap.Modal(modalElement);
                        modal.hide();
                        location.reload();
                    } catch (error) {
                        console.error('Error al confirmar la modificación:', error);
                    }
                });
            }
        }
        
        async function eliminarPocionUI(id) {
            const confirmarEliminacion = document.getElementById(`confirmarEliminacion${id}`);
        
            if (confirmarEliminacion) {
                confirmarEliminacion.addEventListener('click', async () => {
                    try {
                        await deletePocion(id);
        
                        const modalElement = document.getElementById(`deleteModal${id}`);
                        const modal = new bootstrap.Modal(modalElement);
                        modal.hide();
                        location.reload();
        
                    } catch (error) {
                        console.error('Error al confirmar la eliminación:', error);
                    }
                });
            }
        }
        

        async function anadirPocionUI() {
            const anadirBtn = document.getElementById(`anadirBtn`);
            if (anadirBtn) {
                anadirBtn.addEventListener('click', async () => {
                    try {
                        const modalElement = document.getElementById(`anadirModal`);
        
                        const nombrePoc = modalElement.querySelector(`#nombre`).value;
                        const descripcionPoc = modalElement.querySelector(`#descripcion`).value;
                        const sanacionPoc = modalElement.querySelector(`#sanacion`).value;
                        const envenenamientoPoc = modalElement.querySelector(`#envenenamiento`).value;
                        const analgesiaPoc = modalElement.querySelector(`#analgesia`).value;
                        const dolorPoc = modalElement.querySelector(`#dolor`).value;
                        const curativoPoc = modalElement.querySelector(`#curativo`).value;
                        const enfermantePoc = modalElement.querySelector(`#enfermante`).value;
                        const inflamatorioPoc = modalElement.querySelector(`#inflamatorio`).value;
                        const desinflamatorioPoc = modalElement.querySelector(`#desinflamatorio`).value;

                        const creadorPoc = modalElement.querySelector(`#creador`).value;
        
                        const estadisticas = [
                            `Sanación: ${sanacionPoc}`,
                            `Envenenamiento: ${envenenamientoPoc}`,
                            `Analgesia: ${analgesiaPoc}`,
                            `Dolor: ${dolorPoc}`,
                            `Curativo: ${curativoPoc}`
                            `Enfermante: ${enfermantePoc}`,
                            `Inflamatorio: ${inflamatorioPoc}`,
                            `Desinflamatorio: ${desinflamatorioPoc}`
                        ].join(", ");
        
                        let creador = '';
        
                        if (creadorPoc === 'Desconocido') {
                            creador = 0;
                        } else {
                            const creadores = await getTodosUsuarios();
                            creador = (creadores.Usuario.find((nombre) => nombre.nombre === creadorPoc)).id;
                        }
        
                       
                        const pocionObjeto = {
                            nombre: nombrePoc,
                            descripcion: descripcionPoc,
                            estadisticas: estadisticas,
                            idUsuario: creador.toString()
                        };
        
                      
                        await postPocion(pocionObjeto);
        
                       
                        const modal = new bootstrap.Modal(modalElement);
                        modal.hide();
                        location.reload();
                    } catch (error) {
                        console.error('Error al añadir la poción:', error);
                    }
                });
            }
        }

        async function veriPocionUI(id) {
            const modificarBtn = document.getElementById(`confirmarVerificacion${id}`);
            if (modificarBtn) {
        
                modificarBtn.addEventListener('click', async () => {
                    try {
        
                        const modalElement = document.getElementById(`veriModal${id}`);
                        const pocion = await getBuscarPocion(id);
                        console.log(pocion.pociones.nombre);
        
                        const pocionObjeto = {
                            nombre: pocion.pociones.nombre,
                            descripcion: pocion.pociones.descripcion, 
                            estadisticas: pocion.pociones.estadisticas,
                            idUsuario: pocion.pociones.idUsuario,
                            veri: 1,  
                            veriD: 0  
                        };
        
                        await putPocion(id, pocionObjeto);
        
                        const modal = new bootstrap.Modal(modalElement);
                        modal.hide();
                        location.reload();
                    } catch (error) {
                        console.error('Error al confirmar la verificación de la poción:', error);
                    }
                });
            }
        }
        
        rellenarPociones()
    })