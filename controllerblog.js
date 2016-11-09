var mongoose = require('mongoose');
var Blog  = mongoose.model('Blog');
var fs = require('fs');
var nodemailer = require('nodemailer');

//#####################################################
//###### Controlador de modulo Ofertas laborales ######
//#####################################################

//GET
exports.findById = function(req, res) {
    Blog.findById(req.params.id, function(err, blog) {
    if(err) {
        return res.send(500,err.message);
    }

    console.log('GET /posts/' + req.params.id);
        res.status(200).jsonp(blog);
    });
};

//GET->
exports.findAllPost = function(req, res){
    Blog.find(function(err, blog){
        if(err){
            res.send(500, err.message);
        }

        console.log('GET /posts');
        res.status(200).jsonp(blog);
    });

};

//GET
exports.findPostsPorCategoria = function(req, res) {
    Blog.find({ 'categorias': req.params.categorias }, function(err, blog) {
        if(err){
            res.send(500, err.message);
        }else{
            console.log('GET /posts/categoria')
            res.status(200).jsonp(blog);
        }
    });

};

//POST
exports.addPost = function(req, res) {
    console.log('POST');
    //console.log(req.body);

    var r = req.body;
    var posts = new Blog({
        "title"               : r.title,
        "autor"               : r.autor,
        "contenido"           : r.contenido,
        "fechapublicacion"    : r.fechapublicacion,
        "categorias"          : r.categorias,
        "tags"                : r.tags,
        "respuestas"          : r.respuestas
    });

    console.log(posts);

    posts.save(function(err, blog) {
        if(err){
            return res.status(500).send( err.message);
        }else {
            res.status(200).jsonp(blog);
        }
    });
};
