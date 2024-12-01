export function createEmptyGrid(rows: number, cols:number) {
    const grid: boolean[][] = new Array<boolean[]>(rows)
    for (let i = 0; i < rows; i++) {
        grid[i] = new Array<boolean>(cols)
        for (let j = 0; j < cols; j++) {
            grid[i][j] = false
        }
    }
    return grid
}

export function computeNext(curr: boolean[][]) {
    const next = createEmptyGrid(curr.length, curr[0].length)
    for (let i = 0; i < curr.length; i++) {
        for (let j = 0; j < curr[i].length; j++) {
            let aliveNeighbours = 0
            // row above
            if (i > 0) {
                if (j > 0 && curr[i - 1][j - 1]) aliveNeighbours += 1 // top left
                if (curr[i - 1][j]) aliveNeighbours += 1 // top
                if (j < curr[i].length - 1 && curr[i - 1][j + 1]) aliveNeighbours += 1 // top right
            }
            if (j > 0 && curr[i][j - 1]) aliveNeighbours += 1 //  left
            if (j < curr[i].length - 1 && curr[i][j + 1]) aliveNeighbours += 1 //  right

            if (i < curr.length - 1) {
                // row below
                if (j > 0 && curr[i + 1][j - 1]) aliveNeighbours += 1 // bottom left
                if (curr[i + 1][j]) aliveNeighbours += 1 // bottom
                if (j < curr[i].length - 1 && curr[i + 1][j + 1]) aliveNeighbours += 1 // bottom right
            }
            if (curr[i][j]) {
                // is alive
                if (aliveNeighbours < 2) next[i][j] = false
                else next[i][j] = aliveNeighbours < 4;
            } else {
                next[i][j] = aliveNeighbours === 3
            }
        }
    }
    return next
}

