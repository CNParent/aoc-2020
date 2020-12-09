class Solver {
    constructor(data) {
        this.data = data;
    }

    compose(sum = 1, parts = 1) {
        if(parts == 1) {
            let index = this.data.findIndex((x) => x == sum);
            if(index == -1) return [];
            return [{ index: index, value: this.data[index] }];
        }

        for(let i in this.data) {
            let val = this.data[i];
            let remainder = sum - val;
            let results = this.compose(remainder, parts - 1);
            if (results.length == 0) continue;

            results.push({ index: i, value: val });
            return results;
        }

        return [];
    }

    continuousCompose(sum = 1, size = 2) {
        for(let i = size; i < this.data.length; i++) {
            let subset = this.data.slice(i - size, i);
            let value = subset.reduce((a,b) => a + b, 0);
            if (value == sum) return { smallest: Math.min(...subset), largest: Math.max(...subset)};
        }

        return this.continuousCompose(sum, size + 1);
    }

    findIncomposable(size = 2) {
        for(let i = size; i < this.data.length; i++) {
            let solver = new Solver(this.data.slice(i - size, i));
            if(solver.compose(this.data[i], 2).length == 0) 
                return { index: i, value: this.data[i] };
        }
    }
}