scripts.day8_2 = async () => {
    await loadScript('Program.js');

    let data = (await getFile('day8/input.txt')).split('\r\n');
    let program = new Program(data);
    let candidates = program.instructions.filter(x => x.code == 'nop' || x.code == 'jmp');
    for(let i in candidates) {
        let op = candidates[i];
        let code = op.code;
        if(code == 'nop') op.code = 'jmp';
        else op.code = 'nop';

        program.run();
        if (program.next == program.instructions.length) break;
        
        op.code = code;
        program.reset();
    }

    terminal.textContent = `Program halted at accumulator value ${program.accumulator}`;
}