const { species } = require('../data/zoo_data');
const data = require('../data/zoo_data');

const compass = ['NE', 'NW', 'SE', 'SW'];

const mapName = ((item) => item.name);

const program = {
  itsSorted(specime) { // Função que cria um array só com nome de todos os animais em ordem alfabética.
    const animal = species.find((specie) => specie.name === specime).residents;
    return animal.map(mapName).sort();
  },

  itsSex(opt, specime) { // Função que cria um array com o nome dos animais de acordo com o sexo informado.
    const animals = species.find((specie) => specie.name === specime).residents;
    return animals.filter((animal) => animal.sex === opt.sex).map(mapName);
  },

  itsSAS(opt, specime) { // Função que cria um array com o nome dos animais de acordo com o sexo informado e coloca em ordem alfabética.
    const animals = species.find((specie) => specie.name === specime).residents;
    return animals.filter((animal) => animal.sex === opt.sex).map(mapName).sort();
  },
  itsIncNames(specime) { // Função que apenas retorna o nome de todos os animais.
    const animal = species.find((specie) => specie.name === specime).residents;
    return animal.map(mapName);
  },
  itsUdf() { // Função para o retorno default.  Retorna apenas das espécies dos animais.
    const directions = {};
    compass.forEach((i) => {
      directions[i] = species.filter((s) => s.location === i).map(mapName);
    });
    return directions;
  },
};

const routes = { // Grupo de funções de rotas que personaliza o retorno final.
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
  mkArry(opt) { // Função central: faz um template do retorno final onde muda apenas o último array de acordo com o parâmetro.
    const directions = {};
    compass.forEach((i) => {
      directions[i] = [{}];
      const specimes = dataBase.verifySpecie(i);
      const sMapped = specimes.map(mapName);
      sMapped.forEach((specime) => {
        const newAnimal = {};
        newAnimal[specime] = routes.sexAndSort(opt, specime); // personaliza o últiimo array de acordo com o parâmetro.
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
