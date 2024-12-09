<?php
//ismael sarrion
namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\UsuarioRol;
use Illuminate\Support\Facades\DB;


class usuarioRolSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        //Usuario::factory(5)->create();
        $datos = [
            [
                'idRol' => 1,
                'idUsuario' => 1
            ],

            [
                'idRol' => 2,
                'idUsuario' => 2
            ],
            [
                'idRol' => 3,
                'idUsuario' => 2
            ],
            [
                'idRol' => 3,
                'idUsuario' => 3
            ],
            [
                'idRol' => 3,
                'idUsuario' => 4
            ],
            [
                'idRol' => 4,
                'idUsuario' => 5
            ],
            [
                'idRol' => 4,
                'idUsuario' => 6
            ],
            [
                'idRol' => 4,
                'idUsuario' => 7
            ],
            [
                'idRol' => 4,
                'idUsuario' => 8
            ],
            [
                'idRol' => 4,
                'idUsuario' => 9
            ]
        ];

        DB::table('usuario_rol')->insert($datos);
    }
}
