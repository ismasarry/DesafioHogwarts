<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Notifications\Notifiable;
//Raul Gutierrez
class hechizos extends Model
{
    use HasFactory, Notifiable;

    protected $table = 'hechizos';

    protected $fillable = [
        'nombre',
        'estadisticas',
        'idUsuario',
        'nivel',
        'veri',
        'veriD'
    ];

    public function turnoUsuario(){
        return $this->hasMany(turnoDuelo::class, 'idHechizoUsadoUsuario' ,'id');
    }

    public function turnoBot(){
        return $this->hasMany(turnoDuelo::class, 'idHechizoUsadoBot' ,'id');
    }
}
