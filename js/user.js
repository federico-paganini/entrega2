document.addEventListener("DOMContentLoaded", function(){
    if(!localStorage.getItem("isLoggedIn")){
        const usuario = document.getElementById("usuario");
        usuario.style.display = "none";
    }
    let email = localStorage.getItem("email");
    let li_nav = document.getElementById("usuario");
    li_nav.innerHTML=`<span class ="nav-link">${email}</span>`;

    //Aquí comienza el código para crear el menu desplegable del usuario
    let MenuUser=document.getElementById("MenuUser");
    console.log("Elemento MenuUser:", MenuUser);
    let Usuario_li = document.getElementById("usuario");
    

    Usuario_li.addEventListener("click", ()=>{
        if(MenuUser.style.display==='none' || MenuUser.style.display===''){
            MenuUser.style.display='block';
        } else {
            MenuUser.style.display='none';
            }

            MenuUser.innerHTML= ` 
            <ul>
            <li><a href="my-profile.html">Mi perfil</a></li>
            <li><a href="cart.html">Mi carrito</a></li>
            <li><a href="login.html">Cerrar sesión</a></li>
            </ul>
        `; 
    });
});
    