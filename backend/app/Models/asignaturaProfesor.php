<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class asignaturaProfesor extends Model
{
    protected $table = 'asignaturaProfesor';

    protected $fillable = [
        'idAsignatura',
        'idProfesor'
    ];

    public function asignatura()
    {
        return $this->belongsTo(asignatura::class, 'id');
    }
    public function usuario()
    {
        return $this->belongsTo(Usuario::class, 'id');
    }
}
