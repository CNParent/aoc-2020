class Solver {
    constructor(data) {
        this.data = data;
    }

    Compose(sum, parts) {
        if(parts == 1) {
            let index = this.data.findIndex((x) => x == sum);
            if(index == -1) return [];
            return [{ index: index, value: this.data[index] }];
        }

        for(let i in this.data) {
            let val = this.data[i];
            let remainder = sum - val;
            let results = this.Compose(remainder, parts - 1);
            if (results.length == 0) continue;

            results.push({ index: i, value: val });
            return results;
        }

        return [];
    }
}