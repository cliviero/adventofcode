const path = require('node:path');
const { readlineReducer } = require('../../lib/readLineReducer');

readlineReducer(path.join(__dirname, 'input.txt'), ({ instructionsSequence, nodes }, line) => {
    if ([...line].every(char => char === 'L' || char === 'R')) {
        instructionsSequence += line
    } else if (line) {
        const [start, end] = line.split('=').map(substring => substring.trim())
        const [leftEnd, rightEnd] = end.replace('(', '').replace(')', '').split(',').map(substring => substring.trim())

        nodes[start] = { leftEnd, rightEnd }
    }
    return { instructionsSequence, nodes }
}, { instructionsSequence: '', nodes: {} }).then(({ instructionsSequence, nodes }) => {
    let stepsByNode = []
    
    Object.keys(nodes).forEach(start => {
        if (start.endsWith('A')) {
            let steps = 0
            let i = 0
            let currentNode = start

            while (!currentNode.endsWith('Z')) {
                const instruction = instructionsSequence[i]
        
                if (!instruction) {
                    i = 0
                } else {
                    currentNode = instruction === 'L' ? nodes[currentNode].leftEnd : nodes[currentNode].rightEnd
                    steps++
                    i++
                }
            }
    
            stepsByNode.push(steps)
        }
    })

    let steps = stepsByNode[0];
    for (let i = 1; i < stepsByNode.length; i++) {
        steps = lcm(steps, stepsByNode[i]);
    }

    console.log(steps)
})

function gcd(a, b) {
    return b === 0 ? a : gcd(b, a % b);
}

function lcm(a, b) {
    return (a * b) / gcd(a, b);
}