scripts.day22_1 = async () => {
    let data = (await getFile('day22/input.txt')).split('\r\n\r\n');
    let player1 = data[0].split('\r\n').slice(1).map(Number);
    let player2 = data[1].split('\r\n').slice(1).map(Number);

    while (player1.length > 0 && player2.length > 0) {
        let card1 = player1.splice(0, 1)[0];
        let card2 = player2.splice(0, 1)[0];
        if (card1 > card2) player1 = player1.concat([card1, card2]);
        if (card2 > card1) player2 = player2.concat([card2, card1]);
    }

    let winner = player1.length == 0 ? player2 : player1;
    let score = winner.map((x, i) => x * (winner.length - i)).reduce((a,b) => a + b, 0);
    terminal.textContent = `Winner's score is ${score}`;
}