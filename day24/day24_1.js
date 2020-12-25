scripts.day24_1 = async () => {
    let instructions = (await getFile('day24/input.txt')).split('\r\n');

    let tiles = {};
    instructions.map(x => {
        let point = { x: 0, y: 0 };
        while(x.length > 0) {
            if (x[0] == 'e') point.x += 2;
            else if (x[0] == 'w') point.x -= 2;
            else {
                point.y += (x[0] == 'n' ? 1 : -1);
                point.x += (x[1] == 'e' ? 1 : -1);
                x = x.substr(1);
            }

            x = x.substr(1);
        }

        let key = `${point.x},${point.y}`;
        tiles[key] = !tiles[key];
    });


    let blackTiles = 0;
    for(let key in tiles)
        if (tiles[key]) blackTiles++;

    terminal.textContent = `There are ${blackTiles} tiles with the black side facing up.`;
}