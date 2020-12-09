scripts.day9_2 = async () => {
    await loadScript('Solver.js');
    let data = (await getFile('day9/input.txt')).split('\r\n').map(x => Number(x));
    let solver = new Solver(data);
    let mismatch = solver.findIncomposable(25);
    let result = solver.continuousCompose(mismatch.value);
    terminal.textContent = `Mismatch ${mismatch.value} found at index ${mismatch.index}
        sum of smallest and larget number in continguous set: ${result.smallest} + ${result.largest} = ${result.smallest + result.largest}
    `;
}