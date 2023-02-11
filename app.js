const getPokemanUrl = id => `https://pokeapi.co/api/v2/pokemon/${id}`

const generatePokemonPromises = () => Array(150).fill().map((_, index) =>
    fetch(getPokemanUrl(index + 1)).then(response => response.json()))

const generatorHTML = pokemons => pokemons.reduce((accumulator, { name, id, types }) => {
    const elementTypes = types.map(typeInfo => typeInfo.type.name)
    accumulator += `
        <li class="card ${types[0]}">
        <img class="card-image " alt="${name}" src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png"/>
            <h2 class="card-title">${id} ${name}</h2>
            <p class="card-subtitle">${types.join(' | ')}</p>
            </li>`
    return accumulator
}, '')


const insertPokemosIntoPage = pokemons => {
    const ul = document.querySelector('[data-js="pokedex"]')
    ul.innerHTML = pokemons
}


const pokemonPromises = generatePokemonPromises()

Promise.all(pokemonPromises)
    .then(generatorHTML)
    .then(insertPokemosIntoPage)
