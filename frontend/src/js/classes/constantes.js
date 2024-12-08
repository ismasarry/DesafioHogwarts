
//Raul Gutierrez, Jaime Ortea, Ismael Sarrion
export const constantes ={
    tablaNivel : [
        { nivel: 1, minExp: 0, maxExp: 50 },
        { nivel: 2, minExp: 50, maxExp: 150 },
        { nivel: 3, minExp: 150, maxExp: 300 },
        { nivel: 4, minExp: 300, maxExp: 500 },
        { nivel: 5, minExp: 500, maxExp: Infinity }
    ],

    urlApi: 'http://127.0.0.1:8000/api/',
    usu: 'usuario/',
    casa: 'casa/',
    usuRol: 'usuarioRoles/',
    hechizo: 'hechizos/',
    duelo : 'duelo/',
    turnoDuelo: 'turnoDuelo/',
    registro: 'register',
    log:'login/',
    logout: 'logout/',

    enviarGmail:'enviar/',

    pociones:'pociones/',
    ingredientes:'ingredientes/',
    recetas:'recetas/',


    nombreRegex: /^[a-zA-ZÁÉÍÓÚáéíóúÑñ\s]{2,50}$/,
    gmailRegex: /^[\w.%+-]{2,}@[\w.-]{2,}\.\w{2,}$/,
    contrasenaRegex: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/,

    asignatura: 'asignatura/',
    asignaturaAlumno: 'asignaturaAlumno/',
    asignaturaProfesor: 'asignaturaProfesor/',
}
//Raul Gutierrez
export async function sumarPuntos(idUsuario, exp, expCasa) {
    const usuario = await getBuscarUsuario(idUsuario)
    const casa = await getBuscarCasa(usuario.Usuario.idCasa)
    const expSubido = usuario.Usuario.exp + exp
    const puntosSubidos = casa.casa.puntos + expCasa
    let nivelSubido = 0

    if (expSubido > 0 && expSubido <= 50) {
        nivelSubido = 1
    }else if (expSubido > 51 && expSubido <= 150) {
        nivelSubido = 2
    }else if (expSubido > 151 && expSubido <= 300) {
        nivelSubido = 3
    }else if (expSubido > 301 && expSubido <= 500) {
        nivelSubido = 4
    }else if (expSubido > 501) {
        nivelSubido = 5
    }

    const usu = {
        nombre : usuario.Usuario.nombre,
        gmail :  usuario.Usuario.gmail,
        idCasa : usuario.Usuario.idCasa,
        nivel : nivelSubido,
        exp : expSubido,
        foto : usuario.Usuario.foto,
        activo : usuario.Usuario.activo
    }

    const casaNueva = {
        nombre : casa.casa.nombre,
        puntos : puntosSubidos
    }

    await putUsuario (idUsuario, usu)
    await putCasa (casa.casa.id, casaNueva)
}