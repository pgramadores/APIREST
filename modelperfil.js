var mongoose = require( 'mongoose' ),
    Schema   = mongoose.Schema;

//#####################################################
//######## Esquema de modulo Perfil ###################
//#####################################################

var perfilSchema = new Schema({
    correo: { type: String },
    nombrecompleto: { type: String },
    password: { type: String },
    foto: { type: String },
    bio: { type: String },
    redessociales: { type: Array },
    aptitudes: { type: Array },
    experiencias: { type: Array }
});

module.exports = mongoose.model('Perfil', perfilSchema);
