import Canvas from "./Canvas";

const useCanvas = (renderFrame) =>{
    window.requestAnimFrame = (function(){
    return window.requestAnimationFrame ||
        window.webkitRequestAnimationFrame ||
        window.mozRequestAnimationFrame ||
        window.oRequestAnimationFrame ||
        window.msRequestAnimationFrame ||
        function(callback){
            window.setTimeout(callback, 1000/60);
        }
    })();

    let FPS = 0;
    let countFps = 0;
    let lastTimestamp = Date.now();
    let reqId;

    const loop = () =>{
        countFps++;
        const timestamp = Date.now();
        if(timestamp - lastTimestamp >= 1000){
            FPS = countFps;
            countFps = 0;
            lastTimestamp = timestamp;
        }
        renderFrame(FPS);
        reqId = window.requestAnimFrame(loop);
    }

    const startRender = (params) => {
        loop();
        return new Canvas(params);
    }

    const stopRender = () => {
        window.cancelAnimationFrame(reqId);
    }

    return [startRender, stopRender];
}

export default useCanvas;