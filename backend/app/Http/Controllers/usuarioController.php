<?php
//Raul Gutierrez

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Usuario;
use CloudinaryLabs\CloudinaryLaravel\Facades\Cloudinary;
use Illuminate\Support\Facades\Validator;
use Symfony\Component\HttpFoundation\Response;
use Illuminate\Http\Request;

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
        // $validator = Validator::make($request->all(), [
        //     'nombre' => 'required|string|max:255',
        //     'gmail' => 'required|string|email|max:255|unique:users',
        //     'contrasena' => 'required|string|min:5',
        //     'idCasa' => 'required|integer',
        //     'nivel' => 'required|integer',
        //     'exp' => 'required|integer',
        //     'foto' => 'required|image|mimes:jpg,jpeg,png',
        //     'activo' => 'required|boolean'
        // ]);
        if ($request->hasFile('foto') && $request->file('foto')->isValid()) {
            $fotoUrl = $request->file('foto')->storeOnCloudinary('desafioHogwarts')->getSecurePath();
            $usuario = Usuario::create([
                'nombre' => $request['nombre'],
                'gmail' => $request['gmail'],
                'contrasena' => bcrypt($request['contrasena']),
                'idCasa' => $request['idCasa'],
                'nivel' => $request['nivel'],
                'exp' => $request['exp'],
                'foto' => $fotoUrl,
                'activo' => $request['activo']
            ]);
            return response()->json(['Usuario' => $usuario], Response::HTTP_CREATED);
        }
    }

    public function putUsuario(Request $request, $id){
        $usuario = Usuario::find($id);

        if (!$usuario) {
            return response()->json(['message' => 'Usuario no encontrado'], 404);
        }

        $datosUsuario = [
            'nombre' => $request['nombre'],
            'gmail' => $request['gmail'],
            'idCasa' => $request['idCasa'],
            'nivel' => $request['nivel'],
            'exp' => $request['exp'],
            'foto' => $request['foto'],
            'activo' => $request['activo']
        ];

        if ($request->filled('contrasena')) {
            $datosUsuario['contrasena'] = bcrypt($request['contrasena']);
        }

        $usuario->update($datosUsuario);

        return response()->json(['Usuario' => $usuario], Response::HTTP_CREATED);
    }

    public function deleteUsuario($id){
        $usuario = Usuario::find($id);

        $publicId = pathinfo($usuario->foto, PATHINFO_FILENAME);
        Cloudinary::destroy($publicId);

        $usuario->delete();

        return response()->json(['message' => 'Usuario eliminado exitosamente']);
    }
}
