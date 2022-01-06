const { employees } = require('../data/zoo_data');
const data = require('../data/zoo_data');

function getEmployeeByName(employeeName) {
  const search = employees.find((e) => e.firstName === employeeName || e.lastName === employeeName);
  const result = employeeName === undefined ? {} : search;

  return result;
}

module.exports = getEmployeeByName;
