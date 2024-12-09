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
                'nombre' => 'Albus Dumbledore',
                'gmail' => 'dumbledore_hogwarts@gmail.com',
                'contrasena' => bcrypt('dumbledore1234'),
                'idCasa' => 1,
                'nivel' => 5,
                'exp' => 999,
                'foto' => './../assets/Albus_Dumbledore.jpg',
                'activo' => true,
            ],
            [
                'nombre' => 'Severus Snape',
                'gmail' => 'snape_hogwarts@gmail.com',
                'contrasena' => bcrypt('snape1234'),
                'idCasa' => 4,
                'nivel' => 5,
                'exp' => 850,
                'foto' => './../assets/severus_snape.jpg',
                'activo' => true,
            ],
            [
                'nombre' => 'Minerva McGonagall',
                'gmail' => 'minerva_hogwarts@gmail.com',
                'contrasena' => bcrypt('minerva1234'),
                'idCasa' => 1,
                'nivel' => 5,
                'exp' => 700,
                'foto' => './../assets/minerva_mcgonagall.jpg',
                'activo' => true,
            ],
            [
                'nombre' => 'Remus Lupin',
                'gmail' => 'lupin_hogwarts@gmail.com',
                'contrasena' => bcrypt('remus_lupin1234'),
                'idCasa' => 1,
                'nivel' => 4,
                'exp' => 500,
                'foto' => './../assets/remus_lupin.jpg',
                'activo' => true,
            ],
            [
                'nombre' => 'Harry Potter',
                'gmail' => 'harry_hogwarts@gmail.com',
                'contrasena' => bcrypt('harry1234'),
                'idCasa' => 1,
                'nivel' => 4,
                'exp' => 350,
                'foto' => './../assets/harry_potter.jpg',
                'activo' => true,
            ],
            [
                'nombre' => 'Hermione Granger',
                'gmail' => 'hermione_hogwarts@gmail.com',
                'contrasena' => bcrypt('hermione_chang1234'),
                'idCasa' => 1,
                'nivel' => 3,
                'exp' => 300,
                'foto' => './../assets/hermione_granger.webp',
                'activo' => true,
            ],
            [
                'nombre' => 'Ron Weasley',
                'gmail' => 'ron_hogwarts@gmail.com',
                'contrasena' => bcrypt('ron_chang1234'),
                'idCasa' => 1,
                'nivel' => 3,
                'exp' => 250,
                'foto' => './../assets/ron_weasley.jpg',
                'activo' => true,
            ],
            [
                'nombre' => 'Cho Chang',
                'gmail' => 'cho_hogwarts@gmail.com',
                'contrasena' => bcrypt('cho_chang1234'),
                'idCasa' => 1,
                'nivel' => 3,
                'exp' => 150,
                'foto' => './../assets/cho_chang.jpg',
                'activo' => true,
            ]
        ];

        foreach ($usuarios as $datos) {
            $usuario = Usuario::create($datos);

            if ($usuario->gmail == 'dumbledore_hogwards@gmail.com') {
                $usuario->remember_token = $usuario->createToken('LaravelSanctumAuth', ['Dumbledore'])->plainTextToken;
            } elseif ($usuario->gmail == 'snape_hogwards@gmail.com') {
                $usuario->remember_token = $usuario->createToken('LaravelSanctumAuth', ['admin', 'profesor'])->plainTextToken;
            } elseif ($usuario->gmail == 'minerva_hogwards@gmail.com') {
                $usuario->remember_token = $usuario->createToken('LaravelSanctumAuth', ['admin', 'profesor'])->plainTextToken;
            } elseif ($usuario->gmail == 'remus_lupin_hogwards@gmail.com') {
                $usuario->remember_token = $usuario->createToken('LaravelSanctumAuth', ['profesor'])->plainTextToken;
            } else {
                $usuario->remember_token = $usuario->createToken('LaravelSanctumAuth', ['alumno'])->plainTextToken;
            }

            $usuario->save();
        }
    }
}
