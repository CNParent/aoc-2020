class BagRule {

    constructor(data = ['']) {
        this.name = `${data[0]} ${data[1]}`;
        this.bags = [];
        for(let i = 4; i < data.length; i += 4) {
            this.bags.push({
                name: `${data[i+1]} ${data[i+2]}`,
                count: Number(data[i])
            });
        }
    }
}