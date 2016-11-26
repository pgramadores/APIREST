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

//GET
exports.findPerfilPorCorreo = function(req, res) {
    Perfil.find({ 'correo': req.params.correo }, function(err, perfil) {
        if(err){
            res.send(500, err.message);
        }else{
            console.log('GET /perfil')
            res.status(200).jsonp(perfil);
        }
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

exports.updatePerfil = function(req, res) {

        Perfil.findOne({"correo": req.params.correo}, function (err, perfil) {
        // Handle any possible database errors
        if (err) {
            res.status(500).send(err);
        } else {
            // Update each attribute with any possible attribute that may have been submitted in the body of the request
            // If that attribute isn't in the request body, default back to whatever it was before.
            perfil.contrasena   = req.body.contrasena;
            perfil.nacionalidad = req.body.nacionalidad;
            perfil.foto         = req.body.foto;
            perfil.bio          = req.body.bio;
            perfil.experiencia  = req.body.experiencia;

            // Save the updated document back to the database
            perfil.save(function (err, perfil) {
                if (err) {
                    res.status(500).send(err)
                }
                res.send(perfil);
            });
        }
    });
};


exports.updatePerfilAptitudes = function(req, res) {

        if(req.params.admin!='somoslosmaspro'){
            res.status(200).send("No hay permiso");
            return;
        }
        Perfil.findOne({"correo": req.params.correo}, function (err, perfil) {
        // Handle any possible database errors
        if (err) {
            res.status(500).send(err);
        } else {
            // Update each attribute with any possible attribute that may have been submitted in the body of the request
            // If that attribute isn't in the request body, default back to whatever it was before.
            perfil.aptitudes.push(req.body.aptitudes);

            // Save the updated document back to the database
            perfil.save(function (err, perfil) {
                if (err) {
                    res.status(500).send(err)
                }
                res.send(perfil);
            });
        }
    });
};

