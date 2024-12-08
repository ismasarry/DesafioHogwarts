<?php
//ismael sarrion
namespace Database\Seeders;

use App\Models\Pociones;
use Illuminate\Database\Seeder;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;

class PocionesSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $pociones = [
            [
                'nombre' => 'Poción de Vida',
                'descripcion' => 'Es una Pocion beneficiosa que restaura la salud rápidamente',
                'estadisticas' => '100,0,90,0,70,0,20,0', 
                'idUsuario' => 2,
                'veri' => 1,
                
            ],
            [
                'nombre' => 'Poción de Velocidad',
                'descripcion' => 'Es una Pocion beneficiosa que aumenta la velocidad temporalmente',
                'estadisticas' => '0,0,100,0,20,0,50,0',
                'idUsuario' => 2,
                'veri' => 1,
               
            ],           
            [
                'nombre' => 'Poción Antídoto',
                'descripcion' => 'Es una Pocion beneficiosa que neutraliza efectos de envenenamiento',
                'estadisticas' => '75,0,50,0,20,0,20,0',
                'idUsuario' => 3,
                'veri' => 1,
                
            ],
            [
                'nombre' => 'Poción de Daño',
                'descripcion' => 'Es una Pocion perjudicial que daña la salud del que osa consumirla',
                'estadisticas' => '0,75,0,50,0,20,0,20',
                'idUsuario' => 3,
                'veri' => 0,
                
            ],
        ];

        foreach ($pociones as $datos) {
            pociones::create($datos);
        }
    }
}
