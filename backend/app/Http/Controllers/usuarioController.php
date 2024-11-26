<?php
//Raul Gutierrez

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Usuario;
use Exception;
use Illuminate\Support\Facades\Validator;
use Symfony\Component\HttpFoundation\Response;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;

class UsuarioController extends Controller
{
    public function getTodosUsuarios(){
        $usuarios = Usuario::all();
        return response()->json(['Usuario' => $usuarios]);
    }

    public function getUsuarioPorId($id){
        $usuario = Usuario::find($id);

        if (!$usuario) {
            return response()->json(['message' => 'Usuario no encontrado'], 404);
        }

        return response()->json(['Usuario' => $usuario]);
    }

    /*public function getUsuarioPorCasa(){

    }*/

    public function postUsuario(Request $request){
        /*$validator = Validator::make($request->all(), [
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
        } else {*/
            $usuario = Usuario::create([
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

            return response()->json(['Usuario' => $usuario], Response::HTTP_CREATED);
        //}
    }

    public function putUsuario(Request $request, $id){
        $usuario = Usuario::find($id);

        if (!$usuario) {
            return response()->json(['message' => 'Usuario no encontrado'], 404);
        }

        $usuario->update([
            'nombre' => $request['nombre'],
            'gmail' => $request['gmail'],
            'contrasena' => bcrypt($request['contrasena']),
            'idCasa' => $request['idCasa'],
            'nivel' => $request['nivel'],
            'exp' => $request['exp'],
            'foto' => $request['foto'],
            'activo' => $request['activo'],
        ]);

        //correo modificación de contraseña

        try {
            if (!$usuario) {
                return response()->json([
                    'enviado' => false,
                    'mensaje' => 'No se encontró un usuario con ese correo.',
                ], 404);
            } 

            $datos = [
                'nombreUsuario' => $usuario->nombre, 
                'gmail' => $request->gmail
            ];

            Mail::send('notificacionCambioContrasena', $datos, function($message) use ($request) {
                $message->to($request->gmail)
                        ->subject('Cambio de contraseña');
                $message->from('welcometohogwartslittlemuggle@gmail.com', '¿Has realizado un cambio de contraseña?');
            });

            return response()->json([
                'enviado' => true,
                'mensaje' => 'Correo de contraseña enviado con éxito.',
            ], 200);
        } catch (Exception $e) {
            
            return response()->json([
                'enviado' => false,
                'mensaje' => 'Error en el servidor: ' . $e->getMessage(),
            ], 500);
        }

        return response()->json(['Usuario' => $usuario], Response::HTTP_CREATED);
    }

    public function deleteUsuario($id){
        $usuario = Usuario::find($id);
        $usuario->delete();

        return response()->json(['message' => 'Usuario eliminado exitosamente']);
    }
}
