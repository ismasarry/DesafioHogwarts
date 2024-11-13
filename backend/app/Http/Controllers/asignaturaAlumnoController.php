<?php
//Raul Gutierrez
namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\asignaturaAlumno;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class asignaturaAlumnoController extends Controller
{
    public function getTodosAsignaturaAlumnos()
    {
        $asignatura = asignaturaAlumno::all();
        return response()->json(['asignatura' => $asignatura]);
    }

    public function getAsignaturaAlumnoPorId($id)
    {
        $asignatura = asignaturaAlumno::find($id);

        if (!$asignatura) {
            return response()->json(['message' => 'asignatura no encontrada'], 404);
        }

        return response()->json(['asignatura' => $asignatura]);
    }

    public function postAsignaturaAlumno(Request $request)
    {
        $asignatura = asignaturaAlumno::create([
            'idAsignatura' => $request['idAsignatura'],
            'idAlumno' => $request['idAlumno']
        ]);

        return response()->json(['asignatura' => $asignatura], Response::HTTP_CREATED);
    }

    public function putAsignaturaAlumno(Request $request, $id)
    {
        $asignatura = asignaturaAlumno::find($id);
        if (!$asignatura) {
            return response()->json(['message' => 'Registro de asignatura no encontrado'], 404);
        }

        $asignatura->update([
            'idAsignatura' => $request['idAsignatura'],
            'idAlumno' => $request['idAlumno']
        ]);

        return response()->json(['asignatura' => $asignatura], Response::HTTP_OK);
    }

    public function deleteAsignaturaAlumno($id)
    {
        $asignatura = asignaturaAlumno::find($id);
        if (!$asignatura) {
            return response()->json(['message' => 'Registro de asignatura no encontrado'], 404);
        }

        $asignatura->delete();
        return response()->json(['message' => 'Registro de asignatura eliminado exitosamente']);
    }
}