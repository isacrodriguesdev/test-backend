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

## Suporte

Se quiser que eu gere um arquivo OpenAPI JSON (por exemplo `openapi.json`) a partir da configuração do Swagger e comite no repositório, eu posso fazer isso em seguida.
<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg" alt="Donate us"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow" alt="Follow us on Twitter"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Project setup

```bash
$ pnpm install
```

## Compile and run the project

```bash
# development
$ pnpm run start

# watch mode
$ pnpm run start:dev

# production mode
$ pnpm run start:prod
```

## Run tests

```bash
# unit tests
$ pnpm run test

# e2e tests
$ pnpm run test:e2e

# test coverage
$ pnpm run test:cov
```

## Deployment

When you're ready to deploy your NestJS application to production, there are some key steps you can take to ensure it runs as efficiently as possible. Check out the [deployment documentation](https://docs.nestjs.com/deployment) for more information.

If you are looking for a cloud-based platform to deploy your NestJS application, check out [Mau](https://mau.nestjs.com), our official platform for deploying NestJS applications on AWS. Mau makes deployment straightforward and fast, requiring just a few simple steps:

```bash
$ pnpm install -g @nestjs/mau
$ mau deploy
```

With Mau, you can deploy your application in just a few clicks, allowing you to focus on building features rather than managing infrastructure.

## Resources

Check out a few resources that may come in handy when working with NestJS:

- Visit the [NestJS Documentation](https://docs.nestjs.com) to learn more about the framework.
- For questions and support, please visit our [Discord channel](https://discord.gg/G7Qnnhy).
- To dive deeper and get more hands-on experience, check out our official video [courses](https://courses.nestjs.com/).
- Deploy your application to AWS with the help of [NestJS Mau](https://mau.nestjs.com) in just a few clicks.
- Visualize your application graph and interact with the NestJS application in real-time using [NestJS Devtools](https://devtools.nestjs.com).
- Need help with your project (part-time to full-time)? Check out our official [enterprise support](https://enterprise.nestjs.com).
- To stay in the loop and get updates, follow us on [X](https://x.com/nestframework) and [LinkedIn](https://linkedin.com/company/nestjs).
- Looking for a job, or have a job to offer? Check out our official [Jobs board](https://jobs.nestjs.com).

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## Stay in touch

- Author - [Kamil Myśliwiec](https://twitter.com/kammysliwiec)
- Website - [https://nestjs.com](https://nestjs.com/)
- Twitter - [@nestframework](https://twitter.com/nestframework)

## License

Nest is [MIT licensed](https://github.com/nestjs/nest/blob/master/LICENSE).
