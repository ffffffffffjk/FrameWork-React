import { useEffect } from "react";
import Math2D from "../../modules/GraphFolder/Math2D/Math2D";
import UI from "./UI";
import useCanvas from "../../modules/GraphFolder/Canvas/useCanvas.js";
import "./graph2D.css";


const Graph2D = () => {
    const WIN = {
        LEFT: -10,
        BOTTOM: -10,
        WIDTH: 20,
        HEIGHT: 20
    };

    const MyMath = new Math2D();
    
    let funcs = [{
        f : (x) => x,
        color : 'blue',
    }];
    
    let canMove = false;
    let ZOOM = 0.5;

    let canvas = null;

    const [startRender, stopRender] = useCanvas(renderGraph);

    const wheel = (event) => {
        var delta = (event.wheelDelta > 0) ? - ZOOM:ZOOM;
        WIN.WIDTH += delta;
        WIN.HEIGHT += delta;
        WIN.LEFT -= delta/2;
        WIN.BOTTOM -= delta/2;
    }

    const mousedown = () => {
        canMove = true;
    }

    const mouseup = () => {
        canMove = false;
    }

    const mouseleave = () => {
        canMove = false;
    }

    const mousemove = (event) => {
        if (canMove){
            WIN.LEFT -= canvas.sx(event.movementX)*0.06;
            WIN.BOTTOM -= canvas.sy(-event.movementY)*0.06;
        }
    }

    function renderGraph(FPS) {
        if(!canvas) return;
        canvas.clear();
        renderGrid();
        renderOXY();
        renderArrows();
        for(var i = 0; i < funcs.length; i++){
            if(funcs[i]){
                renderFunction(funcs[i].f, funcs[i].color, funcs[i].width);
                renderDerivative(funcs[i].f, 4);
                renderIntegral(funcs[i].f, -1, 3);
                renderZero(funcs[i].f, 0.01, 0.001)
            }
        }

        canvas.text(10, 20, `FPS: ${FPS}`, '#000000', 16);
        canvas.render();
    }
    
    const renderFunction = (f, color, width) => {
        var x = WIN.LEFT;
        var dx = WIN.WIDTH/8000;
        var maxDif = 50;
        var eps = 0.01;
        while (x < WIN.WIDTH + WIN.LEFT){
            if (Math.abs(f(x + eps) - f(x)) > maxDif){
                canvas.line(0, 0, 0, 0, color, width);
                if (f(x)/Math.abs(f(x)) !== f(x+eps) / Math.abs(f(x+eps))){
                    renderAsympt(x);
                } x += eps;
            } else{
                canvas.line(x, f(x), x+dx, f(x+dx), color, width);
                x += dx;
            }
        }
    }

    const renderZero = (f, step = 0.01, eps = 0.001) => {
        let checkPoint = [];
    
        for (var x = WIN.LEFT; x < WIN.LEFT + WIN.WIDTH; x += step) {

            if (!isFinite(f(x)) || !isFinite(f(x + step))) continue;
    
            if (Math.abs(f(x + eps) - f(x)) > 50) continue;
    
            if (Math.abs(f(x)) > 10 || Math.abs(f(x + step)) > 10) continue;
    
            if (f(x) * f(x + step) <= 0 && Math.abs(f(x + eps) - f(x)) < 10) {
                const zero = MyMath.getZero(f, x, x + step, eps);
                if (zero !== null) {
                    canvas.point(zero, 0, 3);
                }
                continue;
            }
    
            if (f(x) * f(x + eps) >= 0) {
                const zero = MyMath.getZero(f, x, x + step, eps);
                if (zero !== null && isFinite(zero)) {
                    checkPoint.push(zero);
                }
            }
        }
    
        for (let i = 1; i < checkPoint.length; i++) {
            if (checkPoint[i + 1] - checkPoint[i] > eps * 10 && f(x) * f(x + eps) >= 0) {
                canvas.point(checkPoint[i + Math.floor((checkPoint.length -2) / 2)], 0, 3);
            }
            break;
        }
    }
    
    const renderDerivative = (f, x0) => {
        const k = MyMath.getDerivative(f, x0);
        const b = f(x0) - k * x0;
        const x1 = WIN.LEFT;
        const y1 = k * x1 + b;
        const x2 = WIN.LEFT + WIN.WIDTH;
        const y2 = k * x2 + b;

        canvas.line(x1, y1, x2, y2, '#f004', 1);

        canvas.point(x0, f(x0), 3);
    }
        
    const renderAsympt = (x) => {
        var dashLength = 0.6;
        var gapLength = 0.25;
        var y = WIN.BOTTOM;

        while (y < WIN.BOTTOM + WIN.HEIGHT){
            canvas.line(x, y, x, y + dashLength, 'black', 1);
            y += dashLength + gapLength;
            }
        }

    const renderIntegral = (f, a, b) => {
        const points = [];
        const step = (b - a) / 100;
        const maxY = WIN.BOTTOM + WIN.HEIGHT;
        const minY = WIN.BOTTOM;
    
        points.push({ x: a, y: 0 });
    
        for (let x = a; x <= b; x += step) {
            const y = f(x);
            points.push({ x: x, y: Math.max(minY, Math.min(y, maxY)) });
        }
    
        points.push({ x: b, y: f(b) });
        points.push({ x: b, y: 0 });
    
        canvas.polygon(points, '#0f08');
    }

    const renderArrows = () => {
        canvas.line(WIN.WIDTH+WIN.LEFT-1/2, -1/3, WIN.WIDTH+WIN.LEFT, 0, 'black', 1);//по х
        canvas.line(WIN.WIDTH+WIN.LEFT-1/2, 1/3, WIN.WIDTH+WIN.LEFT, 0, 'black', 1);

        canvas.line(-1/3,WIN.HEIGHT+WIN.BOTTOM-1/2, 0, WIN.HEIGHT+WIN.BOTTOM, 'black', 1);//по у
        canvas.line(1/3,WIN.HEIGHT+WIN.BOTTOM-1/2, 0, WIN.HEIGHT+WIN.BOTTOM, 'black', 1);
    }

    const renderOXY = () => {
        canvas.line(WIN.LEFT, 0, WIN.WIDTH + WIN.LEFT, 0, 'black', 1);
        canvas.line(0, WIN.BOTTOM, 0, WIN.HEIGHT + WIN.BOTTOM, 'black', 1);
    }

    const renderGrid = () => {
        for (var i = 0; i < WIN.WIDTH + WIN.LEFT; i++) {
            canvas.line(i, WIN.BOTTOM, i, WIN.HEIGHT + WIN.BOTTOM, 'grey', 0.5)
        }
        
        for (var i = 0; i > WIN.LEFT; i--) {
            canvas.line(i, WIN.BOTTOM, i, WIN.HEIGHT + WIN.BOTTOM, 'grey', 0.5);
        }
        
        for (var i = 0; i > WIN.BOTTOM; i--) { 
            canvas.line(WIN.LEFT, i, WIN.WIDTH + WIN.LEFT, i, 'grey', 0.5);
        }

        for (var i = 0; i < WIN.HEIGHT + WIN.BOTTOM; i++) { 
            canvas.line(WIN.LEFT, i, WIN.WIDTH + WIN.LEFT, i, 'grey', 0.5);
        }
    }

    useEffect (() => {
        canvas = startRender({
            id : 'canvas2D',
            width: 500,
            height: 500,
            WIN : WIN,
            callbacks : {
                mousemove : (event) => mousemove(event),
                mousedown : () => mousedown(),
                mouseup : () => mouseup(),
                mouseleave : () => mouseleave(),
                wheel : (event) => wheel(event),
            },
        });

        return () => stopRender();
    });

    return(
        <div className = "containerGraph">
            <canvas id = "canvas2D" className = "id"></canvas>
                <UI funcs = {funcs}/>
            <div className = "buttons"/>
            <div className = "inputs" id = "funcInputs"></div>
            <div className = "overlay hide"></div>
        </div>
    );
}

export default Graph2D;