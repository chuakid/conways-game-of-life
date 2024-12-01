import {useState} from 'react'
import './App.css'
import styles from "./styles.module.scss"

const SIZE = 20

function App() {
    const [grid, setGrid] = useState<boolean[][]>(new Array(SIZE).fill(new Array(SIZE).fill(false)))

    return (
        <main>
            {grid.map(row =>
                <div className={styles.row}>{row.map(col => <div className={styles.box} style={{background: col ? "green" : "white"}}/>)}</div>)
            }
        </main>
    )
}

export default App
