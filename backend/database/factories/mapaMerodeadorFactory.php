<?php

namespace Database\Factories;

use App\Models\MapaMerodeador;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Model>
 */
class mapaMerodeadorFactory extends Factory
{
    public function definition(): array
    {
        $mapa = [
            ['X', 'X', 'X', 'X', 'X', 'X', 'X', 'X', 'X', 'X', 'X', 'X', 'X', 'X'],
            ['X', 'X', 'X', 'X', 'S', 'S', 'P', 'S', 'S', 'S', 'S', 'X', 'X', 'X'],
            ['X', 'O', 'O', 'O', 'S', 'S', 'S', 'S', 'S', 'S', 'S', 'X', 'X', 'X'],
            ['X', 'O', 'O', 'O', 'S', 'S', 'S', 'S', 'S', 'S', 'S', 'X', 'X', 'X'],
            ['X', 'O', 'O', 'X', 'X', 'X', 'S', 'S', 'X', 'X', 'X', 'X', 'X', 'X'],
            ['X', 'O', 'O', 'X', 'S', 'S', 'S', 'S', 'S', 'X', 'O', 'O', 'O', 'X'],
            ['X', 'O', 'O', 'X', 'S', 'S', 'S', 'S', 'S', 'O', 'O', 'O', 'O', 'X'],
            ['X', 'O', 'O', 'X', 'P', 'S', 'S', 'S', 'S', 'O', 'O', 'O', 'O', 'X'],
            ['X', 'O', 'O', 'X', 'S', 'S', 'S', 'S', 'S', 'X', 'O', 'O', 'O', 'X'],
            ['X', 'O', 'O', 'X', 'S', 'S', 'S', 'S', 'S', 'X', 'O', 'O', 'O', 'X'],
            ['X', 'O', 'O', 'X', 'X', 'X', 'S', 'S', 'X', 'X', 'X', 'X', 'X', 'X'],
            ['X', 'O', 'O', 'O', 'S', 'S', 'S', 'S', 'S', 'S', 'S', 'X', 'X', 'X'],
            ['X', 'O', 'O', 'O', 'S', 'S', 'S', 'S', 'S', 'S', 'S', 'X', 'X', 'X'],
            ['X', 'X', 'X', 'X', 'S', 'S', 'P', 'S', 'S', 'S', 'S', 'X', 'X', 'X'],
            ['X', 'X', 'X', 'X', 'X', 'X', 'X', 'X', 'X', 'X', 'X', 'X', 'X', 'X']
        ];

        return [
            'tablero' => json_encode($mapa),
            'segundo' => 0,
        ];
    }
}
