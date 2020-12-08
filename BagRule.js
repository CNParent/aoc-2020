class BagRule {
    constructor(data = ['']) {
        this.name = `${data[0]} ${data[1]}`;
        this.bags = [];
        if(data[4] == 'no') return;

        for(let i = 4; i < data.length; i += 4) {
            this.bags.push({
                name: `${data[i+1]} ${data[i+2]}`,
                count: Number(data[i])
            });
        }
    }

    contents() {
        if(this.bags.length == 0) return 1;
        return this.bags.map(x => x.rule.contents() * x.count).reduce((a,b) => a + b , 0) + 1;
    }

    link(allrules = [new BagRule()]) {
        this.bags.forEach(x => x.rule = allrules.find(y => y.name == x.name));
    }
}