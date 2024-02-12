function generateCombinations(pattern, options) {
    const combinations = [];
    const totalOptions = options.length;
    const questionMarks = pattern.match(/\?/g);
    const questionMarkCount = questionMarks ? questionMarks.length : 0;
  
    for (let i = 0; i < Math.pow(totalOptions, questionMarkCount); i++) {
      let combination = pattern;
      for (let j = 0; j < questionMarkCount; j++) {
        combination = combination.replace('?', options[Math.floor(i / Math.pow(totalOptions, j)) % totalOptions]);
      }
      combinations.push(combination);
    }
  
    return combinations;
  }
  
  // Ejemplo de uso con más opciones (por ejemplo, ['.', '#'])
  const pattern = '.??..??...?##';
  const options = ['.', '#'];
  const allCombinations = generateCombinations(pattern, options);
  console.log(allCombinations);
  