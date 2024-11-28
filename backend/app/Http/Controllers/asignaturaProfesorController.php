<?php
//Raul Gutierrez
namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\asignatura;
use App\Models\asignaturaProfesor;
use App\Models\Usuario;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class asignaturaProfesorController extends Controller
{
    //Jaime Ortega (modifica)
    public function getTodosAsignaturaProfesores()
    {
        $asignaturaProfesores = asignaturaProfesor::with('usuario')->get();

        return response()->json(['asignaturaProfesores' => $asignaturaProfesores]);
    }

    //Jaime Ortega (modifica)
    public function getAsignaturaProfesorPorId($id)
    {
        $asignaturaProfesores = AsignaturaProfesor::where('idAsignatura', $id)->get();

        if ($asignaturaProfesores->isEmpty()) {
            return response()->json(['message' => 'No se encontraron profesores para la asignatura'], 404);
        }

        $profesores = $asignaturaProfesores->map(function ($asignaturaProfesor) {
            return Usuario::find($asignaturaProfesor->idProfesor);
        });

        $conteoProfesores = $profesores->count();

        return response()->json([
            'asignatura' => asignatura::find($id),
            'profesores' => $profesores,
            'conteoProfesores' => $conteoProfesores,
        ]);
    }

    public function getAsignaturaProfesorPorIdProfesor($idProfesor)
    {
        $asignaturas = AsignaturaProfesor::where('idProfesor', $idProfesor)->get();
        return response()->json($asignaturas);
    }

    public function postAsignaturaProfesor(Request $request)
    {
        foreach ($request['idProfesor'] as $idProfesor) {
            $asignaturaProfesor = asignaturaProfesor::create([
                'idAsignatura' => $request['idAsignatura'],
                'idProfesor' => $idProfesor
            ]);
        }
        return response()->json(['asignaturaProfesor' => $asignaturaProfesor], Response::HTTP_CREATED);
    }

    public function putAsignaturaProfesor(Request $request, $id)
    {
        $asignatura = asignaturaProfesor::find($id);
        if (!$asignatura) {
            return response()->json(['message' => 'Registro de asignatura no encontrado'], 404);
        }

        $asignatura->update([
            'idAsignatura' => $request['idAsignatura'],
            'idProfesor' => $request['idProfesor']
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

    //Jaime Ortega
    public function deleteAsignaturaProfesorEspecifico($idAsignatura, $idProfesor)
    {
        $asignaturaProfesor = asignaturaProfesor::where('idAsignatura', $idAsignatura)->where('idProfesor', $idProfesor);
        if ($asignaturaProfesor->count() === 0) {
            return response()->json(['message' => 'Registro de asignatura-profesor no encontrado'], 404);
        }

        $asignaturaProfesor->delete();
        return response()->json(['message' => 'Registro de asignatura eliminado exitosamente']);
    }
}
