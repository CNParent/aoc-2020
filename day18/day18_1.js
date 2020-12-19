scripts.day18_1 = async () => {
    let data = (await getFile('day18/input.txt')).replace(/[ ]/g, '').split('\r\n');
    let compute = (expression = '') => {
        while (expression.includes('(')) {
            let start = expression.lastIndexOf('(');
            let end = expression.substr(start).indexOf(')');
            let subExpression = expression.slice(start + 1, start + end);
            let value = compute(subExpression);
            expression = expression.replace(`(${subExpression})`, value.toString());
        }

        let values = expression.split(/[\+|\*]/g);
        let operators = expression.split(/[\d]+/g).filter(x => x != '');
        let sum = Number(values[0]);
        for(let i = 0; i < operators.length; i++) {
            if (operators[i] == '+') sum += Number(values[i + 1]);
            else if (operators[i] == '*') sum *= Number(values[i + 1]);
        }

        return sum;
    }

    let sum = 0;
    data.forEach(x => {
        sum += compute(x);
    });

    terminal.textContent = `Sum of all expressions is ${sum}`;
}