const { prices } = require('../data/zoo_data');
const data = require('../data/zoo_data');

const child = (person) => person.age < 18;
const adult = (person) => person.age >= 18 && person.age < 50;
const senior = (person) => person.age >= 50;

const objeto = (entrants) => ({
  child: entrants.filter(child).length,
  adult: entrants.filter(adult).length,
  senior: entrants.filter(senior).length,
});

function countEntrants(entrants = {}) {
  // ref: https://stackoverflow.com/questions/55458675/filter-is-not-a-function
  const entrant = Object.values(entrants);
  return entrants === [] ? 0 : objeto(entrant);
}

function calculateEntry(entrants) {
  const countPersons = countEntrants(entrants);
  const keys = Object.keys(prices);
  return parseFloat(keys.reduce((acc, key) => acc + prices[key] * countPersons[key], 0));
}

module.exports = { calculateEntry, countEntrants };
