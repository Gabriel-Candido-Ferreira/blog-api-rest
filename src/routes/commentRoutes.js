const express = require('express');
const router = express.Router();

const commentController = require('../controllers/commentController');
const { verificarToken } = require('../middleware/authMiddleware');

// Criar comentário em um post específico
router.post('/:postId/comments', verificarToken, commentController.createComment);

// Listar comentários de um post específico
router.get('/:postId/comments', commentController.getCommentsByPost);

// Editar comentário específico
router.put('/comments/:id', verificarToken, commentController.updateComment);

// Deletar comentário específico
router.delete('/comments/:id', verificarToken, commentController.deleteComment);

module.exports = router;
