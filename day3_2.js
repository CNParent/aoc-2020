scripts.day3_2 = async () => {
    await loadScript('WrappingGrid.js');
    let data = (await getFile('day3_1_input.txt')).split('\r\n').map(x => x.split(''));
    let grid = new WrappingGrid(data);
    let collisions = []; 
    collisions.push(grid.getCollisions({ dx: 1, dy: 1 }));
    collisions.push(grid.getCollisions({ dx: 3, dy: 1 }));
    collisions.push(grid.getCollisions({ dx: 5, dy: 1 }));
    collisions.push(grid.getCollisions({ dx: 7, dy: 1 }));
    collisions.push(grid.getCollisions({ dx: 1, dy: 2 }));
    terminal.textContent = `Found ${collisions.reduce((a,b) => a * b, 1)} collisions`;
}