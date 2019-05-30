class Speaker{

    constructor(app){
        this.app=app;
        
    this.w = 300;
    this.h = 300;
    this.x;
    this.y;
    this.arcEnd;
    this.move;
    this.arcs = [];
  
        
        this.x = 980;
        this.y = 528;
        
    }
    
    pintar() {
        
        
        this.app.noFill();
        this.app.strokeWeight(1);
        this.app.stroke(255, 50);

        for (let move = 0; move <this.app.random(1,30); move++){
        for (let i =0; i<move; i++){
            this.arcEnd = (4*this.app.PI)
            this.app.arc (this.x, this.y, this.w/i, this.h/i, 0, this.arcEnd);
        }
    }
    }	

}

