class TicketValidator {
    constructor(data = ['']) {
        this.rules = data[0].split('\r\n').map(x => {
            let [name, ranges] = x.split(':');
            let [lower, upper] = ranges.split(' or ').map(x => x.split('-').map(Number)).map(x => { return { min: x[0], max: x[1] }; });
            return { 
                name, 
                index: -1,
                valid: (value) => lower.min <= value && value <= lower.max || upper.min <= value && value <= upper.max
            }
        });

        this.ticket = data[1].split('\r\n')[1].split(',').map(Number);
        this.tickets = data[2].split('\r\n').slice(1).map(x => x.split(',').map(Number)).concat([this.ticket]);
    }

    assignIndices() {
        let options = this.rules.map(x => {
            let options = [];
            for(var i = 0; i < this.ticket.length; i++) {
                if(this.tickets.every(t => x.valid(t[i]))) {
                    options.push(i);
                }
            }
            return { options, rule: x };
        });

        options.sort((a,b) => a.options.length - b.options.length);
        while(options.length > 0) {
            let entry = options.splice(0, 1)[0];
            entry.rule.index = entry.options[0];
            options = options.map(x => {
                return {
                    rule: x.rule,
                    options: x.options.filter(y => y != entry.rule.index)
                }
            });
        }
    }

    discardInvalid() {
        this.tickets = this.tickets.filter(x => this.getErrors(x).length == 0);
    }

    errorRate() {
        let errors = this.tickets.map(x => this.getErrors(x));
        return errors.map(x => x.reduce((a,b) => a + b, 0)).reduce((a,b) => a + b, 0);
    }

    getErrors(ticket = [0]) {
        return ticket.filter(x => !this.rules.some(r => r.valid(x)));
    }
}