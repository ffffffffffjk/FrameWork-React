import { useEffect} from "react";  
import Point from "../../modules/Math3D/entities/Point";
import Math3D from "../../modules/Math3D/Math3D";
import Light from "../../modules/Math3D/entities/Light";
import Cube from "../../modules/Math3D/figures/Cube.js";
import BicavidHyperboloid from "../../modules/Math3D/figures/BicavidHyperboloid.js";
import Bottle from "../../modules/Math3D/figures/Bottle.js";
import Cone from "../../modules/Math3D/figures/Cone.js";
import Cylinder from "../../modules/Math3D/figures/Cylinder.js";
import Ellipsoid from "../../modules/Math3D/figures/Ellipsoid.js";
import EllipticCylinder from "../../modules/Math3D/figures/EllipticCylinder.js";
import EllipticParaboloid from "../../modules/Math3D/figures/EllipticParaboloid.js";
import HyperbolicCylinder from "../../modules/Math3D/figures/HyperbolicCylinder.js";
import HyperbolicParaboloid from "../../modules/Math3D/figures/HyperbolicParaboloid.js";
import Hyperboloid from "../../modules/Math3D/figures/Hyperboloid.js";
import ParabolicCylinder from "../../modules/Math3D/figures/ParabolicCylinder.js";
import Pyramid from "../../modules/Math3D/figures/Pyramid.js";
import SecondCone from "../../modules/Math3D/figures/SecondCone.js";
import Sphere from "../../modules/Math3D/figures/Sphere.js";
import Thor from "../../modules/Math3D/figures/Thor.js";
import useCanvas from "../../modules/GraphFolder/Canvas/useCanvas.js";
import "./graph3D.css";
import Figures from "./Figures.js";
import UI3D from "./UI3D.js";

const Graph3D = () => {
    const WIN = {
        LEFT : -5,
        BOTTOM : -5,
        WIDTH : 10,
        HEIGHT : 10,
        CENTER : new Point(0, 0, 30),
        CAMERA : new Point(0, 0, 50),
    }

    let canRotate = false;
    let dx = 0;
    let dy = 0;
    let canTransfer = false;

    let deltaZoom = 1;
    let alphaX = 0;
    let alphaY = 0;
    let movementX = 0;
    let movementY = 0;
    
    let lightValue = 37500;
    let pointsShow = true;
    let polygonsShow = true;
    let edgesShow = true;
    const pointWidth = 2;

    let figures = {
        'Cube' : Cube,
        'BicavidHyperboloid' : BicavidHyperboloid,
        'Bottle' : Bottle,
        'Cone' : Cone,
        'Cylinder' : Cylinder,
        'Ellipsoid' : Ellipsoid,
        'EllipticCylinder' : EllipticCylinder,
        'EllipticParaboloid' : EllipticParaboloid,
        'HyperbolicCylinder' : HyperbolicCylinder,
        'HyperbolicParaboloid' : HyperbolicParaboloid,
        'Hyperboloid' : Hyperboloid,
        'ParabolicCylinder' : ParabolicCylinder,
        'Pyramid' : Pyramid,
        'SecondCone' : SecondCone,
        'Sphere' : Sphere,
        'Thor' : Thor,
    };

    let scene = [{
        f: new figures['Cube'],
        polygonColor: "#4D8BFF",
        pointsShow: pointsShow,
        polygonsShow: polygonsShow,
        edgesShow: edgesShow,
        z : WIN.CENTER.z,
        x : WIN.CAMERA.x,
        y : WIN.CAMERA.y
    }];
    
    let math3D = new Math3D({WIN : WIN});
    let LIGHT = new Light(-40, 5, 10, lightValue);
    let canvas = null;

    const [startRender, stopRender] = useCanvas(renderFrame);

    function renderFrame(FPS){
        if(!canvas) return;
        canvas.clear();

        for(var i = 0; i < scene.length; i++){
            if(scene[i]){
                renderFigure(scene, i);
            }
        }

        canvas.text(10, 20, `FPS: ${FPS}`, '#000000', 16);
        canvas.render();
    }

    const renderFigure = (scene, i) => {
        if(scene[i].polygonsShow){
            const polygons = [];
            math3D.calcCenter(scene[i].f);
            math3D.calcRadius(scene[i].f);
            math3D.calcDistance(scene[i].f, WIN.CAMERA, 'distance');
            math3D.calcDistance(scene[i].f, LIGHT, 'lumen');
            scene[i].f.polygons.forEach(polygon => {polygon.figureIndex = i;
                polygons.push(polygon)});
            
            math3D.sortByArtistAlgorithm(polygons);
            polygons.forEach(polygon => {
                const figure = scene[polygon.figureIndex];
                const points = [figure.f.points[polygon.points[0]],
                                figure.f.points[polygon.points[1]],
                                figure.f.points[polygon.points[2]],
                                figure.f.points[polygon.points[3]]];

                let {r,g,b} = polygon.hexToRgb(scene[polygon.figureIndex].polygonColor);
                const {isShadow, dark} = math3D.calcShadow(polygon, scene, LIGHT);
                const lumen = math3D.calcIllumination(polygon.lumen, 
                    lightValue * (isShadow && dark ? dark : 1));

                r = Math.round(r*lumen);
                g = Math.round(g*lumen);
                b = Math.round(b*lumen);

                const points2D = points.map(p => ({
                    x: math3D.xs(p, scene[i].z, scene[i].x),
                    y: math3D.ys(p, scene[i].z, scene[i].y)
                }));

                canvas.polygon(points2D, `${polygon.rgbToHex(r, g, b)}`);
            });
        }

        if(scene[i].edgesShow){
            scene[i].f.edges.forEach(edge => {
                const p1 = scene[i].f.points[edge.p1];
                const p2 = scene[i].f.points[edge.p2];
                canvas.line(
                    math3D.xs(p1, scene[i].z, scene[i].x),
                    math3D.ys(p1, scene[i].z, scene[i].y),
                    math3D.xs(p2, scene[i].z, scene[i].x),
                    math3D.ys(p2, scene[i].z, scene[i].y),
                    '#0A2A1A',
                    1)
            })
        }
        
        if(scene[i].pointsShow){
            scene[i].f.points.forEach(point => {
                canvas.point(math3D.xs(point, scene[i].z, scene[i].x),
                math3D.ys(point, scene[i].z, scene[i].y), pointWidth);
            })
        }
    }

    const mouseleave = () => {
        canRotate = false;
    }

    const mousedown = (event) =>{
        canRotate = true;
        dx = event.offsetX;
        dy = event.offsetY;
    }

    const mouseup = () => {
        canRotate = false;
    }
    
    const keyup = (event) => {
        if (event.key == 'Enter'){
            canTransfer = false;
        }
    }

    const keydown = (event) => {
        if (event.key == 'Enter'){
            canTransfer = true;
        }
    }
    
    const wheel = (event) => {
        const delta = event.wheelDelta > 0 ? 1.05 : 0.95;
        deltaZoom = delta;
        let matrix = math3D.newMainMatrix(canvas, deltaZoom,
            alphaX, alphaY, movementX, movementY);
            scene.forEach((figure, index) => {
                scene[index].f.points.forEach(point => {
                    let array = math3D.multMatrix(matrix,
                    [point.x, point.y, point.z, 1]);
                    point.x = array[0];
                    point.y = array[1];
                    point.z = array[2];

                    alphaX = 0;
                    alphaY = 0;
                    movementX = 0;
                    movementY = 0;
                })
            });
    }

    const mousemove = (event) => {
        if(canRotate){
            const gradus = Math.PI / 500;
            let Y = -(dx - event.offsetX)*gradus;
            let X = -(dy - event.offsetY)*gradus;
            alphaX = X;
            alphaY = Y;
            let matrix = math3D.newMainMatrix(canvas, deltaZoom,
                alphaX, alphaY, movementX, movementY);

            scene.forEach((figure, index) => {
                scene[index].f.points.forEach(point =>{
                    let array = math3D.multMatrix(matrix,
                    [point.x, point.y, point.z, 1]);
                    point.x = array[0];
                    point.y = array[1];
                    point.z = array[2];

                    movementX = 0;
                    movementY = 0;
                    deltaZoom = 1;
                })
            });

            dx = event.offsetX;
            dy = event.offsetY;
        }

        if(canTransfer){
            let X = event.movementX;
            let Y = event.movementY;
            movementX = X;
            movementY = Y;
            let matrix = math3D.newMainMatrix(canvas, deltaZoom,
                alphaX, alphaY, movementX, movementY);

            scene.forEach((figure, index) => {
                scene[index].f.points.forEach(point =>{
                    let array = math3D.multMatrix(matrix,
                    [point.x, point.y, point.z, 1]);
                    point.x = array[0];
                    point.y = array[1];
                    point.z = array[2];

                    alphaX = 0;
                    alphaY = 0;
                    deltaZoom = 1;
                })
            });
        }
    }

    const lightValueHandler = (event) => lightValue = event.target.value;

    useEffect (() => {
        canvas = startRender({
            id : 'canvas3D',
            width : 500,
            height : 500,
            WIN : WIN,
            callbacks : {
                wheel : event => wheel(event),
                mouseup : () => mouseup(),
                mousedown : event => mousedown(event),
                mousemove : event => mousemove(event),
                mouseleave : () => mouseleave(),
                keydown : event => keydown(event),
                keyup : event => keyup(event),
            }
        });

        return () => stopRender();
    });
        
    return (<div className="containerGraph">
                <div className="graph-content">
            <canvas 
                id="canvas3D"  
                tabIndex={0}
                onKeyDown={keydown}
                onKeyUp={keyup} 
            ></canvas>
            
            <div className="slider-container">
            <input 
                type="range" 
                id="lumenValue" 
                min="0" 
                max="75000"
                defaultValue={lightValue}
                onChange={lightValueHandler}
            />
            </div>
                <UI3D scene ={scene} figures={figures}/>
        </div>
    </div>
    );
}

export default Graph3D;