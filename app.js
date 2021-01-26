document.addEventListener('DOMContentLoaded', () => {
  const gridDisplay = document.querySelector('.grid');
  const scoreDisplay = document.getElementById('score');
  const resultDisplay = document.getElementById('result');
  const bestDisplay = document.getElementById('best');
  const scoreStorage = localStorage.getItem('bestValue');
  let bestValue = !scoreStorage ? '0' : scoreStorage;

  const width = 4;
  let squares = [];
  let score = 0;  
  bestDisplay.innerHTML = bestValue;
  restart.onclick = pressNewGameButton;
  document.addEventListener('keyup', control)

  const colors = {
    "": "#bababaeb",
    "2": "#f7ababeb",
    "4": "#f7abf0eb",
    "8": "#d1abf7eb",
    "16": "#abb2f7eb",
    "32": "#9abe9f7eb",
    "64": "#abf7e0eb",
    "128": "#abf7bbeb",
    "256": "#bff7abeb",
    "512": "#daf7abeb",
    "1024": "#7f1f7abeb",
    "2048": "#fa6e32eb"
  }
  
  //playing board
  function createBoard() {
    for (let i = 0 ; i < width * width; i++) {
      square = document.createElement('div');
      square.innerHTML = '';
      gridDisplay.appendChild(square);
      squares.push(square);       
    } 
      getRandomNumbers();
  }
     createBoard();
 
  //random numbers on board
  function getRandomNumbers() {
    const randomNumbers = Math.floor(Math.random() * squares.length);
      if (squares[randomNumbers].innerHTML == 0) {
         squares[randomNumbers].innerHTML = 2;    
      } else 
          checkLoose(); 
          colorChange();                  
  } 
     getRandomNumbers();

  //  move left and right
  function goRight() {
    for (let i = 0; i < width * width ; i++) {
      if (i % 4 === 0) {
        const valtransformateRow = transformateRow(row = sumRow(i));
        const newRow = valtransformateRow.zeros.concat(valtransformateRow.filteredRow);
        sumSquaresRow(newRow, squares, i);     
      }   
    } 
  }   
     
  function goLeft() {
    for (let i = 0; i < width * width ; i++) {
      if (i % 4 === 0) {
        const valtransformateRow = transformateRow(row = sumRow(i));
        const newRow = valtransformateRow.filteredRow.concat(valtransformateRow.zeros);
        sumSquaresRow(newRow, squares, i);
        
      }
    }
  }

  function sumRow(i) {
    const one = squares[i].innerHTML;
    const two = squares[i+1].innerHTML;
    const three = squares[i+2].innerHTML;
    const four = squares[i+3].innerHTML;
    const row = [parseInt(one), parseInt(two), parseInt(three), parseInt(four)];  
    return row;
  } 

  function sumSquaresRow(newRow, squares, i) { 
    for (let j = 0; j < width; j++) {
      squares[i+j].innerHTML = newRow[j];
    }  
  }

  function transformateRow(row) {
    const filteredRow = row.filter(num => num) 
    const missing = 4 - filteredRow.length;
    const zeros = Array(missing).fill('');
    return {zeros,
            filteredRow
    }
  }
  
  //scorecounter for rows and columns
  function scoreCounter(combineTotal) {
    const value = !combineTotal ? 0 : combineTotal;
    score += value;
    scoreDisplay.innerHTML = score;
    return score;
  } 

  // sum Rows
  function sumRowOnMove() {
    for (let i = 0; i < 15 ; i++) {
      const combineTotal = parseInt(squares[i].innerHTML) + parseInt(squares[i+1].innerHTML);
        if (squares[i].innerHTML === squares[i+1].innerHTML) {
            squares[i].innerHTML = combineTotal;
            squares[i+1].innerHTML = 0;
            // const value = !combineTotal ? 0 : combineTotal;
            // score += value;
            // scoreDisplay.innerHTML = score;
            scoreCounter(combineTotal);
      }
    }  
        checkWin();
  }

  // move down and up
  function goDown() {
    for (let i = 0; i < 4; i++) {
      const ValTransformateColumn = transformateColumn(column = sumColumn(i));
      const newColumn = ValTransformateColumn.zeros.concat(ValTransformateColumn.filteredColumn);
      sumSquaresColumn(newColumn, squares, i);
    }
  }

  function goUp() {
    for (let i = 0; i < 4; i++) {
      const ValTransformateColumn = transformateColumn(column = sumColumn(i));
      const newColumn = ValTransformateColumn.filteredColumn.concat(ValTransformateColumn.zeros);
      sumSquaresColumn(newColumn, squares, i);
    } 
  }

  function sumColumn(i) {
    const one = squares[i].innerHTML;
    const two = squares[i + width].innerHTML;
    const three = squares[i + (width * 2)].innerHTML;
    const four = squares[i + (width * 3)].innerHTML;
    const column = [parseInt(one), parseInt(two), parseInt(three), parseInt(four)];
    return column;
  }

  function sumSquaresColumn(newColumn, squares, i) {
    for (let j = 0; j < width ; j++) {
      squares[i + width * j].innerHTML = newColumn[j];
    }
  }

  function transformateColumn() {
    const filteredColumn = column.filter(num => num);
    const missing = 4 - filteredColumn.length;
    const zeros = Array(missing).fill('');
    return {zeros,
            filteredColumn
    }
  }
  // sum Column
  function sumColumnOnMove() {
    for (let i = 0; i < 12; i++) {
      const combineTotal = parseInt(squares[i].innerHTML) + parseInt(squares[i + width].innerHTML);
        if (squares[i].innerHTML === squares[i + width].innerHTML) {
           squares[i].innerHTML = combineTotal;
           squares[i + width].innerHTML = 0;
           scoreCounter(combineTotal); 
        }
    }
      checkWin();
  }

  //keycodes
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
    sumRowOnMove();
    goRight(squares);
    getRandomNumbers();
  }

  function onArrowLeftButtonPress() {
    sumRowOnMove();
    goLeft(squares);
    getRandomNumbers();
  }

  function onArrowDownButtonPress() {
    sumColumnOnMove();
    goDown(squares);
    getRandomNumbers();
  }

  function onArrowUpButtonPress() {
    sumColumnOnMove();
    goUp(squares);
    getRandomNumbers();
  }

  // check win
  function checkWin() {
    for (let i = 0; i < squares.length; i++) {
      if (squares[i].innerHTML === '2048') {
          resultDisplay.innerHTML = 'You win';
        } if (bestValue < squares.length) {
          bestDisplay.innerHTML = score > parseInt(bestValue) ? score : bestValue;
          localStorage.setItem('bestValue', bestDisplay.innerHTML);
          } if (scoreStorage < score)  {
            bestDisplay.innerHTML = score > parseInt(bestValue) ? score : bestValue;
            localStorage.setItem('bestValue', bestDisplay.innerHTML);
          }
    }
  }
  // check loose
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
          for (let i = 0; i < 15 ; i++) {
            if (squares[i].innerHTML === squares[i+1].innerHTML) {
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
       
  // button New game
  function pressNewGameButton() {   
    clearBoard();
    getRandomNumbers();
    getRandomNumbers();
    clearResult();
  }

  // clear score,scoredisplay,resultdisplay
  function clearResult() {
    resultDisplay.innerHTML = '';
    scoreDisplay.innerHTML = 0;
    score = 0;    
  }
  
  // Clear clearBoard
  function clearBoard() {
    for (let i = 0; i < squares.length; i++) {
      squares[i].innerHTML = '';
    }
        
  }
    
  // ColorChange
  function colorChange() {
    for (let i = 0; i < squares.length; i++) { 
      squares[i].style.backgroundColor = colors[squares[i].innerHTML];
    }
  } 
})





  
 