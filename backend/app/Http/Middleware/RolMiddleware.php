<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Symfony\Component\HttpFoundation\Response;

class RolMiddleware
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next, $roles)
    {
        if (!Auth::check()) {
            return response()->json(['message' => 'No autenticado'], 401);
        }

        $usuario = Auth::usuario();
        $rolesArray = explode('|', $roles);

        //probar mejor mañana que puede ser que en lugar del nombre sea el idRol
        if (!$usuario->roles()->where('nombre', $rolesArray)->exists()) {
            return response()->json(['error' => 'Acceso denegado: no tienes el rol adecuado'], 403);
        }

        return $next($request);
    }
}
