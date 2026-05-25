# 📈 Portfolio Tracker - Aplicação de Monitorização de Carteira de Ações

Uma aplicação web moderna desenvolvida em **Angular** + **TypeScript** com backend **Node.js/Express** e base de dados **MongoDB** para monitorizar uma carteira de ações em tempo real.

## 🎯 Funcionalidades

✅ **Gestão de Carteira**
- Adicionar/remover ações da carteira
- Especificar data de compra, quantidade e preço de compra
- Persistência em MongoDB

✅ **Cotações em Tempo Real**
- Integração com API Alpha Vantage
- Atualização automática de preços
- Cálculos de variação automáticos

✅ **Dashboard Intuitivo**
- Tabela com visualização de dados
- Cores dinâmicas (verde = positivo, vermelho = negativo, preto = neutro)
- Cálculos totais de carteira

✅ **Design Moderno**
- Interface com Bootstrap 5
- Design responsivo (mobile-friendly)
- Gradientes e animações suaves

## 📋 Requisitos Atendidos

1. ✅ Apresentar sumário de carteira numa tabela
2. ✅ Cálculos corretos linha a linha e no total
3. ✅ Cotações do dia via API REST (Alpha Vantage)
4. ✅ Base de dados em MongoDB
5. ✅ Variações com cores (vermelho/verde/preto)
6. ✅ Tecnologias: Angular, TypeScript, API REST
7. ✅ Design apelativo (Bootstrap + CSS personalizado)

## 🛠️ Stack Tecnológico

### Frontend
- **Angular 15** - Framework principal
- **TypeScript** - Linguagem
- **Bootstrap 5** - UI Framework
- **RxJS** - Programação reativa

### Backend
- **Node.js** - Runtime
- **Express.js** - Framework REST
- **MongoDB** - Base de dados
- **Axios** - Cliente HTTP
- **Mongoose** - ODM para MongoDB

### APIs Externas
- **Alpha Vantage** - Cotações de ações em tempo real

## 🚀 Instalação e Execução

### Pré-requisitos
- Node.js (v16+)
- MongoDB (local ou cloud)
- npm

### Backend

```bash
cd backend
npm install
npm start
```

O servidor será executado em `http://localhost:3000`

### Frontend

```bash
cd frontend
npm install
npm start
```

A aplicação será aberta em `http://localhost:4200`

## 📊 Estrutura do Projeto

```
TP3_Angular/
├── backend/
│   ├── server.js          # Servidor principal
│   ├── package.json       # Dependências
│   └── .env               # Variáveis de ambiente
├── frontend/
│   ├── src/
│   │   ├── app/
│   │   │   ├── components/
│   │   │   │   ├── portfolio-table/
│   │   │   │   └── portfolio-form/
│   │   │   ├── services/
│   │   │   │   ├── portfolio.service.ts
│   │   │   │   └── stock-price.service.ts
│   │   │   ├── app.module.ts
│   │   │   ├── app.component.ts
│   │   │   └── app.component.html
│   │   ├── index.html
│   │   ├── styles.css
│   │   └── main.ts
│   ├── angular.json       # Configuração Angular
│   ├── tsconfig.json      # Configuração TypeScript
│   └── package.json       # Dependências
└── README.md
```

## 📚 API REST Endpoints

### Portfolio
- `GET /api/portfolio` - Lista todas as ações
- `GET /api/portfolio/:id` - Obtém uma ação específica
- `POST /api/portfolio` - Adiciona nova ação
- `PUT /api/portfolio/:id` - Atualiza uma ação
- `DELETE /api/portfolio/:id` - Remove uma ação

### Cotações
- `GET /api/stock-price/:ticker` - Obtém cotação do dia para um ticker

## 🎨 Exemplo de Dados

```javascript
{
  ticker: "MSFT",
  empresa: "Microsoft",
  dataDaCompra: "2026-03-01",
  quantidade: 20,
  precoDeCompra: 320.00
}
```

## 🔧 Configuração

### Chave API Alpha Vantage
A chave está configurada em `backend/.env`:
```
ALPHA_VANTAGE_API_KEY=THJ04IZ8CUTPNTEF
```

### MongoDB
Configure a conexão em `backend/.env`:
```
MONGODB_URI=mongodb://localhost:27017/portfolio
```

## 💡 Funcionalidades Extras Implementadas

🎁 **Melhorias Criativas**
- ✨ Animações e transições suaves
- 🔄 Botão de atualização de cotações
- 📱 Interface totalmente responsiva
- 🎨 Gradientes visuais atraentes
- ⚡ Carregamento assíncrono de dados
- 💾 Persistência completa em MongoDB
- 📊 Cálculos matemáticos precisos
- 🗑️ Gestão completa de itens (CRUD)

## 📝 Notas Importantes

1. **MongoDB**: Certifique-se de que MongoDB está a correr localmente ou use um serviço em cloud (MongoDB Atlas)
2. **API Limite**: Alpha Vantage tem limite de chamadas (5 por minuto na versão free)
3. **CORS**: Já está configurado no backend para aceitar requests do frontend

## 📄 Licença

Projeto desenvolvido para fins académicos - TP3 Programação Web II

## 👨‍💻 Autor

Desenvolvido como trabalho prático de Web Programming II
