import { modules, students, mentors, classes } from './hyf.js';

const getPeopleOfClass = (className) => {
  let studentsOfClass = students.filter((student) =>
    student.class.includes(className),
  );
  studentsOfClass = studentsOfClass.map((student) => {
    return {
      name: student.name,
      rule: 'student',
    };
  });

  const classDetails = classes.find((theClass) => theClass.name === className);
  const classModule = classDetails.currentModule;
  let mentorsOfClass = mentors.filter(
    (mentor) => mentor.nowTeaching === classModule,
  );
  mentorsOfClass = mentorsOfClass.map((mentor) => {
    return {
      name: mentor.name,
      rule: 'mentor',
    };
  });
  return [...studentsOfClass, ...mentorsOfClass];
};
//console.log(getPeopleOfClass('class34'));

const getActiveClasses = () => {
  const activeClasses = classes.filter((theClass) => theClass.active);
  const activeClassesNames = activeClasses.map((theClass) => theClass.name);
  const allClassesObj = {};
  activeClassesNames.forEach((theClass) => {
    allClassesObj[theClass] = getPeopleOfClass(theClass);
  });
  return allClassesObj;
};

//console.log(getActiveClasses());
