import { getUsuarios } from "../services/serviceUsuarios.js"
import { updatePatchUsuarios } from "../services/serviceUsuarios.js"
import { deleteUsuarios } from "../services/serviceUsuarios.js"


document.addEventListener("DOMContentLoaded", () => {


    const usuarioActivo = JSON.parse(localStorage.getItem("usuarioLogueado"))

    const navCerrar = document.getElementById("navCerrar");
    const navRol = document.getElementById("navRol");
    const contenedorRoles = document.getElementById("contenedorRoles");


    // ===== NAV DINÁMICO =====
    if (usuarioActivo && navRol) {
        const link = document.createElement("a");

        if (usuarioActivo.rol.toLowerCase() === "usuario") {
            link.textContent = "Panel Usuario";
            link.href = "../pages/usuario.html";
        }

        if (usuarioActivo.rol.toLowerCase() === "administrador") {
            link.textContent = "Administrador";
            link.href = "../pages/administrador.html";
        }

        navRol.appendChild(link);
    }



    /* a cerrar seccion, ysando un boton que elimine el local storage */
    if (usuarioActivo && navCerrar) {
        const btnCerrar = document.createElement("button");
        btnCerrar.textContent = "Cerrar sesión";

        btnCerrar.addEventListener("click", () => {
            localStorage.removeItem("usuarioLogueado");
            window.location.href = "index.html";
        });

        navCerrar.appendChild(btnCerrar);
    }





    ///////////Funciones del trabajo extra///////////
    mostrarRoles();

    async function mostrarRoles() {

        if (!contenedorRoles) return;

        const roles = await getUsuarios();

        if (!Array.isArray(roles)) {
            console.error("getUsuarios no devuelve arreglo:", roles);
            return;
        }

        contenedorRoles.textContent = "";

        const usuarioLogueado = JSON.parse(localStorage.getItem("usuarioLogueado"));

        const primerAdministrador = roles.find(
            u => u.rol.toLowerCase() === "administrador"
        );

        const esPrimerAdmin =
            usuarioLogueado &&
            primerAdministrador &&
            usuarioLogueado.id === primerAdministrador.id;

        // SOLO administradores pueden ver la tabla
        if (!usuarioLogueado || usuarioLogueado.rol.toLowerCase() !== "administrador") {
            return;
        }

        for (let rol of roles) {

            const fila = document.createElement("tr");

            const tdnombre = document.createElement("td");
            const tdrolActual = document.createElement("td");
            const tdAcciones = document.createElement("td");

            tdnombre.textContent = rol.nombre;
            tdrolActual.textContent = rol.rol;

            if (esPrimerAdmin) {

                const btnEliminar = document.createElement("button");
                const btnUsuario = document.createElement("button");
                const btnAdministrador = document.createElement("button");

                btnEliminar.textContent = "Eliminar Usuario";
                btnUsuario.textContent = "Usuario";
                btnAdministrador.textContent = "Administrador";

                btnUsuario.addEventListener("click", async () => {
                    await updatePatchUsuarios(rol.id, { rol: "Usuario" });
                    mostrarRoles();
                });

                btnAdministrador.addEventListener("click", async () => {
                    await updatePatchUsuarios(rol.id, { rol: "Administrador" });
                    mostrarRoles();
                });

                btnEliminar.addEventListener("click", async () => {
                    const resultado = await Swal.fire({
                        title: "¿Seguro que quieres eliminar este usuario?",
                        text: "Esta acción no se puede deshacer",
                        icon: "warning",
                        showCancelButton: true,
                        confirmButtonText: "Sí, eliminar",
                        cancelButtonText: "Cancelar"
                    });

                    if (resultado.isConfirmed) {
                        await deleteUsuarios(rol.id);
                        mostrarRoles();
                    }
                });

                tdAcciones.appendChild(btnEliminar);
                tdAcciones.appendChild(btnUsuario);
                tdAcciones.appendChild(btnAdministrador);
            }

            fila.appendChild(tdnombre);
            fila.appendChild(tdrolActual);
            fila.appendChild(tdAcciones);

            contenedorRoles.appendChild(fila);
        }
    }

});

