const { readlineReducer } = require('../utils/readLineReducer');

readlineReducer("day9/input.txt", (predictions, line) => {
    const history = line.split(' ').map(Number)
    return [...predictions, guessPreviousHistoryNumber(history)]
}, []).then(predictions => {
    const predictionsSum = predictions.reduce((accumulator, currentValue) => accumulator + currentValue, 0)
    console.log(predictionsSum)
})

function guessPreviousHistoryNumber(history) {
    const secuences = [history, ...generateSecuence(history)]
    secuences.reverse()
    const newSecuences = addPreviousSecuenceNumber(secuences)
    return newSecuences[newSecuences.length - 1][0]
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

function addPreviousSecuenceNumber(secuences) {
    return secuences.map((secuence, index) => {
        if (!secuence.every(value => value === 0)) {
            const previousSecuenceNumber = secuence[0] - secuences[index - 1][0];
            secuence.unshift(previousSecuenceNumber);
        }
        return secuence;
    });
}