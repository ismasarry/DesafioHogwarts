<?php
//Ismael Sarrion
namespace App\Models;
use Illuminate\Database\Eloquent\Factories\HasFactory;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Notifications\Notifiable;

class usuarioRol extends Model
{
    use HasFactory, Notifiable;

    protected $table = 'usuario_rol';

    protected $fillable = [
        'idRol',
        'idUsuario'
    ];
    public function rol()
    {
        return $this->belongsTo(Rol::class, 'id');
    }
    public function usuario()
    {
        return $this->belongsTo(Usuario::class, 'id');
    }
}
