<?php
namespace App\Http\Controllers;
//isamel sarrion

use App\Models\hechizos;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;
use App\Models\Usuario; 
use Illuminate\Support\Str;
use Exception;

class gmailController extends Controller
{
    public function enviar(Request $request)
    {
        try {
            $request->validate([
                'gmail' => 'required|email',
            ]);

            $usuario = Usuario::where('gmail', $request->gmail)->first(); 
            
            if (!$usuario) {
                return response()->json([
                    'enviado' => false,
                    'mensaje' => 'No se encontró un usuario con ese correo.',
                ], 404);
            }

            $nuevaContrasena = Str::random(12); 

            $usuario->contrasena = bcrypt($nuevaContrasena); 
            $usuario->save(); 

            $datos = [
                'nombreUsuario' => $usuario->nombre, 
                'gmail' => $request->gmail,
                'nuevaContrasena' => $nuevaContrasena, 
            ];

            Mail::send('formularioRecuperacion', $datos, function($message) use ($request) {
                $message->to($request->gmail)
                        ->subject('Recuperación de Contraseña');
                $message->from('welcometohogwartslittlemuggle@gmail.com', 'Recupera Tu Contraseña');
            });

            return response()->json([
                'enviado' => true,
                'mensaje' => 'Correo de recuperación enviado con éxito.',
            ], 200);
        } catch (Exception $e) {
            
            return response()->json([
                'enviado' => false,
                'mensaje' => 'Error en el servidor: ' . $e->getMessage(),
            ], 500);
        }
    }
}
