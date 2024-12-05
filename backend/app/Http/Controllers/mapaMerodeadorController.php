<?php
// ismael sarrion
namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\MapaMerodeador;
use Symfony\Component\HttpFoundation\Response;
use Illuminate\Http\Request;

class MapaMerodeadorController extends Controller
{
    public function getTodosMapas()
    {
        $mapas = MapaMerodeador::all();
        return response()->json(['mapas' => $mapas]);
    }

    public function getMapaPorId($id)
    {
        $mapa = MapaMerodeador::find($id);

        if (!$mapa) {
            return response()->json(['message' => 'Mapa no encontrado'], 404);
        }

        return response()->json(['mapa' => $mapa]);
    }

    public function postMapa(Request $request)
    {
        $validatedData = $request->validate([
            'fila' => 'required|integer',
            'contenidofila' => 'required|string',
            'segundo' => 'required|integer',
        ]);

        $mapa = MapaMerodeador::create($validatedData);

        return response()->json(['mapa' => $mapa], Response::HTTP_CREATED);
    }

    public function putMapa(Request $request, $id)
    {
        $mapa = MapaMerodeador::find($id);

        if (!$mapa) {
            return response()->json(['message' => 'Mapa no encontrado'], 404);
        }

        $validatedData = $request->validate([
            'fila' => 'sometimes|integer',
            'contenidofila' => 'sometimes|string',
            'segundo' => 'sometimes|integer',
        ]);

        $mapa->update($validatedData);

        return response()->json(['mapa' => $mapa], Response::HTTP_OK);
    }

    public function deleteMapa($id)
    {
        $mapa = MapaMerodeador::find($id);

        if (!$mapa) {
            return response()->json(['message' => 'Mapa no encontrado'], 404);
        }

        $mapa->delete();

        return response()->json(['message' => 'Mapa eliminado exitosamente']);
    }

    public function getMapaPorSegundo($segundo)
    {
        $mapaSegundo = MapaMerodeador::where('segundo', $segundo)->get();

        if ($mapaSegundo->isEmpty()) {
            return response()->json(['message' => 'No se encontraron mapas para el segundo especificado'], 404);
        }

        return response()->json(['mapaSegundo' => $mapaSegundo], 200);
    }

    //Jaime Ortega
    public function getMapaBase()
    {
        $mapaBase = MapaMerodeador::where('segundo', 0)->orderBy('fila')->get();

        if ($mapaBase->isEmpty()) {
            return response()->json(['message' => 'Mapa no encontrado'], 404);
        }

        return response()->json(['mapaBase' => $mapaBase]);
    }

}
