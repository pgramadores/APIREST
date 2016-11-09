var mongoose = require('mongoose'),
    Schema   = mongoose.Schema;

//#####################################################
//######## Esquema de modulo Blog ####################
//#####################################################

var blogSchema = new Schema({
    titulo: {type: String},
    autor: {type: String},
    contenido: {type: String},
    fechapublicacion: {type: Date},
    categorias: {type: String, enum:['Comunicación', 'Internet', 'Marketing', 'Multimedia', 'Ocio', 'Productividad', 'Programación y Diseño', 'Web Social']},
    tags: {type: String},
    respuestas: {type: Array}
});

module.exports = mongoose.model('Blog', blogSchema);
