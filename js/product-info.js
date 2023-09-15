const URL = PRODUCT_INFO_URL + localStorage.getItem("ValorID") + EXT_TYPE;

document.addEventListener("DOMContentLoaded", () => {
  getJSONData(URL).then(function (resultObj) {
    console.log(resultObj);

    if (resultObj.status === "ok") {
      info = resultObj.data;
      console.log(info);
      showInfo(info);
    }
  });
});

//  Funcion para mostrar la info del producto
function showInfo(info) {
  let arrayImg = info.images;
  let htmlContenido = "";
  let htmlImagenes = "";

  htmlContenido += `
        <div class="form float-end">
                <button type="button" 
                        class="btn btn-outline-success btn-lg active" 
                        onClick="carrito()"
                        id="btnComprar">
                        <i class="bi bi-cart-fill"></i>
                    Agregar al carrito
                </button>
            </div>
        <div class="row">
            <h1>${info.name}</h1> 
            <hr>
            <p class="mb-1 fw-bold">Precio</p>
            <p>${info.currency} ${info.cost}</p><br>
            <p class="mb-1 fw-bold">Descripción</p>
            <p>${info.description}</p><br>
            <p class="mb-1 fw-bold">Categoria</p>
            <p>${info.category}</p><br>
            <p class="mb-1 fw-bold">Cantidad de vendidos</p>
            <p>${info.soldCount}</p><br>
            <p class="mb-3 fw-bold">Imágenes Ilustrativas</p><br>
        </div>
    `;
  document.getElementById("infoLista").innerHTML += htmlContenido;

  htmlImagenes += `
        <div class="carousel-item active">
            <img src="${arrayImg[0]}" alt="productoImg" class="d-block w-100">
        </div>
    `;
  //Mostrar las imagenes, con un for para recorrer el array
  for (let i = 0; i < arrayImg.length; i++) {
    htmlImagenes += `
            <div class="carousel-item">
                <img src="${arrayImg[i]}" alt="productoImg" class="d-block w-100">
            </div>
    `;
  }
  document.getElementById("infoImagenes").innerHTML += htmlImagenes;
}

// Show Comentarios
document.addEventListener("DOMContentLoaded", function (e) {
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
      const container = document.getElementById("comments-container");

      //Pasar el score a formato de estrellas

      data.forEach((comment) => {
        const divGral = document.createElement("div");
        divGral.classList.add("divGral");

        CreateDiv(divGral, comment.dateTime); //Se crea un nuevo div para mostrar la fecha de la creación de los comentarios

        const stars = ScoreToEstrellas(comment.score);
        divGral.appendChild(stars); //Se crea un nuevo div para mostrar el "score" (estrellas)

        CreateDiv(divGral, `User:  ${comment.user}`); //Se crea un nuevo div para mostrar el nombre de los usuarios

        CreateDiv(divGral, `Descripción:  ${comment.description}`); //Se crea un nuevo div para mostrar el contenido del comentario
        container.appendChild(divGral);
      });
    })
    .catch((error) => {
      console.error("Error al obtener los comentarios:", error);
    });
});

/* Selector de Estrellas */
const estrellas = document.querySelectorAll(".stars-label");

estrellas.forEach(function (estrella, index) {
  estrella.addEventListener("click", function () {
    for (let i = 0; i <= index; i++) {
      estrellas[i].classList.add("checked");
    }
    for (let i = index + 1; i < estrellas.length; i++) {
      estrellas[i].classList.remove("checked");
    }
  });
});

function CreateDiv(container, info) {
  //Función con dos argumentos, para crear un nuevo elemento "div" con información. "Container" (variable con dicho nombre) es el destino donde se inserta el nuevo "div" y "info" son los datos de texto.
  let div = document.createElement("div"); //Variable para crear elemento "div"
  div.textContent = info; //Contenido de texto dentro del elemento "div"
  div.classList.add("subdiv");
  container.appendChild(div); //el nuevo "div" se agrega como hijo al div de la variable "container".
}

function ScoreToEstrellas(score) {
  const maxStars = 5;
  const fullStar = "★";
  const emptyStar = "☆";
  const roundedScore = Math.round(score);
  const fullStars = fullStar.repeat(roundedScore);
  const emptyStars = emptyStar.repeat(maxStars - roundedScore);
  const starSpan = document.createElement("span");
  starSpan.classList.add("estrellas");
  starSpan.textContent = fullStars + emptyStars;
  return starSpan;
}

document.addEventListener("DOMContentLoaded", () => {
  let boton = document.getElementById("submit");

  boton.addEventListener("click", (e) => {
    e.preventDefault();
    let comentario = document.getElementById("comentarioTexto");

    const container = document.getElementById("comments-container");

    const divGral = document.createElement("div");
    divGral.classList.add("divGral");

    const fecha = new Date();
    let dia = fecha.getDay();
    if (dia <= 9) dia = "0" + dia;
    let mes = fecha.getDay();
    if (mes <= 9) mes = "0" + mes;
    CreateDiv(
      divGral,
      `${
        fecha.getFullYear() +
        "-" +
        mes +
        "-" +
        dia +
        " " +
        fecha.getHours() +
        ":" +
        fecha.getMinutes() +
        ":" +
        fecha.getSeconds()
      }`
    );

    let puntaje = 0;
    estrellas.forEach((estrella) => {
      if (estrella.classList.contains("checked")) {
        puntaje++;
        estrella.classList.remove("checked");
      }
    });

    const stars = ScoreToEstrellas(puntaje);
    divGral.appendChild(stars); //Se crea un nuevo div para mostrar el "score" (estrellas)

    const user = localStorage.getItem("email");
    CreateDiv(divGral, `User:  ${user}`); //Se crea un nuevo div para mostrar el nombre de los usuarios
    const desc = comentario.value;
    CreateDiv(divGral, `Descripción:  ${desc}`); //Se crea un nuevo div para mostrar el contenido del comentario
    container.appendChild(divGral);
    comentario.value = "";
  });
});
