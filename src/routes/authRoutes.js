const express = require('express');
const router = express.Router();

const authController = require('../controllers/authController');
const validateUser = require('../middleware/validateUser');
const { verificarToken, verificarAdmin } = require('../middleware/authMiddleware');

/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: Endpoints para autenticação e gerenciamento de usuários
 */

/**
 * @swagger
 * /api/auth/register:
 *   post:
 *     summary: Registra um novo usuário
 *     tags: [Auth]
 *     security: [] 
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               senha:
 *                 type: string
 *             required:
 *               - username
 *               - senha
 *     responses:
 *       201:
 *         description: Usuário registrado com sucesso
 *       400:
 *         description: Dados inválidos
 */
router.post('/register', validateUser, authController.register);


/**
 * @swagger
 * /api/auth/users:
 *   get:
 *     summary: Lista todos os usuários (admin)
 *     tags: [Auth]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de usuários retornada
 *       401:
 *         description: Não autorizado
 */
router.get('/users', verificarToken, verificarAdmin, authController.listarUsuarios);

/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     summary: Realiza login do usuário
 *     tags: [Auth]
 *     security: [] 
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               senha:
 *                 type: string
 *             required:
 *               - username
 *               - senha
 *     responses:
 *       200:
 *         description: Login realizado com sucesso
 *       401:
 *         description: Credenciais inválidas
 */
router.post('/login', authController.login);

/**
 * @swagger
 * /api/auth/users/{id}:
 *   delete:
 *     summary: Remove usuário pelo ID (admin)
 *     tags: [Auth]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID do usuário a ser removido
 *     responses:
 *       200:
 *         description: Usuário removido com sucesso
 *       401:
 *         description: Não autorizado
 */
router.delete('/users/:id', verificarToken, verificarAdmin, authController.deletarUsuario);

/**
 * @swagger
 * /api/auth/promover/{id}:
 *   patch:
 *     summary: Promove um usuário a admin (admin)
 *     tags: [Auth]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID do usuário a ser promovido
 *     responses:
 *       200:
 *         description: Usuário promovido com sucesso
 *       401:
 *         description: Não autorizado
 */
router.patch('/promover/:id', verificarToken, verificarAdmin, authController.promoverUsuario);

module.exports = router;
