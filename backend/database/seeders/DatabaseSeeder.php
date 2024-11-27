<?php
//Raul Gutierrez
namespace Database\Seeders;

use App\Models\asignatura;
use App\Models\asignaturaAlumno;
use App\Models\turnoDuelo;
use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        $this->call([
            RolSeeder::class,
            casaSeeder::class,
            usuarioSeeder::class,
            usuarioRolSeeder::class,
            asignaturaSeeder::class,
            asignaturaAlumnoSeeder::class,
            asignaturaProfesorSeeder::class,
            hechizosSeeder::class,
            dueloSeeder::class,
            turnoDuelo::class
        ]);
    }
}
