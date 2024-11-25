<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Recuperación de Contraseña</title>
</head>
<body>
    <h2>Hola {{ $nombreUsuario }},</h2>
    <p>Recibimos una solicitud para recuperar tu contraseña. Hemos generado una nueva contraseña para ti:</p>
    
    <h3>Tu nueva contraseña es: <strong>{{ $nuevaContrasena }}</strong></h3>
    
    <p>Por favor, utilízala para iniciar sesión en tu cuenta.</p>
    <p>Si solicitaste este cambio de contraseña y quieres volver a cambiarla puedes hacerlo desde tu perfil</p>
    <p>Si no solicitaste este cambio de contraseña, por favor ignora vuelve a cambiarla desde tu perfil.</p>

    <p>Atentamente,<br>El equipo de Hogwarts</p>
</body>
</html>
