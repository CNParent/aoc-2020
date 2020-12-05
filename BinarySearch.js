let binarySearch = (space = { x: { from: 0, to: 1 }, y: { from: 0, to: 1} }, command = '') => {
    let dy = Math.round((space.y.to - space.y.from + 1) / 2);
    let dx = Math.round((space.x.to - space.x.from + 1) / 2);
    if (command[0] == 'B') space.y.from += dy;
    else if (command[0] == 'F') space.y.to -= dy;
    else if (command[0] == 'R') space.x.from += dx;
    else if (command[0] == 'L') space.x.to -= dx;

    if(space.x.from == space.x.to && space.y.from == space.y.to) 
        return { x: space.x.from, y: space.y.to, id: space.y.from * 8 + space.x.from };

    return binarySearch(space, command.substring(1));
}