<?php
//ismael sarrion
namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Recetas;
use App\Models\Ingredientes;
use Symfony\Component\HttpFoundation\Response;
use Illuminate\Http\Request;

class RecetasController extends Controller
{
    public function getTodasRecetas() {
        $recetas = Recetas::all();
        return response()->json(['recetas' => $recetas]);
    }

    public function getRecetaPorId($id) {
        $receta = Recetas::find($id);

        if (!$receta) {
            return response()->json(['message' => 'Receta no encontrada'], 404);
        }

        return response()->json(['receta' => $receta]);
    }

    public function postReceta(Request $request) {
        $receta = Recetas::create([
            'idPocion' => $request['idPocion'],
            'idIngrediente' => $request['idIngrediente']
        ]);

        return response()->json(['receta' => $receta], Response::HTTP_CREATED);
    }

    public function putReceta(Request $request, $id) {
        $receta = Recetas::find($id);

        if (!$receta) {
            return response()->json(['message' => 'Receta no encontrada'], 404);
        }

        $receta->update([
            'idPocion' => $request['idPocion'],
            'idIngrediente' => $request['idIngrediente']
        ]);

        return response()->json(['receta' => $receta], Response::HTTP_OK);
    }

    public function deleteReceta($id) {
        $receta = Recetas::find($id);

        if (!$receta) {
            return response()->json(['message' => 'Receta no encontrada'], 404);
        }

        $receta->delete();

        return response()->json(['message' => 'Receta eliminada exitosamente']);
    }
    public function obtenerRecetasPorPocion($idPocion) {
        $recetas = Recetas::where('idPocion', $idPocion)->get();
    
        $ingredientes = $recetas->map(function($receta) {
            return Ingredientes::find($receta->idIngrediente);
        });
    
        return response()->json($ingredientes);
    }
}
