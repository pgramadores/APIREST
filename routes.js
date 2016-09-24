var mongoose = require('mongoose');
var Ofer  = mongoose.model('Ofertas');

//GET - Return all tvshows in the DB
exports.findAllOfertas = function(req, res) {
    Ofer.find(function(err, ofertas) {
    if(err){
        res.send(500, err.message);
    }

    console.log('GET /ofertas')
        res.status(200).jsonp(ofertas);
    });
};

//GET - Return a TVShow with specified ID
exports.findById = function(req, res) {
    Ofer.findById(req.params.id, function(err, oferta) {
    if(err) {
        return res.send(500,err.message);
    }

    console.log('GET /oferta/' + req.params.id);
        res.status(200).jsonp(oferta);
    });
};

//POST - Insert a new TVShow in the DB
exports.addOferta = function(req, res) {
    console.log('POST');
    console.log(req.body);

    var oferta = new Ofer({
        cargo:              req.body.cargo,
        publicador:         req.body.publicador,
        correopublicador:   req.body.correopublicador,
        categoria:          req.body.categoria,
        sueldo:             req.body.sueldo,
        tipocontrato:       req.body.tipocontrato,
        descripciongeneral: req.body.descripciongeneral,
        beneficiosventajas: req.body.beneficiosventajas,
        requisitos:         req.body.requisitos,
        pais:               req.body.pais,
        imagen:             req.body.imagen,
        fechacreacion:      req.body.fechacreacion,
        fechatermino:       req.body.fechatermino,
        estado:             req.body.estado
    });

    oferta.save(function(err, oferta) {
        if(err){
            return res.status(500).send( err.message);
        }else {
            res.status(200).jsonp(oferta);
        }
    });
};

//PUT - Update a register already exists
exports.updateOferta = function(req, res) {
    Ofer.findById(req.params.id, function(err, oferta) {
        oferta.cargo  =              req.body.cargo;
        oferta.publicador  =         req.body.publicador;
        oferta.correopublicador  =   req.body.correopublicador;
        oferta.categoria  =          req.body.categoria;
        oferta.sueldo  =             req.body.sueldo;
        oferta.tipocontrato  =       req.body.tipocontrato;
        oferta.descripciongeneral  = req.body.descripciongeneral;
        oferta.beneficiosventajas  = req.body.beneficiosventajas;
        oferta.requisitos  =         req.body.requisitos;
        oferta.pais  =               req.body.pais;
        oferta.imagen  =             req.body.imagen;
        oferta.fechacreacion  =      req.body.fechacreacion;
        oferta.fechatermino  =       req.body.fechatermino;
        oferta.estado  =             req.body.estado;

        Ofer.save(function(err) {
            if(err) {
                return res.status(500).send(err.message);
            }else{
                res.status(200).jsonp(tvshow);
            }
        });
    });
};

//DELETE - Delete a TVShow with specified ID
exports.deleteOferta = function(req, res) {
    Ofer.findById(req.params.id, function(err, oferta) {
        oferta.remove(function(err) {
            if(err){
                return res.status(500).send(err.message);
            }else {
                res.status(200).send();
            }
        })
    });
};
