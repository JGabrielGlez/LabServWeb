const url = "http://localhost:3000/tareas";

function cargar() {
  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      const lista = document.getElementById("lista");
      lista.innerHTML = "";
      data.forEach((e) => {
        lista.innerHTML += `<li>${JSON.stringify(e, null, 4)}</li>`;
      });
    });
}

function crear() {
  // Estaré usando el post, que solo requiere del envío de todos los datos.
  const input = document.getElementById("titulo");
  const valorInput = input.value;
  fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer 123456`,
    },
    body: JSON.stringify(valorInput),
  })
    .then((res) => res.json())
    .then(() => {
      cargar();
    });
}
