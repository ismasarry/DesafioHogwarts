<?php
//Jaime Ortega
namespace Database\Seeders;

use App\Models\Casa;
use Database\Factories\casaFactory;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class casaSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $casas = ['Gryffindor', 'Hufflepuff', 'Ravenclaw', 'Slytherin'];

        foreach ($casas as $nombre) {
            Casa::factory()->create([
                'nombre' => $nombre
            ]);
        }
    }
}
