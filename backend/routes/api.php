<?php

use App\Http\Controllers\casaController;
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
