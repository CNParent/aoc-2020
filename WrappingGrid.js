class WrappingGrid {
    constructor(data = [['']]) {
        this.data = data;
        this.height = data.length;
        this.width = data[0].length;
    }

    getCollisions(vector = { dx: 1, dy: 1 }, start = { x: 0, y: 0 }) {
        return this.getPoints(vector, start).filter(x => x.value == '#').length;
    }

    getPoints(vector = { dx: 1, dy: 1 }, start = { x: 0, y: 0 }) {
        let points = [];
        let i = start.x;
        let j = start.y;
        while(j < this.height && j >= 0) {
            points.push({ x: i, y: j, value: this.data[j][i] });
            i += vector.dx;
            j += vector.dy;

            while(i < 0) i += this.width;
            
            i = i % this.width;
        }

        return points
    }
}