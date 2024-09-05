const path = require('node:path');
const { readlineReducer } = require('../../lib/readLineReducer');

const initialValue = 0

readlineReducer(path.join(__dirname, 'input.txt'), (gameIDsSum, line) => {
    const [gameID, gameRecord] = line.trim().split(':')
    
    let gameIDIsSummable = gameRecord.trim().split(';').every((gameSet) =>
    
        gameSet.trim().split(',').every((colorCubes) => {
            const [cubeQty, cubeColor] = colorCubes.trim().split(' ')
            
            return !(cubeColor === 'red' && cubeQty > 12) &&
                !(cubeColor === 'green' && cubeQty > 13) &&
                !(cubeColor === 'blue' && cubeQty > 14)
        })
    )
    
    if (gameIDIsSummable) {
        gameIDsSum += parseInt(gameID.split(' ')[1])
    }

    return gameIDsSum
}, initialValue).then(console.log)