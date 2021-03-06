scripts.day3_1 = async () => {
    await loadScript('WrappingGrid.js');
    let data = (await getFile('day3/day3_1_input.txt')).split('\r\n').map(x => x.split(''));
    let grid = new WrappingGrid(data);
    let collisions = grid.getCollisions({ dx: 3, dy: 1 });
    terminal.textContent = `Found ${collisions} collisions`;
}