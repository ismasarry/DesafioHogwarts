<?php
//Raul Gutierrez
namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class asignaturaSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $datos = [
            [
                'nombre' => 'Pociones'
            ],
            [
                'nombre' => 'Hechizos'
            ]
        ];

        DB::table('asignatura')->insert($datos);
    }
}
