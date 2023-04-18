const { Router } = require('express');
const { check } = require('express-validator')

const {validarCampos} = require('../middlewares/validarCampos');
const { usuarioPost } = require('../controllers/usuario');

const router = Router();


router.post('/',[
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('email', 'El email es obligatorio').not().isEmpty(),
    check('email', 'El email es invalido').isEmail(),
    check('pass', 'La pass es obligatoria').not().isEmpty(),
    validarCampos
], usuarioPost)

module.exports = router