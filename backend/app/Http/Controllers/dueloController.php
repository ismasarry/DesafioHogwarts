<?php
//Raul Gutierrez
namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\duelo;
use Symfony\Component\HttpFoundation\Response;
use Illuminate\Http\Request;

class dueloController extends Controller
{
    public function getTodosDuelos()
    {
        $Duelos = duelo::all();
        return response()->json(['duelo' => $Duelos]);
    }

    public function getDueloPorId($id)
    {
        $duelo = duelo::find($id);

        if (!$duelo) {
            return response()->json(['message' => 'duelo no encontrado'], 404);
        }

        return response()->json(['duelo' => $duelo]);
    }

    public function getDueloPorIdUsuario($idUsuario)
    {
        $duelo = duelo::where('idUsuario', $idUsuario)->get();
        return response()->json($duelo);
    }

    public function getWinRatePorIdUsuario($idUsuario)
    {
        $duelos = duelo::where('idUsuario', $idUsuario)->count();
        $duelosGanados = duelo::where('idUsuario', $idUsuario)->where('ganador', true)->count();
        $winRate = ($duelosGanados / $duelos) * 100;

        return response()->json([
            'idUsuario' => $idUsuario,
            'winRate' => round($winRate, 2)
        ]);
    }

    public function postDuelo(Request $request)
    {
        $duelo = duelo::create([
            'idUsuario' => $request['idUsuario'],
            'ganador' => $request['ganador']
        ]);

        return response()->json(['duelo' => $duelo], Response::HTTP_CREATED);
    }

    public function putDuelo(Request $request, $id)
    {
        $duelo = duelo::find($id);

        if (!$duelo) {
            return response()->json(['message' => 'duelo no encontrado'], 404);
        }

        $duelo->update([
            'idUsuario' => $request['idUsuario'],
            'ganador' => $request['ganador']
        ]);

        return response()->json(['duelo' => $duelo], Response::HTTP_CREATED);
    }

    public function deleteDuelo($id)
    {
        $duelo = duelo::find($id);
        $duelo->delete();

        return response()->json(['message' => 'duelo eliminado exitosamente']);
    }
}
