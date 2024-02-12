const { readlineReducer } = require('../lib/readLineReducer')

readlineReducer("day12/input.txt", (totalArrangements, line) => {
  const [conditions, contiguousGroupDamagedSprings] = line.split(' ')
  totalArrangements += countArrangements(conditions, contiguousGroupDamagedSprings.split(','))
  return totalArrangements
}, 0).then(console.log)

const countArrangements = (conditions, contiguousGroupDamagedSprings) => {
  const splitConditions = conditions.split('.').filter(Boolean)
  if (splitConditions.length === contiguousGroupDamagedSprings.length && contiguousGroupDamagedSprings.every((group, i) => group == splitConditions[i]?.length)) return 1

  let totalCount = 0

  if (conditions.includes('?')) {
    const possibleArrangements1 = countArrangements(conditions.replace('?', '.'), contiguousGroupDamagedSprings)
    const possibleArrangements2 = countArrangements(conditions.replace('?', '#'), contiguousGroupDamagedSprings)
    totalCount += possibleArrangements1
    totalCount += possibleArrangements2
  }

  return totalCount
}
