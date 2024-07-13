import { modules, students, mentors, classes } from './hyf.js';

const possibleMentorsForModule = (moduleName) => {
  const possibleMentors = mentors.filter((mentor) =>
    mentor.canTeach.includes(moduleName),
  );
  return possibleMentors.map((mentor) => mentor.name);
};

//console.log(possibleMentorsForModule('using-apis'));

const findMentorForModule = (moduleName) => {
  const possibleMentorsArray = possibleMentorsForModule(moduleName);
  const randomMentorIndex = Math.floor(Math.random() * possibleMentors.length);
  return possibleMentorsArray[randomMentorIndex];
};

//console.log(findMentorForModule('javascript'));
