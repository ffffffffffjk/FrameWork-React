import Figure from '../entities/Figure.js';
import Point from '../entities/Point.js';
import Polygon from '../entities/Polygon.js';
import Edge from '../entities/Edge.js';

class Sphere extends Figure {
    constructor(rad = 7, count = 31){
        super();

        const dTeta = Math.PI/count;
        const dFi = 2 * Math.PI/count;

        for (let teta = 0; teta <= Math.PI; teta += dTeta){
            for (let fi = 0; fi < Math.PI * 2; fi += dFi){
                this.points.push(new Point(
                    rad * Math.sin(teta) * Math.cos(fi),
                    rad * Math.sin(teta) * Math.sin(fi),
                    rad * Math.cos(teta)
                ));
            }
        }

        for (let i = 0; i < this.points.length; i++) {
            if (i + count < this.points.length){
                this.edges.push(new Edge(i, i + count));
            }
            if ((i + 1 < this.points.length)&&((i + 1) % count != 0)){
                this.edges.push(new Edge(i, i + 1));
            }
            if ((i + 1) % count === 0){
                this.edges.push(new Edge(i, i + 1 - count));
            }
        }
        
        for (let i = 0; i < this.points.length; i++) {
            if (i + 1 + count < this.points.length && (i + 1) % count !== 0) {
                this.polygons.push(new Polygon([i, i + 1, i + 1 + count, i + count]));
            } else if (i + count < this.points.length && (i + 1) % count === 0) {
                this.polygons.push(new Polygon([i, i + 1 - count, i + 1, i + count]))
            }
        }
    }
}

export default Sphere;