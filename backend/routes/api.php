<?php

use App\Http\Controllers\asignaturaAlumnoController;
use App\Http\Controllers\asignaturaController;
use App\Http\Controllers\asignaturaProfesorController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\rolController;
use App\Http\Controllers\casaController;
use App\Http\Controllers\hechizosController;
use App\Http\Controllers\gmailController;
use App\Http\Controllers\usuarioRolController;
use App\Http\Controllers\UsuarioController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

//Jaime Ortega

// AQUI EMPIEZAN LAS RUTAS AGRUPADAS POR REL AUTH SANCTUM
//Route::middleware(['auth:sanctum'])->group(function () {
Route::prefix('rol')->group(function () {
    Route::get('/', [rolController::class, 'getAllRoles']);
    Route::get('/{id}', [rolController::class, 'getRol']);
    Route::get('/integrantes/{id}', [rolController::class, 'getUsuariosRol']);
    Route::post('/', [rolController::class, 'createRol']);
    Route::put('/{id}', [rolController::class, 'updateRol']);
    Route::delete('/{id}', [rolController::class, 'deleteRol']);
});
//});
Route::prefix('casa')->group(function () {
    Route::get('/', [casaController::class, 'getAllCasas']);
    Route::get('/{id}', [casaController::class, 'getCasa']);
    Route::get('/integrantes/{id}', [casaController::class, 'getUsuariosCasa']);
    Route::post('/', [casaController::class, 'createCasa']);
    Route::put('/{id}', [casaController::class, 'updateCasa']);
    Route::delete('/{id}', [casaController::class, 'deleteCasa']);
});

//Ismael Sarrion
Route::get('/usuarioRoles', [usuarioRolController::class, 'getTodosUsuarioRoles']);
Route::get('/usuarioRoles/{id}', [usuarioRolController::class, 'getUsuarioRolPorId']);
//Jaime Ortega
Route::get('/usuarioRoles/integrantes/{id}', [usuarioRolController::class, 'getTodosUsuarioRolPorIdRol']);
Route::post('/usuarioRoles', [usuarioRolController::class, 'postUsuarioRol']);
Route::put('/usuarioRoles/{id}', [usuarioRolController::class, 'putUsuarioRol']);
Route::delete('/usuarioRoles/{id}', [usuarioRolController::class, 'deleteUsuarioRol']);
//Raul Gutierrez
Route::delete('/usuarioRoles/{idUsuario}/{idRol}', [usuarioRolController::class, 'deleteUsuarioRolPorIds']);

//Raul Gutierrez
Route::get('/usuario', [UsuarioController::class, 'getTodosUsuarios']);
Route::get('usuario/{id}', [UsuarioController::class, 'getUsuarioPorId']);
Route::post('usuario', [UsuarioController::class, 'postUsuario']);
Route::put('usuario/{id}', [UsuarioController::class, 'putUsuario']);
Route::delete('usuario/{id}', [UsuarioController::class, 'deleteUsuario']);

//Raul Gutierrez
Route::get('/asignatura', [asignaturaController::class, 'getTodosAsignaturas']);
Route::get('asignatura/{id}', [asignaturaController::class, 'getAsignaturaPorId']);
Route::post('asignatura', [asignaturaController::class, 'postAsignatura']);
Route::put('asignatura/{id}', [asignaturaController::class, 'putAsignatura']);
Route::delete('asignatura/{id}', [asignaturaController::class, 'deleteAsignatura']);

//Raul Gutierrez
Route::get('/asignaturaAlumno', [asignaturaAlumnoController::class, 'getTodosAsignaturaAlumnos']);
Route::get('asignaturaAlumno/{id}', [asignaturaAlumnoController::class, 'getAsignaturaAlumnoPorId']);
//Jaime Ortega (getAsignaturaAlumnoPorIdAlumno)
Route::get('asignaturaAlumno/alumno/{id}', [asignaturaAlumnoController::class, 'getAsignaturaProfesorPorIdAlumno']);
Route::post('asignaturaAlumno', [asignaturaAlumnoController::class, 'postAsignaturaAlumno']);
Route::put('asignaturaAlumno/{id}', [asignaturaAlumnoController::class, 'putAsignaturaAlumno']);
Route::delete('asignaturaAlumno/{id}', [asignaturaAlumnoController::class, 'deleteAsignaturaAlumno']);

//ismael sarrion
Route::get('/asignaturaAlumno/alumnoPorId/{id}',[asignaturaAlumnoController::class, 'getAsignaturaAlumnoPorIdAlumno']);

//Raul Gutierrez
Route::get('/asignaturaProfesor', [asignaturaProfesorController::class, 'getTodosAsignaturaProfesores']);
Route::get('asignaturaProfesor/{id}', [asignaturaProfesorController::class, 'getAsignaturaProfesorPorId']);
Route::get('asignaturaProfesor/profesor/{id}', [asignaturaProfesorController::class, 'getAsignaturaProfesorPorIdProfesor']);
Route::post('asignaturaProfesor', [asignaturaProfesorController::class, 'postAsignaturaProfesor']);
Route::put('asignaturaProfesor/{id}', [asignaturaProfesorController::class, 'putAsignaturaProfesor']);
Route::delete('asignaturaProfesor/{id}', [asignaturaProfesorController::class, 'deleteAsignaturaProfesor']);


//Raul Gutierrez
Route::get('hechizos', [hechizosController::class, 'getTodosHechizos']);
Route::get('hechizos/{id}', [hechizosController::class, 'getHechizoPorId']);
Route::get('hechizos/nivel/{id}', [hechizosController::class, 'getHechizoPorNivelMenor']);
Route::post('hechizos', [hechizosController::class, 'postHechizo']);
Route::put('hechizos/{id}', [hechizosController::class, 'putHechizo']);
Route::delete('hechizos/{id}', [hechizosController::class, 'deleteHechizo']);

//ismael sarrion
Route::post('login', [AuthController::class, 'login']);
Route::post('logout', [AuthController::class, 'logout']);

//Jaime Ortega (register)
Route::post('register', [AuthController::class, 'register']);

Route::get('/nologin', function () {
    return response()->json("No autorizado", 203);
}); 

//ismael sarrion 

//Route::middleware('guest')->group(function () {
Route::get('formulario', function () {
    return view('formularioRecuperacion');
});

Route::post('enviar', [gmailController::class, 'enviar']);
//});

