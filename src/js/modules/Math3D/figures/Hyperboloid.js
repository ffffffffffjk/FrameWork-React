import Figure from '../entities/Figure.js';
import Point from '../entities/Point.js';
import Polygon from '../entities/Polygon.js';
import Edge from '../entities/Edge.js';

class Hyperboloid extends Figure {
    constructor(a = 7, b = 7, c = 10, count = 20) {
        super();

        const dU = 2 / count;
        const dV = (2 * Math.PI) / count;

        for (let u = -1; u <= 1; u += dU) {
            for (let v = 0; v < 2 * Math.PI; v += dV) {
                this.points.push(new Point(
                    a * Math.cosh(u) * Math.cos(v),
                    b * Math.cosh(u) * Math.sin(v),
                    c * Math.sinh(u)
                ));
            }
        }

        for (let i = 0; i < this.points.length; i++) {
            let next = (i + 1) % count + Math.floor(i / count) * count;
            if (next < this.points.length) this.edges.push(new Edge(i, next));

            let up = i + count;
            
            if (up < this.points.length) this.edges.push(new Edge(i, up));
        }

        for (let i = 0; i < this.points.length - count; i++) {
            let next = (i + 1) % count + Math.floor(i / count) * count;
            if (next < this.points.length - count) {
                this.polygons.push(new Polygon([i, next, next + count, i + count]));
            }
        }
    }
}

export default Hyperboloid;