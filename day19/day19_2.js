scripts.day19_2 = async () => {
    let data = (await getFile('day19/input.txt')).split('\r\n\r\n');

    let rules = data[0].split('\r\n').map((x = '') => {
        let [key, rule] = x.split(': ');
        if(rule[0] == '"') return { key, values: [rule[1]], options: [] };

        let options = rule.split(' | ');
        return { key, options: options.map(o => o.split(' ')) };
    });

    let compose = (prefix = '', values = [['']]) => {
        if (values.length == 1) return values[0].map(x => `${prefix}${x}`);

        return values[0].map(x => compose(`${prefix}${x}`, values.slice(1)))
            .reduce((a,b) => a.concat(b), []);
    }

    let getValues = (key = '0') => {
        let rule = rules.find(x => x.key == key);
        if (rule.values) return rule.values;

        let optionValues = rule.options.map(x => x.map(o => getValues(o)));
        rule.values = optionValues
            .map(x => compose('', x))
            .reduce((a,b) => a.concat(b), []);

        return rule.values;
    }

    let allValues = getValues();
    let minLen = allValues[0].length;
    let all42 = getValues('42');
    let len42 = all42[0].length;
    let all31 = getValues('31');
    let len31 = all31[0].length;
    let messages = data[1].split('\r\n');

    let validMessages = messages.filter(x => {
        let count42 = 0;
        let count31 = 0;
        while(x.length > minLen) {
            let segment = x.substr(len42 * 2, len42);
            if (!all42.includes(segment)) break;
            
            let temp = x.split('');
            temp.splice(len42 * 2, len42);
            x = temp.reduce((a,b) => a + b, '');
            count42++;
        }

        while(x.length > minLen) {
            let segment = x.substr(len42 * 2 + len31, len31);
            if (!all31.includes(segment)) break;

            let temp = x.split('');
            temp.splice(len42 * 2 + len31, len31);
            x = temp.reduce((a,b) => a + b, '');
            count31++;
        }

        if (count31 > count42) return false;

        return allValues.includes(x);
    });

    terminal.textContent = `${validMessages.length} valid messages found`;
}
