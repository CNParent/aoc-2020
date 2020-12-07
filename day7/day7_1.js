scripts.day7_1 = async () => {
    await loadScript('BagRule.js');
    let data = (await getFile('day7/day7_input.txt')).split('\r\n');
    let allrules = data.map(x => new BagRule(x.split(' ')));
    let rules = allrules.filter(x => x.bags.some(b => b.name == 'shiny gold'));
    let hasgoldbag = rules;
    while(rules.length > 0) {
        rules = allrules.filter(x => x.bags.some(b => rules.map(r => r.name).includes(b.name)));
        hasgoldbag = rules.concat(hasgoldbag);
    }

    terminal.textContent = `${new Set(hasgoldbag.map(x => x.name)).size} unique bags will eventually contain a shiny gold bag`;
}