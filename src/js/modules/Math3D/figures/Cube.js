import Figure from '../entities/Figure.js';
import Point from '../entities/Point.js';
import Polygon from '../entities/Polygon.js';
import Edge from '../entities/Edge.js';

class Cube extends Figure{
    constructor(size = 7){
        super();
        this.points = [
            new Point(-size, size, size),
            new Point(size, size, size),
            new Point(size, -size, size),
            new Point(-size, -size, size),
            new Point(-size, size, -size),
            new Point(size, size, -size),
            new Point(size, -size, -size),
            new Point(-size, -size, -size),
        ];

        this.edges = [
            new Edge(0, 1),
            new Edge(0, 3),
            new Edge(0, 4),
            new Edge(2, 1),
            new Edge(5, 1),
            new Edge(3, 2),
            new Edge(3, 7),
            new Edge(6, 7),
            new Edge(4, 7),
            new Edge(5, 6),
            new Edge(5, 4),
            new Edge(2, 6)
        ];

        this.polygons = [
            new Polygon([0, 1, 2, 3]),
            new Polygon([4, 5, 6, 7]),
            new Polygon([1, 0, 4, 5]),
            new Polygon([3, 2, 6, 7]),
            new Polygon([7, 4, 0, 3]),
            new Polygon([1, 2, 6, 5])
        ]
    }
}

export default Cube;