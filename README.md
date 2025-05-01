# API Dra. Kaysa

API desenvolvida em Node.js + Express + TypeScript para o sistema da Dra. Kaysa.

## Requisitos

- Node.js (versão 14 ou superior)
- MongoDB (local ou Atlas)
- npm ou yarn

## Instalação

1. Clone o repositório:
```bash
git clone [url-do-repositorio]
```

2. Instale as dependências:
```bash
npm install
```

3. Configure as variáveis de ambiente:
Crie um arquivo `.env` na raiz do projeto com as seguintes variáveis:
```
PORT=3000
MONGODB_URI=mongodb://localhost:27017/drakaysa
```

## Executando a aplicação

Para desenvolvimento:
```bash
npm run dev
```

Para produção:
```bash
npm run build
npm start
```

## Endpoints

### Pacientes
- GET /api/pacientes - Lista todos os pacientes
- GET /api/pacientes/:id - Busca um paciente específico
- POST /api/pacientes - Cria um novo paciente
- PUT /api/pacientes/:id - Atualiza um paciente
- DELETE /api/pacientes/:id - Remove um paciente

### Dentistas
- GET /api/dentistas - Lista todos os dentistas
- GET /api/dentistas/:id - Busca um dentista específico
- POST /api/dentistas - Cria um novo dentista
- PUT /api/dentistas/:id - Atualiza um dentista
- DELETE /api/dentistas/:id - Remove um dentista

### Endereços
- GET /api/enderecos - Lista todos os endereços
- GET /api/enderecos/:id - Busca um endereço específico
- POST /api/enderecos - Cria um novo endereço
- PUT /api/enderecos/:id - Atualiza um endereço
- DELETE /api/enderecos/:id - Remove um endereço

### Tópicos
- GET /api/topicos - Lista todos os tópicos
- GET /api/topicos/:id - Busca um tópico específico
- POST /api/topicos - Cria um novo tópico
- PUT /api/topicos/:id - Atualiza um tópico
- DELETE /api/topicos/:id - Remove um tópico

### Cards
- GET /api/cards - Lista todos os cards
- GET /api/cards/:id - Busca um card específico
- POST /api/cards - Cria um novo card
- PUT /api/cards/:id - Atualiza um card
- DELETE /api/cards/:id - Remove um card

### Imagens
- GET /api/imagens - Lista todas as imagens
- GET /api/imagens/:id - Busca uma imagem específica
- POST /api/imagens - Cria uma nova imagem
- PUT /api/imagens/:id - Atualiza uma imagem
- DELETE /api/imagens/:id - Remove uma imagem

## Estrutura do Projeto

```
src/
├── controllers/     # Controladores da aplicação
├── models/          # Modelos do MongoDB
├── routes/          # Rotas da API
├── config/          # Configurações
├── middlewares/     # Middlewares
└── app.ts          # Arquivo principal
```

## Tecnologias Utilizadas

- Node.js
- Express
- TypeScript
- MongoDB
- Mongoose
- CORS
- dotenv 