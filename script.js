const pokeContainer = document.querySelector(".poke-container")
const search = document.querySelector(".search")
const searchBtn = document.querySelector(".searchBtn")
const searchInput = document.querySelector(".searchInput")

const pokemonCount = 151

const bgColor = {
    grass: "#e900b2",
    fire: "#ff3902",
    water: "#0582ff",
    bug: "#ddfa00",
    normal: "#50504f",
    flying: "#554fcc",
    poison: "#ff1bc2",
    electric: "#ffc20d",
    ground: "#997706",
    fairy: "#f046e4",
    psychic: "#fd1c6f",
    fighting: "#ec4e2f",
    rock: "#face20",
    dragon: "#5239f5",
    ice: "#0a93d8",
}

searchBtn.addEventListener("click", () => {
    search.classList.toggle('active')
})

searchInput.addEventListener("input", (e)=>{
    // console.log(searchInput.value);
    const searchValue = searchInput.value.toLowerCase()
    const pokemonNames = document.querySelectorAll(".poke-name")
    // console.log(pokemonNames);
    pokemonNames.forEach((pokemonName) =>{
        if(pokemonName.innerHTML.toLowerCase().includes(searchValue)){
            pokemonName.parentElement.parentElement.style.display = "block"
        }else{
            pokemonName.parentElement.parentElement.style.display = "none"
        }
    })
})

const fetchPokemons = async()=>{
    for(let i=1; i<=pokemonCount; i++){
    await getPokemon(i)
    }
}

const getPokemon = async (id)=>{
    const url=`https://pokeapi.co/api/v2/pokemon/${id} `
    const res = await fetch(url)
    const data = await res.json()
    // console.log(data);
    createPokemonCard(data)
}

const createPokemonCard = (pokemon)=> {
    const pokemonDiv = document.createElement("div")
    pokemonDiv.classList.add("pokemon")

    const pokemonId = pokemon.id.toString().padStart(3, '0')
    // console.log(pokemonId);

    const pokemonType = pokemon.types[0].type.name

    const pokemonBg = bgColor[pokemonType]
pokemonDiv.style.backgroundColor = `${pokemonBg}`

    const pokemonDivInnerHTML = 
    `
            <div class="image-container">
                <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.id}.png"
                    alt="first pokemon">
            </div>
            <div class="poke-info">
                <span class="poke-id"> ${pokemonId}</span>
                <h3 class="poke-name"> ${pokemon.name}</h3>
                <div class="small">
                    <small class="poke-exp">
                        <i class="fa-solid fa-flash"></i> ${pokemon.base_experience
                        } exp
                    </small>
                    <small class="poke-weight">
                        <i class="fa-solid fa-flash"></i> ${pokemon.weight
                        } kg
                    </small>
                </div>
                <div class="poke-type">
                    <i class="fa-brands fa-uncharted"></i> ${pokemonType}
                </div>
            </div>
    `

    pokemonDiv.innerHTML = pokemonDivInnerHTML
    pokeContainer.appendChild(pokemonDiv)
}
fetchPokemons()