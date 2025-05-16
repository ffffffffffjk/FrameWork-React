import Figure from '../entities/Figure.js';
import Point from '../entities/Point.js';
import Polygon from '../entities/Polygon.js';
import Edge from '../entities/Edge.js';

class BicavidHyperboloid extends Figure {
    constructor(a = 7, b = 7, c = 10, countVU = 10, countV = 20) {
        super();
        const dU = 2 / countVU; 
        const dV = (2 * Math.PI) / countV;

        for (let u = -dU; u <= 2; u += dU) { 
            for (let v = 0; v < 2 * Math.PI; v += dV) {
                this.points.push(new Point(
                    a * Math.sinh(u) * Math.cos(v),
                    b * Math.sinh(u) * Math.sin(v),
                    0.7 * c * Math.cosh(u) + 4
                ));
            }
        }

        this.edges.push(new Edge(this.points.length - 1, this.points.length - countV));

        for (let i = 0; i < this.points.length; i++){
            if (i + 1 < this.points.length && (i + 1) % countV !== 0){
                this.edges.push(new Edge(i, i + 1));
            }

            if (i + countV < this.points.length && (i) % countV === 0){
                this.edges.push(new Edge(i, i + countV - 1));
            }

            if (i + countV < this.points.length) {
                this.edges.push(new Edge(i, i + countV));
            }
        }

        for (let i = 0; i < this.points.length; i++){
            if (i + countV + 1 < this.points.length && (i + 1) % countV !== 0){
                this.polygons.push(new Polygon([i, i + 1, i + countV + 1, i + countV]));
            } else if (i + countV < this.points.length){
                this.polygons.push(new Polygon([i, i - countV + 1, i + 1, i + countV]));
            }
        }
    

        for (let u = -dU; u <= 2; u += dU) { 
            for (let v = 0; v < 2 * Math.PI; v += dV) {
                this.points.push(new Point(
                    -a * Math.sinh(u) * Math.cos(v),
                    -b * Math.sinh(u) * Math.sin(v),
                    -0.7 * c * Math.cosh(u) - 4
                ));
            }
        }


        this.edges.push(new Edge(this.points.length - 1, this.points.length - countV));

        for (let i = 0; i < this.points.length; i++){
            if (i + 1 < this.points.length  && (i + 1) % countV !== 0 &&
                i >= this.points.length/2){
                this.edges.push(new Edge(i, i + 1));
            }

            if (i + countV < this.points.length && (i) % countV === 0 &&
                i >= this.points.length/2){
                this.edges.push(new Edge(i, i + countV - 1));
            }

            if (i + countV < this.points.length &&
                i >= this.points.length/2) {
                this.edges.push(new Edge(i, i + countV));
            }
        }

        for (let i = this.points.length/2; i < this.points.length - countV; i++) {
            if ((i + 1) % countV !== 0) {
                this.polygons.push(new Polygon([i, i + 1, i + countV + 1, i + countV]));
            } else {
                this.polygons.push(new Polygon([i, i - countV + 1, i + 1, i + countV]));
            }
        }
    }
}

export default BicavidHyperboloid;