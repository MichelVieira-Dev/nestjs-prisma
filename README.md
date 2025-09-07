# API NestJS + Prisma

## Descrição

Este projeto é uma API construída com NestJS e Prisma para gerenciamento de usuários e seus posts. Foi desenvolvido para fins acadêmicos, integrando boas práticas e padrões de projeto, utilizando banco de dados SQLite para persistência.

## Tecnologias Utilizadas

- [NestJS](https://nestjs.com/) — Framework Node.js para construir aplicações escaláveis e eficientes.
- [Prisma](https://www.prisma.io/) — ORM moderno para Node.js e TypeScript.
- SQLite — Banco de dados leve para desenvolvimento e testes.
- TypeScript — Superset do JavaScript com tipagem estática.
- Jest — Framework de testes para JavaScript/TypeScript.
- ESLint e Prettier — Ferramentas para garantir qualidade e padronização de código.
- Bcrypt — Biblioteca para hashing seguro de senhas.
- Class-Validator e Class-Transformer — Para validação e transformação de dados.

## Funcionalidades Implementadas

- **Autenticação JWT:** Proteção de rotas e emissão de tokens JWT.
- **CRUD de Usuários:** Criação, leitura, atualização e exclusão de usuários.
- **CRUD de Posts:** Operações completas para posts vinculados a usuários.
- **Relacionamento 1:N entre Usuário e Posts:** Cada usuário pode ter múltiplos posts.
- **Validação de dados:** Uso de class-validator para validação rigorosa de requisições.
- **Tratamento centralizado de exceções:** Exceções de domínio personalizadas e filtros globais.
- **Migrations e Seeds com Prisma:** Controle de versão do banco e dados iniciais para testes.

## Arquitetura e Design

Este projeto adota uma abordagem inspirada no **Domain-Driven Design (DDD)**, porém de forma parcial (DDD semi-implementado).

### O que foi aplicado:

- Organização do código em domínios/modulos claros (`user`, `user-post`, `auth`).
- Separação das camadas: Controllers (interface), Services (lógica de negócio) e Repositories (persistência).
- Uso de DTOs para validação e transferência de dados.
- Serviços focados na lógica de domínio.
- Repositórios que abstraem o acesso ao banco de dados.

### Benefícios

Essa estrutura melhora a manutenibilidade, escalabilidade e testabilidade do sistema, mesmo não aplicando todos os padrões completos do DDD.

## Padrões e Boas Práticas

- **Arquitetura Modular:** Organização do código em módulos, facilitando manutenção e escalabilidade.
- **Injeção de Dependências:** Uso do padrão para desacoplar componentes.
- **DTOs e Mappers:** Separação clara entre entidades, dados de entrada e saída.
- **Repositórios:** Isolamento da lógica de acesso a dados.
- **Serviços:** Contêm a lógica de negócio, mantendo os controllers limpos.
- **Controllers REST:** Definem endpoints da API de forma clara e simples.
- **Pipes de validação globais:** Para garantir segurança e consistência das entradas.

## Scripts Úteis

- `npm run start:dev` — Inicia o servidor em modo de desenvolvimento com hot-reload.
- `npm run build` — Compila o projeto TypeScript.
- `npm run start` — Inicia a aplicação compilada.
- `npm run lint` — Executa o ESLint para verificar problemas no código.

## Como Rodar o Projeto

1. Clone o repositório.
2. Instale as dependências com `npm install`.
3. Configure as variáveis de ambiente no arquivo `.env`.
4. Execute as migrations com `npx prisma migrate dev --name init`.
5. Rode o seed para popular o banco com dados iniciais `npx prisma db seed`.
6. Inicie a aplicação com `npm run start:dev`.
7. Acesse a API em `http://localhost:8080`.

---

Feito por Michel Vieira.

---

## Referências

- [Documentação oficial NestJS](https://docs.nestjs.com/)
- [Documentação oficial Prisma](https://www.prisma.io/docs/)
- [Awesome GitHub Profile README](https://github.com/matiassingers/awesome-github-profile-readme)

