scripts.day15_1 = async () => {
    let memory = {};
    let data = (await getFile('day15/input.txt')).split(',');
    data.forEach((x,i) => memory[x] = i);
    let previous = data[data.length - 1];
    memory[previous] = undefined;
    for(var i = data.length; i < 2020; i++) {
        if (memory[previous] === undefined) {
            memory[previous] = i - 1;
            previous = '0';
        } else {
            let next = (i - memory[previous] - 1).toString();
            memory[previous] = i - 1;
            previous = next;
        }
    }

    terminal.textContent = `The 2020th number is ${previous}`;
}