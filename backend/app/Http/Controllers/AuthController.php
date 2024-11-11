<?php
//ismael sarrion

namespace App\Http\Controllers;
use App\Http\Controllers\Controller;
use App\Models\Usuario;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;

class AuthController extends Controller
{
    
    public function login(Request $request)
    {
        $request->validate([
            'gmail' => 'required|string|email',
            'contrasena' => 'required|string',
        ]);
    
        $user = Usuario::where('gmail', $request->gmail)->first();
    
        if ($user && Hash::check($request->contrasena, $user->contrasena)) {
            $usuarioRol = DB::table('usuario_rol')
                ->where('idUsuario', $user->id)
                ->first();
    
            $abilities = [];
    
            if ($usuarioRol) {
                switch ($usuarioRol->idRol) {
                    case 1:
                        $abilities = ['alumno'];
                        break;
                    case 2:
                        $abilities = ['profesor'];
                        break;
                    case 3:
                        $abilities = ['admin'];
                        break;
                    case 4:
                        $abilities = ['Dumbledore'];
                        break;
                    default:
                        $abilities = [];
                }
            }
    
            $token = $user->createToken('access_token', $abilities)->plainTextToken;
    
            $success = [
                'token' => $token,
                'id' => $user->id,
                'nombre' => $user->nombre
            ];
    
            return response()->json(["success" => true, "data" => $success, "message" => "¡Has iniciado sesión!"]);
        } else {
            return response()->json(["success" => false, "message" => "No autorizado"], 401);
        }
    }
    
    
    

    public function register(Request $request)
    {

	$us = Usuario::where('gmail',$request->gmail)->first();
        if(!empty($us->gmail)) {
            return response()->json(["success"=>false, "message" => "Usuario ya registrado anteriormente"]);
        }
        $input = $request->all();
        $input['contrasena'] = bcrypt($input['contrasena']);
        $user = Usuario::create($input);
        $success['token'] =  $user->createToken('LaravelSanctumAuth')->plainTextToken;
        $success['nombre'] =  $user->nombre;

        return response()->json(["success"=>true,"data"=>$success, "message" => "Usuario registrado correctamente!"]);
    }
    
     /**
     * Por defecto los tokens de Sanctum no expiran. Se puede modificar esto añadiendo una cantidad en minutos a la variable 'expiration' en el archivo de config/sanctum.php.
     */
     public function logout(Request $request)
    {
        if(Auth::attempt(['gmail' => $request->gmail, 'contrasena' => $request->contrasena])){
            $cantidad = Auth::user()->tokens()->delete();
            return response()->json(["success"=>true, "message" => "Tokens Revoked: ".$cantidad],200);
        }
        else {
            return response()->json("Unauthorised",204);
        }

    }


}
