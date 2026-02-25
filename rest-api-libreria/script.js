const API_URL = "http://localhost:3000/reservaciones";

function cargar() {
  fetch(API_URL)
    .then((res) => res.json())
    .then((data) => {
      // Ubicarme en el DOM del body de la tabla
      const tabla = document.getElementById("tbody");
      data.forEach((e) => {
        let html = `
            <tr>
            <td>${e.id}</td>
            <td>${e.alumno}</td>
            <td>${e.libro}</td>
            <td>${e.fecha}</td>
            <td>${e.estado}</td>
            </tr>
            `;
        tabla.append(html);
      });
    });
}
