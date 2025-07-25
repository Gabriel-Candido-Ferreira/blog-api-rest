const express = require('express');
const router = express.Router();

const authController = require('../controllers/authController');
const validateUser = require('../middleware/validateUser');
const { verificarToken, verificarAdmin } = require('../middleware/authMiddleware');

router.post('/register', validateUser, authController.register);
router.post('/login', authController.login);

router.get('/users', verificarToken, verificarAdmin, authController.listarUsuarios);
router.delete('/users/:id', verificarToken, verificarAdmin, authController.deletarUsuario);
router.patch('/promover/:id', verificarToken, verificarAdmin, authController.promoverUsuario);

module.exports = router;
