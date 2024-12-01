import {useEffect, useState} from 'react'
import styles from "./styles.module.scss"
import {computeNext, createEmptyGrid} from "./utils.ts";


function App() {
    const [gridSize, setGridSize] = useState([20, 20])
    const [grid, setGrid] = useState<boolean[][]>(createEmptyGrid(20, 20))
    const [start, setStart] = useState(false)
    useEffect(() => {
        const timer = start ? setInterval(() => {
            if (start) {
                setGrid(prev => computeNext(prev))
            }
        }, 500) : 0
        return () => clearInterval(timer)
    }, [grid, start])

    return (
        <main>
            <div>
                <label>Rows</label>
                <input type='range' onChange={e => {
                    setGridSize([Number(e.target.value), gridSize[1]])
                    setGrid(createEmptyGrid(gridSize[0], gridSize[1]))
                }}/>
                <span>{gridSize[0]}</span>
            </div>

            <div>
                <label>Columns</label>
                <input type='range' onChange={e => {
                    setGridSize([gridSize[0], Number(e.target.value)])
                    setGrid(createEmptyGrid(gridSize[0], gridSize[1]))
                }}/>
                <span>{gridSize[1]}</span>
            </div>

            <h2>Rules</h2>
            <ul>
                <li>Any live cell with fewer than two live neighbours dies, as if by underpopulation.</li>
                <li>Any live cell with two or three live neighbours lives on to the next generation.</li>
                <li>Any live cell with more than three live neighbours dies, as if by overpopulation.</li>
                <li>Any dead cell with exactly three live neighbours becomes a live cell, as if by reproduction.
                </li>

            </ul>

            <button onClick={() => setStart(!start)
            }>{start ? "Stop" : "Start"}</button>

            {grid.map((row, i) =>
                <div key={`${i}`} className={styles.row}>
                    {row.map((col, j) => <div key={`${i}-${j}`} className={styles.box}
                                              onClick={() => {
                                                  setStart(false)
                                                  setGrid(grid => {
                                                      const newGrid = structuredClone(grid)
                                                      newGrid[i][j] = !grid[i][j];
                                                      return newGrid
                                                  })
                                              }}
                                              style={{background: col ? "green" : "white"}}/>)}
                </div>)
            }
        </main>
    )
}

export default App
