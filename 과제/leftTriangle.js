const ROWS = 10;
function leftTriangle() {
    let currentRow = 1;
    while (currentRow <= ROWS) {
        let stars = "";
        let starCount = 1;
        while (starCount <= currentRow) {
            stars += "*";
            starCount++;
        }
        console.log(stars);
        currentRow++

    }
}


function leftInvertedTriangle() {
    let currentRow = ROWS;  
    while (currentRow >= 1) {
      let stars = "";
      let starCount = 1;
      while (starCount <= currentRow) {
        stars += "*";
        starCount++;
      }
      console.log(stars);
      currentRow--;
    }
  }
  

console.log(leftTriangle());
console.log(leftInvertedTriangle());