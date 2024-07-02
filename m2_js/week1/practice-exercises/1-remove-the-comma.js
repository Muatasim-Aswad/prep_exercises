let myString = 'hello,this,is,a,difficult,to,read,sentence';

myString = myString.replace(/,/g, ' '); //if searched with string it only replace the first occurrence

console.assert(
  myString === 'hello this is a difficult to read sentence',
  'There is something wrong with your solution',
);
