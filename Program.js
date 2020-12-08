class Program {
    constructor(data = ['']) {
        this.instructions = data.map(x => x.split(' ')).map(x => { return { code: x[0], value: Number(x[1]) }; });
        this.reset();
    }

    reset() {
        this.accumulator = 0;
        this.next = 0;
        this.history = [];
        this.op = this.instructions[0];
    }

    run() {
        while (this.step());
    }

    step() {
        this.op = this.instructions[this.next];
        if(!this.op || this.history.includes(this.op)) return false;

        this.history.push(this.op);

        if (this.op.code == 'acc') {
            this.accumulator += this.op.value;
        } else if (this.op.code == 'jmp') {
            this.next += this.op.value;
            return true;
        } 

        this.next++;
        return true;
    }
}