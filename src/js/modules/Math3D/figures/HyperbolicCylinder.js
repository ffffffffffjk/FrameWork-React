import Figure from '../entities/Figure.js';
import Point from '../entities/Point.js';
import Polygon from '../entities/Polygon.js';
import Edge from '../entities/Edge.js';

class HyperbolicCylinder extends Figure {
    constructor(a = 5, b = 3, height = 10, count = 20) {
        super();

        const dH = height / count;
        const maxT = 2;
        const dT = (2 * maxT) / count;

        for (let h = -height / 2; h <= height / 2; h += dH) {
            for (let t = -maxT; t <= maxT; t += dT) { 
                this.points.push(new Point(
                    a * (t ** 2 - 1) / 4 + 3,
                    b * t ,
                    h
                ));

                this.points.push(new Point(
                    -a * (t ** 2 - 1) / 4 - 3,
                    b * t,
                    h,
                ));
            }
        }

        const pointsPerLayer = (count + 1) * 2;

        for (let i = 0; i < this.points.length-1; i++) {
            if ((i + 2) % pointsPerLayer !== 0 && (i % pointsPerLayer) % (count + 1) !== count) {
                this.edges.push(new Edge(i, i + 2));
            }

            if ((i + 2) % pointsPerLayer !== 0 && i % 2 === 0 ){
                this.edges.push(new Edge(i, i + 2));
            }

            if (i + pointsPerLayer < this.points.length ) {
                this.edges.push(new Edge(i, i + pointsPerLayer));
            }
        }

        for (let i = 0; i < this.points.length - pointsPerLayer - 2; i++) {
            if ((i + 2) % pointsPerLayer !== 0 && (i % pointsPerLayer) % (count + 1) !== count) {
                this.polygons.push(new Polygon([
                    i, i + 2, i + 2 + pointsPerLayer, i + pointsPerLayer
                ]));
            }

            if ((i + 2) % pointsPerLayer !== 0 && i % 2 === 0) {
                this.polygons.push(new Polygon([
                    i, i + 2, i + 2 + pointsPerLayer, i + pointsPerLayer
                ]));
            }
        }
    }
}

export default HyperbolicCylinder;