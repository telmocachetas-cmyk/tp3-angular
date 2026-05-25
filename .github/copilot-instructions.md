# Instruções de Desenvolvimento - Portfolio Tracker

## Checklist de Conclusão

- [x] Estrutura completa do projeto criada
- [x] Backend API REST com Express e MongoDB
- [x] Frontend Angular com componentes
- [x] Serviços para portfolio e cotações
- [x] Integração com API Alpha Vantage
- [x] Design moderno com Bootstrap
- [x] Funcionalidades CRUD completas
- [x] Documentação README

## Próximos Passos para Instalação

### 1. Backend Setup
```bash
cd backend
npm install
npm start
```

### 2. Frontend Setup
```bash
cd frontend
npm install
npm start
```

### 3. MongoDB Setup
- Certifique-se de que MongoDB está a correr
- Use `mongodb://localhost:27017/portfolio`

## Tecnologias Utilizadas

- **Frontend**: Angular 15, TypeScript, Bootstrap 5
- **Backend**: Node.js, Express, MongoDB
- **APIs**: Alpha Vantage para cotações

## Estrutura de Dados - MongoDB

Collection: `portfolios`
```
{
  _id: ObjectId,
  ticker: String,
  empresa: String,
  dataDaCompra: Date,
  quantidade: Number,
  precoDeCompra: Number,
  createdAt: Date,
  updatedAt: Date
}
```

## Requisitos Cumpridos

✅ Apresentação de carteira em tabela  
✅ Cálculos corretos e totalizações  
✅ Cotações em tempo real via API  
✅ Base de dados MongoDB  
✅ Cores dinâmicas (variações)  
✅ Interface moderna e intuitiva  
✅ Tecnologias solicitadas (Angular + API REST)
