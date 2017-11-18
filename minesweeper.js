class Board {
    constructor(numberOfRows, numberOfColumns, numberOfBombs) {
        this._numberOfRows = numberOfRows;
        this._numberOfColumns = numberOfColumns;
        this._numberOfBombs = numberOfBombs;
        this._numberOfTiles = numberOfColumns * numberOfRows;
        this._playerBoard = Board.generatePlayerBoard(numberOfRows, numberOfColumns);
        this._bombBoard = Board.generateBombBoard(numberOfRows, numberOfColumns, numberOfBombs);
    }
    get playerBoard() {
        return this._playerBoard;
    }
    flipTile(rowIndex, colIndex) {
        if (this._playerBoard[rowIndex][colIndex] !== ' ') {
            return 'This tile has already been flipped';
        } else if (this._bombBoard[rowIndex][colIndex] === 'B') {
            this._playerBoard[rowIndex][colIndex] === 'B';
        } else {
            this._playerBoard[rowIndex][colIndex] = this.getNumberOfneighborBombs(rowIndex, colIndex);
        }
        this._numberOfTiles--;
    }

    /* flipTile(rowIndex, colIndex) {
            if (this._playerBoard[rowIndex][colIndex] != ' ') {
                return 'This tile has already been flipped';
            } else if (this._bombBoard[rowIndex][colIndex] === 'B') {
                this._playerBoard[rowIndex][colIndex] === 'B';

            } else {
                this._playerBoard[rowIndex][colIndex] = this.getNumberofneighborBombs(rowIndex, colIndex);
            }
            this._numberOfTiles--;
        } */
    // Get's number of neighbor bommbs
    getNumberOfneighborBombs(rowIndex, colIndex) {
            const neighborOffset = [
                [-1, -1],
                [-1, 0],
                [-1, 1],
                [0, 1],
                [1, 1],
                [1, 0],
                [1, -1],
                [0, -1]
            ];
            const numberOfRows = this._bombBoard.length;
            const numberOfColumns = this._bombBoard[0].length;
            let numberOfBombs = 0;

            neighborOffset.forEach(offset => {
                const neighborRowIndex = rowIndex + offset[0];
                const neighborColIndex = colIndex + offset[1];
                if (neighborRowIndex >= 0 && neighborRowIndex < numberOfRows && neighborColIndex >= 0 && neighborColIndex < numberOfColumns) {
                    if (this._bombBoard[neighborRowIndex][neighborColIndex] == 'B') {
                        numberOfBombs++;
                    }
                }
            });
            return numberOfBombs;
        }
        // if these 2 values equal - user won the game. If not, continue playing
    haveSafeTiles() {
        return this._numberOfTiles !== this._numberOfBombs;
    }
    print() {
            console.log(this._playerBoard.map(row => row.join(' | ')).join('\n'));
        }
        // Generates Board for user with desired number of rows and columns
    static generatePlayerBoard(numberOfRows, numberOfColumns) {
            let board = [];

            for (let rowIndex = 0; rowIndex < numberOfRows; rowIndex++) {
                let row = [];
                for (let colIndex = 0; colIndex < numberOfColumns; colIndex++) {
                    row.push(' ');

                }
                board.push(row);
            }
            return board;
        }
        //Generates bomb Board with desired number of rows, columns and bombs
    static generateBombBoard(numberOfRows, numberOfColumns, numberOfBombs) {
        let board = [];

        for (let rowIndex = 0; rowIndex < numberOfRows; rowIndex++) {
            let row = [];
            for (let colIndex = 0; colIndex < numberOfColumns; colIndex++) {
                row.push(null);

            }
            board.push(row);
        }

        let numberOfBombsPlaced = 0;

        while (numberOfBombsPlaced < numberOfBombs) {

            let randomRowIndex = Math.floor(Math.random() * numberOfRows);
            let randomColIndex = Math.floor(Math.random() * numberOfColumns);
            if (board[randomRowIndex][randomColIndex] != 'B') {
                board[randomRowIndex][randomColIndex] = 'B';
                numberOfBombsPlaced++;
            }

        }

        return board;
    }

}

class Game {
    constructor(numberOfRows, numberOfColumns, numberOfBombs) {
        this._numberOfRows = numberOfRows;
        this._numberOfColumns = numberOfColumns;
        this._numberOfBombs = numberOfBombs;
        this._board = new Board(numberOfRows, numberOfColumns, numberOfBombs);
    }
    playMove(rowIndex, colIndex) {
        this._board.flipTile(rowIndex, colIndex);

        if (this._board.playerBoard[rowIndex][colIndex] == 'B') {
            console.log('Game over!');
            this._board.print();
        } else if (!this._board.haveSafeTiles) {
            console.log('You won!');
        } else {
            console.log('Current Board: ');
            this._board.print();
        }
    }
}

let g = new Game(3, 3, 3);
g.playMove(0, 0);
g.playMove(0, 1);
g.playMove(2, 0);
g.playMove(3, 3);