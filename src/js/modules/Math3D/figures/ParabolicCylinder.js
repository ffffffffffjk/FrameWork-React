import Figure from '../entities/Figure.js';
import Point from '../entities/Point.js';
import Polygon from '../entities/Polygon.js';
import Edge from '../entities/Edge.js';

class ParabolicCylinder extends Figure {
    constructor(a = 5, b = 10, count = 20) {
        super();
        
        const du = (2 * a) / count; 
        const dv = (2 * b) / count;

        for (let u = -a; u <= a; u += du) {
            for (let v = -b; v <= b; v += dv) {
                this.points.push(new Point(
                    u * 2.5,
                    v,
                    u ** 2
                ));
            }
        }

        const pointsPerLayer = count + 1;

        for (let i = 0; i < this.points.length; i++) {
            if (i % pointsPerLayer !== pointsPerLayer - 1) {
                this.edges.push(new Edge(i, i + 1));
            }
            if (i + pointsPerLayer < this.points.length) {
                this.edges.push(new Edge(i, i + pointsPerLayer));
            }
        }

        for (let i = 0; i < this.points.length - pointsPerLayer; i++) {
            if ((i + 1) % pointsPerLayer !== 0) {
                this.polygons.push(new Polygon([
                    i, i + 1, i + pointsPerLayer + 1, i + pointsPerLayer
                ]));
            }
        }
    }
}

export default ParabolicCylinder;