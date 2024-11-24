<?php
//ismael sarrion

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Pociones;
use Symfony\Component\HttpFoundation\Response;
use Illuminate\Http\Request;

class PocionesController extends Controller
{
    public function getTodasPociones() {
        $pociones = Pociones::all();
        return response()->json(['pociones' => $pociones]);
    }

    public function getPocionPorId($id) {
        $pocion = Pociones::find($id);

        if (!$pocion) {
            return response()->json(['message' => 'Poción no encontrada'], 404);
        }

        return response()->json(['pocion' => $pocion]);
    }

    public function postPocion(Request $request) {
        $pocion = Pociones::create([
            'idUsuario' => $request['idUsuario'],
            'Nombre' => $request['Nombre'],
            'Descripcion' => $request['Descripcion'],
            'Estadisticas' => $request['Estadisticas'],
            //'foto' => $request['foto'],
            'veri' => $request['veri'],
            'veriD' => $request['veriD']
        ]);

        return response()->json(['pocion' => $pocion], Response::HTTP_CREATED);
    }

    public function putPocion(Request $request, $id) {
        $pocion = Pociones::find($id);

        if (!$pocion) {
            return response()->json(['message' => 'Poción no encontrada'], 404);
        }

        $pocion->update([
            'idUsuario' => $request['idUsuario'],
            'Nombre' => $request['Nombre'],
            'Descripcion' => $request['Descripcion'],
            'Estadisticas' => $request['Estadisticas'],
           // 'foto' => $request['foto'],
            'veri' => $request['veri'],
            'veriD' => $request['veriD']
        ]);

        return response()->json(['pocion' => $pocion], Response::HTTP_OK);
    }

    public function deletePocion($id) {
        $pocion = Pociones::find($id);

        if (!$pocion) {
            return response()->json(['message' => 'Poción no encontrada'], 404);
        }

        $pocion->delete();

        return response()->json(['message' => 'Poción eliminada exitosamente']);
    }
}
