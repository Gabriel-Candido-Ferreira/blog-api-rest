const { Post } = require('../models');

exports.createPost = async (req, res) => {
  const { title, content } = req.body;
  const userId = req.user.id;

  try {
    const post = await Post.create({ title, content, userId });
    res.status(201).json(post);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao criar post', error });
  }
};

exports.getAllPosts = async (req, res) => {
  try {
    const posts = await Post.findAll();
    res.json(posts);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao buscar posts', error });
  }
};

exports.updatePost = async (req, res) => {
  const { id } = req.params;
  const { title, content } = req.body;

  try {
    const post = await Post.findByPk(id);
    if (!post) return res.status(404).json({ message: 'Post não encontrado' });

    post.title = title;
    post.content = content;
    await post.save();

    res.json(post);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao atualizar post', error });
  }
};

exports.deletePost = async (req, res) => {
  const { id } = req.params;

  try {
    const post = await Post.findByPk(id);
    if (!post) return res.status(404).json({ message: 'Post não encontrado' });

    await post.destroy();
    res.status(204).end();
  } catch (error) {
    res.status(500).json({ message: 'Erro ao deletar post', error });
  }
};

exports.getPostById = async (req, res) => {
  const { id } = req.params;

  try {
    const post = await Post.findByPk(id);
    if (!post) return res.status(404).json({ message: 'Post não encontrado' });

    res.json(post);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao buscar post', error });
  }
};
