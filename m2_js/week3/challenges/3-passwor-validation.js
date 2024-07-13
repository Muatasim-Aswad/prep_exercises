const passwordList = [
  { times: '1-3', letter: 'a', password: 'abcde' },
  { times: '1-3', letter: 'b', password: 'cdefg' },
  { times: '2-9', letter: 'c', password: 'ccccccccc' },
];

passwordList.forEach((passwordObj) => {
  const [min, max] = passwordObj.times.split('-');
  const { letter } = passwordObj;
  const passwordArr = passwordObj.password.split('');
  const counts = passwordArr.reduce((counter, char) => {
    if (char === letter) counter++;
    return counter;
  }, 0);
  const validation = counts <= max && counts >= min ? 'VALID' : 'INVALID';
  console.log(
    `${passwordObj.password} is ${validation}, ${letter} is present ${counts} times and should have been present at least ${min} and at most ${max} times`,
  );
});
