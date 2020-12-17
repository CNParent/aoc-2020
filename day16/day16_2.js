scripts.day16_2 = async () => {
    await loadScript('TicketValidator.js');
    let data = (await getFile('day16/input.txt')).split('\r\n\r\n');
    let validator = new TicketValidator(data);
    validator.discardInvalid();
    validator.assignIndices();
    let departureIndices = validator.rules.filter(x => x.name.startsWith('departure')).map(x => x.index);
    let product = departureIndices.map(x => validator.ticket[x]).reduce((a,b) => a * b, 1);
    terminal.textContent = `Product of departure fields is: ${product}`;
}