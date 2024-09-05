const path = require('node:path');
const { readlineReducer } = require('../../lib/readLineReducer');

const initialValue = []

readlineReducer(path.join(__dirname, 'input.txt'), (linesArray, line) => (
    [...linesArray, line]
), initialValue).then(linesArray => {
    let gearRatiosSum = 0

    linesArray.forEach((line, lineIndex) => {
        [...line].forEach((char, charIndex) => {
            if (char === '*') {
                gearRatiosSum += getGearRatio(linesArray, lineIndex, charIndex)
            }
        })
    })
    console.log(gearRatiosSum)
})

const directions = [
    { x1: -1, y1: -1, x2: 1, y2: -1 }, // Top Left && Top Right
    { x1: -1, y1: -1, x2: -1, y2: 0 }, // Top Left && Left
    { x1: -1, y1: -1, x2: 1, y2: 0 },  // Top Left && Right
    { x1: -1, y1: -1, x2: -1, y2: 1 }, // Top Left && Bottom Left
    { x1: -1, y1: -1, x2: 0, y2: 1 },  // Top Left && Bottom
    { x1: -1, y1: -1, x2: 1, y2: 1 },  // Top Left && Bottom Right
    { x1: 0, y1: -1, x2: -1, y2: 0 },  // Top && Left
    { x1: 0, y1: -1, x2: 1, y2: 0 },   // Top && Right
    { x1: 0, y1: -1, x2: -1, y2: 1 },  // Top && Bottom Left
    { x1: 0, y1: -1, x2: 0, y2: 1 },   // Top && Bottom
    { x1: 0, y1: -1, x2: 1, y2: 1 },   // Top && Bottom Right
    { x1: 1, y1: -1, x2: -1, y2: 0 },  // Top Right && Left
    { x1: 1, y1: -1, x2: 1, y2: 0 },   // Top Right && Right
    { x1: 1, y1: -1, x2: -1, y2: 1 },  // Top Right && Bottom Left
    { x1: 1, y1: -1, x2: 0, y2: 1 },   // Top Right && Bottom
    { x1: 1, y1: -1, x2: 1, y2: 1 },   // Top Right && Bottom Right
    { x1: -1, y1: 0, x2: 1, y2: 0 },   // Left && Right
    { x1: -1, y1: 0, x2: -1, y2: 1 },  // Left && Bottom Left
    { x1: -1, y1: 0, x2: 0, y2: 1 },   // Left && Bottom
    { x1: -1, y1: 0, x2: 1, y2: 1 },   // Left && Bottom Right
    { x1: 1, y1: 0, x2: -1, y2: 1 },   // Right && Bottom Left
    { x1: 1, y1: 0, x2: 0, y2: 1 },    // Right && Bottom
    { x1: 1, y1: 0, x2: 1, y2: 1 },    // Right && Bottom Right
    { x1: -1, y1: 1, x2: 1, y2: 1 },   // Bottom Left && Bottom Right
]

function getGearRatio(linesArray, lineIndex, charIndex) {
    for (const direction of directions) {

        const y1 = lineIndex + direction.y1
        const x1 = charIndex + direction.x1
        const adjacentLine1 = linesArray[y1]
        const adjacentChar1 = adjacentLine1 && adjacentLine1[x1]

        const y2 = lineIndex + direction.y2
        const x2 = charIndex + direction.x2
        const adjacentLine2 = linesArray[y2]
        const adjacentChar2 = adjacentLine2 && adjacentLine2[x2]

        let sameNumber = y1 === y2 && x2 - x1 === 2 && !isNaN(linesArray[y1][charIndex])

        if (adjacentChar1 && adjacentChar2 && !isNaN(adjacentChar1) && !isNaN(adjacentChar2) && !sameNumber) {
            return retrieveNumberFromPosition(linesArray, y1, x1) * retrieveNumberFromPosition(linesArray, y2, x2)
        }
    }
    return 0
}

function retrieveNumberFromPosition(linesArray, lineIndex, charIndex) {

    let strNumber = linesArray[lineIndex][charIndex] || ''

    for (let i = charIndex; !isNaN(linesArray[lineIndex][i + 1]); i++) {
        strNumber += linesArray[lineIndex][i + 1]
    }

    for (let i = charIndex; !isNaN(linesArray[lineIndex][i - 1]); i--) {
        strNumber = linesArray[lineIndex][i - 1] + strNumber
    }

    return parseInt(strNumber)
}
