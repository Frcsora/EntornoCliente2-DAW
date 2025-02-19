function obtenerPedido(){
    return new Promise((resolve) => {
        setTimeout(()=>{
            const rand = Math.floor(Math.random()*100);
            resolve(rand);
        }, 1000)
    })
}
function procesarPago(pedido){
    return new Promise((resolve, reject) => {
        const rand = Math.floor(Math.random()*100);
        setTimeout(()=>{
            if(pedido % 2 === 0){
                resolve("Pago aprobado");
            }else{
                reject("Pago rechazado")
            }
        }, 2000)
    })
}
function enviarConfirmacion(){
    return new Promise((resolve) => {
        setTimeout(() =>{
            resolve("Confirmació enviada");
        },1000)
    })
}
obtenerPedido()
.then((res) => procesarPago(res))
    .then((res) =>{
    console.log(res)
    return enviarConfirmacion(res);
}).then((res)=>console.log(res))
.catch(console.error)
