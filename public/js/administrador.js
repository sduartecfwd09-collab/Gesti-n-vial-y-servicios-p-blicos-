import { getUsuarios } from "../services/serviceUsuarios.js"
import { updatePatchUsuarios } from "../services/serviceUsuarios.js"
import { deleteUsuarios } from "../services/serviceUsuarios.js"




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





///////////Funciones del trabajo extra///////////

let contenedorRoles = document.getElementById("contenedorRoles")

const usuariosActivo = JSON.parse(localStorage.getItem("usuarioLogueado"))

const navCerrar2 = document.getElementById("navCerrar2"); /* nav dinamicos para varias condiciones, es lo mismo que hice en edit en la otro archivo al usar span */
const navRoles = document.getElementById("navRoles");

mostrarRoles();

async function mostrarRoles() {
    const roles = await getUsuarios();
    contenedorRoles.textContent = "";

    for (let i = 0; i < roles.length; i++) {
        const rol = roles[i];

        const fila = document.createElement("tr");

        const tdnombre = document.createElement("td");
        const tdrolActual = document.createElement("td");
        const tdAcciones = document.createElement("td");


        tdnombre.textContent = rol.nombre;
        tdrolActual.textContent = rol.rol;
        
        

        const btnEliminar = document.createElement("button");
        const btnUsuario = document.createElement("button");
        const btnAdministrador = document.createElement("button");;


        btnEliminar.textContent = "Eliminar Usuario";
        btnUsuario.textContent = "Usuario";
        btnAdministrador.textContent = "Administrador";

        
         btnUsuario.addEventListener("click", async function () {
            await updatePatchUsuarios(rol.id, { rol: "Usuario" });
            mostrarRoles(); /* muestreme el cambio de inmediato despues de actualizar*/
        });

          btnAdministrador.addEventListener("click", async function () {
            await updatePatchUsuarios(rol.id, { rol: "Administrador" });
            mostrarRoles(); /* muestreme el cambio de inmediato despues de actualizar*/
        });

          btnEliminar.addEventListener("click", async function () {
          const resultado = await Swal.fire({
        title: "¿Seguro que quieres eliminar este usuario?",
        text: "Esta acción no se puede deshacer",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Sí, eliminar",
        cancelButtonText: "Cancelar"
    });

    if (resultado.isConfirmed) {
        await deleteReportes(reporte.id);
        mostrarReportes();
    }

});



        tdAcciones.appendChild(btnEliminar);
        tdAcciones.appendChild(btnUsuario);
        tdAcciones.appendChild(btnAdministrador);

        fila.appendChild(tdnombre);
        fila.appendChild(tdrolActual);
         fila.appendChild(tdAcciones);
       
        contenedorRoles.appendChild(fila);

    }
}

/* Parte del codigo dedicado a las nva dinamicas */
if (usuarioActivo) {

    const link = document.createElement("a");

    if (usuarioActivo.rol === "usuario") {
        link.textContent = "Panel Usuario";
        link.href = "../pages/usuario.html";
    }
    else {
        if (usuarioActivo.rol === "Administrador") {
            link.textContent = "Administrador";
            link.href = "../pages/administrador.html";
        }
    }


    navRoles.appendChild(link);
}

/* a cerrar seccion, usando un boton que elimine el local storage */
if (usuariosActivo) {

    const btnCerrar = document.createElement("button");
    btnCerrar.textContent = "Cerrar sesión";
    btnCerrar.addEventListener("click", function () {
        localStorage.removeItem("usuarioLogueado");
        window.location.href = "index.html"
    })
    navCerrar2.appendChild(btnCerrar);
}