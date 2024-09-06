const path = require('node:path');
const { readlineReducer } = require('../../lib/readLineReducer')

const mirrors = []

readlineReducer(path.join(__dirname, 'input.txt'), (mirrors, line) => {
  if (!line) {
    // switch mirror
    mirrors.push([])
  } else {
    if (mirrors.length === 0) {
      // first mirror
      mirrors.push([])
    }
    // filling mirror
    mirrors[mirrors.length - 1].push(line)
  }
  return mirrors
}, mirrors).then(mirrors => {
  let notesSum = 0

  for (const mirror of mirrors) {
    const horizontalReflectionNotes = (indexOfHorizontalReflection(mirror) + 1) * 100
    const verticalReflectionNotes = indexOfVerticalReflection(mirror) + 1

    const notes = horizontalReflectionNotes || verticalReflectionNotes
    notesSum += notes
  }

  console.log(notesSum)
})

function indexOfVerticalReflection(mirror) {
  const transposedMirror = transposeMirror(mirror)
  return indexOfHorizontalReflection(transposedMirror)
}

function transposeMirror(mirror) {
  return mirror[0].split('').map((_, columnIndex) => mirror.map(row => row[columnIndex]).join(''));
}

function indexOfHorizontalReflection(mirror) {
  for (let i = 0; i < mirror.length - 1; i++) {
    let topIndex = i
    let bottomIndex = i + 1

    let row = mirror[topIndex];
    let reflectedRow = mirror[bottomIndex];

    while (row && reflectedRow && row === reflectedRow) {
      topIndex--
      bottomIndex++
      row = mirror[topIndex]
      reflectedRow = mirror[bottomIndex]
    }

    // topIndex or bottomIndex out of bound 
    // it means that part of the pattern has nowhere to reflect onto 
    if (!row || !reflectedRow) {
      return i
    }
  }
  // index not found
  return -1
}