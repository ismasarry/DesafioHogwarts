<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <title>Recuperar Contraseña</title>
    </head>
    <body>
        <h1>Recuperación de Contraseña</h1>
        <form action="{{ url('/api/envia') }}" method="POST">
            @csrf
            <label for="gmail">Introduce tu correo:</label>
            <input type="email" id="gmail" name="gmail" required>
            <button type="submit">Enviar</button>
        </form>
    </body>
</html>
