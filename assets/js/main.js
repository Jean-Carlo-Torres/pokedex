const pokemonLista = document.getElementById('pokemonLista')
const botaoCarregarMais = document.getElementById('botaoCarregarMais')

const maxRecords = 151
const limit = 12
let offset = 0;

function converterPokemonParaLi(pokemon) {
    return `
        <li class="pokemon ${pokemon.type}">
            <span class="number">#${pokemon.number}</span>
            <span class="name">${pokemon.name}</span>

            <div class="detail">
                <ol class="types">
                    ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
                </ol>

                <img src="${pokemon.photo}"
                     alt="${pokemon.name}">
            </div>
        </li>
    `
}

function CarregarItensPokemon(offset, limit) {
    pokeApi.getPokemons(offset, limit).then((pokemons = []) => {
        const newHtml = pokemons.map(converterPokemonParaLi).join('')
        pokemonLista.innerHTML += newHtml
    })
}

CarregarItensPokemon(offset, limit)

botaoCarregarMais.addEventListener('click', () => {
    offset += limit
    const qtdRecordsWithNexPage = offset + limit

    if (qtdRecordsWithNexPage >= maxRecords) {
        const newLimit = maxRecords - offset
        CarregarItensPokemon(offset, newLimit)

        botaoCarregarMais.parentElement.removeChild(botaoCarregarMais)
    } else {
        CarregarItensPokemon(offset, limit)
    }
})