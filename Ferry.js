class Ferry {
    constructor(data = ['']) {
        this.queue = data;
        this.facing = 1;
        this.pos = { x: 0, y : 0 };
    }

    forward(val = 1) {
        if (this.facing == 0) this.pos.y += val;
        else if (this.facing == 1) this.pos.x += val;
        else if (this.facing == 2) this.pos.y -= val;
        else if (this.facing == 3) this.pos.x -= val;
    }

    step() {
        let next = this.queue.splice(0, 1)[0];
        let cmd = next[0];
        let val = Number(next.substring(1));
        if (cmd == 'N') this.pos.y += val;
        else if (cmd == 'S') this.pos.y -= val;
        else if (cmd == 'E') this.pos.x += val;
        else if (cmd == 'W') this.pos.x -= val;
        else if (cmd == 'R') this.turn(val);
        else if (cmd == 'L') this.turn(-val);
        else if (cmd == 'F') this.forward(val);
    }

    travel() {
        while(this.queue.length > 0) 
            this.step();
    }

    turn(val = 0) {
        this.facing += (val / 90);
        while (this.facing < 0) this.facing += 4;
        while (this.facing > 3) this.facing -= 4;
    }
}