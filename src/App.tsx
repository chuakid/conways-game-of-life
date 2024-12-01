import {useEffect, useState} from 'react'
import './tailwind.css'
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
        <main className="bg-slate-900 min-h-lvh text-white p-5 flex flex-col gap-8 justify-center items-center">
            <h1 className="text-5xl">Conway's Game Of Life</h1>
            <a className="text-blue-400 hover:text-blue-600" href="https://github.com/chuakid/conways-game-of-life">Source</a>
            <section className="bg-slate-800 p-5 rounded-2xl">
                <h2 className="text-3xl">Rules</h2>
                <ul>
                    <li>Any live cell with fewer than two live neighbours dies, as if by underpopulation.</li>
                    <li>Any live cell with two or three live neighbours lives on to the next generation.</li>
                    <li>Any live cell with more than three live neighbours dies, as if by overpopulation.</li>
                    <li>Any dead cell with exactly three live neighbours becomes a live cell, as if by reproduction.
                    </li>
                </ul>
            </section>

            <section className="bg-slate-800 p-5 rounded-2xl">
                <h2 className="text-3xl">How to use</h2>
                <p>Pressing start will start the simulation. Click on any of the squares to toggle that cell.</p>
            </section>

            <div className="flex gap-1">
                <div className="flex gap-5 p-5 border border-blue-500 rounded-2xl">
                    <label>Rows</label>
                    <input className="cursor-pointer" type='range' onChange={e => {
                        setGridSize([Number(e.target.value), gridSize[1]])
                        setGrid(createEmptyGrid(gridSize[0], gridSize[1]))
                    }}/>
                    <span>{gridSize[0]}</span>
                </div>
                <div className="flex gap-5 p-5 border border-blue-500 rounded-2xl">
                    <label>Columns</label>
                    <input className="cursor-pointer" type='range' onChange={e => {
                        setGridSize([gridSize[0], Number(e.target.value)])
                        setGrid(createEmptyGrid(gridSize[0], gridSize[1]))
                    }}/>
                    <span>{gridSize[1]}</span>
                </div>

                <button
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded cursor-pointer w-fit"
                    onClick={() => setStart(!start)
                    }>{start ? "Stop" : "Start"}</button>

            </div>

            <div>
                {grid.map((row, i) =>
                    <div key={`${i}`} className="flex gap-1 mb-1">
                        {row.map((col, j) => <div key={`${i}-${j}`}
                                                  className={`${col ? "bg-green-500" : "bg-slate-700"} w-5 h-5`}
                                                  onClick={() => {
                                                      setStart(false)
                                                      setGrid(grid => {
                                                          const newGrid = structuredClone(grid)
                                                          newGrid[i][j] = !grid[i][j];
                                                          return newGrid
                                                      })
                                                  }}/>)}
                    </div>)
                }
            </div>
        </main>
    )
}

export default App
