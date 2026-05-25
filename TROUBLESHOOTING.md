# 🔧 Troubleshooting & Resolução de Problemas

## 🚨 Erros Comuns

---

## 1️⃣ Backend não conecta ao MongoDB

### Sintomas
- Erro: `MongooseError: Cannot connect to MongoDB`
- Backend não inicia
- Mensagem: `MongoDB connection error`

### Possíveis Causas
1. MongoDB não está em execução
2. Conexão incorreta em `.env`
3. Firewall bloqueando porta 27017

### Soluções

#### Windows
```bash
# 1. Verificar se MongoDB está a correr
mongosh

# Se não funcionar, instalar MongoDB
# https://docs.mongodb.com/manual/tutorial/install-mongodb-on-windows/

# 2. Iniciar MongoDB manualmente
# Abrir Services (services.msc) e procurar "MongoDB"
# Ou executar em Command Prompt como Administrador:
"C:\Program Files\MongoDB\Server\{version}\bin\mongod.exe"
```

#### Mac
```bash
# Instalar MongoDB via Homebrew
brew tap mongodb/brew
brew install mongodb-community

# Iniciar MongoDB
brew services start mongodb-community

# Verificar
brew services list
```

#### Linux
```bash
# Instalar (Ubuntu/Debian)
sudo apt-get install mongodb-org

# Iniciar
sudo systemctl start mongod

# Verificar status
sudo systemctl status mongod
```

#### Verificar Conexão
```bash
# Abrir shell do MongoDB
mongosh

# Deve conectar automaticamente a mongodb://localhost:27017
# Se bem-sucedido, executar:
use portfolio
db.portfolios.find()
```

#### MongoDB Atlas (Cloud)
Se usar MongoDB Atlas em vez de local:

1. Criar conta em https://www.mongodb.com/cloud/atlas
2. Criar cluster
3. Obter connection string
4. Atualizar `backend/.env`:
   ```
   MONGODB_URI=mongodb+srv://username:password@cluster-name.mongodb.net/portfolio
   ```

---

## 2️⃣ Backend não consegue conectar à API Alpha Vantage

### Sintomas
- Cotações retornam 0
- Erro: `Stock price not found`
- Aviso: `API rate limit exceeded`

### Possíveis Causas
1. Chave API inválida ou expirada
2. Limite de chamadas atingido (5/minuto - versão free)
3. Ticker inválido
4. Falta de conexão à internet

### Soluções

#### Verificar Chave API
```bash
# Em backend/.env
ALPHA_VANTAGE_API_KEY=THJ04IZ8CUTPNTEF

# Testar chamada diretamente:
# https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=MSFT&apikey=THJ04IZ8CUTPNTEF
```

#### Rate Limiting
- Versão free: 5 chamadas/minuto
- **Solução**: Aguardar 60 segundos antes de chamar novamente
- **Upgrade**: Pagar por versão premium ou usar outra API

#### Tickers Válidos
- MSFT (Microsoft)
- TSLA (Tesla)
- AAPL (Apple)
- GOOGL (Alphabet)
- AMZN (Amazon)

---

## 3️⃣ Frontend não conecta ao Backend

### Sintomas
- Tabela vazia ou com erro
- Console mostra: `Failed to fetch http://localhost:3000/api/portfolio`
- Erro CORS

### Possíveis Causas
1. Backend não está a correr
2. Backend na porta diferente de 3000
3. Firewall bloqueando conexão
4. CORS não configurado

### Soluções

#### Verificar Backend
```bash
# Confirmar que backend está a correr
# Tentar aceder em browser:
http://localhost:3000/api/portfolio

# Se retornar JSON = Backend OK
# Se erro de conexão = Backend offline
```

#### Backend na Porta Diferente
```bash
# Se backend está em porta diferente (ex: 3001)
# Editar backend/.env:
PORT=3001

# Frontend encontrará automaticamente via proxy.conf.json
```

#### CORS Error
```javascript
// Se receber erro CORS, confirmar backend tem:
const cors = require('cors');
app.use(cors());

// Ou ser mais específico:
app.use(cors({
  origin: 'http://localhost:4200',
  credentials: true
}));
```

#### Testar Conexão
```bash
# No terminal
curl -X GET http://localhost:3000/api/portfolio

# Deve retornar JSON com dados
```

---

## 4️⃣ Frontend não carrega ou fica em branco

### Sintomas
- Página em branco
- Console mostra erro JavaScript
- Spinner de carregamento infinito

### Possíveis Causas
1. Dependências npm não instaladas
2. Erro de compilação TypeScript
3. Porta 4200 ocupada
4. Cache do browser

### Soluções

#### Reinstalar Dependências
```bash
cd frontend
rm -rf node_modules package-lock.json
npm install

# Em Windows:
rmdir /s /q node_modules
del package-lock.json
npm install
```

#### Verificar Erros de Compilação
```bash
# Ver output do npm start para erros
# Procurar por mensagens em vermelho

# Se houver erro, consultar:
# 1. Sintaxe TypeScript incorreta
# 2. Módulos não importados
# 3. Componentes não declarados em app.module.ts
```

#### Porta 4200 Ocupada
```bash
# Mudar porta
ng serve --port 4300

# Abrir em browser
http://localhost:4300
```

#### Limpar Cache Browser
- Chrome/Edge: `Ctrl + Shift + Delete`
- Firefox: `Ctrl + Shift + Delete`
- Safari: Menu → Develop → Empty Web Storage

---

## 5️⃣ Erro ao adicionar ação (formulário)

### Sintomas
- Botão fica desabilitado
- Mensagem: `Erro ao adicionar ação`
- Ação não aparece na tabela

### Possíveis Causas
1. Formulário com campos vazios
2. Backend respondeu com erro
3. Validação falhou

### Soluções

#### Verificar Validação Frontend
```typescript
// Confirmar que todos os campos estão preenchidos:
// - Ticker: obrigatório
// - Empresa: obrigatório
// - Quantidade: >= 1
// - Preço: >= 0.01
```

#### Verificar Resposta Backend
```bash
# Testar POST manualmente
curl -X POST http://localhost:3000/api/portfolio \
  -H "Content-Type: application/json" \
  -d '{"ticker":"TEST","empresa":"Test","dataDaCompra":"2026-05-22","quantidade":1,"precoDeCompra":100}'

# Deve retornar 201 Created com JSON
```

#### Verificar Browser Console
- Abrir DevTools (F12)
- Aba Network
- Procurar por requests POST falhadas
- Ver resposta completa do servidor

---

## 6️⃣ Cotações não atualizam

### Sintomas
- Botão "Atualizar Cotações" não faz nada
- Spinner fica indefinido
- Preços iguais ao dia anterior

### Possíveis Causas
1. API Alpha Vantage sem resposta
2. Rate limit atingido
3. Conexão internet lenta
4. Ticker inválido

### Soluções

#### Aguardar Rate Limit
```bash
# Versão free tem limite de 5 chamadas/minuto
# Se vir erro, aguardar 60 segundos
# Após aguardar, tentar novamente
```

#### Testar API Diretamente
```bash
# No browser, copiar e colar:
https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=MSFT&apikey=THJ04IZ8CUTPNTEF

# Deve retornar JSON com preço
```

#### Verificar Console do Backend
```bash
# Abrir terminal onde backend está a correr
# Procurar por logs ou erros
# Pode haver "Cannot read property of undefined" etc.
```

---

## 7️⃣ Erro: "Port 4200 already in use"

### Sintomas
- Ao executar `npm start` no frontend
- Mensagem: `Address already in use :::4200`

### Soluções

#### Modo 1: Usar Porta Diferente
```bash
ng serve --port 4300
```

#### Modo 2: Matar Processo
```bash
# Windows - encontrar processo na porta 4200
netstat -ano | findstr :4200

# Depois matar (substitua PID pelo resultado acima)
taskkill /PID <PID> /F

# Mac/Linux
lsof -i :4200
kill -9 <PID>
```

#### Modo 3: Reiniciar Machine
- Última opção
- Fecha todas as portas abertas

---

## 8️⃣ Erro de Mongoose: "validation error"

### Sintomas
- Backend retorna erro 400
- Mensagem: `Validation error: ...`

### Possíveis Causas
1. Campos obrigatórios vazios
2. Tipo de dados incorreto
3. Valores fora de limites

### Soluções

#### Verificar Schema
```javascript
// Em server.js
const portfolioSchema = new mongoose.Schema({
  ticker: String,        // Obrigatório
  empresa: String,       // Obrigatório
  dataDaCompra: Date,    // Obrigatório
  quantidade: Number,    // Obrigatório
  precoDeCompra: Number  // Obrigatório
});
```

#### Enviar Dados Corretos
```json
{
  "ticker": "MSFT",
  "empresa": "Microsoft",
  "dataDaCompra": "2026-03-01",
  "quantidade": 20,
  "precoDeCompra": 320
}
```

---

## 9️⃣ Dados de Seed não aparecem

### Sintomas
- Após `node seed.js`, tabela vazia
- Erro durante seed.js

### Soluções

#### Executar Seed Novamente
```bash
cd backend
node seed.js

# Deve ver mensagem:
# "Sample data inserted successfully!"
```

#### Verificar Dados em MongoDB
```bash
mongosh
use portfolio
db.portfolios.find().pretty()
```

#### Seed Falha por MongoDB
```bash
# Certifique-se MongoDB está a correr
# Depois tente novamente
mongod
# Em outro terminal:
node seed.js
```

---

## 🔟 Performance Lenta

### Sintomas
- Aplicação carrega lento
- Cliques levam tempo a processar
- Muita lag

### Soluções

#### Otimizar MongoDB
```bash
# Criar índices
mongosh
use portfolio
db.portfolios.createIndex({ ticker: 1 })
```

#### Limpar Cache Node
```bash
npm cache clean --force
rm -rf node_modules
npm install
```

#### Verificar Consumo de Recursos
```bash
# Windows Task Manager
# Procurar por Node.js e ng
# Se > 1GB RAM, reiniciar

# Mac/Linux Activity Monitor ou top
```

---

## 📊 Checklist de Diagnóstico

1. ✅ MongoDB está a correr?
   ```bash
   mongosh
   ```

2. ✅ Backend está a correr?
   ```bash
   curl http://localhost:3000/api/portfolio
   ```

3. ✅ Frontend está a correr?
   ```bash
   Abrir http://localhost:4200
   ```

4. ✅ Dados em MongoDB?
   ```bash
   mongosh > use portfolio > db.portfolios.find()
   ```

5. ✅ Console do browser com erros?
   ```bash
   F12 > Console > Procurar por vermelho
   ```

6. ✅ Console do backend com erros?
   ```bash
   Verificar terminal do npm start backend
   ```

---

## 📞 Contacto e Suporte

Se o problema persistir:

1. Verificar **todos** os pontos acima
2. Limpar tudo e reinstalar:
   ```bash
   rm -rf node_modules backend/node_modules frontend/node_modules
   rm package-lock.json backend/package-lock.json frontend/package-lock.json
   npm install
   cd backend && npm install
   cd ../frontend && npm install
   ```

3. Reiniciar a máquina

4. Se ainda não funcionar, procurar na documentação:
   - MongoDB: https://docs.mongodb.com
   - Angular: https://angular.io
   - Express: https://expressjs.com
   - Alpha Vantage: https://www.alphavantage.co

---

Última atualização: Maio 2026
