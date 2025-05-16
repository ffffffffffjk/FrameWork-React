import Figure from '../entities/Figure.js';
import Point from '../entities/Point.js';
import Polygon from '../entities/Polygon.js';
import Edge from '../entities/Edge.js';

class Bottle extends Figure{
    constructor(count = 29){
        super();

        const du = Math.PI/count;
        const dv = 2 * Math.PI/count;

        for (let u = 0; u <= 2 * Math.PI; u += du){
            for (let v = 0; v < Math.PI * 2; v += dv){
                this.points.push(new Point(
                    6 * Math.cos(u) * (1 + Math.sin(u)) + 4 * (1 - Math.cos(u)/2) * 
                    Math.cos(v) * Math.cos(u/2 + Math.PI/4),

                    16 * Math.sin(u) + 4 * (1 - Math.cos(u)/2) * Math.sin(u/2 + Math.PI/4) * Math.cos(v),

                    4 * (1 - Math.cos(u)/2) * Math.sin(v)
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
            if ((i + count + 1 < this.points.length)&&
                (i + count < this.points.length)){
                this.polygons.push(new Polygon([i, i + 1, i + count + 1, i + count]));
            }
        }
    }
}

export default Bottle;