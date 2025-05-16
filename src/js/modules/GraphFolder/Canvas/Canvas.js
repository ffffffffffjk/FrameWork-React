class Canvas {
    constructor({id, width = 500, height = 500, WIN, callbacks = {}}) {
        this.WIN = WIN;
        this.id = id;
        this.width = width;
        this.height = height;
        this.callbacks = callbacks;

        this.canvas = document.getElementById(this.id);

        this.canvas.width = this.width;
        this.canvas.height = this.height;
        this.context = this.canvas.getContext('2d');

        this.canvas.addEventListener('wheel', this.callbacks.wheel || (() => { }));
        this.canvas.addEventListener('mouseup', this.callbacks.mouseup || (() => { }));
        this.canvas.addEventListener('mousedown', this.callbacks.mousedown || (() => { }));
        this.canvas.addEventListener('keyup', this.callbacks.keyup || (() => { }));
        this.canvas.addEventListener('keydown',this.callbacks.keydown || (() => { }));
        this.canvas.addEventListener('mousemove', this.callbacks.mousemove || (() => { }));

        this.canvasV = document.createElement('canvas');
        this.canvasV.width = width;
        this.canvasV.height = height;
        this.contextV = this.canvasV.getContext('2d');
    }
    
    xs(x) {
        return (x - this.WIN.LEFT) / this.WIN.WIDTH * this.canvas.width;
    }

    ys(y) {
        return this.canvas.height - (y - this.WIN.BOTTOM) / this.WIN.HEIGHT * this.canvas.height;
    }

    line(x1, y1, x2, y2, color = 'blue', width = 2) {
        this.contextV.beginPath();
        this.contextV.strokeStyle = color;
        this.contextV.lineWidth = width;
        this.contextV.moveTo(this.xs(x1), this.ys(y1));
        this.contextV.lineTo(this.xs(x2), this.ys(y2));
        this.contextV.closePath();
        this.contextV.stroke();
    }

    point(x, y, width){
            this.contextV.beginPath();
            this.contextV.arc(this.xs(x), this.ys(y), width, 0, 2 * Math.PI);
            this.contextV.fillStyle = 'red';
            this.contextV.fill();
        }

    text(x, y, text, color = '#000000', fontSize = 16){
        this.contextV.font = `${fontSize}px Arial`;
        this.contextV.fillStyle = color;
        this.contextV.fillText(text, x, y);
    }
        
    clear(){
        this.contextV.fillStyle = '#efe';
        this.contextV.fillRect(0, 0, this.canvas.width, this.canvas.height);
    }

    sx(x){
        return x + this.WIN.WIDTH/this.canvas.width;
    }

    sy(y){
        return y + this.WIN.HEIGHT/this.canvas.height;
    }

    polygon(points = [], color = "red"){
        if (points.length === 0) return;
        this.contextV.beginPath();
        this.contextV.strokeStyle = color;
        this.contextV.fillStyle = color;
        this.contextV.moveTo(this.xs(points[0].x), this.ys(points[0].y));
        for (var i = 1; i < points.length; i++){
            this.contextV.lineTo(this.xs(points[i].x), this.ys(points[i].y))
        }
        this.contextV.lineTo(this.xs(points[0].x), this.ys(points[0].y));
        this.contextV.closePath();
        this.contextV.fill();
    }

    render(){
        this.context.drawImage(this.canvasV, 0, 0);
    }
}

export default Canvas;