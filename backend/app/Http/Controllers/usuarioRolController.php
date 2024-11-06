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
        $usuarioRoles = UsuarioRol::with(['rol', 'usuario'])->get();
        return response()->json(['usuarioRoles' => $usuarioRoles]);
    }

   
    public function getUsuarioRolPorId($id)
    {
        $usuarioRol = UsuarioRol::with(['rol', 'usuario'])->find($id);
        if (!$usuarioRol) {
            return response()->json(['message' => 'Registro de UsuarioRol no encontrado'], 404);
        }
        return response()->json(['usuarioRol' => $usuarioRol]);
    }

  
    public function postUsuarioRol(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'idRol' => 'required|exists:roles,id',
            'idUsuario' => 'required|exists:usuarios,id',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()->all()], Response::HTTP_UNPROCESSABLE_ENTITY);
        }

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

        $validator = Validator::make($request->all(), [
            'idRol' => 'required|exists:roles,id',
            'idUsuario' => 'required|exists:usuarios,id',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()->all()], Response::HTTP_UNPROCESSABLE_ENTITY);
        }

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
}
