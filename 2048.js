document.addEventListener('DOMcontentloaded', () => {
  const gridDisplay = document.querySelector('.grid') 
  const scoreDisplay = document.getElementById('score')
  const resultDisplay = document.getElementById('result')
  const width = 4
  let squares = []

//playing board

function createBoard() {
  for (let i=0 ; i < width*width; i++) {
    square = document.createElement('div')
    square.innerHTML = 0
    gridDisplay.appendChild(square)
    squares.push(square)
  }
}
createBoard()

}) 


