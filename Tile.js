const join = (a,b) => `${a}${b}`;

class Tile {
    constructor(data = ['']) {
        this.id = Number(data[0].match(/\d+/g)[0]);
        this.grid = data.slice(1).map(x => x.split(''));
        this.width = this.grid[0].length;
        this.height = this.grid.length;
        this.edges = [];
        this.orientation = 0;
        this.edges.push({ tile: this, value: this.grid[0].reduce(join)});
        this.edges.push({ tile: this, value: this.grid.map(x => x[this.width - 1]).reduce(join)});
        this.edges.push({ tile: this, value: this.grid[this.height - 1].reduce(join)});
        this.edges.push({ tile: this, value: this.grid.map(x => x[0]).reduce(join)});
        this.edges.forEach(x => this.edges.push({ tile: this, value: x.value.split('').reduceRight(join) }));
    }

    alignsWith(other = new Tile('')) {
        if (this == other) return false;
        
        return this.edges.filter(x => other.edges.some(y => y.value == x.value)).length;
    }

    matchCount(others = [new Tile('')]) {
        return others.filter(x => this.alignsWith(x)).length;
    }
}