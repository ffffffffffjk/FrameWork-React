class Member {
    constructor(value = 0, power = 0) {
        this.value = value;
        this.power = power;
    }

    toString() {
        if (this.power === 0) {
            return `${this.value}`;
        }
        if (this.power === 1) {
            return (this.value === 1) ? 'x' : this.value === -1 ? '-x' : `${this.value}x`;
        }
        return this.value === 1 ? `x^${this.power}` : this.value === -1 ? `-x^${this.power}` : `${this.value}x^${this.power}`;
    }
}

export default Member;