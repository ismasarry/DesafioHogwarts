<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\usuarioRolController;
use Illuminate\Http\Request;
use App\Http\Controllers\UsuarioController;

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
