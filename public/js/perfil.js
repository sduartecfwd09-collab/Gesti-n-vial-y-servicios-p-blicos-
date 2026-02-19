import {deleteUsuarios} from "../services/serviceUsuarios.js";
import {updatePatchUsuarios} from "../services/serviceUsuarios.js";
import { getUsuarios } from "../services/serviceUsuarios.js";

const usuarioActivo = JSON.parse(localStorage.getItem("usuarioLogueado"))
const navCerrar = document.getElementById("navCerrar"); /* nav dinamicos para varias condiciones, es lo mismo que hice en edit en la otro archivo al usar span */
const navRol = document.getElementById("navRol");




/* Traer del local para leer */
const usuario = JSON.parse(localStorage.getItem("usuarioLogueado"));

let infoNombre = document.getElementById("infoNombre")
let infoCorreo = document.getElementById("infoCorreo")
let infoContrasena = document.getElementById("infoContrasena")
let infoTelefono = document.getElementById("infoTelefono")
let infoCedula = document.getElementById("infoCedula")

let btnCambiarNombre = document.getElementById("btnCambiarNombre")
let btnCambiarCorreo = document.getElementById("btnCambiarCorreo")
let btnCambiarContrasena = document.getElementById("btnCambiarContrasena")
let btnCambiarTelefono = document.getElementById("btnCambiarTelefono")
let btnCambiarCedula = document.getElementById("btnCambiarCedula")

let btnEliminarCuenta = document.getElementById("btnEliminarCuenta") /* eliminar cuenta */
let btnCerrarSesion = document.getElementById("btnCerrarSesion"); /* cerrar sección */

/* En pantalla se imprima los datos del usuario en el localstorage */
infoNombre.textContent = "Nombre: " + usuario.nombre;
infoCorreo.textContent = "Correo:" + usuario.correo;
infoContrasena.textContent = "Contraseña:" + usuario.contrasena;
infoTelefono.textContent = "Telefono:" + usuario.telefono;
infoCedula.textContent = "Cedula" + usuario.cedula


//Cambio de nombre
btnCambiarNombre.addEventListener("click", async function () {
    
  const { value: nuevoNombre } = await Swal.fire({
    title: "Ingrese el nuevo nombre",
    input: "text",
    inputPlaceholder: "Escribe el nombre aquí",
    showCancelButton: true,
    confirmButtonText: "Guardar",
    cancelButtonText: "Cancelar",
    inputValidator: (value) => {
      if (!value) {
        return "Debes escribir un nombre";
      }
    }
  });

  if (!nuevoNombre) return;


    usuario.nombre = nuevoNombre; //  Modificamos el objeto local, haciendo que el nuevo valor sea el valor ingresado en el prompt

    const usuarioActualizado = await updatePatchUsuarios(usuario.id, usuario);// Enviamos PUT al backend(json server) y este actualiza ddbjson

    
    localStorage.setItem("usuarioLogueado", JSON.stringify(usuarioActualizado)); //  Actualizamos localStorage

    infoNombre.textContent = "Nombre: " + usuarioActualizado.nombre; //  Actualizamos la vista
});




// Cambio de correo
btnCambiarCorreo.addEventListener("click", async function () {

  const dominiosPermitidos = [
    ".com", ".net", ".org", ".info",
    ".es", ".mx", ".co", ".eu",
    ".shop", ".tech", ".barcelona", ".app"
  ];

  const usuarios = await getUsuarios();

  const { value: nuevoCorreo } = await Swal.fire({
    title: "Ingrese el nuevo correo",
    input: "text",
    inputPlaceholder: "Escribe el correo aquí",
    showCancelButton: true,
    confirmButtonText: "Guardar",
    cancelButtonText: "Cancelar",
    inputValidator: async (value) => {

      if (!value) {
        return "Debes escribir un correo";
      }

      if (!value.includes("@")) {
        return "El correo debe incluir @";
      }

      const tieneDominioValido = dominiosPermitidos.some(dominio =>
        value.endsWith(dominio)
      );

      if (!tieneDominioValido) {
        return "El correo debe tener un dominio permitido (.com, .net, .org, .info, .es, .mx, .co, .eu, .shop, .tech, .barcelona, .app)";
      }

      if (value.length <= 12) {
        return "El correo debe tener más de 12 caracteres";
      }

      const usuarioExistente = usuarios.find(u => u.correo === value);

      if (usuarioExistente) {
        return "Este correo ya está registrado";
      }
    }
  });

  if (!nuevoCorreo) return;

  usuario.correo = nuevoCorreo;

  const usuarioActualizado = await updatePatchUsuarios(usuario.id, usuario);

  localStorage.setItem("usuarioLogueado", JSON.stringify(usuarioActualizado));

  infoCorreo.textContent = "Correo: " + usuarioActualizado.correo;
});





//Cambio de contraseña
btnCambiarContrasena.addEventListener("click", async function () {
    
  const { value: nuevoContrasena } = await Swal.fire({
    title: "Ingrese la nueva contraseña",
    input: "text",
    inputPlaceholder: "Escribe la contraseña aquí",
    showCancelButton: true,
    confirmButtonText: "Guardar",
    cancelButtonText: "Cancelar",
    inputValidator: (value) => {
      if (!value) {
        return "Debes escribir una contraseña";
      }
      if (value.length < 6) {
        return "La contraseña debe de tener al menos 6 caracteres"
      }
    }
  });

  if (!nuevoContrasena) return;


    usuario.contrasena = nuevoContrasena; //  Modificamos el objeto local, haciendo que el nuevo valor sea el valor ingresado en el prompt

    const usuarioActualizado = await updatePatchUsuarios(usuario.id, usuario);// Enviamos PUT al backend(json server) y este actualiza ddbjson

    
    localStorage.setItem("usuarioLogueado", JSON.stringify(usuarioActualizado)); //  Actualizamos localStorage

    infoContrasena.textContent = "Contraseña: " + usuarioActualizado.contrasena; //  Actualizamos la vista
});



//Cambio de telefono
btnCambiarTelefono.addEventListener("click", async function () {
    
  const { value: nuevoTelefono } = await Swal.fire({
    title: "Ingrese el nuevo número de teléfono",
    input: "text",
    inputPlaceholder: "Escribe el número aquí",
    showCancelButton: true,
    confirmButtonText: "Guardar",
    cancelButtonText: "Cancelar",
    inputValidator: (value) => {
      if (!value) {
        return "Debes escribir un número";
      }
      if (value.length < 8)
        return "El número telefónico debe de tener al menos 8 caracteres"
    }
    
  });

  if (!nuevoTelefono) return;


    usuario.telefono = nuevoTelefono; //  Modificamos el objeto local, haciendo que el nuevo valor sea el valor ingresado en el prompt

    const usuarioActualizado = await updatePatchUsuarios(usuario.id, usuario);// Enviamos PUT al backend(json server) y este actualiza ddbjson

    
    localStorage.setItem("usuarioLogueado", JSON.stringify(usuarioActualizado)); //  Actualizamos localStorage

    infoTelefono.textContent = "Teléfono: " + usuarioActualizado.telefono; //  Actualizamos la vista
});

console.log("telefono btn:", btnCambiarTelefono);





//Cambio de cedula
btnCambiarCedula.addEventListener("click", async function () {
    
  const { value: nuevaCedula } = await Swal.fire({
    title: "Ingrese el nuevo número de cédula",
    input: "text",
    inputPlaceholder: "Escribe el número de cédula aquí",
    showCancelButton: true,
    confirmButtonText: "Guardar",
    cancelButtonText: "Cancelar",
    inputValidator: (value) => {
      if (!value) {
        return "Debes escribir un número de cédula";
      }
       if (!/^\d+$/.test(value)) {
    return "La cédula solo puede contener números";
  }
    }
  });

  if (!nuevaCedula) return;


    usuario.cedula = nuevaCedula; //  Modificamos el objeto local, haciendo que el nuevo valor sea el valor ingresado en el prompt

    const usuarioActualizado = await updatePatchUsuarios(usuario.id, usuario);// Enviamos PUT al backend(json server) y este actualiza ddbjson

    
    localStorage.setItem("usuarioLogueado", JSON.stringify(usuarioActualizado)); //  Actualizamos localStorage

    infoCedula.textContent = "Cedula: " + usuarioActualizado.cedula; //  Actualizamos la vista
});








/* con este boton el usuario va eliminar su cuenta y de una vez se remueve del local */
btnEliminarCuenta.addEventListener("click", async () => {
  const resultado = await Swal.fire({
    title: "¿Eliminar tu cuenta?",
    text: "Esta acción no se puede deshacer.",
    icon: "warning",
    showCancelButton: true,
    confirmButtonText: "Sí, eliminar",
    cancelButtonText: "Cancelar",
    reverseButtons: true
  });

  if (!resultado.isConfirmed) return;

  await deleteUsuarios(usuario.id);

  localStorage.removeItem("usuarioLogueado");

  await Swal.fire({
    icon: "success",
    title: "Cuenta eliminada",
    text: "Lo sentimos verte ir 😢",
    timer: 1600,
    showConfirmButton: false
  });

  window.location.href = "../pages/login.html";
});


btnCerrarSesion.addEventListener("click", async () => {
  const resultado = await Swal.fire({
    title: "¿Cerrar sesión?",
    text: "Tendrás que volver a iniciar sesión para entrar.",
    icon: "question",
    showCancelButton: true,
    confirmButtonText: "Sí, cerrar",
    cancelButtonText: "Cancelar",
    reverseButtons: true
  });

  if (!resultado.isConfirmed) return;

  localStorage.removeItem("usuarioLogueado");

  await Swal.fire({
    icon: "success",
    title: "Sesión cerrada",
    text: "Hasta pronto 👋",
    timer: 1500,
    showConfirmButton: false
  });

  window.location.href = "../pages/login.html";
});


    /* Parte del codigo dedicado a las nva dinamicas */
if (usuarioActivo) {

    const link = document.createElement("a");

    if (usuarioActivo.rol === "usuario") {
        link.textContent = "Panel Usuario";
        link.href = "../pages/usuario.html";
    }
     else{ if (usuarioActivo.rol === "Administrador") {
        link.textContent = "Administrador";
        link.href = "../pages/administrador.html";
    }}


    navRol.appendChild(link);
}

/* a cerrar seccion, ysando un boton que elimine el local storage */
if (usuarioActivo) {

    const btnCerrar = document.createElement("button");
    btnCerrar.textContent = "Cerrar sesión";
    btnCerrar.addEventListener("click", function () {
        localStorage.removeItem("usuarioLogueado");
        window.location.href = "../pages/index.html"
    })
    navCerrar.appendChild(btnCerrar);
}