const { species } = require('../data/zoo_data');
const { employees } = require('../data/zoo_data');
const data = require('../data/zoo_data');

const tools = {
  searchSpecies(animals) {
    return species.find((animal) => animal.id === animals).name;
  },

  searchLocate(animals) {
    return species.find((animal) => animal.id === animals).location;
  },

  mkObj(emp) {
    return {
      id: emp.id,
      fullName: `${emp.firstName} ${emp.lastName}`,
      species: emp.responsibleFor.map((i) => tools.searchSpecies(i)),
      locations: emp.responsibleFor.map((i) => tools.searchLocate(i)),
    };
  },
  itsId(otp) {
    const findId = employees.find((emp) => emp.id === otp.id);
    return tools.mkObj(findId);
  },
  itsFirst(otp) {
    const findFirst = employees.find((emp) => emp.firstName === otp.name);
    return tools.mkObj(findFirst);
  },
  itsLast(otp) {
    const findLast = employees.find((emp) => emp.lastName === otp.name);
    return tools.mkObj(findLast);
  },
};

const itsUdf = () => {
  const result = [];
  employees.forEach((emp) => {
    const instance = {
      id: emp.id,
      fullName: `${emp.firstName} ${emp.lastName}`,
      species: emp.responsibleFor.map((i) => tools.searchSpecies(i)),
      locations: emp.responsibleFor.map((i) => tools.searchLocate(i)),
    };
    result.push(instance);
  });
  return result;
};

const rotes = {
  idAux(otp) {
    return (e) => e.id === otp.id;
  },
  verifyId(otp) {
    const id = employees.some(rotes.idAux(otp));
    if (!(id)) {
      throw new Error('Informações inválidas');
    } else {
      return tools.itsId(otp);
    }
  },
  lastAux(otp) {
    return (e) => e.lastName === otp.name;
  },
  verifyLast(otp) {
    const first = employees.some(rotes.lastAux(otp));
    if (!(first)) {
      throw new Error('Informações inválidas');
    } else {
      return tools.itsLast(otp);
    }
  },
  verifyNames(otp) {
    const first = employees.some((e) => e.firstName === otp.name);
    return first ? tools.itsFirst(otp) : rotes.verifyLast(otp);
  },
  default(otp) {
    return otp.name === undefined ? rotes.verifyId(otp) : rotes.verifyNames(otp);
  },
};
function getEmployeesCoverage(otp) {
  return otp === undefined ? itsUdf() : rotes.default(otp);
}

module.exports = getEmployeesCoverage;
