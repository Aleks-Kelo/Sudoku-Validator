let N = 0;
let sqrtN = 0;

function validateSudokuRow(sudokuRow) {
    const setRow = new Set(sudokuRow);

    const isValid =
        sudokuRow.length === N &&
        setRow.size === N &&
        sudokuRow.every((num) => num > 0 && num <= N && Number.isInteger(num));

    return isValid;
}

function transposeSudoku(sudoku) {
    return sudoku[0].map((_col, colIndex) =>
        sudoku.map((row) => row[colIndex])
    );
}

function splitAndValidateSudoku(sudoku) {
    for (let row = 0; row < N; row += sqrtN) {
        for (let col = 0; col < N; col += sqrtN) {
            miniSudoku = [];
            for (let i = 0; i < sqrtN; i++) {
                for (let j = 0; j < sqrtN; j++) {
                    miniSudoku.push(sudoku[row + i][col + j]);
                }
            }

            if (!validateSudokuRow(miniSudoku)) return false;
        }
    }

    return true;
}

function validateSudoku(sudoku) {
    N = sudoku.length;
    sqrtN = Math.sqrt(N);

    if (!Number.isInteger(sqrtN)) return false;

    for (let row of sudoku) {
        if (!validateSudokuRow(row)) {
            return false;
        }
    }

    const transposedSudoku = transposeSudoku(sudoku);

    for (let row of transposedSudoku) {
        if (!validateSudokuRow(row)) {
            return false;
        }
    }

    if (!splitAndValidateSudoku(sudoku)) {
        return false;
    }

    return true;
}

// test the function
const sudoku = [
    [7, 8, 4, 1, 5, 9, 3, 2, 6],
    [5, 3, 9, 6, 7, 2, 8, 4, 1],
    [6, 1, 2, 4, 3, 8, 7, 5, 9],
    [9, 2, 8, 7, 1, 5, 4, 6, 3],
    [3, 5, 7, 8, 4, 6, 1, 9, 2],
    [4, 6, 1, 9, 2, 3, 5, 8, 7],
    [8, 7, 6, 3, 9, 4, 2, 1, 5],
    [2, 4, 3, 5, 6, 1, 9, 7, 8],
    [1, 9, 5, 2, 8, 7, 6, 3, 4],
];

console.log(validateSudoku(sudoku));
