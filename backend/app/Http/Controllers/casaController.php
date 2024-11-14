<?php
//Jaime Ortega
namespace App\Http\Controllers;

use App\Models\Casa;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class casaController extends Controller
{
    public function getAllCasas()
    {
        $casas = Casa::all();
        return response()->json(['casa' => $casas]);
    }

    public function getCasa($id)
    {
        $casa = Casa::find($id);

        if (!$casa) {
            return response()->json(['message' => 'Casa no encontrada'], 404);
        } else {
            return response()->json(['casa' => $casa]);
        }
    }

    public function getUsuariosCasa($id)
    {
        $casa = Casa::with('usuariosCasa')->find($id);

        if (!$casa) {
            return response()->json(['message' => 'Casa no encontrada'], 404);
        }

        $conteoUsuarios = $casa->usuariosCasa->count();

        return response()->json([
            'casa' => $casa,
            'conteoUsuarios' => $conteoUsuarios
        ]);
    }

    public function createCasa(Request $request)
    {
        $input = $request->all();
        $rules = [
            'nombre' => 'required|string|max:50',
            'puntos' => 'required|integer',
        ];
        $msg = [
            'required' => 'El campo :attribute es obligatorio.',
        ];
        $validator = Validator::make($input, $rules, $msg);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        } else {
            $casa = Casa::create($input);
            return response()->json(['sucess' => true, 'data' => $casa, 'msg' => 'Casa creada'], 201);
        }
    }

    public function updateCasa($id, Request $request)
    {
        $input = $request->all();
        $casa = Casa::find($id);

        if (!$casa) {
            return response()->json(['message' => 'Casa no encontrada'], 404);
        } else {
            $casa->nombre = $input['nombre'];
            $casa->puntos = $input['puntos'];
            $casa->save();

            return response()->json(['success' => true, 'data' => $casa, 'msg' => 'Casa actualizada'], 200);
        }
    }

    public function deleteCasa($id)
    {
        $casa = Casa::find($id);

        if (!$casa) {
            return response()->json(['message' => 'Casa no encontrada'], 404);
        } else {
            $casa->delete();
            return response()->json(['success' => true, 'msg' => 'Casa eliminada'], 200);
        }
    }
}
