const { readlineReducer } = require('../utils/readLineReducer');

const initialValue = 0

readlineReducer("day1/input.txt", (calibrationValuesSum, line) => {
    let firstNumber
    let lastNumber
    
    [...line].forEach((char) => {
        if (!isNaN(char)) {
            if (!firstNumber) {
                firstNumber = char
            }
            lastNumber = char
        }
    })
    return calibrationValuesSum += parseInt(firstNumber + lastNumber)
}, initialValue).then(console.log)