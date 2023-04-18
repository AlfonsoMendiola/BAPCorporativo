
const bcryptjs = require('bcryptjs')

const Usuario = require('../models/usuario')

const usuarioPost = async(req, res) => {
    const {body} = req
    try {
        const existeEmail = await Usuario.findOne({
            where: {email: body.email}
        })
        if (existeEmail) return res.status(400).json({msg: `Ya existe un usuario con el email: ${body.email}`})

        //encriptar la contraseña
        body.pass = bcryptjs.hashSync( body.pass, bcryptjs.genSaltSync() )

        const {dataValues} = await Usuario.create(body)
        const {pass, ...usuarioSeguro} = dataValues
        
        res.json(usuarioSeguro)
    } catch (error) {
        return res.status(500).json({msg: 'Error inesperado', error})
    }
}

module.exports = {
    usuarioPost
}