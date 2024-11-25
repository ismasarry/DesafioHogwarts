<?php
//Raul Gutierrez
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

    //Jaime Ortega (modifica)
    public function usuario()
    {
        return $this->belongsTo(Usuario::class, 'idProfesor', 'id');
    }
}
