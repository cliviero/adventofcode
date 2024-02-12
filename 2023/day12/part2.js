const { readlineReducer } = require('../lib/readLineReducer')

const NUMBER_OF_COPIES = 5

readlineReducer("day12/input.txt", (totalPermutations, line) => {
    const [conditions, groups] = line.split(' ')
    const unfoldedConditions = Array(NUMBER_OF_COPIES).fill(conditions).join('?')
    const unfoldedGroups = Array(NUMBER_OF_COPIES).fill(groups).join(',')
    totalPermutations += countPermutations(unfoldedConditions, unfoldedGroups.split(',').map(Number))
    return totalPermutations
}, 0).then(console.log)

const isDamaged = (condition) => condition === '#'
const isUnknown = (condition) => condition === '?'

const memo = {}

const countPermutations = (conditions, groups) => {
    const key = `${conditions}-${groups.join(',')}`;

    if (key in memo) return memo[key]
    if (conditions === '') return groups.length === 0 ? 1 : 0

    const [firstCondition] = conditions

    let totalCount = 0;
    if (firstCondition === '.') {
        totalCount = countPermutations(conditions.slice(1), groups)
    } else if (firstCondition === '?') {
        totalCount = countPermutations('.' + conditions.slice(1), groups)
            + countPermutations('#' + conditions.slice(1), groups)
    } else {
        // firstCondition === '#'
        if (groups.length !== 0) {
            const [firstGroup, ...remainingGroups] = groups

            if (firstGroup <= conditions.length && conditions.split('').slice(0, firstGroup).every(condition => isDamaged(condition) || isUnknown(condition))) {
                if (firstGroup === conditions.length) {
                    totalCount = remainingGroups.length === 0 ? 1 : 0
                } else if (conditions[firstGroup] === '.') {
                    totalCount = countPermutations(conditions.slice(firstGroup + 1), remainingGroups)
                } else if (conditions[firstGroup] === '?') {
                    totalCount = countPermutations('.' + conditions.slice(firstGroup + 1), remainingGroups)
                }
            }
        }
    }

    memo[key] = totalCount
    return totalCount
}