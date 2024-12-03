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
        $mapa = $this->generarMapa();

        return [
            'tablero' => json_encode($mapa),
            'segundo' => 0,
        ];
    }

    private function generarMapa(): array {
        return [
            ['x','x','x','x','x','p','x','x'],
            ['x','s','s','s','s','s','s','x'],
            ['p','s','s','s','s','s','s','x'],
            ['x','s','s','s','s','s','s','x'],
            ['x','s','s','s','s','s','s','p'],
            ['x','s','s','s','s','s','s','x'],
            ['x','x','p','x','x','x','x','x'],
        ];
    }
}
