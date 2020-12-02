scripts.day1_1 = async () => {
    let data = await getFile('day1_1_input.txt');
    data = data.map(x => Number(x));    
    for(var i in data) {
        for(var j in data) {
            if (data[i] + data[j] == 2020) {
                terminal.textContent = `Matches found:
                    data[${i}] = ${data[i]}
                    data[${j}] = ${data[j]}
                    
                    product is ${data[i] * data[j]}
                `;

                return;
            }
        }
    }
}