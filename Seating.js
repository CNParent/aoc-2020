class Seating {
    constructor(data = [['']], tolerance = 4, mode = 'adjacency') {
        this.data = data;
        this.width = data[0].length;
        this.height = data.length;
        this.tolerance = tolerance;
        this.mode = mode;
    }

    adjacency(x = 0, y = 0) {
        let count = 0;
        for(let i = x - 1; i <= x + 1; i++) {
            for(let j = y - 1; j <= y + 1; j++) {
                if (!this.data[j] || !this.data[j][i] || i == x && j == y) continue;
                else if (this.data[j][i] == '#') count ++;
            }
        }

        return count;
    }

    look(from = { x: 0, y: 0}, vector = { dx: 1, dy: 1 }) {
        while(true) {
            from.x += vector.dx;
            from.y += vector.dy;
            if (!this.data[from.y] || !this.data[from.y][from.x]) return '.';

            let point = this.data[from.y][from.x];
            if (point != '.') return point;
        }
    }

    occupied() {
        return this.data
            .map(x => x.map(y => y == '#' ? 1 : 0).reduce((a,b) => a + b, 0))
            .reduce((a,b) => a + b, 0)
    }

    occupiedVisible(x = 0, y = 0) {
        let count = 0;
        for(let i = x - 1; i <= x + 1; i++) {
            for(let j = y - 1; j <= y + 1; j++) {
                if (!this.data[j] || !this.data[j][i] || i == x && j == y) continue;
                else if (this.look({ x, y }, { dx: i - x, dy: j - y }) == '#') count++;
            }
        }

        return count;
    }

    round() {
        let next = [...new Array(this.height)].map(x => [...new Array(this.width)].map(y => ''));
        for(let i = 0; i < this.width; i++) {
            for(let j = 0; j < this.height; j++) {
                let point = this.data[j][i];
                if (point == '.') {
                    next[j][i] = '.';
                    continue;
                }
                
                let adjacency = 0
                if (this.mode == 'adjacency') adjacency = this.adjacency(i, j);
                else if (this.mode == 'visible') adjacency = this.occupiedVisible(i, j);
                
                if (adjacency == 0) next[j][i] = '#';
                else if (adjacency >= this.tolerance) next[j][i] = 'L';
                else next[j][i] = point;
            }
        }

        this.data = next;
    }

    stabilize() {
        let previous = this.occupied();
        let current = 0;
        let iterations = 1000000;
        while(iterations > 0) {
            this.round();
            console.log(this.data);
            current = this.occupied();
            if (current == previous) return current;

            previous = current;
            iterations--;
        }
    }
}