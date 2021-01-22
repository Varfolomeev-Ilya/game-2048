document.addEventListener('DOMContentLoaded', () => {
  const gridDisplay = document.querySelector('.grid');
  const scoreDisplay = document.getElementById('score');
  const resultDisplay = document.getElementById('result');
  const bestDisplay = document.getElementById('best');
  const width = 4;
  let squares = [];
  let score = 0;
  const scoreStorage = localStorage.getItem('bestValue');
  let bestValue = !scoreStorage ? '0' : scoreStorage;
  bestDisplay.innerHTML = bestValue;
  const colors = {
    "0": "#bababaeb",
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
      for (let i=0 ; i < width*width; i++) {
        square = document.createElement('div');
        square.innerHTML = '';
        gridDisplay.appendChild(square);
        squares.push(square);       
      } 
      generate();
      generate();
    }
     createBoard();
 
    //random numbers
     function generate() {
       let randomNumbers = Math.floor(Math.random() * squares.length)
       if (squares[randomNumbers].innerHTML == 0) {
          squares[randomNumbers].innerHTML = 2;    
       } else generate(); 
          checkLoose(); 
          colorSwitch();                  
     } 

    //  swipe left and right
     function moveRight() {
       for (let i=0; i < width*width ; i++) {
         if (i % 4 === 0) {
            let one = squares[i].innerHTML;
            let two = squares[i+1].innerHTML;
            let three = squares[i+2].innerHTML;
            let four = squares[i+3].innerHTML;
            let row = [parseInt(one), parseInt(two), parseInt(three), parseInt(four)];         
            // console.log(row);
            let filteredRow = row.filter(num => num) 
            // console.log(filteredRow);
            let missing = 4 - filteredRow.length;
            let zeros = Array(missing).fill('');
            // console.log(zeros.length); 
            let newRow = zeros.concat(filteredRow);
            // console.log(newRow);
            squares[i].innerHTML = newRow[0];
            squares[i+1].innerHTML = newRow[1];
            squares[i+2].innerHTML = newRow[2];
            squares[i+3].innerHTML = newRow[3]; 
        }   
       } 
      }   
      
     function moveLeft() {
      for (let i=0; i < width*width ; i++) {
        if (i % 4 === 0) {
            let one = squares[i].innerHTML;
            let two = squares[i+1].innerHTML;
            let three = squares[i+2].innerHTML;
            let four = squares[i+3].innerHTML;
            let row = [parseInt(one), parseInt(two), parseInt(three), parseInt(four)];
            // console.log(row);
            let filteredRow = row.filter(num => num) 
            // console.log(filteredRow);
            let missing = 4 - filteredRow.length;
            let zeros = Array(missing).fill('');
            // console.log(zeros.length); 
            let newRow = filteredRow.concat(zeros);
            // console.log(newRow);
            squares[i].innerHTML = newRow[0];
            squares[i+1].innerHTML = newRow[1];
            squares[i+2].innerHTML = newRow[2];
            squares[i+3].innerHTML = newRow[3]; 
        }
      }
    }

      // swipe down
      function moveDown() {
        for (let i = 0; i < 4; i++) {
        let one = squares[i].innerHTML;
        let two = squares[i+width].innerHTML;
        let three = squares[i+(width*2)].innerHTML;
        let four = squares[i+(width*3)].innerHTML;
        let column = [parseInt(one), parseInt(two), parseInt(three), parseInt(four)];
        let filteredColumn = column.filter(num => num);
        let missing = 4 - filteredColumn.length;
        let zeros = Array(missing).fill('');
        // console.log(zeros.length)
        let newColumn = zeros.concat(filteredColumn);
        squares[i].innerHTML = newColumn[0];
        squares[i+width].innerHTML = newColumn[1];
        squares[i+width*2].innerHTML = newColumn[2];
        squares[i+width*3].innerHTML = newColumn[3];
      }
    }

      // swipe UP
      function moveUp() {
        for (let i = 0; i < 4; i++) {
        let one = squares[i].innerHTML;
        let two = squares[i+width].innerHTML;
        let three = squares[i+(width*2)].innerHTML;
        let four = squares[i+(width*3)].innerHTML;
        let column = [parseInt(one), parseInt(two), parseInt(three), parseInt(four)];
        let filteredColumn = column.filter(num => num);
        let missing = 4 - filteredColumn.length;
        let zeros = Array(missing).fill('');
        let newColumn = filteredColumn.concat(zeros);
        squares[i].innerHTML = newColumn[0];
        squares[i+width].innerHTML = newColumn[1];
        squares[i+width*2].innerHTML = newColumn[2];
        squares[i+width*3].innerHTML = newColumn[3];
      } 
    }

      // combine Row
     function combineRow() {
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

      // combine Column
      function combineColumn() {
        for (let i = 0; i < 12; i++) {
        let combineTotal = parseInt(squares[i].innerHTML) + parseInt(squares[i+width].innerHTML);
        if (squares[i].innerHTML === squares[i+width].innerHTML) {
           squares[i].innerHTML = combineTotal;
           squares[i+width].innerHTML = 0;
           const value = !combineTotal ? 0 : combineTotal;
           score += value;
           scoreDisplay.innerHTML = score;  
        }
      }
      checkWin();
    }

     //keycodes
    function control(e) {
      if (e.keyCode === 39) {
        arrowRight();
      } else if (e.keyCode === 37) {
        arrowLeft();
      } else if (e.keyCode === 40) {
        keyDown();
      } else if (e.keyCode === 38) {
        keyUp();
      }
    }    

    document.addEventListener('keyup', control)

    function arrowRight() {
      moveRight();
      combineRow();
      moveRight();
      generate();
    };

    function arrowLeft() {
      moveLeft();
      combineRow();
      moveLeft();
      generate();
    };

    function keyDown() {
      moveDown();
      combineColumn();
      moveDown();
      generate();
    }

    function keyUp() {
      moveUp();
      combineColumn();
      moveUp();
      generate();
    }

  // check win
  function checkWin() {
    for (let i=0; i < squares.length; i++) {
      if (squares[i].innerHTML === '8') {
          resultDisplay.innerHTML = 'You win';
      } if (bestValue < squares.length) {
        bestDisplay.innerHTML = score > parseInt(bestValue) ? score : bestValue;
        localStorage.setItem('bestValue', bestDisplay.innerHTML);
      } if (localStorage.getItem('bestValue', bestDisplay.innerHTML) < score)  {
        bestDisplay.innerHTML = score > parseInt(bestValue) ? score : bestValue;
        localStorage.setItem('bestValue', bestDisplay.innerHTML);
      }
    }
  }
    // check loose
    function checkLoose() {
      let result = [];
      for (let i =0; i < squares.length; i++) {
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
              if (squares[i].innerHTML === squares[i+width].innerHTML) {
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
       
    // new game
    function clickButton() {    
      clearBord();
      generate();
      generate();
      clearGame();
    }

    restart.onclick = clickButton;

    // clear score,scoredisplay,resultdisplay
    function clearGame() {
      scoreDisplay.innerHTML = 0;
      score = 0;
      resultDisplay.innerHTML = '';
    }
  
    // Clear gameboard
    function clearBord() {
      for (let i = 0; i < squares.length; i++) {
        squares[i].innerHTML = '';
      }
    }
    
    // ColorChange
    function colorSwitch() {
      for (let i = 0; i < squares.length; i++) {
        // console.log(squares[i]); 
        if (squares[i].innerHTML == 0) {
          squares[i].style.backgroundColor = "#bababaeb";
        }
        squares[i].style.backgroundColor = colors[squares[i].innerHTML];
      }
    } 
})





  
 