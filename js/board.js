'use strict';

class Board {                        // Класс для логики 
    constructor(xSize, ySize) {
        this.xSize = xSize;
        this.ySize = ySize;
        this.directions = [ [-1,-1], [-1,0], [-1, 1], [0,-1], [0,1], [1,-1], [1,0], [1,1] ];
        this.grid = this.generateBoard();
    }            
}

Board.prototype.generateBoard = function() {         // Логика содания игрового поля
    let grid = [];
    for (let y = 0; y < this.ySize; y++) {
        let row = [];
        for (let x = 0; x < this.xSize; x++) {
            let random = Math.floor(Math.random() * 2);
            row.push(new Cell());
            if (random == 0) {
                row[x].isAlive = true;
            } else {
                row[x].isAlive = false;
            }
        }
        grid.push(row);
    }
    return grid;
};

Board.prototype.lessThanTwoNeighbors = function(r, c) {     // Проверка - если меньше двух живых соседей
    let cell = this.grid[r][c];
    return cell.neighbors < 2;
};

Board.prototype.moreThanThreeNeighbors = function(r, c) {    // Проверка - если больше трех живых соседей
    let cell = this.grid[r][c];
    return cell.neighbors > 3;
};

Board.prototype.deadAndThreeNeighbors = function(r,c) {      // Проверка - если клетка мертвая и овно 3 живых соседей
    let cell = this.grid[r][c];
    return !cell.isAlive && cell.neighbors == 3;
};

Board.prototype.isInGameArea = function(r,c) {                 // Проверка нахождения в границах поля
    return r >= 0 && r < this.ySize && c >= 0 && c < this.xSize;
};

Board.prototype.updateNeighborsCount = function(r,c) {       // Подсчет живых соседей у одной клетки
    let cell = this.grid[r][c];
    cell.neighbors = 0;
    for (let i = 0; i < this.directions.length; i++) {
        let direction = this.directions[i];
        let dr = direction[0],
            dc = direction[1];
        if (this.isInGameArea(r + dr, c + dc)) {
            let neighbor = this.grid[r + dr][c + dc];
            if (neighbor.isAlive) {
                cell.neighbors += 1;
            }
        }
    }
};

Board.prototype.updateNeighborsCountAllCells = function() {   // Подсчет живых соседей у всех клеток
    for(let y = 0; y < this.ySize; y++) {
        for (let x = 0; x < this.xSize; x++) {
            this.updateNeighborsCount(y,x);
        }
    }
};

Board.prototype.updateCell = function(r,c) {                  // Обновления состояния одной клетки
    let cell = this.grid[r][c];
    if(this.lessThanTwoNeighbors(r,c) || this.moreThanThreeNeighbors(r,c)) {
        cell.isAlive = false;
    }
    if(this.deadAndThreeNeighbors(r,c)) {
        cell.isAlive = true;
    }
};

Board.prototype.updateAllCells = function() {                  // Обновления состояния всех клеток
    for(let y = 0; y < this.ySize; y++) {
        for (let x = 0; x < this.xSize; x++) {
            this.updateCell(y,x);
        }
    }
};

Board.prototype.getAllAlives = function () {               // Получение количества оставшихся живых клеток
    let alives = [];
    board.grid.forEach(function(rows){
        rows.forEach(function(columns){
            if (columns.isAlive) {
                alives.push(columns);
            }
        })
    });
    return alives.length;
};