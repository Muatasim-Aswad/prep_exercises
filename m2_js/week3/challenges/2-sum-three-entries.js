const listOriginal = [1721, 1456, 979, 299, 675, 366];
let result;

const add3UpTo2020 = (() => {
  const list = [...listOriginal];
  let sum = 0;
  let circularPermutations = factorial(list.length - 1);
  for (let k = 0; k <= circularPermutations; k++) {
    list.push(...list.splice(1, 1)); //Move the 2nd element to the end to change the order
    for (let i = 0; i < list.length; i++) {
      list.push(list.shift()); //Rotates the array
      for (let j = 2; j < list.length; j++) {
        sum = list[0] + list[1] + list[j];

        if (sum === 2020) {
          result = list[0] * list[1] * list[j];
          return;
        }
      }
    }
  }
  function factorial(n) {
    return n <= 1 ? 1 : n * factorial(n - 1);
  }
})();

// TEST CODE, do not change
console.assert(
  result === 241861950,
  `The result is not correct, it is ${result}, but should be 241861950`,
);
