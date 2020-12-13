scripts.day13_2 = async () => {    
    let data = (await getFile('day13/input.txt')).split('\r\n');
    let lineUp = (busses = [1], t = 0) => {
        terminal.textContent = `Checking t = ${t}...`;
        for(let i = 0 ; i < busses.length; i++) {
            if (!busses[i]) continue;
            if ((t + i) % busses[i] != 0) return false;
        }

        return true;
    };

    let allBusses = data[1].split(',').map(Number);
    let t = 0;
    let step = allBusses[0];
    for(let i = 1; i < allBusses.length; i++) {
        if(!allBusses[i]) continue;

        let first = t;
        while (!lineUp(allBusses.slice(0, i + 1), t)) t += step;
        first = t;

        t += step;
        while(!lineUp(allBusses.slice(0, i + 1), t)) t += step;
        step = t - first;
    }

    t -= step;
    terminal.textContent = `Busses line up at t = ${t}`;
}