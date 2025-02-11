addEventListener('DOMContentLoaded', async () => {
    const h1 = document.createElement('h1');
    h1.innerText = '¿Un café?';
    h1.classList.add('cafes');
    document.body.insertAdjacentElement('afterbegin', h1);
    const table = document.createElement('div');
    table.classList.add('table');
    h1.insertAdjacentElement('afterend', table);
    fetch("cafes.json")
        .then(response => response.json())
        .then(json => {
            for(let i = 0; i < 9; i++) {
                const div = document.createElement('div');
                div.classList.add('tarjeta');
                table.insertAdjacentElement('afterbegin', div);
                const h4 = document.createElement('h4');
                h4.innerText = json.cafes[i].nombre;
                div.insertAdjacentElement('beforeend', h4);
                const descripcion = document.createElement('small');
                descripcion.innerText = json.cafes[i].descripcion;
                div.insertAdjacentElement('beforeend', descripcion);
                const precio = document.createElement('p');
                precio.innerText = json.cafes[i].precio
                div.insertAdjacentElement('beforeend', precio);
                fetch("https://corsproxy.io/https://coffee.alexflipnote.dev/random.json")
                    .then(response => response.json())
                    .then(data => {
                        console.log(data);
                        const img = document.createElement("img");
                        img.src = data.file;
                        div.insertAdjacentElement("beforeend", img);
                    }).catch(error => console.log(error))
            }
        })
})
