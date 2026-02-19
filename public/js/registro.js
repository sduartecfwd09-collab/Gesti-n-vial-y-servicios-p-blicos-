import { postUsuarios } from "../services/serviceUsuarios.js";
import { getUsuarios } from "../services/serviceUsuarios.js";

const nombre = document.getElementById("nombre");
const correo = document.getElementById("correo");
const contrasena = document.getElementById("contrasena");
const confirmar_contrasena = document.getElementById("confirmar_contrasena");
const telefono = document.getElementById("telefono");
const cedula = document.getElementById("cedula");
const btnRegistrar = document.getElementById("btnRegistrar");

btnRegistrar.addEventListener("click", async function () {

    if (
        nombre.value.trim() === "" ||
        correo.value.trim() === "" ||
        contrasena.value.trim() === "" ||
        confirmar_contrasena.value.trim() === "" ||
        telefono.value.trim() === "" ||
        cedula.value.trim() === ""
    ) {
        Swal.fire({
            title: "Error",
            text: "Todos los campos son obligatorios",
            icon: "error",
            confirmButtonText: "OK"
        });
        return;
    }

    const dominiosPermitidos = [
        ".com", ".net", ".org", ".info",
        ".es", ".mx", ".co", ".eu",
        ".shop", ".tech", ".barcelona", ".app"
    ];

    const tieneDominioValido = dominiosPermitidos.some(dominio =>
        correo.value.endsWith(dominio)
    );

    if (
        !correo.value.includes("@") ||
        !tieneDominioValido ||
        correo.value.length <= 12
    ) {
        Swal.fire({
            title: "Error",
            text: "Ingrese un correo válido que contenga '@', un dominio permitido y tenga más de 12 caracteres",
            icon: "error",
            confirmButtonText: "OK"
        });
        return;
    }

    let usuarios = await getUsuarios();
    console.log(usuarios);

    let usuarioNuevo = usuarios.find(inicio => correo.value === inicio.correo);
    console.log(usuarioNuevo);

    if (usuarioNuevo) {
        Swal.fire({
            title: "Error",
            text: "Este correo ya está registrado",
            icon: "error",
            confirmButtonText: "OK"
        });
        return;
    }

    if (contrasena.value.length < 6) {
        Swal.fire({
            title: "Error",
            text: "La contraseña debe tener al menos 6 caracteres",
            icon: "error",
            confirmButtonText: "OK"
        });
        return;
    }

    let rolAsignado = usuarios.length === 0 ? "Administrador" : "usuario";

    if (contrasena.value === confirmar_contrasena.value) {
        const usuario = {
            nombre: nombre.value.trim(),
            correo: correo.value.trim(),
            contrasena: contrasena.value.trim(),
            telefono: telefono.value.trim(),
            cedula: cedula.value.trim(),
            rol: rolAsignado
        };

        await postUsuarios(usuario);

        Swal.fire({
            title: "Registro exitoso",
            icon: "success",
            confirmButtonText: "Continuar"
        }).then(() => {
            window.location.href = "login.html";
        });

    } else {
        Swal.fire({
            title: "Error",
            text: "Las contraseñas no coinciden",
            icon: "error",
            confirmButtonText: "OK"
        });
    }

});