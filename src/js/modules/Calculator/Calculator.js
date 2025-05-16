import Complex from "./Entities/Complex.js"
import Vector from "./Entities/Vector.js"
import Matrix from "./Entities/Matrix.js"
import Polynomial from "./Entities/Polynomial.js";
import Member from "./Entities/Member.js"
import MatrixCalculator from "./Calculators/MatrixCalculator.js"
import ComplexCalculator from './Calculators/ComplexCalculator.js';
import PolynomialCalculator from "./Calculators/PolynomialCalculator.js"
import VectorCalculator from "./Calculators/VectorCalculator.js"
import RealCalculator from "./Calculators/RealCalculator.js"

class Calculator {
    complex(re, im){
        return new Complex(re, im);
    }

    vector(values){
        return new Vector(values);
    }

    matrix(values){
        return new Matrix(values);
    }

    getEntity(str) {
        str = str.replace(/\s/g, '');
        if (str.includes('[')) return this.getMatrix(str);
        if (str.includes('(')) return this.getVector(str);
        if (str.includes('^')) return this.getPolynomial(str);
        if (str.includes('i') || /^[\d.+-]+$/.test(str)) return this.getComplex(str);
    }
    
    getMatrix(str){
        const arr = str.slice(1, -1).split('|').map(elems =>
            elems.split(';').map(elem => this.getEntity(elem)));
            return this.matrix(arr);
    }

    getVector(str){
        const arr = str.slice(1, -1).split(',').map(elem =>
            this.getEntity(elem));
        return this.vector(arr);
    }

    getComplex(str) {
        const regex = /^(-?\d+(\.\d+)?)([+-]i(\d+(\.\d+)?)?)?$/;
        const match = str.match(regex);
        const re = parseFloat(match[1]) || 0;
        let im = 0;
        if (match[3]) {
            const imPart = match[4];
            im = imPart === undefined ? 1 : parseFloat(imPart);
            if (match[3][0] === '-') im *= -1;
        }
        return this.complex(re, im);
    }

    get(elem) {
        if (elem instanceof Matrix) {
            return new MatrixCalculator(this.get(elem.values[0][0]));
        }
        if (elem instanceof Vector) {
            return new VectorCalculator(this.get(elem.values[0]));
        }
        if (elem instanceof Complex) {
            return new ComplexCalculator();
        }
        if (elem instanceof Polynomial) {
            return new PolynomialCalculator();
        }
        return new RealCalculator();
    }

    add(a, b) {
        return this.get(a).add(a, b);
    }

    sub(a, b) {
        return this.get(a).sub(a, b);
    }

    mult(a, b) {
        return this.get(a).mult(a, b);
    }

    div(a, b) {
        return this.get(a).div(a, b);
    }

    pow(a, b){
        return this.get(a).pow(a, b);
    }

    prod(a, b){
		return this.get(a).prod(a, b);
	}

    getValue(a, b){
        return this.get(a).getValue(a, b);
    }

    zero(elem){
        if (elem instanceof Matrix)
            return this.get(elem).zero(elem.values.length);
        if (elem instanceof Vector)
            return this.get(elem).zero(elem.values.length);
        return this.get().zero();
    }

    one(elem){
        if (elem instanceof Matrix)
            return this.get(elem).one(elem.values.length);
        if (elem instanceof Vector)
            return this.get(elem).one(elem.values.length);
        return this.get().one();
    }

    getPolynomial(str){
        const arr = str.split(/(?=[-+])/).filter(elem => elem !== '');
        return new Polynomial(arr.map(elem => 
            this.getMember(elem)));
    }

    getMember(str) {
        const match = str.match(/(-?\d*)x(?:\^(\d+))?/);
        if (!match) {
            return new Member(parseFloat(str), 0);
        }
        const value = parseFloat(match[1]) || (match[1] === '-' ? -1 : 1);
        const power = parseInt(match[2]) || (match[0].includes('x') ? 1 : 0);
        return new Member(value, power);
    }
}

export default Calculator;