scripts.day14_1 = async () => {
    await loadScript('Memory.js');
    let data = (await getFile('day14/input.txt')).split('mask = ').map(x => x.split('\r\n'));
    let memory = new Memory();
    let setMemory = (mask, cmd) => {
        if(!cmd[0]) return;
        let index = cmd[0].match(/[0-9]+/g)[0];
        let val = Number(cmd[1]).toString(2).padStart(36, '0').split('');
        for(let i = 0; i < val.length; i++) {
            if (mask[i] == 'X') continue;
            else val[i] = mask[i];
        }

        memory.set(index, parseInt(val.reduce((a,b) => a + b, ''), 2));
    }

    for(let i = 0; i < data.length; i++) {
        let mask = data[i][0];
        for(let j = 1; j < data[i].length; j++) {
            setMemory(mask, data[i][j].split(' = '));
        }
    }

    terminal.textContent = `sum of memory is ${memory.sum()}`;
}