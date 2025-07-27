
---

```markdown
# 📦 API de Autenticação, Posts e Comentários

Esta é uma API RESTful desenvolvida como parte de um teste técnico. A aplicação permite o registro e autenticação de usuários, criação de posts e comentários, além de funcionalidades administrativas.

---

## 🚀 Tecnologias Utilizadas

- Node.js + Express
- MongoDB
- PostgreSQL
- JWT para autenticação
- Docker + Docker Compose
- pgAdmin
- Swagger para documentação da API

---

## 📁 Estrutura do Projeto

```

├── docker-compose.yml
├── Dockerfile
├── LICENSE
├── package.json
├── package-lock.json
├── README.md
├── server.js
└── src
├── config
│   ├── config.js
│   ├── db.js
│   └── swagger.js
├── controllers
│   ├── authController.js
│   ├── commentController.js
│   └── postController.js
├── middleware
│   ├── authMiddleware.js
│   └── validateUser.js
├── models
│   ├── Comment.js
│   ├── index.js
│   ├── Post.js
│   └── User.js
└── routes
├── authRoutes.js
├── commentRoutes.js
└── postRoutes.js

````

---

## ⚙️ Como Executar

1. **Clone o repositório:**

```bash
git clone https://github.com/seu-usuario/seu-repositorio.git
cd seu-repositorio
````

2. **Configure as variáveis de ambiente:**

Crie um arquivo `.env` na raiz do projeto com suas credenciais e conexões (MongoDB, PostgreSQL, JWT, etc.).

> ⚠️ As variáveis de ambiente **não foram incluídas** neste repositório por segurança. Use o arquivo `.env.example` como base.

3. **Execute com Docker Compose:**

```bash
docker-compose up --build
```

A API estará disponível em: [http://localhost:3000](http://localhost:3000)

---

## 📄 Documentação Swagger

Acesse a documentação da API para explorar os endpoints:

👉 [http://localhost:3000/api-docs](http://localhost:3000/api-docs)

---

## ✅ Endpoints Principais

### 🔐 Auth — Autenticação e Usuários

| Método | Rota                     | Descrição                          |
| ------ | ------------------------ | ---------------------------------- |
| POST   | `/api/auth/login`        | Realiza login do usuário           |
| POST   | `/api/auth/register`     | Registra um novo usuário           |
| GET    | `/api/auth/users`        | Lista todos os usuários (admin)    |
| DELETE | `/api/auth/users/{id}`   | Remove usuário pelo ID (admin)     |
| PATCH  | `/api/auth/promote/{id}` | Promove um usuário a admin (admin) |

---

### 💬 Comments — Gerenciamento de Comentários

| Método | Rota                           | Descrição                       |
| ------ | ------------------------------ | ------------------------------- |
| POST   | `/api/posts/{postId}/comments` | Cria um comentário para um post |
| GET    | `/api/posts/{postId}/comments` | Lista comentários de um post    |
| PUT    | `/api/posts/comments/{id}`     | Atualiza um comentário pelo ID  |
| DELETE | `/api/posts/comments/{id}`     | Remove um comentário pelo ID    |

---

### 📝 Posts — Gerenciamento de Posts

| Método | Rota              | Descrição                |
| ------ | ----------------- | ------------------------ |
| POST   | `/api/posts`      | Cria um novo post        |
| GET    | `/api/posts`      | Retorna todos os posts   |
| GET    | `/api/posts/{id}` | Retorna um post pelo ID  |
| PUT    | `/api/posts/{id}` | Atualiza um post pelo ID |
| DELETE | `/api/posts/{id}` | Remove um post pelo ID   |

---

## 🧰 pgAdmin

* Acesse: [http://localhost](http://localhost)
* Utilize o email e senha definidos no seu `.env`
* Para se conectar ao PostgreSQL:

  * **Host:** `meu-postgres`
  * **Porta:** `5432`

---

## ✅ Finalizando

Para encerrar a aplicação:

```bash
docker-compose down
```

---

## 📄 Licença

MIT

```

---

Se quiser, posso gerar esse conteúdo como um arquivo `.md` para download ou já pronto para subir no GitHub. Deseja que eu faça isso?
```
