# 🚀 Guia Completo de Instalação e Uso

## 📋 Pré-requisitos

Antes de começar, certifique-se de que tem instalado:

1. **Node.js** (v16 ou superior)
   - Download: https://nodejs.org/
   - Verificar: `node --version` e `npm --version`

2. **MongoDB**
   - **Opção 1: Local**
     - Download: https://www.mongodb.com/try/download/community
     - Após instalação, MongoDB deve estar a correr na porta 27017
     - Verificar: `mongosh` (shell do MongoDB)
   
   - **Opção 2: Cloud (MongoDB Atlas)**
     - Criar conta em https://www.mongodb.com/cloud/atlas
     - Criar cluster e substituir a conexão em `backend/.env`

3. **Git** (opcional, para clonar o repositório)
   - Download: https://git-scm.com/

## 🔧 Instalação Rápida (Windows)

### Passo 1: Abrir Prompt de Comando
- Pressione `Win + R`
- Digite `cmd` e pressione Enter
- Navegue até a pasta do projeto

### Passo 2: Executar Script de Setup
```bash
setup.bat
```

Este script irá:
- ✅ Instalar todas as dependências do backend
- ✅ Instalar todas as dependências do frontend
- ✅ Popular a base de dados com dados de exemplo

### Passo 3: Iniciar a Aplicação

**Terminal 1 - Backend (API):**
```bash
cd backend
npm start
```
Deve ver: `Server running on port 3000`

**Terminal 2 - Frontend (Interface):**
```bash
cd frontend
npm start
```
Deve ver: `Application bundle generated successfully` e a aplicação abre em `http://localhost:4200`

---

## 🔧 Instalação Rápida (Mac/Linux)

### Passo 1: Abrir Terminal
- Navegue até a pasta do projeto

### Passo 2: Executar Script de Setup
```bash
chmod +x setup.sh
./setup.sh
```

### Passo 3: Iniciar a Aplicação

**Terminal 1 - Backend:**
```bash
cd backend
npm start
```

**Terminal 2 - Frontend:**
```bash
cd frontend
npm start
```

---

## 📦 Instalação Manual (Se o script falhar)

### 1. Instalar Backend

```bash
cd backend

# Instalar dependências
npm install

# Popular base de dados com dados de exemplo
node seed.js

# Iniciar servidor
npm start
```

### 2. Instalar Frontend

```bash
cd frontend

# Instalar dependências
npm install

# Iniciar servidor de desenvolvimento
npm start
```

---

## 🗄️ Configurar MongoDB

### Opção 1: MongoDB Local

1. **Instalar MongoDB Community Edition**
   - Windows: https://docs.mongodb.com/manual/tutorial/install-mongodb-on-windows/
   - Mac: `brew install mongodb-community`
   - Linux: Seguir documentação oficial

2. **Iniciar MongoDB**
   - Windows: `mongod` (a partir de `Program Files\MongoDB\Server\bin`)
   - Mac/Linux: `brew services start mongodb-community` ou `mongod`

3. **Verificar Conexão**
   - Abra `mongosh` (shell do MongoDB)
   - Deve conectar automaticamente a `mongodb://localhost:27017`

### Opção 2: MongoDB Atlas (Cloud)

1. Criar conta em https://www.mongodb.com/cloud/atlas
2. Criar um novo cluster
3. Obter string de conexão
4. Atualizar `backend/.env`:
   ```
   MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/portfolio
   ```

---

## 🧪 Testar a Aplicação

### Dados de Exemplo
Após executar `node seed.js`, a base de dados contém:
- MSFT (Microsoft) - 20 ações @ $320
- TSLA (Tesla) - 50 ações @ $220
- AAPL (Apple) - 30 ações @ $150
- GOOGL (Alphabet) - 15 ações @ $2800

### Funcionalidades para Testar

1. **Visualizar Carteira**
   - A tabela deve mostrar todas as ações com cotações atualizadas

2. **Adicionar Ação**
   - Preencher formulário com: Ticker, Empresa, Data, Quantidade, Preço
   - Clicar "Adicionar Ação"
   - Deve aparecer na tabela

3. **Atualizar Cotações**
   - Clicar botão "🔄 Atualizar Cotações"
   - Deve buscar novos preços da API

4. **Eliminar Ação**
   - Clicar ícone 🗑️ em qualquer linha
   - Confirmar eliminação
   - Ação deve desaparecer

5. **Verificar Cálculos**
   - Variações em % devem estar corretas
   - Cores devem mudar: verde (positivo), vermelho (negativo)

---

## 🐛 Solução de Problemas

### Erro: "MongoDB connection refused"
**Solução:**
- Certifique-se de que MongoDB está a correr
- Verifique se está na porta 27017
- Reinicie o MongoDB

### Erro: "API connection failed" no Frontend
**Solução:**
- Verifique se o backend está a correr (`npm start` na pasta backend)
- Verifique se está na porta 3000
- Reinicie o backend

### Erro: "Cannot find module" ao instalar
**Solução:**
```bash
# Limpar cache do npm
npm cache clean --force

# Reinstalar dependências
rm -rf node_modules package-lock.json
npm install
```

### Port 4200 já está em uso (Frontend)
**Solução:**
```bash
ng serve --port 4300
```

### Port 3000 já está em uso (Backend)
**Solução:**
- Editar `backend/.env` e alterar `PORT=3001`

---

## 🔑 API Alpha Vantage

A chave API já está configurada em `backend/.env`:
```
ALPHA_VANTAGE_API_KEY=THJ04IZ8CUTPNTEF
```

⚠️ **Limite de Chamadas:**
- Versão free: 5 chamadas/minuto
- Se atingir o limite, aguarde 1 minuto

---

## 📁 Estrutura do Projeto

```
TP3_Angular/
├── backend/
│   ├── server.js          # Servidor Express
│   ├── seed.js            # Script para popular BD
│   ├── package.json       # Dependências
│   └── .env               # Configuração
├── frontend/
│   ├── src/
│   │   ├── app/           # Componentes Angular
│   │   ├── styles.css     # Estilos globais
│   │   └── main.ts        # Ponto de entrada
│   ├── angular.json       # Config Angular
│   └── package.json       # Dependências
├── README.md              # Documentação principal
└── setup.bat/sh           # Scripts de setup
```

---

## 📚 Endpoints da API

### Portfolio
- `GET /api/portfolio` - Obter todas as ações
- `POST /api/portfolio` - Adicionar ação
- `PUT /api/portfolio/:id` - Atualizar ação
- `DELETE /api/portfolio/:id` - Eliminar ação

### Cotações
- `GET /api/stock-price/:ticker` - Cotação do ticker

---

## ✅ Verificação Final

Após a instalação, pode testar tudo com:

1. **Backend funcionando:**
   - Abra `http://localhost:3000/api/portfolio`
   - Deve retornar JSON com os dados

2. **Frontend funcionando:**
   - Aceda a `http://localhost:4200`
   - Deve ver a tabela com as ações

3. **MongoDB funcionando:**
   - Abra `mongosh`
   - Digite `use portfolio` e depois `db.portfolios.find()`
   - Deve ver os documentos

---

## 🎉 Pronto!

A aplicação está agora totalmente funcional. Pode:
- ✅ Ver a carteira com cotações em tempo real
- ✅ Adicionar e remover ações
- ✅ Ver variações calculadas automaticamente
- ✅ Persistir dados em MongoDB

Enjoy! 🚀
