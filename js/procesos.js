function name1(){
    let nombre1 = document.getElementById("name").value;

    let form1 = document.getElementById("form1");
    let nombres = document.getElementById("nombre1");

    form1.style.display = "none"
    nombres.style.display = "flex"
    document.getElementById("nombre1").textContent = nombre1; 
}
function name2(){
    let nombre2 = document.getElementById("name2").value;
    let form2 = document.getElementById("form2");
    let nombres = document.getElementById("nombre2");
    document.getElementById("nombre2").textContent = nombre2; 
    form2.style.display = "none"
    nombres.style.display = "flex"
}
function procesarNombres()
{
    event.preventDefault()
    name1();
    name2();
    document.getElementsByTagName("article")[0].style.display = "flex";
}
function acabar(){
    document.getElementById("casillaFinal").style.display = "none";
}
function newGame(){
    location.reload();
}
function empezar(){
    const boton = document.getElementById("boton")
    boton.click()
}
function activarIA(){
    const boton2 = document.getElementById("ia")
    boton2.click()
}
function reiniciar(){
    setInterval  ( function(){
        const boton3 = document.getElementById("newGame")
        boton3.click()
    }, 4000)
}
function stop(){
    clearInterval(intervalo)
}
