scripts.day10_1 = async () => {
    let data = (await getFile('day10/input.txt')).split('\r\n').map(Number);
    data.push(0);
    data.push(Math.max(...data) + 3);
    data.sort((a,b) => a - b);
    
    let differences = [0,0,0];
    for(let i = 1; i < data.length; i++)
        differences[data[i] - data[i-1] - 1]++;
    
    terminal.textContent = `Jolt differences: ${differences}
        product of 1 and 3 = ${differences[0] * differences[2]}
    `;
}