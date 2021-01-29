document.addEventListener('DOMContentLoaded', () => {
  const gridDisplay = document.querySelector('.grid');
  const scoreDisplay = document.getElementById('score');
  const resultDisplay = document.getElementById('result');
  const bestDisplay = document.getElementById('best');
  let scoreStorage = localStorage.getItem('bestValue');
  let bestValue = !scoreStorage ? '0' : scoreStorage;

  const width = 4;
  let squares = [];
  let score = 0;
  bestDisplay.innerHTML = bestValue;
  restart.onclick = pressNewGameButton;
  document.addEventListener('keyup', control);

  const colors = {
    "": "#bababaeb",
    "2": "#f7ababeb",
    "4": "#f7abf0eb",
    "8": "#d1abf7eb",
    "16": "#abb2f7eb",
    "32": "#abe9f7eb",
    "64": "#abf7e0eb",
    "128": "#abf7bbeb",
    "256": "#bff7abeb",
    "512": "#daf7abeb",
    "1024": "#7f1f7abeb",
    "2048": "#fa6e32eb"
  }

  function createBoard() {
    for (let i = 0; i < width * width; i++) {
      square = document.createElement('div');
      square.innerHTML = '';
      gridDisplay.appendChild(square);
      squares.push(square);
    }
    getRandomNumbers();
  }
  createBoard();

  function getRandomNumbers() {
    for (let i = 0; i < 2; i++) {
      let randomNumbers = Math.floor(Math.random() * squares.length);
      if (squares[randomNumbers].innerHTML == 0) {
        squares[randomNumbers].innerHTML = 2;
      }
      checkLoose();
      colorChange();
    }
  }

  function goLeft() {
    for (let i = 0; i < width * width; i++) {
      if (i % 4 === 0) {
        let valtransformateRow = transformateRow(row = sumRow(i));
        let newRow = valtransformateRow.filteredRow.concat(valtransformateRow.zeros);
        sumSquaresRow(newRow, squares, i);
      }
    }
  }

  function goRight() {
    for (let i = 0; i < width * width; i++) {
      if (i % 4 === 0) {
        let valtransformateRow = transformateRow(row = sumRow(i));
        let newRow = valtransformateRow.zeros.concat(valtransformateRow.filteredRow);
        sumSquaresRow(newRow, squares, i);
      }
    }
  }

  function sumRow(i) {
    let row = [];
    for (let j = 0; j < 4; j++) {
      row.push(parseInt(squares[i + j].innerHTML));
    }
    return row;
  }

  function sumSquaresRow(newRow, squares, i) {
    for (let j = 0; j < 4; j++) {
      if (j === 0 && i === 0) {
        squares[i].innerHTML = newRow[j];
      } else {
        squares[i + j].innerHTML = newRow[j];
      }
    }
  }

  function transformateRow(row) {
    let filteredRow = row.filter(a => a);
    let missing = 4 - filteredRow.length;
    let zeros = Array(missing).fill('');
    return {
      zeros,
      filteredRow
    }
  }

  function scoreCounter(combineTotal) {
    const value = !combineTotal ? 0 : combineTotal;
    score += value;
    scoreDisplay.innerHTML = score;
    return score;
  }

  function sumRowOnMove() {
    for (let i = 0; i < 15; i++) {
      let combineTotal = parseInt(squares[i].innerHTML) + parseInt(squares[i + 1].innerHTML);
      if (squares[i].innerHTML === squares[i + 1].innerHTML) {
        squares[i].innerHTML = combineTotal;
        squares[i + 1].innerHTML = 0;
        scoreCounter(combineTotal);
      }
    }
    checkWin();
  }

  function goUp() {
    for (let i = 0; i < 4; i++) {
      let valTransformateColumn = transformateColumn(column = sumColumn(i));
      let newColumn = valTransformateColumn.filteredColumn.concat(valTransformateColumn.zeros);
      sumSquaresColumn(newColumn, squares, i);
    }
  }

  function goDown() {
    for (let i = 0; i < 4; i++) {
      let valTransformateColumn = transformateColumn(column = sumColumn(i));
      let newColumn = valTransformateColumn.zeros.concat(valTransformateColumn.filteredColumn);
      sumSquaresColumn(newColumn, squares, i);
    }
  }

  function sumColumn(i) {
    let column = [];
    for (let j = 0; j < 4; j++) {
      column.push(parseInt(squares[i + (width * j)].innerHTML));
    }
    return column;
  }

  function sumSquaresColumn(newColumn, squares, i) {
    for (let j = 0; j < 4; j++) {
      if (i === 0 && j === 0) {
        squares[i].innerHTML = newColumn[j];
      } else {
        squares[i + width * j].innerHTML = newColumn[j];
      }
    }
  }

  function transformateColumn() {
    let filteredColumn = column.filter(num => num);
    let missing = 4 - filteredColumn.length;
    let zeros = Array(missing).fill('');
    return {
      zeros,
      filteredColumn
    }
  }

  function sumColumnOnMove() {
    for (let i = 0; i < 12; i++) {
      let combineTotal = parseInt(squares[i].innerHTML) + parseInt(squares[i + width].innerHTML);
      if (squares[i].innerHTML === squares[i + width].innerHTML) {
        squares[i].innerHTML = combineTotal;
        squares[i + width].innerHTML = 0;
        scoreCounter(combineTotal);
      }
    }
    checkWin();
  }

  function control(e) {
    switch (e.keyCode) {
      case 39:
        onArrowRightButtonPress();
        break;
      case 37:
        onArrowLeftButtonPress();
        break;
      case 40:
        onArrowDownButtonPress();
        break;
      case 38:
        onArrowUpButtonPress();
        break;
    }
  }

  function onArrowRightButtonPress() {
    getRandomNumbers();
    sumRowOnMove();
    goRight();
    colorChange();
  }

  function onArrowLeftButtonPress() {
    getRandomNumbers();
    sumRowOnMove();
    goLeft();
    colorChange();
  }

  function onArrowDownButtonPress() {
    getRandomNumbers();
    sumColumnOnMove();
    goDown();
    colorChange();
  }

  function onArrowUpButtonPress() {
    getRandomNumbers();
    sumColumnOnMove();
    goUp();
    colorChange();
  }

  function checkWin() {
    for (let i = 0; i < squares.length; i++) {
      if (squares[i].innerHTML === '2048') {
        resultDisplay.innerHTML = 'You win';
      }
      if (bestValue < squares.length) {
        bestDisplay.innerHTML = score > parseInt(bestValue) ? score : bestValue;
        localStorage.setItem('bestValue', bestDisplay.innerHTML);
      }
      if (scoreStorage < score) {
        bestDisplay.innerHTML = score > parseInt(bestValue) ? score : bestValue;
        localStorage.setItem('bestValue', bestDisplay.innerHTML);
      }
    }
  }

  function checkLoose() {
    let result = [];
    for (let i = 0; i < squares.length; i++) {
      if (squares[i].innerHTML === '') {
        result.push('');
      }
    }
    let rowCheck;
    let columnCheck;
    let zeros = 0;
    if (zeros === 0) {
      for (let i = 0; i < squares.length; i++) {
        for (let i = 0; i < 15; i++) {
          if (squares[i].innerHTML === squares[i + 1].innerHTML) {
            rowCheck = true;
          }
        }
      }
      if (!rowCheck) {
        for (let i = 0; i < 12; i++) {
          if (squares[i].innerHTML === squares[i + width].innerHTML) {
            columnCheck = true;
          }
        }
      }
      if (!rowCheck && !columnCheck && result.length === 0) {
        resultDisplay.innerHTML = 'Game over';
        document.removeEventListener('keyup', control);
      }
    }
  }

  function pressNewGameButton() {
    clearBoard();
    clearResult();
    getRandomNumbers();
  }

  function clearResult() {
    resultDisplay.innerHTML = '';
    scoreDisplay.innerHTML = 0;
    score = 0;
  }

  function clearBoard() {
    for (let i = 0; i < squares.length; i++) {
      squares[i].innerHTML = '';
    }
  }

  function colorChange() {
    for (let i = 0; i < squares.length; i++) {
      squares[i].style.backgroundColor = colors[squares[i].innerHTML];
    }
  }
})

