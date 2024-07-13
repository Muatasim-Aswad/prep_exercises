const listOriginal = [1721, 979, 366, 299, 675, 1456];
let result;

const add2UpTo2020 = (() => {
  const list = [...listOriginal];
  let sum = 0;
  while (true) {
    for (let i = 1; i < list.length; i++) {
      sum = list[0] + list[i];

      if (sum === 2020) {
        result = list[0] * list[i];
        return;
      }
    }
    list.push(list.shift());
  }
})();

// TEST CODE, do not change
console.assert(
  result === 514579,
  `The result is not correct, it is ${result}, but should be 514579`,
);
