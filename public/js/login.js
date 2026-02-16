import { getUsuarios } from "../services/serviceUsuarios.js";
const correo = document.getElementById("correo");
const contrasena = document.getElementById("contrasena");
const btnInicio = document.getElementById("btnInicio")




btnInicio.addEventListener("click", async function () {
    try {
        let usuario = await getUsuarios();
        let usuarioLogeado = usuario.filter(inicio => correo.value === inicio.email && contrasena.value === inicio.password)

        if (usuarioLogeado.length == 1) {
            localStorage.setItem("usuarioLogueado", JSON.stringify(usuarioLogeado[0]));

            Swal.fire({
                title: "inicio exitoso",
                text: "credenciales correctas",
                icon: "success",
                confirmButtonText: "OK"
            }).then(() => {
                window.location.href = "perfil.html";
            })

        } else {
            Swal.fire({
                title: "Error",
                text: "Correo o contraseña incorrectos",
                icon: "error"
            });
        }

    } catch (error) {
        console.error("Error al obtener los usuarios", error);
    }
});