const { Router } = require('express');
const { check } = require('express-validator')

const {validarCampos} = require('../middlewares/validarCampos');
const { tareaPost, tareasGet, tareaGet, tareaUpdate, tareaDelete } = require('../controllers/tareas');

const router = Router();


router.post('/',[
    check('titulo', 'El titulo es obligatorio').not().isEmpty(),
    
    check('descripcion', 'El email es obligatorio').not().isEmpty(),
    
    check('completado', 'el valor debe ser true/false en string').isString(),
    
    check('fechaEntrega', 'la fecha de entrega es obligatoria').not().isEmpty(),
    check('fechaEntrega', 'Ingresa una fecha valida').isDate(),
    
    check('comentario', 'Los comentarios deben ser cadena de texto').isString(),
    
    check('responsable', 'el responsable debe ser cadena de texto').isString(),
    
    check('usuarioId', 'el id del usuario es obligatorio').not().isEmpty(),
    check('usuarioId', 'el id del usuario debe ser un numero entero').isInt(),
    validarCampos
], tareaPost)

router.get('/', tareasGet)
router.get('/:id', tareaGet)

router.put('/:id',[
    check('usuarioId', 'No se puede asignar la tarea de un usuario a otro').isEmpty(),
    validarCampos
], tareaUpdate)

router.delete('/:id', tareaDelete)

module.exports = router