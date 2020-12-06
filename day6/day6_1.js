scripts.day6_1 = async () => {
    let data = (await getFile('day6/day6_1_input.txt')).split('\r\n\r\n');
    let answerCounts = data.map(x => {
        let people = x.split('\r\n');
        let answers = people.reduce((a,b) => a.concat(b.split('')), []);
        answers = answers.reduce((a,b) => a.includes(b) ? a : a.concat([b]), []);
        return answers.length;
    });

    terminal.textContent = `${answerCounts.reduce((a,b) => a + b, 0)} total questions answered through customs`;
}