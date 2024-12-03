<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class MapaMerodeador extends Model
{
    use HasFactory;

    /**
     *
     * @var string
     */
    protected $table = 'mapa_merodeador';

    /**
     *
     * @var array
     */
    protected $fillable = [
        'fila',
        'contenidoFila',
        'segundo',
    ];

    /**
     *
     * @var bool
     */
    public $timestamps = true; 
}
