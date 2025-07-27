const express = require('express');
const router = express.Router();

const commentController = require('../controllers/commentController');
const { verificarToken } = require('../middleware/authMiddleware');

/**
 * @swagger
 * tags:
 *   name: Comments
 *   description: Endpoints para gerenciamento de comentários
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     CommentInput:
 *       type: object
 *       required:
 *         - content
 *       properties:
 *         content:
 *           type: string
 *           description: Conteúdo do comentário
 *       example:
 *         content: Este é um comentário
 */

/**
 * @swagger
 * /api/posts/{postId}/comments:
 *   post:
 *     summary: Cria um comentário para um post
 *     tags: [Comments]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: postId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID do post
 *     requestBody:
 *       description: Dados do comentário
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CommentInput'
 *     responses:
 *       201:
 *         description: Comentário criado
 *       401:
 *         description: Não autorizado
 */
router.post('/:postId/comments', verificarToken, commentController.createComment);

/**
 * @swagger
 * /api/posts/{postId}/comments:
 *   get:
 *     summary: Lista comentários de um post
 *     tags: [Comments]
 *     parameters:
 *       - in: path
 *         name: postId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID do post
 *     responses:
 *       200:
 *         description: Lista de comentários
 */
router.get('/:postId/comments', commentController.getCommentsByPost);

/**
 * @swagger
 * /api/posts/comments/{id}:
 *   put:
 *     summary: Atualiza um comentário pelo ID
 *     tags: [Comments]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID do comentário
 *     requestBody:
 *       description: Dados para atualizar o comentário
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CommentInput'
 *     responses:
 *       200:
 *         description: Comentário atualizado com sucesso
 *       401:
 *         description: Não autorizado
 *       403:
 *         description: Sem permissão para editar
 *       404:
 *         description: Comentário não encontrado
 */
router.put('/comments/:id', verificarToken, commentController.updateComment);

/**
 * @swagger
 * /api/posts/comments/{id}:
 *   delete:
 *     summary: Remove um comentário pelo ID
 *     tags: [Comments]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID do comentário
 *     responses:
 *       200:
 *         description: Comentário removido com sucesso
 *       401:
 *         description: Não autorizado
 *       403:
 *         description: Sem permissão para deletar
 *       404:
 *         description: Comentário não encontrado
 */
router.delete('/comments/:id', verificarToken, commentController.deleteComment);

module.exports = router;
