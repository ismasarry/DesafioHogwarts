<?php
//Jaime Ortega
namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Notifications\Notifiable;
use App\Models\Usuario;

class Casa extends Model
{
    use HasFactory, Notifiable;

    protected $fillable = [
        'nombre',
        'puntos'
    ];

    public function usuariosCasa() {
        return $this->hasMany(Usuario::class);
    }
}
