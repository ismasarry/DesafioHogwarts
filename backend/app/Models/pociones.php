<?php
//isamel sarrion
namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Notifications\Notifiable;


class Pociones extends Model
{
    use HasFactory, Notifiable;

    protected $table = 'pociones';

    protected $fillable = [
        
        'nombre',
        'estadisticas',
        'descripcion',
        'idUsuario',
        'foto',
    ];
    public function recetas()
    {
        return $this->hasMany(Recetas::class, 'idPocion');
    }
    
    public function ingredientes()
    {
        return $this->belongsToMany(Ingredientes::class, 'recetas', 'idPocion', 'idIngrediente');
    }
   
//     public function usuario()
//     {
//         return $this->belongsTo(User::class, 'idUsuario');
//     }
}
