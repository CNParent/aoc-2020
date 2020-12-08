scripts.day7_2 = async () => {
    await loadScript('BagRule.js');
    let data = (await getFile('day7/day7_input.txt')).split('\r\n');
    let allrules = data.map(x => new BagRule(x.split(' ')));
    allrules.forEach(x => x.link(allrules));

    let gold = allrules.find(x => x.name == 'shiny gold');
    terminal.textContent = `A single gold bag contains ${gold.contents() - 1} other bags`;
}