const ROWS = 10;

function rightTriangle() {
  let currentRow = 1;

  while (currentRow <= ROWS) {
    let line = "";
    let spaceCount = ROWS - currentRow; // 앞에 들어갈 공백 개수
    let starCount = currentRow;         // 줄에 들어갈 별 개수

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
    currentRow++;
  }
}


function rightInvertedTriangle() {
  let currentRow = ROWS;

  while (currentRow >= 1) {
    let line = "";
    let spaceCount = ROWS - currentRow;
    let starCount = currentRow;

    // 공백 추가 (왼쪽에 붙이기)
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

console.log(rightTriangle())
console.log(rightInvertedTriangle())
