# 🏗️ Arquitetura do Projeto

## 📐 Diagrama de Arquitetura

```
┌─────────────────────────────────────────────────────────────┐
│                     Internet / Utilizador                   │
└────────────────────────────┬────────────────────────────────┘
                             │
                    ┌────────▼─────────┐
                    │  Angular App     │
                    │  (localhost:4200)│
                    │  - Components    │
                    │  - Services      │
                    │  - Templates     │
                    └────────┬─────────┘
                             │
                    ┌────────▼──────────┐
                    │  HTTP Requests   │
                    │  REST API        │
                    │  (JSON)          │
                    └────────┬──────────┘
                             │
                    ┌────────▼──────────┐
                    │  Express Server  │
                    │  (localhost:3000)│
                    │  - Routes        │
                    │  - Controllers   │
                    │  - Validation    │
                    └────────┬──────────┘
                             │
           ┌─────────────────┼──────────────────┐
           │                 │                  │
    ┌──────▼───────┐  ┌──────▼──────┐  ┌──────▼─────────┐
    │  MongoDB     │  │  Mongoose   │  │ Alpha Vantage  │
    │  Collection  │  │  ODM        │  │ Stock Prices   │
    │  portfolios  │  │  Models     │  │ API            │
    │              │  │             │  │                │
    │ - ticker     │  │ - Schemas   │  │ - Real-time    │
    │ - empresa    │  │ - Validation│  │   quotes       │
    │ - data       │  │ - Hooks     │  │ - Changes %    │
    │ - qtd        │  │             │  │                │
    │ - preço      │  │             │  │                │
    └──────────────┘  └─────────────┘  └────────────────┘
```

---

## 📦 Estrutura de Ficheiros

```
TP3_Angular/
│
├── 📄 README.md                      # Documentação principal
├── 📄 INSTALACAO.md                  # Guia de instalação
├── 📄 API_DOCUMENTATION.md           # Documentação REST API
├── 📄 TROUBLESHOOTING.md             # Resolução de problemas
├── 📄 MELHORIAS_CRIATIVAS.md         # Features extras
├── 📄 .gitignore                     # Git ignore rules
├── 🔨 setup.bat                      # Setup Windows
├── 🔨 setup.sh                       # Setup Mac/Linux
│
├── 📁 backend/
│   ├── 📄 server.js                  # Servidor Express principal
│   ├── 📄 seed.js                    # Popular BD com dados
│   ├── 📄 package.json               # Dependências Node
│   ├── 📄 .env                       # Variáveis ambiente
│   │
│   └── Dependências:
│       ├── express           # Framework REST API
│       ├── mongoose          # MongoDB ODM
│       ├── axios             # HTTP client
│       ├── cors              # CORS middleware
│       └── dotenv            # Environment vars
│
├── 📁 frontend/
│   ├── 📄 angular.json               # Config Angular
│   ├── 📄 tsconfig.json              # Config TypeScript
│   ├── 📄 tsconfig.app.json          # Config App TypeScript
│   ├── 📄 package.json               # Dependências Node
│   ├── 📄 proxy.conf.json            # Proxy API config
│   │
│   ├── 📁 src/
│   │   ├── 📄 index.html             # HTML principal
│   │   ├── 📄 main.ts                # Entry point Angular
│   │   ├── 📄 styles.css             # Estilos globais
│   │   │
│   │   ├── 📁 app/
│   │   │   ├── 📄 app.module.ts      # Módulo raiz
│   │   │   ├── 📄 app.component.ts   # Componente raiz
│   │   │   ├── 📄 app.component.html # Template raiz
│   │   │   ├── 📄 app.component.css  # Estilos raiz
│   │   │   │
│   │   │   ├── 📁 components/
│   │   │   │   ├── 📁 portfolio-table/
│   │   │   │   │   ├── portfolio-table.component.ts
│   │   │   │   │   ├── portfolio-table.component.html
│   │   │   │   │   └── portfolio-table.component.css
│   │   │   │   │
│   │   │   │   └── 📁 portfolio-form/
│   │   │   │       ├── portfolio-form.component.ts
│   │   │   │       ├── portfolio-form.component.html
│   │   │   │       └── portfolio-form.component.css
│   │   │   │
│   │   │   └── 📁 services/
│   │   │       ├── portfolio.service.ts
│   │   │       └── stock-price.service.ts
│   │   │
│   │   ├── 📁 environments/
│   │   │   ├── environment.ts         # Config dev
│   │   │   └── environment.prod.ts    # Config prod
│   │   │
│   │   └── 📁 assets/                # Imagens, fontes, etc
│   │
│   └── Dependências:
│       ├── @angular/core      # Core Angular
│       ├── @angular/forms     # Formulários
│       ├── @angular/router    # Routing
│       ├── rxjs               # Reatividade
│       └── bootstrap           # UI Framework
│
└── 📁 .github/
    └── 📄 copilot-instructions.md    # Instruções Copilot
```

---

## 🔄 Fluxo de Dados

### 1️⃣ Carregamento Inicial

```
1. Browser acessa http://localhost:4200
   ↓
2. Angular Bootstrap (main.ts)
   ↓
3. AppComponent inicializa
   ↓
4. PortfolioTableComponent ngOnInit()
   ↓
5. PortfolioService.loadPortfolio()
   ↓
6. HTTP GET /api/portfolio
   ↓
7. Backend retorna dados JSON
   ↓
8. RxJS Subject atualiza observável
   ↓
9. Template renderiza tabela
   ↓
10. Para cada item, chama StockPriceService
   ↓
11. HTTP GET /api/stock-price/:ticker
   ↓
12. Backend chama Alpha Vantage API
   ↓
13. Retorna cotação + variação
   ↓
14. Calcula valores localmente
   ↓
15. Template aplica cores dinâmicas
```

### 2️⃣ Adicionar Ação

```
1. Utilizador preenche formulário
   ↓
2. Clica botão "Adicionar Ação"
   ↓
3. PortfolioFormComponent.onSubmit()
   ↓
4. Validação frontend
   ↓
5. HTTP POST /api/portfolio
   ↓
6. Backend valida dados
   ↓
7. Mongoose save() em MongoDB
   ↓
8. Retorna documento criado
   ↓
9. Exibe mensagem sucesso
   ↓
10. PortfolioService.refreshPortfolio()
    ↓
11. Recarrega tabela
```

### 3️⃣ Atualizar Cotações

```
1. Utilizador clica "Atualizar Cotações"
   ↓
2. PortfolioTableComponent.refresh()
   ↓
3. Para cada ação na carteira:
   ↓
4. HTTP GET /api/stock-price/:ticker
   ↓
5. Backend faz request ao Alpha Vantage
   ↓
6. Retorna: price, change, changePercent
   ↓
7. Frontend calcula:
   - Valor atual = qty × cotacao
   - Variação USD = valor atual - valor aquisição
   - Variação % = (preço novo - preço antigo) / preço antigo × 100
   ↓
8. Aplica cores:
   - Verde se positivo
   - Vermelho se negativo
   - Preto se nulo
   ↓
9. Renderiza tabela com novos valores
```

---

## 🌐 Endpoints REST

### Portfolio Operations
```
GET    /api/portfolio              → Listar todas
POST   /api/portfolio              → Criar nova
GET    /api/portfolio/:id          → Obter um
PUT    /api/portfolio/:id          → Atualizar
DELETE /api/portfolio/:id          → Eliminar
```

### Stock Prices
```
GET    /api/stock-price/:ticker    → Cotação do dia
```

---

## 💾 Modelo de Dados MongoDB

```javascript
{
  _id: ObjectId,
  ticker: String,           // Símbolo (MSFT, TSLA, etc)
  empresa: String,          // Nome da empresa
  dataDaCompra: Date,       // Quando foi comprado
  quantidade: Number,       // Quantas ações
  precoDeCompra: Number,    // Preço de compra em USD
  createdAt: Date,          // Data de criação
  updatedAt: Date           // Data última atualização
}
```

---

## 🔐 Segurança

### Configurações Implementadas
- ✅ CORS ativado (controla acessos cross-origin)
- ✅ Validação de entrada (backend)
- ✅ Mongoose validation (schema)
- ✅ Try-catch em funções async
- ✅ Error handling em todas as rotas

### Possíveis Melhorias
- ❌ Autenticação (JWT)
- ❌ Rate limiting
- ❌ Helmet.js para headers de segurança
- ❌ Validation mais rigorosa
- ❌ Sanitização de inputs

---

## 📊 Fluxo de Cálculos

### Fórmulas Implementadas

```
Valor de Aquisição = Quantidade × Preço de Compra
Valor Atual        = Quantidade × Cotação do Dia
Variação USD       = Valor Atual - Valor Aquisição
Variação %         = (Variação USD / Valor Aquisição) × 100
```

### Exemplo Prático
```
MSFT:
- Compra: 20 × $320 = $6.400
- Hoje:   20 × $330 = $6.600
- Ganho:  $6.600 - $6.400 = $200
- %:      ($200 / $6.400) × 100 = 3,125%
```

---

## 🚀 Deploy Sugerido

### Frontend
```bash
# Build produção
ng build --configuration production

# Deploiar em:
- Netlify
- Vercel
- GitHub Pages
- AWS S3
```

### Backend
```bash
# Deploiar em:
- Heroku (free, com limitações)
- AWS EC2
- DigitalOcean
- Railway.app

# Configurar variáveis ambiente:
- MONGODB_URI (MongoDB Atlas)
- ALPHA_VANTAGE_API_KEY
- NODE_ENV=production
```

---

## 📈 Performance

### Otimizações Implementadas
- ✅ Lazy loading de componentes
- ✅ OnPush change detection (possível)
- ✅ Unsubscribe automático (observables)
- ✅ Database indexing recomendado

### Sugestões Futuras
- Cache de cotações (Redis)
- Paginação de resultados
- Virtual scrolling para grandes listas
- Service Workers (PWA)

---

Arquitetura versão 1.0 - Maio 2026
