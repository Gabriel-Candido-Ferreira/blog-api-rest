const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.register = async (req, res) => {
  try {
    const { nome, username, senha } = req.body;

    const usuarioExistente = await User.findOne({ username });
    if (usuarioExistente) {
      return res.status(400).json({ message: 'Username já está em uso.' });
    }

    const hashSenha = await bcrypt.hash(senha, 10);
    const novoUsuario = new User({ nome, username, senha: hashSenha });

    await novoUsuario.save();
    res.status(201).json({ message: 'Usuário registrado com sucesso.' });
  } catch (error) {
    res.status(500).json({ message: 'Erro no servidor', error });
  }
};

exports.login = async (req, res) => {
  try {
    const { username, senha } = req.body;

    const usuario = await User.findOne({ username });
    if (!usuario) {
      return res.status(401).json({ message: 'Credenciais inválidas.' });
    }

    const senhaValida = await bcrypt.compare(senha, usuario.senha);
    if (!senhaValida) {
      return res.status(401).json({ message: 'Credenciais inválidas.' });
    }

    const token = jwt.sign(
      { userId: usuario._id, username: usuario.username, admin: usuario.admin},
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES }
    );

    res.status(200).json({ token });
  } catch (error) {
    res.status(500).json({ message: 'Erro no login', error });
  }
};

exports.promoverUsuario = async (req, res) => {
  try {
    const userId = req.params.id;

    const usuario = await User.findById(userId);
    if (!usuario) {
      return res.status(404).json({ message: 'Usuário não encontrado.' });
    }

    if (usuario.admin) {
      return res.status(400).json({ message: 'Usuário já é administrador.' });
    }

    usuario.admin = true;
    await usuario.save();

    res.status(200).json({ message: 'Usuário promovido a administrador com sucesso.' });
  } catch (error) {
    res.status(500).json({ message: 'Erro ao promover usuário.', error });
  }
};

exports.listarUsuarios = async (req, res) => {
  try {
    const usuarios = await User.find().select('-senha');
    res.status(200).json(usuarios);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao listar usuários.', error });
  }
};

exports.deletarUsuario = async (req, res) => {
  try {
    const userId = req.params.id;

    if (req.user.userId === userId) {
      return res.status(400).json({ message: 'Admin não pode deletar a si mesmo.' });
    }

    const usuario = await User.findByIdAndDelete(userId);
    if (!usuario) {
      return res.status(404).json({ message: 'Usuário não encontrado.' });
    }

    res.status(200).json({ message: 'Usuário deletado com sucesso.' });
  } catch (error) {
    res.status(500).json({ message: 'Erro ao deletar usuário.', error });
  }
};