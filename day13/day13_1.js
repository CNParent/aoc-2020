scripts.day13_1 = async () => {    
    let data = (await getFile('day13/input.txt')).split('\r\n');

    let departure = Number(data[0]);
    let busses = data[1].split(',').filter(x => x != 'x').map(Number);

    let waitTimes = busses.map((x) => { return { id: x, wait: x - departure % x }; });
    waitTimes.sort((a,b) => a.wait - b.wait);
    terminal.textContent = `Lowest wait time is ${waitTimes[0].wait} with bus id ${waitTimes[0].id} (${waitTimes[0].wait * waitTimes[0].id})`;
}