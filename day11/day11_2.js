scripts.day11_2 = async () => {
    await loadScript('Seating.js');
    let data = (await getFile('day11/input.txt')).split('\r\n').map(x => x.split(''));
    let seating = new Seating(data, 5, 'visible');
    let occupied = seating.stabilize();
    terminal.textContent = `Found ${occupied} occupied seats after stablizing simulation`;
}