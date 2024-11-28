<?php
//Raul Gutierrez
namespace Database\Seeders;

use App\Models\turnoDuelo;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class turnoDueloSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $turnoDuelo = [
            //Duelo 1
            [
                'idDuelo' => 1,
                'turno' => 1,
                'idHechizoUsadoUsuario' => 11,
                'idHechizoUsadoBot' => 3,
                'ganador' => 1
            ],
            [
                'idDuelo' => 1,
                'turno' => 2,
                'idHechizoUsadoUsuario' => 5,
                'idHechizoUsadoBot' => 1,
                'ganador' => 1
            ],
            [
                'idDuelo' => 1,
                'turno' => 3,
                'idHechizoUsadoUsuario' => 12,
                'idHechizoUsadoBot' => 2,
                'ganador' => 1
            ],
            [
                'idDuelo' => 2,
                'turno' => 1,
                'idHechizoUsadoUsuario' => 3,
                'idHechizoUsadoBot' => 11,
                'ganador' => 0
            ],
            [
                'idDuelo' => 2,
                'turno' => 2,
                'idHechizoUsadoUsuario' => 1,
                'idHechizoUsadoBot' => 5,
                'ganador' => 0
            ],
            [
                'idDuelo' => 2,
                'turno' => 3,
                'idHechizoUsadoUsuario' => 2,
                'idHechizoUsadoBot' => 12,
                'ganador' => 0
            ],
            [
                'idDuelo' => 3,
                'turno' => 1,
                'idHechizoUsadoUsuario' => 11,
                'idHechizoUsadoBot' => 3,
                'ganador' => 1
            ],
            [
                'idDuelo' => 3,
                'turno' => 2,
                'idHechizoUsadoUsuario' => 5,
                'idHechizoUsadoBot' => 1,
                'ganador' => 1
            ],
            [
                'idDuelo' => 3,
                'turno' => 3,
                'idHechizoUsadoUsuario' => 12,
                'idHechizoUsadoBot' => 2,
                'ganador' => 1
            ],
            [
                'idDuelo' => 4,
                'turno' => 1,
                'idHechizoUsadoUsuario' => 3,
                'idHechizoUsadoBot' => 11,
                'ganador' => 0
            ],
            [
                'idDuelo' => 4,
                'turno' => 2,
                'idHechizoUsadoUsuario' => 1,
                'idHechizoUsadoBot' => 5,
                'ganador' => 0
            ],
            [
                'idDuelo' => 4,
                'turno' => 3,
                'idHechizoUsadoUsuario' => 2,
                'idHechizoUsadoBot' => 12,
                'ganador' => 0
            ],
            [
                'idDuelo' => 5,
                'turno' => 1,
                'idHechizoUsadoUsuario' => 11,
                'idHechizoUsadoBot' => 3,
                'ganador' => 1
            ],
            [
                'idDuelo' => 5,
                'turno' => 2,
                'idHechizoUsadoUsuario' => 5,
                'idHechizoUsadoBot' => 1,
                'ganador' => 1
            ],
            [
                'idDuelo' => 5,
                'turno' => 3,
                'idHechizoUsadoUsuario' => 12,
                'idHechizoUsadoBot' => 2,
                'ganador' => 1
            ]
        ];

        foreach ($turnoDuelo as $turno){
            turnoDuelo::create($turno);
        }
        //DB::table('turno_duelo')->insert($turnoDuelo);
    }
}
