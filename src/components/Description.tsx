function Description() {
    return (
        <>
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
        </>)
}

export default Description;