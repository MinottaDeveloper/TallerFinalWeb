class Logica{
    //clase logica, almacena todo el cdigo que se ejecuta dentro del lienzo

    //En el contructor se pide un objeto de tipo app que proviene de la libreria j5
    constructor(app){
        this.app=app;

        this.soundCalima = app.loadSound("/music/calima.mp3");
        this.soundAlternative = app.loadSound("/music/alternative.mp3");
        this.soundMega = app.loadSound("/music/mega.mp3");
        this.soundSummer = app.loadSound("/music/summer.mp3");
        this.soundTropicana = app.loadSound("/music/tropicana.mp3");

        
        this.sonando = false;

        this.nieve = new Nieve(app);
        this.speaker= new Speaker(app);


        //creacion de variables para almacenar las imagines y las coordenadas


        //cargar los mapas
      this.mapa1 = app.loadImage("https://i.ibb.co/wMjg7zT/bienvenida.png");
     
      this.mapa2= app.loadImage("https://i.ibb.co/9yhQwKs/Mesa-de-trabajo-1.png");  
      this.mapa3= app.loadImage("https://i.ibb.co/6NSJVWB/stage2.png");
      this.mapa4= app.loadImage("https://i.ibb.co/xHNJHWS/stage3.png");   
      this.mapa5= app.loadImage("https://i.ibb.co/0Fj71SW/stage4.png");   
      this.mapa6= app.loadImage("https://i.ibb.co/4NjWMTt/stage5.png");  
      this.mapa7 = app.loadImage("https://i.ibb.co/s6SBtyv/stage1.png");

      this.minMapa3= app.loadImage("https://i.ibb.co/SySWsd2/mega.png");
      this.minMapa4= app.loadImage("https://i.ibb.co/4KHh1G5/alternative.png");
      this.minMapa5= app.loadImage("https://i.ibb.co/F7JHQrw/summer.png");
      this.minMapa6= app.loadImage("https://i.ibb.co/m04KjJV/tropicana.png");
      this.minMapa7= app.loadImage("https://i.ibb.co/xSD6Qdg/calima.png"); 
        

      //cargar los iconos de marcador y atras
      this.atras = app.loadImage("https://i.ibb.co/mbN3R93/atras.png");
      this.marcador = app.loadImage("https://i.ibb.co/rvGLcV4/marcador.png");

      //determina en que mapa se encuentra el usuario
      this.numeroMapa = 1;

      this.x=100;
      this.y=100;

      this.fft = new p5.FFT();

      this.soundCalima.amp(0.2);
      this.soundAlternative.amp(0.2);
      this.soundMega.amp(0.2);
      this.soundSummer.amp(0.2);
      this.soundTropicana.amp(0.2);
    }

    //----------------------------------------------------------------------------------------------------
    //metodo pintar para colocar los elementos dentro del lienzo
    pintar(){
        
        //se evalua en que mapa se encuentra el usuario para saber que mostrar
        //se pintan en el lienzo los diferentes mapas, el icono de regresar y de ubicacion
        if(this.numeroMapa==1){
            
            this.app.imageMode(this.app.CORNER);
            this.app.image(this.mapa1, 0, 0,1200,700);            
            this.app.imageMode(this.app.CENTER);
            this.app.image(this.marcador, 212, 223, 130, 131);

        }else if(this.numeroMapa==2){
            //en el mapa 2 se colocan todos los indicadores que llevan a los otros mapas
            
            this.app.imageMode(this.app.CORNER);
            this.app.image(this.mapa2, 0, 0, 1200, 700);  
            
            //indicadores...
        

                        
            //se ponen los mapas en el respectivo indicador
        }else if(this.numeroMapa==3){
            
            this.app.imageMode(this.app.CORNER);
            this.app.image(this.mapa3, 0, 0, 1200, 700);

            if(this.soundMega.isPlaying()==false){
                this.soundMega.play();        
            }
             
          
        }else if(this.numeroMapa==4){
            
            this.app.imageMode(this.app.CORNER);
            this.app.image(this.mapa4, 0, 0, 1200, 700); 
            
            if(this.soundAlternative.isPlaying()==false){
                this.soundAlternative.play();        
            }
             
          
        }else if(this.numeroMapa==5){
            
            this.app.imageMode(this.app.CORNER);
            this.app.image(this.mapa5, 0, 0, 1200, 700);         
            
            if(this.soundSummer.isPlaying()==false){
                this.soundSummer.play();        
            }
             
          
        }else if(this.numeroMapa==6){
            
            this.app.imageMode(this.app.CORNER);
            this.app.image(this.mapa6, 0, 0, 1200, 700);    
            
            if(this.soundTropicana.isPlaying()==false){
                this.soundTropicana.play();        
            }
             
          
        }else if(this.numeroMapa==7){
            
            this.app.imageMode(this.app.CORNER);
            this.app.image(this.mapa7, 0, 0, 1200, 700);     
            
            if(this.soundCalima.isPlaying()==false){
                this.soundCalima.play();        
            }
             
          
        }

        //-----------------------------------------------------------------------------------------------------------------------

        //se pone el indicador de atras para todos los mapas apartir del segundo mapa
        if(this.numeroMapa>1){
        this.app.imageMode(this.app.CENTER);
        //aqui tengo que poner la flecha atras de otro color !!!!!xd
        //this.app.image(this.atras, 149, 100, 130, 131);
        
        }

    //Estas son las zonas sensibles que se evaluan para cambiar la forma del cursor y que aparezca la imagen que indica que es una zona donde el usuario puede hacer clic

        //indicador que lleva al mapa 2
        if(this.numeroMapa==1){
        if(this.app.mouseX > 189 && this.app.mouseX< 221  && this.app.mouseY > 202 && this.app.mouseY< 243 ){
            this.app.cursor(this.app.HAND);
        }else{
        this.app.cursor(this.app.kind);
    }
}

//Los marcadores que estan en el mapa 2 que llevan a los mapas 3,4,5,6,7,8,9.
if(this.numeroMapa==2 ){
    if(this.app.mouseX > 74 && this.app.mouseX< 206  && this.app.mouseY > 423 && this.app.mouseY< 570 ){
            this.app.cursor(this.app.HAND);
            //megaa
            this.app.image(this.minMapa3, 185, 505); 
            
    }else if(this.app.mouseX > 405 && this.app.mouseX< 560  && this.app.mouseY > 145 && this.app.mouseY< 260){
        this.app.cursor(this.app.HAND);
         //alternative
         this.app.image(this.minMapa4, 510, 205);

    }else if(this.app.mouseX > 992 && this.app.mouseX< 1170  && this.app.mouseY > 211 && this.app.mouseY< 350){
        this.app.cursor(this.app.HAND);
        //summer
        this.app.image(this.minMapa5, 1055, 305);

    }else if(this.app.mouseX > 937 && this.app.mouseX< 1088  && this.app.mouseY > 378 && this.app.mouseY< 538){
        this.app.cursor(this.app.HAND);
        //tropicana
        this.app.image(this.minMapa6, 968, 460);

    }else if(this.app.mouseX > 96 && this.app.mouseX< 321  && this.app.mouseY > 115 && this.app.mouseY< 280){
        this.app.cursor(this.app.HAND);
         //calima
         this.app.image(this.minMapa7, 220, 197);

    }else{
        this.app.cursor(this.app.kind);
    }
}

//la zona del boton de ir atras en los diferentes mapas.
if(this.numeroMapa>=3){
     if(this.app.mouseX > 75 && this.app.mouseX< 185  && this.app.mouseY > 25 && this.app.mouseY< 135 ){
        this.app.cursor(this.app.HAND);
        this.app.image(this.atras, 144, 83, 130, 131);
    }else{
        this.app.cursor(this.app.kind);
    }
}




//if(this.sound.isPlaying()== false){
    //}
    
    if(this.numeroMapa>=3){
       // this.sound.play();
       //console.log(this.sound.isPlaying);

    this.speaker.pintar();


    this.espectrum = this.fft.analyze();
    this.app.noStroke();

    this.app.fill(208, 17, 142);

        for(let i=0; i<this.espectrum.length; i++){
        this.app.rect(2*i, 700, this.app.width/this.espectrum.length, -this.espectrum[i]);
         }
    }

    if(this.numeroMapa>=2){
        this.nieve.pintar();
        }


}

//----------------------------------------------------------------------------------------------------------------

    //Metodo mouse para ejecutar las acciones del clic
    mouse(){

        //se imprimen los valores en consola del mouse (X , Y) para colocar los elementos en el lienzo
        this.app.print("x="+ this.app.mouseX + "   y="+ this.app.mouseY);
  

        this.x= this.app.mouseX;
        this.y= this.app.mouseY;


        //Zonas sensibles que reaccionan cuando el usuario hace clic encima de los elementos para cambiar de mapa

        //zona para el de atras del mapa 2
        if(this.app.mouseX > 13 && this.app.mouseX< 57  && this.app.mouseY > 22 && this.app.mouseY< 50 && this.numeroMapa >1 &&this.numeroMapa <=2){
            this.numeroMapa--;
        }

        //la zona del boton de los diferentes mapas que llevan al mapa 2
        if(this.app.mouseX > 75 && this.app.mouseX< 185  && this.app.mouseY > 25 && this.app.mouseY< 135  && this.numeroMapa >=3 &&this.numeroMapa <=9){
            this.numeroMapa=2;

            this.soundMega.stop();
            this.soundAlternative.stop();
            this.soundSummer.stop();
            this.soundTropicana.stop();
            this.soundCalima.stop();
        }

        //indicador que lleva al mapa 2
        if(this.app.mouseX > 189 && this.app.mouseX< 221  && this.app.mouseY > 202 && this.app.mouseY< 243 && this.numeroMapa==1){       
            this.numeroMapa=2;
        }



        //indicadores que llevan al mapa 1,2,3,4,5,6,7,8,.
        if(this.numeroMapa==2){
       if(this.app.mouseX > 74 && this.app.mouseX< 206  && this.app.mouseY > 423 && this.app.mouseY< 570 ){
                this.numeroMapa=3;
                this.app.print("El numero del mapa es: 3 mega");
                this.speaker.x=986;
                this.speaker.y=530;
                
        }else if(this.app.mouseX > 992 && this.app.mouseX< 1170  && this.app.mouseY > 211 && this.app.mouseY< 350){
            this.numeroMapa=5;
            this.app.print("El numero del mapa es: 5 summer");
            this.speaker.x=980;
            this.speaker.y=528;
            
        }else if(this.app.mouseX > 937 && this.app.mouseX< 1088  && this.app.mouseY > 378 && this.app.mouseY< 538){
            this.numeroMapa=6;
            this.app.print("El numero del mapa es: 6 tropicana");
            this.speaker.x=185;
            this.speaker.y=515;
            
        }else if(this.app.mouseX > 96 && this.app.mouseX< 321  && this.app.mouseY > 115 && this.app.mouseY< 280){
            this.numeroMapa=7;
            this.app.print("El numero del mapa es: 7 calima");
            this.speaker.x=166;
            this.speaker.y=535;
            
        }else if(this.app.mouseX > 405 && this.app.mouseX< 560  && this.app.mouseY > 145 && this.app.mouseY< 260){
            this.numeroMapa=4;
            this.app.print("El numero del mapa es: 4 alternative");
            this.speaker.x=190;
            this.speaker.y=525;
            
        }
        }

    }

    keyPressed(){
        this.nieve.keyPressed();
    }


    keyReleased(){
        this.nieve.keyReleased();
    }


}