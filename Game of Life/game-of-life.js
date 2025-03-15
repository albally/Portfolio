const grid = {
  cellSize: 0, // size of each cell in pixel, calculted in init
  height: 600, // size of the p5js canvas, can be changed
  width: 600, // size of the p5js canvas, can be changed
  columns: 30, // number of columns in the grid, can be changed
  rows: 30, // number of rows grid, can be changed
  color: {
    alive: 255,
    dead: 0,
    border: 100,
  },
  cells: [],
  newEmptyGrid: function (rows, columns) {
    const newGrid = [];
    for (let i = 0; i < rows; i++) {
      newGrid.push([]);
      for (let j = 0; j < columns; j++) {
        newGrid[i].push(false);
      }
    }
    return newGrid;
  },
  init: function () {
    this.cells = this.newEmptyGrid(this.rows, this.columns);
    this.cellSize = this.height / this.rows;
  },
  getCell: function (row, col) {
    return this.cells[row][col];
  },
  setCell: function (row, col, value) {
    this.cells[row][col] = value;
  },
  toggleCell: function (mouseX, mouseY) {
    if(mouseX <0 || mouseX >= this.width || mouseY <0 || mouseY >= this.height){
      return;
    }

    const row = Math.floor(mouseY / this.cellSize);
    const col = Math.floor(mouseX / this.cellSize);

    this.cells[row][col] = !this.cells[row][col];
  },
  draw: function () {
    console.log(this.cells)
    for (let i = 0; i < this.rows; i++) {
      for (let j = 0; j < this.columns; j++) {
        stroke(this.color.border);
        if (this.cells[i][j]) {
          fill(this.color.alive);
        } else {
          fill(this.color.dead);
        }
        rect(
          j * this.cellSize,
          i * this.cellSize,
          this.cellSize,
          this.cellSize
        );
      }
    }
  },
  weighCell: function (row, col) {
    let weight = 0;

    const neighbors = [
      { r: row - 1, c: col - 1 },
      { r: row - 1, c: col },
      { r: row - 1, c: col + 1 },
      { r: row, c: col - 1 },
      { r: row, c: col + 1 },
      { r: row + 1, c: col - 1 },
      { r: row + 1, c: col },
      { r: row + 1, c: col + 1 },
    ];

    //Pour incrémenter le poids (weight++) si la cellule est vivante (blanche) après avoir parcouru les neighbors
    for (const neighbor of neighbors) {
      const { r, c } = neighbor;
      if (r >= 0 && r < this.rows && c >= 0 && c < this.columns) {
        if (this.getCell(r, c)) {
          weight++;
        }
      }
    }

    return weight;
  },
  update: function () {
    console.log("updating");
    const newGrid = this.newEmptyGrid(this.rows, this.columns);

    //Méthode for i, j, k... du projet final de l'année précédente
    for (let i = 0; i < this.rows; i++) {
      for (let j = 0; j < this.columns; j++) {
        const currentCell = this.getCell(i, j);
        const weight = this.weighCell(i, j);


        console.log(i, j, currentCell, weight);

        //Règles du jeu
        if ((currentCell && (weight == 2 || weight == 3)) || (!currentCell && weight == 3)) {
          console.log('changing the grid at ', i, j)
          newGrid[i][j] = true;
        }
      }
    }

    //Remplacer la grille actuelle par la nouvelle grille (noir devient blanc et vice-versa)
    this.cells = newGrid;
    console.log("après l'update",this.cells)
  },
};
