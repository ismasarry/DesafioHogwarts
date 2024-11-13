<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\asignaturaProfesor;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class asignaturaProfesorController extends Controller
{
    public function getTodosAsignaturaProfesores()
    {
        $asignatura = asignaturaProfesor::all();
        return response()->json(['asignatura' => $asignatura]);
    }

    public function getAsignaturaProfesorPorId($id)
    {
        $asignatura = asignaturaProfesor::find($id);

        if (!$asignatura) {
            return response()->json(['message' => 'asignatura no encontrada'], 404);
        }

        return response()->json(['asignatura' => $asignatura]);
    }

    public function postAsignaturaProfesor(Request $request)
    {
        $asignatura = asignaturaProfesor::create([
            'idAsignatura' => $request['idAsignatura'],
            'idProfesora' => $request['idProfesora']
        ]);

        return response()->json(['asignatura' => $asignatura], Response::HTTP_CREATED);
    }

    public function putAsignaturaProfesor(Request $request, $id)
    {
        $asignatura = asignaturaProfesor::find($id);
        if (!$asignatura) {
            return response()->json(['message' => 'Registro de asignatura no encontrado'], 404);
        }

        $asignatura->update([
            'idAsignatura' => $request['idAsignatura'],
            'idProfesora' => $request['idProfesora']
        ]);

        return response()->json(['asignatura' => $asignatura], Response::HTTP_OK);
    }

    public function deleteAsignaturaProfesor($id)
    {
        $asignatura = asignaturaProfesor::find($id);
        if (!$asignatura) {
            return response()->json(['message' => 'Registro de asignatura no encontrado'], 404);
        }

        $asignatura->delete();
        return response()->json(['message' => 'Registro de asignatura eliminado exitosamente']);
    }
}