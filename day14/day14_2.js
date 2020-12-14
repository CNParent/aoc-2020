scripts.day14_2 = async () => {
    await loadScript('Memory.js');
    let data = (await getFile('day14/input.txt')).split('mask = ').map(x => x.split('\r\n'));
    let memory = new Memory();
    let setMemory = (mask, cmd) => {
        if(!cmd[0]) return;
        let address = Number(cmd[0].match(/[0-9]+/g)[0]).toString(2).padStart(36, '0').split('');
        let val = Number(cmd[1]);
        for(let i = 0; i < address.length; i++) {
            if(mask[i] == '0') continue;
            address[i] = mask[i];
        }

        memory.setFloating(address.reduce((a,b) => a + b, ''), val);
    }

    for(let i = 0; i < data.length; i++) {
        let mask = data[i][0];
        for(let j = 1; j < data[i].length; j++) {
            setMemory(mask, data[i][j].split(' = '));
        }
    }

    terminal.textContent = `sum of memory is ${memory.sum()}`;
}