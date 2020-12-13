scripts.day12_1 = async () => {
    await loadScript('Ferry.js');
    let data = (await getFile('day12/input.txt')).split('\r\n');
    let ferry = new Ferry(data);
    ferry.travel();
    terminal.textContent = `Manhattan distance is ${Math.abs(ferry.pos.x) + Math.abs(ferry.pos.y)}`;
}