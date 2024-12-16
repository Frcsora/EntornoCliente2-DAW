//Conjuntos de objetos con la información
const tiposSeguro = [
    {
        nombre:"Terceros",
        precio: 500,
        imagen: "img/terceros.png"
    },
    {
        nombre:"Terceros ampliado",
        precio: 650,
        imagen: "img/tercerosampliado.jpg"
    },
    {
        nombre:"Franquicia",
        precio: 750,
        imagen: "img/franquicia.jpg"
    },
    {
        nombre: "A todo riesgo",
        precio: 1000,
        imagen: "img/todoriesgo.jpg"
    }
]
const tipos = [
    {
        nombre:"Diesel",
        penalizacion: 0.2
    },{
        nombre:"Gasolina",
        penalizacion: 0.15
    },
    {
        nombre:"Híbrido",
        penalizacion: 0.05
    },
    {
        nombre:"Eléctrico",
        penalizacion: 0
    }
]
const marcas = [
    {
        nombre: "Totoya",
        divisiones:["Corolla", "Camry", "RAV4", "Highlander"]
    },
    {
        nombre: "Honda",
        divisiones:["Civic", "Accord", "CR-V", "Pilot"]
    },
    {
        nombre:"Ford",
        divisiones:["Focus", "Mustang", "Explorer", "F-150"]
    },
    {
        nombre:"Chevrolet",
        divisiones:["Spark", "Malibu", "Equinox", "Silverado"]
    },
    {
        nombre:"BMW",
        divisiones:["Series 3", "Series 5", "X3", "X5"]
    },
    {
        nombre:"Mercedes",
        divisiones:["C-Class", "E-Class", "GLC", "GLE"]
    },
    {
        nombre:"Audi",
        divisiones:["A3", "A4", "Q5", "Q7"]
    },
    {
        nombre:"Nissan",
        divisiones:["Sentra", "Altima", "Rogue", "Pathfinder"]
    },
    {
        nombre:"Hyundai",
        divisiones:["Elantra", "Sonata", "Tucson", "Santa Fe"]
    },
    {
        nombre:"Kia",
        divisiones:["Rio", "Forte", "Sportage", "Sorento"]
    }
];
const comunidades = [
    {
        nombre: "Andalucía",
        divisiones: [
            "Almería", "Cádiz", "Córdoba", "Granada",
            "Huelva", "Jaén", "Málaga", "Sevilla"
        ]
    },
    {
        nombre: "Aragón",
        divisiones: ["Huesca", "Teruel", "Zaragoza"]
    },
    {
        nombre: "Asturias",
        divisiones: ["Asturias"]
    },
    {
        nombre: "Islas Baleares",
        divisiones: ["Islas Baleares"]
    },
    {
        nombre: "Canarias",
        divisiones: ["Las Palmas", "Santa Cruz de Tenerife"]
    },
    {
        nombre: "Cantabria",
        divisiones: ["Cantabria"]
    },
    {
        nombre: "Castilla-La Mancha",
        divisiones: [
            "Albacete", "Ciudad Real", "Cuenca", "Guadalajara", "Toledo"
        ]
    },
    {
        nombre: "Castilla y León",
        divisiones: [
            "Ávila", "Burgos", "León", "Palencia",
            "Salamanca", "Segovia", "Soria", "Valladolid", "Zamora"
        ]
    },
    {
        nombre: "Cataluña",
        divisiones: ["Barcelona", "Girona", "Lleida", "Tarragona"]
    },
    {
        nombre: "Extremadura",
        divisiones: ["Badajoz", "Cáceres"]
    },
    {
        nombre: "Galicia",
        divisiones: ["A Coruña", "Lugo", "Ourense", "Pontevedra"]
    },
    {
        nombre: "Madrid",
        divisiones: ["Madrid"]
    },
    {
        nombre: "Murcia",
        divisiones: ["Murcia"]
    },
    {
        nombre: "Navarra",
        divisiones: ["Navarra"]
    },
    {
        nombre: "La Rioja",
        divisiones: ["La Rioja"]
    },
    {
        nombre: "País Vasco",
        divisiones: ["Álava", "Guipúzcoa", "Vizcaya"]
    }
]
let segurosDisponibles = [];

//Variables globales
let tarjeta;
let terminosLeidos = false;
//Nodos del formulario

const body = document.getElementsByTagName("body")[0];
const form = document.getElementById("form");
const ccaa = document.getElementById("ccaa");
const telefono = document.getElementById("telefono");
const cp = document.getElementById("cp");
const fecha = document.getElementById("nacimiento");
const nodoMarca = document.getElementById("marca");
const modelo = document.getElementById("modelo");
const tipo = document.getElementById("tipo");
const seguro = document.getElementById("seguro");
const provincias = document.getElementById("provincias");
const checkbox = document.getElementById("terminos");
const enlaceTerminos = document.getElementById("labelterminos");
const nombre = document.getElementById("nombre");
const apellidos = document.getElementById("apellido");
const dni = document.getElementById("dni");
const correo = document.getElementById("correo");
const genero = document.getElementById("genero");
const matricula = document.getElementById("matricula");
const fechaPermiso = document.getElementById("fechaPermiso");
const fechaMatriculacion = document.getElementById("fechaMatricula");
const fotoCarnet = document.getElementById("fotocarnet");
const dropeo = document.getElementById("dropeo");

//Conjuntos de funciones
function calcularSeguro(edad, edadPermiso, penalizacionCoche, queSeguro, edadCoche){
    const precioBase = parseFloat(tiposSeguro[queSeguro].precio);
    let precio = precioBase;
    precio += edad < 25 ? precioBase * 0.1 : 0;
    precio += edadPermiso < 5 ? precioBase * 0.1 : 0;
    precio += precioBase * tipos[penalizacionCoche].penalizacion;
    precio += edadCoche > 10 ? precioBase * ((edadCoche - 10) / 100) : 0;
    return precio;
}
function crearTarjeta(seguro, seleccionado){
    const ofertas = document.getElementById("ofertas");
    const right = document.getElementById("right");
    const existeTarjeta = document.getElementById("tarjeta");
    //Eliminamos la tarjeta anterior si existe
    if(existeTarjeta) ofertas.removeChild(existeTarjeta)
    //Creación de la tarjeta
    const tarjeta = document.createElement("div");
    tarjeta.id = "tarjeta";
    if(segurosDisponibles[seguro] && segurosDisponibles[seguro].nombre === seleccionado){
        //Comprobamos si es el seguro seleccionado para cambiar el color de fondo
        tarjeta.classList.add("seleccionado")
    }else if(tarjeta.classList.contains("seleccionado")){
        //Nos aseguramos de que no tiene ese color si no lo es
        tarjeta.classList.remove("seleccionado");
    }
    tarjeta.classList.add("tarjetas");
    ofertas.insertBefore(tarjeta, right);
    //Nombre seguro
    const h3 = document.createElement("h3");
    h3.innerText = segurosDisponibles[seguro].nombre;
    tarjeta.appendChild(h3);
    //Imagen asociada a ese seguro
    const img = document.createElement("img");
    img.alt = "imagen";
    img.src = segurosDisponibles[seguro].imagen;
    tarjeta.appendChild(img);
    //Texto con precio
    const p = document.createElement("p");
    p.innerText = "Precio final: " + segurosDisponibles[seguro].precio.toFixed(2) + "€";
    tarjeta.appendChild(p);
    //botones
    const botonera = document.createElement("div");
    botonera.classList.add("botonera");
    tarjeta.appendChild(botonera);
    const aceptar = document.createElement("button");
    aceptar.id = "aceptar";
    aceptar.classList.add("bien", "boton");
    aceptar.innerText = "Contratar";
    botonera.appendChild(aceptar);
    const rechazar = document.createElement("button");
    rechazar.id = "rechazar";
    rechazar.classList.add("rechazar", "boton");
    rechazar.innerText = "Rechazar";
    botonera.appendChild(rechazar);
    //Efecto hover en el boton de aceptar
    aceptar.addEventListener("mouseenter", () => {
        aceptar.classList.add("transition", "dorado");
    })
    aceptar.addEventListener('mouseleave',() => {
        aceptar.classList.remove("dorado", "transition");
    })
    //Evento al aceptar
    aceptar.addEventListener('click', () =>{
        ofertas.classList.add("oculto");
        const finalDiv = document.createElement("div");
        finalDiv.classList.add("containerfinal");
        const p = document.createElement("p");
        finalDiv.appendChild(p);
        p.innerHTML = `¡Muchas gracias por confiar en Seguros DAW!<br>Ha contratado usted el seguro ${segurosDisponibles[seguro].nombre} por el precio de ${segurosDisponibles[seguro].precio.toFixed(2)}€.<br>Atentamente, su asesor de seguros,<br>Francesc Sorà Quevedo`;
        body.appendChild(finalDiv);
    })
    //Evento al rechazar
    rechazar.addEventListener('click', () => {
        //Eliminamos ese seguro de entre los disponibles
        segurosDisponibles.splice(seguro, 1);
        //Si no quedan seguros disponibles mostramos un mensaje
        if(!segurosDisponibles.length){
            ofertas.classList.add("oculto");
            const finalDiv = document.createElement("div");
            finalDiv.classList.add("containerfinal");
            const p = document.createElement("p");
            finalDiv.appendChild(p);
            p.innerHTML = `Lo sentimos, no tenemos más ofertas para usted`;
            body.appendChild(finalDiv);
        }else{
            //Si quedan seguros disponibles mostramos el siguiente seguro, volviendo al principio si es necesario
            seguro = seguro < seguro.length ? seguro : 0;
            crearTarjeta(seguro, seleccionado);
        }
    })
    
}
function crearSelect(nodo, info){
    //Creamos un select en nodo a partir de la información del array info
    for(let i = 0 ; i < info.length ; i++){
        let option = document.createElement("option");
        option.value = i;
        option.innerText = info[i].nombre;
        nodo.appendChild(option);
    }
}
function crearSelectDependiente(event, nodo, fieldset, dependeDe, info){
    //Eliminamos los hijos que ya tuviera el select dependiente
    while(nodo.hasChildNodes()){
        nodo.removeChild(nodo.firstChild);
    }
    //Añadimos un hijo sin valor en primer lugar
    let provincia = document.createElement("option");
    provincia.value = "";
    provincia.innerText = "Elige una opción"
    nodo.appendChild(provincia);
    let seleccionado = event.target.value;
    if(seleccionado){
        //Introducimos los elementos en el selectdependiente
        for(let i = 0 ; i < info[dependeDe].divisiones.length ; i++){
            let option = document.createElement("option");
            option.value = `${i}`;
            option.innerText = info[dependeDe].divisiones[i];
            nodo.appendChild(option);
        }
        //Hacemos que sea visible
        if(fieldset.classList.contains("invisible")){
            fieldset.classList.remove("invisible");
        }
    }else{
        //Si el padre no tiene nada seleccionado el select dependiente se ocultará
        if(!fieldset.classList.contains("invisible")){
            fieldset.classList.add("invisible");
        }
    }
}

//Validaciones
/**
 * Con alguna excepción, todas las validaciones tienen la misma estructura, una condición que de cumplirse retornará
 * false, además pone el fondo de ese input en rojo y un title con una explicación, es decir, que si pasas el
 * ratón por encima de ese campo verás una descripción de lo que se acepta, si este está en rojo. En caso de que no
 * se cumpla la condición, comprobará si tiene el fondo rojo, para quitarlo, asi como el title, para finalmente
 * retornar true
 * */
function validarNombreApellido(nodo){
    if(!/^(?!.*\d)(?!.*_)[\w\s-Á-ÿÀ-ÿ]{1,30}$/i.test(nodo.value)){
        nodo.setAttribute("title", "No se aceptan números, de 1 a 30 caracteres");
        nodo.classList.add("mal");
        return false;
    }else if(nodo.classList.contains("mal")) {
        nodo.removeAttribute("title");
        nodo.classList.remove("mal");
    }
    return true;
}
function calcularEdad(fechaActual, fechaFormulario){
    let edad = fechaActual.getFullYear() - fechaFormulario.getFullYear();
    if(fechaActual.getMonth() < fechaFormulario.getMonth()){
        return edad - 1;
    }else if(fechaActual.getMonth() === fechaFormulario.getMonth()){
        if(fechaActual.getDate() < fechaFormulario.getDate()){
            return edad - 1;
        }
    }
    return edad;
}
function validarMayorDeEdad(fecha, fechaActual = new Date()){
    return calcularEdad(fechaActual, fecha) >= 18;
}
function validarFecha(fechaAValidar, mayoriaEdad, comprobarFechaPermiso){
    /**
     * Los parametros mayoriaEdad y comprobarFechaPermiso reciben booleanos que permiten saber cual de las 3 fechas
     * se esta comprobando, sabiendo que tenemos 3 fechas diferentes y que cada una tiene sus condiciones especiales,
     * de esta forma no necesitamos 3 funciones diferentes para ellas, las podemos centralizar aquí y comprobar una
     * u otra dependiendo del valor de estas variables.
     * */
    const fechaActual = new Date();
    const fechaValidacion = new Date(fechaAValidar.value);
    //Validación general de formato, si no pasa esto ya no comprobaremos nada más, anterior o igual a la actual y posterior a 1950
    if(!/^\d{4}-\d{2}-\d{2}$/.test(fechaAValidar.value) || fechaValidacion >= fechaActual || fechaValidacion.getFullYear() < 1950){
        fechaAValidar.setAttribute("title", "Formato o fecha no válidos")
        fechaAValidar.classList.add("mal");
        return false;
    }
    if(mayoriaEdad && !comprobarFechaPermiso){
        //Fecha de nacimiento, debe ser mayor de 18
        const fechaPermiso = document.getElementById("fechaPermiso");
        if(!validarMayorDeEdad(new Date(fechaAValidar.value))){
            fechaAValidar.setAttribute("title", "Debes ser mayor de edad");
            fechaAValidar.classList.add("mal");
            return false;
        }else if(!validarMayorDeEdad(new Date(fechaAValidar.value), new Date(fechaPermiso.value))){
            //Comprueba que la nueva fecha de nacimiento sea almenos 18 años antes que la del permiso
            if(fechaAValidar.classList.contains("mal")){
                fechaAValidar.removeAttribute("title");
                fechaAValidar.classList.remove("mal");
            }
            fechaPermiso.setAttribute("title", "La fecha de permiso no puede ser anterior a la de nacimiento");
            fechaPermiso.classList.add("mal");
            return false;
        }else if(fechaPermiso.classList.contains("mal")){
            fechaPermiso.removeAttribute("title", "Debes ser mayor de edad");
            fechaPermiso.classList.remove("mal");
        }
    }else if(mayoriaEdad && comprobarFechaPermiso){
        //Comprueba que la fecha del permiso implique una mayoría de edad
        const fechaNacimiento = document.getElementById("nacimiento");
        if(!validarMayorDeEdad(new Date(fechaNacimiento.value), new Date(fechaAValidar.value))){
            fechaAValidar.setAttribute("title", "Debes ser mayor de edad");
            fechaAValidar.classList.add("mal");
            return false;
        }
    }else if(!mayoriaEdad && !comprobarFechaPermiso){
        //Comprobar fecha de matriculación, el coche no puede tener más de 15 años
        if(calcularEdad(new Date(), new Date(fechaAValidar.value)) > 15){
            fechaAValidar.setAttribute("title", "Lo sentimos, no aceptamos coches tan antiguos")
            fechaAValidar.classList.add("mal");
            return false;
        }
    }
    if(fechaAValidar.classList.contains("mal")){
        fechaAValidar.removeAttribute("title");
        fechaAValidar.classList.remove("mal");
    }
    return true;
}
function validarselect(nodo){
    if(!nodo.value){
        nodo.classList.add("mal");
        return false;
    }else if(nodo.classList.contains("mal")){
        nodo.classList.remove("mal");
    }
    return true;
}
function validarDni(){
    if(!/^\d{8}[A-Z]$/i.test(dni.value)){
        dni.setAttribute("title", "8 numeros y 1 letra")
        dni.classList.add("mal");
        return false;
    }else if(dni.classList.contains("mal")){
        dni.removeAttribute("title");
        dni.classList.remove("mal");
    }
    return true;
}
function validarCorreo(){
    if(!/^.{5,20}@.{4,10}\..{2,4}$/.test(correo.value)){
        correo.setAttribute("title", "xxxxxxxx@xxxxx@xx")
        correo.classList.add("mal");
        return false;
    }else if(correo.classList.contains("mal")){
        correo.removeAttribute("title");
        correo.classList.remove("mal");
    }
    return true;
}
function impedirLetras(nodo){
    if(/[^\d]/g.test(nodo.value)){
        nodo.value = nodo.value.replace(/[^\d]/, "");
        return false;
    }
}
function validarCP(){
    //con la primera regex que vemos nos encargaremos de eliminar lo que no sean números si son introducidos
    if(!/^\d{5}$/.test(cp.value)){
        cp.setAttribute("title", "5 números");
        cp.classList.add("mal");
        return false;
    }else if(cp.classList.contains("mal")){
        cp.removeAttribute("title")
        cp.classList.remove("mal");
    }
    return true;
}
function validarTelefono(){
    //Lo mismo que con el código postal
    if(/[^\d]/g.test(telefono.value)){
        telefono.value = telefono.value.replace(/[^\d]/, "");
        return false;
    }
    if(!/^6\d{8}$/.test(telefono.value)){
        telefono.setAttribute("title", "9 números empezando por 6")
        telefono.classList.add("mal");
        return false;
    }else if(telefono.classList.contains("mal")){
        correo.removeAttribute("title")
        telefono.classList.remove("mal");
    }
    return true;
}
function validarMatricula(){
    //Ayudamos al usuario formateándolo como "1111-AAA" si lo introduce junto, en minúsculas o con un espacio
    if(/^\d{4}[-\s]?[A-Za-z]{3}$/.test(matricula.value)){
        matricula.value = matricula.value.replace(/[-\s]/g, "");
        matricula.value = `${matricula.value.slice(0,4)}-${matricula.value.slice(4)}`.toUpperCase();
    }
    if(!/^\d{4}-[A-Za-z]{3}$/.test(matricula.value)){
        matricula.setAttribute("title", "4 numeros y 3 letras");
        matricula.classList.add("mal");
        return false;
    }else if(matricula.classList.contains("mal")){
        matricula.removeAttribute("title");
        matricula.classList.remove("mal");
    }
    return true;
}
function validarFoto(){
    if(!/.jpg$/.test(fotoCarnet.value)){
        fotoCarnet.setAttribute("title", "Solo jpg");
        fotoCarnet.classList.add("mal");
        return false;
    }else if(fotoCarnet.classList.contains("mal")){
        fotoCarnet.removeAttribute("title");
        fotoCarnet.classList.remove("mal");
        return true;
    }
    return true;
}
function validarTerminos(){
    if(!checkbox.checked){
        document.getElementById("fieldsetterminos").classList.add("mal");
        document.getElementById("fieldsetterminos").setAttribute("title", "Por favor, lea los terminos y condiciones para poder continuar");
        return false;
    }else if(document.getElementById("fieldsetterminos").classList.contains("mal")){
        document.getElementById("fieldsetterminos").classList.remove("mal");
        document.getElementById("fieldsetterminos").removeAttribute("title");
    }
    return true;
}
function validaciones(){
    //Ejecutamos las validaciones
    const validaciones = [validarNombreApellido(nombre), validarNombreApellido(apellidos), validarDni(),
        validarselect(genero), validarCorreo(), validarTelefono(), validarCP(), validarselect(ccaa),
        validarFecha(fecha, true,false),validarselect(nodoMarca), validarselect(modelo),
        validarselect(tipo), validarselect(seguro), validarFecha(fechaPermiso, true, true),
        validarFecha(fechaMatriculacion, false, false), validarMatricula(), validarFoto(), validarTerminos()];
    for(let i = 0 ; i < validaciones.length ; i++){
        if(!validaciones[i]) return false;
    }
    return true;
}

//Eventos
addEventListener('DOMContentLoaded', ()=>{   
    crearSelect(ccaa, comunidades);
    crearSelect(nodoMarca, marcas);
    crearSelect(tipo, tipos);
    crearSelect(seguro, tiposSeguro);
});
nombre.addEventListener('change',() =>  validarNombreApellido(nombre));
apellidos.addEventListener('change', () => validarNombreApellido(apellidos));
dni.addEventListener('change', validarDni);
correo.addEventListener('change', validarCorreo);
cp.addEventListener('input', () => impedirLetras(cp));
cp.addEventListener('change',validarCP);
telefono.addEventListener('input', () => impedirLetras(telefono));
telefono.addEventListener('change', validarTelefono);
matricula.addEventListener('change', validarMatricula);
genero.addEventListener('change', () => validarselect(genero));
ccaa.addEventListener('change', (event)=>{
    crearSelectDependiente(event,provincias,provincias.parentNode, ccaa.value, comunidades)
    validarselect(ccaa);
})
provincias.addEventListener('change', () => validarselect(provincias))
fecha.addEventListener('change', () => validarFecha(fecha, true, false));
nodoMarca.addEventListener('change', (event)=>{
    crearSelectDependiente(event, modelo, modelo.parentNode, nodoMarca.value, marcas);
    validarselect(nodoMarca);
});
modelo.addEventListener('change',() => validarselect(modelo));
seguro.addEventListener('change', () => validarselect(seguro));
tipo.addEventListener('change', () => validarselect(tipo));
fechaPermiso.addEventListener('change', () => validarFecha(fechaPermiso, true, true));
fechaMatriculacion.addEventListener('change', () => validarFecha(fechaMatriculacion, false, false));
fotoCarnet.addEventListener('change', (event) => {
    const previsualizacion = document.getElementById("previsualizacion");
    if(/.\.jpg$/i.test(fotoCarnet.files[0].name)){
        while(previsualizacion.hasChildNodes()){
            previsualizacion.removeChild(previsualizacion.firstChild)
        }
        //FileReader permite interactuar con archivos de forma asíncrona. Nunca lo había usado asi que busque información en:
        //https://developer.mozilla.org/en-US/docs/Web/API/FileReader
        const lector = new FileReader();
        const imagen = document.createElement("img");
        lector.addEventListener('load', (event) => {
            imagen.src = event.target.result;
        })
        lector.readAsDataURL(event.target.files[0]);
        imagen.alt = "previsualización";
        imagen.classList.add("imagenprevisualizacion")
        imagen.classList.add("foto");
        previsualizacion.appendChild(imagen)
    }else{
        fotoCarnet.value = "";
    }
    validarFoto();
});
checkbox.addEventListener('change', () => {
    checkbox.checked = terminosLeidos;
    validarTerminos();
});
enlaceTerminos.addEventListener('click', () => {
    const width = 600;
    const height = 400;
    let nuevaVentana = open("", "_blank", `width = ${width}, height=${height}`);
    nuevaVentana.document.write("<h2>Términos y Condiciones</h2><p>Bienvenido a Seguros DAW. Al utilizar este sitio web, aceptas cumplir con los siguientes términos y condiciones. Por favor, léelos detenidamente antes de usar nuestros servicios.</p><h2>1. Aceptación de los Términos</h2><p>Al acceder y utilizar nuestro sitio web, aceptas estos términos y condiciones en su totalidad. Si no estás de acuerdo con alguno de los términos establecidos, no debes utilizar este sitio web.</p><h2>2. Uso del Sitio</h2><p>El contenido de este sitio web es para tu uso general e informativo. Está sujeto a cambios sin previo aviso. No garantizamos la exactitud, integridad ni idoneidad de la información proporcionada.</p><h2>3. Propiedad Intelectual</h2><p>Todo el contenido, incluyendo pero no limitado a textos, gráficos, logotipos, imágenes y software, es propiedad de Seguros DAW o de sus licenciantes y está protegido por las leyes de propiedad intelectual.</p><h2>4. Enlaces a Terceros</h2><p>Este sitio web puede incluir enlaces a otros sitios web que no están bajo el control de Seguros DAW. No nos hacemos responsables del contenido ni de las prácticas de privacidad de dichos sitios.</p><h2>5. Limitación de Responsabilidad</h2><p>No seremos responsables por ningún daño directo, indirecto, incidental o consecuente que surja del uso o la imposibilidad de usar este sitio web.</p><h2>6. Modificaciones</h2><p>Nos reservamos el derecho de modificar estos términos y condiciones en cualquier momento. Las modificaciones entrarán en vigor inmediatamente después de su publicación en el sitio web.</p><h2>7. Ley Aplicable</h2><p>Estos términos y condiciones se regirán e interpretarán de acuerdo con las leyes de España.</p><h2>8. Contacto</h2><p>Si tienes alguna pregunta sobre estos términos y condiciones, puedes contactarnos a través de dawinfo@daw.info.</p>");
    terminosLeidos = true;
    checkbox.checked = terminosLeidos;
});
dropeo.addEventListener('dragover', (event)=>{
    //Prevenimos el evento default porque si no se abre la imagen al arrastrarla
    event.preventDefault();
    dropeo.classList.add("sombra")
});
dropeo.addEventListener('dragleave',()=> dropeo.classList.remove("sombra"));
dropeo.addEventListener('drop', (event) =>{
    //Tampoco había hecho un drag & drop jamás, tuve que buscar información en:
    //https://developer.mozilla.org/en-US/docs/Web/API/HTML_Drag_and_Drop_API/File_drag_and_drop
    event.preventDefault();
    dropeo.classList.remove("sombra");
    const file = event.dataTransfer.files[0];
    if(/.\.jpg$/i.test(file.name)){
        //Data transfer es una interfaz de la api drag&drop que gestiona los elementos que caen en la "dropzone"
        const dataTransfer = new DataTransfer();
        dataTransfer.items.add(file)
        fotoCarnet.files = dataTransfer.files;
        fotoCarnet.dispatchEvent(new Event( 'change'));
    }
});
form.addEventListener('submit', (event) => {
    //Prevenimos el evento por defecto para que no se reinicie al instante
    event.preventDefault();
    if(validaciones()){
        let seleccionado = tiposSeguro[seguro.value].nombre;//Guardamos el evento seleccionado
        tarjeta = seguro.value;//Guardamos el valor del evento seleccionado
        document.getElementsByTagName("body")[0].classList.add("wait");
        for(let i = 0 ; i < tiposSeguro.length ; i++){
            segurosDisponibles.push({
                nombre: tiposSeguro[i].nombre,
                precio: calcularSeguro(calcularEdad(new Date(), new Date(fecha.value)), calcularEdad(new Date(), new Date(fechaMatriculacion.value)), tipo.value, i, calcularEdad(new Date(), new Date(fechaMatriculacion.value))),
                imagen :tiposSeguro[i].imagen
            })
        }
        /**
         * Normalmente, al rellenar un formulario siempre tarda unos segundos a procesar toda la información,
         * he intentado recrear esto con timeout y aplicando estilos con clases que cambie dinámicamente desde js,
         * utilizando timeouts para esto. La pantalla se pone en verde, haciendo saber al usuario que todo se ha
         * realizado correctamente y, además, durante este tiempo el cursor será el clasico circulo azul de carga
         * */
        form.classList.add("bien");
        setTimeout(() => {
            form.classList.add("transition");
            form.classList.remove("bien");
        }, 500);
        setTimeout(() => {
            form.classList.remove("transition");
            document.getElementsByTagName("body")[0].classList.remove("wait");
            document.getElementById("ofertas").classList.remove("oculto");
            form.classList.add("oculto");
            /**
             * Solo se verá 1 tarjeta a la vez, con 2 flechas a los laterales para cambiar entre ellas.
             * Ya que estas flechas tienen asociado un evento onclick. Además, los eventos de teclado
             * ArrowLeft y ArrowRight, también cambiarán la tarjeta
             * */
            crearTarjeta(tarjeta,seleccionado);
            const left = document.getElementById("left");
            const right = document.getElementById("right")
            left.addEventListener('click',(event) => {
                event.target.classList.add("clicado");
                setTimeout(()=>event.target.classList.remove("clicado"), 750)
                tarjeta--;
                if(tarjeta < 0) tarjeta = segurosDisponibles.length - 1;
                crearTarjeta(tarjeta, seleccionado);
            })
            document.addEventListener('keyup', (event) => {
                if(event.key === "ArrowLeft"){
                    tarjeta--;
                    if(tarjeta < 0) tarjeta = segurosDisponibles.length - 1;
                    crearTarjeta(tarjeta,seleccionado);
                }
                if(event.key === "ArrowRight"){
                    tarjeta++;
                    if(tarjeta > segurosDisponibles.length - 1) tarjeta = 0;
                    crearTarjeta(tarjeta,seleccionado);
                }
            })
            right.addEventListener('click', (event) => {
                event.target.classList.add("clicado");
                setTimeout(()=>event.target.classList.remove("clicado"), 750)
                tarjeta++;
                if(tarjeta > segurosDisponibles.length - 1) tarjeta = 0;
                crearTarjeta(tarjeta, seleccionado);
            });
        }, 1000);
        //Finalmente, ya que no lo hará por defecto, provocamos el reset
        form.reset();
    }
});
