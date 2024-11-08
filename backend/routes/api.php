<?php

use App\Http\Controllers\rolController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

//Jaime Ortega
// Route::middleware(['auth:sactum'])->group(function () {
    Route::prefix('rol')->group(function () {
        Route::get('/', [rolController::class, 'getAllRoles']);
        Route::get('/{id}', [rolController::class, 'getRol']);
        Route::get('/integrantes/{id}', [rolController::class, 'getUsuariosRol']);
        Route::post('/', [rolController::class, 'createRol']);
        Route::put('/{id}', [rolController::class, 'updateRol']);
        Route::delete('/{id}', [rolController::class, 'deleteRol']);
    });
// });
