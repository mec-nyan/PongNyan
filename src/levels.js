import './brick.css'
import Visual from './visual'

// bricks
const marginLeft = 20
const marginTop = 20
const padding = 2
const brickHeight = 20
const brickWidth = 66
const brickTotalHeight = brickHeight + 2 * padding
const brickTotalWidth = brickWidth + 2 * padding
const bricksPerRow = 8

const rows = ['dark', 'middle', 'light', 'lighter']

const levels = { 
  level1: [],
  level2: [],
  level3: [],
}

// Let's create the first levels
for (let i = 0; i < 3; ++i) {
  for (let j = 0; j < i + 2; ++j) {
    for (let k = 0; k < 8; ++k) {
      let y = marginTop + padding + brickTotalHeight * j
      let x = marginLeft + padding + brickTotalWidth * k
      levels[`level${i+1}`].push(new Visual(brickWidth, brickHeight, x, y, `brick ${rows[j]}`, true))
    }
  }
}

export default levels

