class Memory {
    constructor() {
        this.data = {};
    }

    get(i = 0) {
        return this.data[i];
    }

    set(i = '0', val = 0) {
        while (this.data.length <= i)
            this.data.push(0);

        this.data[i] = val;
    }

    setFloating(address = '0', val = 0) {
        if (address.includes('X')) {
            this.setFloating(address.replace('X', '0'), val);
            this.setFloating(address.replace('X', '1'), val);
        } else {
            this.set(address, val);
        }
    }

    sum() {
        let sum = 0;
        for(let prop in this.data) 
            sum += this.data[prop];
            
        return sum;
    }
}