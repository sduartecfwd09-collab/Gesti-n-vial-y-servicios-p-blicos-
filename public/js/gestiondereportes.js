import { getReportes } from "../services/serviceReportes.js"
import { updatePatchReportes } from "../services/serviceReportes.js"
import { deleteReportes } from "../services/serviceReportes.js"


let btnCerrarSeccion = document.querySelector(".btnCerrarSeccion")/* borrar, se cambio a append, child */

let contendor = document.getElementById("contendor")

const usuarioActivo = JSON.parse(localStorage.getItem("usuarioLogueado"))

const navCerrar = document.getElementById("navCerrar"); /* nav dinamicos para varias condiciones, es lo mismo que hice en edit en la otro archivo al usar span */
const navRol = document.getElementById("navRol");

mostrarReportes();

async function mostrarReportes() {
    const reportes = await getReportes();
    contendor.textContent = "";

    for (let i = 0; i < reportes.length; i++) {
        const reporte = reportes[i];

        const fila = document.createElement("tr");

        const tdId = document.createElement("td");
        const tdTipo = document.createElement("td");
        const tdDescripcion = document.createElement("td");
        const tdUbicacion = document.createElement("td");
        const nuevaUbicacion = document.createElement("td");
        const tdUsuario = document.createElement("td");
        const tdEstado = document.createElement("td");
        const tdAcciones = document.createElement("td");

        tdId.textContent = reporte.id;
        tdTipo.textContent = reporte.tipoReporte;
        tdDescripcion.textContent = reporte.descripcionProblema;
        tdUbicacion.textContent = reporte.ubicacionProblema;
        nuevaUbicacion.textContent = reporte.direccion;
        tdUsuario.textContent = reporte.usuario;
        tdEstado.textContent = reporte.Estado;

        const btnPendiente = document.createElement("button"); /* desde aqui se diseñan todas las constantes,formato y eventos para cambiar el estado */
        const btnProceso = document.createElement("button");
        const btnResuelto = document.createElement("button");
        const btnEliminar = document.createElement("button");;

        btnPendiente.textContent = "Pendiente";/* los valores de cada boton */
        btnProceso.textContent = "En Proceso";
        btnResuelto.textContent = "Resuelto";
        btnEliminar.textContent = "Reporte inválido";

        btnPendiente.addEventListener("click", async function () {
            await updatePatchReportes(reporte.id, { Estado: "Pendiente" });
            mostrarReportes(); /* muestreme el cambio de inmediato despues de actualizar, pues ejecuta la funcion de inmediato despues del patch*/
        });

        btnProceso.addEventListener("click", async function () {
            await updatePatchReportes(reporte.id, { Estado: "En Proceso" });
            mostrarReportes(); /* muestreme el cambio de inmediato despues de actualizar*/
        });

        btnResuelto.addEventListener("click", async function () {
            await updatePatchReportes(reporte.id, { Estado: "Resuelto" });
            mostrarReportes(); /* muestreme el cambio de inmediato despues de actualizar*/
        });

        btnEliminar.addEventListener("click", async function () {
            await deleteReportes(reporte.id);
            mostrarReportes();
        });

        tdAcciones.appendChild(btnEliminar);
        tdAcciones.appendChild(btnPendiente);
        tdAcciones.appendChild(btnProceso);
        tdAcciones.appendChild(btnResuelto);

        fila.appendChild(tdId);
        fila.appendChild(tdTipo);
        fila.appendChild(tdDescripcion);
        fila.appendChild(tdUbicacion);
        fila.appendChild(nuevaUbicacion);
        fila.appendChild(tdUsuario);
        fila.appendChild(tdEstado);
        fila.appendChild(tdAcciones); /* debe desplegar a sus hijos que son unos botones */

        contendor.appendChild(fila);

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


    navRol.appendChild(link);
}

/* a cerrar seccion, usando un boton que elimine el local storage */
if (usuarioActivo) {

    const btnCerrar = document.createElement("button");
    btnCerrar.textContent = "Cerrar sesión";
    btnCerrar.addEventListener("click", function () {
        localStorage.removeItem("usuarioLogueado");
        window.location.href = "index.html"
    })
    navCerrar.appendChild(btnCerrar);
}