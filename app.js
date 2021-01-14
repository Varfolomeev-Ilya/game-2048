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
      generate()

    }
     createBoard()



    //random numbers

     function generate() {
       let randomNumbers = Math.floor(Math.random() * squares.length)
       if (squares[randomNumbers].innerHTML == 0) {
          squares[randomNumbers].innerHTML = 2
       } else generate()
     } 
     

    //swipe left

     function moweLeft() {
       for(let i=0; i < width*width ; i++) {
         if (i % 4 === 0) {
          let one = square.innerHTML[i];
          let two = square.innerHTML[i+1];
          let three = square.innerHTML[i+2];
          let four = square.innerHTML[i+3];
          let row = [parseInt(one), parseInt(two), parseInt(three), parseInt(four)];
        
          console.log(row);

          let filteredRow = row.filter(num => num) 
          console.log(filteredRow);

          




        }
       } 
      }   
      moweLeft()








})
