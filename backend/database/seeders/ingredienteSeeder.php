<?php
// ismael sarrion 
namespace Database\Seeders;

use App\Models\Ingredientes;
use Illuminate\Database\Seeder;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;

class IngredienteSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $ingredientes = [
            [
                'nombre' => 'Hierba Mágica',
                'estadisticas' => '50,0,30,0,40,0,10,0',
            ],
            [
                'nombre' => 'Piedra Lunar',
                'estadisticas' => '0,0,0,0,70,0,0,30',
            ],
            [
                'nombre' => 'Polvo de Estrella',
                'estadisticas' => '0,50,0,10,0,20,0,0',
            ],
            [
                'nombre' => 'Raíz de Mandrágora',
                'estadisticas' => '30,20,10,0,50,0,0,5',
            ],
            [
                'nombre' => 'Escama de Dragón',
                'estadisticas' => '0,0,60,0,10,40,0,0',
            ],
            [
                'nombre' => 'Lágrima de Fénix',
                'estadisticas' => '70,0,20,0,0,0,10,0',
            ],
            [
                'nombre' => 'Hueso de Grifo',
                'estadisticas' => '0,30,0,0,0,50,20,0',
            ],
            [
                'nombre' => 'Esencia de Unicornio',
                'estadisticas' => '60,0,0,0,30,10,0,0',
            ],
            [
                'nombre' => 'Flor de Loto Azul',
                'estadisticas' => '40,10,30,0,20,0,0,0',
            ],
            [
                'nombre' => 'Arena del Tiempo',
                'estadisticas' => '0,0,0,50,0,0,40,10',
            ],
            [
                'nombre' => 'Veneno de Basilisco',
                'estadisticas' => '0,70,0,20,0,10,0,0',
            ],
            [
                'nombre' => 'Espinas de Rosa Negra',
                'estadisticas' => '0,30,0,40,0,20,10,0',
            ],
            [
                'nombre' => 'Viento de los Espíritus',
                'estadisticas' => '0,0,50,0,0,30,0,20',
            ],
        ];

        foreach ($ingredientes as $datos) {
            Ingredientes::create($datos);
        }
    }
}
