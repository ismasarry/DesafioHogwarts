<?php
namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;

class gmailController extends Controller
{
    public function enviar(Request $request)
    {
        $request->validate([
            'gmail' => 'required|email',
        ]);

        $datos = [
            'nombreUsuario' => 'Ismael',
            'gmail' => $request->gmail,
        ];

        $gmail = $request->gmail; 

        Mail::send('formularioRecuperacion', $datos, function($message) use ($gmail) {
            $message->to($gmail)->subject('Recuperación de Contraseña');
            $message->from('welcometohogwartslittlemuggle@gmail.com', 'Recupera Tu Contraseña');
        });

        return response()->json([
            'enviado' => true,
            'mensaje' => 'Correo de recuperación enviado con éxito.',
        ], 200);
    }
}
