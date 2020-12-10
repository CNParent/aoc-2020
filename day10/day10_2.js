scripts.day10_2 = async () => {
    await loadScript('PathLine.js');
    let data = (await getFile('day10/input.txt')).split('\r\n').map(Number);
    data.push(0);
    data.push(Math.max(...data) + 3);
    data.sort((a,b) => a - b);

    let finder = new PathLine(data);
    let segments = finder.segments();
    let complexities = segments.map(x => x.complexity());
    terminal.textContent = `Line complexity is ${complexities.reduce((a,b) => a * b, 1)}`;
}