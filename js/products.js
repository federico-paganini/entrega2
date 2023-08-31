let URL_products = "https://japceibal.github.io/emercado-api/cats_products/";
let URL_categories = "https://japceibal.github.io/emercado-api/cats/cat.json";

async function get_categories_list() {
    const response = await fetch(URL_categories);

    if (response.ok) {
        let categorias = await response.json();
        return categorias;
    } else {
        console.log("Hubo un error");
        throw new Error("Error fetching categories");
    }
}

async function get_products_por_nombre(nombre_categoria) {
    const categorias = await get_categories_list();
    let id;
    categorias.forEach(categoria => {
        if (categoria.name === nombre_categoria) {
            id = categoria.id;
        }
    });
    if (id) {
        return await get_products_por_id(id);
    } else {
        console.log("Categoría no encontrada");
        throw new Error("Category not found");
    }
}

async function get_products_por_id(id) {
    let URL = URL_products + id + ".json";
    
    const response = await fetch(URL);
    if (response.ok) {
        let json = await response.json();
        return json.products;
    } else {
        console.log("Hubo un error");
        throw new Error("Error fetching products");
    }
}

async function mostrar_products() {
    try {
        allProducts = await get_products_por_id(101);
        displayProducts(allProducts);
    } catch (error) {
        console.error(error);
    }
}

function displayProducts(products) {
    const productsContainer = document.getElementById("products-container");

    productsContainer.innerHTML = '';  // agregue para que funcione la wea no borraba los datos anteriores al usar filtro. 

    products.forEach(product => {
        
        let productCard = document.createElement("div");
        productCard.classList.add("card", "col-3", );  //CAMBIE EL TIPO DE FORMATO DE PRESENTACION DE DATOS A COL POQUE QUEDA MEJOR A LA VISTA QUE LOS MB-4 QUE ESTABAN ANTES 

        let productImage = document.createElement("img");
        productImage.src = product.image;
        productImage.alt = product.name;
        productImage.className = "card-img-top";

        let cardBody = document.createElement("div");
        cardBody.classList.add("card-body");

        let productName = document.createElement("h5");
        productName.textContent = product.name;
        productName.classList.add("card-title");

        let productDescription = document.createElement("p");
        productDescription.textContent = product.description;
        productDescription.classList.add("card-text");

        let productcost = document.createElement("p");
        productcost.textContent = `Precio: $${product.cost}`;
        productcost.classList.add("card-text");

        let productQuantitySold = document.createElement("p");
        productQuantitySold.textContent = `Cantidad Vendida: ${product.soldCount}`;
        productQuantitySold.classList.add("card-text");

        cardBody.appendChild(productName);

        cardBody.appendChild(productDescription);

        cardBody.appendChild(productcost);

        cardBody.appendChild(productQuantitySold);

        productCard.appendChild(productImage);
        
        productCard.appendChild(cardBody);

        productsContainer.appendChild(productCard);
    });
}



document.getElementById("accionfiltrar").addEventListener("click", aplicarfiltrado);



function aplicarfiltrado() {
    const minprecio = parseFloat(document.getElementById("minimofiltro1").value);
    const maxprecio = parseFloat(document.getElementById("maximofiltro1").value);


    if (isNaN(minprecio) || isNaN(maxprecio) || minprecio < 0 || maxprecio < 0) {
        alert("Por favor, ingresa valores numéricos válidos.");
        return;
    }

    const productosFiltrados = allProducts.filter(producto => producto.cost >= minprecio && producto.cost <= maxprecio);
    displayProducts(productosFiltrados);
}
// quitar filtrado
document.getElementById("eliminarfiltro").addEventListener("click", QuitarFiltrado )

function QuitarFiltrado(){
    displayProducts(allProducts);
}
//odenar alfabeticamente     

document.getElementById("filtrarAZ").addEventListener("click", function(){
    allProducts.sort((a, b) => a.name.localeCompare(b.name));
    displayProducts(allProducts);
});

document.getElementById("filtrarZA").addEventListener("click", function(){
    allProducts.sort((a, b) => b.name.localeCompare(a.name));
    displayProducts(allProducts);
});

mostrar_products();

