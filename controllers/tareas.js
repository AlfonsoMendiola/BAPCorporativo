const bcryptjs = require('bcryptjs')

const Tarea = require('../models/tarea');
const Usuario = require('../models/usuario');

const tareaPost = async(req, res) => {
    const {body} = req
    try {
        const {dataValues} = await Tarea.create(body)
        
        res.json(dataValues)
    } catch (error) {
        return res.status(500).json({msg: 'Error inesperado', error})
    }
}

//consulta todas las tareas relacionadas a un usuario
const tareasGet = async(req, res) => {
    const usuarioId = req.header('usuarioId')
    try {
        let tareas = await Tarea.findAll({
            where: {usuarioId},
            attributes: { exclude:['usuarioId'] }
        })
        
        res.json(tareas)
    } catch (error) {
        return res.status(500).json({msg: 'Error inesperado', error: `${error}`})
    }
}

const tareaGet = async(req, res) => {
    try {
        let tarea = await Tarea.findByPk(req.params.id)
        if (!tarea) return res.status(500).json({msg: 'no existe esa tarea'})
        tarea = tarea.toJSON()

        let usuarioTarea = await Usuario.findByPk(tarea.usuarioId,{
            attributes: { exclude:['pass'] }
        })
        usuarioTarea.toJSON()
        
        tarea.usuarioId = usuarioTarea

        res.json(tarea)
    } catch (error) {
        return res.status(500).json({msg: 'Error inesperado', error: `${error}`})
    }
}

const tareaUpdate = async(req, res) => {
    const {body} = req
    try {
        const nuevaTarea = await Tarea.update(body,{
            where: {id: req.params.id},
        })
        if(nuevaTarea[0] != 1 ) return res.status(500).json({msg: 'no se pudo actualizar'})
        
        res.json({msg: 'Actualizado correctamente'})
    } catch (error) {
        return res.status(500).json({msg: 'Error inesperado', error: `${error}`})
    }
}

//Borrado fisico
const tareaDelete = async(req, res) => {
    try {
        let tarea = await Tarea.destroy({
            where: {id: req.params.id}
        })
        if(tarea != 1 ) return res.status(500).json({msg: 'ocurrio un error al borrar tarea'})

        res.json({msg: 'Borrado correctamente'})
    } catch (error) {
        return res.status(500).json({msg: 'Error inesperado', error: `${error}`})
    }
}



module.exports = {
    tareaPost,
    tareasGet,
    tareaGet,
    tareaUpdate,
    tareaDelete
}