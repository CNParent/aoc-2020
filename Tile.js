const join = (a,b) => `${a}${b}`;

class Tile {
    constructor(data = ['']) {
        this.id = Number(data[0].match(/\d+/g)[0]);
        this.grid = data.slice(1).map(x => x.split(''));
        this.width = this.grid[0].length;
        this.height = this.grid.length;
        this.edges = [];
        this.oriented = false;
        this.placed = false;
        this.edges.push({ other: null, value: this.grid[0].reduce(join) });
        this.edges.push({ other: null, value: this.grid.map(x => x[this.width - 1]).reduce(join) });
        this.edges.push({ other: null, value: this.grid[this.height - 1].reduceRight(join) });
        this.edges.push({ other: null, value: this.grid.map(x => x[0]).reduceRight(join) });
    }

    alignsWith(other = new Tile('')) {
        if (this == other) return false;
        
        return this.edges.filter(x => {
            let forward = x.value;
            let reverse = x.value.split('').reduceRight(join);

            let otherEdge = other.edges.find(y => y.value == forward || y.value == reverse);
            if (otherEdge == null) return false;

            x.other = other;
            otherEdge.other = this;

            return true;
        }).length;
    }

    matchCount(others = [new Tile('')]) {
        return others.filter(x => this.alignsWith(x)).length;
    }

    orient() {
        let edgeIndex = this.edges.findIndex(x => x.other?.oriented);
        let edge = this.edges[edgeIndex];
        let other = edge.other;
        let reverse = edge.value.split('').reduceRight(join);
        let otherEdgeIndex = other.edges.findIndex(x => x.value == edge.value || reverse == x.value);
        let otherEdge = other.edges[otherEdgeIndex];

        if (edge.value == otherEdge.value) this.flip();

        edgeIndex = this.edges.indexOf(edge);
        while (otherEdgeIndex != (edgeIndex + 2) % 4) {
            this.rotate();
            edgeIndex = this.edges.indexOf(edge);
        }

        this.oriented = true;
    }

    flip() {
        this.grid.reverse()

        let tempEdges = [];
        tempEdges.push(this.edges[2]);
        tempEdges.push(this.edges[1]);
        tempEdges.push(this.edges[0]);
        tempEdges.push(this.edges[3]);
        tempEdges.forEach(x => x.value = x.value.split('').reduceRight(join));

        this.edges = tempEdges;
    }

    rotate() {
        let tempGrid = [];
        for(let i = this.width - 1; i >= 0; i--) {
            let row = [];
            for(let j = 0; j < this.height; j++) {
                row.push(this.grid[j][i]);
            }
            
            tempGrid.push(row);
        }

        this.grid = tempGrid;

        let tempEdges = [];
        tempEdges.push(this.edges[1]);
        tempEdges.push(this.edges[2]);
        tempEdges.push(this.edges[3]);
        tempEdges.push(this.edges[0]);

        this.edges = tempEdges;
    }

    draw() {
        return this.grid.map(x => x.reduce((a,b))).reduce((a,b) => ``)
    }
}