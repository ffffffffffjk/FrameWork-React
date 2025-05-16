import Complex from "../Entities/Complex.js"
class ComplexCalculator {
	add(a, b){
		return new Complex(a.re + b.re, a.im + b.im);
	}

	sub(a, b){
		return new Complex(a.re - b.re, a.im - b.im);
	}

	mult(a, b){
		return new Complex(a.re * b.re - a.im * b.im, a.re * b.im + a.im * b.re);
	}

	div(a, b) {
        const degree = b.re * b.re + b.im * b.im;
        return new Complex((a.re * b.re + a.im * b.im) / degree,(a.im * b.re - a.re * b.im) / degree);
    }

	prod(a, p){
		return new Complex(a.re * p, a.im * p);
	}

	pow(a, p){
		let c = this.one();
		for(let i = 0; i < p; i++){
			c = this.mult(a,c);
		}
		return c;
	}

	one(){
		return new Complex(1);
	}
	
	zero(){
		return new Complex();
	}
	
}

export default ComplexCalculator;