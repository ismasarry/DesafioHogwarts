<?php

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
            ['X', 'S', 'S', 'S', 'S', 'S', 'S', 'X'],
            ['P', 'S', 'S', 'S', 'S', 'S', 'S', 'X'],
            ['X', 'S', 'S', 'S', 'S', 'S', 'S', 'X'],
            ['X', 'S', 'S', 'S', 'S', 'S', 'S', 'P'],
            ['X', 'S', 'S', 'S', 'S', 'S', 'S', 'X'],
            ['X', 'X', 'P', 'X', 'X', 'X', 'X', 'X'],
        ];

        foreach ($mapa as $index => $fila) {
            MapaMerodeador::create([
                'fila' => $index++,
                'contenidofila' => json_encode($fila),
                'segundo' => 0,
            ]);
        }
    }
}
