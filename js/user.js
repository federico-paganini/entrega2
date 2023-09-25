document.addEventListener("DOMContentLoaded", function(){
    if(!localStorage.getItem("isLoggedIn")){
        const usuario = document.getElementById("usuario");
        usuario.style.display = "none";
    }
    let email = localStorage.getItem("email");
    let li_nav = document.getElementById("usuario");
    
    li_nav.innerHTML=`
    <div id="menu-toggle">
            <i class="bi bi-caret-left" id="menuAbrir"></i>
            <i class="bi bi-caret-down" id="menuCerrar"></i>
        </div>
    <span class ="nav-link">${email}</span>`;

    let menuAbrir = document.getElementById("menuAbrir");
    let menuCerrar = document.getElementById("menuCerrar");

    //Aquí comienza el código para crear el menu desplegable del usuario
    let MenuDesplegable=document.createElement("ul");
    
    MenuDesplegable.innerHTML= ` 
    <li><a href="my-profile.html"><i class="bi bi-person"></i> Mi perfil</a></li>
    <li><a href="cart.html"><i class="bi bi-cart"></i> Mi carrito</a></li>
    <li><a href="login.html"><i class="bi bi-door-closed"></i> Cerrar sesión</a></li>
    `;

    let Usuario_li = document.getElementById("usuario");

    Usuario_li.addEventListener("click", ()=> {
        if(MenuDesplegable.style.display==='none' || MenuDesplegable.style.display===''){
            MenuDesplegable.style.display='block';
            menuAbrir.style.display = 'none';
            menuCerrar.style.display = 'inline';
        } else {
            MenuDesplegable.style.display='none';
            menuAbrir.style.display = 'inline';
            menuCerrar.style.display = 'none';
            }
    });
    Usuario_li.appendChild(MenuDesplegable);
});
    