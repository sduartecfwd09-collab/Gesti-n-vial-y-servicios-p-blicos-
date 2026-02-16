/* GET es para obtener datos de una url a travez de un fetch y un await */

async function getUsuarios() {
    try {
        const respuesta = await fetch("http://localhost:3002/usuarios");/* fetch es una funcion que permite hacer peticiones a una url */
        const datosUsuarios = await respuesta.json();/* json es un formato de datos que se utiliza para intercambiar datos entre el servidor y el cliente */
        return datosUsuarios;
    } catch (error) {
        console.error("Error al obtener los usuarios", error);
    }
}
export { getUsuarios }; 

/* post es para agregar datos mediante parametros a una url*/
async function postUsuarios(usuarios) {
    try {
        const respuesta = await fetch("http://localhost:3002/usuarios", { /* Con post se debe abrir una llavem donde especifica el tipo de metodo y el header(siempre se mantiene igual) */
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(usuarios) /* stringify es para convertir el objeto en string */
        });
        const datosUsuarios = await respuesta.json();
        return datosUsuarios;
    } catch (error) {
        console.error("Error al agregar el usuario", error);
    }
}
export { postUsuarios };

/* put es para actualizar datos mediante parametros a una url*/
async function updateUser(id, usuarios) {
    try {
        const respuesta = await fetch(`http://localhost:3002/usuarios/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(usuarios)
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
        const respuesta = await fetch(`http://localhost:3002/usuarios/${id}`, { /* Con put se debe abrir una llavem donde especifica el tipo de metodo y el header(siempre se mantiene igual) */
            method: "DELETE",

        });
        
    } catch (error) {
        console.error("Error al actualizar el usuario", error);
    }
}
export { deleteUsers };

/* Patch editar */
async function updatePatchUser(id, usuarios) {
    try {
        const respuesta = await fetch(`http://localhost:3002/usuarios/${id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(usuarios)
        });

        return await respuesta.json();
    } catch (error) {
        console.error("Error al actualizar el usuario", error);
    }
}
export { updatePatchUser };