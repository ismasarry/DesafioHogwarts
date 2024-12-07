<?php
//Jaime Ortega
namespace App\Http\Controllers;

use App\Models\MapaMerodeador;
use App\Models\Usuario;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

class simulacionController extends Controller
{
    //--------------- Inicia la simulación ---------------
    public function iniciarSimulacion(Request $request)
    {
        try {
            $segundoSimulacion = $request->input('segundo');

            if (!isset($segundoSimulacion) || $segundoSimulacion <= 0) {
                return response()->json(['error' => 'Parámetro "segundo" inválido'], 400);
            }

            $usuarios = Usuario::all()->toArray();
            shuffle($usuarios);

            $mapaBase = MapaMerodeador::where('segundo', 0)->orderBy('fila')->get();

            if ($mapaBase->isEmpty()) {
                return response()->json(['error' => 'Mapa base no encontrado.'], 404);
            }

            for ($segundo = 1; $segundo <= $segundoSimulacion; $segundo++) {
                Log::info("Procesando segundo: " . $segundo);
                $mapaSegundo = ($segundo === 1) ? $mapaBase : MapaMerodeador::where('segundo', $segundo - 1)->get();

                foreach ($mapaSegundo as $fila) {
                    $celdas = json_decode($fila->contenidofila, true);

                    if ($celdas === null) {
                        return response()->json(['error' => 'Error al decodificar el JSON de la fila.'], 500);
                    }

                    if ($segundo === 1) {
                        $numPersonas = rand(0, 4);
                        $numPersonas = min($numPersonas, count($usuarios));
                        $celdas = $this->colocarPersonasIniciales($celdas, $usuarios, $numPersonas);
                    }

                    if ($segundo > 1) {
                        $celdas = $this->actualizarCeldas($celdas, $usuarios, $fila->fila, $mapaSegundo);
                    }

                    MapaMerodeador::create([
                        'fila' => $fila->fila,
                        'contenidofila' => json_encode($celdas),
                        'segundo' => $segundo
                    ]);
                }
            }
            return response()->json(['message' => 'Simulación completada']);
        } catch (\Exception $e) {
            Log::error('Error en la simulación: ' . $e->getMessage());
            return response()->json(['error' => 'Error inesperado durante la simulación.' . $e->getMessage()], 500);
        }
    }

    //--------------- Coloca las personas iniciales ---------------
    private function colocarPersonasIniciales($celdas, &$usuarios, $numPersonas)
    {
        $posicionesValidas = array_keys(array_filter($celdas, function ($celda) {
            return in_array($celda['tipo'], ['S', 'A']) && $celda['persona'] === null;
        }));

        shuffle($posicionesValidas);

        $numPersonas = min($numPersonas, count($usuarios));

        for ($i = 0; $i < $numPersonas; $i++) {
            if (isset($posicionesValidas[$i])) {
                $index = $posicionesValidas[$i];
                $celdas[$index]['persona'] = array_shift($usuarios)['id'] ?? null;
            }
        }
        return $celdas;
    }

    //--------------- Actualiza las celdas ---------------
    private function actualizarCeldas($celdas, &$usuarios, $filaId, $mapa)
    {
        try {
            foreach ($celdas as $colId => &$celda) {
                // Entrada de persona por cada puerta
                if ($celda['tipo'] === 'A' && $celda['persona'] === null) {
                    $adyacentes = $this->obtenerAdyacentes($filaId, $colId, $mapa);

                    $puertasAdyacentes = array_filter($adyacentes, function ($ady) {
                        return $ady['celda']['tipo'] === 'P' && $ady['celda']['persona'] === null;
                    });

                    if (!empty($puertasAdyacentes) && rand(0, 1)) {
                        $celda['persona'] = array_shift($usuarios)['id'] ?? null;
                    }
                }

                // Movimiento aleatorio de personas
                if ($celda['persona'] !== null) {
                    $adyacentes = $this->obtenerAdyacentes($filaId, $colId, $mapa);

                    $adyacentesValidos = array_filter($adyacentes, function ($ady) {
                        return in_array($ady['celda']['tipo'], ['S', 'A', 'P']) && $ady['celda']['persona'] === null;
                    });

                    if (!empty($adyacentesValidos)) {
                        $movimiento = $adyacentesValidos[array_rand($adyacentesValidos)];

                        // Si se mueve a una puerta, se sale
                        if ($movimiento['celda']['tipo'] === 'P') {
                            $usuarios[] = ['id' => $celda['persona']]; // Persona sale del mapa
                            $celda['persona'] = null; // Vacía casilla actual
                        } else {
                            // Mover a casilla válida
                            $celdas[$movimiento['columna']]['persona'] = $celda['persona'];
                            $celda['persona'] = null; // Vacía casilla actual
                        }
                    }
                }
            }
            return $celdas;
        } catch (\Exception $e) {
            Log::error('Error en actualizarCeldas: ' . $e->getMessage());
            throw $e;
        }
    }


    //--------------- Obtiene los adyacentes de una celda ---------------
    private function obtenerAdyacentes($filaId, $colId, $mapa)
    {
        $adyacentes = [];
        $filas = $mapa->count();
        $cols = json_decode($mapa[0]->contenidofila, true) ? count(json_decode($mapa[0]->contenidofila, true)) : 0;

        $coordenadas = [
            [$filaId - 1, $colId],     // Arriba
            [$filaId + 1, $colId],     // Abajo
            [$filaId, $colId - 1],     // Izquierda
            [$filaId, $colId + 1],     // Derecha
            [$filaId - 1, $colId - 1], // Arriba-Izquierda
            [$filaId - 1, $colId + 1], // Arriba-Derecha
            [$filaId + 1, $colId - 1], // Abajo-Izquierda
            [$filaId + 1, $colId + 1], // Abajo-Derecha
        ];

        foreach ($coordenadas as [$f, $c]) {
            if ($f >= 0 && $f < $filas && $c >= 0 && $c < $cols) {
                $filaContenido = json_decode($mapa[$f]->contenidofila, true);
                if ($filaContenido && isset($filaContenido[$c])) {
                    $adyacentes[] = [
                        'fila' => $f,
                        'columna' => $c,
                        'celda' => $filaContenido[$c]
                    ];
                }
            }
        }
        return $adyacentes;
    }


    //--------------- Reinicia la simulación y borra los registros de la anterior ---------------
    public function resetSimulacion()
    {
        MapaMerodeador::where('segundo', '>', 0)->delete();

        return response()->json(['message' => 'Simulación anterior eliminada y lista para nueva simulación']);
    }
}
