// Código base del servidor
const express = require('express');
const app = express();
const PORT = 3000;

// NOTA IMPORTANTE, saber qué tipo de valor es el que estamos usando, ya que como js no tiene tipado como ts, debo tener muy en cuenta el tipo de valor que estoy usando y el que estoy comparando, más que nada; por ejemplo, los ids son numeros y no los puedo comparar con un string ya que siempre me dará undefined. 


app.use(express.json());

//esta es la base de datos que estará en memoria
// Base de datos en memoria
let estudiantes = [
  {
    id: 1,
    nombre: 'Juan Pérez',
    matricula: 'EST001',
    carrera: 'Ingeniería en Software',
    semestre: 5,
    promedio: 8.5,
    materias_cursando: ['Servicios Web', 'Base de Datos', 'Redes'],
    activo: true
  },
  {
    id: 2,
    nombre: 'María González',
    matricula: 'EST002',
    carrera: 'Ingeniería en Sistemas',
    semestre: 6,
    promedio: 9.2,
    materias_cursando: ['Inteligencia Artificial', 'Cloud Computing'],
    activo: true
  },
  {
    id: 3,
    nombre: 'Carlos Ramírez',
    matricula: 'EST003',
    carrera: 'Ingeniería en Software',
    semestre: 4,
    promedio: 7.8,
    materias_cursando: ['Programación Web', 'Estructuras de Datos'],
    activo: true
  },
  {
    id: 4,
    nombre: 'Ana Martínez',
    matricula: 'EST004',
    carrera: 'Ingeniería Industrial',
    semestre: 3,
    promedio: 8.9,
    materias_cursando: ['Estadística', 'Procesos Industriales'],
    activo: false
  },
  {
    id: 5,
    nombre: 'Luis Torres',
    matricula: 'EST005',
    carrera: 'Ingeniería en Sistemas',
    semestre: 7,
    promedio: 9.5,
    materias_cursando: ['Seguridad Informática', 'Auditoría de Sistemas'],
    activo: true
  },
  {
    id: 6,
    nombre: 'Sofia Hernández',
    matricula: 'EST006',
    carrera: 'Ingeniería en Software',
    semestre: 5,
    promedio: 8.7,
    materias_cursando: ['Desarrollo Móvil', 'Servicios Web'],
    activo: true
  },
  {
    id: 7,
    nombre: 'Diego Morales',
    matricula: 'EST007',
    carrera: 'Ingeniería Mecánica',
    semestre: 2,
    promedio: 7.5,
    materias_cursando: ['Física', 'Cálculo Diferencial'],
    activo: true
  },
  {
    id: 8,
    nombre: 'Laura Jiménez',
    matricula: 'EST008',
    carrera: 'Ingeniería en Sistemas',
    semestre: 8,
    promedio: 9.0,
    materias_cursando: ['Proyecto Terminal', 'Ética Profesional'],
    activo: true
  },
  {
    id: 9,
    nombre: 'Roberto Sánchez',
    matricula: 'EST009',
    carrera: 'Ingeniería Industrial',
    semestre: 6,
    promedio: 8.3,
    materias_cursando: ['Control de Calidad', 'Logística'],
    activo: false
  },
  {
    id: 10,
    nombre: 'Patricia Ruiz',
    matricula: 'EST010',
    carrera: 'Ingeniería en Software',
    semestre: 4,
    promedio: 8.8,
    materias_cursando: ['Algoritmos', 'Servicios Web'],
    activo: true
  },
  {
    id: 11,
    nombre: 'Fernando López',
    matricula: 'EST011',
    carrera: 'Ingeniería Mecánica',
    semestre: 5,
    promedio: 7.9,
    materias_cursando: ['Termodinámica', 'Mecánica de Fluidos'],
    activo: true
  },
  {
    id: 12,
    nombre: 'Gabriela Castro',
    matricula: 'EST012',
    carrera: 'Ingeniería en Sistemas',
    semestre: 3,
    promedio: 9.1,
    materias_cursando: ['Programación Orientada a Objetos', 'Base de Datos'],
    activo: true
  },
  {
    id: 13,
    nombre: 'Miguel Flores',
    matricula: 'EST013',
    carrera: 'Ingeniería en Software',
    semestre: 7,
    promedio: 8.6,
    materias_cursando: ['DevOps', 'Arquitectura de Software'],
    activo: true
  },
  {
    id: 14,
    nombre: 'Carmen Vargas',
    matricula: 'EST014',
    carrera: 'Ingeniería Industrial',
    semestre: 4,
    promedio: 8.1,
    materias_cursando: ['Investigación de Operaciones', 'Ergonomía'],
    activo: true
  },
  {
    id: 15,
    nombre: 'Ricardo Mendoza',
    matricula: 'EST015',
    carrera: 'Ingeniería en Sistemas',
    semestre: 6,
    promedio: 8.4,
    materias_cursando: ['Machine Learning', 'Big Data'],
    activo: false
  }
];

//token de autenticación simulado
const API_TOKEN = '12345';

// Aquí irán los endpoints 


// Endpoint para filtrar los estudiantes por id, lanzar error 404 cuando no exista
app.get('/api/estudiantes/:id',(req,res)=>{
    // Debo capturar el id enviado como parametro
    // NOTA: no olvidar castear a su int
    const id = parseInt(req.params.id);
    // Ahora debo encontrar aquel estudiante que cumple con la condicion
    const estudiante = estudiantes.find(e=>e.id===id);    
    if(estudiante===undefined)  
        res.status(404).json({
            mensaje:'Estudiante no matriculado'
        }
    )
    res.status(200).json(estudiante);
})


/*
Modificar el endpoint GET de todos los estudiantes
Aceptar query strings: page y limit
Valores por defecto: page=1, limit=5
Devolver solo los estudiantes de esa página
Incluir información adicional: total, página actual, total de páginas
*/
app.get('/api/estudiantes', (req,res)=>{
    // Directamente devuelvo todo en esta parte
    //en esta parte ya se envía la respuesta, por lo que no es necesario hacer un return 
    const page = parseInt(req.query.page) || 1;
    const limit = parseFloat(req.query.limit) || 5;
    const carrera = req.query.carrera;
    let estudiantesPaginados=estudiantes;
    // Filtrar si se envía carrera
    if(carrera!==undefined){
        estudiantesPaginados=estudiantes.filter(e=>e.carrera===carrera)
    }

    // Calcular los índices
    const startIndex = (page-1)*limit
    const endIndex  = page * limit;

    // Extraer porción del array
    estudiantesPaginados = estudiantesPaginados.slice(startIndex,endIndex);

    //nota: por defecto se usa status 200
    res.json({
        pagina_actual : page,
        estudiantes_por_pagina : limit,
        total_estudiante : estudiantes.length,
        estudiantes : estudiantesPaginados
    });
});

// Ahora voy con los métodos POST

// Endpoint para agregar estudiante; el id se genera aumentando el último usado
app.post('/api/estudiantes',(req,res)=>{
    const body = req.body;
    // Obtener el ultimo elemento del arreglo
// ✅ Funciona en Node.js 10, 12, 14, 16, 18, 20+
const ultimoID = estudiantes.length > 0
    ? estudiantes[estudiantes.length - 1].id + 1
    : 1;
    

    const nuevoEstudiante = {
        id: ultimoID,
        nombre: body.nombre,
        matricula: body.matricula,
        carrera: body.carrera,
        semestre:body.semestre,
        promedio: body.promedio,
        materias_cursando:body.materias_cursando,
        estado: body.estado || 'activo'
    }


    estudiantes.push(nuevoEstudiante);
    res.status(201).json({
        mensaje: 'Estudiante agregado exitosamente',
        indice : ultimoID
    })
})

//iniciar el servidor

app.listen(PORT,()=>{
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
    
})