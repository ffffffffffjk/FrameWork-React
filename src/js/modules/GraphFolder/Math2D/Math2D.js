class Math2D {
            getZero (f, a, b, eps = 0.001) {
                if (Math.abs(f(a)) < eps) return a;
                if (Math.abs(f(b)) < eps) return b;
    
                if (f(a) * f(b) > 0) return null;
            
                if (Math.abs(b - a) <= eps) return (a + b) / 2;
            
                const half = (a + b) / 2;
            
                if (f(a) * f(half) <= 0) return this.getZero(f, a, half, eps);
                if (f(half) * f(b) <= 0) return this.getZero(f, half, b, eps);
            
                return null;
            }
            
            getDerivative (f, x0) {
                var dx = 0.00001;
                return (f(x0 + dx) - f(x0)) / dx;
            }
            
            getIntegral (f, a, b) {
                var dx = (b - a) / 1000;
                var x = a;
                var s = 0;
                while (x <= b){
                    s += Math.abs(f(x)) + Math.abs(f(x + dx)) / 2 * dx;
                    x += dx;
                }
                return s;
            }
}

export default Math2D;