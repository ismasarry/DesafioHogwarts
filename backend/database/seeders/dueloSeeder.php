<?php

namespace Database\Seeders;

use App\Models\duelo;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class dueloSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $duelo = [
            [
                'idUsuario' => 1,
                'ganador' => true
            ],

            [
                'idUsuario' => 2,
                'ganador' => false
            ],

            [
                'idUsuario' => 2,
                'ganador' => true
            ],

            [
                'idUsuario' => 3,
                'ganador' => false
            ],

            [
                'idUsuario' => 4,
                'ganador' => true
            ]
        ];

        foreach ($duelo as $datos){
            duelo::create($datos);
        }
    }
}
