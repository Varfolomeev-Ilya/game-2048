document.addEventListener('DOMContentLoaded', () => {
  const gridDisplay = document.querySelector('.grid');
  const scoreDisplay = document.getElementById('.score');
  const resultDisplay = document.getElementById('.result');
  const width = 4;
  let squares = [];


    //playing board

    function createBoard() {
      for (let i=0 ; i < width*width; i++) {
        square = document.createElement('div');
        square.innerHTML = 0;
        gridDisplay.appendChild(square);
        squares.push(square);
      }
      generate()
      
      
      
      
      

    }
     createBoard()

    //random numbers

     function generate() {
       let randomNumbers = Math.floor(Math.random() * squares.length)
       if (squares[randomNumbers].innerHTML === '0') {
          squares[randomNumbers].innerHTML = 2 
       } else generate()
              
        
     } 

    //  function generateFour() {
    //   let randomNumbers = Math.floor(Math.random() * squares.length)
    //   if (squares[randomNumbers].innerHTML === '0') {
    //      squares[randomNumbers].innerHTML = 4
         
         
    //   } else generateFour()
    // } 
     
    //swipe right

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
            let zeros = Array(missing).fill(0);
            // console.log(zeros); 
            let newRow = zeros.concat(filteredRow);
            // console.log(newRow);
           

            squares[i].innerHTML = newRow[0];
            squares[i+1].innerHTML = newRow[1];
            squares[i+2].innerHTML = newRow[2];
            squares[i+3].innerHTML = newRow[3];

        }
       } 
      }   
      
     //swipe left

     function moveLeft() {
      for(let i=0; i < width*width ; i++) {
        if (i % 4 === 0) {
            let one = squares[i].innerHTML;
            let two = squares[i+2].innerHTML;
            let three = squares[i+2].innerHTML;
            let four = squares[i+3].innerHTML;
            let row = [parseInt(one), parseInt(two), parseInt(three), parseInt(four)];
          
            // console.log(row);

            let filteredRow = row.filter(num => num) 
            // console.log(filteredRow);
            let missing = 4 - filteredRow.length;
            let zeros = Array(missing).fill(0);
            // console.log(zeros); 
            let newRow = filteredRow.concat(zeros);
            // console.log(newRow);
          
          
            squares[i].innerHTML = newRow[0];
            squares[i+1].innerHTML = newRow[1];
            squares[i+2].innerHTML = newRow[2];
            squares[i+3].innerHTML = newRow[3];
          
            
       }
      } 
     }   
    

     function combineRow() {
       for (let i = 3; i >= 1; i++) {
          let combineTotal = parseInt(squares[i].innerHTML) + parseInt(squares[i+1].innerHTML);
          if (squares[i].innerHTML === squares[i+1].innerHTML) {
              squares[i].innerHTML = combineTotal;
              squares[i+1].innerHTML = 0;
           break;
          }
       }
       
     }

     //keycodes
    function control(e) {
      if(e.keyCode === 39) {
        arrowRight()
      } else if (e.keyCode === 37) {
        arrowLeft() 
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


})
