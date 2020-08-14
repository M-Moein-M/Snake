function gameInit() {

    let currentDirection = 'R';
    let allSnakePartsDirection;
    let moveInterval;

    let gameFrameDiv = document.getElementById('game-frame');
    let maxXValue;
    let maxYValue;
    let gridSize;

    let snakeCoordinates;

    function Coordinates(x, y) {
        this.x = x;
        this.y = y;
    }

    function initiateSnake() { // we start the snake by length of 3 in this function
        // and we set x, y of each body part so that we can position each part in 'createSnake' function
        let initialSnakeBodyParts = 4;

        let snakeHeadX = Math.floor(maxXValue / 2);
        let snakeHeadY = Math.floor(maxYValue / 2);

        for (let i = 0; i < initialSnakeBodyParts; i++) {
            snakeCoordinates[i] = new Coordinates(snakeHeadX - i, snakeHeadY);
        }
    }

    function removeSnake() {
        while (gameFrameDiv.childElementCount)
            gameFrameDiv.removeChild(gameFrameDiv.children[0]);
    }

    function createSnake() {
        removeSnake(); // we remove the snake from the page and create it again;
        for (let i = 0; i < snakeCoordinates.length; i++) {
            let snakeBodyPart = document.createElement('img');
            snakeBodyPart.setAttribute('src', 'assets/snake-img.png');
            snakeBodyPart.classList.add('snake-body-part');
            snakeBodyPart.style.width = snakeBodyPart.style.height = gridSize.toString() + 'px';
            snakeBodyPart.style.left = (gridSize * snakeCoordinates[i].x).toString() + 'px';
            snakeBodyPart.style.top = (gridSize * snakeCoordinates[i].y).toString() + 'px';
            snakeBodyPart.id = i.toString();
            gameFrameDiv.appendChild(snakeBodyPart);
        }
    }

    function gameStart() {

        let gameFrameWidth = gameFrameDiv.offsetWidth;
        let gameFrameHeight = gameFrameDiv.offsetHeight;

        // we use a sort of grid system for the game frame
        gridSize = 20;
        maxXValue = Math.floor(gameFrameWidth / gridSize); // we consider every 10 pixel as 1 unit on the x axis, so 600px width will be 60 units
        maxYValue = Math.floor(gameFrameHeight / gridSize);

        snakeCoordinates = []; // we store coordinates of every parts of snake body in this array. the head will be the index 0
        initiateSnake();
        createSnake();  // creates snake according to 'snakeCoordinates'
        initAllDirections();
        moveInterval = setInterval(move, 50);

        generateFruit();

    }

    function initAllDirections() {
        allSnakePartsDirection = [];
        for (let i = 0; i < snakeCoordinates.length; i++) {  // for each element we set initial value of 'R' since all the parts are moving to right at the beginning
            allSnakePartsDirection.splice(i, 0, 'R');
        }
    }

    function shiftDirections2Right() {  // shifting to right will change directions so that every body part direction will be the direction of previous part in next time step
        for (let i = allSnakePartsDirection.length - 1; i > 0; i--)
            allSnakePartsDirection[i] = allSnakePartsDirection[i - 1];
        allSnakePartsDirection[0] = currentDirection; // head's direction will be changed by keyboard controls input
    }

    function moveElement(index, direction) { // changes the x or y of body part at input index according to direction
        let leftChanges = 0;
        let topChanges = 0;

        switch (direction) {
            case 'R':
                leftChanges = 1;
                break;
            case 'L':
                leftChanges = -1;
                break;
            case 'U':
                topChanges = -1;
                break;
            case 'D':
                topChanges = 1;
                break;
        }

        snakeCoordinates[index].x += leftChanges;
        snakeCoordinates[index].y += topChanges;

        if (snakeCoordinates[index].x === maxXValue) {
            snakeCoordinates[index].x = 0;
        }
        if (snakeCoordinates[index].x === -1) {
            snakeCoordinates[index].x = maxXValue - 1;

        }
        if (snakeCoordinates[index].y === maxYValue) {
            snakeCoordinates[index].y = 0;
        }
        if (snakeCoordinates[index].y === -1) {
            snakeCoordinates[index].y = maxYValue-1;
        }

    }

    function move() {
        shiftDirections2Right();
        for (let i = 0; i < allSnakePartsDirection.length; i++) {
            moveElement(i, allSnakePartsDirection[i]);
        }
        createSnake();

    }

    function changeDirection(event) {
        switch (event.code) {
            case 'ArrowUp':
                if (currentDirection !== 'D') {  // if current direction is down, we can't go up
                    currentDirection = 'U';
                }
                break;
            case 'ArrowDown':
                if (currentDirection !== 'U') {  // if current direction is down, we can't go up
                    currentDirection = 'D';
                }
                break;
            case 'ArrowLeft':
                if (currentDirection !== 'R') {  // if current direction is down, we can't go up
                    currentDirection = 'L';
                }
                break;
            case 'ArrowRight':
                if (currentDirection !== 'L') {  // if current direction is down, we can't go up
                    currentDirection = 'R';
                }
                break;
        }
    }

    function generateFruit(){
        let fruit = document.getElementById('fruit');
        let fruitX = Math.floor(Math.random()*maxXValue);
        let fruitY = Math.floor(Math.random()*maxYValue);
        fruit.style.left = (gridSize*fruitX).toString()+'px';
        fruit.style.top = (gridSize*fruitY).toString()+'px';
        fruit.style.width = gridSize.toString()+'px';
        fruit.style.height = gridSize.toString()+'px';
    }

    window.addEventListener('keydown', changeDirection);

    gameStart();
}

window.addEventListener('load', gameInit);