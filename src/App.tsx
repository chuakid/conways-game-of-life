import {useEffect, useState} from 'react'
import styles from "./styles.module.scss"
import {computeNext, createEmptyGrid} from "./utils.ts";

const SIZE = 20
const STARTING_ARRAY: boolean[][] = createEmptyGrid(SIZE, SIZE)
STARTING_ARRAY[5][6] = true
STARTING_ARRAY[6][6] = true
STARTING_ARRAY[7][6] = true

function App() {
    const [grid, setGrid] = useState<boolean[][]>(STARTING_ARRAY)
    const [start, setStart] = useState(false)
    const [edit, setEdit] = useState(false)
    useEffect(() => {
        const timer = setInterval(() => {
            if (start) {
                setGrid(computeNext(grid))
            }
        }, 500)
        return () => clearInterval(timer)
    }, [grid, start])

    return (
        <main>
            <button onClick={() => {
                setStart(!start)
                setEdit(false)

            }}>{start ? "Stop" : "Start"}</button>
            <button onClick={() => {
                setStart(false)
                setEdit(!edit)
            }}>{edit ? "Stop editing" : "Start editing"}</button>
            {grid.map((row, i) =>
                <div key={`${i}`} className={styles.row}>
                    {row.map((col, j) => <div key={`${i}-${j}`} className={styles.box}
                                              onClick={() => {
                                                  if (edit)
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
