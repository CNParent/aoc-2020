scripts.day5_2 = async () => {
    await loadScript('BinarySearch.js');
    let space = () => { return { x: { from: 0, to: 7 }, y: { from: 0, to: 127 } } };
    let data = (await getFile('day5/day5_1_input.txt'))
        .split('\r\n')
        .map(x => binarySearch(space(), x).id);
    
    let seats = [...Array(128 * 8)].map((x,i) => i);
    let unoccupied = seats.filter(x => data.indexOf(x) == -1);
    let id = unoccupied.find(x => unoccupied.indexOf(x - 1) == -1 && unoccupied.indexOf(x + 1) == -1);
    let myseat = { x: id % 8, y: Math.floor(id / 128), id: id };
    terminal.textContent = `Found unoccupied seat in row ${myseat.y}, column ${myseat.x} with id ${myseat.id}`;
}