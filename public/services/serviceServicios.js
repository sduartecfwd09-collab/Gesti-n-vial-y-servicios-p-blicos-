/* GET es para obtener datos de una url a travez de un fetch y un await */

async function getServicios() {
    try {
        const respuesta = await fetch("http://localhost:3000/servicios");/* fetch es una funcion que permite hacer peticiones a una url */
        const datosServicios = await respuesta.json();/* json es un formato de datos que se utiliza para intercambiar datos entre el servidor y el cliente */
        return datosServicios;
    } catch (error) {
        console.error("Error al obtener los usuarios", error);
    }
}
export { getServicios };

/* post es para agregar datos mediante parametros a una url*/
async function postServicios(servicios) {
    try {
        const respuesta = await fetch("http://localhost:3000/servicios", { /* Con post se debe abrir una llavem donde especifica el tipo de metodo y el header(siempre se mantiene igual) */
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(servicios) /* stringify es para convertir el objeto en string */
        });
        const datosServicios = await respuesta.json();
        return datosServicios;
    } catch (error) {
        console.error("Error al agregar el usuario", error);
    }
}
export { postServicios };

/* put es para actualizar datos mediante parametros a una url*/
async function updateServicios(id, servicios) {
    try {
        const respuesta = await fetch(`http://localhost:3000/servicios/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(servicios)
        });

        return await respuesta.json();
    } catch (error) {
        console.error("Error al actualizar el usuario", error);
    }
}
export { updateServicios };

/* Delete */
async function deleteServicios(id) {
    try {
        const respuesta = await fetch(`http://localhost:3000/servicios/${id}`, { /* Con put se debe abrir una llavem donde especifica el tipo de metodo y el header(siempre se mantiene igual) */
            method: "DELETE",

        });
        
    } catch (error) {
        console.error("Error al actualizar el usuario", error);
    }
}
export { deleteServicios };

/* Patch editar */
async function updatePatchServicios(id, servicios) {
    try {
        const respuesta = await fetch(`http://localhost:3000/servicios/${id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(servicios)
        });

        return await respuesta.json();
    } catch (error) {
        console.error("Error al actualizar el usuario", error);
    }
}
export { updatePatchServicios };