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
    `
    document.getElementById("infoLista").innerHTML += htmlContenido;
    

    htmlImagenes += `
        <div class="carousel-item active">
            <img src="${arrayImg[0]}" alt="productoImg" class="d-block w-100">
        </div>
    `
    //Mostrar las imagenes, con un for para recorrer el array
    for (let i=0; i < arrayImg.length; i++) {
        htmlImagenes += `
            <div class="carousel-item">
                <img src="${arrayImg[i]}" alt="productoImg" class="d-block w-100">
            </div>
    `
    }
    document.getElementById("infoImagenes").innerHTML += htmlImagenes;
}