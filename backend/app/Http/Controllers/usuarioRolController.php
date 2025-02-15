<?php
//Ismael Sarrion
namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\UsuarioRol;
use App\Models\Rol;
use App\Models\Usuario;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Symfony\Component\HttpFoundation\Response;

class UsuarioRolController extends Controller
{

    public function getTodosUsuarioRoles()
    {
        $usuarioRoles = usuarioRol::all();
        return response()->json(['usuarioRoles' => $usuarioRoles]);
        //  return response()->json(['hola']);
    }

    //Jaime Ortega
    public function getUsuarioRolPorId($id)
    {
        $usuarioRoles = UsuarioRol::where('idUsuario', $id)->get();

        if ($usuarioRoles->isEmpty()) {
            return response()->json(['message' => 'No se encontraron roles para el usuario'], 404);
        }

        $roles = $usuarioRoles->map(function ($usuarioRol) {
            return Rol::find($usuarioRol->idRol);
        });
        $rolesId = $usuarioRoles->pluck('idRol');

        return response()->json([
            'usuario' => Usuario::find($id),
            'roles' => $roles,
            'rolesId' => $rolesId,
        ]);
    }

    //Jaime Ortega
    public function getTodosUsuarioRolPorIdRol($idRol)
    {
        $usuarioRoles = UsuarioRol::where('idRol', $idRol)->get();

        if ($usuarioRoles->isEmpty()) {
            return response()->json(['message' => 'No se encontraron usuarios con el rol especificado'], 404);
        }

        $usuarios = $usuarioRoles->map(function ($usuarioRol) {
            return Usuario::find($usuarioRol->idUsuario);
        });
        $usuariosId = $usuarioRoles->pluck('idUsuario');

        return response()->json([
            'rol' => Rol::find($idRol),
            'usuarios' => $usuarios,
            'usuariosId' => $usuariosId,
        ]);
    }

    public function postUsuarioRol(Request $request)
    {
        // $validator = Validator::make($request->all(), [
        //     'idRol' => 'required|exists:roles,id',
        //     'idUsuario' => 'required|exists:usuarios,id',
        // ]);

        // if ($validator->fails()) {
        //     return response()->json(['errors' => $validator->errors()->all()], Response::HTTP_UNPROCESSABLE_ENTITY);
        // }

        $usuarioRol = UsuarioRol::create([
            'idRol' => $request['idRol'],
            'idUsuario' => $request['idUsuario'],
        ]);

        return response()->json(['usuarioRol' => $usuarioRol], Response::HTTP_CREATED);
    }


    public function putUsuarioRol(Request $request, $id)
    {
        $usuarioRol = UsuarioRol::find($id);
        if (!$usuarioRol) {
            return response()->json(['message' => 'Registro de UsuarioRol no encontrado'], 404);
        }

        // $validator = Validator::make($request->all(), [
        //     'idRol' => 'required|exists:roles,id',
        //     'idUsuario' => 'required|exists:usuarios,id',
        // ]);

        // if ($validator->fails()) {
        //     return response()->json(['errors' => $validator->errors()->all()], Response::HTTP_UNPROCESSABLE_ENTITY);
        // }

        $usuarioRol->update([
            'idRol' => $request['idRol'],
            'idUsuario' => $request['idUsuario'],
        ]);

        return response()->json(['usuarioRol' => $usuarioRol], Response::HTTP_OK);
    }


    public function deleteUsuarioRol($id)
    {
        $usuarioRol = UsuarioRol::find($id);
        if (!$usuarioRol) {
            return response()->json(['message' => 'Registro de UsuarioRol no encontrado'], 404);
        }

        $usuarioRol->delete();
        return response()->json(['message' => 'Registro de UsuarioRol eliminado exitosamente']);
    }
//Raul Gutierrez
    public function deleteUsuarioRolPorIds($idUsuario, $idRol)
    {
        $usuarioRol = UsuarioRol::where('idUsuario', $idUsuario)
                                ->where('idRol', $idRol)
                                ->first();

        if ($usuarioRol) {
            $usuarioRol->delete();
            return response()->json(['message' => 'Registro eliminado correctamente'], 200);
        } else {
            return response()->json(['message' => 'Registro no encontrado'], 404);
        }
    }
}
