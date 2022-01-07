const { species } = require('../data/zoo_data');
const data = require('../data/zoo_data');

const program = {
  toUndefined() { // Função que é executada caso um parâmetro não tenha sido passado.
    const animals = {};
    species.forEach((specie) => {
      animals[specie.name] = specie.residents.length;
    });
    return animals;
  },

  oneParameter(animal) { // Função que é executada caso o objeto tenha 1 (uma) propriedades.
    return species.find((specie) => specie.name === animal.specie).residents.length;
  },

  twoParameter(animal) { // Função que é executada caso o objeto tenha 2 (duas) propriedades.
    const findAnimal = species.find((specie) => specie.name === animal.specie).residents;
    return findAnimal.filter((animales) => animales.sex === animal.sex).length;
  },

  numberParameters(animal) { // Verifica se o Objeto tem 1 (uma) ou 2 (duas) propriedades e redireciona à devida função.
    return animal.sex === undefined ? program.oneParameter(animal) : program.twoParameter(animal);
  },
};
function countAnimals(animal) { // Função inicial (O programa começa aqui).
  return animal === undefined ? program.toUndefined() : program.numberParameters(animal); // Verifica se o parâmetro é undefined ou não e redireciona à devida função.
}

module.exports = countAnimals;
