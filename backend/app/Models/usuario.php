<?php
//Raul Gutierrez

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
//use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class Usuario extends Model
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

    public function roles(){
        return $this->belongsToMany(Rol::class , 'usuario_rol', 'idRol', 'id');
    }
}
