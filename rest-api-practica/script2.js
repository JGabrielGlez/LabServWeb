const url = "http://localhost:3000/tareas";
const urlExamen = "http://localhost:3000/productos";

function cargar() {
  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      const lista = document.getElementById("lista");
      lista.innerHTML = "";
      data.forEach((e) => {
        lista.innerHTML += `<li>${JSON.stringify(e, null, 6)}</li>`;
      });
    });
}

function crear() {
  const input = document.getElementById("titulo");
  const valorInput = input.value;

  fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: "123456",
    },
    body: JSON.stringify({ titulo: valorInput }), // Objeto con propiedad titulo
  })
    .then((res) => res.json())
    .then(() => {
      cargar();
    });
}
function cargarProductos() {
  fetch(urlExamen)
    .then((res) => res.json())
    .then((data) => {
      const lista = document.getElementById("listaProd");
      lista.innerHTML = "";
      data.productos.forEach((p) => {
        lista.innerHTML += `<li>${JSON.stringify(p, null, 6)}</li>`;
      });
    })
    .catch((error) => console.error("Error:", error));
}
