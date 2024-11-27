<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Notifications\Notifiable;

class turnoDuelo extends Model
{
    use HasFactory, Notifiable;
    
    protected $table = 'turnoDuelo';

    protected $fillable = [
        'idDuelo',
        'turno',
        'idHechizoUsadoUsuario',
        'idHechizoUsadoBot',
        'ganador'
    ];
}
