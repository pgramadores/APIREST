var mongoose = require('mongoose'),
    Schema   = mongoose.Schema;

//#####################################################
//######## Esquema de modulo Foros ####################
//#####################################################

var forosSchema = new Schema({
    nombrecompleto: {type: String},
    correo: {type: String},
    preguntas: {type: String},
    fechapublicacion: {type: Date},
    tipotopico: {type: String, enum:['php', 'php framework', 'php', 'jsp', 'java EE', 'java desktop', 'C#', 'Visual Basic', 'asp']},
    respuestas: {type: Array}
});

module.exports = mongoose.model('Foros', forosSchema);
