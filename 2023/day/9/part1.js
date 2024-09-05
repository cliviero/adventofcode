const path = require('node:path');
const { readlineReducer } = require('../../lib/readLineReducer');

readlineReducer(path.join(__dirname, 'input.txt'), (predictions, line) => {
    const history = line.split(' ').map(Number)
    return [...predictions, guessNextHistoryNumber(history)]
}, []).then(predictions => {
    const predictionsSum = predictions.reduce((accumulator, currentValue) => accumulator + currentValue, 0)
    console.log(predictionsSum)
})

function guessNextHistoryNumber(history) {
    const secuences = [history, ...generateSecuence(history)]
    secuences.reverse()
    const newSecuences = addNextSecuenceNumber(secuences)
    return newSecuences[newSecuences.length - 1][newSecuences[newSecuences.length - 1].length - 1]
}

function generateSecuence(previousSecuence) {

    const newSecuence = previousSecuence.reduceRight((accumulator, currentValue, currentIndex) => {
        if (currentIndex > 0) {
            accumulator.unshift(currentValue - previousSecuence[currentIndex - 1])
        }
        return accumulator
    }, [])

    if (newSecuence.every(value => value === 0)) {
        return [newSecuence]
    }

    return [newSecuence, ...generateSecuence(newSecuence)]
}

function addNextSecuenceNumber(secuences) {
    return secuences.map((secuence, index) => {
        if (!secuence.every(value => value === 0)) {
            const nextSecuenceNumber = secuence[secuence.length - 1] + secuences[index - 1][secuences[index - 1].length - 1];
            secuence.push(nextSecuenceNumber);
        }
        return secuence;
    });
}