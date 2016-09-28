var express = require("express"),
    app = express(),
    bodyParser  = require("body-parser"),
    methodOverride = require("method-override");
    mongoose = require('mongoose');

//Conexion con la base de datos
mongoose.connect('mongodb://localhost/Ofertas', function(err, res) {
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
// Import Models and controllers
var ofertas_     = require('./ofertas')(app, mongoose);
var OfertasCtrl = require('./routes');

var router = express.Router();
router.get('/', function(req, res) {
  res.send("Hello world!");
});
app.use(router);

// API routes
var ofertas_ = express.Router();
app.use(ofertas_);

ofertas_.route('/ofertas')
  .get(OfertasCtrl.findAllOfertas)
  .post(OfertasCtrl.addOferta);

ofertas_.route('/ofertas/:id')
  .get(OfertasCtrl.findById)
  .put(OfertasCtrl.updateOferta)
  .delete(OfertasCtrl.deleteOferta);

ofertas_.route('/ofertasp/:pais')
    .get(OfertasCtrl.findOfertasPorPais);

app.use('/api', ofertas_);

app.listen(3000, function() {
    console.log("Node server running on http://localhost:3000");
});
