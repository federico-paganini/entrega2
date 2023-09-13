var valorRecuperado = localStorage.getItem("ValorID");
console.log(valorRecuperado);

// URL del API de comentarios
const API_COMMENTS_URL = "https://japceibal.github.io/emercado-api/products_comments/";

// Función para obtener los comentarios de un producto específico
function getComments(productId) {
  const url = `${API_COMMENTS_URL}${productId}.json`;

  // Realizar una solicitud GET a la URL del API de comentarios
  fetch(url)
    .then((response) => {
      if (!response.ok) {
        throw new Error(`Error al cargar los comentarios (${response.status})`);
      }
      return response.json(); // Parsear la respuesta JSON
    })
    .then((data) => {
      // Aquí puedes trabajar con los datos de los comentarios (data)
      console.log("Comentarios:", data);
    })
    .catch((error) => {
      console.error("Error al obtener los comentarios:", error);
    });
}

// Ejemplo de uso: obtener comentarios para un producto con ID 1
getComments(valorRecuperado);