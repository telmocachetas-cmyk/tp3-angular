# ✅ Checklist de Verificação - Portfolio Tracker

Use este checklist para confirmar que o projeto está funcionando corretamente.

---

## 🔧 Fase 1: Instalação

- [ ] Node.js instalado (`node --version` retorna v16+)
- [ ] npm instalado (`npm --version` retorna 7+)
- [ ] MongoDB instalado e a correr (`mongosh` conecta)
- [ ] Git instalado (opcional)
- [ ] Projeto clonado/baixado
- [ ] `setup.bat` ou `setup.sh` executado com sucesso

---

## 📦 Fase 2: Dependências

- [ ] Backend: `npm install` completo em `backend/`
- [ ] Frontend: `npm install` completo em `frontend/`
- [ ] Sem erros de instalação
- [ ] Node_modules criados em ambas as pastas
- [ ] Package-lock.json presente

---

## 🗄️ Fase 3: Base de Dados

- [ ] MongoDB conecta (`mongosh`)
- [ ] Database `portfolio` criada
- [ ] Collection `portfolios` populada
- [ ] `node seed.js` executado sem erros
- [ ] Dados de exemplo visíveis (`db.portfolios.find()`)
- [ ] Mínimo 4 ações no seeding

---

## 🖥️ Fase 4: Backend

- [ ] Terminal do backend aberto
- [ ] `npm start` executado
- [ ] Mensagem: `Server running on port 3000`
- [ ] Sem erros no console
- [ ] Consegue aceder `http://localhost:3000/api/portfolio`
- [ ] Retorna JSON com dados

Testes:
- [ ] `GET http://localhost:3000/api/portfolio` - retorna array
- [ ] `GET http://localhost:3000/api/stock-price/MSFT` - retorna cotação
- [ ] Nenhum erro 500

---

## 🌐 Fase 5: Frontend

- [ ] Terminal do frontend aberto
- [ ] `npm start` executado (em `frontend/`)
- [ ] Browser abre em `http://localhost:4200`
- [ ] Página carrega (não fica em branco)
- [ ] Sem erros fatais no console (F12)
- [ ] DevTools Network não mostra erros 404/500

---

## 📊 Fase 6: Interface & Dados

- [ ] **Header visível**: "Portfolio Tracker" com gradient
- [ ] **Formulário presente**: Campo para adicionar ações
- [ ] **Tabela presente**: Com dados de exemplo
- [ ] **Colunas corretas**: Ticker, Empresa, Data, QT, PU, Total, Cotação, Valor, Variação
- [ ] **Dados carregados**: Mínimo 4 ações visíveis

---

## 🎨 Fase 7: Funcionalidades Básicas

### Tabela
- [ ] Cabeçalho em cor escura (contraste)
- [ ] Dados alinhados (números à direita)
- [ ] Rodapé com totais (verde)
- [ ] Ícone 🗑️ em cada linha

### Cores
- [ ] Ticker em badge azul
- [ ] Variações positivas em verde
- [ ] Variações negativas em vermelho
- [ ] Variações nulas em preto

### Botões
- [ ] Botão "Atualizar Cotações" presente
- [ ] Botão "Adicionar Ação" funcional

---

## ⚡ Fase 8: Funcionalidades Avançadas

### Adicionar Ação
- [ ] Preencher formulário (MSFT, Microsoft, data, 25, 325)
- [ ] Clicar "Adicionar Ação"
- [ ] Mensagem "Ação adicionada com sucesso"
- [ ] Ação aparece na tabela

### Atualizar Cotações
- [ ] Clicar botão "Atualizar Cotações"
- [ ] Spinner animado aparece
- [ ] Cotações atualizam
- [ ] Variações recalculam
- [ ] Cores ajustam-se

### Eliminar Ação
- [ ] Clicar ícone 🗑️ numa linha
- [ ] Pedir confirmação
- [ ] Confirmar
- [ ] Ação remove da tabela

### Cálculos
- [ ] MSFT: 20 × $320 = $6.400 ✅
- [ ] Totais somam corretamente ✅
- [ ] Variações em % corretas ✅
- [ ] Não há valores NaN ou undefined ✅

---

## 🔐 Fase 9: Validação

### Formulário
- [ ] Ticker em MAIÚSCULAS
- [ ] Quantidade não permite negativo
- [ ] Preço não permite negativo
- [ ] Data não permite futura
- [ ] Campos vazios mostram aviso

### Backend
- [ ] Dados salvos em MongoDB
- [ ] Remoção funciona
- [ ] Sem duplicatas
- [ ] Timestamps (createdAt/updatedAt) corretos

---

## 🌍 Fase 10: Performance

- [ ] Aplicação não travou
- [ ] Sem consumo excessivo de RAM
- [ ] Página responsiva
- [ ] Cliques instantâneos
- [ ] Carregamento < 3 segundos

---

## 📱 Fase 11: Responsividade

Abrir DevTools (F12) e testar em diferentes tamanhos:

- [ ] 1920x1080 (desktop): Layout correto
- [ ] 768x1024 (tablet): Tabela com scroll
- [ ] 375x667 (mobile): Componentes empilhados
- [ ] Formulário legível em todos

---

## 🔍 Fase 12: Console Browser (F12)

- [ ] Sem erros em vermelho
- [ ] Sem avisos críticos
- [ ] Network sem 404s
- [ ] sem XHR falhados

Verificar aba "Network":
- [ ] Requests para `/api/portfolio` - 200 OK
- [ ] Requests para `/api/stock-price/:ticker` - 200 OK
- [ ] Sem erros CORS

---

## 🔍 Fase 13: Console Backend

- [ ] Sem erros em vermelho
- [ ] Logs normais (database connect OK)
- [ ] Quando clica atualizar: aparece chamada à API Alpha Vantage
- [ ] Sem "unhandled promise rejection"

---

## 📄 Fase 14: Documentação

- [ ] README.md existe e é legível
- [ ] INSTALACAO.md passo-a-passo claro
- [ ] API_DOCUMENTATION.md com exemplos
- [ ] TROUBLESHOOTING.md abrangente
- [ ] MELHORIAS_CRIATIVAS.md listado

---

## 🎯 Fase 15: Requisitos TP3

De acordo com o enunciado:

- [ ] Aplicação Angular com TypeScript
- [ ] Tabela apresentando carteira
- [ ] Dados das colunas azul/verde calculados
- [ ] Variação com % e sinal (+/-)
- [ ] Cores: verde (positivo), vermelho (negativo), preto (nulo)
- [ ] MongoDB com dados persistentes
- [ ] API REST funcionando
- [ ] Design apelativo
- [ ] Tudo presente e funcional

---

## 🎨 Fase 16: Qualidade Criativa

- [ ] Design moderno (não é "template básico")
- [ ] Animações suaves (não é HTML/CSS plano)
- [ ] Ícones emoji para clareza visual
- [ ] Gradientes e cores harmoniosas
- [ ] Mensagens de feedback (sucesso/erro)
- [ ] Loading states visuais
- [ ] Sem clones diretos de tutoriais

---

## 📊 Fase 17: Dados de Exemplo

Após seed.js, deve ter:

- [ ] MSFT: 20 ações @ $320
- [ ] TSLA: 50 ações @ $220
- [ ] AAPL: 30 ações @ $150
- [ ] GOOGL: 15 ações @ $2800
- [ ] Total aquisição: ~$63,900
- [ ] Cotações buscando em tempo real

---

## 🔧 Fase 18: Edge Cases

- [ ] Sem ações: Mensagem "Nenhuma ação"
- [ ] API fora: Não quebra (erro tratado)
- [ ] Ticker inválido: Backend retorna erro
- [ ] Quantidade 0: Validação rejeita
- [ ] Preço negativo: Validação rejeita

---

## 🚀 Fase 19: Pronto para Apresentação?

- [ ] Tudo acima funcionando
- [ ] Sem erros no console
- [ ] Base de dados populada
- [ ] API respondendo
- [ ] Interface bonita e intuitiva
- [ ] Documentação presente
- [ ] Setup automático funciona

---

## 🎉 Fase 20: Entrega Final

Antes de submeter:

- [ ] Ficheiros .env não contêm senhas reais
- [ ] Node_modules não inclusos (apenas README de como instalar)
- [ ] .gitignore configurado
- [ ] Sem ficheiros desnecessários (node_modules, dist, etc)
- [ ] README.md legível (markdown válido)
- [ ] Estrutura clara
- [ ] Pronto para fazer `setup.bat` e funcionar

---

## 📋 Resumo Rápido

Se conseguir "✅" em TODAS estas categorias, o projeto está pronto:

```
✅ Instalação    - setup.bat/sh funciona
✅ BD            - MongoDB com dados
✅ Backend       - API em localhost:3000
✅ Frontend      - App em localhost:4200
✅ Tabela        - Dados visíveis e corretos
✅ Cálculos      - Fórmulas precisas
✅ Cores         - Verde/Vermelho/Preto
✅ Interação     - Adicionar/Atualizar/Eliminar
✅ Design        - Moderno e atrativo
✅ Docs          - Completas e claras
✅ Requisitos    - 100% cumpridos
```

---

## ❌ Se Algo Falhar

Consulte na ordem:

1. [INSTALACAO.md](INSTALACAO.md) - Como instalar
2. [TROUBLESHOOTING.md](TROUBLESHOOTING.md) - Problemas comuns
3. [API_DOCUMENTATION.md](API_DOCUMENTATION.md) - Como funciona a API
4. [ARQUITETURA.md](ARQUITETURA.md) - Fluxos de dados

---

**Data de Verificação:** _______________  
**Pessoa:** _______________  
**Status Final:** ✅ APROVADO / ❌ PRECISA AJUSTES  

Notas:  
_________________________________________________________

---

Última atualização: Maio 2026
