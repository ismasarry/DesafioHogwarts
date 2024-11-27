<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Notifications\Notifiable;

class turnoDuelo extends Model
{
    use HasFactory, Notifiable;
    
    protected $table = 'turno_duelo';

    protected $fillable = [
        'idDuelo',
        'turno',
        'idHechizoUsadoUsuario',
        'idHechizoUsadoBot',
        'ganador'
    ];

    public function duelo()
    {
        return $this->belongsTo(duelo::class, 'idDuelo', 'id');
    }

    public function hechizoUsuario()
    {
        return $this->belongsTo(hechizos::class, 'idHechizoUsadoUsuario', 'id');
    }

    public function hechizoBot()
    {
        return $this->belongsTo(hechizos::class, 'idHechizoUsadoBot', 'id');
    }
}
