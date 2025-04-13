const ROWS = 10;
function leftTriangle() {
    let currentRow = 1;
    while (currentRow <= ROWS) {
        let stars = "";
        let starCount = 1;
        while (starCount <= currentRow) {
            start += "*";
            starCount++;
        }
        console.log(stars);
        currentRow++

    }
}

leftTriangle();