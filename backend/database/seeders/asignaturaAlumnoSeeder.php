<?php
//Raul Gutierrez
namespace Database\Seeders;

use App\Models\asignaturaAlumno;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class asignaturaAlumnoSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $datos = [
            [
                'idAsignatura' => 1,
                'idAlumno' => 5
            ],
            [
                'idAsignatura' => 2,
                'idAlumno' => 5
            ],
            [
                'idAsignatura' => 1,
                'idAlumno' => 6
            ],
            [
                'idAsignatura' => 2,
                'idAlumno' => 6
            ],
            [
                'idAsignatura' => 2,
                'idAlumno' => 7
            ],
            [
                'idAsignatura' => 1,
                'idAlumno' => 8
            ]
        ];

        DB::table('asignaturaAlumno')->insert($datos);
    }
}
