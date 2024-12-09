<?php
//ismael sarrion 
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
        ];

        foreach ($ingredientes as $datos) {
            ingredientes::create($datos);
        }
    }
}
