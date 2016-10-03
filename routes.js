var mongoose = require('mongoose');
var Ofer  = mongoose.model('Ofertas');
var fs = require('fs');

//GET
exports.findAllOfertas = function(req, res) {
    Ofer.find(function(err, ofertas) {
    if(err){
        res.send(500, err.message);
    }

    console.log('GET /ofertas')
        res.status(200).jsonp(ofertas);
    });
};

//GET
exports.findById = function(req, res) {
    Ofer.findById(req.params.id, function(err, oferta) {
    if(err) {
        return res.send(500,err.message);
    }

    console.log('GET /oferta/' + req.params.id);
        res.status(200).jsonp(oferta);
    });
};

//GET
exports.findOfertasPorPais = function(req, res) {
    Ofer.find({ 'pais': req.params.pais, 'estado':true }, function(err, ofertas) {
        if(err){
            res.send(500, err.message);
        }else{
            console.log('GET /ofertas')
            res.status(200).jsonp(ofertas);
        }
    });

};


//POST
exports.addOferta = function(req, res) {
    console.log('POST');
    //console.log(req.body);

    var iae = '';
    var image = req.body.imagen;
    var data = image.replace(/^data:image\/\w+;base64,/, '');
    // fs.writeFile('imagen.png', data, {encoding: 'base64'}, function(err){
    //     iae = 'exito';
    // });

    fs.writeFile('../pro-gramadores/pro-gramadores/images/trabajos/imagen'+req.body.cargo.trim()+'.png', data, {encoding: 'base64'}, (err) => {
        if (err){
            throw err;
            iae = 'error';
        }else {
            iae = './images/trabajos/imagen'+req.body.cargo.trim()+'.png';
            console.log('It\'s saved!');
        }
    });

    var oferta = new Ofer({
        "cargo":              req.body.cargo,
        "publicador":         req.body.publicador,
        "correopublicador":   req.body.correopublicador,
        "categoria":          req.body.categoria,
        "sueldo":             req.body.sueldo,
        "tipocontrato":       req.body.tipocontrato,
        "descripciongeneral": req.body.descripciongeneral,
        "beneficiosventajas": req.body.beneficiosventajas,
        "requisitos":         req.body.requisitos,
        "pais":               req.body.pais,
        "imagen":             './images/trabajos/imagen'+req.body.cargo.trim()+'.png',
        "fechacreacion":      req.body.fechacreacion,
        "fechatermino":       req.body.fechatermino,
        "estado":             req.body.estado
    });

    console.log(oferta);

    oferta.save(function(err, oferta) {
        if(err){
            return res.status(500).send( err.message);
        }else {
            res.status(200).jsonp(oferta);
        }
    });
};

//PUT
exports.updateIrsertaPustulanteOferta = function(req, res) {

    var postulacion = {
        "nombre":            req.body.nombre,
        "correo":            req.body.correo,
        "telefono":          req.body.telefono,
        "linkedin":          req.body.linkedin,
        "portafolio":        req.body.portafolio,
        "experiencia":       req.body.experiencia,
        "cartapresentacion": req.body.cartapresentacion
    };

    Ofer.findById(req.params.id, function(err, oferta) {
        oferta.postulaciones.push( postulacion );
        //oferta.postulaciones  =   postulacion;
        oferta.save(function(err) {
            if(err) {
                return res.status(500).send(err.message);
            }else{
                res.status(200).jsonp(oferta);
            }
        });
    });
};



//PUT
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

        oferta.save(function(err) {
            if(err) {
                return res.status(500).send(err.message);
            }else{
                res.status(200).jsonp(oferta);
            }
        });
    });
};

//DELETE
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
