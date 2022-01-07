const { employees } = require('../data/zoo_data');
const { species } = require('../data/zoo_data');
const data = require('../data/zoo_data');
// passado o id de um funcionário, encontra a primeira espécie de animal gerenciado pelo funcionário, e retorna um array com nome, sexo e idade do animal mais velho dessa espécie.

const teste = (acc, animal) => Math.max(acc, animal.age);
function getOldestFromFirstSpecies(id) {
  const employee = employees.find((funcionario) => funcionario.id === id).responsibleFor[0]; // Encontra o funcionário e retorna o ID da primeira espécie que ele cuida.
  const animalEncontrado = species.find((animal) => animal.id === employee); // Encontra qual é a espécie pelo ID.
  const residentsAnimals = animalEncontrado.residents; // Vê a lista de animais existentes daquela espécie.
  const mIdade = residentsAnimals.reduce(teste, 0); // Vê qual é o animal mais velho. (parte da função na linha 6 (seis)).
  const animalFinal = animalEncontrado.residents.find((animal) => animal.age === mIdade); // Vê qual é o animal que tem essa idade e retorna suas características.
  const resultado = [animalFinal.name, animalFinal.sex, animalFinal.age]; // Coloca as características do animal em um array.
  return resultado;
}

module.exports = getOldestFromFirstSpecies;
