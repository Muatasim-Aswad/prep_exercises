'use strict';

function runExperiment(sampleSize) {
  const valueCounts = [0, 0, 0, 0, 0, 0];
  const _sampleSize = sampleSize;

  for (sampleSize; sampleSize > 0; sampleSize--) {
    const dieResult = Math.ceil(Math.random() * 6);
    valueCounts[dieResult - 1]++;
  }

  const results = valueCounts.map((sideCounts) =>
    ((sideCounts * 100) / _sampleSize).toFixed(2),
  );

  return results;
}

function main() {
  const sampleSizes = [100, 1000, 1000000];

  for (let sampleSize of sampleSizes) {
    const result = runExperiment(sampleSize);
    console.log(result);
    console.log(' ' + sampleSize);
  }
}

main();
