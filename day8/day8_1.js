scripts.day8_1 = async () => {
    await loadScript('Program.js');

    let data = (await getFile('day8/input.txt')).split('\r\n');
    let program = new Program(data);
    program.run();
    terminal.textContent = `Program halted at accumulator value ${program.accumulator}`;
}