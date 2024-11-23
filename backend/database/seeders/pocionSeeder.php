<?php
//ismael sarrion
namespace Database\Seeders;

use App\Models\Pociones;
use Illuminate\Database\Seeder;

class PocionSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $pociones = [
            [
                'nombre' => 'Poción de Vida',
                'descripcion' => 'Restaura la salud rápidamente',
                'estadisticas' => '100,0,90,0,70,0,0,20', 
                'idUsuario' => 2,
                'foto' => 'corazon',
            ],
            [
                'nombre' => 'Poción de Velocidad',
                'descripcion' => 'Aumenta la velocidad temporalmente',
                'estadisticas' => '0,0,0,25,0,0,0,15',
                'idUsuario' => 2,
                'foto' => 'rayo',
            ],
            [
                'nombre' => 'Poción Antídoto',
                'descripcion' => 'Neutraliza efectos de envenenamiento',
                'estadisticas' => '0,100,0,0,20,0,0,50',
                'idUsuario' => 3,
                'foto' => 'antidoto',
            ],
        ];

        foreach ($pociones as $datos) {
            Pociones::create($datos);
        }
    }
}
