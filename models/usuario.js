const { DataTypes } = require("sequelize");
const db = require('../database/config');
//const Tarea = require("./tarea");

const Usuario = db.define('Usuario',{
    nombre: {type: DataTypes.STRING},
    email: {type: DataTypes.STRING},
    pass: {type: DataTypes.STRING},
})

//Usuario.hasMany(Tarea)


module.exports = Usuario