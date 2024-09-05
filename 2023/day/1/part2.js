const path = require('node:path');
const { readlineReducer } = require('../../lib/readLineReducer');

const initialValue = 0

readlineReducer(path.join(__dirname, 'input.txt'), (calibrationValuesSum, line) => {
    let calibrationValue = createCalibrationValue()
    let currentWord = '';
    
    [...line].forEach((char) => {
        if (!isNaN(char)) {
            calibrationValue.setValue(char)
        } else {
            currentWord += char

            const charNumber = getCharNumberFromWord(currentWord)
            if (charNumber) {
                calibrationValue.setValue(charNumber)
                currentWord = ''
            }
        }
    })
    return calibrationValuesSum += parseInt(calibrationValue.getValue())
}, initialValue).then(console.log)

function createCalibrationValue() {

    let firstNumber
    let lastNumber

    function setValue(charNumber) {
        if (!firstNumber) {
            firstNumber = charNumber
        }

        lastNumber = charNumber
    }

    function getValue() {
        return firstNumber + lastNumber
    }

    return {
        setValue,
        getValue
    }
}

const numbersInLetters = ['one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten']

function getCharNumberFromWord(word) {
    for (let i = 0; i < numbersInLetters.length; i++) {
        const numberInLetters = numbersInLetters[i]
        if (word.includes(numberInLetters)) {
            return (i + 1).toString()
        }
    }
}