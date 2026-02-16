/* GET es para obtener datos de una url a travez de un fetch y un await */

async function getUsuarios() {
    try {
        const respuesta = await fetch("http://localhost:3000/proyectos");/* fetch es una funcion que permite hacer peticiones a una url */
        const datosUsuarios = await respuesta.json();/* json es un formato de datos que se utiliza para intercambiar datos entre el servidor y el cliente */
        return datosUsuarios;
    } catch (error) {
        console.error("Error al obtener los usuarios", error);
    }
}
export { getUsuarios };

/* post es para agregar datos mediante parametros a una url*/
async function postUsuarios(proyectos) {
    try {
        const respuesta = await fetch("http://localhost:3000/proyectos", { /* Con post se debe abrir una llavem donde especifica el tipo de metodo y el header(siempre se mantiene igual) */
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(proyectos) /* stringify es para convertir el objeto en string */
        });
        const datosUsuarios = await respuesta.json();
        return datosUsuarios;
    } catch (error) {
        console.error("Error al agregar el usuario", error);
    }
}
export { postUsuarios };

/* put es para actualizar datos mediante parametros a una url*/
async function updateUser(id, proyectos) {
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
export { updateUser };

/* Delete */
async function deleteUsers(id) {
    try {
        const respuesta = await fetch(`http://localhost:3000/proyectos/${id}`, { /* Con put se debe abrir una llavem donde especifica el tipo de metodo y el header(siempre se mantiene igual) */
            method: "DELETE",

        });
        
    } catch (error) {
        console.error("Error al actualizar el usuario", error);
    }
}
export { deleteUsers };

/* Patch editar */
async function updatePatchUser(id, proyectos) {
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
export { updatePatchUser };