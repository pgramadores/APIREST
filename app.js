var express = require("express"),
    app = express(),
    bodyParser  = require("body-parser"),
    methodOverride = require("method-override");
    mongoose = require('mongoose');

//#############################################################################################################
//############################################### Middlewares #################################################
//#############################################################################################################

app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));
app.use(bodyParser.json({limit: '50mb'}));
app.use(methodOverride());
app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', 'http://pro-gramadores.io');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});

//#############################################################################################################
//################################### Modelo y controlador Laboral ############################################
//#############################################################################################################

var ofertas_     = require('./modellaboral')(app, mongoose);
var OfertasCtrl = require('./controllerlaboral');

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

//#############################################################################################################
//################################### Modelo y controlador Foros ##############################################
//#############################################################################################################

var foros_     = require('./modelforos')(app, mongoose);
var ForosCtrl = require('./controllerforos');

// API routes
var foros_ = express.Router();
app.use(foros_);

foros_.route('/foros')
    .get(ForosCtrl.findAllForos)
    .post(ForosCtrl.addPregunta);


//#############################################################################################################
//################################### Modelo y controlador Foros ##############################################
//#############################################################################################################

var perfil_     = require('./modelperfil')(app, mongoose);
var ForosCtrl = require('./controllerforos');

// API routes
var foros_ = express.Router();
app.use(foros_);

foros_.route('/foros')
    .get(ForosCtrl.findAllForos)
    .post(ForosCtrl.addPregunta);

//##############################################################################################################
//################################ Implementación de la API REST ###############################################
//##############################################################################################################

mongoose.connect('mongodb://localhost/pgramadores', function(err, res) {
    if(err) {
        console.log('ERROR: connecting to Database. ' + err);
    }else {
        console.log('Conectado a mongodb');
    }
});

app.use('/api', [ofertas_, foros_]);

app.listen(3000, function() {
    console.log("Node server ejecutandose en http://localhost:3000");
});
