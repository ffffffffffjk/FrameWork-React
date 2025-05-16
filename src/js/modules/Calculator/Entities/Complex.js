class Complex {
    constructor(re = 0, im = 0){
        this.re = re;
        this.im = im;
    }
    
    toString() {
        if (this.re === 0 && this.im === 0) return '0';
        if (this.im === 0) return `${this.re}`;
        if (this.re === 0) return this.im === 1 ? `i` : this.im === -1 ? `-i` : `${this.im > 0 ? 'i' : '-i'}${Math.abs(this.im)}`;
        const imPart = this.im === 1 ? `+ i` : this.im === -1 ? `- i` : this.im > 0 ? `+ i${this.im}` : `- i${Math.abs(this.im)}`;
        return `${this.re} ${imPart}`;
    }
}

export default Complex;