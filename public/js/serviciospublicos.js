import { postServicios } from "../services/serviceServicios.js"
import { getServicios } from "../services/serviceServicios.js"
import { deleteServicios } from "../services/serviceServicios.js"
import { updatePatchServicios } from "../services/serviceServicios.js"

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


mostrarSercivios();

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

        mostrarSercivios();/* para que una vez se guarden los datos, se vuelva a ejecutar la funcion get(de abajo), permitiendo que se actualice al instante la tabla, una vez se da click */


        Swal.fire({
            title: "Registro de servicio exitoso",
            icon: "success",
            confirmButtonText: "Continuar"
        });


        tipoServicio.value = "";
        descripcionServicioPublico.value = "";
        ubicacionServicio.value = "";
        direccionDelServicio.value = "";
    }
})

async function mostrarSercivios() {
    let servicio = await getServicios();

    contendorServicios.textContent = ""; // limpiar tabla

    for (let i = 0; i < servicio.length; i++) {
        const serviciosEnviados = servicio[i];
        if (serviciosEnviados.adminID === usuarioActivo.id) { /* para que la lista aparezca solo cuando el id del usuario activo que esta en el localstorage, el cual fue llamado con un get y parse, arriba de este js coincida.
            Basicamente lo que hace es de la constante reporte deseada, que esta recorriendo los elementos del dbjson para leerlo, busca alguna informacion que contenga el id del usuario y eso se hizo, con el post de arriba, que al hacer el objeto, le añadimos el id del usuario activo, por lo tanto al enviar, en el db tambien se guarda ese id*/

            /* regla para un div vacio, create element, luego textContent, por ultimo appendChild*/
            const trServicios = document.createElement("tr"); /* determinar que tipo de elemento tendra cada elemento del contenedor si tr o td */

            const tdIdVial = document.createElement("td");
            const tdtipoServicio = document.createElement("td");
            const tddescripcionServicioPublico = document.createElement("td");
            const tdencargadoServicioPublico = document.createElement("td");
            const tdubicacionServicio = document.createElement("td");
            const tddireccionDelServicio = document.createElement("td");
            const tdEstadoServicio = document.createElement("td");
            const tdbotones = document.createElement("td");

            tdIdVial.textContent = serviciosEnviados.id;
            tdtipoServicio.textContent = serviciosEnviados.tipoServicio;
            tddescripcionServicioPublico.textContent = serviciosEnviados.descripcionServicioPublico; /* el contenido de esos td será lo encontrado en dbjson en la lista productos */
            tdencargadoServicioPublico.textContent = serviciosEnviados.encargadoServicioPublico;
            tdubicacionServicio.textContent = serviciosEnviados.ubicacionServicio;
            tddireccionDelServicio.textContent = serviciosEnviados.direccionDelServicio;
            tdEstadoServicio.textContent = serviciosEnviados.EstadoServicio;


            const btnPendienteServicio = document.createElement("button");
            const btnProcesoServicio = document.createElement("button");
            const btnResueltoServicio = document.createElement("button");;
            const btnEliminarServicio = document.createElement("button");;


            btnPendienteServicio.textContent = "Pendiente";/* los valores de cada boton */
            btnProcesoServicio.textContent = "En Proceso";
            btnResueltoServicio.textContent = "Resuelto";
            btnEliminarServicio.textContent = "Eliminar Servicio ";


            btnPendienteServicio.addEventListener("click", async function () {
                await updatePatchServicios(serviciosEnviados.id, { EstadoServicio: "Pendiente" });
                mostrarSercivios(); /* muestreme el cambio de inmediato despues de actualizar*/
            });

            btnProcesoServicio.addEventListener("click", async function () {
                await updatePatchServicios(serviciosEnviados.id, { EstadoServicio: "En Proceso" });
                mostrarSercivios(); /* muestreme el cambio de inmediato despues de actualizar*/
            });

            btnResueltoServicio.addEventListener("click", async function () {
                await updatePatchServicios(serviciosEnviados.id, { EstadoServicio: "Resuelto" });
                mostrarSercivios(); /* muestreme el cambio de inmediato despues de actualizar*/
            });

            btnEliminarServicio.addEventListener("click", async function () {
                const resultado = await Swal.fire({
                    title: "¿Seguro que quieres eliminar este proyecto?",
                    text: "Esta acción no se puede deshacer",
                    icon: "warning",
                    showCancelButton: true,
                    confirmButtonText: "Sí, eliminar",
                    cancelButtonText: "Cancelar"
                });

                if (resultado.isConfirmed) {
                    await deleteServicios(serviciosEnviados.id);
                    mostrarSercivios();
                }

            });
            tdbotones.appendChild(btnPendienteServicio);
            tdbotones.appendChild(btnProcesoServicio);
            tdbotones.appendChild(btnResueltoServicio);
            tdbotones.appendChild(btnEliminarServicio);

            trServicios.appendChild(tdIdVial);
            trServicios.appendChild(tdencargadoServicioPublico);
            trServicios.appendChild(tdtipoServicio);
            trServicios.appendChild(tddescripcionServicioPublico);/* item tendra hijos y los hijos serán td */

            trServicios.appendChild(tdubicacionServicio);
            trServicios.appendChild(tddireccionDelServicio);
            trServicios.appendChild(tdEstadoServicio);
            trServicios.appendChild(tdbotones);
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