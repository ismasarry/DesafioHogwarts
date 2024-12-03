<?php
//Raul Gutierrez
namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\duelo;
use App\Models\hechizos;
use App\Models\turnoDuelo;
use App\Models\Usuario;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class turnoDueloController extends Controller
{
    public function getTodosTurnoDuelos()
    {
        $turnoDuelos = turnoDuelo::all();
        return response()->json(['turnoDuelo' => $turnoDuelos]);
    }

    public function getTurnoDueloPorId($id)
    {
        $turnoDuelo = turnoDuelo::find($id);

        if (!$turnoDuelo) {
            return response()->json(['message' => 'turno de duelo no encontrado'], 404);
        }

        return response()->json(['turnoDuelo' => $turnoDuelo]);
    }

    public function getTurnoDuelosPorDuelo($idUsuario) 
    {
        $dueloEnCurso = duelo::where('idUsuario', $idUsuario)
        ->whereNull('ganador')
        ->first();

        $turnoDuelo = turnoDuelo::where('idDuelo', $dueloEnCurso->id)->get();
        return response()->json($turnoDuelo);
    }

    public function getTurnoDuelosPorDueloNormales($idDuelo) 
    {
        $turnoDuelo = turnoDuelo::where('idDuelo', $idDuelo)->get();
        return response()->json($turnoDuelo);
    }

    public function getHechizosDisponiblesUsuarioDuelo($idUsuario)
    {
        $usuario = Usuario::find($idUsuario);

        if (!$usuario) {
            return response()->json(['error' => 'Usuario no encontrado'], 404);
        }
        $nivelUsuario = $usuario->nivel;

        $dueloEnCurso = duelo::where('idUsuario', $idUsuario)
            ->whereNull('ganador')
            ->first();

        $hechizosUsados = [];
        if ($dueloEnCurso) {
            $hechizosUsados = turnoDuelo::where('idDuelo', $dueloEnCurso->id)
                ->pluck('idHechizoUsadoUsuario')
                ->toArray();
        }

        $hechizosDisponibles = hechizos::where('nivel', '<=', $nivelUsuario)
            ->whereNotIn('id', $hechizosUsados)
            ->get();

        return response()->json($hechizosDisponibles);
    }

    public function getHechizosDisponiblesBotDuelo($idUsuario)
    {
        $usuario = Usuario::find($idUsuario);
        if (!$usuario) {
            return response()->json(['error' => 'Usuario no encontrado'], 404);
        }
        $nivelBot = $usuario->nivel;

        $dueloEnCurso = duelo::where('idUsuario', $idUsuario)
            ->whereNull('ganador')
            ->first();

        $hechizosUsados = [];
        if ($dueloEnCurso) {
            $hechizosUsados = turnoDuelo::where('idDuelo', $dueloEnCurso->id)
                ->pluck('idHechizoUsadoBot')
                ->toArray();
        }

        $hechizosDisponibles = hechizos::where('nivel', '<=', $nivelBot)
            ->whereNotIn('id', $hechizosUsados)
            ->get();

        return response()-> json($hechizosDisponibles);
    }

    public function postTurnoDuelo(Request $request)
    {
        $turnoDuelo = turnoDuelo::create([
            'idDuelo' => $request['idDuelo'],
            'turno' => $request['turno'],
            'idHechizoUsadoUsuario' => $request['idHechizoUsadoUsuario'],
            'idHechizoUsadoBot' => $request['idHechizoUsadoBot'],
            'ganador' => $request['ganador']
        ]);

        return response()->json(['turno duelo' => $turnoDuelo], Response::HTTP_CREATED);
    }

    public function putTurnoDuelo(Request $request, $id)
    {
        $turnoDuelo = turnoDuelo::find($id);

        if (!$turnoDuelo) {
            return response()->json(['message' => 'turno duelo no encontrado'], 404);
        }

        $turnoDuelo->update([
            'idDuelo' => $request['idDuelo'],
            'turno' => $request['turno'],
            'idHechizoUsadoUsuario' => $request['idHechizoUsadoUsuario'],
            'idHechizoUsadoBot' => $request['idHechizoUsadoBot'],
            'ganador' => $request['ganador']
        ]);

        return response()->json(['turnoDuelo' => $turnoDuelo], Response::HTTP_CREATED);
    }

    public function deleteTurnoDuelo($id)
    {
        $turnoDuelo = turnoDuelo::find($id);
        $turnoDuelo->delete();

        return response()->json(['message' => 'turno duelo eliminado exitosamente']);
    }
}
