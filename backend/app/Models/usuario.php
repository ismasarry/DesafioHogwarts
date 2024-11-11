<?php
//Raul Gutierrez
// models/Usuario.php
namespace App\Models;

use Illuminate\Foundation\Auth\User as Authenticatable; // Cambiamos a Authenticatable
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class Usuario extends Authenticatable // Cambiamos a Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable;

    protected $table = 'usuario';

    protected $fillable = [
        'nombre',
        'gmail',
        'contrasena',
        'idCasa',
        'nivel',
        'exp',
        'foto',
        'activo'
    ];

    protected $hidden = [
        'contrasena',
        'remember_token'
    ];

    protected $casts = [
        'email_verified_at' => 'datetime',
        'contrasena' => 'hashed',
    ];

    public function getAuthPassword()
    {
        return $this->contrasena;
    }
}
