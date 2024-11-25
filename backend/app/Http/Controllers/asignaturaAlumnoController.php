<?php
//Raul Gutierrez
namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\asignatura;
use App\Models\asignaturaAlumno;
use App\Models\Usuario;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class asignaturaAlumnoController extends Controller
{
    //Jaime Ortega (modifica)
    public function getTodosAsignaturaAlumnos()
    {
        $asignaturaAlumnos = asignaturaAlumno::with('usuario')->get();

        return response()->json(['asignaturaAlumnos' => $asignaturaAlumnos]);
    }

    //ismael sarrion )
    //Jaime Ortega (modifica)
    public function getAsignaturaAlumnoPorId($id)
    {
        $asignaturaAlumnos = AsignaturaAlumno::where('idAsignatura', $id)->get();

        if ($asignaturaAlumnos->isEmpty()) {
            return response()->json(['message' => 'No se encontraron alumnos para la asignatura'], 404);
        }

        $alumnos = $asignaturaAlumnos->map(function ($asignaturaAlumno) {
            return Usuario::find($asignaturaAlumno->idAlumno);
        });

        $conteoAlumnos = $alumnos->count();

        return response()->json([
            'asignatura' => asignatura::find($id),
            'alumnos' => $alumnos,
            'conteoAlumnos' => $conteoAlumnos,
        ]);
    }

    //ismael sarrion (
    public function getAsignaturaAlumnoPorIdAlumno($idAlumno)
    {
        $asignaturaAlumno = asignaturaAlumno::where('idAlumno', $idAlumno)->get();

        return response()->json(['asignaturaAlumno' => $asignaturaAlumno]);
    }

    //Jaime Ortega (modifica)
    public function postAsignaturaAlumno(Request $request)
    {
        foreach ($request['idAlumno'] as $idAlumno) {
            $asignaturaAlumno = asignaturaAlumno::create([
                'idAsignatura' => $request['idAsignatura'],
                'idAlumno' => $idAlumno
            ]);
        }

        return response()->json(['asignaturaAlumno' => $asignaturaAlumno], Response::HTTP_CREATED);
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
