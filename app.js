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
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(methodOverride());

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

app.use('/api', ofertas_);

app.listen(3000, function() {
    console.log("Node server running on http://localhost:3000");
});
