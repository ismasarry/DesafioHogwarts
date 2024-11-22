<?php
//Raul Gutierrez
namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\hechizos;
use Symfony\Component\HttpFoundation\Response;
use Illuminate\Http\Request;

class hechizosController extends Controller
{
    public function getTodosHechizos(){
        $hechizos = hechizos::all();
        return response()->json(['hechizos' => $hechizos]);
    }

    public function getHechizoPorId($id){
        $hechizos = hechizos::find($id);

        if (!$hechizos) {
            return response()->json(['message' => 'hechizo no encontrado'], 404);
        }

        return response()->json(['hechizos' => $hechizos]);
    }

    public function getHechizoPorNivelMenor($nivel){
        $hechizos = hechizos::where('nivel', '<=', $nivel)->get();

        if ($hechizos->isEmpty()) {
            return response()->json(['message' => 'No se encontraron hechizos para el nivel especificado o menor.'], 404);
        }
    
        return response()->json(['hechizos' => $hechizos]);
    }

    public function postHechizo(Request $request){
            $hechizos = hechizos::create([
                'nombre' => $request['nombre'],
                'estadisticas' => $request['estadisticas'],
                'idUsuario' => $request['idUsuario'],
                'nivel' => $request['nivel']
            ]);

            return response()->json(['hechizos' => $hechizos], Response::HTTP_CREATED);

    }

    public function putHechizo(Request $request, $id){
        $hechizos = hechizos::find($id);

        if (!$hechizos) {
            return response()->json(['message' => 'hechizos no encontrado'], 404);
        }

        $hechizos->update([
            'nombre' => $request['nombre'],
            'estadisticas' => $request['estadisticas'],
            'idUsuario' => $request['idUsuario'],
            'nivel' => $request['nivel'],
            'veri' => $request['veri'],
            'veriD' => $request['veriD']
        ]);

        return response()->json(['hechizos' => $hechizos], Response::HTTP_CREATED);
    }

    public function deleteHechizo($id){
        $hechizos = hechizos::find($id);
        $hechizos->delete();

        return response()->json(['message' => 'hechizos eliminado exitosamente']);
    }
}
