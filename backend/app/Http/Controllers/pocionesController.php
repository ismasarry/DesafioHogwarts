<?php
// Ismael Sarrion

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Pociones;
use CloudinaryLabs\CloudinaryLaravel\Facades\Cloudinary;
use Symfony\Component\HttpFoundation\Response;
use Illuminate\Http\Request;

class PocionesController extends Controller
{
    public function getTodasPociones() {
        $pociones = Pociones::all();
        return response()->json(['pociones' => $pociones]);
    }

    public function getPocionPorId($id) {
        $pocion = Pociones::find($id);

        if (!$pocion) {
            return response()->json(['message' => 'Poción no encontrada'], 404);
        }

        return response()->json(['pocion' => $pocion]);
    }

    public function postPocion(Request $request) {
        if (!$request->hasFile('foto')) {
            return response()->json(['error' => 'No se recibió ningún archivo'], 400);
        }

        $file = $request->file('foto');

        $uploadedFile = Cloudinary::upload($file->getRealPath(), [
            'folder' => 'hogwarts/pociones',
        ]);

        $secureUrl = $uploadedFile->getSecurePath();

        $pocion = Pociones::create([
            'idUsuario' => $request['idUsuario'],
            'Nombre' => $request['Nombre'],
            'Descripcion' => $request['Descripcion'],
            'Estadisticas' => $request['Estadisticas'],
            'foto' => $secureUrl, 
            'veri' => $request['veri'],
        ]);

        return response()->json(['pocion' => $pocion], Response::HTTP_CREATED);
    }

    public function putPocion(Request $request, $id) {
        $pocion = Pociones::find($id);

        if (!$pocion) {
            return response()->json(['message' => 'Poción no encontrada'], 404);
        }

        if ($pocion->foto) {
            $publicId = pathinfo($pocion->foto, PATHINFO_FILENAME);
            Cloudinary::destroy($publicId);
        }

        $secureUrl = $pocion->foto; 
        if ($request->hasFile('foto')) {
            $file = $request->file('foto');

            $uploadedFile = Cloudinary::upload($file->getRealPath(), [
                'folder' => 'hogwarts/pociones',
            ]);

            $secureUrl = $uploadedFile->getSecurePath();
        }

        $pocion->update([
            'idUsuario' => $request['idUsuario'],
            'Nombre' => $request['Nombre'],
            'Descripcion' => $request['Descripcion'],
            'Estadisticas' => $request['Estadisticas'],
            'foto' => $secureUrl,
            'veri' => $request['veri'],
        ]);

        return response()->json(['pocion' => $pocion], Response::HTTP_OK);
    }

    public function deletePocion($id) {
        $pocion = Pociones::find($id);

        if (!$pocion) {
            return response()->json(['message' => 'Poción no encontrada'], 404);
        }

        if ($pocion->foto) {
            $publicId = pathinfo($pocion->foto, PATHINFO_FILENAME);
            Cloudinary::destroy($publicId);
        }

        $pocion->delete();

        return response()->json(['message' => 'Poción eliminada exitosamente']);
    }
}
