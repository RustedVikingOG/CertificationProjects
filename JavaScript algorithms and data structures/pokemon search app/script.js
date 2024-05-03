const searchInput = document.getElementById('search-input');
const searchBtn = document.getElementById('search-button');

const baseUrl = "https://pokeapi-proxy.freecodecamp.rocks/api/pokemon/";

const pokemonId = document.getElementById('pokemon-id');
const pokemonName = document.getElementById('pokemon-name');
const pokemonImage = document.getElementById('pokemon-image');
const types = document.getElementById('types');
const height = document.getElementById('height');
const weight = document.getElementById('weight');
const hp = document.getElementById('hp');
const attack = document.getElementById('attack');
const defense = document.getElementById('defense');
const specialAttack = document.getElementById('special-attack');
const specialDefense = document.getElementById('special-defense');
const speed = document.getElementById('speed');


searchBtn.addEventListener('click', async () => {
    const userInput = searchInput.value.toLowerCase();
    
    if (userInput === '') {
        alert('Please enter a Pokémon name or ID');
        return;
    } else {
        try {
            const response = await fetch(baseUrl + userInput);
            const data = await response.json();
            console.log(data);
            console.log(data.sprites.front_default);
            setTimeout(() => {
                pokemonName.textContent = data.name.toUpperCase();
                pokemonId.textContent = `#${data.id}`;
                pokemonImage.innerHTML = `<img id="sprite" src="${data.sprites.front_default}" alt="${data.name}">`;
                height.textContent = data.height;
                weight.textContent = data.weight;

                const typesArr = data.types.map(type => type.type.name.toUpperCase());
                types.innerHTML = '';
                typesArr.forEach(type => {
                    types.innerHTML += `<span class="${type.toLowerCase()}">${type}</span>`;
                });
                
                hp.textContent = data.stats[0].base_stat;
                attack.textContent = data.stats[1].base_stat;
                defense.textContent = data.stats[2].base_stat;
                specialAttack.textContent = data.stats[3].base_stat;
                specialDefense.textContent = data.stats[4].base_stat;
                speed.textContent = data.stats[5].base_stat;
            }, 500);
        } catch (error) {
            console.log(error);
            alert('Pokémon not found');
        }
    }

    

})