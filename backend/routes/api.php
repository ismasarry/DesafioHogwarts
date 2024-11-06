<?php
//Ismael Sarrion
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\usuarioRolController;

Route::get('/usuarioRoles', [usuarioRolController::class, 'getTodosUsuarioRoles'])->name('usuarioRoles.index');

Route::get('/usuarioRoles/{id}', [usuarioRolController::class, 'getUsuarioRolPorId'])->name('usuarioRoles.show');

Route::post('/usuarioRoles', [usuarioRolController::class, 'postUsuarioRol'])->name('usuarioRoles.store');

Route::put('/usuarioRoles/{id}', [usuarioRolController::class, 'putUsuarioRol'])->name('usuarioRoles.update');

Route::delete('/usuarioRoles/{id}', [usuarioRolController::class, 'deleteUsuarioRol'])->name('usuarioRoles.destroy');