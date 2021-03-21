const pokemonDataBasic = new Map();
const pokemonDataDetail = new Map();
const initialUrl = 'https://pokeapi.co/api/v2/pokemon/?offset=0&limit=151';
const main = document.querySelector('main');
const screen = document.querySelector('.screen');

fetch(initialUrl) 
  .then(response => checkIfOk(response))
  .then(response => response.json())
  .then(data => saveDataBasic(data))
  .then(map => updateMain(map))
  .catch(error => console.log(error));

function checkIfOk(response) {
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  return response;
}

function idCalculation(index) {
  index += 1;
  index += '';
  switch(index.length) {
    case 1: index = '00' + index; break;
    case 2: index = '0' + index; break;
    default: index = index;
  }
  return index;
}

function saveDataBasic({results}) {
  results.forEach((element, index) => {
    const id = idCalculation(index);
    pokemonDataBasic.set(element.name, {id: id, url: element.url});
  });
  return Promise.resolve(pokemonDataBasic);
}

function updateMain(map){
  for(const [key, value] of map) {
    const div = document.createElement('div');
    div.setAttribute('name', key);
    div.innerText = `${value.id} ${key}`;
    div.addEventListener('click', onClick);
    main.appendChild(div);
  }
}

function saveDataDetail({height, id, name, sprites, types, weight}) {
  const spriteUrl = sprites.versions['generation-i']['red-blue'].front_gray;
  const dataDetail = {
    id,
    name,
    spriteUrl,
    weight,
    height,
    types
  };
  const mapObj = pokemonDataDetail.set(name, dataDetail);
  return Promise.resolve(mapObj.get(name));
}

function updateSceen(mapObj) {
  if(screen.firstChild) {
    screen.removeChild(screen.firstChild);
  }
  let img = document.createElement('img');
  img.setAttribute('src', mapObj.spriteUrl);
  screen.appendChild(img);
}

function onClick(event) {
  const name = event.target.getAttribute('name');
  if (pokemonDataDetail.get(name)) {
    updateSceen(pokemonDataDetail.get(name));
  } else {
    fetch(`https://pokeapi.co/api/v2/pokemon/${name}`)
      .then(response =>  checkIfOk(response))
      .then(response => response.json())
      .then(data => saveDataDetail(data))
      .then(mapObj => updateSceen(mapObj));
  }
}


