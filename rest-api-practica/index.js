const express = require("express");
const app = express();
app.use(express.json());

app.listen(3000, () => {
  console.log("Servidor ejecutándose en puerto 3000");
});

let tareas = [
  {
    id: 1,
    titulo: "Estudiar REST 1",
    descripcion: "Revisar conceptos básicos",
    estado: "pendiente",
    fecha_de_inicio: "1/1/2026",
    fecha_de_fin: "12/2/2026",
    responsable: "Jesus",
  },
  {
    id: 2,
    titulo: "Estudiar REST 1",
    descripcion: "Revisar conceptos básicos",
    estado: "pendiente",
    fecha_de_inicio: "2/1/2026",
    fecha_de_fin: "13/2/2026",
    responsable: "Jesus",
  },
  {
    id: 3,
    titulo: "Estudiar REST 1",
    descripcion: "Revisar conceptos básicos",
    estado: "pendiente",
    fecha_de_inicio: "3/1/2026",
    fecha_de_fin: "14/2/2026",
    responsable: "Jesus",
  },
  {
    id: 4,
    titulo: "Estudiar REST 1",
    descripcion: "Revisar conceptos básicos",
    estado: "pendiente",
    fecha_de_inicio: "4/1/2026",
    fecha_de_fin: "15/2/2026",
    responsable: "Jesus",
  },
  {
    id: 5,
    titulo: "Estudiar REST 1",
    descripcion: "Revisar conceptos básicos",
    estado: "pendiente",
    fecha_de_inicio: "5/1/2026",
    fecha_de_fin: "16/2/2026",
    responsable: "Jesus",
  },
  {
    id: 6,
    titulo: "Estudiar REST 1",
    descripcion: "Revisar conceptos básicos",
    estado: "pendiente",
    fecha_de_inicio: "6/1/2026",
    fecha_de_fin: "17/2/2026",
    responsable: "Jesus",
  },
  {
    id: 7,
    titulo: "Estudiar REST 1",
    descripcion: "Revisar conceptos básicos",
    estado: "pendiente",
    fecha_de_inicio: "7/1/2026",
    fecha_de_fin: "18/2/2026",
    responsable: "Jesus",
  },
  {
    id: 8,
    titulo: "Estudiar REST 1",
    descripcion: "Revisar conceptos básicos",
    estado: "pendiente",
    fecha_de_inicio: "8/1/2026",
    fecha_de_fin: "19/2/2026",
    responsable: "Jesus",
  },
  {
    id: 9,
    titulo: "Estudiar REST 1",
    descripcion: "Revisar conceptos básicos",
    estado: "pendiente",
    fecha_de_inicio: "9/1/2026",
    fecha_de_fin: "20/2/2026",
    responsable: "Jesus",
  },
  {
    id: 10,
    titulo: "Estudiar REST 1",
    descripcion: "Revisar conceptos básicos",
    estado: "pendiente",
    fecha_de_inicio: "10/1/2026",
    fecha_de_fin: "21/2/2026",
    responsable: "Jesus",
  },
];

// Token de autenticación
const TOKEN = "123456";

// Crear middleware de autenticación

function auth(req, res, next) {
  const token = req.headers["authorization"];

  if (!token) {
    return res.status(401).json({
      mensaje: "Acceso denegado: token requerido",
    });
  }

  if (token !== TOKEN) {
    return res.status(403).json({
      mensaje: "Token inválido",
    });
  }
  next();
}

// Agregar endpoint de tareas (con filtro opcional)
app.get("/tareas", (req, res) => {
  const estado = req.query.estado;
  if (estado) {
    const tareasFiltradas = tareas.filter((t) => t.estado === estado);
    return res.json(tareasFiltradas);
  }
  res.status(200).json(tareas);
});

// Endpoint para obtener tareas según el id
app.get("/tareas/:id", (req, res) => {
  const id = parseInt(req.params.id);

  const tarea = tareas.find((t) => t.id === id);

  if (!tarea) {
    return res.status(404).json({
      mensaje: "Tarea no encontrada",
    });
  }

  res.json(tarea);
});

/* EXPLICACIÓN
req.params.id → ID recibido desde la URL
parseInt() → convierte el ID a número
find() → busca la tarea en la lista
404 → recurso no encontrado
*/

//implementación de post Tareas
app.post("/tareas", auth, (req, res) => {
  const nuevaTarea = {
    id: tareas.length + 1,
    titulo: req.body.titulo,
    descripcion: req.body.descripcion,
    estado: "pendiente",
    fecha_de_inicio: "10/1/2026",
    fecha_de_fin: "21/2/2026",
    responsable: "Jesus",
  };

  tareas.push(nuevaTarea);
  res.status(201).json(nuevaTarea);
});

// Práctica examen del 16 de febrero

// Parte 2

let productos = [
  {
    id: 1,
    nombre: "Cafe 1",
    precio: 1200,
    categoria: "electronicos",
    disponible: true,
  },
  {
    id: 2,
    nombre: "Teclado Mecanico",
    precio: 3500,
    categoria: "electronicos",
    disponible: false,
  },
  {
    id: 3,
    nombre: "Auriculares Pro",
    precio: 2800,
    categoria: "electronicos",
    disponible: true,
  },
  {
    id: 4,
    nombre: "Cama Mascota",
    precio: 900,
    categoria: "mascotas",
    disponible: true,
  },
  {
    id: 5,
    nombre: "Shampoo Brillo",
    precio: 450,
    categoria: "belleza",
    disponible: false,
  },
  {
    id: 6,
    nombre: "Cepillo Mascota",
    precio: 300,
    categoria: "mascotas",
    disponible: true,
  },
  {
    id: 7,
    nombre: "Crema Hidratante",
    precio: 650,
    categoria: "belleza",
    disponible: true,
  },
];

// Parte 3
// Crear el endpoint

// Este debe de buscar por id, si existe devolver el produ, sino, mandar el error 404 y mensaje en su json
// Comprobado, sí funciona para ambos casos
app.get("/productos/:id", (req, res) => {
  const id = parseInt(req.params.id);

  const productoBuscado = productos.find((e) => e.id === id);
  if (productoBuscado) {
    res.json({ productoEncontrado: productoBuscado });
  }

  res.status(404).json({
    mensaje: "Producto no existe",
  });
});

// Parte 5
// filtrar cuando cumpla con la categoría indicada
// ?categoria=valor
app.get("/productos", (req, res) => {
  const categoria = req.query.categoria;
  let productosBuscados = [];

  if (categoria) {
    productosBuscados = productos.filter((e) => e.categoria === categoria);
    if (productosBuscados.length === 0) {
      res.status(404).json({
        mensaje: "Categoría no existe o no hay productos dentro de esta",
      });
    }
    res.json({
      mensaje: "Productos encontrados",
      productos: productosBuscados,
    });
  }
  res.status(404).json({
    mensaje: "Categoria no existe",
  });
});

// Paso 5 de la práctica 4, crear endpoint put
app.put("/tareas/:id", auth, (req, res) => {
  const body = req.body;
  const id = parseInt(req.params.id);
  const tarea = tareas.find((t) => t.id === id);
  if (!tarea) return res.status(404).json({ mensaje: "Tarea no encontrada" });

  // Captura de los datos de la tarea a actualizar
  tarea.descripcion = body.descripcion;
  tarea.estado = body.estado;
  tarea.fecha_de_fin = body.fecha_de_fin;
  tarea.fecha_de_inicio = body.fecha_de_inicio;
  tarea.responsable = body.responsable;
  tarea.titulo = body.responsable;

  res.json({ mensaje: "Tarea atualizada", tarea });
});

// // Crear endpoint patch
// app.patch("/tareas/:id", auth, (req, res) => {
//   const id = parseInt(req.params.id);
//   const tarea = tareas.find((t) => t.id === id);

//   // Si no se encuentra la tarea significa que no existe, por lo que se envía el error que me diga que el elemento no fue eoncotrado
//   if (!tarea) res.status(404).json({ mensaje: "Tarea no encontrada" });

//   if (req.body.titulo !== undefined) tarea.titulo = req.body.titulo;

//   if (req.body.estado !== undefined) tarea.estado = req.body.estado;

//   res.json({
//     mensaje: "Tarea modificada parcialmente",
//     tarea,
//   });
// });

// Se creará el endpoint de patch genérico

app.patch("/tareas/:id", auth, (req, res) => {
  // el spread operator "esparce" las propiedades de un objeto dentro de otro
  const actualizaciones = { ...(req.body || {}) }; // si es undefined, se inicializa en vacío;
  delete actualizaciones["id"];

  const id = parseInt(req.params.id);
  const tarea = tareas.find((t) => t.id === id);
  if (!tarea)
    res.status(404).json({ mensaje: "La tarea a actualizar no existe" });

  // En este punto la tarea sí existe por lo que se procede a validar que se enviaron características a actualizar en el body

  if (Object.keys(actualizaciones).length === 0)
    res.status(400).json({ mensaje: "No se enviaron datos para actualizar." });
  // borrar el id del body en caso de que se haya enviado

  // En este punto significa que sí se enviaron objetos por lo que se procede a hacer la actualización dentro del servidor.
  const llavesObjeto = Object.keys(actualizaciones);

  if (llavesObjeto.length === 1 && llavesObjeto[0] === "id")
    res.status(400).json({ mensaje: "El id no se puede modificar" });

  // Si pasa, significa que hay más de un objeto, por lo que solo se debe de limpiar el body de la posible actualización del id

  // Por cada característica enviada dentro del body, cada una de estas se insertan dentro de su respectivo lugar
  llavesObjeto.forEach((llave) => {
    //Se ubica en la llave, para insertar el valor enviado en el body
    tarea[llave] = actualizaciones[llave];
  });
  res.json({ mensaje: "Elemento actualizado correctamente", tarea });
});

// Crar endpoint para delete
app.delete("/tareas/:id", auth, (req, res) => {
  // Captar los datos enviados
  const id = parseInt(req.params.id);
  const indice = tareas.findIndex((t) => t.id === id);

  if (indice < 0) res.status(404).json({ mensaje: "Tarea no existe" });

  // Si se encuentra, es necesario eliminar únicamente esa tarea del arreglo original
  tareas.splice(indice, 1);
  res.json({ mensaje: "Tarea eliminada exitosamente" });
});

// Preparar el servidor

const path = require("path");
app.use(express.json());
app.use(express.static(__dirname));
