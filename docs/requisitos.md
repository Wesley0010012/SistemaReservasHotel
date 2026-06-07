# Sistema de Reserva de Hotel

## Condições para Desenvolvimento do Trabalho

Para a entrega da documentação, diagramas de classes de domínio e de implementação, a especificação completa do sistema de reserva de hotel deve ser considerada. Para o diagrama de sequência apenas a inserção de hóspedes é necessária.

Para a implementação, é necessário apenas o CRUD de hóspedes, considerando todos os requisitos funcionais e não funcionais, bem como as regras de negócio correspondentes. Logo, não será necessária a implementação de nenhuma outra funcionalidade especificada.

O backend pode ser implementado utilizando Java, .NET (C#) ou Node.js. Para o frontend poderá ser utilizada qualquer tecnologia web, como HTML, JavaScript, React, Vue.js, entre outras.

## Documento de Requisitos

## Requisitos Funcionais

### Cadastro de Hóspedes

| ID | Nome | Descrição |
| --- | --- | --- |
| RF0101 | Cadastrar hóspede | O sistema deve possibilitar o cadastro de hóspedes. |
| RF0102 | Alterar cadastro de hóspede | O sistema deve possibilitar a alteração de dados cadastrais de hóspedes. |
| RF0103 | Inativar cadastro de hóspede | O sistema deve possibilitar a inativação de hóspedes. |
| RF0104 | Consultar hóspedes | O sistema deve possibilitar a consulta de hóspedes a partir de filtros definidos pelo usuário. |

### Cadastro de Quartos

| ID | Nome | Descrição |
| --- | --- | --- |
| RF0111 | Cadastrar quarto | O sistema deve possibilitar o cadastro de quartos do hotel. |
| RF0112 | Alterar cadastro de quarto | O sistema deve possibilitar a alteração de dados de quartos. |
| RF0113 | Inativar cadastro de quarto | O sistema deve possibilitar a inativação de quartos. |
| RF0114 | Consultar quartos | O sistema deve possibilitar a consulta de quartos a partir de filtros definidos pelo usuário. |

### Gestão de Promoções

| ID | Nome | Descrição |
| --- | --- | --- |
| RF0121 | Cadastrar promoção | O sistema deve possibilitar o cadastro de promoções. |
| RF0122 | Alterar promoção | O sistema deve possibilitar a alteração de promoções. |
| RF0123 | Inativar promoção | O sistema deve possibilitar a inativação de promoções. |
| RF0124 | Consultar promoções | O sistema deve possibilitar a consulta de promoções vigentes e histórico. |

### Políticas de Cancelamento

| ID | Nome | Descrição |
| --- | --- | --- |
| RF0131 | Cadastrar política de cancelamento | O sistema deve possibilitar o cadastro de políticas de cancelamento. |
| RF0132 | Alterar política de cancelamento | O sistema deve possibilitar a alteração de políticas de cancelamento. |
| RF0133 | Inativar política de cancelamento | O sistema deve possibilitar a inativação de políticas de cancelamento. |
| RF0134 | Consultar políticas de cancelamento | O sistema deve possibilitar a consulta de políticas de cancelamento. |

### Reservas

| ID | Nome | Descrição |
| --- | --- | --- |
| RF0201 | Consultar disponibilidade | O sistema deve possibilitar a consulta de disponibilidade de quartos a partir de parâmetros informados pelo usuário. |
| RF0202 | Criar reserva (proposta) | O sistema deve possibilitar a criação de reserva com status inicial de proposta. |
| RF0203 | Confirmar reserva | O sistema deve possibilitar a confirmação de reserva. |
| RF0204 | Alterar reserva | O sistema deve possibilitar a alteração de reservas. |
| RF0205 | Cancelar reserva | O sistema deve possibilitar o cancelamento de reservas. |
| RF0206 | Consultar reservas | O sistema deve possibilitar a consulta de reservas por filtros (período, status, hóspede, quarto, canal). |
| RF0207 | Marcar no-show | O sistema deve possibilitar a marcação de reservas como no-show. |
| RF0208 | Registrar check-in | O sistema deve possibilitar o registro de check-in de reservas confirmadas. |
| RF0209 | Registrar check-out | O sistema deve possibilitar o registro de check-out de reservas em estadia. |

### Pagamentos

| ID | Nome | Descrição |
| --- | --- | --- |
| RF0211 | Iniciar pagamento | O sistema deve possibilitar a iniciação de pagamentos associados à reserva. |
| RF0212 | Registrar resultado de pagamento | O sistema deve possibilitar o registro do resultado do pagamento (aprovado/negado). |
| RF0213 | Estornar pagamento | O sistema deve possibilitar o registro de estorno de pagamentos associados a reservas canceladas. |
| RF0214 | Consultar pagamentos | O sistema deve possibilitar a consulta de pagamentos por filtros. |

### Notificações

| ID | Nome | Descrição |
| --- | --- | --- |
| RF0221 | Enviar confirmação de reserva | O sistema deve enviar notificação de confirmação de reserva ao hóspede. |
| RF0222 | Enviar confirmação de cancelamento | O sistema deve enviar notificação de cancelamento de reserva ao hóspede. |
| RF0223 | Enviar lembretes de estadia | O sistema deve enviar notificações relacionadas a lembretes de estadia. |
| RF0224 | Enviar mensagens pós-estadia | O sistema deve enviar notificações pós-estadia. |

### Relatórios e Análise

| ID | Nome | Descrição |
| --- | --- | --- |
| RF0231 | Relatório de ocupação | O sistema deve disponibilizar relatório de ocupação por período e por tipo de quarto. |
| RF0232 | Relatório financeiro | O sistema deve disponibilizar relatório financeiro por período e forma de pagamento. |
| RF0233 | Relatório de origem de reservas | O sistema deve disponibilizar relatório por canal de origem de reservas. |
| RF0234 | Desempenho de promoções | O sistema deve disponibilizar relatório de desempenho de promoções. |

## Requisitos Não Funcionais

### Desempenho e Disponibilidade

| ID | Nome | Descrição |
| --- | --- | --- |
| RNF0101 | Tempo de resposta para disponibilidade | A consulta de disponibilidade deve ter resposta em até 3 segundos. |
| RNF0102 | Tempo de resposta para criação de reserva | A criação de reserva deve ter resposta em até 5 segundos. |
| RNF0103 | Disponibilidade do sistema | O sistema deve manter disponibilidade mínima de 99,9% ao mês. |

### Segurança e Conformidade

| ID | Nome | Descrição |
| --- | --- | --- |
| RNF0111 | Comunicação segura | Toda comunicação deve ocorrer via HTTPS. |
| RNF0112 | Armazenamento de credenciais | Senhas devem ser armazenadas com hash e salt. |
| RNF0113 | Privacidade e LGPD | O sistema deve atender aos princípios da LGPD, incluindo consentimento e finalidade. |

### Usabilidade e Acesso

| ID | Nome | Descrição |
| --- | --- | --- |
| RNF0121 | Interface responsiva | A aplicação deve ser responsiva para desktop e dispositivos móveis. |
| RNF0122 | Suporte a navegadores | O sistema deve suportar os navegadores Chrome, Firefox e Edge nas versões suportadas. |
| RNF0123 | Internacionalização | O sistema deve disponibilizar interface em português e inglês. |

### Observabilidade e Auditoria

| ID | Nome | Descrição |
| --- | --- | --- |
| RNF0131 | Auditoria de operações | Deve haver registro de data, hora, usuário e operação para eventos de criação, alteração e status de reservas e pagamentos. |
| RNF0132 | Métricas e alertas | O sistema deve expor métricas de aplicação e configurar alertas para falhas e degradação de desempenho. |

### Integrações

| ID | Nome | Descrição |
| --- | --- | --- |
| RNF0141 | Resiliência de integrações | Chamadas para serviços externos de pagamento e notificação devem implementar retentativa e circuito de proteção. |
| RNF0142 | Disponibilidade de integrações | Falhas de serviços externos não devem impedir operações internas que não dependem de confirmação imediata. |

## Regras de Negócio

### Composição e Obrigatoriedade de Dados

| ID | Nome | Descrição |
| --- | --- | --- |
| RN0201 | Dados obrigatórios do hóspede | Para todo hóspede, é obrigatório registrar: nome completo, CPF, data de nascimento, telefone, e-mail e endereço composto por: logradouro, número, CEP, bairro, complemento, cidade e estado. |
| RN0202 | Unicidade de CPF | O CPF do hóspede deve ser único no sistema. |
| RN0203 | Dados obrigatórios do quarto | Para todo quarto, é obrigatório registrar: número, tipo (single, duplo, suíte), capacidade de adultos, capacidade de crianças, status e preço-base da diária. |
| RN0204 | Dados obrigatórios da reserva | Para toda reserva, é obrigatório registrar: hóspede, quarto, data de entrada, data de saída, quantidade de adultos, quantidade de crianças, status e valor total. |
| RN0205 | Dados obrigatórios de pagamento | Para todo pagamento, é obrigatório registrar: reserva, forma de pagamento, valor e data da operação. |

### Validações de Conteúdo

| ID | Nome | Descrição |
| --- | --- | --- |
| RN0211 | E-mail válido do hóspede | O e-mail informado no cadastro de hóspede deve estar em formato válido. |
| RN0212 | Janela de datas válida | A data de saída deve ser posterior à data de entrada. |
| RN0213 | Capacidade do quarto | A soma de adultos e crianças na reserva não pode exceder a capacidade do quarto cadastrada. |
| RN0214 | Mínimo de diárias em feriado | Em feriados prolongados, a reserva deve possuir no mínimo 2 diárias. |
| RN0215 | Limite padrão por quarto | Em quartos padrão, o limite máximo é de 2 adultos e 2 crianças. |

### Regras Operacionais de Reserva

| ID | Nome | Descrição |
| --- | --- | --- |
| RN0221 | Horário de diárias | A diária inicia às 14:00 e encerra às 12:00 do dia seguinte. |
| RN0222 | Confirmação condicionada a pagamento | Reservas somente podem ser confirmadas quando o pagamento estiver aprovado. |
| RN0223 | No-show | Reservas não realizadas no dia de entrada devem ser marcadas como no-show. |
| RN0224 | Contabilização de ocupação | Apenas reservas confirmadas devem compor relatórios de ocupação e receita. |

### Cancelamento e Política

| ID | Nome | Descrição |
| --- | --- | --- |
| RN0231 | Cancelamento sem multa | Cancelamentos realizados até 48 horas antes da data de entrada não geram multa. |
| RN0232 | Cancelamento com multa | Cancelamentos com menos de 48 horas para a data de entrada geram multa de 50% do valor da reserva. |
| RN0233 | Estorno proporcional | Em cancelamentos com estorno, o valor estornado deve considerar a política de cancelamento vinculada à reserva. |

### Benefícios e Exceções

| ID | Nome | Descrição |
| --- | --- | --- |
| RN0241 | Crianças até 5 anos | Crianças de até 5 anos não pagam diária quando hospedadas no mesmo quarto dos responsáveis. |
| RN0242 | Promoções aplicáveis | Promoções devem seguir a regra definida na promoção cadastrada, não sendo cumulativas por padrão. |
| RN0243 | Documento no check-in | No check-in, deve ser apresentado documento de identificação com foto. |

### Notificações

| ID | Nome | Descrição |
| --- | --- | --- |
| RN0251 | Conteúdo de confirmação de reserva | A confirmação de reserva deve conter: código da reserva, dados do hóspede, datas de entrada e saída, identificação do quarto, valor total, política de cancelamento aplicável e instruções de check-in. |
| RN0252 | Conteúdo de cancelamento | A confirmação de cancelamento deve conter: código da reserva, valores cobrados/estornados e referência à política aplicada. |
| RN0253 | Conteúdo de lembrete | O lembrete de estadia deve conter: data e hora de check-in, endereço do hotel e contatos. |
