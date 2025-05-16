class Shot{
    getRandomInt(min,max){
        return Math.random()*(max-min)+min
    }

    rombTarget(x,y){
        return (Math.abs(x)+Math.abs(y)<=1) ? 3 : 0;
    }
    
    circleTarget(x,y){
        return ((x**2)+(y**2)<=1)?2:0;
    }

    rectangleTarget(x,y){
        return ((Math.abs(x)<=1)*(Math.abs(y)<=1))?1:0
    }

    starTarget(x,y){
        return ((x**(2/3)+y**(2/3)<=1))?4:0;
    }

    yablo4koTarget(x,y){
        return (((x==0)*(y==0))==1)?10:0;
    }

    shoot(x,y){
        return this.yablo4koTarget(x,y) || 
        this.starTarget(x,y) ||
        this.rombTarget(x,y) || 
        this.circleTarget(x,y) || 
        this.rectangleTarget(x,y);
    }
    
    shootToTarget(countShots){
        var points = 0;
        for(var i = 0; i < countShots; i++){
            var x = this.getRandomInt(-1,1);
            var y = this.getRandomInt(-1,1);
            points += this.shoot(x,y);
        }
        return points;
    }
}

export default Shot;