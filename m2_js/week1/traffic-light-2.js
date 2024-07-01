'use strict';
const trafficLight = {
  possibleStates: ['green', 'orange', 'red'],
  stateIndex: 0,
};

let cycle = 0;
while (cycle < 2) {
  const currentState = trafficLight.possibleStates[trafficLight.stateIndex];
  console.log('The traffic light is on', currentState);

  if (currentState === 2) cycle++;
  currentState < 2 ? trafficLight.stateIndex++ : (trafficLight.stateIndex = 0);
}

//is it ok to just loop through the array without a stateIndex?
/*while (cycle < 2) {
  trafficLight.possibleStates.forEach(currentState => console.log('The traffic light is on', currentState));
  cycle++;
}*/
