scripts.day23_2 = async () => {
    let cups = {};
    let numbers = '123487596'.split('').map(Number);
    let min = Math.min(...numbers);
    let max = Math.max(...numbers);
    while(numbers.length < 1000000)
        numbers.push(++max);

    for(let i = 0; i < numbers.length - 1; i++)
        cups[numbers[i].toString()] = { value: numbers[i], next: numbers[i + 1].toString() };

    cups[max.toString()] = { value: max, next: numbers[0].toString() };
    
    let current = cups[numbers[0].toString()];
    let rounds = 10000000;
    while(rounds > 0) {
        let held = [cups[current.next], cups[cups[current.next].next], cups[cups[cups[current.next].next].next]];
        current.next = held[2].next;
        let key = current.value;
        let cup = null;
        do {
            key--;
            if(key < min) key = max;
            cup = cups[key.toString()];
        } while(held.includes(cup));
        
        held[2].next = cup.next;
        cup.next = held[0].value.toString();

        current = cups[current.next];
        rounds--;
    }

    let cup1 = cups['1'];
    let cupA = cup1.next;
    let cupB = cups[cupA].next;
    terminal.textContent = `Cups to the right of '1' are: ${cupA} * ${cupB} = ${cups[cupA].value * cups[cupB].value}`;
}