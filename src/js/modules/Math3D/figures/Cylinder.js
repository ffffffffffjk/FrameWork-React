import Figure from '../entities/Figure.js';
import Point from '../entities/Point.js';
import Polygon from '../entities/Polygon.js';
import Edge from '../entities/Edge.js';

class Cylinder extends Figure{
    constructor(rad = 7, count = 19){
        super();

        const dTeta = Math.PI/count;

        for (let teta = 0; teta < 2 * Math.PI; teta += dTeta){
            for (let H = 0; H < count ; H += 1){
                this.points.push(new Point(
                    rad * Math.cos(teta),
                    rad * Math.sin(teta),
                    H
                ));
            }
        }

        for (let i = 0; i < this.points.length; i++) {
            if ((i + 1 < this.points.length)&&
                ((i + 1) % count != 0)){
                this.edges.push(new Edge(i, i + 1));
            }

            if (i + count * 2 < this.points.length + count){
                this.edges.push(new Edge(i, i + count));
            }
        }
        
        for (let i = 0; i < this.points.length; i++) {
            if ((i + count + 1 < this.points.length)&& ((i + 1) % count !== 0)){
                this.polygons.push(new Polygon([i, i + 1, i + count + 1, i + count]));
            }
        }
    }
}

export default Cylinder;