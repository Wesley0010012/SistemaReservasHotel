# Frontend Estático

Frontend sem framework para o CRUD de hóspedes e protótipos mockados dos demais casos de uso.

## Como usar

### Protótipo funcional de hóspedes

Abra `/hospedes` no navegador pelo gateway Docker ou sirva a pasta com um servidor estático simples.

- `/hospedes`: listagem, filtros, consulta por ID e inativação de hospedes.
- `/hospedes/add/`: criação de hospedes.
- `/hospedes/update/{id}`: alteração de hospedes.

### Servidor mock

O protótipo dos demais casos de uso fica isolado em um servidor próprio, na porta `8081` por padrão:

```bash
node frontend/mock-server.js
```

Rotas mockadas:

- `/quartos`: tela mockada para cadastro, alteração, exclusão e consulta de quartos.
- `/promocoes`: tela mockada para gestão de promoções.
- `/politicas-cancelamento`: tela mockada para políticas de cancelamento.
- `/reservas`: tela mockada para disponibilidade, proposta, confirmação, alteração, cancelamento, no-show, check-in e check-out.
- `/pagamentos`: tela mockada para pagamentos e estornos.
- `/notificacoes`: tela mockada para notificações.
- `/relatorios`: tela mockada para relatórios e análise.

Use `MOCK_PORT` para alterar a porta:

```bash
MOCK_PORT=8091 node frontend/mock-server.js
```

## Configuração

No Docker, o nginx gera `/config.js` a partir das variáveis:

- `FRONTEND_API_BASE_URL`: origem usada nas chamadas para `/api`.
- `FRONTEND_APP_BASE_URL`: origem usada nos links e redirecionamentos do frontend.

Por padrão, ambas usam `http://localhost:8080`.

A API esperada é o gateway Docker:

```text
http://localhost:8080
```

## Stack

- HTML
- CSS
- JavaScript

O CRUD funcional de hóspedes mantém o fluxo integrado com a API e usa o mesmo padrão visual claro do servidor mock. O servidor mock continua separado para não interferir nas chamadas reais de hóspedes.
