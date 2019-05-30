class Nieve{
    constructor(app){
        this.app=app;
        
        this.num = 500; 

        this.snows = [];

  this.app.smooth();
  this.app.noStroke();
  this.app.fill(255,100);
  
  for (var i=0; i<this.num; i++) {    
    this.snows[i]=  new Snow(app);
  }
  
}


pintar(){
  for (var i=0; i<this.num; i++) {
    this.snows[i].pintar();

    if(this.snows[i].y> this.app.height+10){
      this.snows[i].y= this.app.random(-500, 10);
    }
          }
    }


    keyPressed(){
      for (var i=0; i<this.num; i++) {
        this.snows[i].teclaPresionada();
      }
    }


    keyReleased(){
      for (var i=0; i<this.num; i++) {
        this.snows[i].teclaSuelta();
      }
    }
}