import { getUsuarios } from "../services/serviceUsuarios.js";
const correoUsuario = document.getElementById("correoUsuario");
const contrasenaUsuario = document.getElementById("contrasenaUsuario");
const btnIniciarSesion = document.getElementById("btnIniciarSesion")
const btnCrearCuenta = document.getElementById("btnCrearCuenta")



btnIniciarSesion.addEventListener("click", async function () {
    try {
        let usuario = await getUsuarios();
        let usuarioLogeado = usuario.filter(inicio => correoUsuario.value === inicio.correo && contrasenaUsuario.value === inicio.contrasena)

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

btnCrearCuenta.addEventListener("click", function () {
    window.location.href = "Registro.html"
})