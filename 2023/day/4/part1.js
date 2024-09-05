const path = require('node:path');
const { readlineReducer } = require('../../lib/readLineReducer');

const initialValue = 0

readlineReducer(path.join(__dirname, 'input.txt'), (totalPoints, line) => {
    const cardDetail = line.trim().split(':')[1]

    const [leftSide, rightSide] = cardDetail.trim().split('|')
    const myNumbers = leftSide.trim().split(' ').filter(Boolean)
    const winningNumbers = new Set(rightSide.trim().split(' ').filter(Boolean))
    const matchingNumbers = myNumbers.filter((myNumber) => winningNumbers.has(myNumber))

    let cardPoints = matchingNumbers.reduce((total, _, index) => index === 0 ? total + 1 : total * 2, 0)

    return totalPoints += cardPoints
}, initialValue).then(console.log)