<?php

namespace App\Http\Controllers;

use App\Models\MapaMerodeador;
use App\Models\Usuario;
use Illuminate\Http\Request;

//Jaime Ortega
class simulacionController extends Controller
{
    public function iniciarSimulacion(Request $request)
    {
        $segundoSimulacion = $request->input('segundo');
        $usuarios = Usuario::all()->toArray();
        shuffle($usuarios);

        $mapaBase = MapaMerodeador::where('segundo', 0)->orderBy('fila')->get();

        for ($segundo = 1; $segundo <= $segundoSimulacion; $segundo++) {
            $mapaSegundo = ($segundo === 1) ? $mapaBase : MapaMerodeador::where('segundo', $segundo - 1)->get();

            foreach ($mapaSegundo as $fila) {
                $celdas = json_decode($fila->contenidofila, true);

                if ($segundo === 1) {
                    $numPersonas = rand(0, 4);
                    $celdas = $this->colocarPersonasIniciales($celdas, $usuarios, $numPersonas);
                }

                if ($segundo > 1) {
                    $celdas = $this->actualizarCeldas($celdas, $usuarios);
                }

                MapaMerodeador::create([
                    'fila' => $fila->fila,
                    'contenidofila' => $fila->contenidofila = json_encode($celdas),
                    'segundo' => $segundo
                ]);
            }
        }
        return response()->json(['message' => 'Simulación completada']);
    }

    private function colocarPersonasIniciales($celdas, $usuarios, $numPersonas) {
        $posicionesValidas = array_keys(array_filter($celdas, function ($celda) {
            return $celda['tipo'] === 'S' && $celda['persona'] === null;
        }));

        shuffle($posicionesValidas);

        for ($i=0; $i < $numPersonas; $i++) {
            if (isset($posicionesValidas[$i])) {
                $index = $posicionesValidas[$i];
                $celdas[$index]['persona'] = array_shift($usuarios)['id'] ?? null;
            }
        }

        return $celdas;
    }

    private function actualizarCeldas($celdas, &$usuarios) {
        foreach ($celdas as $celda) {
            if ($celda['tipo'] === 'P' && $celda['persona'] === null && rand(0, 1)) {
                $celda['persona'] = array_shift($usuarios)['id']?? null;
            }
        }
        return $celdas;
    }

    public function resetSimulacion()
    {
        MapaMerodeador::where('segundo', '>', 0)->delete();

        return response()->json(['message' => 'Simulación anterior eliminada y lista para nueva simulación']);
    }
}
