<?php
//Jaime Ortega
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
        $rules = [
            'nombre' => 'required|string|max:50',
            'gmail' => 'required|email|max:255|unique:usuario',
            'contrasena' => 'required|min:8',
            'confirm_contrasena' => 'required|same:contrasena',
            'foto' => 'nullable|image|mimetypes:image/jpeg,image/png,image/jpg,image/gif,image/webp,image/svg+xml|max:2048',
        ];
        $messages = [
            'unique' => 'El :attribute ya está registrado.',
            'email' => 'Debe ser un correo electrónico válido.',
            'same' => 'Las contraseñas no coinciden.',
            'required' => 'El campo :attribute es obligatorio.',
            'image' => 'Debe ser una imagen válida.',
            'mimetypes' => 'Formato de archivo no permitido.',
            'max' => 'Excede el tamaño máximo permitido.',
        ];

        $validator = Validator::make($request->all(), $rules, $messages);

        if ($validator->fails()) {
            return response()->json($validator->errors(), 400);
        }

        try {
            $input = $request->all();
            $input['contrasena'] = bcrypt($input['contrasena']);
            $input['activo'] = 0;

            $user = Usuario::create($input);
            $user->remember_token = $user->createToken('LaravelSanctumAuth', ['alumno'])->plainTextToken;

            DB::table('usuario_rol')->insert([
                'idRol' => 4,
                'idUsuario' => $user->id,
            ]);

            if ($request->hasFile('foto') && $request->file('foto')->isValid()) {
                $fotoUrl = $request->file('foto')->storeOnCloudinary('desafioHogwarts')->getSecurePath();
                $user->foto = $fotoUrl;
                $user->save();
            }

            return response()->json([
                "success" => true,
                "data" => [
                    'token' => $user->remember_token,
                    'nombre' => $user->nombre,
                    'id' => $user->id,
                    'foto' => $user->foto ?? null,
                    'activo' => $user->activo,
                ],
                "message" => "Usuario registrado correctamente",
            ], 201);
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
            $usuarioRoles = DB::table('usuario_rol')
                ->where('idUsuario', $user->id)
                ->pluck('idRol')
                ->toArray();

            $abilities = [];

            foreach ($usuarioRoles as $rol) {
                switch ($rol) {
                    case 1:
                        $abilities[] = 'Dumbledore';
                        break;
                    case 2:
                        $abilities[] = 'admin';
                        break;
                    case 3:
                        $abilities[] = 'profesor';
                        break;
                    case 4:
                        $abilities[] = 'alumno';
                        break;
                    default:
                        break;
                }
            }

            $token = $user->createToken('access_token', $abilities)->plainTextToken;

            $success = [
                'token' => $token,
                'id' => $user->id,
                'nombre' => $user->nombre,
                'abilities' => $abilities
            ];

            return response()->json(["success" => true, "data" => $success, "message" => "¡Has iniciado sesión!"]);
        } else {
            return response()->json(["success" => false, "message" => "No autorizado"], 401);
        }
    }
}
