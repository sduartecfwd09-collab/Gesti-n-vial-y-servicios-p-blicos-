import { postReportes } from "../services/serviceReportes.js"
import { getReportes } from "../services/serviceReportes.js"

let tipoReporte = document.getElementById("tipoReporte");
let descripcionProblema = document.getElementById("descripcionProblema");
let ubicacionProblema = document.getElementById("ubicacionProblema");
let btnReportar = document.getElementById("btnReportar");

let contendor = document.getElementById("contendor")

const usuarioActivo = JSON.parse(localStorage.getItem("usuarioLogueado"))

const navCerrar = document.getElementById("navCerrar"); /* nav dinamicos para varias condiciones, es lo mismo que hice en edit en la otro archivo al usar span */
const navRol = document.getElementById("navRol");

mostrarReportes();

btnReportar.addEventListener("click", async () => {
    if (tipoReporte.value.trim() == "" || descripcionProblema.value.trim() == "" || ubicacionProblema.value.trim() == "") {
        Swal.fire({
            title: "Error",
            text: "Todos los campos son obligatorios",
            icon: "error",
            confirmButtonText: "OK"
        });
    } else {
        const reportes = {
            tipoReporte: tipoReporte.value.trim(),
            descripcionProblema: descripcionProblema.value.trim(),
            ubicacionProblema: ubicacionProblema.value.trim(),
            usuario: usuarioActivo.id, /* esto permite guardar el id del usuario activo que envió el formulario */
            Estado: "Pendiente"
        }
        await postReportes(reportes);

        mostrarReportes();/* para que una vez se guarden los datos, se vuelva a ejecutar la funcion get(de abajo), permitiendo que se actualice al instante la tabla, una vez se da click */


        Swal.fire({
            title: "Registro de reporte exitoso",
            icon: "success",
            confirmButtonText: "Continuar"
        });


        tipoReporte.value = ""; /* limpiar inputa */
        descripcionProblema.value = "";
        ubicacionProblema.value = "";
    }
})

async function mostrarReportes() {
    let reporte = await getReportes();

    contendor.textContent = ""; // limpiar tabla

    for (let i = 0; i < reporte.length; i++) {
        const reportesEnviados = reporte[i];
        if (reportesEnviados.usuario === usuarioActivo.id) { /* para que la lista aparezca solo cuando el id del usuario activo que esta en el localstorage, el cual fue llamado con un get y parse, arriba de este js coincida.
            Basicamente lo que hace es de la constante reporte deseada, que esta recorriendo los elementos del dbjson para leerlo, busca alguna informacion que contenga el id del usuario y eso se hizo, con el post de arriba, que al hacer el objeto, le añadimos el id del usuario activo, por lo tanto al enviar, en el db tambien se guarda ese id*/

            /* regla para un div vacio, create element, luego textContent, por ultimo appendChild*/
            const item = document.createElement("tr"); /* determinar que tipo de elemento tendra cada elemento del contenedor si tr o td */

            const datosTipoReporte = document.createElement("td");
            const datosDescripcionProblema = document.createElement("td");
            const datosUbicacionProblema = document.createElement("td");
            const datosEstado = document.createElement("td");

            datosTipoReporte.textContent = reportesEnviados.tipoReporte;
            datosDescripcionProblema.textContent = reportesEnviados.descripcionProblema;
            datosUbicacionProblema.textContent = reportesEnviados.ubicacionProblema; /* el contenido de esos td será lo encontrado en dbjson en la lista productos */
            datosEstado.textContent = reportesEnviados.Estado;

            item.appendChild(datosTipoReporte);
            item.appendChild(datosDescripcionProblema);
            item.appendChild(datosUbicacionProblema);/* item tendra hijos y los hijos serán td */
            item.appendChild(datosEstado);
            contendor.appendChild(item) /* dentro del contenedor va estar item e item es un tr */
        }
    }
}
/* Parte del codigo dedicado a las nva dinamicas */
if (usuarioActivo) {

    const link = document.createElement("a");

    if (usuarioActivo.rol === "usuario") {
        link.textContent = "Panel Usuario";
        link.href = "../pages/usuario.html";
    }
     else{ if (usuarioActivo.rol === "administrador") {
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
        window.location.href = "index.html"
    })
    navCerrar.appendChild(btnCerrar);
}