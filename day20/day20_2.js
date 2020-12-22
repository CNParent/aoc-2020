
loadScript('MonsterRadar.js');

scripts.day20_2 = async () => {
    await loadScript('MonsterRadar.js');
    await loadScript('Photo.js');
    await loadScript('Tile.js');
    let data = (await getFile('day20/input.txt')).split('\r\n\r\n');
    let tiles = data.map(x => new Tile(x.split('\r\n')));
    tiles.forEach(x => x.matchCount(tiles));

    let photo = new Photo(tiles);
    photo.orient();
    photo.place();

    let radar = new MonsterRadar(photo.draw());
    let attempts = 0;
    let monsters = 0;
    while(attempts < 8) {
        monsters = radar.monsters();
        if (monsters > 0) break;

        if (attempts == 3) radar.flip();
        radar.rotate();
        attempts++;
    }

    terminal.textContent = `Rough water count is ${radar.choppy()}. Found ${monsters} in: \r\n\r\n${radar.data}`;
}