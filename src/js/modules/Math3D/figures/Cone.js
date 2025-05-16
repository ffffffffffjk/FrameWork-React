import Figure from '../entities/Figure.js';
import Point from '../entities/Point.js';
import Polygon from '../entities/Polygon.js';
import Edge from '../entities/Edge.js';

class Cone extends Figure{
    constructor(size = 7){
        super();
        const rad = size;
    
        const step = Math.PI * 2 / 70;
        for (let i = 0; i < Math.PI * 2; i += step) {
            this.points.push(new Point(
                rad * Math.cos(i),
                -rad,
                rad * Math.sin(i)
            ));
        }

        this.points.push(new Point(0, size/2, 0));

        for (let i = 0; i < this.points.length; i++) {
            if (i + 1 < this.points.length) {
                this.edges.push(new Edge(i, i + 1));
            }
        }

        this.edges.push(new Edge(this.points.length - 2, 0));

        const Length = this.points.length-1;
        for (let i = 0; i < this.points.length-1; i++){
            this.edges.push(new Edge(i, Length));
        }

        for (let i = 0; i < this.points.length; i++){
            if ((i + this.points.length/2 + 1 < this.points.length)&&
            (i + (this.points.length-1)/2+1 != this.points.length-1)&&
            (i + (this.points.length-1)/2+1 != this.points.length-1)){
                this.polygons.push(new Polygon([i, i+1, i + (this.points.length-1)/2+1,
                    i + (this.points.length-1)/2]));
            }
        }

        this.polygons.push(new Polygon([Length-1, 0,
            Math.trunc((Length-1)/2)+1,
            Math.trunc((Length-1)/2)
        ]));  

        for (let i = 0; i < this.points.length; i++){
            if (i + 1 < this.points.length){
                this.polygons.push(new Polygon([i, i, i+1, Length]));
            }
        }
        this.polygons.push(new Polygon([0, 0, this.points.length - 2, Length]));        
    }   
}

export default Cone;