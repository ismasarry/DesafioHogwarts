<?php
//Raul Gutierrez
namespace Database\Seeders;

use App\Models\hechizos;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class hechizosSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $hechizos = [
            [
                'nombre' => 'Accio',
                'estadisticas' => '0, 0, 0, 0, 0, 100',
                'idUsuario' => 0,
                'nivel' => '1'
            ],
            [
                'nombre' => 'Confringo',
                'estadisticas' => '70, 0, 0, 60, 0, 70',
                'idUsuario' => 0,
                'nivel' => '2'
            ],
            [
                'nombre' => 'Expelliarmus',
                'estadisticas' => '50, 50, 0, 10, 0, 90',
                'idUsuario' => 0,
                'nivel' => '1'
            ],
            [
                'nombre' => 'Lumos',
                'estadisticas' => '0, 0, 0, 0, 100, 90',
                'idUsuario' => 0,
                'nivel' => '1'
            ],
            [
                'nombre' => 'Expulso',
                'estadisticas' => '80, 0, 0, 80, 0, 20',
                'idUsuario' => 0,
                'nivel' => '3'
            ],
            [
                'nombre' => 'Riddikulus',
                'estadisticas' => '0, 40, 0, 0, 0, 40',
                'idUsuario' => 0,
                'nivel' => '2'
            ],
            [
                'nombre' => 'Desmaius',
                'estadisticas' => '80, 0, 0, 20, 0, 60',
                'idUsuario' => 0,
                'nivel' => '3'
            ],
            [
                'nombre' => 'Expecto patronus',
                'estadisticas' => '0, 90, 0, 0, 100, 70',
                'idUsuario' => 0,
                'nivel' => '2'
            ],
            [
                'nombre' => 'Confundo',
                'estadisticas' => '60, 30, 0, 10, 0, 10',
                'idUsuario' => 0,
                'nivel' => '2'
            ],
            [
                'nombre' => 'Reparo',
                'estadisticas' => '0, 0, 80, 0, 0, 100',
                'idUsuario' => 0,
                'nivel' => '2'
            ],
            [
                'nombre' => 'Imperio',
                'estadisticas' => '70, 30, 0, 20, 0, 100',
                'idUsuario' => 0,
                'nivel' => '4'
            ],
            [
                'nombre' => 'Crucio',
                'estadisticas' => '100, 40, 0, 100, 0, 100',
                'idUsuario' => 0,
                'nivel' => '4'
            ],
            [
                'nombre' => 'Avada Kedavra',
                'estadisticas' => '100, 100, 0, 100, 0, 100',
                'idUsuario' => 0,
                'nivel' => '5'
            ]
        ];

        foreach ($hechizos as $datos){
            hechizos::create($datos);
        }
    }
}
