var mongoose = require('mongoose');
var Foro  = mongoose.model('Foros');
var fs = require('fs');
var nodemailer = require('nodemailer');

//#####################################################
//###### Controlador de modulo Ofertas laborales ######
//#####################################################


//GET->
exports.findAllForos = function(req, res){
    Foro.find(function(err, foros){
        if(err){
            res.send(500, err.message);
        }

        console.log('GET /foros');
        res.status(200).jsonp(foros);
    });

};

//POST
exports.addPregunta = function(req, res) {
    console.log('POST');
    //console.log(req.body);

    var r = req.body;
    var preguntas = new Foro({
        "nombrecompleto"      : r.nombrecompleto,
        "correo"              : r.correo,
        "preguntas"           : r.preguntas,
        "fechapublicacion"    : r.fechapublicacion,
        "tipotopico"          : r.tipotopico,
        "respuestas"          : r.respuestas
    });

    console.log(preguntas);

    preguntas.save(function(err, foros) {
        if(err){
            return res.status(500).send( err.message);
        }else {
            res.status(200).jsonp(foros);
        }
    });
};
