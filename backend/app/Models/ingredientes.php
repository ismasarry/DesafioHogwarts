<?php
//isamel sarrion
namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Notifications\Notifiable;


class Ingredientes extends Model
{
    use HasFactory, Notifiable;

    protected $table = 'ingredientes';

    protected $fillable = [
        'Nombre',
        'Estadisticas',
    ];

    /**
     * Relación con recetas.
     * Un ingrediente puede aparecer en varias recetas.
     */
    public function recetas()
    {
        return $this->hasMany(Recetas::class, 'idIngrediente');
    }

    /**
     * Relación con pociones a través de recetas.
     */
    public function pociones()
    {
        return $this->belongsToMany(Pociones::class, 'recetas', 'idIngrediente', 'idPocion');
    }
}
