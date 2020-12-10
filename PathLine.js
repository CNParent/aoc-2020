class PathLine {
    constructor(data = [0]) {
        this.data = data;
    }

    candidates(from = 0, threshold = 3) {
        return this.data.filter(x => x > from && x <= from + threshold);
    }

    complexity(from = 0, threshold = 3) {
        if(!from) from = this.data[0];

        let candidates = this.candidates(from, threshold);
        if (candidates.length == 0) return 1;

        return candidates.map(x => this.complexity(x, threshold)).reduce((a,b) => a + b, 0);
    }

    segments(threshold = 3) {
        let segments = [];
        let start = 0;
        for(let i = 1; i < this.data.length; i++) {
            if(this.data[i] - this.data[i - 1] != threshold) continue;

            segments.push(new PathLine(this.data.slice(start, i)));
            start = i;
        }

        return segments;
    }
}