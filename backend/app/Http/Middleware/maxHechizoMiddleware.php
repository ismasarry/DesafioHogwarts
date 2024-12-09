<?php
//Raul Gutierrez
namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class maxHechizoMiddleware
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        $nivel = $request->input('nivel');
        $maxNivel = 5;

        if ($nivel !== null && $nivel > $maxNivel) {
            return response()->json(
                ['message' => "El nivel del hechizo no puede exceder el máximo permitido ($maxNivel)."],
                Response::HTTP_BAD_REQUEST
            );
        }

        $estadisticas = $request->input('estadisticas');
        if ($estadisticas) {
            $esta = explode(',', $estadisticas);

            foreach ($esta as $stat) {
                if (!is_numeric($stat) || $stat < 0 || $stat > 100) {
                    return response()->json(
                        ['message' => "Las estadísticas del hechizo deben ser números entre 0 y 100. Estadísticas proporcionadas: $estadisticas"],
                        Response::HTTP_BAD_REQUEST
                    );
                }
            }
        }

        return $next($request);
    }
}
