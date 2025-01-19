function crearLista(container, i, tarjetas){
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
    containerTarjetas.parentNode.addEventListener("dragover", (event) => event.preventDefault());
    containerTarjetas.parentNode.addEventListener('drop', (event) => drop(event));
    const botonEliminar = document.createElement("button");
    botonEliminar.classList.add("delete-list");
    botonEliminar.innerText = "Eliminar lista";
    botonEliminar.addEventListener('click', () => {
        Eliminar(containerInterno);
        if(!container.hasChildNodes()){
            const botonReinicio = document.createElement("button");
            botonReinicio.classList.add("add-card");
            botonReinicio.innerText = "Reiniciar listas";
            container.insertAdjacentElement("beforeend", botonReinicio);
            botonReinicio.addEventListener('click', () => {
                crearListas();
                Eliminar(botonReinicio);
            })
        }
    })
    botonera.insertAdjacentElement("beforeend", botonEliminar);
}
function crearListas(){
    const tarjetas = ["Para hacer", "En progreso", "Finalizado"];
    const tablero = document.querySelector("#tablero");
    const container = document.createElement("section");
    container.id = "board-container";
    tablero.insertAdjacentElement("afterbegin", container)
    for(let i = 0 ; i < tarjetas.length ; i++){
        crearLista(container, i, tarjetas)
    }
}
function drop(event){
    /*
        * Contenedor es el contenedor de tarjetas correcto donde ha caído la tarjeta
        * infoTarjeta trae la id de la tarjeta arrastrada
        * tarjetas es el conjunto de tarjetas que ya había de antes en esa lista
        * */
    event.preventDefault();
    const contenedor = event.target.closest(".list").firstChild.nextElementSibling;//.list es la lista entera, el primer hijo es el titulo, el segundo el contenedor de tarjetas
    const infoTarjeta = event.dataTransfer.getData("text/plain");
    const tarjetasAnteriores = contenedor.children;
    const tarjetaArrastrada = document.querySelector(`#${infoTarjeta}`);
    for(let i = 0; i < tarjetasAnteriores.length; i++) {
        if(tarjetasAnteriores[i] === tarjetaArrastrada) continue;
        const posicion = tarjetasAnteriores[i].getBoundingClientRect();
        if(posicion.top + (tarjetasAnteriores[i].clientHeight / 2) > event.clientY){
            contenedor.insertBefore(tarjetaArrastrada, tarjetasAnteriores[i]);
            break;
        }
        if(i === tarjetasAnteriores.length - 1){
            contenedor.insertAdjacentElement('beforeend', tarjetaArrastrada);
        }
    }
    if(!tarjetasAnteriores.length) contenedor.insertAdjacentElement('beforeend', tarjetaArrastrada);
}
function Eliminar(nodo){
    nodo.remove();
}

function crearTarjeta(containerTarjetas, index){
    const fecha = new Date().toLocaleString("es-ES");
    const tarjeta = document.createElement("section");
    tarjeta.setAttribute('title', `Fecha de creación: ${fecha}`);
    tarjeta.classList.add("card");
    tarjeta.id = `tarjeta${containerTarjetas.id.charAt(containerTarjetas.id.length - 1)}${index}`
    containerTarjetas.insertAdjacentElement("beforeend", tarjeta);
    const contenidoTarjeta = document.createElement("section");
    tarjeta.insertAdjacentElement("beforeend", contenidoTarjeta);
    const p = document.createElement("p");
    tarjeta.addEventListener('mousedown', (event) => {
        if(event.target !== p) tarjeta.setAttribute("draggable", "true")
    });
    tarjeta.addEventListener('mouse', () => tarjeta.removeAttribute("draggable"));
    contenidoTarjeta.classList.add("flex", "flexcard");
    p.innerText = `Nueva Tarea`;
    p.addEventListener('dblclick', () => textoModificable(p));
    p.addEventListener('focusout', () => yaNoModificable(p, p.parentNode.parentNode));
    const popup = document.createElement("section");
    popup.classList.add("pop-up", "hidden", "flexcard");
    const configuracion = document.createElement("button");
    const svg = document.createElementNS('http://www.w3.org/2000/svg', "svg");
    svg.setAttribute('xmlns', 'http://www.w3.org/2000/svg');
    svg.setAttribute('viewBox','0 0 512 512');
    configuracion.insertAdjacentElement("beforeend", svg);
    const path = document.createElementNS('http://www.w3.org/2000/svg', "path");
    path.setAttribute('d', "M495.9 166.6c3.2 8.7 .5 18.4-6.4 24.6l-43.3 39.4c1.1 8.3 1.7 16.8 1.7 25.4s-.6 17.1-1.7 25.4l43.3 39.4c6.9 6.2 9.6 15.9 6.4 24.6c-4.4 11.9-9.7 23.3-15.8 34.3l-4.7 8.1c-6.6 11-14 21.4-22.1 31.2c-5.9 7.2-15.7 9.6-24.5 6.8l-55.7-17.7c-13.4 10.3-28.2 18.9-44 25.4l-12.5 57.1c-2 9.1-9 16.3-18.2 17.8c-13.8 2.3-28 3.5-42.5 3.5s-28.7-1.2-42.5-3.5c-9.2-1.5-16.2-8.7-18.2-17.8l-12.5-57.1c-15.8-6.5-30.6-15.1-44-25.4L83.1 425.9c-8.8 2.8-18.6 .3-24.5-6.8c-8.1-9.8-15.5-20.2-22.1-31.2l-4.7-8.1c-6.1-11-11.4-22.4-15.8-34.3c-3.2-8.7-.5-18.4 6.4-24.6l43.3-39.4C64.6 273.1 64 264.6 64 256s.6-17.1 1.7-25.4L22.4 191.2c-6.9-6.2-9.6-15.9-6.4-24.6c4.4-11.9 9.7-23.3 15.8-34.3l4.7-8.1c6.6-11 14-21.4 22.1-31.2c5.9-7.2 15.7-9.6 24.5-6.8l55.7 17.7c13.4-10.3 28.2-18.9 44-25.4l12.5-57.1c2-9.1 9-16.3 18.2-17.8C227.3 1.2 241.5 0 256 0s28.7 1.2 42.5 3.5c9.2 1.5 16.2 8.7 18.2 17.8l12.5 57.1c15.8 6.5 30.6 15.1 44 25.4l55.7-17.7c8.8-2.8 18.6-.3 24.5 6.8c8.1 9.8 15.5 20.2 22.1 31.2l4.7 8.1c6.1 11 11.4 22.4 15.8 34.3zM256 336a80 80 0 1 0 0-160 80 80 0 1 0 0 160z");
    svg.insertAdjacentElement("beforeend", path);
    const comentario = document.createComment("!Font Awesome Free 6.7.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc.");
    svg.insertBefore(comentario, svg.firstChild);
    const boton = document.createElement("button");
    boton.innerText = "X";
    boton.addEventListener('click', () => Eliminar(tarjeta));
    contenidoTarjeta.insertAdjacentElement("beforeend", p);
    contenidoTarjeta.insertAdjacentElement("beforeend", boton);
    contenidoTarjeta.insertAdjacentElement("beforeend", configuracion);
    contenidoTarjeta.insertAdjacentElement("beforeend", popup);
    const labelFondo = document.createElement("label");
    labelFondo.innerText = "Color de fondo";
    const colorFondo = document.createElement("input");
    colorFondo.type = "color";
    colorFondo.value = "#FFFFFF";
    colorFondo.classList.add("color");
    const labelLetra = document.createElement("label");
    labelLetra.innerText = "Color de letra";
    const colorLetra = document.createElement("input");
    colorLetra.type = "color";
    colorLetra.value = "#000000"
    colorLetra.classList.add("color");
    const labelImportante = document.createElement("label");
    labelImportante.innerText = "Marcar como importante";
    const checkboxImportante = document.createElement("input");
    checkboxImportante.type = "checkbox";
    checkboxImportante.addEventListener("change", () => {
        if(checkboxImportante.checked) {
            tarjeta.classList.add("importante");
        }else{
            tarjeta.classList.remove("importante");
        }
    });
    const botonPopUp = boton.cloneNode(true);
    popup.insertAdjacentElement("beforeend", labelLetra);
    popup.insertAdjacentElement("beforeend", colorLetra);
    popup.insertAdjacentElement("beforeend", labelFondo);
    popup.insertAdjacentElement("beforeend", colorFondo);
    popup.insertAdjacentElement("beforeend", labelImportante);
    popup.insertAdjacentElement("beforeend", checkboxImportante);
    popup.insertAdjacentElement("beforeend", botonPopUp);
    botonPopUp.addEventListener("click", () => {
        popup.classList.remove("flex");
        popup.classList.add("hidden");
    });
    configuracion.addEventListener("click", () => {
        if(popup.classList.contains("hidden")) {
            popup.classList.remove("hidden");
            popup.classList.add("flex");
        }else{
            popup.classList.remove("flex");
            popup.classList.add("hidden");
        }
    });
    colorFondo.addEventListener('change', () => tarjeta.style.backgroundColor = colorFondo.value);
    colorLetra.addEventListener('change', () => tarjeta.style.color = colorLetra.value);
    tarjeta.addEventListener("dragstart", (event) => {
        const idTarjeta = event.target.id;
        event.dataTransfer.setData("text/plain", `${idTarjeta}`);
        tarjeta.classList.add("drag");
        if(popup.classList.contains("flex")) {
            popup.classList.remove("flex");
            popup.classList.add("hidden");
        }
    });
}

function textoModificable(p){
    p.setAttribute("contenteditable", true);
    const rango = document.createRange();
    const textoSeleccionado = getSelection();
    rango.selectNodeContents(p);
    textoSeleccionado.removeAllRanges();
    textoSeleccionado.addRange(rango);
}

function yaNoModificable(p, tarjeta){
    p.removeAttribute("contenteditable");
    if(p.textContent === "") Eliminar(tarjeta);
}

addEventListener('DOMContentLoaded',  crearListas );
