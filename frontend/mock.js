const MOCK_MODULES = {
  '/quartos': {
    title: 'Quartos',
    subtitle: 'Cadastro e consulta de quartos do hotel.',
    activePath: '/quartos',
    filters: ['Numero', 'Tipo', 'Status', 'Capacidade', 'Preco base'],
    fields: ['Numero', 'Tipo', 'Adultos', 'Criancas', 'Status', 'Preco base'],
    actions: ['Cadastrar quarto', 'Alterar quarto', 'Excluir quarto', 'Consultar quartos'],
    columns: ['Numero', 'Tipo', 'Capacidade', 'Preco base', 'Status'],
    rows: [
      ['101', 'Single', '1 adulto', 'R$ 280,00', 'Disponivel'],
      ['204', 'Duplo', '2 adultos + 2 criancas', 'R$ 420,00', 'Ocupado'],
      ['310', 'Suite', '2 adultos + 1 crianca', 'R$ 690,00', 'Manutencao'],
    ],
  },
  '/promocoes': {
    title: 'Promocoes',
    subtitle: 'Gestao de promocoes vigentes e historico.',
    activePath: '/promocoes',
    filters: ['Nome', 'Periodo inicial', 'Periodo final', 'Status', 'Tipo de quarto'],
    fields: ['Nome', 'Regra', 'Desconto', 'Inicio', 'Fim', 'Status'],
    actions: ['Cadastrar promocao', 'Alterar promocao', 'Excluir promocao', 'Consultar promocoes'],
    columns: ['Promocao', 'Vigencia', 'Desconto', 'Aplicacao', 'Status'],
    rows: [
      ['Semana Executiva', '01/06/2026 a 30/06/2026', '12%', 'Quartos single', 'Vigente'],
      ['Feriado Prolongado', '03/07/2026 a 06/07/2026', '8%', 'Minimo 2 diarias', 'Programada'],
      ['Baixa Temporada', '01/05/2026 a 20/05/2026', '15%', 'Nao cumulativa', 'Encerrada'],
    ],
  },
  '/politicas-cancelamento': {
    title: 'Politicas',
    subtitle: 'Politicas de cancelamento e regras de multa.',
    activePath: '/politicas-cancelamento',
    filters: ['Nome', 'Prazo minimo', 'Percentual de multa', 'Status'],
    fields: ['Nome', 'Descricao', 'Prazo sem multa', 'Multa', 'Estorno', 'Status'],
    actions: ['Cadastrar politica', 'Alterar politica', 'Excluir politica', 'Consultar politicas'],
    columns: ['Politica', 'Prazo', 'Multa', 'Estorno', 'Status'],
    rows: [
      ['Padrao flexivel', 'Ate 48h antes', '0%', 'Integral', 'Ativa'],
      ['Cancelamento tardio', 'Menos de 48h', '50%', 'Proporcional', 'Ativa'],
      ['Tarifa nao reembolsavel', 'A qualquer tempo', '100%', 'Nao aplicavel', 'Inativa'],
    ],
  },
  '/reservas': {
    title: 'Reservas',
    subtitle: 'Disponibilidade, proposta, confirmacao e operacoes de estadia.',
    activePath: '/reservas',
    filters: ['Periodo', 'Status', 'Hospede', 'Quarto', 'Canal'],
    fields: ['Hospede', 'Quarto', 'Entrada', 'Saida', 'Adultos', 'Criancas', 'Valor total'],
    actions: ['Consultar disponibilidade', 'Criar proposta', 'Confirmar reserva', 'Alterar reserva', 'Cancelar reserva', 'Marcar no-show', 'Registrar check-in', 'Registrar check-out'],
    columns: ['Codigo', 'Hospede', 'Quarto', 'Periodo', 'Status'],
    rows: [
      ['RSV-1024', 'Ana Beatriz Souza', '204', '02/06/2026 a 05/06/2026', 'Confirmada'],
      ['RSV-1025', 'Carlos Eduardo Lima', '101', '04/06/2026 a 06/06/2026', 'Proposta'],
      ['RSV-1026', 'Mariana Costa Ribeiro', '310', '10/06/2026 a 12/06/2026', 'Em estadia'],
    ],
  },
  '/pagamentos': {
    title: 'Pagamentos',
    subtitle: 'Iniciacao, resultado, estorno e consulta de pagamentos.',
    activePath: '/pagamentos',
    filters: ['Reserva', 'Forma', 'Status', 'Periodo', 'Valor'],
    fields: ['Reserva', 'Forma de pagamento', 'Valor', 'Data da operacao', 'Resultado', 'Observacao'],
    actions: ['Iniciar pagamento', 'Registrar resultado', 'Estornar pagamento', 'Consultar pagamentos'],
    columns: ['Reserva', 'Forma', 'Valor', 'Operacao', 'Status'],
    rows: [
      ['RSV-1024', 'Cartao de credito', 'R$ 1.260,00', '31/05/2026', 'Aprovado'],
      ['RSV-1025', 'PIX', 'R$ 560,00', '31/05/2026', 'Pendente'],
      ['RSV-1018', 'Cartao de credito', 'R$ 345,00', '29/05/2026', 'Estornado'],
    ],
  },
  '/notificacoes': {
    title: 'Notificacoes',
    subtitle: 'Confirmacoes, cancelamentos, lembretes e pos-estadia.',
    activePath: '/notificacoes',
    filters: ['Tipo', 'Hospede', 'Reserva', 'Status', 'Periodo'],
    fields: ['Tipo', 'Reserva', 'Hospede', 'Canal', 'Agendamento', 'Mensagem'],
    actions: ['Enviar confirmacao', 'Enviar cancelamento', 'Enviar lembrete', 'Enviar pos-estadia'],
    columns: ['Tipo', 'Reserva', 'Hospede', 'Canal', 'Status'],
    rows: [
      ['Confirmacao de reserva', 'RSV-1024', 'Ana Beatriz Souza', 'E-mail', 'Enviada'],
      ['Lembrete de estadia', 'RSV-1026', 'Mariana Costa Ribeiro', 'WhatsApp', 'Agendada'],
      ['Cancelamento', 'RSV-1018', 'Carlos Eduardo Lima', 'E-mail', 'Enviada'],
    ],
  },
  '/relatorios': {
    title: 'Relatorios',
    subtitle: 'Ocupacao, financeiro, origem de reservas e desempenho.',
    activePath: '/relatorios',
    filters: ['Periodo inicial', 'Periodo final', 'Tipo de quarto', 'Forma de pagamento', 'Canal'],
    fields: ['Periodo', 'Agrupamento', 'Indicador', 'Formato', 'Responsavel', 'Observacao'],
    actions: ['Relatorio de ocupacao', 'Relatorio financeiro', 'Origem de reservas', 'Desempenho de promocoes'],
    columns: ['Relatorio', 'Periodo', 'Indicador', 'Resultado', 'Atualizacao'],
    rows: [
      ['Ocupacao', 'Maio/2026', 'Taxa media', '78%', '31/05/2026 09:00'],
      ['Financeiro', 'Maio/2026', 'Receita confirmada', 'R$ 84.900,00', '31/05/2026 09:15'],
      ['Origem de reservas', 'Maio/2026', 'Canal principal', 'Site proprio', '31/05/2026 09:30'],
    ],
  },
}

initMockModule()

function initMockModule() {
  const path = normalizeMockPath(window.location.pathname)
  const module = MOCK_MODULES[path] ?? MOCK_MODULES['/reservas']
  const app = document.querySelector('#mockApp')

  document.title = `${module.title} | Sistema Reserva Hotel`
  document.querySelector('#moduleTitle').textContent = module.title
  document.querySelectorAll('.tabs .tab').forEach((tab) => {
    const link = new URL(tab.href)
    tab.classList.toggle('tab--active', link.pathname === module.activePath)
  })

  app.innerHTML = `
    <section class="panel mock-summary">
      <div>
        <h2>${escapeHtml(module.title)}</h2>
        <p>${escapeHtml(module.subtitle)}</p>
      </div>
      <span class="status status--inactive">Mock</span>
    </section>

    <form class="panel filters">
      <div class="grid grid--filters">
        ${module.filters.map((filter) => renderField(filter)).join('')}
        <div class="actions actions--bottom">
          <button class="button button--primary" type="button">Buscar</button>
          <button class="button button--secondary" type="button">Limpar</button>
        </div>
      </div>
    </form>

    <section class="mock-grid">
      <section class="panel form-section">
        <div class="section-heading">
          <h2>Manutencao</h2>
          <p>Campos mockados para os casos de uso do modulo.</p>
        </div>
        <div class="grid grid--two">
          ${module.fields.map((field) => renderField(field)).join('')}
        </div>
        <div class="form-actions mock-actions">
          ${module.actions.map((action, index) => (
            `<button class="button ${index === 0 ? 'button--primary' : 'button--secondary'}" type="button">${escapeHtml(action)}</button>`
          )).join('')}
        </div>
      </section>

      <section class="panel table-panel">
        <div class="panel__header">
          <div>
            <h2>Consulta</h2>
            <p>${module.rows.length} registro(s) mockados</p>
          </div>
        </div>
        <div class="table-wrap">
          <table>
            <thead>
              <tr>${module.columns.map((column) => `<th>${escapeHtml(column)}</th>`).join('')}<th class="cell-actions">Acoes</th></tr>
            </thead>
            <tbody>
              ${module.rows.map((row) => renderRow(row)).join('')}
            </tbody>
          </table>
        </div>
      </section>
    </section>
  `
}

function normalizeMockPath(pathname) {
  return pathname.replace(/\/$/, '') || '/hospedes'
}

function renderField(label) {
  return `
    <label class="field">
      <span>${escapeHtml(label)}</span>
      <input value="${escapeHtml(mockValue(label))}" readonly />
    </label>
  `
}

function renderRow(row) {
  return `
    <tr>
      ${row.map((cell) => `<td>${escapeHtml(cell)}</td>`).join('')}
      <td class="cell-actions">
        <div class="row-actions">
          <button class="button button--small button--secondary" type="button">Editar</button>
          <button class="button button--small button--danger" type="button">Excluir</button>
        </div>
      </td>
    </tr>
  `
}

function mockValue(label) {
  const values = {
    Numero: '204',
    Tipo: 'Duplo',
    Status: 'Ativo',
    Capacidade: '2 adultos + 2 criancas',
    'Preco base': 'R$ 420,00',
    Nome: 'Exemplo mockado',
    Regra: 'Nao cumulativa',
    Desconto: '10%',
    Inicio: '2026-06-01',
    Fim: '2026-06-30',
    Descricao: 'Regra operacional conforme requisito',
    'Prazo sem multa': '48 horas',
    Multa: '50%',
    Estorno: 'Proporcional',
    Hospede: 'Ana Beatriz Souza',
    Quarto: '204',
    Entrada: '2026-06-02',
    Saida: '2026-06-05',
    Adultos: '2',
    Criancas: '1',
    'Valor total': 'R$ 1.260,00',
    Reserva: 'RSV-1024',
    'Forma de pagamento': 'Cartao de credito',
    Valor: 'R$ 1.260,00',
    'Data da operacao': '2026-05-31',
    Resultado: 'Aprovado',
    Observacao: 'Registro mockado',
    Canal: 'E-mail',
    Agendamento: '2026-06-01 09:00',
    Mensagem: 'Conteudo conforme regra de notificacao',
    Periodo: 'Maio/2026',
    Agrupamento: 'Mensal',
    Indicador: 'Taxa media',
    Formato: 'PDF',
    Responsavel: 'Recepcao',
  }

  return values[label] ?? 'Mock'
}
