// importar el módulo express
var express = require('express');
var motorRender = require('express-handlebars');

var fs = require('fs');

// crear la variable app usando express
var app = express();

// configurar la carpeta public como "pública"
app.use(express.static('public'));

app.engine('handlebars', motorRender());
app.set('view engine', 'handlebars');

//creo el servidor 
const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');

// Connection URL
const url = 'mongodb+srv://jerry-818:<password>@cluster0-1v0d1.mongodb.net/tienda';

//const url = 'mongodb://localhost:27017';


// Database Name
const dbName = 'tienda';

// Create a new MongoClient
const client = new MongoClient(url);

var db = null;

// Use connect method to connect to the Server
client.connect(url,
    {

        auth: {
            user: 'jerry-818',
            password: 'MinottaDeveloper818'
        }
},
function(err, client) {

    if (err) throw err;
    //assert.equal(null, err);
    db = client.db('tienda');

    app.listen(process.env.PORT || 1234);
    
    //client.close();
}


);

//**********************************
/*
// Use connect method to connect to the Server
client.connect(function(err) {
    assert.equal(null, err);
    db = client.db(dbName);
    
    //client.close();
});



*/

app.use(express.urlencoded({ extended: true }));

var contador = {
    home: 0,
    contacto: 0,
};

app.get('/tienda/:tipo?', function(request, response){

    console.log(request.query.precio);

    var query = {};
    if(request.params.tipo){
        query.tipo = request.params.tipo;
    }

    var collection = db.collection('productos');
    
    // Find some documents
    collection.find(query)
        .toArray(function(err, docs) {
        assert.equal(err, null);
/*
        let informa = JSON.stringify(docs);
        fs.writeFile('message.json', informa, 'utf8', ()=>{});
*/
        var contexto = {
            productos: docs,
            tipo: request.params.tipo,
            precio: request.query.precio,
            coleccion: request.query.coleccion,

            accesorio: request.params.tipo == "accesorio",
            camiseta: request.params.tipo == "camiseta",
            hoodie: request.params.tipo == "hoodie",

            nuevo: request.params.coleccion == "nuevo",
            viejo: request.params.coleccion == "viejo",

            
            alan: request.params.artista == "alan",
            chain: request.params.artista == "chain",
            the1975: request.params.artista == "1975",
            coldplay: request.params.artista == "coldplay",
        };
        console.log(docs);
        
        response.render('tienda', { layout: false, contexto:contexto });

    });

});


app.get('/tienda/artista/:tipo?', function(request, response){

    console.log(request.query.precio);

    var query = {};
    if(request.params.tipo){
        query.artista = request.params.tipo;
    }

    var collection = db.collection('productos');
    
    // Find some documents
    collection.find(query)
        .toArray(function(err, docs) {
        assert.equal(err, null);

        var contexto = {
            productos: docs,
            tipo: request.params.tipo,
            precio: request.query.precio,
            coleccion: request.query.coleccion,

            alan: request.params.artista == "alan",
            chain: request.params.artista == "chain",
            the1975: request.params.artista == "1975",
            coldplay: request.params.artista == "coldplay",
        };
        console.log(docs);
        
        response.render('tienda', { layout: false, contexto:contexto });

    });

});





app.get('/tienda/coleccion/:tipo?', function(request, response){

    console.log(request.query.precio);

    var query = {};
    if(request.params.tipo){
        query.coleccion = request.params.tipo;
    }

    var collection = db.collection('productos');
    
    // Find some documents
    collection.find(query)
        .toArray(function(err, docs) {
        assert.equal(err, null);

        var contexto = {
            productos: docs,
            tipo: request.params.tipo,
            precio: request.query.precio,
            coleccion: request.query.coleccion,

            nueva: request.params.coleccion == "viejo",
            coleccion2018: request.params.coleccion == "nuevo",
        };
        console.log(docs);
        
        response.render('tienda', { layout: false, contexto:contexto });

    });

});






app.get('/tienda/producto/:titulo', function(req, res){

    var collection = db.collection('productos');
    collection.find({ titulo: req.params.titulo })
        .toArray(function(err, docs){
            console.log(docs);

            var contexto = {
                producto: docs[0]
            };
            res.render('producto', { layout: false, contexto:contexto });
        });
});

app.post('/login', function(request, response){
    // crear un archivo con la información del usuario
    console.log(request.body);
    // redireccionar a otra página
    response.redirect('/bienvenida');
});





// configurar la ruta inicial
app.get('/', function(req, res) {
    res.sendFile(__dirname + '/public/home.html');
    contador.home++;
    console.log('página vista: ', contador);

    let contenido = 'home: ' + contador.home + '\ncontacto: '+contador.contacto;
    fs.writeFile('contador.txt', contenido, 'utf8', function(){
        console.log('archivo escrito');
    });
});

app.get('/tienda', function(req, res) {
    var contexto = {
        titulo: 'ALL PRODUCTS',
        tienda: productos,
    };
    res.render('tienda', { layout: false, contexto:contexto });
});

app.get('/tienda/:producto', function(req, res) {
    var contexto = null;

    productos.forEach(function(producto){
        if(producto.titulo == req.params.producto){
            contexto = producto;
        }
    });

    console.log(req.params.producto);
    if(contexto == null){
        res.send('No encontré ningún producto con el nombre '+ req.params.producto);
    } else {
        res.render('producto', { layout: false, contexto:contexto });
    }
});

// configurar la ruta contacto
app.get('/contacto', function(request, response){
    response.send('página contacto');
    contador.contacto++;

    let contenido = 'home: ' + contador.home + '\ncontacto: '+contador.contacto;
    fs.writeFile('contador.txt', contenido, 'utf8', function(){
        console.log('archivo escrito');
    });
});

app.get('/carrito', function(request, response){
response.render('carrito',{ layout: false });
});

app.post("/enviar", function(request, response){

    console.log("pedido procesando");
    let productos = JSON.parse(datos.compras);
    if(productos != null){
        productos = {};
    }

    let datos = request.body;
    var pedido = {
        nombre: datos.nombre,
        email: datos.email,
        adress: datos.adress,
        city: datos.city,
        state: datos.state,
        phone: datos.phone,
        card: datos.card,
        expiration: datos.expiration,
        cvv: datos.cvv,
        compras: productos,

    }

    let coleccion = db.collection("pedidos");
  coleccion.insertOne(pedido, function(err) {
    assert.equal(err, null);

    console.log("pedido guardado");
    response.redirect("/tienda");
  });


});




app.get('/checkout', function(request, response){
    response.render('checkout',{ layout: false });
    });


// iniciar el servidor en el puerto 3000
/*
app.listen(3000, function() {
  console.log('Aplicación, escuchando el puerto 3000!');
});
*/

