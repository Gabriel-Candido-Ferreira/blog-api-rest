module.exports = function validateUser(req, res, next) {
const { nome, username, senha } = req.body;

if (!nome || !username || !senha) {
return res.status(400).json({ message: 'Todos os campos são obrigatórios.' });
}

if (senha.length < 8) {
return res.status(400).json({ message: 'A senha deve ter pelo menos 8 caracteres.' });
}

if (nome.length < 3) {
return res.status(400).json({ message: 'O nome deve ter pelo menos 3 caracteres.' });
}

if (username.length < 3) {
return res.status(400).json({ message: 'O username deve ter pelo menos 3 caracteres.' });
}

next();
}
