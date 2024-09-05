const path = require('node:path');
const { readlineReducer } = require('../../lib/readLineReducer');

const seedsHeader = "seeds:"
const seedToSoilHeader = "seed-to-soil map:"
const soilToFertilizerHeader = "soil-to-fertilizer map:"
const fertilizerToWaterHeader = "fertilizer-to-water map:"
const waterToLightHeader = "water-to-light map:"
const lightToTemperatureHeader = "light-to-temperature map:"
const temperatureToHumidityHeader = "temperature-to-humidity map:"
const humidiyToLocationHeader = "humidity-to-location map:"

const headers = [
    seedsHeader,
    seedToSoilHeader,
    soilToFertilizerHeader,
    fertilizerToWaterHeader,
    waterToLightHeader,
    lightToTemperatureHeader,
    temperatureToHumidityHeader,
    humidiyToLocationHeader,
]

const initialValue = []

readlineReducer(path.join(__dirname, 'input.txt'), (mappedNumbers, line) => {
    const trimmedLine = line.trim()

    // first line
    if (trimmedLine.includes(seedsHeader)) {
        return trimmedLine.split(":")[1].split(" ").filter(Boolean).map(seed => ({
            source: parseInt(seed),
            destination: parseInt(seed),
        }))
        
        // header line
    } else if (headers.some(header => trimmedLine.includes(header))) {
        return mappedNumbers.map(({ destination }) => ({
            source: destination,
            destination,
        }))

        // numbers line
    } else if (trimmedLine) {
        const [destinationRangeStart, sourceRangeStart, rangeLength] = trimmedLine.split(" ").map(Number);

        return mappedNumbers.map(({ source, destination }) => {
            const shouldMap = source >= sourceRangeStart && source <= sourceRangeStart + rangeLength - 1;
            
            return {
                source,
                destination: shouldMap ? destinationRangeStart + (source - sourceRangeStart) : destination,
            }
        })
    }
    return mappedNumbers
}, initialValue).then(mappedNumbers => {
    const locations = mappedNumbers.map(({ destination }) => destination)
    console.log(Math.min(...locations))
})
