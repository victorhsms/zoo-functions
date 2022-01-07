const { species } = require('../data/zoo_data');
const data = require('../data/zoo_data');

const program = {
  toUndefined() {
    const animals = {};
    species.forEach((specie) => {
      animals[specie.name] = specie.residents.length;
    });
    return animals;
  },

  oneParameter(animal) {
    return species.find((specie) => specie.name === animal.specie).residents.length;
  },

  twoParameter(animal) {
    const findAnimal = species.find((specie) => specie.name === animal.specie).residents;
    return findAnimal.filter((animales) => animales.sex === animal.sex).length;
  },

  numberParameters(animal) {
    return animal.sex === undefined ? program.oneParameter(animal) : program.twoParameter(animal);
  },
};
function countAnimals(animal) {
  return animal === undefined ? program.toUndefined() : program.numberParameters(animal);
}

module.exports = countAnimals;
