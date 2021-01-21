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

    //playing board
    function createBoard() {
      for (let i=0 ; i < width*width; i++) {
        square = document.createElement('div');
        square.innerHTML = " ";
        gridDisplay.appendChild(square);
        squares.push(square);
        
      } 
      generate()
      generate()
      
      
    }
     createBoard()
 
    //random numbers
     function generate() {
       let randomNumbers = Math.floor(Math.random() * squares.length)
       if (squares[randomNumbers].innerHTML == 0) {
          squares[randomNumbers].innerHTML = 2;
          // checkLoose();
       }else generate();  
          colorSwitch();          
           
     } 

     function moveRight() {
       for(let i=0; i < width*width ; i++) {
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
            let zeros = Array(missing).fill("");
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
      for(let i=0; i < width*width ; i++) {
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
            let zeros = Array(missing).fill(" ");
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
        let zeros = Array(missing).fill(" ");
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
        let zeros = Array(missing).fill(" ");
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
      checkWin()
    }
     //keycodes
    function control(e) {
      if(e.keyCode === 39) {
        arrowRight()
      } else if (e.keyCode === 37) {
        arrowLeft() 
      } else if(e.keyCode === 40) {
        keyDown()
      } else if(e.keyCode === 38) {
        keyUp()
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
    for(let i=0; i < squares.length; i++) {
      if(squares[i].innerHTML === '2048') {
          resultDisplay.innerHTML = 'You win';
          document.removeEventListener('keyup', control);
      } if(bestValue < squares.length){
        bestDisplay.innerHTML = score > parseInt(bestValue) ? score : bestValue;
        localStorage.setItem('bestValue', bestDisplay.innerHTML);
      } if(localStorage.getItem('bestValue', bestDisplay.innerHTML) < score) {
        bestDisplay.innerHTML = score > parseInt(bestValue) ? score : bestValue;
        localStorage.setItem('bestValue', bestDisplay.innerHTML);
      }
    }
  }
  
    // check loose
    // function checkLoose() {
    //   let zeros = 0;
    //       for (let i = 0; i < squares.length; i++) {
    //       if (squares[i].innerHTML == 0) {
    //       zeros++;
    //     }
    //     if (zeros === " ") {
    //      document.removeEventListener('keyup', control);
    //      document.removeEventListener('keyup', control);
    //      resultDisplay.innerHTML = 'Game over';
    //     }
      
    //   }
    // }
    
   
    
    // new game
    function clickButton() {    
      clearBord();
      generate();
      generate();
      clearScore();
    }

    restart.onclick = clickButton;

    function clearScore() {
      scoreDisplay.innerHTML = 0;

    }
  
    // Restart game
    function clearBord() {
      for(let i = 0; i < squares.length; i++) {
        squares[i].innerHTML = " ";
      }
    }
    
    // ColorChange
    function colorSwitch() {
      for( let i = 0; i < squares.length; i++) {
        // console.log(squares[i]); 
        if (squares[i].innerHTML == 0) {
          squares[i].style.backgroundColor = "#bababaeb";
        }if(squares[i].innerHTML == 2) {
            squares[i].style.backgroundColor = "#f7ababeb";
        // console.log(squares[i].innerHTML);  
        }if(squares[i].innerHTML == 4) {
          squares[i].style.backgroundColor = "#f7abf0eb";
        }if(squares[i].innerHTML == 8) {
          squares[i].style.backgroundColor = "#d1abf7eb";
        }if(squares[i].innerHTML == 16) {
          squares[i].style.backgroundColor = "#abb2f7eb";
        }if(squares[i].innerHTML == 32) {
          squares[i].style.backgroundColor = "#9abe9f7eb";
        }if(squares[i].innerHTML == 64) {
          squares[i].style.backgroundColor = "#abf7e0eb";
        }if(squares[i].innerHTML == 128) {
          squares[i].style.backgroundColor = "#abf7bbeb";
        }if(squares[i].innerHTML == 256) {
          squares[i].style.backgroundColor = "#bff7abeb";
        }if(squares[i].innerHTML == 512) {
          squares[i].style.backgroundColor = "#daf7abeb";
        }if(squares[i].innerHTML == 1024) {
          squares[i].style.backgroundColor = "#7f1f7abeb";
        }if(squares[i].innerHTML == 2048) {
          squares[i].style.backgroundColor = "#fa6e32eb";
        }
      }
    }

})





  
 