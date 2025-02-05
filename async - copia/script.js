addEventListener('DOMContentLoaded',() => {
    fetchPokemonsUrl();
    let anteriores = [];
    function crearTipo(tipos){
        //Esta función crea lo necesario para iniciar la página, el menú inicial con un select y un buscador, así como la gestión del formulario
        const form = document.getElementById('form');
        form.classList.remove('none');
        form.classList.add('flexForm');
        form.id="form";
        const label = document.createElement("label");
        label.innerText = "Types:";
        label.setAttribute("for", "tipo");
        const tipoSelect = document.createElement("select");
        tipoSelect.setAttribute("id", "tipo");
        form.insertAdjacentElement('beforeend', label);
        form.insertAdjacentElement("beforeend", tipoSelect);
        const labelBuscador = document.createElement("label");
        labelBuscador.innerText = "Search:";
        labelBuscador.setAttribute("for", "buscador");
        const input = document.createElement("input");
        input.setAttribute("id", "buscador");
        input.setAttribute("type", "text");
        input.setAttribute("placeholder", "ID or name");
        form.insertAdjacentElement("beforeend", labelBuscador);
        form.insertAdjacentElement("beforeend", input);
        const boton = document.createElement("button");
        form.insertAdjacentElement("beforeend", boton);
        boton.innerText = "Search";
        boton.addEventListener("click", (event) => {
            event.preventDefault();
            guardarEnArray(anteriores);
            const div = document.createElement("div");
            div.id = "pokemons";
            div.classList.add("tarjetas", "ind");
            document.getElementById("form").insertAdjacentElement('afterend',div);
            const input = document.getElementById("buscador");
            input.value = "";
        })
        const option = document.createElement("option");
        option.innerText = "All";
        option.value = "all";
        tipoSelect.insertAdjacentElement('afterbegin', option);
        const noExisten = ["dark", "unknown", "stellar"];
        Array.from(tipos['results']).forEach((tipo) => {
            if(!noExisten.includes(tipo.name)) {
                const option = document.createElement("option");
                option.textContent = primeraMayus(tipo['name']);
                option.value = tipo['name'];
                tipoSelect.insertAdjacentElement('beforeend',option);
            }
        })
        const div = document.createElement("div");
        div.classList.add('tarjetas', "all");
        div.id = "pokemons";
        form.insertAdjacentElement('afterend',div);
        /*arrayCompleto.forEach(pokemon => {
            crearTarjeta(pokemon);
        })*/
        anteriores.push(div);
    }
    function primeraMayus(str){
        return str.charAt(0).toUpperCase() + str.slice(1);
    }
    function crearTarjeta(pokemon){
        //Esta función sirve para crear las tarjetas con los pokemon que podemos ver
        const div = document.createElement("div");
        div.classList.add('tarjeta', pokemon.name);
        div.style.order = pokemon['id'];
        document.getElementById("pokemons").insertAdjacentElement('beforeend', div);
        const h3 = document.createElement("h3");
        h3.innerText = primeraMayus(pokemon['name']);
        div.insertAdjacentElement('beforeend', h3);
        const img = document.createElement("img");
        img.src = pokemon.sprites.other.dream_world.front_default;
        img.addEventListener('click', (event) => {
            //Al apretar en la imagen del pokemon veremos más información sobre el mismo
            const pokemonSelected = arrayCompleto.find(pokemon => event.target.closest(".tarjeta").classList[1] === pokemon.name);
            crearInfoPokemon(pokemonSelected);
        });
        div.insertAdjacentElement('beforeend', img);
        const br = document.createElement("br");
        div.insertAdjacentElement('beforeend', br);
        const small = document.createElement("small");
        small.innerText = pokemon['id'];
        div.insertAdjacentElement('beforeend', small);
    }
    function gestionBack(anteriores){
        //Esta función controla la existencia del boton para ir atras
        if(!document.getElementById("back")){
            const button = document.createElement("button");
            button.innerText = "Back";
            button.id = "back";
            button.classList.add("back");
            document.getElementById("pokemons").insertAdjacentElement('beforebegin', button);
            button.addEventListener("click", ()=>{
                const ultimo = anteriores.pop();
                if(anteriores.length < 1) anteriores.push(ultimo);
                document.getElementById("pokemons").remove();
                if(ultimo) document.getElementById("form").insertAdjacentElement('afterend',ultimo.div);
                if(anteriores.length <= 1) {
                    button.remove();
                    document.getElementById("tipo").value = "all";
                }else{
                    document.getElementById("tipo").value = ultimo.type
                }
            });
        }
    }
    function crearInfoPokemon(pokemon){
        //Esta función crea la tarjeta con toda la información del pokemon que se ve cuando clicas encima de la imagen de un pokemon
        guardarEnArray(anteriores);
        const div = document.createElement("div");
        div.classList.add('tarjetasInfo', "info");
        div.id = "pokemons";
        document.getElementById("form").insertAdjacentElement('afterend', div);
        const h3 = document.createElement("h3");
        h3.innerText = pokemon['id'];
        div.insertAdjacentElement('beforeend', h3);
        const name = document.createElement("h2");
        name.innerText = primeraMayus(pokemon['name']);
        div.insertAdjacentElement('beforeend', name);
        const img = document.createElement("img");
        img.src = pokemon.sprites.other.dream_world.front_default;
        div.insertAdjacentElement("beforeend", img);
        const listas = document.createElement('div');
        listas.classList.add('listas');
        div.insertAdjacentElement('beforeend', listas);
        const listaAparte = document.createElement("div");
        listaAparte.classList.add('lista');
        listas.insertAdjacentElement('beforeend', listaAparte);
        const height = document.createElement("p");
        height.id = "height";
        height.innerText = `Height: ${pokemon.height}`;
        listaAparte.insertAdjacentElement('beforeend', height);
        const weight = document.createElement("p");
        weight.id = "weight";
        weight.innerText = `Weight: ${pokemon.weight}`;
        listaAparte.id = "listaAparte";
        listaAparte.insertAdjacentElement('beforeend', weight);
        const p = document.createElement("p");
        p.id = "baseExp";
        p.innerText = `Base experience: ${pokemon.base_experience}`;
        listaAparte.insertAdjacentElement('beforeend', p);
        const lista1 = document.createElement('div');
        lista1.classList.add('lista');
        lista1.id = "lista1";
        listas.insertAdjacentElement('beforeend', lista1);
        const pAbilities = document.createElement('p');
        pAbilities.id = "pAbilities";
        pAbilities.innerText = "Abilities: ";
        lista1.insertAdjacentElement('beforeend', pAbilities);
        const ul = document.createElement("ul");
        ul.id = "ulAbilities";
        lista1.insertAdjacentElement('beforeend', ul);
        Array.from(pokemon.abilities).forEach(ability => {
            const li = document.createElement("li");
            li.id = ability.name;
            li.innerText = primeraMayus(ability.ability.name);
            ul.insertAdjacentElement('beforeend', li);
        });
        const lista2 = document.createElement("div");
        lista2.id = "lista2";
        lista2.classList.add('lista');
        listas.insertAdjacentElement('beforeend', lista2);
        const pTypes = document.createElement('p');
        pTypes.id = "pTypes";
        pTypes.innerText = "Types: ";
        lista2.insertAdjacentElement('beforeend', pTypes);
        const ulTypes = document.createElement("ul");
        ulTypes.id = "ulTypes";
        lista2.insertAdjacentElement('beforeend', ulTypes);
        Array.from(pokemon.types).forEach(type => {
            const li = document.createElement("li");
            li.id = type.name;
            li.innerText = primeraMayus(type.type.name);
            ulTypes.insertAdjacentElement('beforeend', li);
        });
        const lista3 = document.createElement("div");
        lista3.id = "lista3";
        lista3.classList.add('lista');
        listas.insertAdjacentElement('beforeend', lista3);
        const pStats = document.createElement('p');
        pStats.id = "pStats";
        pStats.innerText = "Stats: ";
        lista3.insertAdjacentElement('beforeend', pStats);
        const ulStats = document.createElement('ul');
        ulStats.id = "ulStats";
        lista3.insertAdjacentElement('beforeend', ulStats);
        Array.from(pokemon.stats).forEach(stat => {
            const li = document.createElement("li");
            li.id = stat.name;
            li.innerText = `${primeraMayus(stat.stat.name)}: ${stat.base_stat}`;
            ulStats.insertAdjacentElement('beforeend', li);
        })
        gestionBack(anteriores);
    }
    async function fetchPokemonsUrl(){
        const pokemons = await fetch("https://pokeapi.co/api/v2/pokemon?limit=151&offset=0")
            .then(data => data.json())
            .catch(err => console.log(err));
        const tipos = await fetch("https://pokeapi.co/api/v2/type/")
            .then(data => data.json())
            .catch(err => console.log(err));
        crearTipo(await tipos);
        function situacionInicial(pokemons){
            document.getElementById("h1").remove();
            document.body.classList.remove('loading');
            selectPokemons(pokemons, "all")
            if(document.getElementById("tipo")){
                document.getElementById("tipo").addEventListener("change", (event)=>{
                    //Al cambiar la seleccion en el change se mostrará un contenido diferente.
                    const valor = event.target.value;
                    guardarEnArray(anteriores);
                    const div = document.createElement("div");
                    div.id = "pokemons";
                    div.classList.add("tarjetas", document.getElementById("tipo").value);
                    document.getElementById("form").insertAdjacentElement('afterend',div);
                    selectPokemons(pokemons, valor)
                    gestionBack(anteriores);
                });
            }
        }
        situacionInicial(await pokemons);
    }

    function guardarEnArray(anteriores){
        //Esta función se utiliza a la hora de cambiar la vista. Guardo los elementos de la vista anterior por si el
        //usuario quiere ir atras
        if(document.getElementById("pokemons")) {
            if(document.getElementById("pokemons").classList[1]){
                anteriores.push({
                    type: document.getElementById("pokemons").classList[1],
                    div: document.getElementById("pokemons")
                });
            }
            document.getElementById("pokemons").remove();
        }
    }
    async function buscarPokemon(pokemon){
        const form = document.getElementById("form");
        const input = document.getElementById("buscador");
        const tipoSelect = document.getElementById("tipo");
        function seleccionarPokemon(pokemon){
            if (pokemon) {
                tipoSelect.value = pokemon.types[0].type.name;
                crearTarjeta(pokemon);
            }else{
                const h1 = document.createElement("h1");
                h1.innerText = "No results";
                h1.id = "pokemons";
                h1.classList.add("noRes");
                form.insertAdjacentElement("afterend", h1);
            }
            gestionBack(anteriores);
        }
        if (Number.isNaN(parseInt(input.value))) {
            const pokemonSelected = arrayCompleto.find(pokemon => pokemon.name.toLowerCase() === input.value.toLowerCase());
            seleccionarPokemon(pokemonSelected);
        }else{
            const pokemonSelected = arrayCompleto.find(pokemon => Number(input.value) === pokemon.id);
            seleccionarPokemon(pokemonSelected);
        }
    }
    function selectPokemons(pokemons,valor){
        if(valor === "all"){
            Array.from(pokemons['results']).forEach(async (pokemon) => {
                const pokemonSeleccionado =
                    fetch(pokemon['url'])
                    .then(res => res.json())
                .catch(err => console.log(err));
                crearTarjeta(await pokemonSeleccionado);
            })
        }else{
            Array.from(pokemons['results']).forEach(async (pokemon) => {
                const pokemonsSeleccionados =
                    fetch(pokemon['url'])
                        .then(res => res.json())
                        .then(json => {
                            console.log(json);
                                console.log(Array.from(json).filter((types)=>types));
                            }).catch(err => console.log(err));
                    //console.log(await pokemonsSeleccionados)
                    /*const tipos = [];
                const pokemonSeleccionado = await tomarDatosPokemons(pokemon);
                if(pokemonSeleccionado){
                    pokemon.types.forEach(tipo => {
                        tipos.push(tipo.type.name);
                    })
                    if(tipos.includes(valor)){
                        const pokemonSeleccionado =
                            fetch(pokemon['url'])
                                .then(res => res.json())
                                .catch(err => console.log(err));
                        crearTarjeta(await pokemonSeleccionado);
                    }
                }*/
            })
        }
    }
})
