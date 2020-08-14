function gameInit() {

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
    }

    gameStart();
}

window.addEventListener('load', gameInit);