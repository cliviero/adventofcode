const { readlineReducer } = require('../utils/read-line-reducer');

readlineReducer("day-6/input.txt", (lines, line) => {
    return lines.concat(parseInt(line.split(':')[1].split(' ').filter(Boolean).join('')))
}, []).then(([time, distance]) => {
    let waysToWin = 0

    for (let holdButtonTime = 0; holdButtonTime < time; holdButtonTime++) {
        let traveled = holdButtonTime * (time - holdButtonTime);

        if (traveled > distance) {
            waysToWin++;
        }
    }

    console.log(waysToWin)
})
