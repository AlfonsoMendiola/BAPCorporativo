const { DataTypes, Sequelize } = require("sequelize");
const db = require('../database/config');
//const Usuario = require("./usuario");


const Tarea = db.define('Tarea',{
    titulo: {type: DataTypes.STRING},
    descripcion: {type: DataTypes.STRING},
    completado: {type: DataTypes.STRING, defaultValue:'false'},
    fechaEntrega:{type: DataTypes.DATE},
    comentario: {type: DataTypes.STRING},
    responsable: {type: DataTypes.STRING},
    usuarioId: {type: DataTypes.UUID}
})

//Tarea.belongsTo(Usuario)


module.exports = Tarea