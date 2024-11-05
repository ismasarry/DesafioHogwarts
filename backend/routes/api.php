<?php
//Raul Gutierrez

use App\Http\Controllers\usuarioController;
use Illuminate\Support\Facades\Route;

Route::get('usuario', [usuarioController::class, 'getTodosUsuarios']);
Route::get('usuario/{id}', [usuarioController::class, 'getUsuarioPorId']);
Route::post('usuario', [usuarioController::class, 'postUsuario']);
Route::put('usuario/{id}', [usuarioController::class, 'putUsuario']);
Route::delete('usuario/{id}', [usuarioController::class, 'deleteUsuario']);