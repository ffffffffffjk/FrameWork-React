class Math3D{
    constructor({WIN}){
        this.WIN = WIN;
    }

    xs(point, zs, x0){
        // const zs = this.WIN.CENTER.z;
        const z0 = this.WIN.CAMERA.z;
        // const x0 = this.WIN.CAMERA.x;
        const dz = point.z - z0;
        const safeDz = (Math.abs(dz) < 1e-6) ? 1e-6 : dz;
        return (point.x - x0)/safeDz * (zs - z0) + x0;
    }
    
    ys(point, zs, y0){
        // const zs = this.WIN.CENTER.z;
        const z0 = this.WIN.CAMERA.z;
        // const y0 = this.WIN.CAMERA.y;
        const dz = point.z - z0;
        const safeDz = (Math.abs(dz) < 1e-6) ? 1e-6 : dz;
        return -(point.y - y0)/safeDz * (zs - z0) + y0;
    }
    

    multMatrix(T, m){
        const c = [0, 0, 0, 0];
        for (let i = 0; i < 4; i++){
            let s = 0;
            for (let j = 0; j < 4; j++){
                s += T[j][i]*m[j];
            }
            c[i] = s;
        }
        return c;
    }

    rotateOz(alpha, point){
        const array = this.multMatrix(
            [[Math.cos(alpha), Math.sin(alpha), 0, 0],
             [-Math.sin(alpha), Math.cos(alpha), 0, 0],
             [0, 0, 1, 0],
             [0, 0, 0, 1]],
             
            [point.x, point.y, point.z, 1]);

            point.x = array[0];
            point.y = array[1];
            point.z = array[2];
    }

    calcDistance(figure, endPoint, name){
        for (let i = 0; i < figure.polygons.length; i++){
            const points = figure.polygons[i].points;
            let x = 0, y = 0, z = 0;
            points.forEach(index => {
                x += figure.points[index].x;
                y += figure.points[index].y;
                z += figure.points[index].z;
            });
            x/=points.length;
            y/=points.length;
            z/=points.length;

            figure.polygons[i][name] = Math.sqrt((endPoint.x - x)*(endPoint.x - x) +
                (endPoint.y - y)*(endPoint.y - y) + (endPoint.z - z)*(endPoint.z - z));
        }
    }

    sortByArtistAlgorithm(polygons){
        polygons.sort((a, b) => 
            b.distance - a.distance);
    }

    calcIllumination(distance, lumen){
        const illum = distance?lumen/distance**3:1;
        return illum > 1?1:illum;
    }

    multMatrixMatrix(A, B) {
        const result = [];
        for (let i = 0; i < 4; i++) {
            result[i] = [];
            for (let j = 0; j < 4; j++) {
                result[i][j] = 0;
                for (let k = 0; k < 4; k++) {
                    result[i][j] += A[i][k] * B[k][j];
                }
            }
        }
        return result;
    } 

    newMainMatrix(canvas, delta, alphaX, alphaY, movementX, movementY) {
        const zoomMatrix = [
            [delta, 0, 0, 0],
            [0, delta, 0, 0],
            [0, 0, delta, 0],
            [0, 0, 0, 1]
        ];
    
        const moveMatrix = [
            [1, 0, 0, 0],
            [0, 1, 0, 0],
            [0, 0, 1, 0],
            [canvas.sx(movementX)*0.06,
             canvas.sy(movementY)*0.06,
             canvas.sx(movementX)*0.06,
             1]
        ];
    
        const rotateOxMatrix = [
            [1, 0, 0, 0],
            [0, Math.cos(alphaX), Math.sin(alphaX), 0],
            [0, -Math.sin(alphaX), Math.cos(alphaX), 0],
            [0, 0, 0, 1]
        ];
    
        const rotateOyMatrix = [
            [Math.cos(alphaY), 0, -Math.sin(alphaY), 0],
            [0, 1, 0, 0],
            [Math.sin(alphaY), 0, Math.cos(alphaY), 0],
            [0, 0, 0, 1]
        ];
    
        let result = this.multMatrixMatrix(zoomMatrix, rotateOxMatrix);
        result = this.multMatrixMatrix(result, rotateOyMatrix);
        result = this.multMatrixMatrix(result, moveMatrix);
        return result;
    }

    calcVector(a, b){
        return{
            x : b.x - a.x,
            y : b.y - a.y,
            z : b.z - a.z
        }
    }

    vectorProd(a, b){
        return{
            x : a.y * b.z - a.z * b.y,
            y : -a.x * b.z + a.z * b.x,
            z : a.x * b.y - a.y * b.x
        }
    }

    calcVectorModule(a){
        return Math.sqrt(a.x**2 + a.y**2 + a.z**2);
    }

    calcRadius(figure){
        const points = figure.points;
        figure.polygons.forEach(polygon => {
            const center = polygon.center;
            const p1 = points[polygon.points[0]];
            const p2 = points[polygon.points[1]];
            const p3 = points[polygon.points[2]];
            const p4 = points[polygon.points[3]];

            polygon.R = (
                this.calcVectorModule(this.calcVector(center, p1))+
                this.calcVectorModule(this.calcVector(center, p2))+
                this.calcVectorModule(this.calcVector(center, p3))+
                this.calcVectorModule(this.calcVector(center, p4)))/4;
        });
    }

    calcShadow(polygon, scene, LIGHT){
        const M1 = polygon.center;
        const r = polygon.R;
        const s = this.calcVector(M1, LIGHT);
        for (let i = 0; i < scene.length; i++){
            if (polygon.figureIndex === i) continue;
            for (let j = 0; j < scene[i].f.polygons.length; j++){
                const polygon2 = scene[i].f.polygons[j];
                // стрелочка перевернута
                if (polygon.lumen > polygon2.lumen) continue;
                const M0 = polygon2.center;
                if(M1.x === M0.x && M1.y === M0.y && M1.z === M0.z) continue;
                const dark = this.calcVectorModule(this.vectorProd(this.calcVector(M0, M1), s))/
                    this.calcVectorModule(s);
                if(dark < r) return {
                    isShadow : true,
                    // менять коэф
                    dark : dark / 1.3
                }
            }
        }
        return {isShadow : false};
    }

    calcCenter(figure){
        const points = figure.points;
        figure.polygons.forEach(polygon => {
            const p1 = points[polygon.points[0]];
            const p2 = points[polygon.points[1]];
            const p3 = points[polygon.points[2]];
            const p4 = points[polygon.points[3]];
            polygon.center = {
                x: (p1.x + p2.x + p3.x + p4.x) / 4,
                y: (p1.y + p2.y + p3.y + p4.y) / 4,
                z: (p1.z + p2.z + p3.z + p4.z) / 4,
            };            
        });
    }
}

export default Math3D;