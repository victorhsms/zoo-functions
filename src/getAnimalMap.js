const { species } = require('../data/zoo_data');
const data = require('../data/zoo_data');

const compass = ['NE', 'NW', 'SE', 'SW'];

const mapName = ((item) => item.name);

const program = {
  itsSorted(specime) {
    const animal = species.find((specie) => specie.name === specime).residents;
    return animal.map(mapName).sort();
  },

  itsSex(opt, specime) {
    const animals = species.find((specie) => specie.name === specime).residents;
    return animals.filter((animal) => animal.sex === opt.sex).map(mapName);
  },

  itsSAS(opt, specime) {
    const animals = species.find((specie) => specie.name === specime).residents;
    return animals.filter((animal) => animal.sex === opt.sex).map(mapName).sort();
  },
  itsIncNames(specime) {
    const animal = species.find((specie) => specie.name === specime).residents;
    return animal.map(mapName);
  },
  itsUdf() {
    const directions = {};
    compass.forEach((i) => {
      directions[i] = species.filter((s) => s.location === i).map(mapName);
    });
    return directions;
  },
};

const routes = {
  onlySorted(opt, s) { // Função rota que verifica se pelomenos o parâmetro Sex existe. Caso contrário, só includeNames existe.
    return opt.sorted !== undefined ? program.itsSorted(s) : program.itsIncNames(s);
  },
  oSex(opt, s) { // Função rota que verifica se pelomenos o parâmetro Sex existe. Caso contrário, vê manda pra proxima função.
    return opt.sex !== undefined ? program.itsSex(opt, s) : this.onlySorted(opt, s);
  },
  sexAndSort(o, s) { // Função rota que verifica se os parâmetros sex E sorted existem no objeto. Se os dois n existirem, manda pra outras funções verem se pelo menos um existe.
    return o.sex !== undefined && o.sorted !== undefined ? program.itsSAS(o, s) : this.oSex(o, s);
  },
};

const dataBase = {
  verifySpecie(i) {
    const result = species.filter((s) => s.location === i);
    return result === undefined ? 'a' : result;
  },
  mkArry(opt) {
    const directions = {};
    compass.forEach((i) => {
      directions[i] = [];
      directions[i][0] = {};
      const specimes = dataBase.verifySpecie(i);
      const sMapped = specimes.map(mapName);
      sMapped.forEach((specime) => {
        const newAnimal = {};
        newAnimal[specime] = routes.sexAndSort(opt, specime);
        directions[i].push(newAnimal);
      });
      directions[i].shift();
    });
    return directions;
  },
};

function getAnimalMap(options = {}) { // Verifica se a propriedade includesname existe no objeto. Se existir, passa para as rotas. Se não existir, chama o retorno default.
  return options.includeNames === undefined ? program.itsUdf() : dataBase.mkArry(options);
}

module.exports = getAnimalMap;
