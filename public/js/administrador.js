let btnCerrarSeccion = document.querySelector(".btnCerrarSeccion")

const usuarioActivo = JSON.parse(localStorage.getItem("usuarioLogueado"))

const navCerrar = document.getElementById("navCerrar"); /* nav dinamicos para varias condiciones, es lo mismo que hice en edit en la otro archivo al usar span */
const navRol = document.getElementById("navRol");


/* Parte del codigo dedicado a las nva dinamicas */
if (usuarioActivo) {

    const link = document.createElement("a");

    if (usuarioActivo.rol === "usuario") {
        link.textContent = "Panel Usuario";
        link.href = "../pages/usuario.html";
    } else {
        if (usuarioActivo.rol === "admin") {
            link.textContent = "Administrador";
            link.href = "../pages/administrador.html";
        }
    }

    navRol.appendChild(link);
}

/* Parte del codigo dedicado a las nva dinamicas */
if (usuarioActivo) {

    const link = document.createElement("a");

    if (usuarioActivo.rol === "usuario") {
        link.textContent = "Panel Usuario";
        link.href = "../pages/usuario.html";
    } else {
        if (usuarioActivo.rol === "Administrador") {
            link.textContent = "Administrador";
            link.href = "../pages/administrador.html";
        }
    }

    navRol.appendChild(link);
}

/* a cerrar seccion, ysando un boton que elimine el local storage */
if (usuarioActivo) {

    const btnCerrar = document.createElement("button");
    btnCerrar.textContent = "Cerrar sesión";
    btnCerrar.addEventListener("click", function () {
        localStorage.removeItem("usuarioLogueado");
        window.location.href = "index.html"
    })
    navCerrar.appendChild(btnCerrar);
}