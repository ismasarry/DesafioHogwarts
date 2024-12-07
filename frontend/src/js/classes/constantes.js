
//Raul Gutierrez, Jaime Ortega, Ismael Sarrion
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
    usuRol: 'usuarioRoles/',

    casa: 'casa/',

    duelo : 'duelo/',
    turnoDuelo: 'turnoDuelo/',

    registro: 'register',
    log:'login/',
    logout: 'logout/',

    enviarGmail:'enviar/',

    hechizo: 'hechizos/',

    pociones:'pociones/',
    ingredientes:'ingredientes/',
    recetas:'recetas/',

    nombreRegex: /^[a-zA-ZÁÉÍÓÚáéíóúÑñ\s]{2,50}$/,
    gmailRegex: /^[a-zA-Z0-9._%+-]+@gmail\.com$/,
    contrasenaRegex: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/,

    asignatura: 'asignatura/',
    asignaturaAlumno: 'asignaturaAlumno/',
    asignaturaProfesor: 'asignaturaProfesor/',

    mapa: 'mapa/',
    segundo: 'segundo/',
    simulacion: 'simulacion/',
}