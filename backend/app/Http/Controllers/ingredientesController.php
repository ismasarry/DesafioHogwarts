<?php
//ismael sarrion
namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Ingredientes;
use Symfony\Component\HttpFoundation\Response;
use Illuminate\Http\Request;

class IngredientesController extends Controller
{
    public function getTodosIngredientes() {
        $ingredientes = Ingredientes::all();
        return response()->json(['ingredientes' => $ingredientes]);
    }

    public function getIngredientePorId($id) {
        $ingrediente = Ingredientes::find($id);

        if (!$ingrediente) {
            return response()->json(['message' => 'Ingrediente no encontrado'], 404);
        }

        return response()->json(['ingrediente' => $ingrediente]);
    }

    public function postIngrediente(Request $request) {
        $ingrediente = Ingredientes::create([
            'Nombre' => $request['Nombre'],
            'Estadisticas' => $request['Estadisticas'],
            'foto' => $request['foto'],

        ]);

        return response()->json(['ingrediente' => $ingrediente], Response::HTTP_CREATED);
    }

    public function putIngrediente(Request $request, $id) {
        $ingrediente = Ingredientes::find($id);

        if (!$ingrediente) {
            return response()->json(['message' => 'Ingrediente no encontrado'], 404);
        }

        $ingrediente->update([
            'Nombre' => $request['Nombre'],
            'Estadisticas' => $request['Estadisticas'],
            'foto' => $request['foto'],

        ]);

        return response()->json(['ingrediente' => $ingrediente], Response::HTTP_OK);
    }

    public function deleteIngrediente($id) {
        $ingrediente = Ingredientes::find($id);

        if (!$ingrediente) {
            return response()->json(['message' => 'Ingrediente no encontrado'], 404);
        }

        $ingrediente->delete();

        return response()->json(['message' => 'Ingrediente eliminado exitosamente']);
    }
}
