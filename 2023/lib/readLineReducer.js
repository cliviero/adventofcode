const fs = require('node:fs');
const readline = require('node:readline');

async function readlineReducer(path, callbackfn, initialValue) {
    const rl = readline.createInterface({
        input: fs.createReadStream(path),
        crlfDelay: Infinity,
    })

    let accumulator = initialValue
    for await (const line of rl) {
        accumulator = callbackfn(accumulator, line)
    }

    return accumulator
}

module.exports = {
    readlineReducer
}