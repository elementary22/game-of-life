'use strict';

class View {                        // Класс для view
    constructor(data) {
        this.data = data;
    }
}

View.prototype.setView = function(data) {                  // Отрисовка view на странице 
    let table = document.createElement ('table');
    for (let y = 0; y < yDim; y++) {
        let tr = document.createElement('tr');
        table.appendChild(tr);
        for (let x = 0; x < xDim; x++) {
            let td = document.createElement('td');
            if (data[y][x].isAlive) {
                td.className = 'alive';
            } 
            else {
                td.className = 'dead';
            }
            tr.appendChild(td);
        }
    }
    boardElement.appendChild(table);
};

View.prototype.updateView = function(data) {                // Обновление view 
    let table = document.querySelectorAll('table')[0];
    let rows = table.childNodes;
    for (let r = 0; r < rows.length; r++) {
        let columns = rows[r].childNodes;
        for (let c = 0; c < columns.length; c++) {
            let cell = columns[c];
            if (data[r][c].isAlive) {
                cell.className = 'alive';
            } 
            else {
                cell.className = 'dead';
            }
        }
    }
};