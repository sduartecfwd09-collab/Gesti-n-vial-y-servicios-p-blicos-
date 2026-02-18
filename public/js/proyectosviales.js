import { postProyectos } from "../services/serviceProyectos.js"
import { getProyectos } from "../services/serviceProyectos.js"

let nombreProyecto = document.getElementById("nombreProyecto");
let descripcionProyecto = document.getElementById("descripcionProyecto");
let tipoCostos = document.getElementById("tipoCostos");
let fechaInicio = document.getElementById("fechaInicio");
let ubicacionProyecto = document.getElementById("ubicacionProyecto");
let direccionProyecto = document.getElementById("direccionProyecto");

let btnViales = document.querySelector(".btnViales")
const usuarioActivo = JSON.parse(localStorage.getItem("usuarioLogueado"))
let contendorViales = document.getElementById("contendorViales")


const navCerrar = document.getElementById("navCerrar"); /* nav dinamicos para varias condiciones, es lo mismo que hice en edit en la otro archivo al usar span */
const navRol = document.getElementById("navRol");


mostrarProyectos();

btnViales.addEventListener("click", async () => {
    if (nombreProyecto.value.trim() == "" || descripcionProyecto.value.trim() == "" || tipoCostos.value.trim() == "" || fechaInicio.value.trim() == "" || ubicacionProyecto.value.trim() == "" || direccionProyecto.value.trim() == "") {
        Swal.fire({
            title: "Error",
            text: "Todos los campos son obligatorios",
            icon: "error",
            confirmButtonText: "OK"
        });
    } else {
        const proyectos = {
            nombreProyecto: nombreProyecto.value.trim(),
            descripcionProyecto: descripcionProyecto.value.trim(),
            tipoCostos: tipoCostos.value.trim(),
            fechaInicio: fechaInicio.value.trim(),
            ubicacionProyecto: ubicacionProyecto.value.trim(),
            direccionProyecto: direccionProyecto.value.trim(),
            adminProyecto: usuarioActivo.id, /* esto permite guardar el id del usuario activo que envió el formulario */
            EstadoProyecto: "Pendiente"
        }
        await postProyectos(proyectos);

        mostrarProyectos();/* para que una vez se guarden los datos, se vuelva a ejecutar la funcion get(de abajo), permitiendo que se actualice al instante la tabla, una vez se da click */


        Swal.fire({
            title: "Registro de proyecto vial exitoso",
            icon: "success",
            confirmButtonText: "Continuar"
        });


        /* limpiar inputs */
        nombreProyecto.value.trim() = "";
        descripcionProyecto.value.trim() = "";
        tipoCostos.value.trim() = "";
        fechaInicio.value.trim() = "";
        ubicacionProyecto.value.trim() = "";
        direccionProyecto.value.trim() = "";
    }
})

async function mostrarProyectos() {
    let proyecto = await getProyectos();

    contendor.textContent = ""; // limpiar tabla

    for (let i = 0; i < proyecto.length; i++) {
        const proyectossEnviados = proyecto[i];
        if (proyectossEnviados === usuarioActivo.id) { /* para que la lista aparezca solo cuando el id del usuario activo que esta en el localstorage, el cual fue llamado con un get y parse, arriba de este js coincida.
            Basicamente lo que hace es de la constante reporte deseada, que esta recorriendo los elementos del dbjson para leerlo, busca alguna informacion que contenga el id del usuario y eso se hizo, con el post de arriba, que al hacer el objeto, le añadimos el id del usuario activo, por lo tanto al enviar, en el db tambien se guarda ese id*/

            /* regla para un div vacio, create element, luego textContent, por ultimo appendChild*/
            const trProyectos = document.createElement("tr"); /* determinar que tipo de elemento tendra cada elemento del contenedor si tr o td */

            const tdIdProyecto = document.createElement("td");
            const tdNombreProyecto = document.createElement("td");
            const tdsDescripcionDelProyecto = document.createElement("td");
            const tdCostosProyecto = document.createElement("td");
            const tdFechaProyecto = document.createElement("td");
            const tdUbicacion = document.createElement("td");
            const tdDireccionExacta = document.createElement("td");
            const tdadminProyecto = document.createElement("td");
            const tdEstadoProyecto = document.createElement("td");

            tdIdProyecto.textContent = proyectossEnviados.id;
            tdNombreProyecto.textContent = proyectossEnviados.nombreProyecto;
            tdsDescripcionDelProyecto.textContent = proyectossEnviados.descripcionProyecto;
            tdCostosProyecto.textContent = proyectossEnviados.tipoCostos; /* el contenido de esos td será lo encontrado en dbjson en la lista productos */
            tdFechaProyecto.textContent = proyectossEnviados.fechaInicio;
            tdUbicacion.textContent = proyectossEnviados.ubicacionProyecto;
            tdDireccionExacta.textContent = proyectossEnviados.direccionProyecto;
            tdadminProyecto.textContent = proyectossEnviados.adminProyecto;
            tdEstadoProyecto.textContent = proyectossEnviados.Estado;

            trProyectos.appendChild(tdIdProyecto);
            trProyectos.appendChild(tdNombreProyecto);
            trProyectos.appendChild(tdsDescripcionDelProyecto);
            trProyectos.appendChild(tdCostosProyecto);/* item tendra hijos y los hijos serán td */
            trProyectos.appendChild(tdFechaProyecto);
            trProyectos.appendChild(tdUbicacion);
            trProyectos.appendChild(tdDireccionExacta);
            trProyectos.appendChild(tdUsuario);
            trProyectos.appendChild(tdEstadoProyecto);
            contendorViales.appendChild(trProyectos) /* dentro del contenedor va estar item e item es un tr */

        }
    }
}



/* Parte del codigo dedicado a las nva dinamicas */
if (usuarioActivo) {

    const link = document.createElement("a"); /* crea un elemento de redireccion */

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