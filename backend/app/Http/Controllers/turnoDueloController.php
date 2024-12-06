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

        return response()->json($hechizosDisponibles);
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

    public function eleccionHechizoBot($idUsuario)
    {
        $hechizosDisponiblesResponse = self::getHechizosDisponiblesBotDuelo($idUsuario);
        $hechizosDisponibles = $hechizosDisponiblesResponse->getData(true);
        $turnoRespose = self::getTurnoDuelosPorDuelo($idUsuario);
        $turno = $turnoRespose->getData(true);
        $hechizosConEsta = [];

        for ($i = 0; $i < count($hechizosDisponibles); $i++) {
            $hechizo = $hechizosDisponibles[$i];
            $estadisticas = explode(",", $hechizo['estadisticas']);
            $hechizos = [$hechizo['id'], $estadisticas];
            array_push($hechizosConEsta, $hechizos);
        }

        $ale = rand(0, 3);
        $hechizoBot = "";

        switch (count($turno)) {
            case 0:
                if ($ale != 0) {
                    $hechizoBot = $hechizosDisponibles[rand(0, count($hechizosDisponibles)-1)]['id'];
                } else {
                    $max = 0;
                    for ($i = 0; $i < count($hechizosConEsta); $i++) {
                        if ($hechizosConEsta[$i][1][0] <= 70) {
                            if ($hechizosConEsta[$i][1][0] >= $max) {
                                $hechizoBot = $hechizosConEsta[$i][0];
                                $max = $hechizosConEsta[$i][1][0];
                            }
                        }
                    }
                }
                break;

            case 1:
                if ($ale == 0) {
                    $max1 = 0;
                    for ($i = 0; $i < count($hechizosConEsta); $i++) {
                        if ($hechizosConEsta[$i][1][0] <= 70) {
                            if ($hechizosConEsta[$i][1][1] >= $max1) {
                                $hechizoBot = $hechizosConEsta[$i][0];
                                $max1 = $hechizosConEsta[$i][1][1];
                            }
                        }
                    }
                } else {
                    $max1 = 0;
                    for ($i = 0; $i < count($hechizosConEsta); $i++) {
                        if ($hechizosConEsta[$i][1][0] <= 70) {
                            if ($hechizosConEsta[$i][1][5] >= $max1) {
                                $hechizoBot = $hechizosConEsta[$i][0];
                                $max1 = $hechizosConEsta[$i][1][5];
                            }
                        }
                    }
                }
                break;

            case 2:
                if ($turno[0]->ganador == true && $turno[1]->ganador == true) {
                    $max2 = 0;
                    for ($i = 0; $i < count($hechizosConEsta); $i++) {
                        if ($hechizosConEsta[$i][1][0] >= $max2) {
                            $hechizoBot = $hechizosConEsta[$i][0];
                            $max2 = $hechizosConEsta[$i][1][0];
                        }
                    }
                } else {
                    $max2 = 0;
                    for ($i = 0; $i < count($hechizosConEsta); $i++) {
                        if ($hechizosConEsta[$i][1][0] <= 70) {
                            if ($hechizosConEsta[$i][1][1] >= $max2) {
                                $hechizoBot = $hechizosConEsta[$i][0];
                                $max2 = $hechizosConEsta[$i][1][1];
                            }
                        }
                    }
                }
                break;

            case 3:
                if ($ale <= 1) {
                    if (($turno[0]->ganador == false && $turno[1]->ganador == false) || ($turno[0]->ganador == false && $turno[2]->ganador == false) || ($turno[1]->ganador == false && $turno[2]->ganador == false)) {
                        $max3 = 0;
                        for ($i = 0; $i < count($hechizosConEsta); $i++) {
                            if ($hechizosConEsta[$i][1][0] >= $max3) {
                                $hechizoBot = $hechizosConEsta[$i][0];
                                $max3 = $hechizosConEsta[$i][1][0];
                            }
                        }
                    } else {
                        $max3 = 0;
                        for ($i = 0; $i < count($hechizosConEsta); $i++) {
                            if ($hechizosConEsta[$i][1][0] <= 70) {
                                if ($hechizosConEsta[$i][1][1] >= $max3) {
                                    $hechizoBot = $hechizosConEsta[$i][0];
                                    $max3 = $hechizosConEsta[$i][1][1];
                                }
                            }
                        }
                    }
                } else {
                    $hechizoBot = $hechizosDisponibles[rand(0, count($hechizosDisponibles)-1)]['id'];
                }
                break;
            case 4:
                $max4 = 0;
                for ($i = 0; $i < count($hechizosConEsta); $i++) {
                    if ($hechizosConEsta[$i][1][0] >= $max4) {
                        $hechizoBot = $hechizosConEsta[$i][0];
                        $max4 = $hechizosConEsta[$i][1][0];
                    }
                }
                break;
        }

        return response()->json(['hechizos' => $hechizoBot], Response::HTTP_CREATED);
    }
}
