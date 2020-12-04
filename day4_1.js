scripts.day4_1 = async () => {
    await loadScript('Passport.js');
    let data = (await getFile('day4_1_input.txt')).split('\r\n\r\n').map(x => new Passport(x));
    terminal.textContent = `Found ${data.filter(x => x.isComplete()).length} valid passports`;
}