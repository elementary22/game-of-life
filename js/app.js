'use strict';

const boardElement = document.getElementsByClassName ('board')[0];
const cellDim = 20;         // Размер ячейки в px
const xDim = Math.floor (boardElement.clientWidth / cellDim);   // Подсчет размеров игрового поля
const yDim = Math.floor (boardElement.clientHeight / cellDim);

let board = new Board(xDim, yDim);
let boardData = board.generateBoard();
let view = new View(boardData);

let interval;
let start = document.getElementsByClassName('start')[0];

start.addEventListener('click', function(ev) {                // Кнопка Старт
    ev.preventDefault();
    view.setView(boardData);                                  // Установка View

    let idents = [];
    let ident;
    
    interval = setInterval(function() {

        view.updateView(board.grid);                          // Обновление View
        board.updateNeighborsCountAllCells();                 // Обновление количества соседей
        board.updateAllCells();                               // Обновление ячеек

        if (ident == board.getAllAlives()) {                  // Проверяет предыдущее значение живих клеток  
            idents.push (ident);                              // При совпадении предыдущего и нынешнего записывает его в массив
        } else idents = [];

        ident = board.getAllAlives();

        if (idents.length > 5 || board.getAllAlives() == 0) {     // Если больше 5ти одинаковых итераций,
                                                                  // выводит табличку об окончании игры
            let curtain = document.getElementById('curtain');    
            curtain.setAttribute('style', 'display: block;');

            let exit = document.getElementById('exit-panel');       // Кнопка Exit
            exit.setAttribute('style', "display: block");

            exit.addEventListener('click', function(ev) {
                ev.preventDefault();
                clearInterval(interval);
                window.location.reload();
            });
        }
    }, 50);
});


let reset = document.getElementsByClassName('restart')[0];    // Кнопка Reset

reset.addEventListener('click', function(ev) {
    ev.preventDefault();
    clearInterval(interval);

    window.location.reload();
});