<?php
//Jaime Ortega
namespace Database\Factories;

use App\Models\Casa;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\casa>
 */
class casaFactory extends Factory
{
    protected $model = Casa::class;

    public function definition(): array
    {
        return [
            'nombre' => '',
            'puntos' => 0
        ];
    }
}
