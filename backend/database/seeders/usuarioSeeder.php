<?php
//Raul Gutierrez

namespace Database\Seeders;

use App\Models\Usuario;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\DB;

class usuarioSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        //Usuario::factory(5)->create();
        $datos = [
            [
                'nombre' => 'Dumbledore',
                'gmail' => 'dumbledore_hogwards@gmail.com',
                'contrasena' => bcrypt('dumbledore1234'),
                'idCasa' => 1,
                'nivel' => 5,
                'exp' => 999,
                'foto' => 'mago',
                'activo' => true,
                'remember_token' => Str::random(10)
            ]
        ];

        DB::table('usuario')->insert($datos);
    }
}
