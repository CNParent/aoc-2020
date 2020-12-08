scripts.day7_1 = async () => {
    await loadScript('BagRule.js');
    let data = (await getFile('day7/day7_input.txt')).split('\r\n');
    let rules = data.map(x => new BagRule(x.split(' ')));
    rules.forEach(x => x.link(rules));

    terminal.textContent = `${rules.filter(x => x.contains('shiny gold')).length - 1} unique bags will eventually contain a shiny gold bag`;
}