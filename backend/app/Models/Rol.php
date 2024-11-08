<?php
//Jaime Ortega
namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Notifications\Notifiable;
use App\Models\Usuario;

class Rol extends Model
{
    use HasFactory, Notifiable;

    protected $table = 'roles';

    protected $fillable = [
        'nombre'
    ];

    // public function usuariosRol() {
    //     return $this->hasMany(Usuario::class);
    // }
}
