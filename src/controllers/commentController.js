const Comment = require('../models/Comment');

exports.createComment = async (req, res) => {
  const { content } = req.body;
  const { postId } = req.params;

  try {
    const comment = await Comment.create({
      content,
      postId,
      userId: req.user.id
    });
    res.status(201).json(comment);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao criar comentário', error });
  }
};

exports.getCommentsByPost = async (req, res) => {
  const { postId } = req.params;

  try {
    const comments = await Comment.findAll({
      where: { postId },
      order: [['createdAt', 'DESC']]
    });
    res.status(200).json(comments);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao buscar comentários', error });
  }
};

exports.updateComment = async (req, res) => {
  const { id } = req.params;
  const { content } = req.body;

  try {
    const comment = await Comment.findByPk(id);

    if (!comment) {
      return res.status(404).json({ message: 'Comentário não encontrado' });
    }

    if (comment.userId !== req.user.id) {
      return res.status(403).json({ message: 'Sem permissão para editar' });
    }

    comment.content = content;
    await comment.save();

    res.status(200).json(comment);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao atualizar comentário', error });
  }
};

exports.deleteComment = async (req, res) => {
  const { id } = req.params;

  try {
    const comment = await Comment.findByPk(id);

    if (!comment) {
      return res.status(404).json({ message: 'Comentário não encontrado' });
    }

    if (comment.userId !== req.user.id) {
      return res.status(403).json({ message: 'Sem permissão para deletar' });
    }

    await comment.destroy();
    res.status(200).json({ message: 'Comentário deletado com sucesso' });
  } catch (error) {
    res.status(500).json({ message: 'Erro ao deletar comentário', error });
  }
};
