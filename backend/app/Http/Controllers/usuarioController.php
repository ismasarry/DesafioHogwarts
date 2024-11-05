<?php
//Raul Gutierrez

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\usuario;
use Illuminate\Support\Facades\Validator;
use Symfony\Component\HttpFoundation\Response;
use Illuminate\Http\Request;

class usuarioController extends Controller
{
    public function getTodosUsuarios(){
        $usuarios = usuario::all();
        return response()->json(['usuario' => $usuarios]);
    }

    public function getUsuarioPorId($id){
        $usuario = usuario::find($id);

        if (!$usuario) {
            return response()->json(['message' => 'Usuario no encontrado'], 404);
        }

        return response()->json(['usuario' => $usuario]);
    }

    public function getUsuarioPorCasa(){
        
    }

    public function postUsuario(Request $request){
        $validator = Validator::make($request->all(), [
            'nombre' => 'required|string|max:255',
            'gmail' => 'required|string|email|max:255|unique:users',
            'contrasena' => 'required|string|min:5',
            'idCasa' => 'required|integer',
            'nivel' => 'required|integer',
            'exp' => 'required|integer',
            'foto' => 'required|string',
            'activo' => 'required|boolean'
        ]);

        if ($validator->fails()) {
            return response(['errors' => $validator->errors()->all()], Response::HTTP_UNPROCESSABLE_ENTITY);
        } else {
            $usuario = usuario::create([
                'nombre' => $request['nombre'],
                'gmail' => $request['gmail'],
                'contrasena' => bcrypt($request['contrasena']),
                'idCasa' => $request['idCasa'],
                'nivel' => $request['nivel'],
                'exp' => $request['exp'],
                'foto' => $request['foto'],
                'activo' => $request['activo'],
            ]);

            //falta añadirle el rol

            return response()->json(['usuario' => $usuario], Response::HTTP_CREATED);
        }
    }

    public function putUsuario(Request $request, $id){
        $usuario = usuario::find($id);

        if (!$usuario) {
            return response()->json(['message' => 'Usuario no encontrado'], 404);
        }

        $usuario = usuario::create([
            'nombre' => $request['nombre'],
            'gmail' => $request['gmail'],
            'contrasena' => bcrypt($request['contrasena']),
            'idCasa' => $request['idCasa'],
            'nivel' => $request['nivel'],
            'exp' => $request['exp'],
            'foto' => $request['foto'],
            'activo' => $request['activo'],
        ]);

        return response()->json(['usuario' => $usuario], Response::HTTP_CREATED);
    }

    public function deleteUsuario($id){
        $usuario = usuario::find($id);
        $usuario->delete();

        return response()->json(['message' => 'Usuario eliminado exitosamente']);
    }
}
