var mongoose = require('mongoose');
var Perfil  = mongoose.model('Perfil');
var fs = require('fs');

//#####################################################
//########### Controlador de modulo Perfil ############
//#####################################################


//GET
exports.findAllPerfil = function(req, res){
    Perfil.find(function(err, perfil){
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
        "correo"            : r.correo,
        "nombrecompleto"    : r.nombrecompleto,
        "nacionalidad"      : r.nacionalidad,
        "contrasena"        : r.contrasena,
        "foto"              : r.foto,
        "bio"               : r.bio,
        "redessociales"     : r.redessociales,
        "aptitudes"         : r.aptitudes,
        "experiencias"      : r.experiencias
    });

    console.log(perfil);

    perfil.save(function(err, perfil) {
        if(err){
            return res.status(500).send( err.message);
        }else {
            res.status(200).jsonp(perfil);
        }
    });
};
