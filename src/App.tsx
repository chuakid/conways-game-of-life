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
    useEffect(() => {
        if (start) {
            const interval = setInterval(() => {
                setGrid(computeNext(grid))
            }, 1000)
            return () => clearInterval(interval)
        }
    }, [grid, start])

    return (
        <main>
            <button onClick={() => setStart(!start)}>{start ? "Stop" : "Start"}</button>
            {grid.map((row, i) =>
                <div key={`${i}`} className={styles.row}>
                    {row.map((col, j) => <div key={`${i}-${j}`} className={styles.box}
                                              style={{background: col ? "green" : "white"}}/>)}
                </div>)
            }
        </main>
    )
}

export default App
