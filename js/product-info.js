// Show Comentarios
document.addEventListener("DOMContentLoaded", function(e) {

  var ProductID = localStorage.getItem("ValorID");
  console.log(ProductID);
  
  // URL del API de comentarios
  // const PRODUCT_INFO_COMMENTS_URL = "https://japceibal.github.io/emercado-api/products_comments/"; (ya está definido en init.js)
  
  // Función para obtener los comentarios
    const url = `${PRODUCT_INFO_COMMENTS_URL}${ProductID}.json`;
    fetch(url)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Error al cargar los comentarios (${response.status})`);
        }
        return response.json(); 
      })
      .then((data) => {
        console.log(data);
      })
      .catch((error) => {
        console.error("Error al obtener los comentarios:", error);
      });
});

