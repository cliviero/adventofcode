const { readlineReducer } = require('../utils/readLineReducer');

readlineReducer("day8/input.txt", ({ instructionsSequence, nodes }, line) => {
    if ([...line].every(char => char === 'L' || char === 'R')) {
        instructionsSequence = instructionsSequence.concat(line)
    } else if (line) {
        const [start, end] = line.split('=').map(substring => substring.trim())
        const [leftEnd, rightEnd] = end.replace('(', '').replace(')', '').split(',').map(substring => substring.trim())

        nodes[start] = { leftEnd, rightEnd }
    }
    return { instructionsSequence, nodes }
}, { instructionsSequence: '', nodes: {} }).then(({ instructionsSequence, nodes }) => {
    let steps = 0
    let i = 0
    let currentNode = 'AAA'

    while (currentNode !== 'ZZZ') {
        const instruction = instructionsSequence[i]

        if (!instruction) {
            i = 0
        } else {
            currentNode = instruction === 'L' ? nodes[currentNode].leftEnd : nodes[currentNode].rightEnd
            steps++
            i++
        }
    }

    console.log(steps)
})