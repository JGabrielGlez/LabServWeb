const url = "http://localhost:3000/tareas";

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
