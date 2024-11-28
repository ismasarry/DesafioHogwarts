<?php
//Raul Gutierrez
namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Notifications\Notifiable;

class duelo extends Model
{
    use HasFactory, Notifiable;

    protected $table = 'duelo';

    protected $fillable = [
        'idUsuario',
        'ganador'
    ];

    public function turnos()
    {
        return $this->hasMany(turnoDuelo::class, 'idDuelo', 'id');
    }
}
