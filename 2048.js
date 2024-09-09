document.addEventListener("DOMContentLoaded" ,function(){
    var board;
    var score = 0;
    var rows = 4;
    var columns = 4;
    setgame();
    function setgame(){
        board = [
            [0, 0, 0, 0],
            [0, 0, 0, 0],
            [0, 0, 0, 0],
            [0, 0, 0, 0]
        ]
    for(let r=0;r<rows;r++){
            for(let c=0;c<columns;c++){
                const tile = document.createElement("div");
                tile.id = r.toString( )+ "-" + c.toString();
                let num = board[r][c];
                updateTile(tile,num);
                document.getElementById("board").append(tile);
            }
        }
    }
    settwo();
    settwo();
function hasEmptyTile(){
    for (let r =0; r < rows; r++){
        for (let c=0 ; c < columns; c++){
            if(board[r][c] == 0){
                return true;
            }
        }
    }
    return false;
}       
function settwo(){
if(!hasEmptyTile()){
    return;
}
let found = false;
while (!found){
    ///tandom r ,c ;
    let r = Math.floor(Math.random() * rows);
    let c = Math.floor(Math.random() * columns);
    if (board[r][c] == 0){
        board[r][c] = 2;
        let tile = document.getElementById(r.toString() + "-" + c.toString());
        tile.innerText = "2";
        tile.classList.add("x2");
        found = true;
    }
}
}
    function updateTile(tile, num) {
        tile.innerHTML = " ";
        tile.className = "";
        tile.classList.add("tile");
        if (num > 0) {
            tile.innerText = num;
            if (num <= 4096) {
                tile.classList.add("x" + num.toString());
            } else {
                tile.classList.add("x8192");
            }
        }
}
  document.addEventListener("keyup" ,(event) =>{
    if(event.code === "ArrowLeft"){
            slideLeft();
            settwo();
    }
    else if(event.code === "ArrowRight"){
        slideRight();
        settwo();
    }
    else if(event.code === "ArrowUp"){
        slideUp();
        settwo();
    }
    else if(event.code === "ArrowDown"){
        slideDown();
        settwo();
    }
    document.querySelector(".score").innerText = score;
})  
 function filterzero(row){
   return row.filter(num => num != 0); ///create a new array without zeros
              }
  function slide(row){
    /////[0 , 2 , 2 , 2]
    row = filterzero(row)////get rid of elements  => [2,2,2]
    //slide
    for(let i=0;i<row.length-1;i++){
        //check every 2
        if(row[i] == row[i+1]){
         row[i] *= 2;
         row[i+1] = 0;
         score += row[i];
        }
    }
    row = filterzero(row);
    ////add zeros 
    while (row.length < columns){
        row.push(0);
    }
    return row;
  }
  function slideLeft(){
    for(let r = 0; r < rows; r++){
          let row = board[r];
          row = slide(row);
          board[r] = row;

          for (let c=0; c< columns ; c++){
            let tile = document.getElementById(r.toString() + "-" + c.toString());
            let num = board[r][c];
            updateTile(tile, num)
          }
    }
 }
  function slideRight(){
    for(let r = 0; r < rows; r++){
          let row = board[r];
          row.reverse();
          row = slide(row);
          row.reverse();
          board[r] = row;

          for (let c=0; c< columns ; c++){
            let tile = document.getElementById(r.toString() + "-" + c.toString());
            let num = board[r][c];
            updateTile(tile, num)
          }
    }
}
function slideUp() {
for (let c = 0; c < columns; c++) {
    // Extract the column into a row array
let column = [board[0][c], board[1][c], board[2][c], board[3][c]];
    // Slide and merge the extracted row
 column = slide(column);
    // Place the updated row back into the respective column
 for (let r = 0; r < rows; r++) {
board[r][c] = column[r];
let tile = document.getElementById(`${r}-${c}`);
 updateTile(tile, board[r][c]);
        }
    }
}
function slideDown() {
    for (let c = 0; c < columns; c++) {
        let column = [board[0][c], board[1][c], board[2][c], board[3][c]];
        column.reverse();
        column = slide(column);
        column.reverse();

        for (let r = 0; r < rows; r++) {
            board[r][c] = column[r];
            let tile = document.getElementById(`${r}-${c}`);
            updateTile(tile, board[r][c]);
        }
    }
}
} 
);
