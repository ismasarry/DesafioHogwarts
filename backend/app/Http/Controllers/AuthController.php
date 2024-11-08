<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Usuario;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class AuthController extends Controller
{
    
    public function login(Request $request)
    {
        if(Auth::attempt(['gmail' => $request->gmail, 'contrasena' => $request->contrasena])){
            $auth = Auth::user();
            //return $auth;
            $success['token'] =  $auth->createToken('LaravelSanctumAuth')->plainTextToken;
            $success['nombre'] =  $auth->nombre;

            return response()->json(["success"=>true,"data"=>$success, "message" => "Has iniciado sesion!"]);
        }
        else{
            return response()->json("Unauthorised",204);
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
