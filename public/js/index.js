import { getProyectos } from "../services/serviceProyectos.js"
import { getServicios } from "../services/serviceServicios.js"

let btnCerrarSeccion = document.querySelector(".btnCerrarSeccion")

const usuarioActivo = JSON.parse(localStorage.getItem("usuarioLogueado"))

const navCerrar = document.getElementById("navCerrar"); /* nav dinamicos para varias condiciones, es lo mismo que hice en edit en la otro archivo al usar span */
const navRol = document.getElementById("navRol");
const navLogin = document.getElementById("navLogin");
const contendorViales = document.getElementById("contendorViales");
const contendorServicios = document.getElementById("contendorServicios");


/* aparezca login solo si hay usuario no logeado o nuevo */
if (!usuarioActivo) {

    const link = document.createElement("a");
link.textContent = "Iniciar sesión";
        link.href = "../pages/login.html";
    


    navRol.appendChild(link);
}
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
        window.location.href = "index.html"
    })
    navCerrar.appendChild(btnCerrar);
}

window.addEventListener("DOMContentLoaded", () => {
    if (contendorViales && contendorServicios) {
        mostrarProyectos();
        mostrarSercivios();
    } else {
        console.error("No se encontraron los contenedores de tabla");
    }
});



async function mostrarProyectos() {
    let proyecto = await getProyectos();

    contendorViales.textContent = ""; // limpiar tabla

    for (let i = 0; i < proyecto.length; i++) {
        const proyectossEnviados = proyecto[i];
        
            const trProyectos = document.createElement("tr"); /* determinar que tipo de elemento tendra cada elemento del contenedor si tr o td */

            
            const tdNombreProyecto = document.createElement("td");
            const tdsDescripcionDelProyecto = document.createElement("td");
            const tdPresupuestoDelProyecto = document.createElement("td");
            const tdFechaProyecto = document.createElement("td");
            const tdUbicacionProyecto = document.createElement("td");
            const tdDireccionExacta = document.createElement("td");
            const tdAdminProyecto = document.createElement("td");
            const tdEstadoProyecto = document.createElement("td");
           

           
            tdNombreProyecto.textContent = proyectossEnviados.nombreProyecto;
            tdsDescripcionDelProyecto.textContent = proyectossEnviados.descripcionProyecto;
            tdPresupuestoDelProyecto.textContent = proyectossEnviados.presupuestoDelProyecto; /* el contenido de esos td será lo encontrado en dbjson en la lista productos */
            tdFechaProyecto.textContent = proyectossEnviados.fechaInicioProyecto;
            tdUbicacionProyecto.textContent = proyectossEnviados.ubicacionProyecto;
            tdDireccionExacta.textContent = proyectossEnviados.direccionProyecto;
            tdAdminProyecto.textContent = proyectossEnviados.adminProyecto;
            tdEstadoProyecto.textContent = proyectossEnviados.EstadoProyecto;;

            
           
           
            trProyectos.appendChild(tdNombreProyecto);
            trProyectos.appendChild(tdsDescripcionDelProyecto);
            trProyectos.appendChild(tdPresupuestoDelProyecto);/* item tendra hijos y los hijos serán td */
            trProyectos.appendChild(tdFechaProyecto);
            trProyectos.appendChild(tdUbicacionProyecto);
            trProyectos.appendChild(tdDireccionExacta);
            trProyectos.appendChild(tdAdminProyecto);
            trProyectos.appendChild(tdEstadoProyecto);
           
            contendorViales.appendChild(trProyectos) /* dentro del contenedor va estar item e item es un tr */

        }
    
}


async function mostrarSercivios() {
    let servicio = await getServicios();

    contendorServicios.textContent = ""; // limpiar tabla

    for (let i = 0; i < servicio.length; i++) {
        const serviciosEnviados = servicio[i];
       
            const trServicios = document.createElement("tr"); /* determinar que tipo de elemento tendra cada elemento del contenedor si tr o td */

            
            const tdtipoServicio = document.createElement("td");
            const tddescripcionServicioPublico = document.createElement("td");
            const tdencargadoServicioPublico = document.createElement("td");
            const tdubicacionServicio = document.createElement("td");
            const tddireccionDelServicio = document.createElement("td");
            const tdEstadoServicio = document.createElement("td");
            
            
            tdtipoServicio.textContent = serviciosEnviados.tipoServicio;
            tddescripcionServicioPublico.textContent = serviciosEnviados.descripcionServicioPublico; /* el contenido de esos td será lo encontrado en dbjson en la lista productos */
            tdencargadoServicioPublico.textContent = serviciosEnviados.encargadoServicioPublico;
            tdubicacionServicio.textContent = serviciosEnviados.ubicacionServicio;
            tddireccionDelServicio.textContent = serviciosEnviados.direccionDelServicio;
            tdEstadoServicio.textContent = serviciosEnviados.EstadoServicio;


            

           
            trServicios.appendChild(tdencargadoServicioPublico);
            trServicios.appendChild(tdtipoServicio);
            trServicios.appendChild(tddescripcionServicioPublico);/* item tendra hijos y los hijos serán td */

            trServicios.appendChild(tdubicacionServicio);
            trServicios.appendChild(tddireccionDelServicio);
            trServicios.appendChild(tdEstadoServicio);
            
            contendorServicios.appendChild(trServicios)
        }
    }

