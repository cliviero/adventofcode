const { readlineReducer } = require('../utils/read-line-reducer');

readlineReducer("day-11/input.txt", (image, line) => (
    [...image, line]
), []).then(image => {
    const universe = createUniverse(image)
    universe.expand()
    console.log(universe.getShortestPathSum())
})

function createUniverse(image) {

    let universe = image
    let points = []

    function expand() {
        expandVertically(2)
        expandHorizontally(2)
    }

    function expandVertically(times) {
        for (let j = 0; j < universe[0].length; j++) {
            if (universe.every(row => row[j] === '.')) {
                for (let i = 0; i < universe.length; i++) {
                    universe[i] = universe[i].substring(0, j) + '.'.repeat(times - 1) + universe[i].substring(j)
                }
                j += times - 1
            }
        }
    }

    function expandHorizontally(times) {
        for (let i = 0; i < universe.length; i++) {
            const onlyDotsRegex = /^\.+$/

            if (onlyDotsRegex.test(universe[i])) {
                universe = universe.slice(0, i).concat(Array(times).fill(universe[i])).concat(universe.slice(i + 1, universe.length))
                i += times - 1
            } else {
                let hashIndex = universe[i].indexOf('#')

                while (hashIndex !== -1) {
                    points.push([i, hashIndex])
                    hashIndex = universe[i].indexOf('#', hashIndex + 1)
                }
            }
        }
    }

    function getShortestPathSum() {
        return generatePointCombinations().reduce((shortestPathSum, pointCombination) => {
            const shortestPathSteps = getShortestPathSteps(pointCombination)
            shortestPathSum += shortestPathSteps
            return shortestPathSum
        }, 0)
    }

    function generatePointCombinations() {
        const result = []

        for (let i = 0; i < points.length; i++) {
            for (let j = i + 1; j < points.length; j++) {
                result.push([points[i], points[j]])
            }
        }

        return result
    }

    function getShortestPathSteps(pointCombination) {
        return Math.abs(pointCombination[0][0] - pointCombination[1][0]) + Math.abs(pointCombination[0][1] - pointCombination[1][1])
    }

    return {
        expand,
        getShortestPathSum
    }
}