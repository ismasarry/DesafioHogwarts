<?php
//Raul Gutierrez
namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class asignatura extends Model
{
    protected $table = 'asignatura';

    protected $fillable = [
        'nombre',
        'idProfesor'
    ];

    public function usuario()
    {
        return $this->belongsTo(Usuario::class, 'id');   
    }
}
