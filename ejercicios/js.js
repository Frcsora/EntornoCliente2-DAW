function reiniciarEjercicios(){
    let ejercicios = document.getElementsByClassName("ejercicio");
    for(let i = 0 ; i < ejercicios.length ; i++){
        if(ejercicios[i].classList.contains("mostrado")){
            ejercicios[i].classList.remove("mostrado");
            ejercicios[i].classList.add("oculto");
        }
    }
}
function mostrarEjercicio1(){
    let ejercicio = document.getElementById("ejercicio1");
    if(ejercicio.classList.contains("oculto")){
        ejercicio.classList.remove("oculto")
        ejercicio.classList.add("mostrado")
    }
}
function mostrarEjercicio2(){
    let ejercicio = document.getElementById("ejercicio2");
    if(ejercicio.classList.contains("oculto")){
        ejercicio.classList.remove("oculto")
        ejercicio.classList.add("mostrado")
    }
}
function mostrarEjercicio3(){
    let ejercicio = document.getElementById("ejercicio3");
    if(ejercicio.classList.contains("oculto")){
        ejercicio.classList.remove("oculto")
        ejercicio.classList.add("mostrado")
    }
}
function mostrarEjercicio4(){
    let ejercicio = document.getElementById("ejercicio4");
    if(ejercicio.classList.contains("oculto")){
        ejercicio.classList.remove("oculto")
        ejercicio.classList.add("mostrado")
    }
}
function mostrarEjercicio5(){
    let ejercicio = document.getElementById("ejercicio5");
    if(ejercicio.classList.contains("oculto")){
        ejercicio.classList.remove("oculto")
        ejercicio.classList.add("mostrado")
    }
}
function mostrarEjercicio6(){
    let ejercicio = document.getElementById("ejercicio6");
    if(ejercicio.classList.contains("oculto")){
        ejercicio.classList.remove("oculto")
        ejercicio.classList.add("mostrado")
    }
}
function ejercicio1(){
    let horas = document.getElementById("horas").value;
    let precio = document.getElementById("precio").value;
    let precioTotal = horas * precio;
    let resultado = document.getElementById("resultado1");
    resultado.textContent = `El salario por ${horas} horas a ${precio} por hora es de ${precioTotal} euros.`
}
function ejercicio2(){
    let peso = document.getElementById("peso").value;
    let altura = document.getElementById("altura").value;
    let imc = peso / ((altura / 100) ** 2);
    let resultado = document.getElementById("resultado2");
    resultado.innerText = `Tu IMC es ${imc}`;
}
function ejercicio3(){
    let numerador = document.getElementById("numerador").value;
    let denominador = document.getElementById("denominador").value;
    let resultado = document.getElementById("resultado3");
    if(denominador == 0){
        resultado.innerText = "No puedo dividir entre 0";
    } else {
        resultado.innerText = `El resultado es: ${parseInt(numerador / denominador)}
        y el resto es ${numerador % denominador}`
    }
}
function ejercicio4(){
    let cantidad = parseFloat(document.getElementById("cantidad").value);
    let interes = parseFloat(document.getElementById("interes").value);
    let años = parseFloat(document.getElementById("años").value);
    let resultado = document.getElementById("resultado4");
    for(let i = 0 ; i < años ; i++){
        cantidad += cantidad * (interes/100);
    }
    resultado.innerText = `El beneficio final será de ${cantidad}`;
}