require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const sequelize = require('./src/config/db'); 
const bcrypt = require('bcryptjs');
const User = require('./src/models/User');

const authRoutes = require('./src/routes/authRoutes');
const postRoutes = require('./src/routes/postRoutes'); 
const commentRoutes = require('./src/routes/commentRoutes');

const { swaggerUi, swaggerSpec } = require('./src/config/swagger');

const app = express();
app.use(express.json());
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.get('/', (req, res) => {
  res.send('API rodando!');
});

app.use('/api/auth', authRoutes);
app.use('/api/posts', postRoutes); 
app.use('/api/posts', commentRoutes);

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
    console.log('PostgreSQL conectado');

    await sequelize.sync({ alter: true });
    console.log('Tabelas sincronizadas no PostgreSQL');

    await criarAdminPadrao();

    app.listen(process.env.PORT, () => {
      console.log(`Servidor rodando na porta ${process.env.PORT}`);
      console.log(`Documentação Swagger disponível em http://localhost:${process.env.PORT}/api-docs`);
    });
  } catch (err) {
    console.error('Erro na inicialização:', err);
  }
}

startServer();
