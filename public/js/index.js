import { getProyectos } from "../services/serviceProyectos.js"
import { getServicios } from "../services/serviceServicios.js"

document.addEventListener("DOMContentLoaded", () => {

    const usuarioActivo = JSON.parse(localStorage.getItem("usuarioLogueado"));

    const navCerrar = document.getElementById("navCerrar");
    const navRol = document.getElementById("navRol");
    const navPerfil = document.getElementById("navPerfil");

    const contendorViales = document.getElementById("contendorViales");
    const contendorServicios = document.getElementById("contendorServicios");


    /* ===== NAV DINÁMICO ===== */

    // LOGIN si no hay usuario
    if (!usuarioActivo && navRol) {
        const link = document.createElement("a");
        link.textContent = "Login";
        link.href = "../pages/login.html";
        navRol.appendChild(link);
    }

    // BOTÓN CERRAR SESIÓN
    if (usuarioActivo && navCerrar) {
        const btnCerrar = document.createElement("button");
        btnCerrar.textContent = "Cerrar sesión";

        btnCerrar.addEventListener("click", () => {
            localStorage.removeItem("usuarioLogueado");
            window.location.href = "../pages/index.html";
        });

        navCerrar.appendChild(btnCerrar);
    }

    // PANEL SEGÚN ROL
    if (usuarioActivo && navRol) {
        const link = document.createElement("a");

        if (usuarioActivo.rol === "Administrador") {
            link.textContent = "Administrador";
            link.href = "../pages/administrador.html";
        } else {
            link.textContent = "Panel usuario";
            link.href = "../pages/usuario.html";
        }

        navRol.innerHTML = "";
        navRol.appendChild(link);
    }

    // PERFIL SEGÚN ROL
    if (usuarioActivo && navPerfil) {
        const link = document.createElement("a");

        if (usuarioActivo.rol === "Administrador") {
            link.textContent = "Administrador";
            link.href = "../pages/administrador.html";
        } else {
            link.textContent = "Perfil";
            link.href = "../pages/perfil.html";
        }

        navPerfil.appendChild(link);
    }


    /* ===== TABLAS ===== */

    if (contendorViales && contendorServicios) {
        mostrarProyectos();
        mostrarSercivios();
    }

});


async function mostrarProyectos() {
    let proyecto = await getProyectos();

    const contendorViales = document.getElementById("contendorViales");
    contendorViales.textContent = "";

    for (let i = 0; i < proyecto.length; i++) {
        const p = proyecto[i];

        const tr = document.createElement("tr");

        tr.innerHTML = `
            <td>${p.nombreProyecto}</td>
            <td>${p.descripcionProyecto}</td>
            <td>${p.presupuestoDelProyecto}</td>
            <td>${p.fechaInicioProyecto}</td>
            <td>${p.ubicacionProyecto}</td>
            <td>${p.direccionProyecto}</td>
            <td>${p.adminProyecto}</td>
            <td>${p.EstadoProyecto}</td>
        `;

        contendorViales.appendChild(tr);
    }
}


async function mostrarSercivios() {
    let servicio = await getServicios();

    const contendorServicios = document.getElementById("contendorServicios");
    contendorServicios.textContent = "";

    for (let i = 0; i < servicio.length; i++) {
        const s = servicio[i];

        const tr = document.createElement("tr");

        tr.innerHTML = `
            <td>${s.encargadoServicioPublico}</td>
            <td>${s.tipoServicio}</td>
            <td>${s.descripcionServicioPublico}</td>
            <td>${s.ubicacionServicio}</td>
            <td>${s.direccionDelServicio}</td>
            <td>${s.EstadoServicio}</td>
        `;

        contendorServicios.appendChild(tr);
    }
}
