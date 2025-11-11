# 🧠 Toughts

**Toughts** é uma aplicação web desenvolvida com **Node.js** e **Express** que permite aos usuários **compartilhar seus pensamentos** e interagir em um ambiente simples e intuitivo.  
O projeto foi criado com o objetivo de **praticar conceitos fundamentais de back-end com Express, Sequelize e MySQL**, além de integração com autenticação e templates Handlebars.

---

## 🚀 Tecnologias Utilizadas

- **Node.js** — Ambiente de execução JavaScript  
- **Express** — Framework web para criação de rotas e middlewares  
- **Sequelize** — ORM para manipulação do banco de dados MySQL  
- **Handlebars** — Template engine para renderização dinâmica de páginas  
- **bcryptjs** — Criptografia de senhas de usuários  
- **express-flash** — Exibição de mensagens temporárias (feedbacks ao usuário)  
- **express-session** — Gerenciamento de sessões de autenticação  
- **nodemon** — Atualização automática em ambiente de desenvolvimento  

---

## 🧩 Estrutura do Projeto

```bash
📦 toughts
┣ 📂controllers        # Lógica de controle das rotas
┃ ┣ 📜AuthController.js
┃ ┗ 📜ToughtController.js
┣ 📂db                 # Configuração de conexão com o banco de dados
┃ ┗ 📜conn.js
┣ 📂helpers            # Funções auxiliares (ex: autenticação)
┃ ┗ 📜auth.js
┣ 📂models             # Modelos Sequelize (entidades do banco)
┃ ┣ 📜Tought.js
┃ ┗ 📜User.js
┣ 📂public             # Arquivos estáticos (CSS, imagens, etc.)
┃ ┣ 📂css
┃ ┃ ┗ 📜style.css
┃ ┗ 📂img
┃   ┣ 📜favicon.ico
┃   ┗ 📜toughts_logo.png
┣ 📂routes             # Definição das rotas da aplicação
┃ ┣ 📜authRoutes.js
┃ ┗ 📜toughtsRoutes.js
┣ 📂sessions           # Armazena sessões do usuário
┣ 📂views              # Páginas renderizadas com Handlebars
┃ ┣ 📂auth
┃ ┃ ┣ 📜login.handlebars
┃ ┃ ┗ 📜register.handlebars
┃ ┣ 📂layouts
┃ ┃ ┗ 📜main.handlebars
┃ ┗ 📂toughts
┃   ┣ 📜create.handlebars
┃   ┣ 📜dashboard.handlebars
┃   ┣ 📜edit.handlebars
┃   ┗ 📜home.handlebars
┣ 📜index.js           # Arquivo principal do servidor
┣ 📜package.json       # Dependências e scripts
┗ 📜README.md
```

## ⚙️ Como Executar o Projeto Localmente

### 🔧 Pré-requisitos

- Node.js instalado (versão 18 ou superior)

- MySQL rodando localmente

- Editor de código (VS Code, IntelliJ, etc.)

### Passos para a execução:

1.  Clonar o repositório
```bash
git clone https://github.com/EliamFuentes/toughts-project
cd toughts
```
2. Instalar dependências 
```bash
npm install
```
3. Configurar o banco de dados
- Crie um banco de dados no MySQL, por exemplo:
```bash
CREATE DATABASE toughts;
```
- Configure a conexão no arquivo db/conn.js

```bash
    const { Sequelize } = require('sequelize');

    const sequelize = new Sequelize('toughts', 'USUARIO', 'SENHA', {
    host: 'localhost',
    dialect: 'mysql'
    });

    module.exports = sequelize;
```

4. Rodar o servidor

```bash
npm start
```
- Servidor será iniciado em:

```bash
    http://localhost:3000
```

## 👥 Funcionalidades

- Cadastro e login de usuários com senhas criptografadas

- Criação, edição e remoção de pensamentos

- Busca de pensamentos por título

- Ordenação dos pensamentos (mais recentes / mais antigos)

- Painel personalizado (dashboard) com os pensamentos do usuário logado

- Sistema de autenticação e sessões com middleware de proteção de rotas

## 🧠 Aprendizados

- Este projeto foi desenvolvido com o objetivo de:

- Praticar o uso de Express e Sequelize;

- Entender o fluxo MVC (Model-View-Controller);

- Implementar autenticação de usuários com bcrypt e sessions;

- Trabalhar com rotas protegidas e mensagens flash;

- Criar templates dinâmicos com Handlebars.