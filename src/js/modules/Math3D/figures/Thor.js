import Figure from '../entities/Figure.js';
import Point from '../entities/Point.js';
import Polygon from '../entities/Polygon.js';
import Edge from '../entities/Edge.js';

class Thor extends Figure{
    constructor(rad = 7, count = 21){
        super();

        const dTeta = Math.PI/count;
        const dFi = 2 * Math.PI/count;
        const R = 2 * rad;

        for (let teta = 0; teta < 2 * Math.PI; teta += dTeta){
            for (let fi = 0; fi < Math.PI * 2; fi += dFi){
                this.points.push(new Point(
                    (R + rad * Math.cos(fi)) * Math.cos(teta),
                    (R + rad * Math.cos(fi)) * Math.sin(teta),
                    rad * Math.sin(fi)
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

export default Thor;