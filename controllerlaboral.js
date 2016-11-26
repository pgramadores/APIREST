var mongoose = require('mongoose');
var Ofer  = mongoose.model('Ofertas');
var fs = require('fs');
var nodemailer = require('nodemailer');

//#####################################################
//###### Controlador de modulo Ofertas laborales ######
//#####################################################

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

    var options = {
        ignoreTLS: true,
        host: "mail.raicerk.cl",
        port: 25,
        //secure: true, // use SSL
        auth: {
            user: 'jvmora@raicerk.cl',
            pass: 'r042581796r'
       }
    };

    var smtpTransport = require('nodemailer-smtp-transport');
    var transporter = nodemailer.createTransport(smtpTransport(options));


    var mailOptions = {
        from: '"Pro-Gramadores 👥" <no-reply@pro-gramadores.org>', // sender address
        to: 'raicerk@gmail.com', // list of receivers
        subject: 'Postulación laboral', // Subject line
        text: '', // plaintext body
        html: '<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd"><html xmlns="http://www.w3.org/1999/xhtml"><head><meta name="viewport" content="width=device-width" /><meta http-equiv="Content-Type" content="text/html; charset=UTF-8" /><title>Postulación laboral</title><style>*,.collapse{padding:0}.btn,.social .soc-btn{text-align:center;font-weight:700}.btn,ul.sidebar li a{text-decoration:none;cursor:pointer}.container,table.footer-wrap{clear:both!important}*{margin:0;font-family:"Helvetica Neue",Helvetica,Helvetica,Arial,sans-serif}img{max-width:100%}body{-webkit-font-smoothing:antialiased;-webkit-text-size-adjust:none;width:100%!important;height:100%}.content table,table.body-wrap,table.footer-wrap,table.head-wrap{width:100%}a{color:#2ba6cb}.btn{color:#FFF;background-color:#666;padding:10px 16px;margin-right:10px;display:inline-block}p.callout{padding:15px;background-color:#ecf8ff;margin-bottom:15px}.callout a{font-weight:700;color:#2ba6cb}table.social{background-color:#ebebeb}.social .soc-btn{padding:3px 7px;font-size:12px;margin-bottom:10px;text-decoration:none;color:#FFF;display:block}a.fb{background-color:#3B5998!important}a.tw{background-color:#1daced!important}a.gp{background-color:#DB4A39!important}a.ms{background-color:#000!important}.sidebar .soc-btn{display:block;width:100%}.header.container table td.logo{padding:15px}.header.container table td.label{padding:15px 15px 15px 0}.footer-wrap .container td.content p{border-top:1px solid #d7d7d7;padding-top:15px;font-size:10px;font-weight:700}h1,h2{font-weight:200}h1,h2,h3,h4,h5,h6{font-family:HelveticaNeue-Light,"Helvetica Neue Light","Helvetica Neue",Helvetica,Arial,"Lucida Grande",sans-serif;line-height:1.1;margin-bottom:15px;color:#000}h1 small,h2 small,h3 small,h4 small,h5 small,h6 small{font-size:60%;color:#6f6f6f;line-height:0;text-transform:none}h1{font-size:44px}h2{font-size:37px}h3,h4{font-weight:500}h3{font-size:27px}h4{font-size:23px}h5,h6{font-weight:900}h5{font-size:17px}h6,p,ul{font-size:14px}h6{text-transform:uppercase;color:#444}.collapse{margin:0!important}p,ul{margin-bottom:10px;font-weight:400;line-height:1.6}p.lead{font-size:17px}p.last{margin-bottom:0}ul li{margin-left:5px;list-style-position:inside}ul.sidebar li,ul.sidebar li a{display:block;margin:0}ul.sidebar{background:#ebebeb;display:block;list-style-type:none}ul.sidebar li a{color:#666;padding:10px 16px;border-bottom:1px solid #777;border-top:1px solid #FFF}.column tr td,.content{padding:15px}ul.sidebar li a.last{border-bottom-width:0}ul.sidebar li a h1,ul.sidebar li a h2,ul.sidebar li a h3,ul.sidebar li a h4,ul.sidebar li a h5,ul.sidebar li a h6,ul.sidebar li a p{margin-bottom:0!important}.container{display:block!important;max-width:600px!important;margin:0 auto!important}.content{max-width:600px;margin:0 auto;display:block}.column{width:300px;float:left}.column-wrap{padding:0!important;margin:0 auto;max-width:600px!important}.column table{width:100%}.social .column{width:280px;min-width:279px;float:left}.clear{display:block;clear:both}@media only screen and (max-width:600px){a[class=btn]{display:block!important;margin-bottom:10px!important;background-image:none!important;margin-right:0!important}div[class=column]{width:auto!important;float:none!important}table.social div[class=column]{width:auto!important}}table.detalle td{padding:5px}</style></head><body bgcolor="#FFFFFF"><table class="head-wrap" bgcolor="#fff"><tr><td></td><td class="header container"><div class="content"><table bgcolor="#fff"><tr><td><img src="data:image/png;base64,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UmVhZHlxyWU8AAADhmlUWHRYTUw6Y29tLmFkb2JlLnhtcAAAAAAAPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4gPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iQWRvYmUgWE1QIENvcmUgNS42LWMxMzIgNzkuMTU5Mjg0LCAyMDE2LzA0LzE5LTEzOjEzOjQwICAgICAgICAiPiA8cmRmOlJERiB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiPiA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtbG5zOnhtcD0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wLyIgeG1wTU06T3JpZ2luYWxEb2N1bWVudElEPSJ4bXAuZGlkOjYzMzczYzBjLTM1YWMtOGE0Ny1hMmM1LWI0MzVjMTg0ODk5NiIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDozMUM3QjNCMjUxNTAxMUU2QTk4NzhERjk0RjUwRUYyMCIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDozMUM3QjNCMTUxNTAxMUU2QTk4NzhERjk0RjUwRUYyMCIgeG1wOkNyZWF0b3JUb29sPSJBZG9iZSBQaG90b3Nob3AgQ0MgMjAxNS41IChXaW5kb3dzKSI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOjczZTE0ZGM1LTQ2YWYtOTI0MC05NWUyLWQyYzQwMDdjYmNlMSIgc3RSZWY6ZG9jdW1lbnRJRD0iYWRvYmU6ZG9jaWQ6cGhvdG9zaG9wOjZmMWI2OTlkLTQwODYtMTFlNi1hMmY5LWFlNWMyMDI1YzI3ZSIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4g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" /></td><td align="right"><h6 class="collapse">Ofertas laborales</h6></td></tr></table></div></td><td></td></tr></table><table class="body-wrap"><tr><td></td><td class="container" bgcolor="#FFFFFF"><div class="content"><table><tr><td><h3>Hola Pro-Gramador</h3><p class="lead">Esta es la copia de la postulación de la oferta laboral publicada en nuestra plataforma.</p><p>Esperamos que te valla excelente en este proceso de postulación que acabas de iniciar.<br><br></p><p><table class="column detalle" width="100%"><tr><td>Oferta</td><td>Desarrollador web fullstack</td></tr><tr><td>Publicador</td><td>Raicerk Incorporated</td></tr><tr><td>Categoria</td><td>Desarrollador web fullstack</td></tr><tr><td>Sueldo</td><td>USD 1900</td></tr><tr><td>Postulante</td><td>Carolina Ramirez</td></tr><tr><td>Fecha / Hora</td><td>2016-11-01/13:51</td></tr><tr><td>Correo</td><td>Pylar24_10@outlook.com</td></tr><tr><td>Teléfono</td><td>+56977058964</td></tr><tr><td>Linkedin</td><td>https://linkedin.com/carolinapilarramirezgonzalez</td></tr><tr><td>Portafolio</td><td>https://github.com/caroluna</td></tr><tr><td>Experiencia</td><td><p>Nisi fugiat velit pariatur ut non esse ad excepteur ipsum proident labore. Consectetur tempor excepteur occaecat adipisicing reprehenderit mollit ullamco Lorem cupidatat quis proident. Commodo eiusmod et exercitation minim cupidatat et irure aliqua aute eu. Irure sit dolore tempor et ullamco do dolore velit aliquip nulla culpa. Lorem dolor deserunt sint qui commodo duis laboris anim ipsum ipsum id deserunt fugiat veniam laborum. Laborum ex dolore cillum elit minim est eiusmod proident deserunt id labore nisi non reprehenderit occaecat qui. Duis commodo excepteur Lorem eiusmod ad magna in aute in velit cupidatat anim reprehenderit reprehenderit. Sunt sint duis dolore est magna officia mollit.</p></td></tr><tr><td>Carta Presentación </td><td><p>Pariatur id culpa sit mollit nostrud sunt culpa. Proident labore adipisicing voluptate officia laborum consequat dolore sit aute pariatur magna culpa eiusmod Lorem ea voluptate sint. Mollit exercitation velit quis anim consequat excepteur occaecat nostrud consectetur.</p><p>Sit magna in tempor aliqua cillum commodo esse sit. Minim id excepteur incididunt irure nostrud excepteur quis deserunt nisi cupidatat est commodo pariatur elit. Esse ullamco laboris aliquip quis irure duis cillum occaecat elit nostrud velit. Nulla eiusmod deserunt officia tempor ad sint dolor commodo id id fugiat fugiat id ullamco voluptate fugiat. Id est mollit et voluptate consequat nisi magna. Minim veniam enim sint consequat laboris et fugiat aute est magna cillum aute nostrud.</p><p>Irure ut id id cillum laboris laboris id minim sint velit commodo in enim nostrud dolore. Non proident non sint sunt excepteur id sint excepteur voluptate fugiat proident elit anim tempor elit adipisicing eu. Pariatur ad in et ad magna adipisicing tempor deserunt. Eu ad laboris mollit consequat nulla nisi non cillum irure. Aliquip est occaecat veniam ad veniam ut cupidatat. Incididunt enim elit sit anim excepteur cillum eiusmod culpa veniam pariatur occaecat culpa occaecat nostrud.</p><p>Ullamco do nisi eiusmod est occaecat elit commodo ullamco reprehenderit commodo ea non eu ad consectetur. Quis labore sunt reprehenderit quis pariatur id culpa aute adipisicing Lorem voluptate commodo esse proident. Anim qui Lorem dolore velit commodo aliqua ipsum eiusmod laboris nisi ullamco. Mollit ea elit irure culpa mollit ex dolore velit aute aute eiusmod.</p></td></tr></table></p><table class="social" width="100%"><tr><td><table align="left" class="column"><tr><td><h5 class="">No te olvides seguirnos en:</h5><p class=""><a href="https://facebook.com/pgramadores" class="soc-btn fb">Facebook</a><a href="https://twitter.com/pgramadores" class="soc-btn tw">Twitter</a><a href="https://plus.google.com/+ProgramadoresBlogspotpgramadores" class="soc-btn gp">Google+</a></p></td></tr></table><table align="left" class="column"><tr><td><h5 class="">Contactanos:</h5><p>Correo: <strong style="font-size:13px"><a href="mailto:laboral@pro-gramadores.org">laboral@pro-gramadores.org</a></strong></p></td></tr></table><span class="clear"></span></td></tr></table></td></tr></table></div></td><td></td></tr></table><table class="footer-wrap"><tr><td></td><td class="container"><div class="content"><table><tr><td align="center"><p><a href="#">Terms</a> |<a href="#">Privacy</a> |<a href="#"><unsubscribe>Unsubscribe</unsubscribe></a></p></td></tr></table></div></td><td></td></tr></table></body></html>' // html body
    };

    transporter.sendMail(mailOptions, function(error, info){
        if(error){
            return console.log(error);
        }
        console.log('Message sent: ' + info.response);
    });



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
