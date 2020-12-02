class PasswordValidator {
    constructor(data) {
        this.min = Number(data.split(' ')[0].split('-')[0]);
        this.max = Number(data.split(' ')[0].split('-')[1]);
        this.letter = data.split(' ')[1].split(':')[0];
        this.password = data.split(' ')[2];
    }

    isValid() {
        let n = this.password.split('').filter(x => x == this.letter).length;
        return n <= this.max && n >= this.min;
    }

    isValidPositional() {
        return (this.password.substr(this.min - 1, 1) == this.letter) ^ (this.password.substr(this.max - 1, 1) == this.letter)
    }
}