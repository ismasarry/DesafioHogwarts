<?php

namespace Tests\Feature;

use App\Models\hechizos;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;

class hechizosTest extends TestCase
{
    /**
     * A basic feature test example.
     */
    public function test_get_todos_hechizos()
    {
        $response = $this->get('/api/hechizos');
        $response->assertStatus(200);
        $response->assertJson(['hechizos' => []]);
    }

    public function test_post_hechizo()
    {
        $payload = [
            'nombre' => 'Bola de fuego',
            'estadisticas' => '10,20,30,40,50,60',
            'idUsuario' => 1,
            'nivel' => 5
        ];

        $response = $this->post('/api/hechizos', $payload);
        $response->assertStatus(201);
        $response->assertJsonFragment(['nombre' => 'Bola de fuego']);
        $this->assertDatabaseHas('hechizos', ['nombre' => 'Bola de fuego']);
    }

    public function test_post_hechizo_con_fallo()
    {
        $payload = [
            'nombre' => 'Hechizo inválido',
            'estadisticas' => '10,20,-5,40,50,200',
            'idUsuario' => 1,
            'nivel' => 5
        ];

        $response = $this->post('/api/hechizos', $payload);
        $response->assertStatus(400);
    }

    public function test_get_hechizo_por_id()
    {
        $hechizo = hechizos::create([
            'nombre' => 'Curación menor',
            'estadisticas' => '10,10,10,10,10,10',
            'idUsuario' => 1,
            'nivel' => 1
        ]);

        $response = $this->get("/api/hechizos/{$hechizo->id}");
        $response->assertStatus(200);
        $response->assertJsonFragment(['nombre' => 'Curación menor']);
    }

    public function test_put_hechizo()
    {
        $hechizo = hechizos::create([
            'nombre' => 'Rayo de escarcha',
            'estadisticas' => '20,20,20,20,20,20',
            'idUsuario' => 1,
            'nivel' => 3
        ]);

        $payload = [
            'nombre' => 'Rayo mejorado',
            'estadisticas' => '30,30,30,30,30,30',
            'idUsuario' => 1,
            'nivel' => 4,
            'veri' => 0,
            'veriD' => 0
        ];

        $response = $this->put("/api/hechizos/{$hechizo->id}", $payload);
        $response->assertStatus(201);
        $response->assertJsonFragment(['nombre' => 'Rayo mejorado']);
        $this->assertDatabaseHas('hechizos', ['nombre' => 'Rayo mejorado']);
    }

    public function test_delete_hechizo()
    {
        $hechizo = hechizos::create([
            'nombre' => 'Explosión arcana',
            'estadisticas' => '50,50,50,50,50,50',
            'idUsuario' => 1,
            'nivel' => 7
        ]);

        $response = $this->delete("/api/hechizos/{$hechizo->id}");
        $response->assertStatus(200);
        $response->assertJsonFragment(['message' => 'hechizos eliminado exitosamente']);
        $this->assertDatabaseMissing('hechizos', ['nombre' => 'Explosión arcana']);
    }
}
