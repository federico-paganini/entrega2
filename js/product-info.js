// Show Comentarios
document.addEventListener("DOMContentLoaded", function(e) {

  var ProductID = localStorage.getItem("ValorID");
  
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

        //Funcion para mostrar los comentarios
        const container=document.getElementById("comments-container");

        function CreateDiv(container, info){ //Función con dos argumentos, para crear un nuevo elemento "div" con información. "Container" (variable con dicho nombre) es el destino donde se inserta el nuevo "div" y "info" son los datos de texto.
          let div=document.createElement("div"); //Variable para crear elemento "div"
          div.textContent=info; //Contenido de texto dentro del elemento "div"
          div.classList.add("subdiv");
          container.appendChild(div) //el nuevo "div" se agrega como hijo al div de la variable "container".
        }

        //Pasar el score a formato de estrellas
        function ScoreToEstrellas(score) {
          const maxStars=5;
          const fullStar='★'; 
          const emptyStar= '☆';
          const roundedScore = Math.round(score);
          const fullStars = fullStar.repeat(roundedScore);
          const emptyStars = emptyStar.repeat(maxStars - roundedScore);
          const starSpan= document.createElement("span");
          starSpan.classList.add("estrellas");
          starSpan.textContent= fullStars + emptyStars;
          return starSpan;
        }

      data.forEach(comment=>{
        const divGral=document.createElement("div");
        divGral.classList.add("divGral");
        
        CreateDiv(divGral, comment.dateTime); //Se crea un nuevo div para mostrar la fecha de la creación de los comentarios

        const stars = ScoreToEstrellas(comment.score);
        divGral.appendChild(stars); //Se crea un nuevo div para mostrar el "score" (estrellas)
        
        CreateDiv(divGral, `User:  ${comment.user}`); //Se crea un nuevo div para mostrar el nombre de los usuarios
        
        CreateDiv(divGral, `Descripción:  ${comment.description}`); //Se crea un nuevo div para mostrar el contenido del comentario
        container.appendChild(divGral);
      })

      
      })
      .catch((error) => {
        console.error("Error al obtener los comentarios:", error);
      });
});

