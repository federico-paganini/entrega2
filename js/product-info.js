const URL = PRODUCT_INFO_URL + localStorage.getItem("ValorID") + EXT_TYPE;

document.addEventListener(
    "DOMContentLoaded",
    () => {
        getJSONData(URL)
            .then(
                function (resultObj) {
                    console.log(resultObj);

                    if (resultObj.status === "ok") {
                        info = resultObj.data;
                        console.log(info);
                        showInfo(info);      
                    }
                }
            );
    }
);

//  Funcion para mostrar la info del producto
function showInfo(info) {
    let arrayImg = info.images;
    let htmlContenido = "";
    let htmlImagenes = "";

    htmlContenido += `
        <div class="row">
            <div class="d-flex justify-content-between mb-3 mt-3"> 
                <h1>${info.name}</h1> 
                    <button type="button" 
                        class="btn btn-outline-success btn-lg active" 
                        onClick="carrito()"
                        id="btnComprar">
                        <i class="bi bi-cart-fill"></i>
                        Agregar al carrito
                    </button>
            </div>
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
    `
    document.getElementById("infoLista").innerHTML += htmlContenido;


    htmlImagenes += `
        <div class="carousel-item active">
            <img src="${arrayImg[0]}" alt="productoImg" class="d-block w-100">
        </div>
    `
    //Mostrar las imagenes, con un for para recorrer el array
    for (let i = 1; i < arrayImg.length; i++) {
        htmlImagenes += `
            <div class="carousel-item">
                <img src="${arrayImg[i]}" alt="productoImg" class="d-block w-100">
            </div>
    `
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

            function CreateDiv(container, info) { //Función con dos argumentos, para crear un nuevo elemento "div" con información. "Container" (variable con dicho nombre) es el destino donde se inserta el nuevo "div" y "info" son los datos de texto.
                let div = document.createElement("div"); //Variable para crear elemento "div"
                div.textContent = info; //Contenido de texto dentro del elemento "div"
                div.classList.add("adedsubdiv");
                container.appendChild(div) //el nuevo "div" se agrega como hijo al div de la variable "container".
            }

            //Pasar el score a formato de estrellas
            function ScoreToEstrellas(score) {
                const maxStars = 5;
                const fullStar = '★';
                const emptyStar = '☆';
                const roundedScore = Math.round(score);
                const fullStars = fullStar.repeat(roundedScore);
                const emptyStars = emptyStar.repeat(maxStars - roundedScore);
                const starSpan = document.createElement("span");
                starSpan.classList.add("estrellas");
                starSpan.textContent = fullStars + emptyStars;
                return starSpan;
            }

            data.forEach(comment => {
                const divGral = document.createElement("div");
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
    })
});