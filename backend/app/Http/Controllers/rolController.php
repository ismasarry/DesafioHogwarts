<?php
//Jaime Ortega
namespace App\Http\Controllers;

use App\Models\Rol;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class rolController extends Controller
{
    public function getAllRoles()
    {
        $roles = Rol::all();
        return response()->json(['roles' => $roles]);
    }
    public function getRol($id)
    {
        $rol = Rol::find($id);
        if (!$rol) {
            return response()->json(['message' => 'Rol no encontrado'], 404);
        } else {
            return response()->json(['rol' => $rol]);
        }
    }
    public function getUsuariosRol($id)
    {
        $rol = Rol::find($id);
        if (!$rol) {
            return response()->json(['message' => 'Rol no encontrado'], 404);
        } else {
            $usuarios = $rol->usuarios;
            return response()->json(['usuarios' => $usuarios]);
        }
    }
    public function createRol(Request $request)
    {
        $input = $request->all();
        $rules = [
            'nombre' => 'required|string|max:50'
        ];
        $msg = [
            'required' => 'El campo :attribute es obligatorio.',
        ];
        $validator = Validator::make($input, $rules, $msg);
        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        } else {
            $rol = Rol::create($input);
            return response()->json(['success' => true, 'data' => $rol, 'msg' => 'Rol creado'], 201);
        }
    }
    public function updateRol($id, Request $request)
    {
        $input = $request->all();
        $rol = Rol::find($id);
        if (!$rol) {
            return response()->json(['message' => 'Rol no encontrado'], 404);
        } else {
            $rol->nombre = $input['nombre'];
            $rol->save();
            return response()->json(['success' => true, 'data' => $rol, 'msg' => 'Rol actualizado'], 200);
        }
    }
    public function deleteRol($id)
    {
        $rol = Rol::find($id);
        if (!$rol) {
            return response()->json(['message' => 'Rol no encontrado'], 404);
        } else {
            $rol->delete();
            return response()->json(['success' => true,'msg' => 'Rol eliminado'], 200);
        }
    }
}
