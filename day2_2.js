scripts.day2_2 = async () =>{
    await loadScript('PasswordValidator.js');

    let data = await getFile('day2_1_input.txt');
    data = data.map(x => new PasswordValidator(x));

    terminal.textContent = `Valid password count is ${data.filter(x => x.isValidPositional()).length}`;
}