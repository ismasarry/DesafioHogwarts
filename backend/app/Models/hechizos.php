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

    // public function usuario(){
    //     return $this->belongsTo(usuario::class, 'idUsuario');
    // }
}
