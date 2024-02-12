const { readlineReducer } = require('../utils/readLineReducer');

const initialValue = 0

readlineReducer("day2/input.txt", (powerSum, line) => {
    const [_, gameRecord] = line.trim().split(':')

    let minimumRedCubeQty = 1
    let minimumGreenCubeQty = 1
    let minimumBlueCubeQty = 1

    gameRecord.trim().split(';').forEach((gameSet) => {
        gameSet.trim().split(',').forEach((colorCubes) => {
            const [cubeQtyStr, cubeColor] = colorCubes.trim().split(' ')
            const cubeQty = parseInt(cubeQtyStr)

            if (cubeColor === 'red' && cubeQty > minimumRedCubeQty) {
                minimumRedCubeQty = cubeQty
            }

            if (cubeColor === 'green' && cubeQty > minimumGreenCubeQty) {
                minimumGreenCubeQty = cubeQty
            }

            if (cubeColor === 'blue' && cubeQty > minimumBlueCubeQty) {
                minimumBlueCubeQty = cubeQty
            }
        })
    })
    return powerSum += minimumRedCubeQty * minimumGreenCubeQty * minimumBlueCubeQty
}, initialValue).then(console.log)