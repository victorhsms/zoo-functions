const { employees } = require('../data/zoo_data');
const { species } = require('../data/zoo_data');
const data = require('../data/zoo_data');
// passado o id de um funcionário, encontra a primeira espécie de animal gerenciado pelo funcionário, e retorna um array com nome, sexo e idade do animal mais velho dessa espécie.

const teste = (acc, animal) => Math.max(acc, animal.age);
function getOldestFromFirstSpecies(id) {
  const employee = employees.find((funcionario) => funcionario.id === id).responsibleFor[0];
  const animalEncontrado = species.find((animal) => animal.id === employee);
  const residentsAnimals = animalEncontrado.residents;
  const mIdade = residentsAnimals.reduce(teste, 0);
  const animalFinal = animalEncontrado.residents.find((animal) => animal.age === mIdade);
  const resultado = [animalFinal.name, animalFinal.sex, animalFinal.age];
  return resultado;
}

module.exports = getOldestFromFirstSpecies;
