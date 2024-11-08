<?php

use App\Http\Controllers\casaController;
use App\Http\Controllers\usuarioRolController;
use App\Http\Controllers\UsuarioController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

//Jaime Ortega
// Route::middleware(['auth:sactum'])->group(function () {
    Route::prefix('casa')->group(function () {
        Route::get('/', [casaController::class, 'getAllCasas']);
        Route::get('/{id}', [casaController::class, 'getCasa']);
        Route::get('/integrantes/{id}', [casaController::class, 'getUsuariosCasa']);
        Route::post('/', [casaController::class, 'createCasa']);
        Route::put('/{id}', [casaController::class, 'updateCasa']);
        Route::delete('/{id}', [casaController::class, 'deleteCasa']);
    });
// });

//Ismael Sarrion
Route::get('/usuarioRoles', [usuarioRolController::class, 'getTodosUsuarioRoles']);

Route::get('/usuarioRoles/{id}', [usuarioRolController::class, 'getUsuarioRolPorId']);

Route::post('/usuarioRoles', [usuarioRolController::class, 'postUsuarioRol']);

Route::put('/usuarioRoles/{id}', [usuarioRolController::class, 'putUsuarioRol']);

Route::delete('/usuarioRoles/{id}', [usuarioRolController::class, 'deleteUsuarioRol']);

//Raul Gutierrez
Route::get('/usuario', [UsuarioController::class, 'getTodosUsuarios']);
Route::get('usuario/{id}', [UsuarioController::class, 'getUsuarioPorId']);
Route::post('usuario', [UsuarioController::class, 'postUsuario']);
Route::put('usuario/{id}', [UsuarioController::class, 'putUsuario']);
Route::delete('usuario/{id}', [UsuarioController::class, 'deleteUsuario']);

