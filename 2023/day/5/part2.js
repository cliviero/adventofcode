const path = require('node:path');
const { readlineReducer } = require('../../lib/readLineReducer');

const seedsHeader = "seeds:"

const headers = [
  seedsHeader,
  "seed-to-soil map:",
  "soil-to-fertilizer map:",
  "fertilizer-to-water map:",
  "water-to-light map:",
  "light-to-temperature map:",
  "temperature-to-humidity map:",
  "humidity-to-location map:",
]

readlineReducer(path.join(__dirname, 'input.txt'), (mappedNumbers, line) => {
  const trimmedLine = line.trim()

  // first line
  if (trimmedLine.includes(seedsHeader)) {
    return trimmedLine.split(":")[1].split(" ")
      .filter(Boolean)
      .map(Number)
      .reduce((pairs, number, index, seeds) => {
        if (index % 2 === 0) {
          pairs.push({
            sourceStart: number,
            sourceEnd: number + seeds[index + 1] - 1,
            destinationStart: number,
            destinationEnd: number + seeds[index + 1] - 1
          });
        }
        return pairs;
      }, []);

    // header line
  } else if (headers.some(header => trimmedLine.includes(header))) {
    return mappedNumbers.map(({ destinationStart, destinationEnd }) => ({
      sourceStart: destinationStart,
      sourceEnd: destinationEnd,
      destinationStart,
      destinationEnd,
    }))

    // numbers line
  } else if (trimmedLine) {
    const [destinationRangeStart, sourceRangeStart, rangeLength] = trimmedLine.split(" ").map(Number);
    const sourceRangeEnd = sourceRangeStart + rangeLength - 1;

    return mapNumbers({ destinationRangeStart, sourceRangeStart, sourceRangeEnd }, mappedNumbers)
  }
  
  return mappedNumbers
}, []).then(mappedNumbers => {
  const locations = mappedNumbers.map(({ destinationStart }) => destinationStart)
  console.log(Math.min(...locations))
})

function mapNumbers(ranges, sourceNumbers, destinationNumbers = []) {
  if (!sourceNumbers || sourceNumbers.length === 0) {
    return destinationNumbers
  }

  const { destinationRangeStart, sourceRangeStart, sourceRangeEnd } = ranges
  const sourceNumberCopy = [...sourceNumbers]
  const { sourceStart, sourceEnd, destinationStart, destinationEnd } = sourceNumberCopy[0]

  if (sourceStart !== destinationStart && sourceEnd !== destinationEnd) {
    destinationNumbers.push({
      sourceStart,
      sourceEnd,
      destinationStart,
      destinationEnd
    });
  } else if (sourceStart >= sourceRangeStart && sourceEnd <= sourceRangeEnd) {
    destinationNumbers.push({
      sourceStart,
      sourceEnd,
      destinationStart: destinationRangeStart + (sourceStart - sourceRangeStart),
      destinationEnd: destinationRangeStart + (sourceEnd - sourceRangeStart)
    });
  } else if (sourceStart >= sourceRangeStart && sourceStart <= sourceRangeEnd) {
    destinationNumbers.push({
      sourceStart,
      sourceEnd,
      destinationStart: destinationRangeStart + (sourceStart - sourceRangeStart),
      destinationEnd: destinationRangeStart + (sourceRangeEnd - sourceRangeStart)
    });
    sourceNumberCopy.push({
      sourceStart: sourceRangeEnd + 1,
      sourceEnd,
      destinationStart: sourceRangeEnd + 1,
      destinationEnd
    });
  } else if (sourceEnd >= sourceRangeStart && sourceEnd <= sourceRangeEnd) {
    destinationNumbers.push({
      sourceStart,
      sourceEnd,
      destinationStart: destinationRangeStart,
      destinationEnd: destinationRangeStart + (sourceEnd - sourceRangeStart)
    });
    sourceNumberCopy.push({
      sourceStart,
      sourceEnd: sourceRangeStart - 1,
      destinationStart: sourceStart,
      destinationEnd: sourceRangeStart - 1
    });
  } else {
    destinationNumbers.push({
      sourceStart,
      sourceEnd,
      destinationStart,
      destinationEnd
    });
  }
  sourceNumberCopy.splice(0, 1)
  return mapNumbers(ranges, sourceNumberCopy, destinationNumbers)
}