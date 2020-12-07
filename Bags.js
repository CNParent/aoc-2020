class Bags {
    constructor(data = '') {
        this.rules = data.split('\r\n').map(x => new BagRule(x.split(' ')));
    }
}