<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\asignatura;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class asignaturaController extends Controller
{
    public function getTodosAsignaturas()
    {
        $asignatura = asignatura::all();
        return response()->json(['asignatura' => $asignatura]);
    }

    public function getAsignaturaPorId($id)
    {
        $asignatura = asignatura::find($id);

        if (!$asignatura) {
            return response()->json(['message' => 'asignatura no encontrada'], 404);
        }

        return response()->json(['asignatura' => $asignatura]);
    }

    public function postAsignatura(Request $request)
    {
        $asignatura = asignatura::create([
            'nombre' => $request['nombre']
        ]);

        return response()->json(['asignatura' => $asignatura], Response::HTTP_CREATED);
    }

    public function putAsignatura(Request $request, $id)
    {
        $asignatura = asignatura::find($id);
        if (!$asignatura) {
            return response()->json(['message' => 'Registro de asignatura no encontrado'], 404);
        }

        $asignatura->update([
            'nombre' => $request['nombre']
        ]);

        return response()->json(['asignatura' => $asignatura], Response::HTTP_OK);
    }

    public function deleteAsignatura($id)
    {
        $asignatura = asignatura::find($id);
        if (!$asignatura) {
            return response()->json(['message' => 'Registro de asignatura no encontrado'], 404);
        }

        $asignatura->delete();
        return response()->json(['message' => 'Registro de asignatura eliminado exitosamente']);
    }
}