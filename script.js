fetch('https://pokeapi.co/api/v2/pokemon/1')
  .then(response => response.json())
  .then(json => {
    console.log(json);
    initialize(json);
  });

const initialize = function({height, id, name, sprites, types, weight}) {

  let imgUrl = sprites.versions['generation-i']['red-blue'].front_gray;

  let type = '';
  types.forEach((entry, index) => {
    if (index === 0) {
      type += entry.type.name;
    } else {
      type += ' ';
      type += `/ ${entry.type.name}`;
    }
  }); 

  id = '' + id;
  if (id.length === 1) {
    id = '00' + id;
  } else if (id.length === 2) {
    id = '0' + id;
  }

  const main = document.querySelector('main');
  const imgNode = document.createElement('img');
  imgNode.setAttribute('src', imgUrl);
  main.appendChild(imgNode);
  
  console.log(height);
  console.log(id);
  console.log(name);
  console.log(imgUrl);
  console.log(type);
  console.log(weight)
}
