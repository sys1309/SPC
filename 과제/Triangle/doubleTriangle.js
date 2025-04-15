const ROWS = 10;

function doubleTriangle() {
  let currentRow = 1;

  while (currentRow <= ROWS) {
    let line = "";
    let spaceCount = ROWS - currentRow;
    let starCount = 2 * currentRow - 1;

    // 공백 추가
    while (spaceCount > 0) {
      line += " ";
      spaceCount--;
    }

    // 별 추가
    while (starCount > 0) {
      line += "*";
      starCount--;
    }

    console.log(line);
    currentRow++;
  }
}


function doubleInvertedTriangle() {
  let currentRow = ROWS;

  while (currentRow >= 1) {
    let line = "";
    let spaceCount = ROWS - currentRow;
    let starCount = 2 * currentRow - 1;

    // 공백 먼저 추가
    while (spaceCount > 0) {
      line += " ";
      spaceCount--;
    }

    // 별 추가
    while (starCount > 0) {
      line += "*";
      starCount--;
    }

    console.log(line);
    currentRow--;
  }
}


console.log(doubleTriangle())
console.log(doubleInvertedTriangle())
