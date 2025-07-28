# 📦 API de Autenticação, Posts e Comentários

Esta é uma API RESTful desenvolvida como parte de um teste técnico. A aplicação permite o registro e autenticação de usuários, criação de posts e comentários, além de funcionalidades administrativas.

---

## 🚀 Tecnologias Utilizadas

* Node.js + Express  
* MongoDB  
* PostgreSQL  
* JWT para autenticação  
* Docker + Docker Compose  
* pgAdmin  
* Swagger para documentação da API

---

## 🔧 Versões e Dependências

* Docker Compose: v2.38.2  
* Node.js: v22.17.1  
* MongoDB (container): 8.0.12  
* PostgreSQL (container): 17.5  

---

## ⚙️ Pré-requisitos

* Docker  
* Docker Compose  
* Git  

---

## 📁 Estrutura do Projeto

```plaintext
.
├── docker-compose.yml
├── Dockerfile
├── LICENSE
├── package.json
├── package-lock.json
├── README.md
├── .env                   # ⚠️ Incluído apenas para facilitar testes locais
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

### 1. Clone o repositório e entre na pasta

Escolha uma das opções:

**Via SSH:**

```bash
git clone git@github.com:Gabriel-Candido-Ferreira/blog-api-rest.git
cd blog-api-rest
```

**Ou via HTTPS:**

```bash
git clone https://github.com/Gabriel-Candido-Ferreira/blog-api-rest.git
cd blog-api-rest
```

---

### 2. Verifique se as portas estão disponíveis

Os serviços utilizam as seguintes portas:

| Serviço    | Porta |
| ---------- | ----- |
| Node.js    | 3000  |
| MongoDB    | 27017 |
| PostgreSQL | 5432  |
| pgAdmin    | 80    |

Para verificar se uma porta está em uso:

```bash
sudo lsof -i :5432       # Substitua pela porta desejada
```

Para encerrar um serviço que esteja em uso (exemplo com PostgreSQL local):

```bash
sudo systemctl stop postgresql
```

Você também pode alterar as portas no `docker-compose.yml` conforme sua necessidade.

---

### 3. Configure as variáveis de ambiente

Um arquivo `.env` já está incluído neste repositório **apenas para facilitar os testes locais**.
Verifique se os valores estão adequados:

```env
MONGO_URI=mongodb://meu-mongo:27017/authdb
JWT_SECRET=...
JWT_EXPIRES=1h
PORT=3000

DB_HOST=meu-postgres
DB_USER=seu_usuario
DB_PASSWORD=sua_senha
DB_NAME=blogapi
DB_PORT=5432

PGADMIN_DEFAULT_EMAIL=admin@admin.com
PGADMIN_DEFAULT_PASSWORD=admin

POSTGRES_USER=...
POSTGRES_PASSWORD=...
POSTGRES_DB=blogapi
```

---

### 4. Suba os containers com Docker Compose

```bash
docker-compose up --build
```

A API estará disponível em: [http://localhost:3000](http://localhost:3000)

---

### ⚠️ Importante: alteração de portas

Se você modificar as portas no `docker-compose.yml`, certifique-se de revisar também o `.env`.

#### Exemplos:

**Caso altere no `docker-compose.yml`:**

```yaml
ports:
  - "3001:3000"
```

**Acesso local:** `http://localhost:3001`
**No `.env`:** pode manter `PORT=3000` (pois é a porta interna usada pelo Express)

---

## 👤 Usuário Admin Padrão para Testes

Ao iniciar a aplicação, o sistema cria automaticamente um usuário administrador padrão para facilitar os testes iniciais.
As credenciais são:

* **Usuário:** `admin`
* **Senha:** `admin123`

Esse usuário possui permissão administrativa total.

---

## 📄 Documentação Swagger

Acesse a documentação da API:

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
* Utilize o e-mail e senha definidos no `.env`
* Para se conectar ao PostgreSQL:

  * **Host:** `meu-postgres`
  * **Porta:** `5432`
  * **Usuário e senha:** conforme definidos no `.env`

---

## ✅ Finalizando

Para encerrar a aplicação:

```bash
docker-compose down
```

---
