const path = require('node:path');
const { readlineReducer } = require('../../lib/readLineReducer');

readlineReducer(path.join(__dirname, 'input.txt'), (lines, line) => {
    return lines.concat([line.split(':')[1].split(' ').filter(Boolean).map(Number)])
}, []).then(([times, distances]) => {
    let waysToWinProduct = 1

    for (let i = 0; i < times.length; i++) {
        const time = times[i]
        const distance = distances[i]

        let waysToWin = 0
        for (let holdButtonTime = 0; holdButtonTime < time; holdButtonTime++) {
            let traveled = holdButtonTime * (time - holdButtonTime);

            if (traveled > distance) {
                waysToWin++;
            }
        }
        
        waysToWinProduct *= waysToWin
    }
    
    console.log(waysToWinProduct)
})
