# 📚 Documentação da API REST

## Base URL
- **Desenvolvimento**: `http://localhost:3000`
- **Produção**: A configurar conforme deploy

---

## 🗂️ Endpoints de Portfolio

### GET /api/portfolio
Obter todas as ações da carteira.

**Resposta (200 OK):**
```json
[
  {
    "_id": "507f1f77bcf86cd799439011",
    "ticker": "MSFT",
    "empresa": "Microsoft",
    "dataDaCompra": "2026-03-01T00:00:00.000Z",
    "quantidade": 20,
    "precoDeCompra": 320,
    "createdAt": "2026-05-22T10:30:00.000Z",
    "updatedAt": "2026-05-22T10:30:00.000Z"
  }
]
```

**Erro (500 Server Error):**
```json
{
  "message": "Database connection error"
}
```

---

### GET /api/portfolio/:id
Obter uma ação específica pelo ID.

**Parâmetro:**
- `id` (string): ObjectId do MongoDB

**Resposta (200 OK):**
```json
{
  "_id": "507f1f77bcf86cd799439011",
  "ticker": "MSFT",
  "empresa": "Microsoft",
  "dataDaCompra": "2026-03-01T00:00:00.000Z",
  "quantidade": 20,
  "precoDeCompra": 320,
  "createdAt": "2026-05-22T10:30:00.000Z",
  "updatedAt": "2026-05-22T10:30:00.000Z"
}
```

**Erro (404 Not Found):**
```json
{
  "message": "Portfolio item not found"
}
```

---

### POST /api/portfolio
Criar uma nova ação na carteira.

**Body (JSON):**
```json
{
  "ticker": "TSLA",
  "empresa": "TESLA",
  "dataDaCompra": "2026-03-20",
  "quantidade": 50,
  "precoDeCompra": 220
}
```

**Resposta (201 Created):**
```json
{
  "_id": "507f1f77bcf86cd799439012",
  "ticker": "TSLA",
  "empresa": "TESLA",
  "dataDaCompra": "2026-03-20T00:00:00.000Z",
  "quantidade": 50,
  "precoDeCompra": 220,
  "createdAt": "2026-05-22T11:00:00.000Z",
  "updatedAt": "2026-05-22T11:00:00.000Z"
}
```

**Erro (400 Bad Request):**
```json
{
  "message": "Validation error: all fields are required"
}
```

---

### PUT /api/portfolio/:id
Atualizar uma ação existente.

**Parâmetro:**
- `id` (string): ObjectId do MongoDB

**Body (JSON):**
```json
{
  "quantidade": 55,
  "precoDeCompra": 225
}
```

**Resposta (200 OK):**
```json
{
  "_id": "507f1f77bcf86cd799439012",
  "ticker": "TSLA",
  "empresa": "TESLA",
  "dataDaCompra": "2026-03-20T00:00:00.000Z",
  "quantidade": 55,
  "precoDeCompra": 225,
  "updatedAt": "2026-05-22T11:30:00.000Z"
}
```

**Erro (404 Not Found):**
```json
{
  "message": "Portfolio item not found"
}
```

---

### DELETE /api/portfolio/:id
Eliminar uma ação da carteira.

**Parâmetro:**
- `id` (string): ObjectId do MongoDB

**Resposta (200 OK):**
```json
{
  "message": "Portfolio item deleted"
}
```

**Erro (404 Not Found):**
```json
{
  "message": "Portfolio item not found"
}
```

---

## 💱 Endpoints de Cotações

### GET /api/stock-price/:ticker
Obter cotação do dia para um ticker.

**Parâmetro:**
- `ticker` (string): Símbolo da ação (ex: MSFT, TSLA)

**Resposta (200 OK):**
```json
{
  "ticker": "MSFT",
  "price": 330,
  "change": 10,
  "changePercent": 3.1
}
```

**Erro (404 Not Found):**
```json
{
  "message": "Stock price not found"
}
```

**Erro (500 Server Error):**
```json
{
  "message": "API rate limit exceeded or invalid ticker"
}
```

---

## 🧪 Exemplos de Uso com cURL

### Listar todas as ações
```bash
curl -X GET http://localhost:3000/api/portfolio
```

### Adicionar uma ação
```bash
curl -X POST http://localhost:3000/api/portfolio \
  -H "Content-Type: application/json" \
  -d '{
    "ticker": "AAPL",
    "empresa": "Apple",
    "dataDaCompra": "2026-04-15",
    "quantidade": 30,
    "precoDeCompra": 150
  }'
```

### Obter cotação
```bash
curl -X GET http://localhost:3000/api/stock-price/MSFT
```

### Atualizar uma ação
```bash
curl -X PUT http://localhost:3000/api/portfolio/507f1f77bcf86cd799439011 \
  -H "Content-Type: application/json" \
  -d '{
    "quantidade": 25,
    "precoDeCompra": 325
  }'
```

### Eliminar uma ação
```bash
curl -X DELETE http://localhost:3000/api/portfolio/507f1f77bcf86cd799439011
```

---

## 🔍 Testando com Postman

1. **Importar Collection:**
   - Criar nova request
   - Configurar método HTTP (GET/POST/PUT/DELETE)
   - Adicionar URL: `http://localhost:3000/api/portfolio`
   - Para POST/PUT, adicionar JSON no Body

2. **Environment Variables:**
   - Host: `http://localhost:3000`
   - Usar em requests: `{{host}}/api/portfolio`

---

## ⚡ Códigos HTTP

| Código | Significado |
|--------|-------------|
| 200 | OK - Requisição bem-sucedida |
| 201 | Created - Recurso criado com sucesso |
| 400 | Bad Request - Dados inválidos |
| 404 | Not Found - Recurso não encontrado |
| 500 | Server Error - Erro no servidor |

---

## 🔐 CORS Configuration

O backend está configurado para aceitar requests de:
- `http://localhost:4200` (frontend desenvolvimento)
- Pode ser estendido em `server.js`

```javascript
const cors = require('cors');
app.use(cors({
  origin: ['http://localhost:4200', 'https://seu-dominio.com'],
  methods: ['GET', 'POST', 'PUT', 'DELETE']
}));
```

---

## 📌 Notas Importantes

1. **Datas**: Usar formato ISO (YYYY-MM-DD ou ISO 8601)
2. **Moeda**: Todos os preços em USD
3. **Taxa de Limite**: Alpha Vantage limita a 5 chamadas/minuto (versão free)
4. **Validação**: Frontend valida, mas API também valida todos os inputs

---

Documentação API v1.0
