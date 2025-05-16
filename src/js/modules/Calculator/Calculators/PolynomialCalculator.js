import Complex from "../Entities/Complex.js"
import Vector from "../Entities/Vector.js"
import Matrix from "../Entities/Matrix.js"
import Polynomial from "../Entities/Polynomial.js"
import Member from "../Entities/Member.js"
import Calculator from '../Calculator.js';

class PolynomialCalculator {
    add(a, b) {
        const membersMap = new Map();

        a.members.forEach(elemA => {
            if (membersMap.has(elemA.power)) {
                membersMap.set(elemA.power, membersMap.get(elemA.power) + elemA.value);
            } else {
               membersMap.set(elemA.power, elemA.value);
            }
        });

        b.members.forEach(elemB => {
           if (membersMap.has(elemB.power)) {
                membersMap.set(elemB.power, membersMap.get(elemB.power) + elemB.value);
            } else {
                membersMap.set(elemB.power, elemB.value);
            }
        });

        const members = Array.from(membersMap).map(([power, value]) => new Member(value, power));
        members.sort((a, b) => b.power - a.power);

        return new Polynomial(members);
    }
    
    getValue(a, x) {
        const calc = new Calculator();
        if (!a.members.length) {
            return calc.zero(x);
        }        if (x instanceof Matrix) {
            const result = [];
            for (let i = 0; i < x.values.length; i++) {
                const row = [];
                for (let j = 0; j < x.values[i].length; j++) {
                    row.push(this.getValue(a, x.values[i][j]));
                }
                result.push(row);
            }
            return new Matrix(result);
        }

        if (x instanceof Vector) {
            const result = [];
            for(let i = 0; i < x.values.length; i++){
                result.push(this.getValue(a, x.values[i]));
            }
            return new Vector(result);
        }

        if (x instanceof Complex) {
            const sortMembers = [...a.members].sort((a, b) => b.power - a.power);
            let result = new Complex(0, 0);
            for (let i = 0; i < sortMembers.length; i++) {
                const power = calc.pow(x, sortMembers[i].power);
                const term = calc.prod(power, sortMembers[i].value);
                result = calc.add(result, term);
            }
            if (result.re === 0) {
                if (result.im === 1) return calc.complex(0, 1);
                if (result.im === -1) return calc.complex(0, -1);
                if (result.im === 0) return calc.complex(0, 0);
                return calc.complex(0, result.im);
            }
            if (result.im === 0) return calc.complex(result.re, 0);
            if (result.im === 1) return calc.complex(result.re, 1);
            if (result.im === -1) return calc.complex(result.re, -1);
            return result;
        }

        const sortMembers = [...a.members].sort((a, b) => b.power - a.power);
        let result = calc.zero(x);
        for (let i = 0; i < sortMembers.length; i++) {
            const power = calc.pow(x, sortMembers[i].power);
            const term = calc.prod(sortMembers[i].value, power);
            result = calc.add(result, term);
        }
        return result;
    }
    
    sub(a, b) {
        const negativeB = new Polynomial(b.members.map(elem => new Member(-elem.value, elem.power)));
        return this.add(a, negativeB);
    }

    mult(a, b) {
        let polynomial = new Polynomial();
        a.members.forEach(elemA => {
            const members = [];
            b.members.forEach(elemB => {
                members.push(new Member(elemA.value * elemB.value,
                elemA.power + elemB.power));
            });
            polynomial = this.add(polynomial, new Polynomial(members));
        });
        return polynomial;
    }

    prod(a, scalar) {
        return new Polynomial(a.members.map(member => new Member(member.value * scalar, member.power)));
    }

    one() {
        return new Polynomial([new Member(1, 0)]);
    }

    zero() {
        return new Polynomial();
    }

}

export default PolynomialCalculator;