<?php

namespace Database\Seeders;

use App\Models\MapaMerodeador;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class mapaMerodeadorSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        MapaMerodeador::factory()->create();
    }
}
