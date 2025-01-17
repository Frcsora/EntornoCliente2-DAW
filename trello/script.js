function crearListas(){
    const tarjetas = ["Para hacer", "En progreso", "Finalizado"];
    const tablero = document.querySelector("#tablero");
    const container = document.createElement("section");
    container.id = "board-container";
    tablero.insertAdjacentElement("afterbegin", container)
    for(let i = 0 ; i < tarjetas.length ; i++){
        const containerInterno = document.createElement("section");
        containerInterno.classList.add("list");
        container.insertAdjacentElement("beforeend", containerInterno);
        const titulo = document.createElement("h3");
        titulo.innerText = tarjetas[i];
        titulo.classList.add("list-title");
        containerInterno.insertAdjacentElement("beforeend", titulo);
        const containerTarjetas = document.createElement("section");
        containerTarjetas.id = `cards${i}`;
        containerInterno.insertAdjacentElement("beforeend", containerTarjetas);
        const botonera = document.createElement("section");
        botonera.classList.add("flex");
        containerInterno.insertAdjacentElement("beforeend", botonera);
        const botonAnadir = document.createElement("button");
        botonAnadir.classList.add("add-card");
        botonAnadir.innerText = "Añadir Tarjeta";
        botonera.insertAdjacentElement("beforeend", botonAnadir);
        let index = 1;
        botonAnadir.addEventListener("click", () => {
            crearTarjeta(containerTarjetas, index);
            index++;
        });
        const botonEliminar = document.createElement("button");
        botonEliminar.classList.add("delete-list");
        botonEliminar.innerText = "Eliminar lista";
        botonEliminar.addEventListener('click', () => Eliminar(containerInterno))
        botonera.insertAdjacentElement("beforeend", botonEliminar);
    }
}

function Eliminar(nodo){
    nodo.remove();
}

function crearTarjeta(containerTarjetas, index){
    const tarjeta = document.createElement("section");
    tarjeta.classList.add("card");
    tarjeta.id = `tarjeta${index}`
    containerTarjetas.insertAdjacentElement("beforeend", tarjeta);
    const contenidoTarjeta = document.createElement("section");
    tarjeta.insertAdjacentElement("beforeend", contenidoTarjeta);
    tarjeta.setAttribute("draggable", true);
    contenidoTarjeta.classList.add("flex", "flexcard");
    const p = document.createElement("p");
    p.innerText = `Tarea ${index}`;
    p.addEventListener('click', () => p.setAttribute("contenteditable", true));
    p.addEventListener('focusout', () => {
        p.removeAttribute("contenteditable");
        if(p.textContent === "") Eliminar(tarjeta);
    });
    const boton = document.createElement("button");
    boton.innerText = "X";
    boton.addEventListener('click', () => Eliminar(tarjeta));
    contenidoTarjeta.insertAdjacentElement("beforeend", p);
    contenidoTarjeta.insertAdjacentElement("beforeend", boton);
}

addEventListener('DOMContentLoaded', crearListas);