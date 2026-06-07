# Ambiente Docker de Desenvolvimento

Este ambiente sobe:

- PostgreSQL
- Backend Node.js isolado na rede Docker
- NGINX como API Gateway, expondo a API para a maquina host
- Servidor mock do frontend para os casos de uso ainda nao integrados

## Como iniciar

```bash
cd environment/development/docker
cp .env.example .env
docker compose up --build
```

## Enderecos

- API Gateway: `http://localhost:8080`
- Frontend: `http://localhost:8080`
- Mock UI: `http://localhost:8081`
- Rotas de hospedes: `http://localhost:8080/api/hospedes`
- PostgreSQL: `localhost:5432`

O backend Node nao publica porta diretamente para a maquina host. Ele fica acessivel apenas pelo NGINX dentro da rede Docker.
O CRUD funcional de hospedes permanece no gateway principal. As telas mockadas de quartos, promocoes, politicas, reservas, pagamentos, notificacoes e relatorios ficam isoladas no servidor `mock`.

## Seeds

Para inserir todos os estados brasileiros e 100 cidades:

```bash
docker compose --profile seed up seed
```

O seed e idempotente: pode ser executado novamente sem duplicar estados ou cidades.
