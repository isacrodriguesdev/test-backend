# Test Backend - API Documentation

Este repositório contém uma API em NestJS que serve dados de transações para um dashboard. A API é dinâmica e retorna diferentes formatos conforme o tipo de gráfico solicitado (pie, line, map).

## Sumário
- Requisitos
- Instalação
- Como executar
- Endpoints (com exemplos)
- Observações

## Requisitos
- Node.js >= 18
- npm

## Instalação

1. Instalar pnpm (caso não tenha):

```bash
npm install -g pnpm
```

2. Instalar dependências do projeto:

```bash
pnpm install
```

3. Gerar client Prisma (se necessário):

```bash
pnpm prisma generate
```

## Como executar

- Em modo desenvolvimento (com watch):

```bash
pnpm dev
```

- Em modo produção:

```bash
pnpm build
pnpm start
```

Após iniciar, a API fica disponível por padrão em `http://localhost:3000`.

## Documentação interativa (Swagger)

Após iniciar a aplicação, a UI do Swagger estará em:

```
http://localhost:3000/api/docs
```

## Endpoints

Todas as rotas seguem o prefixo base `/api`.

### 1) Registrar usuário
- Método: POST
- URL: `/api/user/register`
- Auth: Não
- Body (JSON):

```json
{
  "name": "string",
  "email": "string",
  "password": "string"
}
```

- Sucesso (200):

```json
{ "user": { /* user object */ }, "token": "<jwt>" }
```

- Erros possíveis:
  - 400/422: validação do payload (se tiver ValidationPipe aplicado no controller)
  - 409 / 200 com { error: 'User already exists' }: usuário já existe (implementação atual)


### 2) Login
- Método: POST
- URL: `/api/user/login`
- Auth: Não
- Body (JSON):

```json
{
  "email": "user@example.com",
  "password": "password"
}
```

- Sucesso (200):

```json
{ "user": { /* user object */ }, "token": "<jwt>" }
```

- Erros possíveis:
  - 401 Unauthorized: credenciais inválidas


### 3) Criar transação
- Método: POST
- URL: `/api/transaction`
- Auth: Sim (Bearer JWT)
- Headers:

```
Authorization: Bearer <token>
```

- Body (JSON):

```json
{
  "type": "INCOME" | "EXPENSE",
  "category": "string",
  "amount": 123.45,
  "date": "YYYY-MM-DD" // ou ISO
}
```

- Sucesso (200): retorna o objeto da transação criada:

```json
{
  "id": "string",
  "userId": "string",
  "type": "INCOME",
  "category": "string",
  "amount": 123.45,
  "date": "2023-01-01T00:00:00.000Z",
  "createdAt": "2023-01-01T00:00:00.000Z"
}
```

- Erros possíveis:
  - 401 Unauthorized: token ausente ou inválido
  - 400/422: payload inválido
  - 500: erro interno ao salvar


### 4) Buscar transações (para dashboard)
- Método: GET
- URL: `/api/transaction`
- Auth: Sim (Bearer JWT)
- Query params (validados):
  - `chartType` (opcional): `pie` | `line` | `map` (padrão: `map`)
  - `startDate` (obrigatório): `YYYY-MM-DD`
  - `endDate` (obrigatório): `YYYY-MM-DD`

- Exemplo:

```
GET /api/transaction?chartType=pie&startDate=2023-01-01&endDate=2023-12-31
Authorization: Bearer <token>
```

- Comportamento e formatos de retorno:
  - `chartType=pie`:
    - Retorna um array de fatias: `[ { "label": "Income", "value": 60.5 }, { "label": "Expense", "value": 39.5 } ]`
  - `chartType=line`:
    - Retorna objeto de séries: `{ labels: ["Jan","Feb"], datasets: [ { label: 'Income', data: [100,200] }, { label: 'Expense', data: [50,80] } ] }`
  - `chartType=map` (ou omitido):
    - Retorna lista de transações serializadas: `[ { id, userId, type, category, amount, date, createdAt }, ... ]`

- Códigos de status possíveis:
  - 200 OK: sucesso
  - 400 Bad Request: datas ausentes/invalidas ou `startDate > endDate`
  - 401 Unauthorized: token ausente/inválido
  - 500 Internal Server Error: falha no servidor


## Observações importantes

- Validação de query params: `FetchTransactionQueryParams` exige `startDate` e `endDate` no formato `YYYY-MM-DD`. `chartType` só aceita `pie`, `line` e `map`.
- Data boundaries/timezone: as datas são convertidas com `new Date('YYYY-MM-DD')`. Para evitar perda/ganho de um dia por timezone, considere normalizar `startDate` ao início do dia e `endDate` ao fim do dia com uma timezone consistente (UTC ou local).

## Swagger / OpenAPI

- A UI do Swagger está disponível em `/api/docs` quando a aplicação está rodando. Ela reflete os controllers e DTOs anotados com decorators do `@nestjs/swagger`.

## Testes

- O projeto inclui configuração para Jest. Execute os testes com:

```bash
pnpm test
```
