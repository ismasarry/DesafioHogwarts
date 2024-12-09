<?php

use App\Http\Controllers\asignaturaAlumnoController;
use App\Http\Controllers\asignaturaController;
use App\Http\Controllers\asignaturaProfesorController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\rolController;
use App\Http\Controllers\casaController;
use App\Http\Controllers\dueloController;
use App\Http\Controllers\hechizosController;
use App\Http\Controllers\gmailController;
use App\Http\Controllers\turnoDueloController;
use App\Http\Controllers\usuarioRolController;
use App\Http\Controllers\UsuarioController;
use App\Http\Controllers\IngredientesController;
use App\Http\Controllers\PocionesController;
use App\Http\Controllers\RecetasController;
use App\Http\Middleware\CheckRoleAndAbilities;
use App\Http\Middleware\RolMiddleware;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

//Jaime Ortega
// AQUI EMPIEZAN LAS RUTAS AGRUPADAS POR REL AUTH SANCTUM
// Route::middleware(['auth:sanctum', 'role_abilities:Dumbledore|admin|profesor|alumno,Dumbledore|admin|profesor|alumno'])->group(function () {
    Route::prefix('rol')->group(function () {
        Route::get('/', [rolController::class, 'getAllRoles']);
        Route::get('/{id}', [rolController::class, 'getRol']);
        Route::get('/integrantes/{id}', [rolController::class, 'getUsuariosRol']);
        Route::post('/', [rolController::class, 'createRol']);
        Route::put('/{id}', [rolController::class, 'updateRol']);
        Route::delete('/{id}', [rolController::class, 'deleteRol']);
    });
// });

Route::prefix('casa')->group(function () {
    Route::get('/', [casaController::class, 'getAllCasas']);
    Route::get('/{id}', [casaController::class, 'getCasa']);
    Route::get('/integrantes/{id}', [casaController::class, 'getUsuariosCasa']);
    Route::post('/', [casaController::class, 'createCasa']);
    Route::put('/{id}', [casaController::class, 'updateCasa']);
    Route::delete('/{id}', [casaController::class, 'deleteCasa']);
});

//Ismael Sarrion
Route::prefix('usuarioRoles')->group(function () {
    Route::get('/', [usuarioRolController::class, 'getTodosUsuarioRoles']);
    Route::get('{id}', [usuarioRolController::class, 'getUsuarioRolPorId']);
    //Jaime Ortega
    Route::get('integrantes/{id}', [usuarioRolController::class, 'getTodosUsuarioRolPorIdRol']);
    Route::post('/', [usuarioRolController::class, 'postUsuarioRol']);
    Route::put('{id}', [usuarioRolController::class, 'putUsuarioRol']);
    Route::delete('{id}', [usuarioRolController::class, 'deleteUsuarioRol']);
    //Raul Gutierrez
    Route::delete('{idUsuario}/{idRol}', [usuarioRolController::class, 'deleteUsuarioRolPorIds']);
});



//Raul Gutierrez
Route::prefix('usuario')->group(function () {
    Route::get('/', [UsuarioController::class, 'getTodosUsuarios']);
    Route::get('{id}', [UsuarioController::class, 'getUsuarioPorId']);
    Route::get('gmail/{gmail}', [UsuarioController::class, 'getUsuarioPorGmail']);
    Route::post('/', [UsuarioController::class, 'postUsuario']);
    Route::put('{id}', [UsuarioController::class, 'putUsuario']);
    Route::delete('{id}', [UsuarioController::class, 'deleteUsuario']);
});

//Raul Gutierrez
Route::prefix('asignatura')->group(function () {
    Route::get('/', [asignaturaController::class, 'getTodosAsignaturas']);
    Route::get('{id}', [asignaturaController::class, 'getAsignaturaPorId']);
    Route::post('/', [asignaturaController::class, 'postAsignatura']);
    Route::put('{id}', [asignaturaController::class, 'putAsignatura']);
    Route::delete('{id}', [asignaturaController::class, 'deleteAsignatura']);
});

Route::prefix('asignaturaAlumno')->group(function () {
    // Raul Gutierrez
    Route::get('/', [asignaturaAlumnoController::class, 'getTodosAsignaturaAlumnos']);
    Route::get('{id}', [asignaturaAlumnoController::class, 'getAsignaturaAlumnoPorId']);
    // Jaime Ortega (getAsignaturaAlumnoPorIdAlumno)
    Route::get('alumno/{id}', [asignaturaAlumnoController::class, 'getAsignaturaProfesorPorIdAlumno']);
    Route::post('/', [asignaturaAlumnoController::class, 'postAsignaturaAlumno']);
    Route::put('{id}', [asignaturaAlumnoController::class, 'putAsignaturaAlumno']);
    Route::delete('{id}', [asignaturaAlumnoController::class, 'deleteAsignaturaAlumno']);
    // Jaime Ortega
    Route::delete('{idAsignatura}/{idAlumno}', [asignaturaAlumnoController::class, 'deleteAsignaturaAlumnoEspecifico']);
    // Ismael Sarrion
    Route::get('alumnoPorId/{id}', [asignaturaAlumnoController::class, 'getAsignaturaAlumnoPorIdAlumno']);
});

Route::prefix('asignaturaProfesor')->group(function () {
    // Raul Gutierrez
    Route::get('/', [asignaturaProfesorController::class, 'getTodosAsignaturaProfesores']);
    Route::get('{id}', [asignaturaProfesorController::class, 'getAsignaturaProfesorPorId']);
    Route::get('profesor/{id}', [asignaturaProfesorController::class, 'getAsignaturaProfesorPorIdProfesor']);
    Route::post('/', [asignaturaProfesorController::class, 'postAsignaturaProfesor']);
    Route::put('{id}', [asignaturaProfesorController::class, 'putAsignaturaProfesor']);
    Route::delete('{id}', [asignaturaProfesorController::class, 'deleteAsignaturaProfesor']);
    // Jaime Ortega
    Route::delete('{idAsignatura}/{idProfesor}', [asignaturaProfesorController::class, 'deleteAsignaturaProfesorEspecifico']);
});

// todos menos admin 
//Raul Gutierrez
Route::prefix('hechizos')->group(function () {
    Route::get('/', [hechizosController::class, 'getTodosHechizos']);
    Route::get('{id}', [hechizosController::class, 'getHechizoPorId']);
    Route::get('nivel/{nivel}', [hechizosController::class, 'getHechizoPorNivelMenor']);
    Route::delete('{id}', [hechizosController::class, 'deleteHechizo']);
    Route::middleware('valiHechizos')->group(function () {
        Route::post('/', [hechizosController::class, 'postHechizo']);
        Route::put('{id}', [hechizosController::class, 'putHechizo']);
    });
});

//ismael sarrion
Route::prefix('ingredientes')->group(function () {
    Route::get('/', [IngredientesController::class, 'getTodosIngredientes']);
    Route::get('{id}', [IngredientesController::class, 'getIngredientePorId']);
    Route::post('/', [IngredientesController::class, 'postIngrediente']);
    Route::put('{id}', [IngredientesController::class, 'putIngrediente']);
    Route::delete('{id}', [IngredientesController::class, 'deleteIngrediente']);
});

Route::prefix('pociones')->group(function () {
    Route::get('/', [PocionesController::class, 'getTodasPociones']);
    Route::get('{id}', [PocionesController::class, 'getPocionPorId']);
    Route::post('/', [PocionesController::class, 'postPocion']);
    Route::put('{id}', [PocionesController::class, 'putPocion']);
    Route::delete('{id}', [PocionesController::class, 'deletePocion']);
});

Route::prefix('recetas')->group(function () {
    Route::get('/', [RecetasController::class, 'getTodasRecetas']);
    Route::get('{id}', [RecetasController::class, 'getRecetaPorId']);
    Route::post('/', [RecetasController::class, 'postReceta']);
    Route::put('{id}', [RecetasController::class, 'putReceta']);
    Route::delete('{id}', [RecetasController::class, 'deleteReceta']);
});

//Raul Gutierrez
Route::prefix('duelo')->group(function () {
    Route::get('/', [dueloController::class, 'getTodosDuelos']);
    Route::get('{id}', [dueloController::class, 'getDueloPorId']);
    Route::get('usuario/{id}', [dueloController::class, 'getDueloPorIdUsuario']);
    Route::get('curso/{id}', [dueloController::class, 'getDueloEnCurso']);
    Route::get('winRate/{id}', [dueloController::class, 'getWinRatePorIdUsuario']);
    Route::post('/', [dueloController::class, 'postDuelo']);
    Route::put('{id}', [dueloController::class, 'putDuelo']);
    Route::delete('{id}', [dueloController::class, 'deleteDuelo']);
});

//Raul Gutierrez
Route::prefix('turnoDuelo')->group(function () {
    Route::get('/', [turnoDueloController::class, 'getTodosTurnoDuelos']);
    Route::get('{id}', [turnoDueloController::class, 'getTurnoDueloPorId']);
    Route::get('duelo/{id}', [turnoDueloController::class, 'getTurnoDuelosPorDuelo']);
    Route::get('dueloNormal/{id}', [turnoDueloController::class, 'getTurnoDuelosPorDueloNormales']);
    Route::get('hechizosUsablesUsuario/{id}', [turnoDueloController::class, 'getHechizosDisponiblesUsuarioDuelo']);
    Route::get('hechizosUsablesBot/{id}', [turnoDueloController::class, 'getHechizosDisponiblesBotDuelo']);
    Route::post('/', [turnoDueloController::class, 'postTurnoDuelo']);
    Route::put('{id}', [turnoDueloController::class, 'putTurnoDuelo']);
    Route::delete('{id}', [turnoDueloController::class, 'deleteTurnoDuelo']);
    Route::get('eleccionBot/{id}', [turnoDueloController::class, 'eleccionHechizoBot']);
    Route::get('calcularGanador/{idHechizo}/{id}', [turnoDueloController::class, 'calculoGanador']);
});

//ismael sarrion
//Route::middleware('guest')->group(function () {
Route::get('formulario', function () {
    return view('formularioRecuperacion');
});

Route::post('enviar', [gmailController::class, 'enviar']);
//});

//ismael sarrion
Route::post('login', [AuthController::class, 'login']);

//Jaime Ortega (register)
Route::post('register', [AuthController::class, 'register']);
Route::post('logout', [AuthController::class, 'logout']);

Route::get('/nologin', function () {
    return response()->json("No autorizado", 203);
});
