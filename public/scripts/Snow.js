class Snow{

	
	constructor(app){
		this.app=app;


		this.x= this.app.random(this.app.width);
		this.y= this.app.random(-500,-10);
		this.r= this.app.random(7);
		this.velx = 0;
		this.vely= this.app.random(4);
		this.opacidad= this.app.random(50,150);

		this.vientoDer= false;

		}

		pintar(){

			if(this.r>=5){
				this.opacidad=255;
			}

			this.app.fill(255,255,255, this.opacidad);
			this.app.ellipse(this.x, this.y, this.r, this.r);
			this.y+= this.vely;
			//this.x+= this.velx;
		}

		teclaPresionada(){
			//this.vientoDer=true;
		}

		teclaSuelta(){
		//	this.vientoDer=false;
		}
}