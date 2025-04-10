
const GAME_SPEED = 200;
const blockSize = 20; //블록 크기

let snake = {x: 0, y: 0} // 뱀의 시작 위치 
let food = {x: 100, y : 100}

//DOM과 각종 필요한 여러 컴포넌트 로딩이 끝난 이후 이거 실행해라. 
window.onload = initialize;

function initialize(){
    canvas = document.getElementById('snakeCanvas');
    context = canvas.getContext('2d');

    //이벤트 리스너 추가 
    SetupEventListener();

    //게임 시작 투표 호출 
    setInterval(gameLoop, GAME_SPEED);
}

//여기는 키보드 인터럽트(이벤트)핸들러
function SetupEventListener() {
    //document.addEventListener('keydown' .... );
}
function gameLoop() {
    //뱀 이동
    moveSnake();

    //화면 랜더링
    draw();
}


function moveSnake() {
    snake.x += blockSize;
    //화면을 벗어나지 않게.. 오른쪽 끝 -> 왼쪽 끝에서 나오기 (vice verse)

}

//화면에 뱀을 그린다
function draw() {
    context.cleaerRect(0,0, canvas.width, canvas.height);

    context.fillStyle = 'blue';
    context.fillRect(0, 0, blockSize, blockSize);

    if (snake.x === food.x && snake.y === food.y) {
        food.x = Math.floor(Math.random * canvas.width / blockSize * blockSize)
    }

    context.fillStyle = 'red';
    //food.x = Math.floor(Math.random * canvas.width / blockSize * blockSize)
    context.fillRect(100, 100, blockSize, blockSize)
}

//숙제1 뱀게임 화살표 방향이동

//숙제2 화면을 벗어나지 않는 랜덤 위치에 빨간 사과(먹이)를 만든다

//숙제3 옵셔널
//이 사과를 먹는 걸 구현 ..
//힌트 : 사과와 나의 머리위치가 같으면, 다시 2번을 재실행(랜덤 위치에 먹이 배치)

//숙제4 
//3번에 대해서 사과르 먹은 이후 몸길이를 늘려서, 이 길이가 나를 따라오게 만든다.
//힌트: 나의 몸길이를 배열에 넣는다.


