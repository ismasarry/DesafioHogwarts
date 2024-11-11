<?php


namespace App\Http\Controllers;

use App\Models\Usuario;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;

class AuthController extends Controller
{
    public function register(Request $request)
    {
        try {
            $input = $request->all();
            $rules = [
                'nombre' => 'required|string|max:50',
                'gmail' => 'required|email|max:255|unique:usuario',
                'contrasena' => 'required|min:8',
                'confirm_contrasena' => 'required|same:contrasena',
                'foto' => 'nullable|string'
            ];
            $messages = [
                'unique' => 'El :attribute ya está registrado en la base de datos.',
                'email' => 'El campo :attribute debe ser un correo electrónico válido.',
                'same' => 'El campo :attribute y :other deben coincidir.',
                'max' => 'El campo :attribute no debe exceder el tamaño máximo permitido.',
                'between' => 'El campo :attribute debe estar entre :min y :max años.',
                'integer' => 'El campo :attribute debe ser un número entero.',
                'required' => 'El campo :attribute es obligatorio.',
                'image' => 'El campo :attribute debe ser una imagen válida.',
                'mimes' => 'El campo :attribute debe ser un archivo de tipo: :values.'
            ];

            $validator = Validator::make($request->all(), $rules, $messages);

            if($validator->fails()){
                return response()->json($validator->errors(),400);
            }
            $input = $request->all();
            $input['contrasena'] = bcrypt($input['contrasena']);
            $user = Usuario::create($input);
            $user->remember_token = $user->createToken('LaravelSanctumAuth', ['alumno'])->plainTextToken;
            $user->save();

            DB::table('usuario_rol')->insert([
                'idRol' => 4,
                'idUsuario' => $user->id,
            ]);

            $success = [
                'token' => $user->remember_token,
                'nombre' => $user->nombre,
                'id' => $user->id
            ];

            // if ($request->hasFile('foto')) {
            //     $filePath = $request->file('foto')->store('fotos', 'public');
            //     $input['foto'] = $filePath;
            // }

            return response()->json(["success"=>true,"data"=>$success, "message" => "Usuario registrado correctamente"],201);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Error en el registro: ' . $e->getMessage()], 500);
        }
    }

    public function logout(Request $request)
    {
        $request->validate([
            'gmail' => 'required|email',
            'contrasena' => 'required|string',
        ]);

        try {
            if (Auth::attempt(['gmail' => $request->gmail, 'contrasena' => $request->contrasena])) {
                $user = Auth::user();
                $cantidad = $user->tokens()->delete();

                return response()->json(["success" => true, "message" => "Tokens quitados: " . $cantidad], 200);
            } else {
                return response()->json(["error" => "No autorizado"], 401);
            }
        } catch (\Exception $e) {
            return response()->json(['error' => 'Error en el logout: ' . $e->getMessage()], 500);
        }
    }

//ismael sarrion


    
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
                        $abilities = ['Dumbledore'];
                        break;
                    case 2:
                        $abilities = ['admin'];
                        break;
                    case 3:
                        $abilities = ['profesor'];
                        break;
                    case 4:
                        $abilities = ['alumno'];
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
    
}
