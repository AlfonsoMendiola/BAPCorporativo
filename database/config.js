const {Sequelize} = require('sequelize')

const db = new Sequelize('bapexamen', 'root', '', {
    host: 'localhost',
    dialect: 'mysql',
    // logging para mostrar o no las consultas sql en terminal
    logging: false
})

module.exports = db