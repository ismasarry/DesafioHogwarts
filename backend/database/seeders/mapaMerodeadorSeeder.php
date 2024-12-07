<?php
//Jaime Ortega
namespace Database\Seeders;

use App\Models\MapaMerodeador;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class mapaMerodeadorSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $mapa = [
            ['X', 'X', 'X', 'X', 'X', 'P', 'X', 'X'],
            ['X', 'A', 'S', 'S', 'A', 'A', 'A', 'X'],
            ['P', 'A', 'S', 'S', 'S', 'S', 'S', 'X'],
            ['X', 'A', 'S', 'S', 'S', 'S', 'A', 'X'],
            ['X', 'S', 'S', 'S', 'S', 'S', 'A', 'P'],
            ['X', 'A', 'A', 'A', 'S', 'S', 'A', 'X'],
            ['X', 'X', 'P', 'X', 'X', 'X', 'X', 'X'],
        ];

        foreach ($mapa as $filaId => $fila) {
            $filaJSON = array_map(function ($casilla) {
                return ['tipo' => $casilla, 'persona' => null];
            }, $fila);

            MapaMerodeador::create([
                'fila' => $filaId++,
                'contenidofila' => json_encode($filaJSON),
                'segundo' => 0,
            ]);
        }
    }
}
