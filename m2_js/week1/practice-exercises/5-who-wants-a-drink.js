Number.prototype.toWords = function () {
  const words = ['zero', 'one', 'two'];
  return words[this.valueOf()];
};

const drinkTypes = ['cola', 'lemonade', 'water'];
const drinkTray = [];

for (let i = 4; i >= 0; i--) {
  j = i < 3 ? i : i - 2;
  drinkTray.push(drinkTypes[j]);
}

const drinkCounts = drinkTypes.map(
  (type) =>
    `${drinkTray.filter((drink) => drink === type).length.toWords()} ${type}`,
);

console.log(`Hey guys, I brought ${drinkCounts.join(', ')}.`);
