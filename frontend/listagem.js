initListagem()

function initListagem() {
  const tableBody = document.querySelector('#guestsTableBody')
  const guestCount = document.querySelector('#guestCount')
  const filterForm = document.querySelector('#filterForm')
  const clearFiltersButton = document.querySelector('#clearFiltersButton')
  const previousPageButton = document.querySelector('#previousPageButton')
  const nextPageButton = document.querySelector('#nextPageButton')
  const pageInfo = document.querySelector('#pageInfo')
  let currentPage = 1
  let total = 0
  let estadosLoaded = false

  showStoredMessage()

  function field(id) {
    return document.querySelector(`#${id}`)
  }

  function getSearchParams() {
    return {
      paginaAtual: currentPage,
      quantidade: field('filterQuantidade').value,
      ordenacao: field('filterOrdenacao').value,
      nomeCompleto: field('filterNome').value.trim(),
      dataNascimento: field('filterDataNascimento').value,
      cpf: field('filterCpf').value.trim(),
      email: field('filterEmail').value.trim(),
      telefoneDdd: field('filterTelefoneDdd').value.trim(),
      telefoneNumero: field('filterTelefoneNumero').value.trim(),
      telefoneTipo: field('filterTelefoneTipo').value,
      enderecoLogradouro: field('filterEnderecoLogradouro').value.trim(),
      enderecoNumero: field('filterEnderecoNumero').value.trim(),
      enderecoBairro: field('filterEnderecoBairro').value.trim(),
      enderecoComplemento: field('filterEnderecoComplemento').value.trim(),
      enderecoCep: field('filterEnderecoCep').value.trim(),
      estadoId: field('filterEstadoId').value,
      cidadeId: field('filterCidadeId').value,
    }
  }

  async function searchGuests() {
    const page = await request(`/api/hospedes${buildQuery(getSearchParams())}`)
    const guests = entityPageItems(page)
    total = Number(page.total ?? guests.length)
    setCachedGuests(guests)
    renderGuests(guests)
    renderPagination(page)
  }

  function renderPagination(page) {
    const quantidade = Number(page.quantidade ?? field('filterQuantidade').value)
    const totalPages = Math.max(1, Math.ceil(total / quantidade))
    currentPage = Number(page.paginaAtual ?? currentPage)
    guestCount.textContent = String(total)
    pageInfo.textContent = `Página ${currentPage} de ${totalPages}`
    previousPageButton.disabled = currentPage <= 1
    nextPageButton.disabled = currentPage >= totalPages
  }

  function renderGuests(guests) {
    if (guests.length === 0) {
      tableBody.innerHTML = '<tr><td colspan="5" class="empty-state">Nenhum hospede encontrado.</td></tr>'
      return
    }

    tableBody.innerHTML = guests.map((guest) => `
      <tr>
        <td>
          <div class="guest-main">
            <strong>${escapeHtml(guest.nomeCompleto)}</strong>
            <span>${escapeHtml(guest.email)}</span>
          </div>
        </td>
        <td>${escapeHtml(guest.cpf)}</td>
        <td>(${escapeHtml(guest.telefoneDdd)}) ${escapeHtml(guest.telefoneNumero)}</td>
        <td>${escapeHtml(guest.cidadeNome ?? `#${guest.cidadeId ?? '-'}`)}</td>
        <td class="cell-actions">
          <div class="row-actions">
            <a class="button button--small button--secondary" href="${appUrl(`/hospedes/update/${guest.id}`)}">Editar</a>
            <button class="button button--small button--danger" type="button" data-action="delete" data-id="${guest.id}">Excluir</button>
          </div>
        </td>
      </tr>
    `).join('')
  }

  filterForm.addEventListener('submit', async (event) => {
    event.preventDefault()
    clearMessages()

    try {
      currentPage = 1
      await searchGuests()
    } catch (error) {
      showMessage('error', error.message)
    }
  })

  clearFiltersButton.addEventListener('click', async () => {
    filterForm.reset()
    currentPage = 1
    field('filterCidadeId').innerHTML = '<option value="">Selecione um estado</option>'
    field('filterCidadeId').disabled = true
    try {
      await searchGuests()
    } catch (error) {
      showMessage('error', error.message)
    }
  })

  field('filterEstadoId').addEventListener('focus', async () => {
    if (estadosLoaded) {
      return
    }

    try {
      const estados = await fetchEstados()
      renderOptions(field('filterEstadoId'), estados, (estado) => `${estado.uf} - ${estado.nome}`, 'Todos')
      estadosLoaded = true
    } catch (error) {
      showMessage('error', error.message)
    }
  })

  field('filterEstadoId').addEventListener('change', async () => {
    const estadoId = field('filterEstadoId').value
    field('filterCidadeId').innerHTML = '<option value="">Selecione um estado</option>'
    field('filterCidadeId').disabled = true

    if (!estadoId) {
      return
    }

    try {
      const cidades = await fetchCidadesByEstado(estadoId)
      renderOptions(field('filterCidadeId'), cidades, (cidade) => cidade.nome, 'Todas')
      field('filterCidadeId').disabled = false
    } catch (error) {
      showMessage('error', error.message)
    }
  })

  previousPageButton.addEventListener('click', async () => {
    if (currentPage <= 1) {
      return
    }

    currentPage -= 1
    await searchGuests()
  })

  nextPageButton.addEventListener('click', async () => {
    currentPage += 1
    await searchGuests()
  })

  tableBody.addEventListener('click', async (event) => {
    const button = event.target.closest('button[data-action="delete"]')
    if (!button) {
      return
    }

    const shouldDelete = window.confirm('Deseja realmente excluir este hospede?')
    if (!shouldDelete) {
      return
    }

    clearMessages()
    try {
      const deleted = await request(`/api/hospedes/${Number(button.dataset.id)}`, { method: 'DELETE' })
      upsertCachedGuest(deleted)
      await searchGuests()
      showMessage('success', 'Hospede excluido.')
      window.alert('Hospede excluido com sucesso.')
    } catch (error) {
      showMessage('error', error.message)
    }
  })

  searchGuests().catch((error) => showMessage('error', error.message))
}
