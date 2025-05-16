import Figure from '../entities/Figure.js';
import Point from '../entities/Point.js';
import Polygon from '../entities/Polygon.js';
import Edge from '../entities/Edge.js';

class HyperbolicParaboloid extends Figure{
    constructor(size = 7, a = 2, b = 3){
        super();

        for(let u = -size; u <= size; u++){
            for(let v = -size; v <= size; v++){
                this.points.push(new Point(
                    a * u,
                    b * v,
                    (u ** 2 - v ** 2)/4
                ));
            }
        }

        for(let i = 0; i < this.points.length; i++){
            if (i + 1 < this.points.length && (i + 1) % (size * 2 + 1) != 0){
                this.edges.push(new Edge(i, i + 1));
            }

            if (i + 2 * size + 1 < this.points.length){
                this.edges.push(new Edge(i, i + 2 * size + 1));
            }
        }
        
        for(let i = 0; i < this.points.length; i++){
            if (i + 2 * size + 2 < this.points.length &&
                (i + 2 * size + 2) % (size * 2 + 1) != 0){
                this.polygons.push(new Polygon([i, i + 1, i + 2 * size + 2, i + 2 * size + 1]));
            }
        }

    }
}

export default HyperbolicParaboloid;