class Polynomial {
    constructor(members = []) {
        this.members = members;
        this.members.sort((a, b) => b.power - a.power);
    }

    toString() {
        return this.members.map(member => member.toString())
            .join(' + ').replace(/\+ -/g, '- ');
    }
}

export default Polynomial;