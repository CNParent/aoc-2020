scripts.day1_2 = async () => {
    await loadScript('Solver.js');

    let data = await getFile('day1/day1_1_input.txt');
    data = data.split('\r\n').map(Number);
    let solver = new Solver(data);
    let results = solver.compose(2020, 3);
    terminal.textContent = `Matches found:
        ${results.map(x => `data[${x.index}] = ${x.value}`).reduce((a,b) => `${a}\r\n${b}`)}

        product is ${results.reduce((a,b) => a * b.value, 1)}
    `;
}