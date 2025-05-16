import RealCalculator from "../Calculators/RealCalculator.js";
import Matrix from "../Entities/Matrix.js"

class MatrixCalculator extends RealCalculator{
    constructor(calc) {
        super();
        this.calc = calc;
    }

    add(a, b) {
        return new Matrix(a.values.map((row, i) =>
                row.map((elem, j) => this.calc.add(elem, b.values[i][j]))));
    }

    sub(a, b) {
        return new Matrix(a.values.map((row, i) =>
                row.map((elem, j) => this.calc.sub(elem, b.values[i][j]))));
    }

    mult(a, b) {
        const rows = a.values.length;
        const common = a.values[0].length;
        const values = Array.from({ length: rows }, (_, i) =>
            Array.from({ length: rows }, (_, j) =>
                Array.from({ length: common }, (_, k) =>
                    this.calc.mult(a.values[i][k], b.values[k][j]))
                .reduce((sum, value) =>
                    this.calc.add(sum, value), this.calc.zero(a.values.length))));
        return new Matrix(values);
    }

    pow(a, b) {
        let c = this.one(a.values.length);
        let i = 2;
        let matrix = a;
        if (b == 0){
            console.log(c);
            return c;
        }
        if (i <= b) {
            while(i <= b) {
                a = c;
                i++;
            }
            return c;
        } else return matrix;
    }

    one(rows) {
        const values = Array.from({ length: rows }, (_, i) =>
            Array.from({ length: rows }, (_, j) => 
                i === j ? this.calc.one(rows) : this.calc.zero(rows)));
        return new Matrix(values);
    }

    zero(rows) {
        const values = Array.from({ length: rows }, () =>
            Array.from({ length: rows }, () => this.calc.zero(rows)));
        return new Matrix(values);
    }
}

export default MatrixCalculator;