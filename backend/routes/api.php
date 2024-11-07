<?php
//Ismael Sarrion
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\usuarioRolController;
use Illuminate\Http\Request;

Route::get('/usuarioRoles', [usuarioRolController::class, 'getTodosUsuarioRoles']);

Route::get('/usuarioRoles/{id}', [usuarioRolController::class, 'getUsuarioRolPorId']);

Route::post('/usuarioRoles', [usuarioRolController::class, 'postUsuarioRol']);

Route::put('/usuarioRoles/{id}', [usuarioRolController::class, 'putUsuarioRol']);

Route::delete('/usuarioRoles/{id}', [usuarioRolController::class, 'deleteUsuarioRol']);