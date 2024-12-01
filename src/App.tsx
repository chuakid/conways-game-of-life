import {useEffect, useState} from 'react'
import styles from "./styles.module.scss"
import {computeNext, createEmptyGrid} from "./utils.ts";


function App() {
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
