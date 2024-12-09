<?php
//Jaime Ortega
namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class CheckRoleAndAbilities
{
    public function handle(Request $request, Closure $next, ...$rolesAndAbilities)
    {
        $user = Auth::user();

        if (!$user) {
            return response()->json(['error' => 'No autorizado'], 401);
        }

        // Verificar roles
        $roles = explode('|', $rolesAndAbilities[0]);
        foreach ($roles as $role) {
            if ($user->roles->contains('nombre', $role)) {
                return $next($request);
            }
        }

        // Verificar habilidades en el token
        if (count($rolesAndAbilities) > 1) {
            $abilities = explode('|', $rolesAndAbilities[1]);
            foreach ($abilities as $ability) {
                if (in_array($ability, $user->token()->abilities)) {  
                    return $next($request);
                }
            }
        }

        return response()->json(['error' => 'Acceso denegado.'], 403);  // Si no tiene el rol ni la habilidad
    }
}
