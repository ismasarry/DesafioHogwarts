<?php
//ISmael Sarrion
namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use App\Models\usuarioRol;
use App\Models\usuario;
use App\Models\rol;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Model>
 */
class usuarioRolFactory extends Factory
{
    protected $model = usuarioRol::class;
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'idUsuario' => usuario::inRandomOrder()->first()->id ?? usuario::factory(),

            'idRol' => rol::inRandomOrder()->first()->id ?? rol::factory(),
        ];
    }
}
