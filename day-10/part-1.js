const { readlineReducer } = require('../utils/read-line-reducer');

readlineReducer("day-10/input.txt", (pipesMatrix, line) => (
    [...pipesMatrix, line]
), []).then(pipesMatrix => {
    const startingPoint = getStartingPoint(pipesMatrix)
    const giantLoopFromStartingPoint = findGiantLoopFromStartingPoint(pipesMatrix, startingPoint)
    console.log((giantLoopFromStartingPoint.getSteps() + 1) / 2)
})

function getStartingPoint(linesArray) {
    const startingPointValue = 'S'
    for (let y = 0; y < linesArray.length; y++) {
        for (let x = 0; x < linesArray[y].length; x++) {
            if (linesArray[y][x] === startingPointValue) {
                return [x, y]
            }
        }
    }
    return null // Handle case when starting point is not found
}

const Directions = {
    NORTH: [0, -1],
    WEST: [-1, 0],
    SOUTH: [0, 1],
    EAST: [1, 0]
}

const pipes = {
    '|': {
        [Directions.NORTH]: Directions.NORTH,
        [Directions.SOUTH]: Directions.SOUTH
    },
    '-': {
        [Directions.WEST]: Directions.WEST,
        [Directions.EAST]: Directions.EAST
    },
    'L': {
        [Directions.SOUTH]: Directions.EAST,
        [Directions.WEST]: Directions.NORTH
    },
    'J': {
        [Directions.SOUTH]: Directions.WEST,
        [Directions.EAST]: Directions.NORTH
    },
    '7': {
        [Directions.EAST]: Directions.SOUTH,
        [Directions.NORTH]: Directions.WEST
    },
    'F': {
        [Directions.WEST]: Directions.SOUTH,
        [Directions.NORTH]: Directions.EAST
    },
    '.': {}
}

function findGiantLoopFromStartingPoint(pipesMatrix, startingPoint) {

    const loops = [
        createLoop(Directions.NORTH),
        createLoop(Directions.WEST),
        createLoop(Directions.SOUTH),
        createLoop(Directions.EAST)
    ]

    const giantLoopSteps = Math.max(...loops.map(loop => {
        return loop.getSteps()
    }))

    return loops.find(loop => loop.getSteps() === giantLoopSteps)

    function createLoop(startingDirection) {

        let currentPoint = startingPoint
        let currentDirection = startingDirection
        let steps = 0

        while (
            currentPoint[0] >= 0 &&
            currentPoint[1] >= 0 &&
            currentPoint[1] < pipesMatrix.length &&
            currentPoint[0] < pipesMatrix[currentPoint[1]].length
        ) {
            const newPoint = [currentPoint[0] + currentDirection[0], currentPoint[1] + currentDirection[1]]

            const pipe = pipesMatrix[newPoint[1]][newPoint[0]]

            if (pipes[pipe] && pipes[pipe][currentDirection]) {
                currentPoint = newPoint
                currentDirection = pipes[pipe][currentDirection]
                steps++
            } else if (pipe === '.') {
                break // Ground
            } else {
                break // Unknown pipe
            }
        }

        function getSteps() {
            return steps
        }

        return {
            getSteps
        }
    }
}