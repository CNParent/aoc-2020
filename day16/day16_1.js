scripts.day16_1 = async () => {
    await loadScript('TicketValidator.js');
    let data = (await getFile('day16/input.txt')).split('\r\n\r\n');
    let validator = new TicketValidator(data);
    terminal.textContent = `Ticket error rate: ${validator.errorRate()}`;
}