const { readlineReducer } = require('../utils/readLineReducer');

readlineReducer("day12/example.txt", (totalArrangementSum, line) => {
    const [conditionRecords, contiguousDamagedSpringsSizes] = line.split(' ')
    const contiguousDamagedSpringsSizesArr = contiguousDamagedSpringsSizes.split(',')
    
    const combinations = []
    const possibleConditions = ['.', '#']
    const possibleConditionsCount = possibleConditions.length
    const unknownConditions = conditionRecords.match(/\?/g)
    const unknownConditionsCount = unknownConditions ? unknownConditions.length : 0
  
    for (let i = 0; i < Math.pow(possibleConditionsCount, unknownConditionsCount); i++) {
      let combination = conditionRecords;
      for (let j = 0; j < unknownConditionsCount; j++) {
        combination = combination.replace('?', possibleConditions[Math.floor(i / Math.pow(possibleConditionsCount, j)) % possibleConditionsCount]);
      }
      combinations.push(combination);
    }
  
    const arrangement = combinations.reduce((partialArrangementSum, possibleArrangement) => {
        const increasePartialArrangement = possibleArrangement.split('.')
            .filter(record => record !== '.')
            .map(record => record.length)
            .every((recordSize, i) => recordSize.toString() === contiguousDamagedSpringsSizesArr[i])

        if (increasePartialArrangement) {
            partialArrangementSum++
        }

        return partialArrangementSum
    }, 0)

    return totalArrangementSum + arrangement
}, 0).then(console.log)

