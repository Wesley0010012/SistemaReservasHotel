const MOCK_APP_CONFIG = window.MOCK_APP_CONFIG ?? {}
const GUEST_PROTOTYPE_URL = MOCK_APP_CONFIG.GUEST_PROTOTYPE_URL ?? 'http://localhost:8080/hospedes'
const READ_ONLY_UPDATE_MODULES = ['/pagamentos', '/notificacoes', '/relatorios']

const MODULES = [
  {
    path: '/quartos',
    label: 'Quartos',
    title: 'Manter Quartos',
    status: 'Cadastro',
    subtitle: 'Cadastro, consulta, alteracao e inativacao dos quartos do hotel.',
    metrics: [
      ['Quartos ativos', '42'],
      ['Disponiveis', '18'],
      ['Manutencao', '3'],
      ['Diaria media', 'R$ 463'],
    ],
    filters: [
      field('Numero', 'search', '204'),
      field('Tipo', 'select', 'Duplo', ['Single', 'Duplo', 'Suite']),
      field('Status', 'select', 'Disponivel', ['Disponivel', 'Ocupado', 'Reservado', 'Manutencao', 'Inativo']),
      field('Capacidade', 'search', '2 adultos'),
    ],
    fields: [
      field('Numero', 'text', '204'),
      field('Tipo', 'select', 'Duplo', ['Single', 'Duplo', 'Suite']),
      field('Adultos', 'number', '2'),
      field('Criancas', 'number', '2'),
      field('Status', 'select', 'Disponivel', ['Disponivel', 'Ocupado', 'Reservado', 'Manutencao', 'Inativo']),
      field('Preco base', 'text', 'R$ 420,00'),
    ],
    actions: ['Cadastrar', 'Salvar alteracao', 'Inativar'],
    columns: ['Quarto', 'Tipo', 'Capacidade', 'Diaria', 'Status'],
    rows: [
      ['101', 'Single', '1 adulto', 'R$ 280,00', 'Disponivel'],
      ['204', 'Duplo', '2 adultos + 2 criancas', 'R$ 420,00', 'Ocupado'],
      ['310', 'Suite', '2 adultos + 1 crianca', 'R$ 690,00', 'Manutencao'],
    ],
  },
  {
    path: '/promocoes',
    label: 'Promocoes',
    title: 'Manter Promocoes',
    status: 'Receita',
    subtitle: 'Gestao de promocoes vigentes, programadas e historico.',
    metrics: [
      ['Vigentes', '4'],
      ['Programadas', '2'],
      ['Desconto medio', '11%'],
      ['Uso no mes', '38'],
    ],
    filters: [
      field('Nome', 'search', 'Semana Executiva'),
      field('Status', 'select', 'Vigente', ['Vigente', 'Programada', 'Encerrada', 'Inativa']),
      field('Inicio', 'date', '2026-06-01'),
      field('Fim', 'date', '2026-06-30'),
    ],
    fields: [
      field('Nome', 'text', 'Semana Executiva'),
      field('Desconto', 'text', '12%'),
      field('Inicio', 'date', '2026-06-01'),
      field('Fim', 'date', '2026-06-30'),
      field('Cumulativa', 'select', 'Nao', ['Nao', 'Sim']),
      field('Regra', 'textarea', 'Aplicavel a quartos single em dias uteis.', null, true),
    ],
    actions: ['Cadastrar', 'Salvar alteracao', 'Inativar'],
    columns: ['Promocao', 'Vigencia', 'Desconto', 'Regra', 'Status'],
    rows: [
      ['Semana Executiva', '01/06 a 30/06', '12%', 'Quartos single', 'Vigente'],
      ['Feriado Prolongado', '03/07 a 06/07', '8%', 'Minimo 2 diarias', 'Programada'],
      ['Baixa Temporada', '01/05 a 20/05', '15%', 'Nao cumulativa', 'Encerrada'],
    ],
  },
  {
    path: '/politicas-cancelamento',
    label: 'Politicas',
    title: 'Manter Politicas de Cancelamento',
    status: 'Regras',
    subtitle: 'Prazos, multas e estornos aplicaveis ao cancelamento de reservas.',
    metrics: [
      ['Ativas', '3'],
      ['Sem multa', '48h'],
      ['Multa padrao', '50%'],
      ['Nao reemb.', '1'],
    ],
    filters: [
      field('Nome', 'search', 'Padrao flexivel'),
      field('Prazo minimo', 'search', '48 horas'),
      field('Multa', 'search', '50%'),
      field('Status', 'select', 'Ativa', ['Ativa', 'Inativa']),
    ],
    fields: [
      field('Nome', 'text', 'Padrao flexivel'),
      field('Prazo sem multa', 'text', '48 horas'),
      field('Multa', 'text', '50%'),
      field('Status', 'select', 'Ativa', ['Ativa', 'Inativa']),
      field('Descricao', 'textarea', 'Cancelamentos ate 48 horas antes nao geram multa.', null, true),
    ],
    actions: ['Cadastrar', 'Salvar alteracao', 'Inativar'],
    columns: ['Politica', 'Prazo', 'Multa', 'Estorno', 'Status'],
    rows: [
      ['Padrao flexivel', 'Ate 48h antes', '0%', 'Integral', 'Ativa'],
      ['Cancelamento tardio', 'Menos de 48h', '50%', 'Proporcional', 'Ativa'],
      ['Tarifa nao reembolsavel', 'A qualquer tempo', '100%', 'Nao aplicavel', 'Inativa'],
    ],
  },
  {
    path: '/reservas',
    label: 'Reservas',
    title: 'Manter Reserva',
    status: 'Operacao',
    subtitle: 'Disponibilidade, proposta, confirmacao, cancelamento e estadia.',
    metrics: [
      ['Confirmadas hoje', '12'],
      ['Check-ins', '7'],
      ['Check-outs', '5'],
      ['No-show', '1'],
    ],
    filters: [
      field('Periodo', 'text', '06/2026'),
      field('Status', 'select', 'Confirmada', ['Proposta', 'Confirmada', 'Cancelada', 'Em estadia', 'Finalizada', 'No-show']),
      field('Hospede', 'search', 'Ana'),
      field('Canal', 'select', 'Site', ['Site', 'Telefone', 'Balcao', 'Aplicativo', 'Agencia']),
    ],
    fields: [
      field('Hospede', 'text', 'Ana Beatriz Souza'),
      field('Quarto', 'text', '204'),
      field('Entrada', 'date', '2026-06-02'),
      field('Saida', 'date', '2026-06-05'),
      field('Adultos', 'number', '2'),
      field('Criancas', 'number', '1'),
      field('Canal', 'select', 'Site', ['Site', 'Telefone', 'Balcao', 'Aplicativo', 'Agencia']),
      field('Valor total', 'text', 'R$ 1.260,00'),
    ],
    actions: ['Confirmar', 'Cancelar', 'Check-in', 'Check-out'],
    columns: ['Codigo', 'Hospede', 'Quarto', 'Periodo', 'Status'],
    rows: [
      ['RSV-1024', 'Ana Beatriz Souza', '204', '02/06 a 05/06', 'Confirmada'],
      ['RSV-1025', 'Carlos Eduardo Lima', '101', '04/06 a 06/06', 'Proposta'],
      ['RSV-1026', 'Mariana Costa Ribeiro', '310', '10/06 a 12/06', 'Em estadia'],
    ],
    availabilityRows: [
      ['101', 'Single', '1 adulto', 'R$ 280,00', 'Disponivel agora'],
      ['206', 'Duplo', '2 adultos + 1 crianca', 'R$ 420,00', 'Disponivel'],
      ['312', 'Suite', '2 adultos + 2 criancas', 'R$ 690,00', 'Ultimas unidades'],
    ],
  },
  {
    path: '/pagamentos',
    label: 'Pagamentos',
    title: 'Consultar Pagamentos',
    status: 'Financeiro',
    subtitle: 'Consulta de pagamentos de reservas e registro de estornos.',
    metrics: [
      ['Aprovados', '31'],
      ['Pendentes', '4'],
      ['Estornos', '2'],
      ['Receita', 'R$ 84,9k'],
    ],
    filters: [
      field('Reserva', 'search', 'RSV-1024'),
      field('Forma', 'select', 'Cartao', ['PIX', 'Cartao', 'Dinheiro', 'Boleto']),
      field('Status', 'select', 'Aprovado', ['Iniciado', 'Aprovado', 'Negado', 'Estornado']),
      field('Periodo', 'text', 'Maio/2026'),
    ],
    fields: [
      field('Reserva', 'text', 'RSV-1024'),
      field('Forma de pagamento', 'select', 'Cartao de credito', ['PIX', 'Cartao de credito', 'Cartao de debito', 'Dinheiro', 'Boleto']),
      field('Valor', 'text', 'R$ 1.260,00'),
      field('Data da operacao', 'date', '2026-05-31'),
      field('Resultado', 'select', 'Aprovado', ['Aprovado', 'Negado', 'Estornado']),
      field('Observacao', 'textarea', 'Retorno mockado do servico de pagamento.', null, true),
    ],
    actions: ['Estornar'],
    columns: ['Reserva', 'Forma', 'Valor', 'Operacao', 'Status'],
    rows: [
      ['RSV-1024', 'Cartao de credito', 'R$ 1.260,00', '31/05/2026', 'Aprovado'],
      ['RSV-1025', 'PIX', 'R$ 560,00', '31/05/2026', 'Iniciado'],
      ['RSV-1018', 'Cartao de credito', 'R$ 345,00', '29/05/2026', 'Estornado'],
    ],
  },
  {
    path: '/notificacoes',
    label: 'Notificacoes',
    title: 'Notificar',
    status: 'Comunicacao',
    subtitle: 'Confirmacoes, cancelamentos, lembretes e mensagens pos-estadia.',
    metrics: [
      ['Enviadas', '64'],
      ['Pendentes', '8'],
      ['Falhas', '2'],
      ['Canais', '3'],
    ],
    filters: [
      field('Tipo', 'select', 'Confirmacao', ['Confirmacao', 'Cancelamento', 'Lembrete', 'Pos-estadia']),
      field('Hospede', 'search', 'Ana'),
      field('Reserva', 'search', 'RSV-1024'),
      field('Status', 'select', 'Enviada', ['Pendente', 'Enviada', 'Falha']),
    ],
    fields: [
      field('Tipo', 'select', 'Confirmacao', ['Confirmacao', 'Cancelamento', 'Lembrete', 'Pos-estadia']),
      field('Reserva', 'text', 'RSV-1024'),
      field('Hospede', 'text', 'Ana Beatriz Souza'),
      field('Canal', 'select', 'E-mail', ['E-mail', 'WhatsApp', 'SMS']),
      field('Agendamento', 'datetime-local', '2026-06-01T09:00'),
      field('Mensagem', 'textarea', 'Conteudo conforme regras de notificacao.', null, true),
    ],
    actions: ['Enviar agora', 'Agendar', 'Marcar falha'],
    columns: ['Tipo', 'Reserva', 'Hospede', 'Canal', 'Status'],
    rows: [
      ['Confirmacao', 'RSV-1024', 'Ana Beatriz Souza', 'E-mail', 'Enviada'],
      ['Lembrete', 'RSV-1026', 'Mariana Costa Ribeiro', 'WhatsApp', 'Pendente'],
      ['Cancelamento', 'RSV-1018', 'Carlos Eduardo Lima', 'E-mail', 'Enviada'],
    ],
  },
  {
    path: '/relatorios',
    label: 'Relatorios',
    title: 'Gerar Relatorio',
    status: 'Analise',
    subtitle: 'Ocupacao, financeiro, origem de reservas e desempenho de promocoes.',
    metrics: [
      ['Ocupacao', '78%'],
      ['Receita', 'R$ 84,9k'],
      ['Canal lider', 'Site'],
      ['Promo top', '12%'],
    ],
    filters: [
      field('Inicio', 'date', '2026-05-01'),
      field('Fim', 'date', '2026-05-31'),
      field('Tipo', 'select', 'Financeiro', ['Ocupacao', 'Financeiro', 'Origem', 'Promocoes']),
      field('Formato', 'select', 'PDF', ['PDF', 'CSV', 'XLSX']),
    ],
    fields: [
      field('Periodo', 'text', 'Maio/2026'),
      field('Agrupamento', 'select', 'Mensal', ['Diario', 'Semanal', 'Mensal']),
      field('Indicador', 'select', 'Receita confirmada', ['Taxa de ocupacao', 'Receita confirmada', 'Canal principal', 'Uso de promocao']),
      field('Formato', 'select', 'PDF', ['PDF', 'CSV', 'XLSX']),
      field('Responsavel', 'text', 'Gerencia'),
      field('Observacao', 'textarea', 'Geracao mockada para conferencia visual.', null, true),
    ],
    actions: ['Gerar', 'Exportar', 'Agendar envio'],
    columns: ['Relatorio', 'Periodo', 'Indicador', 'Resultado', 'Atualizacao'],
    rows: [
      ['Ocupacao', 'Maio/2026', 'Taxa media', '78%', '31/05/2026 09:00'],
      ['Financeiro', 'Maio/2026', 'Receita confirmada', 'R$ 84.900,00', '31/05/2026 09:15'],
      ['Origem', 'Maio/2026', 'Canal principal', 'Site proprio', '31/05/2026 09:30'],
    ],
  },
]

const state = {
  route: getRouteState(),
  module: null,
  rows: [],
}

state.module = state.route.module

init()

function init() {
  document.querySelector('#seedButton').addEventListener('click', () => {
    state.rows = [...state.module.rows]
    persistRows()
    renderModule()
  })
  document.querySelector('#actionRow').addEventListener('click', handleActionClick)
  document.querySelector('#tableBody').addEventListener('click', handleTableClick)
  document.querySelector('#recordForm').addEventListener('click', handleRecordFormClick)

  state.rows = loadRows()
  renderModule()
}

function getRouteState() {
  const pathname = normalizePath(window.location.pathname)
  const parts = pathname.split('/').filter(Boolean)
  const modulePath = `/${parts[0] ?? 'reservas'}`
  const module = MODULES.find((item) => item.path === modulePath) ?? MODULES.find((item) => item.path === '/reservas')
  const action = parts[1] ?? 'list'
  const id = parts[2] ? Number(parts[2]) : null
  const mode = action === 'add' ? 'create' : action === 'update' ? 'edit' : 'list'

  return {
    module,
    mode: READ_ONLY_UPDATE_MODULES.includes(module.path) && mode === 'edit' ? 'list' : mode,
    recordId: Number.isInteger(id) ? id : null,
  }
}

function renderModule() {
  const pageTitle = getPageTitle()

  document.title = `${pageTitle} | Mock Reserva Hotel`
  document.querySelector('#moduleTitle').textContent = pageTitle
  document.querySelector('#formTitle').textContent = pageTitle
  document.querySelector('#formSubtitle').textContent = state.module.subtitle

  renderNavigation()
  renderMode()
}

function renderNavigation() {
  document.querySelector('#moduleNav').innerHTML = `
    <a class="nav-item" href="${escapeHtml(GUEST_PROTOTYPE_URL)}">
      <span>Hospedes</span>
    </a>
    ${MODULES.map((module) => `
    <a class="nav-item ${module.path === state.module.path ? 'nav-item--active' : ''}" href="${module.path}">
      <span>${escapeHtml(module.label)}</span>
    </a>
  `).join('')}
  `
}

function renderMode() {
  const filters = document.querySelector('.panel--filters')
  const form = document.querySelector('.panel--form')
  const table = document.querySelector('.panel--table')
  const workspace = document.querySelector('.workspace-grid')

  filters.hidden = state.route.mode !== 'list'
  table.hidden = state.route.mode !== 'list'
  form.hidden = state.route.mode === 'list'
  workspace.classList.toggle('workspace-grid--form', state.route.mode !== 'list')

  if (state.route.mode === 'list') {
    renderFilters()
    renderTable()
    return
  }

  renderForm()
  renderActions()

  if (state.route.mode === 'edit') {
    fillFormFromRow(getCurrentRow())
  }
}

function getPageTitle() {
  if (state.route.mode === 'create') {
    return `Criar ${state.module.label}`
  }

  if (state.route.mode === 'edit') {
    return `Editar ${state.module.label}`
  }

  return state.module.title
}

function renderFilters() {
  document.querySelector('#filterForm').innerHTML = `
    ${state.module.filters.map(renderField).join('')}
    <button class="button button--primary" type="button">Buscar</button>
    <button class="button" type="button">Limpar</button>
  `
}

function getCreateLabel() {
  const labels = {
    '/quartos': 'Novo quarto',
    '/promocoes': 'Nova promoção',
    '/politicas-cancelamento': 'Nova politica',
    '/reservas': 'Nova reserva',
    '/notificacoes': 'Nova notificação',
    '/relatorios': 'Novo relatório',
  }

  return labels[state.module.path] ?? `Novo ${state.module.label.toLowerCase()}`
}

function renderForm() {
  document.querySelector('#recordForm').innerHTML = `
    ${state.module.fields.map(renderField).join('')}
    ${renderReservationCreateAssist()}
  `
}

function renderActions() {
  if (state.module.path === '/reservas' && state.route.mode === 'create') {
    document.querySelector('#actionRow').innerHTML = ''
    return
  }

  const primaryLabel = state.route.mode === 'edit' ? 'Salvar edicao' : state.module.actions[0]
  const actions = [primaryLabel, 'Voltar para listagem']

  document.querySelector('#actionRow').innerHTML = actions.map((action, index) => `
    <button
      class="button ${index === 0 ? 'button--primary' : ''} ${isDangerAction(action) ? 'button--danger' : ''}"
      type="button"
      data-action="${escapeHtml(action)}"
    >
      ${escapeHtml(action)}
    </button>
  `).join('')
}

function renderTable() {
  renderCreateButton()
  document.querySelector('#tableSummary').textContent = `${state.rows.length} registro(s) mockados`
  document.querySelector('#tableHead').innerHTML = `
    <tr>
      ${state.module.columns.map((column) => `<th>${escapeHtml(column)}</th>`).join('')}
      <th class="cell-actions">Acoes</th>
    </tr>
  `
  document.querySelector('#tableBody').innerHTML = state.rows.length
    ? state.rows.map((row, index) => renderRow(row, index)).join('')
    : `<tr><td class="empty" colspan="${state.module.columns.length + 1}">Nenhum registro encontrado.</td></tr>`
}

function renderCreateButton() {
  const button = document.querySelector('#createRecordButton')
  button.hidden = state.module.path === '/pagamentos'
  button.href = `${state.module.path}/add`
  button.textContent = getCreateLabel()
}

function renderField(config) {
  const wideClass = config.wide ? ' field--wide' : ''
  if (config.type === 'select') {
    return `
      <label class="field${wideClass}">
        <span>${escapeHtml(config.label)}</span>
        <select data-label="${escapeHtml(config.label)}">
          ${config.options.map((option) => (
            `<option ${option === config.value ? 'selected' : ''}>${escapeHtml(option)}</option>`
          )).join('')}
        </select>
      </label>
    `
  }

  if (config.type === 'textarea') {
    return `
      <label class="field${wideClass}">
        <span>${escapeHtml(config.label)}</span>
        <textarea data-label="${escapeHtml(config.label)}">${escapeHtml(config.value)}</textarea>
      </label>
    `
  }

  return `
    <label class="field${wideClass}">
      <span>${escapeHtml(config.label)}</span>
      <input type="${escapeHtml(config.type)}" value="${escapeHtml(config.value)}" data-label="${escapeHtml(config.label)}" />
    </label>
  `
}

function renderRow(row, index) {
  if (state.module.path === '/pagamentos') {
    return renderPaymentRow(row, index)
  }

  const canEdit = !READ_ONLY_UPDATE_MODULES.includes(state.module.path)

  return `
    <tr>
      ${row.map((cell, index) => `<td>${renderCell(cell, index)}</td>`).join('')}
      <td class="cell-actions">
        <div class="row-actions">
          ${canEdit ? `<a class="button" href="${state.module.path}/update/${index}">Editar</a>` : ''}
          <button class="button button--danger" type="button" data-row-action="delete" data-index="${index}">Excluir</button>
        </div>
      </td>
    </tr>
  `
}

function renderPaymentRow(row, index) {
  const status = String(row[state.module.columns.length - 1] ?? '')
  const isRefunded = /estornado/i.test(status)

  return `
    <tr>
      ${row.map((cell, index) => `<td>${renderCell(cell, index)}</td>`).join('')}
      <td class="cell-actions">
        <div class="row-actions">
          <button
            class="button button--danger"
            type="button"
            data-row-action="refund"
            data-index="${index}"
            ${isRefunded ? 'disabled' : ''}
          >
            ${isRefunded ? 'Estornado' : 'Estornar'}
          </button>
        </div>
      </td>
    </tr>
  `
}

function renderReservationCreateAssist() {
  if (state.module.path !== '/reservas' || state.route.mode !== 'create') {
    return ''
  }

  return `
    <section class="form-assist field--wide" aria-label="Disponibilidades">
      <div class="assist-heading">
        <h3>Disponibilidades</h3>
        <p>Quartos disponiveis para montar a reserva.</p>
      </div>
      <div class="assist-table-wrap">
        <table class="assist-table">
          <thead>
            <tr>
              <th>Quarto</th>
              <th>Tipo</th>
              <th>Capacidade</th>
              <th>Diaria</th>
              <th>Status</th>
              <th class="cell-actions">Acao</th>
            </tr>
          </thead>
          <tbody>
            ${state.module.availabilityRows.map((row, index) => `
              <tr>
                ${row.map((cell, cellIndex) => `<td>${cellIndex === 4 ? `<span class="status status--success">${escapeHtml(cell)}</span>` : escapeHtml(cell)}</td>`).join('')}
                <td class="cell-actions">
                  <button class="button" type="button" data-availability-index="${index}">Selecionar</button>
                </td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      </div>
    </section>
  `
}

function renderCell(cell, index) {
  if (index === 0) {
    return `<span class="record-main"><strong>${escapeHtml(cell)}</strong><span>${escapeHtml(state.module.title)}</span></span>`
  }

  if (index === state.module.columns.length - 1) {
    return `<span class="status ${statusClass(cell)}">${escapeHtml(cell)}</span>`
  }

  return escapeHtml(cell)
}

function handleActionClick(event) {
  const button = event.target.closest('button[data-action]')
  if (!button) {
    return
  }

  const action = button.dataset.action
  if (action === 'Voltar para listagem') {
    navigateToModule(state.module.path)
    return
  }

  saveFormAndNavigate()
}

function handleTableClick(event) {
  const button = event.target.closest('button[data-row-action]')
  if (!button) {
    return
  }

  const index = Number(button.dataset.index)
  if (!Number.isInteger(index)) {
    return
  }

  if (button.dataset.rowAction === 'delete') {
    state.rows.splice(index, 1)
    persistRows()
    renderTable()
    return
  }

  if (button.dataset.rowAction === 'refund') {
    state.rows[index][state.module.columns.length - 1] = 'Estornado'
    persistRows()
    renderTable()
  }
}

function handleRecordFormClick(event) {
  const button = event.target.closest('button[data-availability-index]')
  if (!button) {
    return
  }

  const row = state.module.availabilityRows[Number(button.dataset.availabilityIndex)]
  if (!row) {
    return
  }

  setFormValue('Quarto', row[0])
  setFormValue('Valor total', row[3])
}

function saveFormAndNavigate() {
  const values = getFormValues()
  const row = state.module.columns.map((column, index) => {
    if (state.module.path === '/reservas') {
      return reservationColumnValue(column, index, values)
    }

    if (index === 0 && /codigo/i.test(column)) {
      return values.Codigo || `RSV-${String(Date.now()).slice(-4)}`
    }

    return values[column]
      ?? values[findFieldLabelForColumn(column)]
      ?? fallbackColumnValue(column, index)
  })

  if (state.route.mode === 'edit' && state.route.recordId !== null) {
    state.rows[state.route.recordId] = row
  } else {
    state.rows.unshift(row)
  }

  persistRows()
  navigateToModule(state.module.path)
}

function reservationColumnValue(column, index, values) {
  if (/codigo/i.test(column)) {
    return values.Codigo || `RSV-${String(Date.now()).slice(-4)}`
  }

  if (column === 'Periodo') {
    return values.Entrada && values.Saida
      ? `${formatDate(values.Entrada)} a ${formatDate(values.Saida)}`
      : 'Periodo pendente'
  }

  if (column === 'Status' && state.route.mode === 'create') {
    return 'Proposta'
  }

  return values[column]
    ?? values[findFieldLabelForColumn(column)]
    ?? fallbackColumnValue(column, index)
}

function fillFormFromRow(row) {
  if (!row) {
    navigateToModule(state.module.path)
    return
  }

  const controls = document.querySelectorAll('#recordForm input, #recordForm select, #recordForm textarea')
  controls.forEach((control) => {
    const label = control.dataset.label
    const columnIndex = state.module.columns.findIndex((column) => (
      column === label || findFieldLabelForColumn(column) === label
    ))

    if (columnIndex >= 0) {
      control.value = row[columnIndex]
    }
  })
}

function getFormValues() {
  const values = {}
  document.querySelectorAll('#recordForm input, #recordForm select, #recordForm textarea').forEach((control) => {
    values[control.dataset.label] = control.value
  })
  return values
}

function setFormValue(label, value) {
  const control = document.querySelector(`[data-label="${label}"]`)
  if (control) {
    control.value = value
  }
}

function getCurrentRow() {
  return Number.isInteger(state.route.recordId) ? state.rows[state.route.recordId] : null
}

function storageKey() {
  return `sistema-reserva-hotel:mock:${state.module.path}`
}

function loadRows() {
  try {
    return JSON.parse(localStorage.getItem(storageKey()) ?? 'null') ?? [...state.module.rows]
  } catch {
    return [...state.module.rows]
  }
}

function persistRows() {
  localStorage.setItem(storageKey(), JSON.stringify(state.rows))
}

function navigateToModule(path) {
  window.location.href = path
}

function findFieldLabelForColumn(column) {
  const aliases = {
    Quarto: 'Numero',
    Diaria: 'Preco base',
    Promocao: 'Nome',
    Politica: 'Nome',
    Vigencia: 'Periodo',
    Prazo: 'Prazo sem multa',
    Reserva: 'Reserva',
    Operacao: 'Data da operacao',
    Relatorio: 'Indicador',
    Atualizacao: 'Periodo',
    Tipo: 'Tipo',
    Forma: 'Forma de pagamento',
    Status: 'Status',
  }

  return aliases[column] ?? column
}

function fallbackColumnValue(column, index) {
  if (/status/i.test(column)) {
    return 'Ativo'
  }

  if (/periodo|vigencia/i.test(column)) {
    return 'Periodo mockado'
  }

  if (index === 0) {
    return `NOVO-${state.rows.length + 1}`
  }

  return 'Mock'
}

function formatDate(value) {
  const [year, month, day] = String(value).split('-')
  return day && month ? `${day}/${month}` : value
}

function field(label, type, value, options = [], wide = false) {
  return { label, type, value, options, wide }
}

function normalizePath(pathname) {
  return pathname.replace(/\/$/, '') || '/reservas'
}

function isDangerAction(action) {
  return /cancel|inativ|falha|estornar/i.test(action)
}

function statusClass(status) {
  const normalized = String(status).toLowerCase()
  if (/aprov|confirm|vigente|ativa|disponivel|enviada|finalizada/.test(normalized)) {
    return 'status--success'
  }
  if (/pendente|proposta|programada|estadia|manutencao|iniciado/.test(normalized)) {
    return 'status--warning'
  }
  if (/cancel|falha|negado|estornado|inativa|encerrada|no-show/.test(normalized)) {
    return 'status--danger'
  }
  return 'status--neutral'
}

function escapeHtml(value) {
  return String(value ?? '').replace(/[&<>"']/g, (char) => ({
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#039;',
  })[char])
}
