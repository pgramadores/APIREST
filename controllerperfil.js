var mongoose = require('mongoose');
var Perfil  = mongoose.model('Perfil');
var fs = require('fs');

//#####################################################
//########### Controlador de modulo Perfil ############
//#####################################################


//GET
exports.findAllPerfil = function(req, res){
    Foro.find(function(err, perfil){
        if(err){
            res.send(500, err.message);
        }

        console.log('GET /perfil');
        res.status(200).jsonp(perfil);
    });

};

//POST
exports.addPerfil = function(req, res) {
    console.log('POST');
    //console.log(req.body);

    var r = req.body;
    var perfil = new Perfil({
        "nombrecompleto"      : r.nombrecompleto,
        "correo"              : r.correo,
        "preguntas"           : r.preguntas,
        "fechapublicacion"    : r.fechapublicacion,
        "tipotopico"          : r.tipotopico,
        "respuestas"          : r.respuestas
    });

    console.log(preguntas);

    perfil.save(function(err, perfil) {
        if(err){
            return res.status(500).send( err.message);
        }else {
            res.status(200).jsonp(perfil);
        }
    });
};

