<?php
// Ismael Sarrion

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Ingredientes;
use CloudinaryLabs\CloudinaryLaravel\Facades\Cloudinary;
use Symfony\Component\HttpFoundation\Response;
use Illuminate\Http\Request;

class IngredientesController extends Controller
{
    public function getTodosIngredientes() {
        $ingredientes = Ingredientes::all();
        return response()->json(['ingredientes' => $ingredientes]);
    }

    public function getIngredientePorId($id) {
        $ingrediente = Ingredientes::find($id);

        if (!$ingrediente) {
            return response()->json(['message' => 'Ingrediente no encontrado'], 404);
        }

        return response()->json(['ingrediente' => $ingrediente]);
    }

    public function postIngrediente(Request $request) {
        if (!$request->hasFile('foto')) {
            return response()->json(['error' => 'No se recibió ningún archivo'], 400);
        }

        $file = $request->file('foto');

        $uploadedFile = Cloudinary::upload($file->getRealPath(), [
            'folder' => 'hogwarts/ingredientes',
        ]);

        $secureUrl = $uploadedFile->getSecurePath();

        $ingrediente = Ingredientes::create([
            'Nombre' => $request['Nombre'],
            'Estadisticas' => $request['Estadisticas'],
            'foto' => $secureUrl, 
        ]);

        return response()->json(['ingrediente' => $ingrediente], Response::HTTP_CREATED);
    }

    public function putIngrediente(Request $request, $id) {
        $ingrediente = Ingredientes::find($id);

        if (!$ingrediente) {
            return response()->json(['message' => 'Ingrediente no encontrado'], 404);
        }

        if ($ingrediente->foto) {
            $publicId = pathinfo($ingrediente->foto, PATHINFO_FILENAME);
            Cloudinary::destroy($publicId);
        }

        $secureUrl = $ingrediente->foto; 
        if ($request->hasFile('foto')) {
            $file = $request->file('foto');

            $uploadedFile = Cloudinary::upload($file->getRealPath(), [
                'folder' => 'hogwarts/ingredientes',
            ]);

            $secureUrl = $uploadedFile->getSecurePath();
        }

        $ingrediente->update([
            'Nombre' => $request['Nombre'],
            'Estadisticas' => $request['Estadisticas'],
            'foto' => $secureUrl,
        ]);

        return response()->json(['ingrediente' => $ingrediente], Response::HTTP_OK);
    }

    public function deleteIngrediente($id) {
        $ingrediente = Ingredientes::find($id);

        if (!$ingrediente) {
            return response()->json(['message' => 'Ingrediente no encontrado'], 404);
        }

        if ($ingrediente->foto) {
            $publicId = pathinfo($ingrediente->foto, PATHINFO_FILENAME);
            Cloudinary::destroy($publicId);
        }

        $ingrediente->delete();

        return response()->json(['message' => 'Ingrediente eliminado exitosamente']);
    }
}
