class Spaceship{
    constructor(x, y, width, height){
        var options = {
            isStatic : true,
            density:0.04,
            friction:1
        }
        this.width = width;
        this.height = height;
        this.image = loadImage("images/spaceship.png");
        this.body = Bodies.rectangle(x, y, width, height, options);
        World.add(world, this.body);
    }

    display(){
        var pos = this.body.position;
        push();
        translate(pos.x, pos.y);
        imageMode(CENTER);
        image(this.image, 0, 0, this.width, this.height);
        pop();
    }
}

