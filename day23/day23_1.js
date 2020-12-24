scripts.day23_1 = async () => {
    let cups = '123487596'.split('').map(Number);
    let min = Math.min(...cups);
    let max = Math.max(...cups);
    let rounds = 100;
    while(rounds > 0) {
        let current = cups.splice(0, 1)[0];
        let holding = cups.splice(0, 3);
        let value = current - 1;
        let destination = -1; 
        while (destination == -1) {
            destination = cups.indexOf(value--);
            if (value < min) value = max;
        }

        cups.splice(destination + 1, 0, ...holding);
        cups.push(current);
        rounds--;
    }

    let startIndex = cups.indexOf(1);
    cups = cups.slice(startIndex + 1).concat(cups.slice(0, startIndex + 1));
    terminal.textContent = `Final arrangement is ${cups.reduce((a,b) => `${a}${b}`, '')}`;
}