import { getUsuarios } from "../services/serviceUsuarios.js";
const correoUsuario = document.getElementById("correoUsuario");
const contrasenaUsuario = document.getElementById("contrasenaUsuario");
const btnIniciarSesion = document.getElementById("btnIniciarSesion")
const btnCrearCuenta = document.getElementById("btnCrearCuenta")



btnIniciarSesion.addEventListener("click", async function () {
    try {
        if (correoUsuario.value.trim() === "" || contrasenaUsuario.value.trim() === "") {
            Swal.fire({
                title: "Error",
                text: "Todos los campos son obligatorios",
                icon: "error",
                confirmButtonText: "OK"
            });
        } else {
            let usuario = await getUsuarios();
            let usuarioNuevo = usuario.find(inicio => correoUsuario.value === inicio.correo)
            if (!usuarioNuevo) {
                Swal.fire({
                    title: "Error",
                    text: "Este correo no está registrado",
                    icon: "error",
                    confirmButtonText: "OK"
                });

            } else {

                let usuario = await getUsuarios();
                let usuarioLogeado = usuario.find(inicio => correoUsuario.value === inicio.correo && contrasenaUsuario.value === inicio.contrasena)

                if (usuarioLogeado) {
                     localStorage.setItem("usuarioLogueado", JSON.stringify(usuarioLogeado));
                    Swal.fire({
                        title: "inicio exitoso",
                        text: "credenciales correctas",
                        icon: "success",
                        confirmButtonText: "OK"
                    }).then(() => {
                        const rol = usuarioLogeado.rol;
                        if (rol === "Administrador") {
                            window.location.href = "administrador.html";
                        } else {
                            if (rol === "usuario") {
                                window.location.href = "index.html";
                            } else {
                                window.location.href = "index.html";
                            }
                        }
                    })

                } else {
                    Swal.fire({
                        title: "Error",
                        text: "Correo o contraseña incorrectos",
                        icon: "error"
                    });
                }
            }
        }
    } catch (error) {
        console.error("Error al obtener los usuarios", error);
    }
});

btnCrearCuenta.addEventListener("click", function () {
    window.location.href = "Registro.html"
})