const listaPokemon = document.querySelector("#listaPokemon");
const botonesHeader = document.querySelectorAll(".btn-header");
const botonesTipos = document.querySelectorAll(".tipos");
const botonesRegion = document.querySelectorAll(".region");
const savedPokemon = new Map();
const nombreTipos = new Map();
nombreTipos.set("normal", "normal");
nombreTipos.set("fire", "fuego");
nombreTipos.set("water", "agua");
nombreTipos.set("grass", "planta");
nombreTipos.set("electric", "eléctrico");
nombreTipos.set("ice", "hielo");
nombreTipos.set("fighting", "lucha");
nombreTipos.set("poison", "veneno");
nombreTipos.set("ground", "tierra");
nombreTipos.set("flying", "volador");
nombreTipos.set("psychic", "psíquico");
nombreTipos.set("bug", "bicho");
nombreTipos.set("rock", "roca");
nombreTipos.set("ghost", "fantasma");
nombreTipos.set("dark", "siniestro");
nombreTipos.set("dragon", "dragón");
nombreTipos.set("steel", "acero");
nombreTipos.set("fairy", "hada");

let URL = "https://pokeapi.co/api/v2/pokemon/";

for (let i = 1; i <= 1010; i++) {
  fetch(URL + i)
    .then((response) => response.json())
    .then((data) => savePokemonData(data));
}

printAllPokemon();

function mostrarPokemon(data) {
  let tipos = data.types.map(
    (type) =>
      `<p class="` +
      type.type.name +
      ` tipo">` +
      nombreTipos.get(type.type.name) +
      `</p>`
  );
  tipos = tipos.join("");

  let dataId = data.id.toString();
  if (dataId.length === 1) {
    dataId = "00" + dataId;
  } else if (dataId.length === 2) {
    dataId = "0" + dataId;
  }

  const div = document.createElement("div");
  div.classList.add("pokemon");
  div.id = data.id;
  div.innerHTML =
    `
        <p class="pokemon-id-back">#` +
    dataId +
    `</p>
        <div class="pokemon-imagen">
            <img src=` +
    data.sprites.other["official-artwork"].front_default +
    ` alt=` +
    data.name +
    `>
        </div>
        <div class="pokemon-info">
            <div class="nombre-contenedor">
                <p class="pokemon-id">#` +
    dataId +
    `</p>
                <h2 class="pokemon-nombre">` +
    data.name +
    `</h2>
            </div>
            <div class="pokemon-tipos">
                ` +
    tipos +
    `
            </div>
            <div class="pokemon-stats">
            </div>
        </div>
    `;
  listaPokemon.append(div);
}

function savePokemonData(data) {
  let tipos = data.types.map(
    (type) =>
      `<p class="` +
      type.type.name +
      ` tipo">` +
      nombreTipos.get(type.type.name) +
      `</p>`
  );
  tipos = tipos.join("");

  let dataId = data.id.toString();
  if (dataId.length === 1) {
    dataId = "00" + dataId;
  } else if (dataId.length === 2) {
    dataId = "0" + dataId;
  }

  let datosPokemon =
    `
    <p class="pokemon-id-back">#` +
    dataId +
    `</p>
    <div class="pokemon-imagen">
        <img src=` +
    data.sprites.other["official-artwork"].front_default +
    ` alt=` +
    data.name +
    `>
    </div>
    <div class="pokemon-info">
        <div class="nombre-contenedor">
            <p class="pokemon-id">#` +
    dataId +
    `</p>
            <h2 class="pokemon-nombre">` +
    data.name +
    `</h2>
        </div>
        <div class="pokemon-tipos">
            ` +
    tipos +
    `
        </div>
    </div>
    `;

  savedPokemon.set(data.id, datosPokemon);
}

function listadoPokemon(pokemonId, datosPokemon) {
  const div = document.createElement("div");
  div.classList.add("pokemon");
  div.id = pokemonId;
  div.innerHTML = datosPokemon;
  listaPokemon.append(div);
}

botonesTipos.forEach((boton) =>
  boton.addEventListener("click", () => {
    const botonId = event.currentTarget.id;

    listaPokemon.innerHTML = "";

    for (let i = 1; i <= 1010; i++) {
      fetch(URL + i)
        .then((response) => response.json())
        .then((data) => {
          if (botonId === "ver-todos") {
            mostrarPokemon(data);
          } else {
            const tipos = data.types.map((type) => type.type.name);
            if (tipos.some((tipo) => tipo.includes(botonId))) {
              mostrarPokemon(data);
            }
          }
        });
    }
  })
);

botonesRegion.forEach((boton) =>
  boton.addEventListener("click", () => {
    const botonId = event.currentTarget.id;

    listaPokemon.innerHTML = "";

    let fPokemon = 1;
    let lPokemon = 1;

    if (botonId == "Kanto") {
      fPokemon = 1;
      lPokemon = 151;
    } else if (botonId == "Johto") {
      fPokemon = 152;
      lPokemon = 251;
    } else if (botonId == "Hoenn") {
      fPokemon = 252;
      lPokemon = 386;
    } else if (botonId == "Sinnoh") {
      fPokemon = 387;
      lPokemon = 493;
    } else if (botonId == "Teselia") {
      fPokemon = 494;
      lPokemon = 649;
    } else if (botonId == "Kalos") {
      fPokemon = 650;
      lPokemon = 721;
    } else if (botonId == "Alola") {
      fPokemon = 722;
      lPokemon = 809;
    } else if (botonId == "Galar") {
      fPokemon = 810;
      lPokemon = 898;
    } else if (botonId == "Hisui") {
      fPokemon = 899;
      lPokemon = 905;
    } else if (botonId == "Paldea") {
      fPokemon = 906;
      lPokemon = 1010;
    }

    for (let i = 1; i <= 1010; i++) {
      fetch(URL + i)
        .then((response) => response.json())
        .then((data) => {
          if (botonId === "ver-todos") {
            mostrarPokemon(data);
          } else {
            if (i >= fPokemon && i <= lPokemon) {
              mostrarPokemon(data);
            }
          }
        });
    }
  })
);

function printAllPokemon() {
  if (savedPokemon.size == 1010) {
    for (var i = 1; i <= 1010; i++) {
      listadoPokemon(i, savedPokemon.get(i));
    }
  } else {
    setTimeout(printAllPokemon, 100);
  }
}
