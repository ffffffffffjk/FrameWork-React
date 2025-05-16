import Figure from '../entities/Figure.js';
import Point from '../entities/Point.js';
import Polygon from '../entities/Polygon.js';
import Edge from '../entities/Edge.js';

class EllipticCylinder extends Figure {
    constructor(a = 7, b = 5, h = 7, count = 21) {
        super();
        
        const dTheta = (2 * Math.PI) / count; 
        const dv = (2 * h) / count;

        for (let theta = 0; theta < 2 * Math.PI; theta += dTheta) {
            for (let v = -h; v <= h; v += dv) {
                this.points.push(new Point(
                    a * 1.2 * Math.cos(theta),
                    v,
                    b * Math.sin(theta)
                ));
            }
        }

        for (let i = 0; i <= this.points.length; i++) {
            if ((i + 1 < this.points.length)&&
                ((i + 1) % count != 0)){
                this.edges.push(new Edge(i, i + 1));
            }

            if (i + count < this.points.length){
                this.edges.push(new Edge(i, i + count));
            }

            if (i < count && i + this.points.length - count < this.points.length){
                this.edges.push(new Edge(i, i + this.points.length - count));
            }
        }


        for (let i = 0; i < this.points.length; i++) {
            if ((i + count + 1 < this.points.length)&& ((i + 1) % count !== 0)){
                this.polygons.push(new Polygon([i, i + 1, i + count + 1, i + count]));
            }

            if (i + 1 < count && i + this.points.length - count + 1 < this.points.length){
                this.polygons.push(new Polygon([i, i + 1, i + this.points.length - count + 1,
                    i + this.points.length - count ]));
            }
        }
    }
}

export default EllipticCylinder;
