const express = require("express");
const app = express();
app.use(express.json());

app.listen(3000, () => {
  console.log("Servidor ejecutándose en puerto 3000");
});

let reservaciones = [
  {
    id: 1,
    alumno: "Maria Torres",
    libro: "Programacion Web",
    fecha: "2026-03-01",
    estado: "activa",
  },
  {
    id: 2,
    alumno: "Carlos Ruiz",
    libro: "Bases de Datos",
    fecha: "2026-03-02",
    estado: "entregada",
  },
  {
    id: 3,
    alumno: "Ana Lopez",
    libro: "Redes de Computadoras",
    fecha: "2026-03-03",
    estado: "activa",
  },
];

const TOKEN = "123456";

function auth(req, res, next) {
  const token = req.headers["authorization"];

  if (!token) {
    return res.status(401).json({
      mensaje: "Acceso denegado",
    });
  }

  // Si hay, significa que está correcto o no
  if (token !== TOKEN) {
    return res.status(403).json({ mensaje: "Token inválido" });
  }
  // Si pasa, seguimos con todas las demás
  next();
}

// Endpoint get para obtener todas las reservaciones en memoria
app.get("/reservaciones", (req, res) => {
  if (reservaciones.length === 0) {
    return res.status(404).json({ mensaje: "No hay reservaciones existentes" });
  }
  return res.json(reservaciones);
});

// Crear registro con el método post
app.post("/reservaciones/", auth, (req, res) => {
  // Checar que se haya enviado tanto id como que exista, el id se manejará como entero
  const body = req.body;
  const ultimoId =
    reservaciones.length > 0 ? reservaciones[reservaciones.length - 1].id : 0;

  if (Object.keys(body).length === 0)
    return res.status(400).json({ mensaje: "No se enviaron datos" });

  //   Si pasa, significa que mandó algo
  const nuevaReserva = {
    id: ultimoId + 1,
    alumno: body.alumno,
    libro: body.libro,
    fecha: body.fecha,
    estado: body.estado,
  };

  //   Ya lo mandé al arreglo en memoria, solo falta mandar el aviso
  reservaciones.push(nuevaReserva);

  res.json({
    mensaje: "Reserva hecha correctamente",
    nuevaReserva,
  });
  /*  
    id: 3,
    alumno: "Ana Lopez",
    libro: "Redes de Computadoras",
    fecha: "2026-03-03",
    estado: "activa",
    */
});

// Modificar un registro entero mediante su id
app.put("/reservaciones/:id", auth, (req, res) => {
  // obtener el id
  const id = parseInt(req.params.id);
  // Checar si existe esa reservacion
  const reserva = reservaciones.find((e) => e.id === id);
  if (!reserva) {
    return res.status(404).json({ mensaje: "La reservación no existe" });
  }
  //   Como sí existe a partir de este punto, ahora debo capturar el body
  const body = req.body;
  //   Verificar que el body tenga algo
  if (Object.keys(body).length === 0) {
    return res
      .status(400)
      .json({ mensaje: "No se enviaron datos para actualizar " });
  }

  //   Actualizar cada campo de la reserva
  reserva.alumno = body.alumno || "";
  reserva.estado = body.estado || "";
  reserva.fecha = body.fecha || "";
  reserva.libro = body.libro || "";

  //   Ya se actualizaron los cambios, por lo que ahora solo informo que se realizó con éxito
  return res.json({ mensaje: "Actualización exitosa", reserva });
  // Obtener el body de lo que se quiere cambiar
});

// Ahora para eliminar un registro

app.delete("/reservaciones/:id", auth, (req, res) => {
  // Checar que el objeto existe

  const id = parseInt(req.params.id);
  const reserva = reservaciones.find((e) => e.id === id);

  if (!reserva) {
    return res
      .status(404)
      .json({ mensaje: "El elemento a eliminar no existe" });
  }
  //   Como sí existe, ahora se procede a eliminarlo del arrelgo original
  const indiceBuscado = reservaciones.findIndex((e) => e.id === id);
  reservaciones.splice(indiceBuscado, 1);

  return res.json({ mensaje: "Elemento borrado existosamente" });
});
