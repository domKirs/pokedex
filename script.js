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

  const main = document.querySelector('main');
  const imgNode = document.createElement('img');
  console.log(height);
  console.log(id);
  console.log(name);
  console.log(imgUrl);
  console.log(type);
  console.log(weight)
  imgNode.setAttribute('src', imgUrl);
  main.appendChild(imgNode);
}
