const validEyeColors = ['amb', 'blu', 'brn', 'gry', 'grn', 'hzl', 'oth'];

class Passport {
    constructor(data = '') {
        let pairs = data.split(/\r\n| /).map(x => x.split(':'));
        for(var i in pairs) {
            this[pairs[i][0]] = pairs[i][1];
        }
    }

    isComplete() {
        return this.ecl && this.pid && this.eyr && this.hcl 
            && this.byr && this.iyr && this.hgt
    }

    isValid() {
        return this.isComplete()
            && Number(this.byr) >= 1920 && Number(this.byr) <= 2002
            && Number(this.iyr) >= 2010 && Number(this.iyr) <= 2020
            && Number(this.eyr) >= 2020 && Number(this.eyr) <= 2030
            && this.validHeight()
            && this.validHair()
            && validEyeColors.indexOf(this.ecl) > -1
            && this.pid.match(/[0-9]{9}/) && this.pid.length == 9;
    }

    validHair() {
        return this.hcl.length == 7
            && this.hcl[0] == '#'
            && this.hcl.substring(1).match(/[0-9|a-f]{6}/);
    }

    validHeight() {
        let units = this.hgt.replace(/[0-9]/g, '');
        if (!units) return false;

        let magnitude = Number(this.hgt.replace(/[^0-9]/g, ''));
        if (units == 'cm') return magnitude >= 150 && magnitude <= 193;
        if (units == 'in') return magnitude >= 59 && magnitude <= 76;

        return false;
    }
}