scripts.day1_1 = async () => {
    await loadScript('Solver.js');

    let data = await getFile('day1_1_input.txt');
    data = data.split('\r\n').map(Number);
    let solver = new Solver(data);
    let results = solver.compose(2020, 2);
    terminal.textContent = `Matches found:
        ${results.map(x => `data[${x.index}] = ${x.value}`).reduce((a,b) => `${a}\r\n${b}`)}

        product is ${results.reduce((a,b) => a * b.value, 1)}
    `;
}