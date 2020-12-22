class Photo {
    constructor(tiles = [new Tile('')]) {
        this.tiles = tiles;
        this.canvas = {};
    }

    draw() {
        let x = { max: Math.max(...this.tiles.map(x => x.x)), min: Math.min(...this.tiles.map(x => x.x)) };
        let y = { max: Math.max(...this.tiles.map(x => x.y)), min: Math.min(...this.tiles.map(x => x.y)) };
        let h = this.tiles[0].height;
        let w = this.tiles[1].width;
        let rows = [];
        for(let j = y.min; j <= y.max; j++) {
            for(let k = 1; k < h - 1; k++) {
                let row = [];
                for(let i = x.min; i <= x.max; i++) {
                    let tile = this.canvas[`${i},${j}`];
                    row.push(tile.grid[k].slice(1, w - 1).reduce((a,b) => `${a}${b}`, ''));
                }

                rows.push(row.reduce((a,b) => `${a}${b}`, ''));
            }
        }

        return rows.reduce((a,b) => `${a}\r\n${b}`, '');
    }

    orient() {
        let next = this.tiles[0];
        next.oriented = true;

        do {
            next = this.tiles.find(x => !x.oriented && x.edges.some(y => y.other?.oriented));
            if (!next) return;
            next.orient();
        } while(true);
    }

    place() {
        let next = this.tiles[0];
        let point = { x: 0, y: 0 };
        next.x = point.x;
        next.y = point.y;
        next.placed = true;

        do {
            next = this.tiles.find(x => !x.placed && x.edges.some(y => y.other?.placed));
            if (!next) break;

            let otherIndex = next.edges.findIndex(x => x.other?.placed);
            let other = next.edges[otherIndex].other;
            point = { x: other.x, y: other.y };
            if (otherIndex == 0) point.y++;
            else if (otherIndex == 1) point.x--;
            else if (otherIndex == 2) point.y--;
            else if (otherIndex == 3) point.x++;

            next.x = point.x;
            next.y = point.y;
            next.placed = true;
        } while(true);

        this.tiles.forEach(x => this.canvas[`${x.x},${x.y}`] = x);
        this.canvas[`0,0`].orient();
    }
}