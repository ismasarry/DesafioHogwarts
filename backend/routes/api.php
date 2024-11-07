<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\UsuarioController;

/*Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');*/

//Raul Gutierrez




Route::get('/usuario', [UsuarioController::class, 'getTodosUsuarios']);
Route::get('usuario/{id}', [UsuarioController::class, 'getUsuarioPorId']);
Route::post('usuario', [UsuarioController::class, 'postUsuario']);
Route::put('usuario/{id}', [UsuarioController::class, 'putUsuario']);
Route::delete('usuario/{id}', [UsuarioController::class, 'deleteUsuario']);