/* GET es para obtener datos de una url a travez de un fetch y un await */

async function getProyectos() {
    try {
        const respuesta = await fetch("http://localhost:3000/proyectos");/* fetch es una funcion que permite hacer peticiones a una url */
        const datosProyectos = await respuesta.json();/* json es un formato de datos que se utiliza para intercambiar datos entre el servidor y el cliente */
        return datosProyectos;
    } catch (error) {
        console.error("Error al obtener los usuarios", error);
    }
}
export { getProyectos };

/* post es para agregar datos mediante parametros a una url*/
async function postProyectos(proyectos) {
    try {
        const respuesta = await fetch("http://localhost:3000/proyectos", { /* Con post se debe abrir una llavem donde especifica el tipo de metodo y el header(siempre se mantiene igual) */
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(proyectos) /* stringify es para convertir el objeto en string */
        });
        const datosProyectos = await respuesta.json();
        return datosProyectos;
    } catch (error) {
        console.error("Error al agregar el usuario", error);
    }
}
export { postProyectos };

/* put es para actualizar datos mediante parametros a una url*/
async function updateProyectos(id, proyectos) {
    try {
        const respuesta = await fetch(`http://localhost:3000/proyectos/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(proyectos)
        });

        return await respuesta.json();
    } catch (error) {
        console.error("Error al actualizar el usuario", error);
    }
}
export { updateProyectos };

/* Delete */
async function deleteProyectos(id) {
    try {
        const respuesta = await fetch(`http://localhost:3000/proyectos/${id}`, { /* Con put se debe abrir una llavem donde especifica el tipo de metodo y el header(siempre se mantiene igual) */
            method: "DELETE",

        });
        
    } catch (error) {
        console.error("Error al actualizar el usuario", error);
    }
}
export { deleteProyectos };

/* Patch editar */
async function updatePatchProyectos(id, proyectos) {
    try {
        const respuesta = await fetch(`http://localhost:3000/proyectos/${id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(proyectos)
        });

        return await respuesta.json();
    } catch (error) {
        console.error("Error al actualizar el usuario", error);
    }
}
export { updatePatchProyectos };