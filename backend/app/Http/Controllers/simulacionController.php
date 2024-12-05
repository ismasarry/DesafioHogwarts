<?php

namespace App\Http\Controllers;

use App\Models\MapaMerodeador;
use Illuminate\Http\Request;

//Jaime Ortega
class simulacionController extends Controller
{
    public function iniciarSimulacion(Request $request)
    {
        $segundo = $request->input('segundo');

        $mapaOriginal = MapaMerodeador::where('segundo', 0)->get();

        for ($i = 1; $i <= $segundo; $i++) {
            foreach ($mapaOriginal as $index => $fila) {

                MapaMerodeador::create([
                    'fila' => $fila->fila,
                    'contenidofila' => json_encode(json_decode($this->actualizarFila($fila->contenidofila, $i))),
                    'segundo' => $i
                ]);
            }
        }
        return response()->json(['message' => 'Simulación completada']);
    }

    private function actualizarFila($contenidofila, $segundo) {
        $fila = json_encode($contenidofila, true);

        return $fila;
    }

    public function resetSimulacion()
    {
        MapaMerodeador::where('segundo', '>', 0)->delete();

        return response()->json(['message' => 'Simulación anterior eliminada y lista para nueva simulación']);
    }
}
