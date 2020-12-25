scripts.day24_2 = async () => {
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

    let adjacent = (x = 0, y = 0) => {
        return [
            `${x + 2},${y}`,
            `${x + 1},${y - 1}`,
            `${x - 1},${y - 1}`,
            `${x - 2},${y}`,
            `${x + 1},${y + 1}`,
            `${x - 1},${y + 1}`
        ];
    };

    let blackCount = (keys = ['']) => keys.map(x => tiles[x]).filter(x => x).length;

    let days = 100;
    while (days > 0) {
        let tomorrow = {};
        let flip = (key = '', checkAdjacent = false) => {
            let [x,y] = key.split(',').map(Number);
            let others = adjacent(x, y);
            let black = blackCount(others);
            if (tiles[`${x},${y}`]) {
                if (black == 0 || black > 2) tomorrow[key] = false;
                else tomorrow[key] = true;
            } else if (black == 2) {
                tomorrow[key] = true;
            }

            if (checkAdjacent) others.map(k => flip(k));
        }

        for (let key in tiles) flip(key, true);

        tiles = tomorrow;
        days--;
    }

    let allKeys = [];
    for (let key in tiles)
        allKeys.push(key);

    terminal.textContent = `There are ${blackCount(allKeys)} tiles with the black side facing up.`;
}