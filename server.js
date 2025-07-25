require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const sequelize = require('./src/config/database');

const authRoutes = require('./src/routes/authRoutes');
const User = require('./src/models/User');
const bcrypt = require('bcryptjs');

const app = express();
app.use(express.json());

app.get('/', (req, res) => {
  res.send('API rodando!');
});

app.use('/api/auth', authRoutes);

async function criarAdminPadrao() {
  const adminExiste = await User.findOne({ admin: true });
  if (!adminExiste) {
    const senhaHash = await bcrypt.hash('admin123', 10);
    const admin = new User({
      nome: 'Administrador',
      username: 'admin',
      senha: senhaHash,
      admin: true
    });
    await admin.save();
    console.log('Usuário admin padrão criado: username=admin, senha=admin123');
  } else {
    console.log('Usuário admin já existe');
  }
}

async function startServer() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('MongoDB conectado');

    await sequelize.authenticate();
    console.log('Postgres conectado');

    await criarAdminPadrao();

    app.listen(process.env.PORT, () => {
      console.log(`Servidor rodando na porta ${process.env.PORT}`);
    });
  } catch (err) {
    console.error('Erro na inicialização:', err);
  }
}

startServer();
