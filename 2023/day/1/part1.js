const path = require('node:path');
const { readlineReducer } = require('../../lib/readLineReducer');

const initialValue = 0

readlineReducer(path.join(__dirname, 'input.txt'), (calibrationValuesSum, line) => {
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