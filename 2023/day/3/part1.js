const path = require('node:path');
const { readlineReducer } = require('../../lib/readLineReducer');

const initialValue = []

readlineReducer(path.join(__dirname, 'input.txt'), (linesArray, line) => (
    [...linesArray, line]
), initialValue).then(linesArray => {
    let partNumbersSum = 0

    linesArray.forEach((line, lineIndex) => {
        for (let charIndex = 0; charIndex < line.length; charIndex++) {

            let strNumber = ''
            let adjacentToSymbol = false

            for (; charIndex < line.length && !isNaN(line[charIndex]); charIndex++) {
                strNumber += line[charIndex]
                adjacentToSymbol = adjacentToSymbol || isAdjacentToSymbol(linesArray, lineIndex, charIndex)
            }

            if (adjacentToSymbol) {
                partNumbersSum += parseInt(strNumber)
            }
        }
    })
    console.log(partNumbersSum)
})

const directions = [
    { x: -1, y: -1 }, // Top Left
    { x: 0, y: -1 },  // Top
    { x: 1, y: -1 },  // Top Right
    { x: -1, y: 0 },  // Left
    { x: 1, y: 0 },   // Right
    { x: -1, y: 1 },  // Bottom Left
    { x: 0, y: 1 },   // Bottom
    { x: 1, y: 1 },   // Bottom Right
]

function isAdjacentToSymbol(linesArray, lineIndex, charIndex) {
    for (const direction of directions) {

        const adjacentLine = linesArray[lineIndex + direction.y]
        const adjacentChar = adjacentLine && adjacentLine[charIndex + direction.x]

        if (adjacentChar && isSymbol(adjacentChar)) {
            return true
        }
    }
    return false
}

function isSymbol(char) {
    const symbolsRegex = /[^a-zA-Z0-9.]/
    return symbolsRegex.test(char)
}