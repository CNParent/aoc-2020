scripts.day1_2 = async () => {
    let data = await getFile('day1_1_input.txt');
    data = data.map(x => Number(x));    
    for(var i in data) {
        for(var j in data) {
            for(var k in data) {
                if (data[i] + data[j] + data[k] == 2020) {
                    terminal.textContent = `Matches found:
                        data[${i}] = ${data[i]}
                        data[${j}] = ${data[j]}
                        data[${k}] = ${data[k]}
                        
                        product is ${data[i] * data[j] * data[k]}
                    `;

                    return;
                }
            }
        }
    }
}