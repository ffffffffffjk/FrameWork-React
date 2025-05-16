import RealCalculator from "../Calculators/RealCalculator.js"
import Vector from "../Entities/Vector.js"
class VectorCalculator extends RealCalculator {
    constructor(calc) {
        super();
        this.calc = calc;
    }

    div(){
        return null;
    }

    add(a,b){
        return new Vector(a.values.map((elem, index) => this.calc.add(elem, b.values[index])));
    }

    sub(a, b) {
        return new Vector(a.values.map((elem, index) => this.calc.sub(elem, b.values[index])));
    }
    
    mult(a, b) {
        return new Vector([
            this.calc.sub(
                this.calc.mult(a.values[1], b.values[2]),
                this.calc.mult(a.values[2], b.values[1])),
            this.calc.sub(
                this.calc.mult(a.values[2], b.values[0]),
                this.calc.mult(a.values[0], b.values[2])),
            this.calc.sub(
                this.calc.mult(a.values[0], b.values[1]),
                this.calc.mult(a.values[1], b.values[0]))]);
    }
    

    zero(lenght = 0){
        const values = [];
        for (let i=0; i<lenght; i++){
            values.push(this.calc.zero());
        }
            return new Vector(values);
        }

    one(lenght = 0){
        if(lenght === 0) return new Vector([]);
        const values = [this.calc.one()];
        for (let i = 1; i < lenght; i++){
            values.push(this.calc.zero());
        }
            return new Vector(values);
        }

    pow(a,b){
        return new Vector(a.values.map(elem => this.calc.pow(elem, b)));
    }

    prod(a,b){
        return new Vector(a.values.map(elem => this.calc.prod(elem, b)));
    }
}

export default VectorCalculator;