const { readlineReducer } = require('../utils/readLineReducer');

readlineReducer("day12/input.txt", (arrangementSum, line) => {
    return arrangementSum
}, 0).then(console.log)