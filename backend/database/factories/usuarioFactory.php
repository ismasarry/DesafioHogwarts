<?php
//Raul Gutierrez

namespace Database\Factories;

use App\Models\usuario;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\usuario>
 */
class usuarioFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */

    protected $model = usuario::class; 

    public function definition(): array
    {
        return [
            'nombre' => $this->faker->name(),
            'gmail' => $this->faker->unique()->safeEmail(),
            'contrasena' => bcrypt('admin'),
            'idCasa' => rand(1,4),
            'nivel' => 1,
            'exp' => 0,
            'foto' => 'mago',
            'activo' => true,
            'remember_token' => Str::random(10)
        ];
    }
}
