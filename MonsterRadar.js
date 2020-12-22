class MonsterRadar {
    constructor(data = '') {
        this.data = data;
        this.grid = data.split('\r\n');
        this.hi = /..................[#|O]./;
        this.mi = /(?=([#|O]....[#|O][#|O]....[#|O][#|O]....[#|O][#|O][#|O]))/g;
        this.lo = /.[#|O]..[#|O]..[#|O]..[#|O]..[#|O]..[#|O].../;

        this.hii = [18];
        this.mii = [0,5,6,11,12,17,18,19];
        this.loi = [1,4,7,10,13,16];
        this.length = 20;
    }

    flip() {
        this.grid.reverse();
        this.data = this.grid.reduce((a,b) => `${a}\r\n${b}`, '');
    }

    monsters() {
        let monsters = 0;
        for(let i = 1; i < this.grid.length - 1; i++) { 
            let match;
            while ((match = this.mi.exec(this.grid[i])) != null) {
                this.mi.lastIndex++;
                let above = this.grid[i - 1].substr(match.index, this.length);
                let below = this.grid[i + 1].substr(match.index, this.length);
                if (!this.hi.test(above)) continue;
                if (!this.lo.test(below)) continue;

                this.hii.forEach(x => this.grid[i - 1] = this.grid[i - 1].replaceAt(match.index + x, 'O'));
                this.mii.forEach(x => this.grid[i] = this.grid[i].replaceAt(match.index + x, 'O'));
                this.loi.forEach(x => this.grid[i + 1] = this.grid[i + 1].replaceAt(match.index + x, 'O'));
                monsters++;
            }
        }

        if (monsters > 0)
            this.data = this.grid.reduce((a,b) => `${a}\r\n${b}`, '');

        return monsters;
    }

    rotate() {
        let temp = this.data.split('\r\n').map(x => x.split('')).filter(x => x.length > 0);
        let tempGrid = [];
        for(let i = temp[0].length - 1; i >= 0; i--) {
            let row = [];
            for(let j = 0; j < temp.length; j++) {
                row.push(temp[j][i]);
            }
            
            tempGrid.push(row);
        }

        this.grid = tempGrid.map(x => x.reduce((a,b) => `${a}${b}`, ''));
        this.data = this.grid.reduce((a,b) => `${a}\r\n${b}`, '');
    }

    choppy() {
        return this.data.split('').filter(x => x == '#').length;
    }
}