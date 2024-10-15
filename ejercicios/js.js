/**
 * Francesc Sorà Quevedo
 * Desarrollo en Entorno Cliente
 * IFC 33-B
*/
//Se que dijiste que hicieramos algo sencillo pero no he podido evitar complicarme un poco, te pongo un comentario donde empiezan los ejercicios
document.addEventListener('click', function(evento){//Gestión de los botones
    const elementoClicado = evento.target;
    const id = elementoClicado.id;
    if(elementoClicado.classList.contains("boton")){//Gestión botones del menu
        reiniciarEjercicios();//Esconde todos los ejercicios con display: none
        let numeroEjercicio = id.slice(5);//Quitamos la palabras boton y dejamos el numero
        const ejercicio = document.getElementById(`ejercicio${numeroEjercicio}`);
        mostrarEjercicio(ejercicio);//Muestra el ejercicio asociado al botón seleccionado con display:flex
        //De esta manera conseguimos que solo se vea un ejercicio
    }
    if(elementoClicado.classList.contains("botonEjercicio")){//Gestión de submit
        let resultado = elementoClicado.parentNode.nextElementSibling
        //Por la estructura de mi HTML, el siguiente hermano del padre de los botones de Submit es donde se encuentra el div que muestra el resultado en todos los casos
        id === "botonEjercicio1" ? ejercicio1(resultado) :
        id === "botonEjercicio2" ? ejercicio2(resultado) :
        id === "botonEjercicio3" ? ejercicio3(resultado) :
        id === "botonEjercicio4" ? ejercicio4(resultado) :
        id === "botonEjercicio5" ? ejercicio5(resultado) :
        id === "botonEjercicio6" ? ejercicio6(resultado) :
        id === "botonEjercicio7" ? ejercicio7(resultado) :
        id === "botonEjercicio8" ? ejercicio8(resultado) :
        id === "botonEjercicio9" ? ejercicio9(resultado) :
        id === "botonEjercicio10" ? ejercicio10(resultado) :
        null;//Preguntar sobre esto
        elementoClicado.parentNode.reset();//Reinicio del formulario al hacer submit
    }
})
function mostrarEjercicio(ejercicio){
    if(ejercicio.classList.contains("oculto")){
        ejercicio.classList.remove("oculto")//display none
        ejercicio.classList.add("mostrado")//display flex
    }
}
function reiniciarEjercicios(){
    const ejercicios = document.getElementsByClassName("ejercicio");
    const resultados = document.getElementsByClassName("resultado")
    for(let i = 0 ; i < ejercicios.length ; i++){
        if(ejercicios[i].classList.contains("mostrado")){
            ejercicios[i].classList.remove("mostrado");
            ejercicios[i].classList.add("oculto");

            if(resultados[i] !== ""){
                resultados[i].innerText = ""//Al cambiar de ejercicios reiniciamos los resultados para que quede en blanco
            }
            ejercicios[i].childNodes[3].reset();//Reinicio del formulario al cambiar de ejercicio
            //En la linea anterior tuve que hacer un log para asegurarme de que elemento concreto de todos los ejercicios era el form
        }
    }
}


//Aqui empiezan los ejercicios
function ejercicio1(resultado){
    const horas = document.getElementById("horas").value;
    const precio = document.getElementById("precio").value;
    const precioTotal = horas * precio;

    if(horas > 0 
        && precio > 0){
        resultado.textContent = `El salario por ${horas} horas a ${precio} por hora es de ${precioTotal} euros.`
    } else{
        resultado.textContent = "No son opciones validas"
    }

}
function ejercicio2(resultado){
    const peso = document.getElementById("peso").value;
    const altura = document.getElementById("altura").value;
    const imc = peso / ((altura / 100) ** 2);

    resultado.innerText = `Tu IMC es ${imc}`;
    if(peso > 0 
        && altura > 0){
            resultado.innerText = `Tu IMC es ${imc.toFixed(2)}`;
    } else{
        resultado.textContent = "No son opciones validas"
    }
}
function ejercicio3(resultado){
    const numerador = document.getElementById("numerador").value;
    const denominador = document.getElementById("denominador").value;

    if(numerador !== "" && denominador !== ""){
        if(denominador == 0){
            resultado.innerText = "No puedo dividir entre 0";
        } else {
            resultado.innerText = `El resultado es: ${parseInt(numerador / denominador)}
            y el resto es ${numerador % denominador}`
        }    
    } else{
        resultado.textContent = "No son opciones validas"
    }
    
}
function ejercicio4(resultado){
    let cantidad = parseFloat(document.getElementById("cantidad").value);
    const interes = parseFloat(document.getElementById("interes").value);
    const años = parseFloat(document.getElementById("años").value);

    for(let i = 0 ; i < años ; i++){
        cantidad += cantidad * (interes/100);
    }
    if(cantidad > 0
        && (años > 0)){
            resultado.innerText = `El beneficio final será de ${cantidad.toFixed(2)}`;
    }else{
        resultado.textContent = "No son opciones validas"
    }
    
}
function ejercicio5(resultado){
    const pesoPayaso = 112;
    const pesoMuñeca = 75;
    const payasos = document.getElementById("payasos").value;
    const muñecas = document.getElementById("muñecas").value;
    const pesoTotal = (pesoPayaso * payasos) + (pesoMuñeca * muñecas);

    if(payasos > 0
        && muñecas > 0
    ){
        resultado.innerText = `El peso total para ${payasos} payasos y ${muñecas} muñecas es de ${pesoTotal} gramos.`
    } else {
        resultado.textContent = "No son opciones validas"
    }
    
}
function ejercicio6(resultado){
    const precioBarra = 3.49;
    const precioBarraDiaAnterior = precioBarra * 0.6;

    const barrasDiaAnterior = parseFloat(document.getElementById("barrasDiaAnterior").value);
    const barrasTotales = parseFloat(document.getElementById("barras").value);

    const barrasDelDia = barrasTotales - barrasDiaAnterior;

    const beneficioBarrasDiaAnterior = barrasDiaAnterior * precioBarraDiaAnterior;
    const beneficioBarrasDia = barrasDelDia * precioBarra;
    const beneficioBarrasTotales = beneficioBarrasDiaAnterior + beneficioBarrasDia;
    const beneficioSiTodoDia = barrasTotales * precioBarra;

    if((barrasDiaAnterior > 0)
        && (barrasTotales > 0)
    ){
        if(barrasDiaAnterior > barrasTotales){
            resultado.innerText = `No se pueden vender mas barras del dia anterior que totales`;
        } else{
            resultado.innerText = `Se han vendido ${barrasDiaAnterior} barras del dia anterior y ${barrasDelDia} barras del dia. 
            El beneficio ha sido de ${beneficioBarrasTotales.toFixed(2)}. Si todas las barras hubieran sido del dia el beneficio hubiera sido ${beneficioSiTodoDia.toFixed(2)}`;
        }
    } else {
        resultado.textContent = "No son opciones validas"
    }
    
}
function ejercicio7(resultado){
    const primeraPregunta = document.getElementById("primeraPregunta").value;
    const segundaPregunta = document.getElementById("segundaPregunta").value;
    const terceraPregunta = document.getElementById("terceraPregunta").value;

    if(primeraPregunta === "si"
        && segundaPregunta === "no"
        && terceraPregunta ==="si"){
        resultado.innerText = "Enhorabuena!! Acertaste todas las preguntas!!"
    } else{
        if(primeraPregunta !== "si"){
            if(segundaPregunta !== "no"){
                if(terceraPregunta !== "si"){
                    resultado.innerText = "Fallaste todas las preguntas!"
                }else{
                    resultado.innerText = "Fallaste la primera y la segunda pregunta!"
                }
            } else if(terceraPregunta !== "si"){
                resultado.innerText = "Fallaste la primera y la tercera pregunta!"
            } else{
                resultado.innerText = "Fallaste la primera pregunta!"
            }
        } else if(segundaPregunta !== "no"){
            if(terceraPregunta !== "si"){
                resultado.innerText = "Fallaste la segunda y la tercera pregunta!"
            } else{
                resultado.innerText = "Fallaste la segunda pregunta!"
            }
        } else if(terceraPregunta !== "si"){
            resultado.innerText = "Fallaste la tercera pregunta!"
        }
    }
}
function ejercicio8(resultado){
    const nombreCorrecto = "francesc"
    const passCorrecta = "sora"
    const nombre = document.getElementById("nameEjercicio8").value.toLowerCase()//De esta manera lo tomará como correcto independientemente de si escribe alguna mayuscula
    const password = document.getElementById("passwordEjercicio8").value

    if(nombre === nombreCorrecto
        && password === passCorrecta
    ){
        resultado.innerText = "Autenticación exitosa"
    } else{
        resultado.innerText = "Usuario o contraseña equivocados"
    }
}
function ejercicio9(resultado){
    const nota = document.getElementById("nota").value;

    if(nota !== "" 
        && (nota > 0 && nota < 11)){
        if(nota < 5){
            resultado.innerText = "No te ha gustado el ejercicio"
        }else if(nota < 7){
            resultado.innerText = "Te ha dado igual el ejercicio"
        }else if(nota < 10){
            resultado.innerText = "Te ha gustado el ejercicio"
        }else{
            resultado.innerText = "Te ha encantado el ejercicio"
        }
        
    }else{
        resultado.innerText = "Escribe una nota correcta. Entre el 1 y el 10 "
    }
}
function ejercicio10(resultado){
    const nota = document.getElementById("notaEjercicio10").value;

    if(nota !== "" 
        && (nota >= 0 && nota < 11)){
        if(nota < 6){
            resultado.innerText = "Reprobado"
        }else if(nota < 8){
            resultado.innerText = "Aprobado"
        }else if(nota < 10){
            resultado.innerText = "¡Muy bien!"
        }else{
            resultado.innerText = "¡Excelente!"
        }
    }else{
        resultado.innerText = "Escribe una nota correcta. Entre el 0 y el 10."
    }
}