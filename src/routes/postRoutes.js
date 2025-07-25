const express = require('express');
const router = express.Router();
const {verificarToken} = require('../middleware/authMiddleware'); 
const postController = require('../controllers/postController');

router.post('/create', verificarToken, postController.createPost);
router.get('/', verificarToken, postController.getAllPosts);
router.put('/:id', verificarToken, postController.updatePost);
router.delete('/:id', verificarToken, postController.deletePost);
router.get('/:id', verificarToken, postController.getPostById);

module.exports = router;
