scripts.day9_1 = async () => {
    await loadScript('Solver.js');
    let data = (await getFile('day9/input.txt')).split('\r\n').map(x => Number(x));
    let solver = new Solver(data);
    let entry = solver.findIncomposable(25);
    terminal.textContent = `Mismatch ${entry.value} found at index ${entry.index}`;
}