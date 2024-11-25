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
        $usuarios = [
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
            ],
            [
                'nombre' => 'ismael',
                'gmail' => 'ismael22012004@gmail.com',
                'contrasena' => bcrypt('JaMorant1234'),
                'idCasa' => 4,
                'nivel' => 2,
                'exp' => 190,
                'foto' => 'mago',
                'activo' => true,
                'remember_token' => Str::random(10)
            ],
            [
                'nombre' => 'Snape',
                'gmail' => 'snape_hogwards@gmail.com',
                'contrasena' => bcrypt('snape1234'),
                'idCasa' => 4,
                'nivel' => 5,
                'exp' => 999,
                'foto' => 'mago',
                'activo' => true,
                'remember_token' => Str::random(10)
            ],
            [
                'nombre' => 'Remus Lupin',
                'gmail' => 'remus_lupin_hogwards@gmail.com',
                'contrasena' => bcrypt('remus_lupin1234'),
                'idCasa' => 1,
                'nivel' => 4,
                'exp' => 450,
                'foto' => 'mago',
                'activo' => true,
                'remember_token' => Str::random(10)
            ],
            [
                'nombre' => 'Cho Chang',
                'gmail' => 'cho_chang_hogwards@gmail.com',
                'contrasena' => bcrypt('cho_chang1234'),
                'idCasa' => 2,
                'nivel' => 3,
                'exp' => 200,
                'foto' => 'mago',
                'activo' => true,
                'remember_token' => Str::random(10)
            ]
        ];

        foreach ($usuarios as $datos) {
            Usuario::create($datos);
        }
        //DB::table('usuario')->insert($datos);
    }
}
