class Pieza{
    //Atributos requeridos por el ejercicio
    /*Decir que con estos atributos, al rotar una pieza, esta se quedara rotada para la próxima vez que aparezca. Se podría evitar con un atributo "formaOriginal" y
     haciendo que la forma vuelva al original cada vez, pero me parece más divertido que la siguiente vez que aparezca la misma pieza sea en la posición que se quedó la última vez
    */
   constructor(nombre, forma, probabilidad, color){
        this.nombre = nombre;
        this.forma = forma;
        this.probabilidad = probabilidad;
        this.color = color;
    }
    //Métodos que utilizo para rotar la pieza
    girarPieza() {
        /**
         * Creo un nuevo array para guardar la forma que deberá tomar al rotar
         * la nueva forma debera tener en el el horizontal la misma longitud que tenia al antigua en el vertical y viceversa
         * voy colocando, desde la primera fila ultima posicion, luego segunda fila ultima posicion, y pasando luego a primera fila penultima posicion...
         * de esta forma la pieza va rotando a la derecha
         */
        let nuevaForma = [];
        
        for(let i = this.forma[0].length - 1 ; i >= 0 ; i--){
            let nuevaFila = [];
            for(let j = 0 ; j < this.forma.length ; j++){
                nuevaFila.push(this.forma[j][i]);
            }
            nuevaForma.push(nuevaFila);
        }
        this.forma = nuevaForma
    }
    validarGiro(tablero, x, y){
        /**
         * En este método me aseguro de que el giro de la pieza sea válido, es decir, que no quede en una posicion fuera del tablero ninguna casilla de la pieza
         * ni en ningu lugar ya ocupado por otra pieza caida
         */
        const yInicial = y;//guardo la posición inicial de la y, por si luego tengo que modificar la original para compensar el cambio de longitud horizontal de la pieza al rotarla
        const ancho1 = this.forma[0].length;//longitud horizontal forma original
        const piezaOriginal = this.forma;//Array de la forma original, para retonarlo en caso de que el movimiento sea invalido
        this.girarPieza();//se rota la pieza
        const ancho2 = this.forma[0].length;//longitud horizontal forma rotada
        if(ancho1 < ancho2 && yInicial == 8) y--;//caso que me daba problemas, quedandose la pieza encaja a la derecha al rotar, por eso le resto 1 para meterlo dentro del tablero;

        for(let i = 0 ; i < this.forma.length ; i++){
            for(let j = 0 ; j < this.forma[i].length ; j++){//recorremos el array de la forma
                if(this.forma[i][j] === 1){
                    /**
                     * si el array de la forma indica que esa casilla tiene parte de la pieza la relacionaremos con el tablero sumando la posicion del tablero(x) a 
                     * i(posicion inspeccionada dentro de la pieza) y lo mismo en el otro eje(y + j), en el primer caso le sumo 1 porque donde se reflejara el cambio es en el siguiente intervalo
                     * de actualizar, por tanto no tengo que comprobar el eje vertical en que se encuentra la pieza si no el siguiente. En el caso de buscar si es undefined no se lo añado porque
                     * si es undefined para esta fila lo sera para la siguiente
                     * */
                    try{
                        /**
                         * El try catch lo he puesto porque me saltaba un error al darle a la "w" en el tiempo en que caia una pieza hasta que salia la siguiente, funcionaba a la perfeccion sin controlar
                         * el error, pero no veo porque no hacerlo si me he dado cuenta de que se produce el error
                         */
                        if(tablero[i + x] === undefined) throw new Error();
                        if(tablero[i + x + 1][j + y] == 1 || (tablero[i + x][j + y] == undefined)) {
                            //Si entra aqui o al catch el movimiento no seria valido
                            return piezaOriginal;
                        }
                    }catch(error){
                        return piezaOriginal;
                    }
                }
            }
        }
        //Si llega aquí el movimiento és válido
        return this.forma;
    }
}

const piezas = [
    new Pieza("C", [[1,1,1], [1,0,1]], 0.2, "red"),
    new Pieza("S", [[1,1], [1,1]], 0.2, "blue"),//s de square
    new Pieza("L", [[1,0], [1,0], [1,1]] , 0.1, "green"),
    new Pieza("-L", [[0,1],[0,1],[1,1]], 0.1, "lightcoral"),//L hacia la derecha
    new Pieza("T", [[1,1,1], [0,1,0], [0,1,0]], 0.2, "yellow"),
    new Pieza("Z", [[1,1,0], [0,1,1]], 0.1, "purple"),
    new Pieza("-Z", [[0,1,1],[1,1,0]],0.1, "cyan")//Z hacia la derecha
]
//Conjunto de variables iniciales
const canvas = document.getElementById("tetris");//Lienzo donde se ejecutara el juego principal
let juego;//variable que utilizaré para el intervalo
const lienzo = canvas.getContext("2d");
const canvasSiguiente = document.getElementById("siguiente");//Lienzo donde mostraremos la siguiente pieza. 90 x 90 porque es lo maximo para mostrar las piezas
const lienzoSiguiente = canvasSiguiente.getContext("2d");
const filas = 20;//height canvas = 600, 20 filas /600 px = 30px por fila(tamañoCelda)
const columnas = 10;//width canvas = 300, 10 columnas / 300 px = 30px por columna(tamañoCelda)
const tamañoCelda = 30;//tamaño en pixeles de la pieza
let tablero = inicializarTablero();//el tablero se inicializa con todo 0
const tableroSiguiente = [[0,0,0], [0,0,0], [0,0,0]];
let piezaActual = generarPieza();//se elige la siguiente pieza que va a salir
let siguientePieza = generarPieza();//Dejo generada la siguiente pieza
let x = -1;//Inicializacion variable vertical
let y = parseInt(tablero[0].length / 2);//Inicializacion variable horizontal
let puntuacion = 0;//puntuacion inicial
let proximoCambio = 1000;//Umbral de puntos necesarios para cambiar la velocidad
let velocidad = 500;//velocidad inicial
lienzo.strokeStyle = "white";//Color de la cuadrícula
lienzoSiguiente.strokeStyle = "white";
let puntuacionDiv = document.getElementById("puntuacion");
puntuacionDiv.innerText = "Puntos: " + puntuacion;//Para enseñar la puntuacion inicial
//variables con botones y funcionalidad que he añadido y que ire explicando mas adelante
const botonPausa = document.getElementById("pausa");
const audio = document.getElementById("audio");
const botonAudio = document.getElementById("musica");
let musicaOn = false;
//Array con las 2 imagenes que usaré para el boton de la música 
const imagenesMusica= [
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"><!--!Font Awesome Free 6.7.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path d="M301.1 34.8C312.6 40 320 51.4 320 64l0 384c0 12.6-7.4 24-18.9 29.2s-25 3.1-34.4-5.3L131.8 352 64 352c-35.3 0-64-28.7-64-64l0-64c0-35.3 28.7-64 64-64l67.8 0L266.7 40.1c9.4-8.4 22.9-10.4 34.4-5.3zM425 167l55 55 55-55c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9l-55 55 55 55c9.4 9.4 9.4 24.6 0 33.9s-24.6 9.4-33.9 0l-55-55-55 55c-9.4 9.4-24.6 9.4-33.9 0s-9.4-24.6 0-33.9l55-55-55-55c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.4 33.9 0z"/></svg>',
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><!--!Font Awesome Free 6.7.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path d="M499.1 6.3c8.1 6 12.9 15.6 12.9 25.7l0 72 0 264c0 44.2-43 80-96 80s-96-35.8-96-80s43-80 96-80c11.2 0 22 1.6 32 4.6L448 147 192 223.8 192 432c0 44.2-43 80-96 80s-96-35.8-96-80s43-80 96-80c11.2 0 22 1.6 32 4.6L128 200l0-72c0-14.1 9.3-26.6 22.8-30.7l320-96c9.7-2.9 20.2-1.1 28.3 5z"/></svg>'
];

//Las siguiente 3 lineas son la primera ejecución del juego, nada mas abrirse
dibujarTablero();
limpiarSiguiente();

function generarPieza(){
    //Elige cual sera la siguiente pieza que sale, tiene en cuenta la probabilidad de que salga cada pieza
    const resultado = Math.random()
    let sumatorio = 0;
    for(let i = 0 ; i < piezas.length ; i++){
        //pieza0: piezas[0].probabilidad(0.2) + 0 = 0.2
        //pieza1: piezas[1].probabilidad(0.2) + 0.2(lo acumulado de piezas anteriores) = 0.4
        //pieza2: piezas[2].probabilidad(0.1) + 0.4 = 0.5
        //pieza3: piezas[3].probabilidad(0.1) + 0.5 = 0.6
        //pieza4: piezas[4].probabilidad(0.2) + 0.6 = 0.8
        //pieza5: piezas[5].probabilidad(0.1) + 0.8 = 0.9
        //pieza6: piezas[6].probabilidad(0.1) + 0.9 = 1
        //Seguiria funcionando dando igual la cantidad de tipos de fichas posibles, siempre que ajustaramos la probabilidad para que sume 1
        if(resultado < piezas[i].probabilidad + sumatorio){
            return piezas[i];
        }
        sumatorio += piezas[i].probabilidad
    }
}
function dibujarSiguiente(pieza){
    /**dibuja la pieza en el canvas siguiente, primero lo limpia y luego dibuja la nueva pieza */
    limpiarSiguiente();
    for(let i = 0 ; i < pieza.forma.length ; i++){
        for(let j = 0 ; j < pieza.forma[0].length ; j++){
            if(pieza.forma[i][j] == 1){
                lienzoSiguiente.fillStyle = pieza.color;
                lienzoSiguiente.fillRect(j * tamañoCelda, i * tamañoCelda ,tamañoCelda, tamañoCelda);
                lienzoSiguiente.strokeRect(j * tamañoCelda, i * tamañoCelda ,tamañoCelda, tamañoCelda);
            }
        }
    }
}
function limpiarSiguiente(){
    //Limpia el canvas de la siguiente pieza
    for(let i = 0 ; i < tableroSiguiente.length ; i++){
        for(let j = 0 ; j < tableroSiguiente[i].length ; j++){
            lienzoSiguiente.fillStyle = "black";
            lienzoSiguiente.fillRect(j * tamañoCelda,i * tamañoCelda,tamañoCelda,tamañoCelda);
            lienzoSiguiente.strokeRect(j * tamañoCelda, i * tamañoCelda ,tamañoCelda, tamañoCelda);
        }
    }
}
function jugar(){
    juego = setInterval(() => actualizar(), velocidad);//Se inicializa o reanuda el juego
}
function dibujarTablero(){
    //reinicia el tablero poniendo todo lo que no sean fichas anteriormente ya caidas como espacios vacios, para permitir dibujar el siguiente intervalo sin que se acumule con el anterior
    for(i = 0 ; i < tablero.length ; i++){
        for(j = 0 ; j < tablero[i].length ; j++){
            if(tablero[i][j] != 1){
                lienzo.fillStyle = "black";
                lienzo.fillRect(j * tamañoCelda, i * tamañoCelda, tamañoCelda, tamañoCelda);
                lienzo.strokeRect(j * tamañoCelda, i * tamañoCelda, tamañoCelda, tamañoCelda)
            } else{
                lienzo.fillStyle = "grey"
                lienzo.fillRect(j * tamañoCelda, i * tamañoCelda, tamañoCelda, tamañoCelda);
                lienzo.strokeRect(j * tamañoCelda, i * tamañoCelda, tamañoCelda, tamañoCelda    )
            }
            
        }
    }
}

function dibujoPieza(pieza, x, y){
    //dibuja la situacion de la pieza en la presente iteracion del intervalo
    for(let i = pieza.forma.length - 1 ; i >= 0 ; i--){
        if(i < 0) continue;
        for(let j = 0 ; j < pieza.forma[i].length ; j++){
            if(pieza.forma[i][j] == 1){                
                lienzo.fillStyle = pieza.color;
                lienzo.fillRect((j + y) * tamañoCelda, (i + x) * tamañoCelda, tamañoCelda, tamañoCelda);
                lienzo.strokeRect((j + y) * tamañoCelda, (i + x)* tamañoCelda, tamañoCelda, tamañoCelda)
            }
        }
    }
}
function chequearColisiones(pieza, x, y){
    for(let i = 0 ; i < pieza.forma.length;i++){
       
        for(let j = 0 ; j < pieza.forma[i].length ; j++){
            //usando la misma logica de x + i, y + j usada anteriormente, detectamos si la posicion en que se encuentra la pieza es 1 en el tablero o undefined
            try{
                if(pieza.forma[i][j] == 1){
                    if(tablero[x + i + 1] === undefined) throw new Error(); 
                
                    if(tablero[x + i + 1][y + j] == 1){
                        return true
                    }
                }
            }catch(error){
                return true
            }
            
        }
    }
    return false;
}
function chequearColisionesLaterales(pieza, x, y, lado){
    //La variable lado hace la función de bandera, en caso de ser true compruebo el lado de la derecha, en el caso contra la izquierda.
    //Por tanto lo voy a llamar como true a la hora de pulsar la "D" y como false a la hora de pulsar la "A"
    //Si no lo hacia tenia el problema de que queria comprobar ambos lados siempre, y al estar en un extremo no dejaba mover al otro
    for(let i = 0 ; i < pieza.forma.length;i++){
       
        for(let j = 0 ; j < pieza.forma[i].length ; j++){
            if(pieza.forma[i][j] == 1){
                    
                if(lado ? y  + j + 1 >= tablero[0].length : y + j - 1 < 0) return true; 
                
                if(lado ?tablero[x + i + 1][y + j + 1] == 1 : tablero[x + i + 1][y + j - 1] == 1){
                    return true
                }

            }
        }
    }
    return false;
}
function eliminarLinea(){
    //Comprobamos si alguna linea tiene todos sus elementos en 1, y en ese caso eliminaos la linea y añadimos otra de 0's con un unshift
    let lineasEliminadas = 0;
    for(let i = 0 ; i < tablero.length ; i++){
        for(let j = 0 ; j < tablero[i].length ; j++){
            if(tablero[i][j] != 1){
                break;
            }
            if(j >= tablero[i].length - 1){
                tablero.splice(i, 1)
                i--;
                lineasEliminadas++;
                nuevaFila = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
                tablero.unshift(nuevaFila);
                
            }
        }
    }
    //Sumamos una cantidad de puntos por cada linea eliminada
    if(lineasEliminadas > 0){
        puntuacion += lineasEliminadas * 350;
        puntuacionDiv.innerText = "Puntos: " + puntuacion;
    }
    //En el proximo condicional comprobamos la cantidad de puntos para hacer que cada 1000 puntos la velocidad se reduzca en 20
    if(puntuacion >= proximoCambio){
        let diferencia = 0;
        while(puntuacion >= proximoCambio){
            proximoCambio *= 2;//Aumentamos el proximoCambio para que cada vez sea mas dificil llegar, lo hacemos en un while por si haces muchas lineas de golpe, es necesaria que vaya incrementando en consonancia y no todos los aumentos sin cambiar el proximoCambio
            diferencia++;
        }
        while(diferencia > 0){
            velocidad /= 1.05;
            diferencia--;
        }
        clearInterval(juego)
        jugar();
    }
}
function insertarPieza(pieza, x, y){
    //inserta la pieza en el tablero convirtiéndola en 1 en el tablero
    for (let i = 0; i < pieza.forma.length; i++) {
        for (let j = 0; j < pieza.forma[i].length; j++) {
            if (pieza.forma[i][j] == 1) {
                tablero[x + i][y + j - 1] = 1;
            }
        }
    }
    eliminarLinea()
}


function actualizar(){
    //Bucle principal del juego que se ejecuta cada x tiempo, en funcion de la velocidad actual
    dibujarTablero();//Dibujamos el tablero 
    x++;
    if(finalizar(piezaActual, x, y)){//Si se cumplen las condiciones para finalizar la partida
        botonPausa.innerText = "Reiniciar";//El boton de pausa servirá para reiniciar
        puntuacionDiv.innerText = `Se acabó la partida!\n Conseguiste ${puntuacion} puntos!`;//El antiguo mensaje con los puntos ahora nos dirá la puntuación obtenida
        puntuacionDiv.style.backgroundColor = "yellow";
        puntuacionDiv.style.color = "black";
        tablero = tableroFinal();//El tablero se actualizará para mostrar el mensaje de game over
        dibujarTablero()
        clearInterval(juego);//Se parara el intervalo
        limpiarSiguiente();
        return - 1; //De esta forma evito que se dibuje una nueva pieza en el momento en que termina la partida
    }
    if(y + piezaActual.forma[0].length > 19){
        y--;//Evitamos que la pieza caiga por debajo del canvas
    }
    dibujoPieza(piezaActual, x, y -(parseInt(piezaActual.forma.length / 2)));//dibujamos la pieza en el canvas
    
    if(chequearColisiones(piezaActual, x, y - 1)){//Comprobamos si hay colision
        insertarPieza(piezaActual, x, y)//En caso de colision insertamos la pieza
        x = -1;//Reiniciamos el valor de x para la nueva pieza
        piezaActual = siguientePieza;//Renovamos la pieza a partir de la pieza que habiamos generado anteriormente para que fuera la siguiente
        siguientePieza = generarPieza();//Generamos una nueva pieza
        dibujarSiguiente(siguientePieza)//Redibujamos la siguiente pieza
        if(piezaActual.forma[0].length === 3 && y === 9) y--;//Corregimos un pequeño error al salir una pieza de 3 de longitud horizontal despues de caer una de longitud horizontal 2
    }    
}


function inicializarTablero(){
    //devuelve un array con las dimensiones que queremos lleno de 0's
    let array = [];
    for(let index = 0 ; index < filas ; index++){
        let fila = [];
        for(let jindex = 0 ; jindex < columnas ; jindex++){
            fila.push(0);
        }
        array.push(fila);
    }
    return array;
}

function finalizar(pieza, x, y){
    //Comprobamos las condiciones para finalizar si hay una casilla de la primera fila que sea 1 y hay una pieza encima de ella
    for(let i = 0 ; i < pieza.forma.length ; i++){
        for(let j = 0 ; j < pieza.forma[0].length ; j++){
            if(x == 0 && pieza.forma[i][j] == 1 && tablero[i + x][j + y] == 1){
                return true;
            }
        }
    }
    return false;
}
function tableroFinal(){
    //Este es el tablero que pone GAME OVER que se muestra cuando se acaba el juego
    return [
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
        [0, 0, 0, 1, 0, 0, 1, 0, 0, 0],
        [0, 1, 1, 0, 1, 0, 0, 0, 0, 1],
        [0, 1, 0, 0, 0, 0, 1, 0, 0, 0],
        [0, 1, 0, 0, 1, 0, 1, 0, 0, 1],
        [0, 0, 0, 0, 1, 0, 1, 0, 0, 0],
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
        [1, 0, 1, 0, 1, 0, 0, 0, 0, 0],
        [0, 1, 0, 0, 1, 0, 1, 0, 1, 0],
        [0, 1, 0, 0, 1, 0, 0, 0, 0, 1],
        [0, 1, 0, 0, 1, 0, 1, 0, 1, 0],
        [1, 0, 1, 1, 0, 1, 0, 0, 1, 0],
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
    ];
}
//Funcionalidades adicionales
function pausarReiniciar(){
    /**
     * En esta función tenemos la lógica del boton de pausa, que tiene 3 estados
     * Pausar: cuando el juego esta en ejecución
     * Reanudar: cuando el juego esta pausado
     * Reiniciar: cuando el juego esta terminado
     */
    if(botonPausa.innerText=="Iniciar"){
        botonPausa.innerText = "Pausa";
        dibujarSiguiente(siguientePieza);
        jugar();
    }else if(botonPausa.innerText == "Pausa"){//Pausar
        botonPausa.innerText = "Reanudar";
        clearInterval(juego);
    }else if(botonPausa.innerText == "Reiniciar"){//Reiniciar
        //En esta función lo que haga es llevar todas las variables a los valores de inicio y volver a ejecutar el juego
        tablero = inicializarTablero();
        piezaActual = generarPieza();
        siguientePieza = generarPieza();
        x = -1;        
        y = parseInt(tablero[0].length / 2);
        puntuacion = 0;
        velocidad = 500;
        proximoCambio = 1000;
        dibujarSiguiente(siguientePieza);
        jugar();
        botonPausa.innerText = "Pausa";
        puntuacionDiv.innerText = "Puntuación: " + puntuacion;
        puntuacionDiv.style.backgroundColor = "black";
        puntuacionDiv.style.color = "white";
    }else{
        botonPausa.innerText = "Pausa";//Reanudar
        jugar();
    }
}
function pararMusica(){
    /**
     * Decidí poner un audio con la música del tetris, pero al poner autoplay
     * hay que permitir que el navegador lo reproduzca, podria añadir en la funcion aplicar css
     * algo asi como:
     * audio.play();
     * botonAudio.innerHTML = imagenesMusica[0];
     * musicaOn = !musicaOn;
     * de esta forma se podría iniciar la música nada mas iniciar la página, pero
     * he decidido no hacerlo para que no sea tan invasivo. Me he encontrado
     * con ciertos problemas si los auriculares no estaban conectados de antes
     * Reiniciando el navegador funciona
     */
    if(musicaOn){
        audio.pause();
        botonAudio.innerHTML = imagenesMusica[1];
        musicaOn = !musicaOn;
    }else{
        audio.play();
        botonAudio.innerHTML = imagenesMusica[0];
        musicaOn = !musicaOn;
    }
}
function aplicarCss(){
    /*
    * Como esta asignatura va de programación y no de css
    * todos los estilos adicionales he decido aplicarles con un evento onload
    */
    const body = document.getElementsByTagName("body")[0];
    const div = document.getElementById("div");
    const punt = document.getElementById("puntuacion");
    const musica = document.getElementById("musica");
    const svg = document.getElementsByTagName("svg")[0];
    body.style.backgroundImage = "url(prado-1.webp)";
    body.style.backgroundSize = "cover";
    body.style.backgroundPosition = "center";
    body.style.backgroundRepeat = "no-repeat";
    punt.style.backgroundColor = "black";
    punt.style.color = "white";
    punt.style.textAlign = "center";
    div.style.display = "flex";
    div.style.flexDirection = "column";
    div.style.width = "100%";
    div.style.height = "9vh";
    div.style.alignItems = "center";
    div.style.gap = "5%";
    musica.style.width = "3%";
    svg.style.width = "100%";
    svg.style.height = "auto";
}
function mostrarInstrucciones(){
    //Muestra en un alert todos los atajos de teclado disponibles
    //Me aseguro de que se pausa si el juego esta en ejecuciónx
    if(botonPausa.innerText != "Reiniciar"){
        if(botonPausa.innerText == "Pausa"){
            clearInterval(juego);//En este caso el juego estaría en marcha asi que lo paro mientras están abiertas las instrucciones
            alert("Instrucciones:\nI: instrucciones\nP: pausar/reanudar/reiniciar\nM: parar/reanudar música\nW: rotar la pieza\nS: avance rápido\nA: mover a la izquierda\nD: mover a la derecha");
            jugar();
        }else{
            alert("Instrucciones:\nI: instrucciones\nP: pausar/reanudar/reiniciar\nM: parar/reanudar música\nW: rotar la pieza\nS: avance rápido\nA: mover a la izquierda\nD: mover a la derecha");            
        }
    }else{
        alert("Instrucciones:\nI: instrucciones\nP: pausar/reanudar/reiniciar\nM: parar/reanudar música\nW: rotar la pieza\nS: avance rápido\nA: mover a la izquierda\nD: mover a la derecha");
    }
    
}
document.addEventListener("keypress", (event) => {
    /**
     * Los eventos keypress se continuan sucediendo constantemente si se mantiene apretada la tecla,
     * por eso los movimientos de la pieza excepto la rotación se ejecutan con este evento.
     * Además, me asegura que el botón de pausa tengo el innerText "Pausa", ya que solamente cuando tiene
     * este estado la partida esta en marcha, de esta forma evito que se mueva la pieza(o rote, como se
     * verá más adelante) mientras la partida esta pausada.
     */
    if((event.key == "a" || event.key == "A") 
        &&!chequearColisionesLaterales(piezaActual, x, y - 1, false) && botonPausa.innerText == "Pausa"){
        y--;
    }
    if((event.key == "d" || event.key == "D") && !chequearColisionesLaterales(piezaActual, x, y -1, true) && botonPausa.innerText == "Pausa"){
        y++;
    }
    if((event.key == "s" || event.key == "S") && x < filas && botonPausa.innerText == "Pausa"){
        if(x >= 20) x = 19
        if(!chequearColisiones(piezaActual, x + 1, y - 1)){
            x++;    
        }        
    }
    dibujarTablero();
    dibujoPieza(piezaActual, x, y -(parseInt(piezaActual.forma.length / 2)));
})
document.addEventListener("keyup", (event) =>{
    /**
     * Los eventos keyup se aplicaran solamente al levantar la tecla al apretarla
     * Son eventos que no quiero que se sigan sucediendo al mantener la tecla apretada,
     * si no que se suceda solamente una vez
     */
    if(event.key == "i" || event.key == "I") mostrarInstrucciones();
    if(event.key == "m" || event.key == "M") pararMusica()
    if(event.key == "p" || event.key == "P") pausarReiniciar();
    if((event.key == "w" || event.key == "W" ) && 
        botonPausa.innerText == "Pausa"){
        piezaActual.forma = piezaActual.validarGiro(tablero, x, y - 1);
        if(piezaActual.forma[0].length === 3 && y === 9) y--;
        dibujarTablero();
        dibujoPieza(piezaActual, x, y -(parseInt(piezaActual.forma.length / 2)));
    }
})
addEventListener("load", () => aplicarCss())//El evento load no necesita que le pongas document porque sucede directamente desde el objeto window, el cual se aplica por defecto, seria correcto tambien hacer "window.addEventListener()" pero no es necesario
botonAudio.addEventListener('click', () => pararMusica());//eventos para parar o reanudar la musica
botonPausa.addEventListener('click', () => pausarReiniciar());//evento para pausar, reanudar, reiniciar
document.getElementById("instrucciones").addEventListener('click', () => mostrarInstrucciones());//evento para mostrar instrucciones