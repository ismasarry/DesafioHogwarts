<?php

namespace Tests\Feature;

use App\Models\Usuario;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;

class UsuarioMiddlewareTest extends TestCase
{
    /**
     * A basic feature test example.
     */
    public function test_usuario_con_rol_adecuado_puede_acceder_a_rutas_protegidas()
    {
        $usuario = new Usuario();
        $usuario->name = 'Usuario Admin';
        $usuario->email = 'admin@prueba.com';
        $usuario->password = bcrypt('password');
        $usuario->save();

        $usuario->roles()->create(['nombre' => 'admin']);

        $this->actingAs($usuario)
            ->postJson('/usuario', [
                'nombre' => 'Test',
                'gmail' => 'test@gmail.com',
                'contrasena' => 'password',
                'idCasa' => 1,
                'nivel' => 1,
                'exp' => 100,
                'foto' => 'dummy-image-url',
                'activo' => true
            ])
            ->assertStatus(201);
    }
}
