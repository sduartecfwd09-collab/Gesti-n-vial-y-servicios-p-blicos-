import { postUsuarios } from "../services/serviceUsuarios.js";
import { getUsuarios } from "../services/serviceUsuarios.js";

const nombre = document.getElementById("nombre");
const email = document.getElementById("email");
const password = document.getElementById("password");
const confirmar_password = document.getElementById("confirmar_password");
const edad = document.getElementById("edad");
const btnAgregar = document.getElementById("btnAgregar");


btnAgregar.addEventListener("click", async function () {

    if (nombre.value.trim() === "" || email.value.trim() === "" || password.value.trim() === "" || confirmar_password.value.trim() === "" || edad.value.trim() === "") {
        Swal.fire({
            title: "Error",
            text: "Todos los campos son obligatorios",
            icon: "error",
            confirmButtonText: "OK"
        });
    } else {
        if (!email.value.includes("@") || !email.value.includes(".com") || email.value.length <= 12) { /* no es lo más seguro, pero solicita algunos criterios para el correo  */
            Swal.fire({
                title: "Error",
                text: "Ingrese un correo válido que contenga '@', '.com' y tenga una longitud mayor a 12 caracteres",
                icon: "error",
                confirmButtonText: "OK"
            });
        } else {
            let usuario = await getUsuarios();
            console.log(usuario);
            
            let usuarioNuevo = usuario.find(inicio => email.value === inicio.email)
            console.log(usuarioNuevo);
            
            if (usuarioNuevo) {

                Swal.fire({
                    title: "Error",
                    text: "Este correo ya está registrado",
                    icon: "error",
                    confirmButtonText: "OK"
                });

            } else {
                if (password.value.length < 6) {
                    Swal.fire({
                        title: "Error",
                        text: "La contraseña debe tener al menos 6 caracteres",
                        icon: "error",
                        confirmButtonText: "OK"
                    });
                } else {
                    if (password.value === confirmar_password.value) {
                        const usuario = {
                            nombre: nombre.value.trim(),
                            email: email.value.trim(),
                            password: password.value.trim(),
                            edad: edad.value.trim()
                        };
                        let usuarioGuardado = await postUsuarios(usuario);
                        console.log(usuarioGuardado);

                        Swal.fire({
                            title: "Registro exitoso",
                            icon: "success",
                            confirmButtonText: "Continuar"
                        }).then(() => {
                            window.location.href = "perfil.html";
                        });;
                    } else {
                        Swal.fire({
                            title: "Error",
                            text: "Las contraseñas no coinciden",
                            icon: "error",
                            confirmButtonText: "OK"
                        });
                    }

                }
            }



        }
    }

});
