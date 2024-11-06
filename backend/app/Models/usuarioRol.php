<?php
//Ismael Sarrion
namespace App\Models;
use Illuminate\Database\Eloquent\Factories\HasFactory;

use Illuminate\Database\Eloquent\Model;

class usuarioRol extends Model
{
    use HasFactory;

    protected $table = 'usuarioRol';

    protected $fillable = [
        'idRol',
        'idUsuario',
    ];
    public function rol()
    {
        return $this->belongsTo(rol::class, 'idRol');
    }
    public function usuario()
    {
        return $this->belongsTo(usuario::class, 'idUsuario');
    }
}
