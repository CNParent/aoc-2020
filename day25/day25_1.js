scripts.day25_1 = async () => {
    const subject = 7;
    const card = 1614360;
    const door = 7734663;
    
    let getLoopSize = (val = 0) => {
        let s = 1;
        let size = 0
        while(s != val) {
            s = (s * subject) % 20201227;
            size++;
        }

        return size;
    };

    let transform = (val = 0, iterations = 0) => {
        let s = 1;
        while(iterations > 0) {
            s = (s * val) % 20201227;
            iterations--;
        }

        return s;
    }

    let cardLoop = getLoopSize(card);
    let doorLoop = getLoopSize(door);
    let encryptionKey = transform(card, doorLoop);

    terminal.textContent = `Card loop size: ${cardLoop}; Door loop size: ${doorLoop}; Encryption key is ${encryptionKey}`;
}