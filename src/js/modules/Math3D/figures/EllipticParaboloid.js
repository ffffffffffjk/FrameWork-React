import Figure from '../entities/Figure.js';
import Point from '../entities/Point.js';
import Polygon from '../entities/Polygon.js';
import Edge from '../entities/Edge.js';

class EllipticParaboloid extends Figure{
    constructor(size = 7){
        super();

        const dPhi = Math.PI/size;

        for(let t = 0; t < size; t++){
            for(let Phi = 0; Phi <= Math.PI * 2; Phi += dPhi){
                this.points.push(new Point(
                    t * Math.cos(Phi)*2,
                    t * Math.sin(Phi)*2,
                    t * t * 1/2 
                ));
            }
        }

        for(let i = 0; i < this.points.length - 1; i++){
            this.edges.push(new Edge(i, i + 1));
            if(i + 2 * size + 1< this.points.length){
                this.edges.push(new Edge(i, i + 2 * size + 1));
            }
        }

        for(let i = 0; i < this.points.length - 1; i++){
            if(i + 2 * size + 2 < this.points.length){
                this.polygons.push(new Polygon([i, i + 1, i + 2 * size + 2, i + 2 * size + 1]));
            }
        }

    }
}

export default EllipticParaboloid;