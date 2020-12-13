scripts.day12_2 = async () => {
    await loadScript('Waypoint.js');
    let data = (await getFile('day12/input.txt')).split('\r\n');
    let ferry = new Waypoint(data, { x: 0, y: 0}, { x: 10, y: 1 });
    ferry.travel();
    terminal.textContent = `Manhattan distance is ${Math.abs(ferry.pos.x) + Math.abs(ferry.pos.y)}`;
}