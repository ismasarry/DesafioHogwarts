<?php
//Raul Gutierrez
namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class asignaturaAlumno extends Model
{
    protected $table = 'asignaturaAlumno';

    protected $fillable = [
        'idAsignatura',
        'idAlumno'
    ];

    public function asignatura()
    {
        return $this->belongsTo(asignatura::class, 'id');
    }

    //Jaime Ortega (modifica)
    public function usuario()
    {
        return $this->belongsTo(Usuario::class, 'idAlumno', 'id');
    }
}
