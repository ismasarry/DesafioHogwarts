<?php
//ismael sarrion 
namespace Database\Seeders;

use App\Models\Recetas;
use Illuminate\Database\Seeder;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;

class RecetaSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $recetas = [
            [
                'idPocion' => 1, 
                'idIngrediente' => 1, 
            ],
            [
                'idPocion' => 1, 
                'idIngrediente' => 2, 
            ],
            [
                'idPocion' => 2, 
                'idIngrediente' => 3, 
            ],
            [
                'idPocion' => 3, 
                'idIngrediente' => 1, 
            ],
        ];

        foreach ($recetas as $datos) {
            recetas::create($datos);
        }
    }
}
