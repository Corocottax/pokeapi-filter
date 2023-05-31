const BASE_URL = "https://pokeapi.co/api/v2/pokemon/";
const ALL_POKEMONS = [];

const imgTipos = {
  grass: "./assets/tipos/grass.svg",
  fire: "./assets/tipos/fire.svg",
  water: "./assets/tipos/water.svg",
  rock: "./assets/tipos/rock.svg",
  poison: "./assets/tipos/poison.svg",
  electric: "./assets/tipos/electric.svg",
  ice: "./assets/tipos/ice.svg",
  flying: "./assets/tipos/flying.svg",
  bug: "./assets/tipos/bug.svg",
  normal: "./assets/tipos/normal.svg",
  ground: "./assets/tipos/ground.svg",
  fairy: "./assets/tipos/fairy.svg",
  fighting: "./assets/tipos/fighting.svg",
  psychic: "./assets/tipos/psychic.svg",
  steel: "./assets/tipos/steel.svg",
  ghost: "./assets/tipos/ghost.svg",
  dragon: "./assets/tipos/dragon.svg",
};

const peticion = () => {
    
    setTimeout(async () => {
        for (let id = 1; id <= 151; id++) {
            const resultado = await fetch(BASE_URL + id);
            const pokemon = await resultado.json();
            ALL_POKEMONS.push({
              id: pokemon.id,
              name: pokemon.name,
              image: pokemon.sprites.other["official-artwork"].front_shiny,
              types: pokemon.types,
              weight: pokemon.weight,
            });
          }

          printPokemons(ALL_POKEMONS);
    }, 2000);
  
};

const printPokemons = (pokemons) => {
  getAllTipos(pokemons);

  const div_pokemons$$ = document.querySelector("#pokemons");

  div_pokemons$$.innerHTML = "";

  for (const pokemon of pokemons) {
    div_pokemons$$.innerHTML += `
            <div class="pokemon" style="background-color:
                var(--${pokemon.types[0].type.name})
            ">
                <h3>${pokemon.name}</h3>
                <img src="${pokemon.image}" alt="${pokemon.name}"/>
                <div class="tipos">
                    ${getTipos(pokemon)}
                </div>
            </div>
        `;
  }
};

const getTipos = (pokemon) => {
  let respuesta = ``;

  for (const tipo of pokemon.types) {
    respuesta += `<img src="${imgTipos[tipo.type.name]}"/>`;
  }

  return respuesta;
};

const getAllTipos = (pokemons) => {
  let tipos = [];

  for (const pokemon of pokemons) {
    for (const tipo of pokemon.types) {
      if (!tipos.includes(tipo.type.name)) {
        tipos.push(tipo.type.name);
      }
    }
  }

  printTipos(tipos);
};

const printTipos = (tipos) => {
  const divFilters$$ = document.querySelector("#filters");

  divFilters$$.innerHTML = "";

    for (const tipo in imgTipos) {
        const tipo$$ = document.createElement("img");

        tipo$$.src = imgTipos[tipo];
        tipo$$.style.backgroundColor = `var(--${tipo})`;
        tipo$$.title = tipo;

        tipo$$.addEventListener("click", () => filterByType(ALL_POKEMONS, tipo));

        divFilters$$.appendChild(tipo$$);
    }

};

const filterByType = (pokemons, tipo) => {

    const pokemonsFiltered = pokemons.filter((pokemon) => {
        for (const type of pokemon.types) {
            if (type.type.name === tipo) {
                return pokemon;
            }
        }
        /* if (pokemon.types[0].type.name === tipo) {
            return pokemon
        } */
    });

    printPokemons(pokemonsFiltered);

}

peticion();