var express = require("express"),
    app = express(),
    bodyParser  = require("body-parser"),
    methodOverride = require("method-override");
    mongoose = require('mongoose');

//Conexion con la base de datos
mongoose.connect('mongodb://localhost/pgramadores', function(err, res) {
    if(err) {
        console.log('ERROR: connecting to Database. ' + err);
    }else {
        console.log('Conectado a mongodb');
    }
});

// Middlewares
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));
app.use(bodyParser.json({limit: '50mb'}));
app.use(methodOverride());
app.use(function (req, res, next) {
    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', 'http://pro-gramadores.io');
    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);
    // Pass to next layer of middleware
    next();
});

//Modelo y controlador
var ofertas_     = require('./model')(app, mongoose);
var OfertasCtrl = require('./controller');

// API routes
var ofertas_ = express.Router();
app.use(ofertas_);

ofertas_.get('/', function(req, res) {
    res.send("Bienvenidos a la API de pro-gramadores!");
});

ofertas_.route('/ofertas')
  .get(OfertasCtrl.findAllOfertas)
  .post(OfertasCtrl.addOferta);

ofertas_.route('/ofertas/:id')
  .get(OfertasCtrl.findById)
  .put(OfertasCtrl.updateOferta)
  .delete(OfertasCtrl.deleteOferta);

ofertas_.route('/ofertasp/:pais')
    .get(OfertasCtrl.findOfertasPorPais);

ofertas_.route('/ofertasp/:id')
    .put(OfertasCtrl.updateIrsertaPustulanteOferta);



//Modelo y controlador de FOROS
var foros_     = require('./model')(app, mongoose);
var ForosCtrl = require('./controllerforos');

// API routes
var foros_ = express.Router();
app.use(foros_);

foros_.route('/foros')
    .get(ForosCtrl.findAllForos)
    .post(ForosCtrl.addPregunta);






app.use('/api', [ofertas_, foros_]);
//app.use('/api', foros_);

app.listen(3000, function() {
    console.log("Node server ejecutandose en http://localhost:3000");
});
