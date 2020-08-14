import { Column } from "./column.js";
import { ColumnWinInspector } from "./column-win-inspector.js";
export class Game {
    constructor(playerOneName, playerTwoName) {
        this.playerOneName = playerOneName;
        this.playerTwoName = playerTwoName;
        this.currentPlayer = 1;
        this.columns = [
            new Column(),
            new Column(),
            new Column(),
            new Column(),
            new Column(),
            new Column(),
            new Column()
        ]
        this.winnerNumber = 0;
    }

    checkForTie() {
        if (this.columns.every(e => e.isFull())) {
            this.winnerNumber = 3;
        }
    }

    checkForColumnWin() {
        if (this.winnerNumber !== 0) return;

        for (let columnIndex = 0; columnIndex < this.columns.length; columnIndex++) {
            const column = this.columns[columnIndex];
            const inspector = new ColumnWinInspector(column);
            const winnerNumber = inspector.inspect();

            if (winnerNumber === 1 || winnerNumber === 2) {
                this.winnerNumber = winnerNumber;
            }
        }

    }

    getName() {
        if (this.winnerNumber === 1) {
            return `${this.playerOneName} wins!`;
        }
        if (this.winnerNumber === 2) {
            return `${this.playerTwoName} wins!`
        }
        if (this.winnerNumber === 3) {
            return `${this.playerOneName} ties with ${this.playerTwoName}`;
        }
        return `${this.playerOneName} vs. ${this.playerTwoName}`;
    }
    playInColumn(columnIndex) {
        this.columns[columnIndex].add(this.currentPlayer);
        this.checkForTie();
        this.checkForColumnWin();
        if (this.currentPlayer === 1) {
            this.currentPlayer = 2;
        } else {
            this.currentPlayer = 1;
        }
    }

    isColumnFull(columnIndex) {
        if (this.winnerNumber === 1 || this.winnerNumber === 2) {
            return true;
        }
        return this.columns[columnIndex].isFull();
    }

    getTokenAt(rowIndex, columnIndex) {
        return this.columns[columnIndex].getTokenAt(rowIndex);
    }
}
