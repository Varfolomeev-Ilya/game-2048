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
    "2048": "#fa6e32eb",
  }
  
    //playing board
    function createBoard() {
      for (let i = 0 ; i < width * width; i++) {
        square = document.createElement('div');
        square.innerHTML = '';
        gridDisplay.appendChild(square);
        squares.push(square);       
      } 
      generateRandomNumbers();
      generateRandomNumbers();
    }
     createBoard();
 
    //random numbers on board
     function generateRandomNumbers() {
       let randomNumbers = Math.floor(Math.random() * squares.length)
       if (squares[randomNumbers].innerHTML == 0) {
         squares[randomNumbers].innerHTML = 2;    
          } else generateRandomNumbers(); 
            checkLoose(); 
            colorChange();                  
     } 

     function createRowOnMove(i) {
      let one = squares[i].innerHTML;
      let two = squares[i+1].innerHTML;
      let three = squares[i+2].innerHTML;
      let four = squares[i+3].innerHTML;
      let row = [parseInt(one), parseInt(two), parseInt(three), parseInt(four)];  
      return row;
     } 

    //  move left and right
     function moveRight() {
       for (let i = 0; i < width * width ; i++) {
          if (i % 4 === 0) {
            let row = createRowOnMove(i);
            let filteredRow = row.filter(num => num) 
            let missing = 4 - filteredRow.length;
            let zeros = Array(missing).fill('');
            let newRow = zeros.concat(filteredRow);

            squares[i].innerHTML = newRow[0];
            squares[i+1].innerHTML = newRow[1];
            squares[i+2].innerHTML = newRow[2];
            squares[i+3].innerHTML = newRow[3]; 
        }   
       } 
      }   
      
     function moveLeft() {
      for (let i = 0; i < width * width ; i++) {
        if (i % 4 === 0) {
           let row = createRowOnMove(i);
           let filteredRow = row.filter(num => num) 
           let missing = 4 - filteredRow.length;
           let zeros = Array(missing).fill('');;
           let newRow = filteredRow.concat(zeros);

           squares[i].innerHTML = newRow[0];
           squares[i+1].innerHTML = newRow[1];
           squares[i+2].innerHTML = newRow[2];
           squares[i+3].innerHTML = newRow[3]; 
        }
      }
    }

     function createColumnOnMove(i) {
      let one = squares[i].innerHTML;
      let two = squares[i + width].innerHTML;
      let three = squares[i + (width * 2)].innerHTML;
      let four = squares[i + (width * 3)].innerHTML;
      let column = [parseInt(one), parseInt(two), parseInt(three), parseInt(four)];
      return column;
     }
      
    // move down and up
     function moveDown() {
      for (let i = 0; i < 4; i++) {
        let column = createColumnOnMove(i);
        let filteredColumn = column.filter(num => num);
        let missing = 4 - filteredColumn.length;
        let zeros = Array(missing).fill('');
        let newColumn = zeros.concat(filteredColumn);

        squares[i].innerHTML = newColumn[0];
        squares[i + width].innerHTML = newColumn[1];
        squares[i + width * 2].innerHTML = newColumn[2];
        squares[i + width * 3].innerHTML = newColumn[3];
      }
    }

     function moveUp() {
      for (let i = 0; i < 4; i++) {
        let column = createColumnOnMove(i);
        let filteredColumn = column.filter(num => num);
        let missing = 4 - filteredColumn.length;
        let zeros = Array(missing).fill('');
        let newColumn = filteredColumn.concat(zeros);

        squares[i].innerHTML = newColumn[0];
        squares[i + width].innerHTML = newColumn[1];
        squares[i + width * 2].innerHTML = newColumn[2];
        squares[i + width * 3].innerHTML = newColumn[3];
      } 
    }

      // sum Row
     function sumRow() {
        for (let i = 0; i < 15  ; i++) {
          let combineTotal = parseInt(squares[i].innerHTML) + parseInt(squares[i+1].innerHTML);
            if (squares[i].innerHTML === squares[i+1].innerHTML) {
              squares[i].innerHTML = combineTotal;
              squares[i+1].innerHTML = 0;
              const value = !combineTotal ? 0 : combineTotal;
              score += value;
              scoreDisplay.innerHTML = score;
          }
       }  
        checkWin()
     }

      // sum Column
      function sumColumn() {
       for (let i = 0; i < 12; i++) {
         let combineTotal = parseInt(squares[i].innerHTML) + parseInt(squares[i + width].innerHTML);
           if (squares[i].innerHTML === squares[i + width].innerHTML) {
             squares[i].innerHTML = combineTotal;
             squares[i + width].innerHTML = 0;
             const value = !combineTotal ? 0 : combineTotal;
             score += value;
             scoreDisplay.innerHTML = score;  
        }
      }
      checkWin();
    }

     //keycodes
    function control(e) {
      switch (e.keyCode) {
        case 39:
        onmoveRightButtonPress();
          break;
        case 37:
        onmoveLeftButtonPress();
          break;
       case 40: 
        onmoveDownButtonPress();
          break;
       case 38:
        onmoveUpButtonPress();
          break; 
      }  
    }  

    function onmoveRightButtonPress() {
      moveRight();
      sumRow();
      moveRight();
      generateRandomNumbers();
    }

    function onmoveLeftButtonPress() {
      moveLeft();
      sumRow();
      moveLeft();
      generateRandomNumbers();
    }

    function onmoveDownButtonPress() {
      moveDown();
      sumColumn();
      moveDown();
      generateRandomNumbers();
    }

    function onmoveUpButtonPress() {
      moveUp();
      sumColumn();
      moveUp();
      generateRandomNumbers();
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
      clearPlayingField();
      generateRandomNumbers();
      clearResultScore();
    }

    // clear score,scoredisplay,resultdisplay
    function clearResultScore() {
      scoreDisplay.innerHTML = 0;
      score = 0;
      resultDisplay.innerHTML = '';
    }
  
    // Clear clearPlayingField
    function clearPlayingField() {
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





  
 