import Figure from '../entities/Figure.js';
import Point from '../entities/Point.js';
import Polygon from '../entities/Polygon.js';
import Edge from '../entities/Edge.js';

class Pyramid extends Figure{
    constructor(size = 7){
        super();
        this.points = [
            new Point(size, -size, size), //0
            new Point(-size, -size, size), //1
            new Point(size, -size, -size), //2
            new Point(-size, -size, -size), //3
            new Point(0, size/1.5, 0), //4
        ];

        this.edges = [
            new Edge(1, 0),
            new Edge(1, 3),
            new Edge(2, 3),
            new Edge(0, 2),
            new Edge(0, 4),
            new Edge(1, 4),
            new Edge(2, 4),
            new Edge(3, 4),
        ];

        this.polygons = [
            new Polygon([0, 1, 3, 2]),
            new Polygon([0, 1, 4, 4]),
            new Polygon([1, 3, 4, 4]),
            new Polygon([3, 2, 4, 4]),
            new Polygon([2, 0, 4, 4]),
        ]
    }
}

export default Pyramid;