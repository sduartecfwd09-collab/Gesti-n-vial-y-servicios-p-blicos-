import { postServicios } from "../services/serviceServicios.js"
import { getServicios } from "../services/serviceServicios.js"

let tipoServicio = document.getElementById("tipoServicio");
let descripcionServicioPublico = document.getElementById("descripcionServicioPublico");
/* let encargadoServicioPublico = document.getElementById("encargadoServicioPublico"); */
let ubicacionServicio = document.getElementById("ubicacionServicio");
let direccionDelServicio = document.getElementById("direccionDelServicio");

let btnServicioPublica = document.querySelector(".btnServicioPublica")
const usuarioActivo = JSON.parse(localStorage.getItem("usuarioLogueado"))
let contendorServicios = document.getElementById("contendorServicios");


const navCerrar = document.getElementById("navCerrar"); /* nav dinamicos para varias condiciones, es lo mismo que hice en edit en la otro archivo al usar span */
const navRol = document.getElementById("navRol");


mostrarServicios();

btnServicioPublica.addEventListener("click", async () => {
    if (tipoServicio.value.trim() == "" || descripcionServicioPublico.value.trim() == "" || /* encargadoServicioPublico.value.trim() == "" */ /* || */ ubicacionServicio.value.trim() == "" || direccionDelServicio.value.trim() == "") {
        Swal.fire({
            title: "Error",
            text: "Todos los campos son obligatorios",
            icon: "error",
            confirmButtonText: "OK"
        });
    } else {
        const servicios = {
            tipoServicio: tipoServicio.value.trim(),
            descripcionServicioPublico: descripcionServicioPublico.value.trim(),
            encargadoServicioPublico: usuarioActivo.nombre,
            ubicacionServicio: ubicacionServicio.value.trim(),
            direccionDelServicio: direccionDelServicio.value.trim(),
            adminID: usuarioActivo.id, /* esto permite guardar el id del usuario activo que envió el formulario */
            EstadoServicio: "Pendiente"
        }
        await postServicios(servicios);

        mostrarServicios();/* para que una vez se guarden los datos, se vuelva a ejecutar la funcion get(de abajo), permitiendo que se actualice al instante la tabla, una vez se da click */


        Swal.fire({
            title: "Registro de servicio exitoso",
            icon: "success",
            confirmButtonText: "Continuar"
        });


        tipoServicio.value.trim() = "";
        descripcionServicioPublico.value.trim() = "";
        ubicacionServicio.value.trim() = "";
        direccionDelServicio.value.trim() = "";
    }
})

async function mostrarServicios() {
    let servicio = await getServicios();

    contendor.textContent = ""; // limpiar tabla

    for (let i = 0; i < servicio.length; i++) {
        const reportesEnviados = servicio[i];
        if (reportesEnviados.usuario === usuarioActivo.id) { /* para que la lista aparezca solo cuando el id del usuario activo que esta en el localstorage, el cual fue llamado con un get y parse, arriba de este js coincida.
            Basicamente lo que hace es de la constante reporte deseada, que esta recorriendo los elementos del dbjson para leerlo, busca alguna informacion que contenga el id del usuario y eso se hizo, con el post de arriba, que al hacer el objeto, le añadimos el id del usuario activo, por lo tanto al enviar, en el db tambien se guarda ese id*/

            /* regla para un div vacio, create element, luego textContent, por ultimo appendChild*/
             const trServicios = document.createElement("tr"); /* determinar que tipo de elemento tendra cada elemento del contenedor si tr o td */

            const tdIdVial = document.createElement("td");
            const tdtipoServicio = document.createElement("td");
            const tddescripcionServicioPublico = document.createElement("td");
            const tdencargadoServicioPublico = document.createElement("td");
            const tdubicacionServicio = document.createElement("td");
            const tddireccionDelServicio = document.createElement("td");
            const tdadminID = document.createElement("td");
            const tdEstadoProyecto = document.createElement("td");

            tdIdVial.textContent = proyectossEnviados.id;
            tdtipoServicio.textContent = proyectossEnviados.tipoServicio;
            tddescripcionServicioPublico.textContent = proyectossEnviados.descripcionServicioPublico; /* el contenido de esos td será lo encontrado en dbjson en la lista productos */
            tdencargadoServicioPublico.textContent = proyectossEnviados.encargadoServicioPublico;
            tdubicacionServicio.textContent = proyectossEnviados.ubicacionServicio;
            tddireccionDelServicio.textContent = proyectossEnviados.direccionDelServicio;
            tdadminID.textContent = proyectossEnviados.adminID;
            tdEstadoProyecto.textContent = proyectossEnviados.EstadoServicio;

            trServicios.appendChild(tdIdVial);
            trServicios.appendChild(tdtipoServicio);
            trServicios.appendChild(tddescripcionServicioPublico);/* item tendra hijos y los hijos serán td */
            trServicios.appendChild(tdencargadoServicioPublico);
            trServicios.appendChild(tdubicacionServicio);
            trServicios.appendChild(tddireccionDelServicio);
            trServicios.appendChild(tdadminID);
            trServicios.appendChild(tdEstadoProyecto);
            contendorServicios.appendChild(trServicios)
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