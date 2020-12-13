class Waypoint {
    constructor(data = [''], pos = { x: 0, y: 0 }, waypoint = { x: 0, y: 0 }) {
        this.queue = data;
        this.pos = pos;
        this.waypoint = waypoint;
    }

    forward(val = 1) {
        this.pos.x += this.waypoint.x * val;
        this.pos.y += this.waypoint.y * val;
    }

    step() {
        let next = this.queue.splice(0, 1)[0];
        let cmd = next[0];
        let val = Number(next.substring(1));
        if (cmd == 'N') this.waypoint.y += val;
        else if (cmd == 'S') this.waypoint.y -= val;
        else if (cmd == 'E') this.waypoint.x += val;
        else if (cmd == 'W') this.waypoint.x -= val;
        else if (cmd == 'R') this.turn(val);
        else if (cmd == 'L') this.turn(-val);
        else if (cmd == 'F') this.forward(val);
    }

    travel() {
        while(this.queue.length > 0) 
            this.step();
    }

    turn(val = 0) {
        val %= 360;
        while(val < 0) val += 360;

        if (val == 90) this.waypoint = { x: this.waypoint.y, y: -this.waypoint.x };
        else if (val == 180) this.waypoint = { x: -this.waypoint.x, y: -this.waypoint.y };
        else if (val == 270) this.waypoint = { x: -this.waypoint.y, y: this.waypoint.x };
    }
}