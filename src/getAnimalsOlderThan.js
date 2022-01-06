const { species } = require('../data/zoo_data');
const data = require('../data/zoo_data');
// Esta função, a partir do nome de uma espécie e uma idade mínima, verifica se todos os animais daquela espécie possuem a idade mínima especificada.
function getAnimalsOlderThan(animal, age) {
  const findSpecie = (specie) => specie.name === animal;
  const specieSelected = species.find(findSpecie);

  return specieSelected.residents.every((residents) => residents.age >= age);
}

module.exports = getAnimalsOlderThan;
