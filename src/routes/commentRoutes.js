const express = require('express');
const router = express.Router();

const commentController = require('../controllers/commentController');
const { verificarToken } = require('../middleware/authMiddleware');

router.post('/:postId/comments', verificarToken, commentController.createComment);

router.get('/:postId/comments', commentController.getCommentsByPost);

router.put('/comments/:id', verificarToken, commentController.updateComment);

router.delete('/comments/:id', verificarToken, commentController.deleteComment);

module.exports = router;
