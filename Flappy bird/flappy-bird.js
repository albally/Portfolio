const game = {
  width: 600,
  height: 700,
  backgroundColor: "#BFFBFF",
};

let score = 0;
let emoji = "🐤";

const bird = {
  x: game.width*(4/10),
  y: game.height*(1/3),
  radius: 12,
  color: "#ED1648",
  maxFallingSpeed: 3,
  moveVector: 3,
  strength: 10,
  draw: function () {
    fill(this.color);
    textSize(this.radius * 2);
    scale(-1, 1);
    textAlign(CENTER, CENTER);
    text(emoji, -this.x, this.y);
    textAlign(LEFT, BOTTOM);
    scale(-1, 1);
    noStroke();
  },
  //draw function avec une balle
  /*
  draw: function () {
    fill(this.color);
    circle(this.x, this.y, this.radius*2);
    noStroke();
  },*/
  update: function () {
    this.y += this.moveVector; //gravité

    if (this.moveVector < this.maxFallingSpeed) {
      this.moveVector++;
    }

    if (this.y < 0) {
      this.y = 0; //collision avec le haut
    }
  },
  flap: function () {
    this.moveVector = -this.strength;
  },
  collision: function (gap) {
    // Oiseau est à la même position que l'obstacle à l'horizontal
    const isSameX = this.x + this.radius > gap.x && this.x - this.radius < gap.x + gap.width;

    // Oiseau est à la même position à l'horizontal, donc je vérifie la position verticale
    if (isSameX) {
        const isInGap = this.y - this.radius > gap.y && this.y + this.radius < gap.y + gap.height;

      if (!isInGap) {
        return true;
      }
    }
    return false;
  },
};

const gaps = {
  color: "#54B9CB",
  spaceColor: game.backgroundColor,
  speed: 2,
  width: 50,
  minGap: bird.radius * 8,
  maxGap: Math.floor(game.width / 10) * 6,
  list: [],
  draw: function () {
    for (let i = 0; i < this.list.length; i++) {
      const obstacle = this.list[i];

      //1
      fill(this.color);
      //2
      rect(obstacle.x, 0, obstacle.width, game.height);
      //3
      fill(this.spaceColor);
      //4
      rect(obstacle.x, obstacle.y, obstacle.width, obstacle.height);
    }
  },
  update: function () {
    for (let i = 0; i < this.list.length; i++) {
      const obstacle = this.list[i];
      obstacle.x -= this.speed;
    }
    this.add();

    //Suppression du dernier obstacle de la liste quand il est hors de l'écran
    if (this.list.length > 0 && this.list[0].x + this.list[0].width < 0) {
      this.list.shift();
    }
  },
  add: function () {
    let addGap = this.newGap();
  
    if (this.list.length == 0) {
      this.list.push(addGap);
    } else {
      const lastGap = this.list[this.list.length - 1];
      let centerLastGap = lastGap.y + lastGap.height/2;
      let centerAddGap = addGap.y + addGap.height/2;
  
      while (centerAddGap - centerLastGap > game.height/3) {
        addGap = this.newGap();
        centerAddGap = addGap.y + addGap.height/2;
      }
      this.list.push(addGap);
    }
  },
  newGap: function () {
    let newX = 0;

    if (this.list.length > 0) {
    newX = this.list[this.list.length -1].x + this.width * 6;
    } else {
    newX = Math.floor(game.width/10) * 12;
    }

    const newHeight = constrain(
    Math.random() * this.maxGap,
    this.minGap,
    this.maxGap
    );

    const tenThHeight = Math.floor(game.height/10);

    const newY = constrain(
    Math.floor(Math.random() * game.height),
    tenThHeight,
    game.height - tenThHeight * 2 - newHeight
    );

    const newGap = {
    x: newX,
    y: newY,
    height: newHeight,
    width: this.width,
    };

    return newGap;
  },
  collision: function () {
    for (let i = 0; i < this.list.length; i++) {
      const gap = this.list[i];

      if (bird.collision(gap)) {
        return true;
      }

      if (gap.x + gap.width < bird.x - bird.radius && !gap.score) {
        score++;
        gap.score = true;
      }
    }
    return false;
  },
};

const leaderboard = JSON.parse(localStorage.getItem('leaderboard')) || [];

function updateLeaderboard() {
  leaderboard.push(score);
  leaderboard.sort((a, b) => b - a); //triage de score décroissant
  leaderboard.splice(5);
  localStorage.setItem('leaderboard', JSON.stringify(leaderboard));
};