document.addEventListener("DOMContentLoaded", function(){
    if(!localStorage.getItem("isLoggedIn")){
        const usuario = document.getElementById("usuario");
        usuario.style.display = "none";
    }
    let email = localStorage.getItem("email");
    let li_nav = document.getElementById("usuario");
    li_nav.innerHTML=`<span class ="nav-link">${email}</span>`;

    //Aquí comienza el código para crear el menu desplegable del usuario
    let MenuDesplegable=document.createElement("ul");
    
    MenuDesplegable.innerHTML= ` 
    <li><a href="my-profile.html">Mi perfil</a></li>
    <li><a href="cart.html">Mi carrito</a></li>
    <li><a href="login.html">Cerrar sesión</a></li>
`; 

    let Usuario_li = document.getElementById("usuario");

    Usuario_li.addEventListener("click", ()=> {
        if(MenuDesplegable.style.display==='none' || MenuDesplegable.style.display===''){
            MenuDesplegable.style.display='block';
        } else {
            MenuDesplegable.style.display='none';
            }
    });
    Usuario_li.appendChild(MenuDesplegable);
});
    