scripts.day9_1 = async () => {
    await loadScript('Solver.js');
    let data = (await getFile('day9/input.txt')).split('\r\n').map(x => Number(x));
    let i = 25;
    while(i < data.length) {
        let solver = new Solver(data.slice(i - 25, i));
        if(solver.compose(data[i], 2).length == 0) break;

        i++;
    }

    terminal.textContent = `Mismatch ${data[i]} found at index ${i}`;
}