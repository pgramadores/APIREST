var mongoose = require('mongoose'),
    Schema   = mongoose.Schema;

//#####################################################
//######## Esquema de modulo Ofertas laborales ########
//#####################################################

var ofertasSchema = new Schema({
    cargo:  { type: String },
    publicador: {type: String },
    correopublicador: {type: String },
    categoria: {type: String, enum:['Desarrollo','Redes','Arquitectura','Administración','Seguridad','Diseño','Otro']},
    sueldo:   { type: Number },
    tipocontrato: {type: String, enum:['Plazo fijo', 'Proyecto', 'Indefinido', 'Otro']},
    modalidadtrabajo: {type: String, enum:['Part-Time','Full Time','Otro']},
    descripciongeneral: {type: String },
    beneficiosventajas : {type: String },
    requisitos: {type: String },
    pais:{ type: String },
    imagen: { type: String },
    fechacreacion: {type: Date },
    fechatermino: {type: Date },
    estado:{ type: Boolean },
    postulaciones: {type: Array }
});

module.exports = mongoose.model('Ofertas', ofertasSchema);
