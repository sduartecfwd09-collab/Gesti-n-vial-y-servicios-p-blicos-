/* GET es para obtener datos de una url a travez de un fetch y un await */

async function getReportes() {
    try {
        const respuesta = await fetch("http://localhost:3002/reportes");/* fetch es una funcion que permite hacer peticiones a una url */
        const datosUsuarios = await respuesta.json();/* json es un formato de datos que se utiliza para intercambiar datos entre el servidor y el cliente */
        return datosUsuarios;
    } catch (error) {
        console.error("Error al obtener los usuarios", error);
    }
}
export { getReportes };

/* post es para agregar datos mediante parametros a una url*/
async function postReportes(reportes) {
    try {
        const respuesta = await fetch("http://localhost:3002/reportes", { /* Con post se debe abrir una llavem donde especifica el tipo de metodo y el header(siempre se mantiene igual) */
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(reportes) /* stringify es para convertir el objeto en string */
        });
        const datosUsuarios = await respuesta.json();
        return datosUsuarios;
    } catch (error) {
        console.error("Error al agregar el usuario", error);
    }
}
export { postReportes };

/* put es para actualizar datos mediante parametros a una url*/
async function updateReportes(id, reportes) {
    try {
        const respuesta = await fetch(`http://localhost:3002/reportes/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(reportes)
        });

        return await respuesta.json();
    } catch (error) {
        console.error("Error al actualizar el usuario", error);
    }
}
export { updateReportes };

/* Delete */
async function deleteReportes(id) {
    try {
        const respuesta = await fetch(`http://localhost:3002/reportes/${id}`, { /* Con put se debe abrir una llavem donde especifica el tipo de metodo y el header(siempre se mantiene igual) */
            method: "DELETE",

        });
        
    } catch (error) {
        console.error("Error al actualizar el usuario", error);
    }
}
export { deleteReportes };

/* Patch editar */
async function updatePatchReportes(id, reportes) {
    try {
        const respuesta = await fetch(`http://localhost:3002/reportes/${id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(reportes)
        });

        return await respuesta.json();
    } catch (error) {
        console.error("Error al actualizar el usuario", error);
    }
}
export { updatePatchReportes };