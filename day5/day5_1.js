scripts.day5_1 = async () => {
    await loadScript('BinarySearch.js');
    let space = () => { return { x: { from: 0, to: 7 }, y: { from: 0, to: 127 } } };
    let data = (await getFile('day5/day5_1_input.txt'))
        .split('\r\n')
        .map(x => binarySearch(space(), x))
        .map(x => x.id);

    terminal.textContent = `Maximum seat id is ${Math.max(...data)}`;
}