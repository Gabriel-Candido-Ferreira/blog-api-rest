const express = require('express');
const router = express.Router();
const {verificarToken} = require('../middleware/authMiddleware'); 
const postController = require('../controllers/postController');

/**
 * @swagger
 * tags:
 *   name: Posts
 *   description: Endpoints para gerenciamento de posts
 */

/**
 * @swagger
 * /api/posts:
 *   post:
 *     summary: Cria um novo post
 *     tags: [Posts]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       201:
 *         description: Post criado com sucesso
 *       401:
 *         description: Não autorizado
 */
router.post('/', verificarToken, postController.createPost);

/**
 * @swagger
 * /api/posts:
 *   get:
 *     summary: Retorna todos os posts
 *     tags: [Posts]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de posts
 *       401:
 *         description: Não autorizado
 */
router.get('/', verificarToken, postController.getAllPosts);

/**
 * @swagger
 * /api/posts/{id}:
 *   get:
 *     summary: Retorna um post pelo ID
 *     tags: [Posts]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID do post
 *     responses:
 *       200:
 *         description: Post encontrado
 *       404:
 *         description: Post não encontrado
 *       401:
 *         description: Não autorizado
 */
router.get('/:id', verificarToken, postController.getPostById);

/**
 * @swagger
 * /api/posts/{id}:
 *   put:
 *     summary: Atualiza um post pelo ID
 *     tags: [Posts]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID do post a ser atualizado
 *     responses:
 *       200:
 *         description: Post atualizado com sucesso
 *       404:
 *         description: Post não encontrado
 *       401:
 *         description: Não autorizado
 */
router.put('/:id', verificarToken, postController.updatePost);

/**
 * @swagger
 * /api/posts/{id}:
 *   delete:
 *     summary: Remove um post pelo ID
 *     tags: [Posts]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID do post a ser removido
 *     responses:
 *       200:
 *         description: Post removido com sucesso
 *       404:
 *         description: Post não encontrado
 *       401:
 *         description: Não autorizado
 */
router.delete('/:id', verificarToken, postController.deletePost);


module.exports = router;
