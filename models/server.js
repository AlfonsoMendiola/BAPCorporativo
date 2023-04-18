const express = require('express')
const cors = require('cors')

const db = require('../database/config')


class Server{
    
    constructor(){
        this.app = express()
        this.port = process.env.PORT
        
        this.dbConnection()

        this.middlewares()

        this.routes()
    }

    async dbConnection(){
        try {
            await db.authenticate();
            console.log('Conectado correctamente a la base de datos');
        } catch (error) {
            throw new Error(error)
        }
    }

    middlewares(){
        this.app.use( cors() ) //usando cors
        
        //correcto parseo y lectura del body
        this.app.use( express.json() )
        this.app.use( express.urlencoded({extended: true}) )

        this.app.use( express.static('public') ) // directorio publico
    }

    routes(){
        this.app.use('/api/usuarios', require('../routes/usuario'))
        this.app.use('/api/tareas', require('../routes/tareas'))
    }

    listen(){
        this.app.listen(this.port, ()=> {
            console.log(`Corriendo en el puerto: ${this.port}`)
        })
    }
}

module.exports = Server