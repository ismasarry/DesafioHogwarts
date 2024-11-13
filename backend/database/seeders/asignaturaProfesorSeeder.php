<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class asignaturaProfesorSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $datos = [
            [
                'idAsignatura' => 1,
                'idProfesor' => 1
            ],
            [
                'idAsignatura' => 2,
                'idProfesor' => 1
            ],
            [
                'idAsignatura' => 1,
                'idProfesor' => 2
            ],
            [
                'idAsignatura' => 2,
                'idProfesor' => 3
            ]
        ];

        DB::table('asignaturaProfesor')->insert($datos);
    }
}
