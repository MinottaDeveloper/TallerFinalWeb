new p5(function(app){
//Aqui se inicializa la libreria y se crea el lienzo usando Canvas de p5
var logica;
//var nieve;

app.setup = function(){
    //Se crea el canvas en una constante para poder aplicarle propiedades dentro de un div
const canvas = app.createCanvas (1200,700);
canvas.parent('skeche');

//Se inicializa un objeto de tipo logica para realizar en el toda la parte del lienzo
logica = new Logica(app);

//nieve = new Nieve(app);
}

app.draw = function(){
//Se crea la funcion draw para pintar todas las cosas en el lienzo
   // app.background(46, 204, 113);
    app.background(6, 123, 192);

    //funcion pintar de la logica
    logica.pintar();
    //nieve.pintar();
    
}


//Se crea la funcion del mouse para ejecutar las acciones que ocurren cuando se da clic
app.mousePressed = function(){
    //funcion mouse de la logica
    logica.mouse();
}

app.keyPressed = function(){
    logica.keyPressed();
}

app.keyReleased = function(){
    logica.keyReleased();
}


}
);
