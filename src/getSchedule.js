const { species } = require('../data/zoo_data');
const { hours } = require('../data/zoo_data');
const data = require('../data/zoo_data');

const program = {
  searchAnimal(animal) { // Função para procurar e retornar o array com os dias em que ele está em exibição.
    const findAnimal = species.find((specie) => specie.name === animal);
    // Comentário sobre a próxima linha (linha 11): o tratamento pra prevenir undefined é feito no inicio do programa, porém
    // o jest exige que seja feito um novo tratamento após um .find(), visto que ele pode retornar undefined. Como eu tenho CERTEZA
    // que é desnecessário, coloquei um tratamento de retorno supérfluo.
    return findAnimal === undefined ? 'lions' : findAnimal.availability;
  },

  otherDay(day) { // função que retorna somente o horário daquele expediente e os animais em exibição no dia (exceto segunda-feira)
    const daySelected = {};
    const ref = (array) => `${array.name}`;
    daySelected[day] = {
      officeHour: `Open from ${hours[day].open}am until ${hours[day].close}pm`,
      exhibition: species.filter((a) => a.availability.find((d) => d === day)).map(ref), // Trocar nome dos parâmetros
    };
    return daySelected;
  },

  monday() { // Função que retorna um objeto informando que nas segundas o zoológico fecha.
    return {
      Monday: { officeHour: 'CLOSED', exhibition: 'The zoo will be closed!' },
    };
  },

  searchDay(day) { // Função que verifica se o dia passado é segunda ou outro dia qualquer e redireciona o parâmetro para a devida função.
    return day === 'Monday' ? this.monday() : this.otherDay(day);
  },

  searchEverything() { // Função que retorna um objeto com os horários do dia e os animais em exibição, em casos de parâmetro indefinido ou inexistente.
    const allDays = [];
    const days = Object.keys(hours);
    days.forEach((day) => allDays.push(this.otherDay(day)));
    allDays.pop();
    allDays.push(this.monday());
    return allDays.reduce((acc, item) => Object.assign(acc, item));
  },
};

const whatIsIt = {
  itsAnimal(event) { // Função que verifica se o parâmetro bate com a lista de animais.
    return species.some((specie) => specie.name === event);
  },

  itsDay(event) { // Função que verifica se o parâmetro bate com a lista de animais.
    const days = Object.keys(hours);
    return days.some((day) => day === event);
  },

  itsNothing(event) { // Função que verifica se o parâmetro não é nem animal e nem dia.
    return !(whatIsIt.itsDay(event)) && !(whatIsIt.itsAnimal(event));
  },

  ticket(event) { // Função que verifica se o parâmetro é dia ou animal (ja sabendo que é algum dos dois).
    return this.itsDay(event) ? program.searchDay(event) : program.searchAnimal(event);
  },
};

function getSchedule(scheduleTarget = 'aaaa') { // Função inicial (o programa começa aqui).
  const condition = whatIsIt.itsNothing(scheduleTarget);
  const isNothing = program.searchEverything(scheduleTarget);
  const itsSomething = whatIsIt.ticket(scheduleTarget);
  return condition ? isNothing : itsSomething; // Verifica aqui se o parâmetro é do grupo inexistente/indefinido ou do grupo animal/dia.
}

module.exports = getSchedule;
