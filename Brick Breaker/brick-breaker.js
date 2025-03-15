let canva = {
  width: 500,
  height: 500,
  color: [0, 0, 0],
};

let ball = {
  x: canva.width / 2,
  y: canva.height - 200,
  xspeed: -6,
  yspeed: 3,
  color: [255, 255, 255],
  r: 12,
};

let paddle = {
  x: 0,
  y: 0,
  width: 50,
  height: 10,
  color: [180, 125, 70],
};

let ballColorPicker;
let paddleColorPicker;
let canvaColorPicker;
let brickColorPicker;
let level = 1;

let buttons = [
  { text: "Level 1", x: canva.width + 10, y: 80, level: 1 },
  { text: "Level 2", x: canva.width + 10, y: 110, level: 2 },
  { text: "Level 3", x: canva.width + 10, y: 140, level: 3 },
  { text: "Reset", x: canva.width + 10, y: 170, level: 0 },
];

let score = 0;
let scoreHist = [];
let trail = [];
let bricks = [];

let brickSchema = {
  color: [
      [255, 102, 102],
      [255, 178, 102],
      [255, 255, 102],
      [178, 255, 102],
      [178, 102, 255],
      [178, 102, 255],
      [102, 255, 255],
      [102, 0, 204],
      [102, 0, 204],
  ],
  layout: {
      height: Math.floor(canva.height / 2) - 30,
      width: canva.width,
  },
  sizeinc: [1, 1, 1, 1, 1, 0.7, 0.7, 1, 0.7],
};
let bricksLayout = [
  [
      [1, 1, 1, 1, 1],
      [2, 2, 5, 2, 2],
      [5, 3, 5, 3, 5],
      [4, 8, 4, 8, 4],
      [7, 6, 6, 6, 7],
  ], [
      [1, 1, 1, 1, 1],
      [2, 8, 2, 8, 2],
      [5, 3, 5, 3, 5],
      [4, 4, 4, 4, 4],
      [7, 9, 7, 9, 7],
  ], [
      [8, 1, 1, 1, 8],
      [2, 8, 2, 8, 2],
      [3, 3, 5, 3, 3],
      [4, 8, 4, 8, 4],
      [9, 7, 7, 7, 9],
  ]];

function createBricks() {
  var calculatedBrick = {
      height: Math.floor(brickSchema.layout.height / bricksLayout[level - 1].length),
      width: Math.floor(brickSchema.layout.width / bricksLayout[level - 1][0].length),
  };
  for (let i = 0; i < bricksLayout[level - 1].length; i++) {
      calculatedBrick.width = Math.floor(brickSchema.layout.width / bricksLayout[0].length);
      for (let j = 0; j < bricksLayout[level - 1][i].length; j++) {
          if (bricksLayout[level - 1][i][j] != 0) {
              bricks.push({
                  x: j * calculatedBrick.width,
                  y: i * calculatedBrick.height,
                  width: calculatedBrick.width,
                  height: calculatedBrick.height * brickSchema.sizeinc[bricksLayout[level - 1][i][j] - 1],
                  color: brickSchema.color[bricksLayout[level - 1][i][j] - 1],
                  bigpad: bricksLayout[level - 1][i][j] == 5 || bricksLayout[level - 1][i][j] == 6 ? true : false,
                  hits: bricksLayout[level - 1][i][j] == 8 || bricksLayout[level - 1][i][j] == 9 ? 3 : 1,
                  brickType: bricksLayout[level - 1][i][j],
              });
          }
      }
  }
}
createBricks();

function setup() {
  createCanvas(canva.width, canva.height);
  background(canva.color);
  createButtons();
  showHist();

  ballcolorDiv = createDiv();
  ballcolorDiv.style('font-size', '14px');
  ballcolorDiv.style('font-family', 'arial');
  ballcolorDiv.position(10, canva.height + 115);
  ballcolorDiv.html(`Ball color:`);
  ballColorPicker = createColorPicker(color(ball.color));
  ballColorPicker.position(125, canva.height + 110);

  paddlecolorDiv = createDiv();
  paddlecolorDiv.style('font-size', '14px');
  paddlecolorDiv.style('font-family', 'arial');
  paddlecolorDiv.position(10, canva.height + 145);
  paddlecolorDiv.html(`Paddle color:`);
  paddleColorPicker = createColorPicker(color(paddle.color));
  paddleColorPicker.position(125, canva.height + 140);

  canvacolorDiv = createDiv();
  canvacolorDiv.style('font-size', '14px');
  canvacolorDiv.style('font-family', 'arial');
  canvacolorDiv.position(10, canva.height + 175);
  canvacolorDiv.html(`Canvas color:`);
  canvaColorPicker = createColorPicker(color(canva.color));
  canvaColorPicker.position(125, canva.height + 170);

  brickcolorDiv = createDiv();
  brickcolorDiv.style('font-size', '14px');
  brickcolorDiv.style('font-family', 'arial');
  brickcolorDiv.position(10, canva.height + 205);
  brickcolorDiv.html(`Brick color:`);
  brickColorPicker = createColorPicker(color(brickSchema.color[0]));
  brickColorPicker.position(125, canva.height + 200);
  brickColorPicker.input(upBrickColor);

  function upBrickColor() {
    for (let i = 0; i < bricks.length; i++) {
        let brick = bricks[i].brickType;
        if (brick == 5 || brick == 6 || brick == 8 || brick == 9) {
            continue;
        } else {
            bricks[i].color = brickColorPicker.color();
        }
    }
  }

  let ballSizeButton = document.createElement("button");
  ballSizeButton.innerHTML = "Change Ball Size";
  ballSizeButton.onclick = function () {
      let ballSize = ball.r;
      ballSize = int(prompt("Enter the new ball size in pixels:"));
      if (ballSize > 0) {
          ball.r = min(ballSize, ball.x, canva.width - ball.x);
      }
  };
  document.body.appendChild(ballSizeButton);


  let paddleSizeButton = document.createElement("button");
  paddleSizeButton.innerHTML = "Change Paddle Size";
  paddleSizeButton.onclick = function () {
      let paddleSize = paddle.width;
      paddleSize = int(prompt("Enter the new paddle size in pixels:"));
      if (paddleSize > 0) {
          paddle.x = canva.width / 2;
          paddle.width = min(paddleSize, canva.width - 1);
      }
  };
  document.body.appendChild(paddleSizeButton);

  let brickHeightButton = document.createElement("button");
  brickHeightButton.innerHTML = "Change Brick Height";
  brickHeightButton.onclick = function () {
      let brickHeight = bricks.height;
      brickHeight = int(prompt("Enter the new brick height in pixels:"));
      if (brickHeight > 0) {
          brickSchema.layout.height = min(brickHeight, canva.height);
          resetGame(level);
      }
  };
  document.body.appendChild(brickHeightButton);
  }

function draw() {
  ball.color = ballColorPicker.color();
  paddle.color = paddleColorPicker.color();
  canva.color = canvaColorPicker.color();
  background(canva.color);
  drawBall();
  drawPaddle();
  drawBricks();
  gameOver();
  win();
  noStroke();
  calcScore();
  drawTrail();
  stroke(255);
  strokeWeight(2);
  scoreDiv.html(`Previous scores: \n${scoreHist.join('\n')}`);
}

function drawTrail() {
  for (let i = 0; i < trail.length; i++) {
      let r = ball.r * (i / trail.length);
      let transp = map(r, 0, ball.r, 0, 100);
      fill(ballColorPicker.color().levels[0], ballColorPicker.color().levels[1], ballColorPicker.color().levels[2], transp);
      ellipse(trail[i].x, trail[i].y, r * 2);
  }
  trail.push({ x: ball.x, y: ball.y });
  if (trail.length > 10) {
      trail.splice(0, 1);
  }
}

function drawBall() {
  ball.y += ball.yspeed;
  ball.x += ball.xspeed;
  noStroke();
  fill(ball.color);
  ellipse(ball.x, ball.y, ball.r * 2);
  stroke(255);
  strokeWeight(2);

  // si la balle touche le bord droit
  if (ball.x + ball.r >= canva.width) {
      ball.x = canva.width - ball.r - 1;
      ball.xspeed *= -1;
  }
  // si la balle touche le bord gauche
  if (ball.x - ball.r <= 0) {
      ball.x = ball.r + 1;
      ball.xspeed *= -1;
  }
  // si la balle touche le bord haut
  if (ball.y - ball.r <= 0) {
      ball.y = ball.r + 1;
      ball.yspeed *= -1;
  }

  if ((ball.x > paddle.x && ball.x < paddle.x + paddle.width) && (ball.y + ball.r >= paddle.y && ball.y + ball.r < paddle.y + paddle.height)) {
      ball.yspeed *= -1;
      ball.y = paddle.y - ball.r - 1;
  }

  for (let i = 0; i < bricks.length; i++) {
      // si la balle touche une brique en haut
      if (
          ball.y + ball.r >= bricks[i].y &&
          ball.y + ball.r <= bricks[i].y + bricks[i].height &&
          ball.x > bricks[i].x &&
          ball.x < bricks[i].x + bricks[i].width
      ) {
          ball.y = bricks[i].y - ball.r - 1;
          ball.yspeed *= -1;
          if (bricks[i].bigpad == true) {
              paddle.width += 10;
              score += 30
              bricks.splice(i, 1);
          } else if (bricks[i].hits > 1) {
              bricks[i].hits--;
          } else if (bricks[i].hits == 1) {
              score += 10
              bricks.splice(i, 1);
          }
          continue;
      }

      // si la balle touche une brique en bas
      if (
          ball.y - ball.r <= bricks[i].y + bricks[i].height &&
          ball.y - ball.r >= bricks[i].y &&
          ball.x > bricks[i].x &&
          ball.x < bricks[i].x + bricks[i].width
      ) {
          ball.y = bricks[i].y + bricks[i].height + ball.r + 1;
          ball.yspeed *= -1;
          if (bricks[i].bigpad == true) {
              paddle.width += 10;
              score += 30
              bricks.splice(i, 1);
          } else if (bricks[i].hits > 1) {
              bricks[i].hits--;
          } else if (bricks[i].hits == 1) {
              score += 10
              bricks.splice(i, 1);
          }
          continue;
      }

      // si la balle touche une brique à gauche
      if (
          ball.x + ball.r >= bricks[i].x &&
          ball.x + ball.r <= bricks[i].x + bricks[i].width &&
          ball.y > bricks[i].y &&
          ball.y < bricks[i].y + bricks[i].height
      ) {
          ball.x = bricks[i].x - ball.r - 1;
          ball.xspeed *= -1;
          if (bricks[i].bigpad == true) {
              paddle.width += 10;
              score += 30
              bricks.splice(i, 1);
          } else if (bricks[i].hits > 1) {
              bricks[i].hits--;
          } else if (bricks[i].hits == 1) {
              score += 10
              bricks.splice(i, 1);
          }
          continue;
      }

      // si la balle touche une brique à droite
      if (
          ball.x - ball.r <= bricks[i].x + bricks[i].width &&
          ball.x - ball.r >= bricks[i].x &&
          ball.y > bricks[i].y &&
          ball.y < bricks[i].y + bricks[i].height
      ) {
          ball.x = bricks[i].x + bricks[i].width + ball.r + 1;
          ball.xspeed *= -1;
          if (bricks[i].bigpad == true) {
              paddle.width += 10;
              score += 30
              bricks.splice(i, 1);
          } else if (bricks[i].hits > 1) {
              bricks[i].hits--;
          } else if (bricks[i].hits == 1) {
              score += 10
              bricks.splice(i, 1);
          }
          continue;
      }
  }
}

function drawPaddle() {
  paddle.x = Math.max(Math.min(mouseX - paddle.width / 2, canva.width - paddle.width), 0);
  paddle.y = canva.width - 20;
  fill(paddle.color);
  rect(paddle.x, paddle.y, paddle.width, paddle.height);
}

function drawBricks() {
  for (let i = 0; i < bricks.length; i++) {
      fill(bricks[i].color);
      rect(bricks[i].x, bricks[i].y, bricks[i].width, bricks[i].height);
      if (bricks[i].hits == 3) {
          fill(255);
          textSize(16);
          textAlign(CENTER, CENTER);
          text("2", bricks[i].x + bricks[i].width / 2, bricks[i].y + bricks[i].height / 2);
      }
      if (bricks[i].hits == 2) {
          fill(255);
          textSize(16);
          textAlign(CENTER, CENTER);
          text("1", bricks[i].x + bricks[i].width / 2, bricks[i].y + bricks[i].height / 2);
      }
  }
}

function createButtons() {
  for (let i = 0; i < buttons.length; i++) {
      let button = buttons[i];
      let buttonElement = createButton(button.text);
      buttonElement.position(button.x, button.y);
      if (button.level == 0) {
          buttonElement.mousePressed(resetbutton);
      } else {
          buttonElement.mousePressed(levelbutton(button.level));
      }
  }
}

function levelbutton(newlevel) {
  return function () {
      scoreHist.unshift(score);
      resetGame(newlevel);
      level = newlevel;
  }
}

function resetbutton() {
  scoreHist.unshift(score);
  resetGame();
  level = 1;
}

function resetGame(newlevel) {
  ball.x = canva.width / 2;
  ball.y = canva.height - 200;
  ball.xspeed = -6;
  ball.yspeed = 3;
  ball.color = [255, 255, 255]
  paddle.width = 50;
  score = 0;
  bricks = [];
  level = newlevel == undefined ? 1 : newlevel;
  createBricks();
  redraw();
  loop();
}

function gameOver() {
  if (ball.y + ball.r >= canva.height) {
      noLoop();
      fill('red');
      textSize(32);
      text('Game over', 250, 250);
  }
}

function win() {
  if (!bricks.length) {
      noLoop();
      fill('green');
      textSize(32);
      text('You win', 250, 250);
  }
}

function calcScore() {
  if (scoreHist.length >= 18) {
      scoreHist.pop();
  }
  fill(255, 255, 255);
  textSize(12);
  text("Score: " + score, canva.width - 40, 10);
}

function showHist() {
  scoreDiv = createDiv();
  scoreDiv.style('color', 'purple');
  scoreDiv.style('font-size', '24px');
  scoreDiv.style('white-space', 'pre-wrap');
  scoreDiv.position(canva.width + 100, 80);
}