scripts.day18_2 = async () => {
    let data = (await getFile('day18/input.txt')).split('\r\n');
    let compute = (expression = '') => {
        while (expression.includes('(')) {
            let start = expression.lastIndexOf('(');
            let end = expression.substr(start).indexOf(')');
            let subExpression = expression.slice(start + 1, start + end);
            let value = compute(subExpression);
            expression = expression.replace(`(${subExpression})`, value.toString());
        }

        let tokens = expression.split(' ');
        while (tokens.includes('+')) {
            let i = tokens.indexOf('+');
            let val = Number(tokens[i - 1]) + Number(tokens[i + 1]);
            tokens.splice(i - 1, 3, val.toString());
        }

        while (tokens.includes('*')) {
            let i = tokens.indexOf('*');
            let val = Number(tokens[i - 1]) * Number(tokens[i + 1]);
            tokens.splice(i - 1, 3, val.toString());
        }

        return Number(tokens[0]);
    }

    let sum = 0;
    data.forEach(x => {
        sum += compute(x);
    });

    terminal.textContent = `Sum of all expressions is ${sum}`;
}