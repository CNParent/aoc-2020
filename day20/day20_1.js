scripts.day20_1 = async () => {
    await loadScript('Tile.js');
    let data = (await getFile('day20/input.txt')).split('\r\n\r\n');
    let tiles = data.map(x => new Tile(x.split('\r\n')));
    let corners = tiles.filter(x => x.matchCount(tiles) == 2);
    terminal.textContent = `Product of ids of corners is ${corners.reduce((a,b) => a * b.id, 1)}`;
}