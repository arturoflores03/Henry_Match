const setterName = (string) => {
  let firstLetter = string[0].toUpperCase();
  let restOfTheLetters = string.slice(1).toLowerCase();
  return firstLetter + restOfTheLetters;
};

export default setterName;
