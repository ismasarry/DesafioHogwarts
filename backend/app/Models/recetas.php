<?php
//isamel sarrion
namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Recetas extends Model
{
    use HasFactory;

    protected $table = 'recetas';

    protected $fillable = [
        'idPocion',
        'idIngrediente',
    ];

    /**
     * Relación con el modelo Pocion.
     * Una receta pertenece a una poción.
     */
    public function pocion()
    {
        return $this->belongsTo(Pociones::class, 'idPocion');
    }

    /**
     * Relación con el modelo Ingrediente.
     * Una receta pertenece a un ingrediente.
     */
    public function ingrediente()
    {
        return $this->belongsTo(Ingredientes::class, 'idIngrediente');
    }
}
