scripts.day22_2 = async () => {
    let data = (await getFile('day22/input.txt')).split('\r\n\r\n');
    let player1 = data[0].split('\r\n').slice(1).map(Number);
    let player2 = data[1].split('\r\n').slice(1).map(Number);

    let game = (player1 = [0], player2 = [0], calcScore = false) => {
        let history = new Set();
        while (player1.length > 0 && player2.length > 0) {
            let roundKey = `${player1}|${player2}`;
            if(history.has(roundKey)) break;
    
            history.add(roundKey);
            
            let card1 = player1.splice(0, 1)[0];
            let card2 = player2.splice(0, 1)[0];

            if (card1 <= player1.length && card2 <= player2.length) {
                let subPlayer1 = player1.slice(0, card1).map(x => x);
                let subPlayer2 = player2.slice(0, card2).map(x => x);
                let result = game(subPlayer1, subPlayer2);
                if (result.winner == 'p1') player1 = player1.concat([card1, card2]);
                else player2 = player2.concat([card2, card1]);   
            }
            else if (card1 > card2) player1 = player1.concat([card1, card2]);
            else if (card2 > card1) player2 = player2.concat([card2, card1]);
        }

        return player1.length > 0 ? 
            { winner: 'p1', score: calcScore ? player1.map((x, i) => x * (player1.length - i)).reduce((a,b) => a + b, 0) : 0 } : 
            { winner: 'p2', score: calcScore ? player2.map((x, i) => x * (player2.length - i)).reduce((a,b) => a + b, 0) : 0 };
    }

    let result = game(player1, player2, true);
    terminal.textContent = `Winner is ${result.winner} with ${result.score} points!`;
}