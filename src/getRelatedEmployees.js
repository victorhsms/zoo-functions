const { employees } = require('../data/zoo_data');
const data = require('../data/zoo_data');

const mkArray = (item) => `${item.firstName} ${item.lastName}`;
// ref: https://www.horadecodar.com.br/2020/01/23/javascript-verificar-se-um-elemento-existe-no-array/
const searchEmployees = (id) => employees.filter((e) => e.managers.includes(id)).map(mkArray);

function isManager(id) { // Verifica em cada funcionario se ele tem como gerente alguém com ID passado como parâmetro.
  return employees.some((person) => person.managers.includes(id));
}

function getRelatedEmployees(managerId) {
  if (!(isManager(managerId))) {
    throw new Error('O id inserido não é de uma pessoa colaboradora gerente!');
  } else {
    return searchEmployees(managerId);
  }
}

module.exports = { isManager, getRelatedEmployees };
