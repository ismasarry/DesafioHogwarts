<?php
//Jaime Ortega
namespace Database\Seeders;

use App\Models\Rol;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class RolSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $roles = ['Dumbledore', 'admin', 'profesor', 'alumno'];

        foreach ($roles as $nombre) {
            Rol::factory()->create([
                'nombre' => $nombre
            ]);
        }
    }
}
